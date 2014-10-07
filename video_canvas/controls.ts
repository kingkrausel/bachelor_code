/// <reference path="definitions/angularjs.d.ts" />
/// <reference path="definitions/jquery.d.ts" />


class VideoInstructionsCtrl {
    public play_btn = jQuery('#play_pause');
    public playing = false;
    public video_time = 0;
    public last_video_time = 0;
    public duration = 1;
    public jSlider: any;
    private annotated_times = [];
    private video_anno_map = {};
    public drawinMode = true;
    public anno_countdown;
    public anno_view_time = 5;
    public anno_cd_timer = 0;
    public watching_anno = false;
    public color: string;
    public user_positions: any = {};
    public isMaster: boolean = false;
    public awareness_timer: number = 0;
    public displaying_anno = false;
    public curr_displayed_anno = -1;
    public peerId: string;
    constructor() {
        // scope.self = this;
        this.jSlider = $("#resolution-slider");
        this.jSlider.slider();
        //this.jSlider.slider("pips");
        this.jSlider.slider("float");
        this.anno_countdown = this.anno_view_time;
        this.I_am_alive();
    }

    private I_am_alive() {
        locallySendIntent('I_AM_ALIVE', {widget:'controls'});
    }

    public play_pause() {
        if (this.watching_anno) { //watching anno, but clicked play/pause
            this.stop_anno_countdown();
            this.pause();
        } else { //normal play/pause
            this.playing ? this.pause() : this.play();
            this.stop_anno_countdown();
        }
        
    }

    public play() {
        //this.stop_anno_countdown();
        this.playing = true;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        locallySendIntent('PLAY',{});
    }

    public pause() {
        //this.stop_anno_countdown();
        this.playing = false;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        //if(this.drawinMode)
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        locallySendIntent('PAUSE', {});
    }

    public annotation_at(time: number, threshold = 0.25) {
        var res = -1;

        var dist = 10000000; //works for videos with duration <= 2777h
        this.annotated_times.forEach((anno_time,index) => {
            var currDist = Math.abs(anno_time - time);
            if (currDist < dist && threshold >= currDist) {
                dist = currDist;
                res = index;
            }
        });

        return res;
    }

    public set_color(color) {
        this.color = color;
        locallySendIntent('SET_COLOR', { color: color });
    }

    public add_annotation_time(anno) {
        this.annotated_times.push(anno);
        this.annotated_times.sort((a, b) => { return a - b; });
        var i = 0;
        while (i < this.annotated_times.length) {
            if (this.annotated_times[i] === this.annotated_times[i + 1]) {
                this.annotated_times.splice(i + 1, 1);
            }
            else {
                i += 1;
            }
        }
        this.update_markers();
    }

    public delete_annotation_time(anno) {
        var index = this.annotated_times.indexOf(anno);
        if (index > -1) {
            this.annotated_times.splice(index,1);
        }
        this.update_markers();
    }

    public toggle() {
        this.drawinMode = !this.drawinMode;
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "TOGGLE",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": {}
        };      
       

        if (iwc.util.validateIntent(intent)) {
            console.log('toggle intent ');
            iwcClient.publish(intent);
        }
        var newClass = this.drawinMode ? 'fa fa-pencil':'fa fa-arrows';
        //if(this.drawinMode)
        jQuery('#toggle i').removeClass();
        jQuery('#toggle i').attr('class', newClass);
    }

    public goto_next_anno(from = this.video_time):void {
        
        for (var i = 0; i < this.annotated_times.length; i++) {
            if (this.annotated_times[i] > from +0.1) {
                this.set_video_time(this.annotated_times[i]);
                break;
            }
        }        
    }

    public goto_annotation(annoIndex: number) {
        this.set_video_time(this.annotated_times[annoIndex]);
    }

    public on_click_marker() {
        
    }

    

    public circle() {
        if (this.drawinMode) this.toggle();
        locallySendIntent('MAKE_CIRCLE', {});
        if(this.playing)
            this.pause();
    }
    public rect() {
        if (this.drawinMode) this.toggle()
        locallySendIntent('MAKE_RECT', {});
        if (this.playing)
            this.pause();
    }

    public itext() {
        if (this.drawinMode) this.toggle()
        locallySendIntent('MAKE_ITEXT', {});
        if (this.playing)
            this.pause();
    }

    public arrow() {
        if (this.drawinMode) this.toggle()
        locallySendIntent('MAKE_ARROW', {});
        if (this.playing)
            this.pause();
    }

    public update_markers() {
        var max = this.jSlider.slider("option", "max");
        this.jSlider.find('.ui-slider-tick-mark').remove();
        this.annotated_times.forEach((time, index) => {
            //var num_users = this.count_users_at(time);
            //$('<span class="ui-slider-tick-mark" id="marker_'+index+'"><p>'+num_users+'</p></span>').css('left', (100 * (time / max)) + '%').appendTo(this.jSlider);
            $('<span class="ui-slider-tick-mark" id="marker_' + index + '"></span>').css('left', (100 * (time / max)) + '%').appendTo(this.jSlider);
           
            $('#marker_' + index).attr('data-marker-index', index);
            $('#marker_' + index).click(function () {
                var index = parseInt( $(this).attr('data-marker-index') );
                //console.log('collba id is:', id);
                setTimeout(() => { controller.goto_annotation(index) },0);
            });
        });

        
    }

    

    public frame(diff: number) {
        this.video_time += diff;
        this.set_video_time(this.video_time);
    }

    public init_drawings() {

    }

    public get_index_of_anno(annoTime) {
        for (var i = 0; i < this.annotated_times.length; i++)
            if (annoTime == this.annotated_times[i]) return i;
        return -1;
    }

    public get_updated_time(time: number) {
        this.last_video_time = this.video_time;
        this.video_time = time;
        this.jSlider.slider({ value: time });
        var anno_at = this.get_time_between(this.last_video_time, time);
        //console.log('anno_at',anno_at);
        if (this.playing && anno_at >= 0) {
            //console.log('controls, passed anno!',anno_at);
            this.pause();            
            this.set_video_time(anno_at);
            this.start_anno_countdown();
            this.last_video_time = anno_at;
        }
        this.display_anno_status(time);
    }

    public display_anno_status(time: number) {
        var anno_index = this.annotation_at(time);
        this.displaying_anno = anno_index === -1 ? false : true;

        if (this.curr_displayed_anno != this.annotated_times[anno_index]) {
            sendIntent('I_AM_AT_ANNO', { peerId: this.peerId, time: time });
        }
        
        this.curr_displayed_anno = anno_index === -1 ? -1 : this.annotated_times[anno_index];

    }

    public get_time_between(a: number, b: number) {
        for (var i = 0; i < this.annotated_times.length; i++) {
            if (a < this.annotated_times[i] && this.annotated_times[i] <= b)
                return this.annotated_times[i];
        }
        return -1;
    }

    public set_video_time(time: number) {
        this.stop_anno_countdown();
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "SET_VIDEO_TIME",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": {'time': time.toString()}
        };
        
        iwcClient.publish(intent);
        this.get_updated_time(time);
        
    }

    public update_duration(dur: number) {
        this.duration = dur;
        this.jSlider.slider({
            max: dur,
            step: 0.1,
            slide: (ev, ui) => {
                this.set_video_time(ui.value);
            },
            change: (ev, ui) => {
                this.video_time = ui.value;
            }
        });
        this.jSlider.slider("float");
        this.update_markers();
        this.set_video_time(0);
    }
    

    public start_anno_countdown() {
        //this.playing = false;
        this.watching_anno = true;
        jQuery('#play_pause i').removeClass("fa-play fa-pause").text(this.anno_countdown);

        this.anno_cd_timer = setInterval(() => {
            this.anno_countdown--;
            jQuery('#play_pause i').text(this.anno_countdown);
            if (this.anno_countdown <= 0) {
                this.stop_anno_countdown();
                this.play();                              
            }
        }, 1000);
    }
    public stop_anno_countdown() {        
        jQuery('#play_pause i').text('');
        //this.play_pause();
        this.anno_countdown = this.anno_view_time;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        window.clearInterval(this.anno_cd_timer);
        this.watching_anno = false;

    }

    public count_users_at(time) {
        var num_users_at = 0;
        for (var id in this.user_positions) {
            if (this.user_positions[id] === time)
                num_users_at++;
        }
        return num_users_at;
    }

    public get_updated_user_pos(peerId, time) {
        var oldTime = this.user_positions[peerId];
        this.user_positions[peerId] = time;
        if (oldTime !== -1 && oldTime !== undefined) {  
            var oldIndex = this.get_index_of_anno(oldTime);          
            var num_users_at = this.count_users_at(oldTime);
            jQuery('#marker_' + oldIndex + ' p').text(num_users_at);
        }

        var index = this.get_index_of_anno(time);
        if (index === -1) return;
        var num_users_at = this.count_users_at(time);

        jQuery('#marker_' + index + ' p').text(num_users_at);
    }

    public master_status_changed(isMaster:boolean) {
        this.isMaster = isMaster;
        if (this.isMaster) {
            window.clearInterval(this.awareness_timer);
            setInterval(() => {
                console.log('hi');
            }, 3000);
        }
    }

    public change_video(url: string) {
        if (this.video_anno_map[url] === undefined) {
            this.video_anno_map[url] = [];            
        }

        this.annotated_times = this.video_anno_map[url];
        this.update_markers();
        //this.set_video_time(0);
    }

}

var controller:VideoInstructionsCtrl;
$(document).ready(function () {
    controller = new VideoInstructionsCtrl();  
    function hexFromRGB(r, g, b) {
        var hex = [
            r.toString(16),
            g.toString(16),
            b.toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length === 1) {
                hex[nr] = "0" + val;
            }
        });
        return hex.join("").toUpperCase();
    }
    function refreshSwatch() {
        var red = $("#red").slider("value"),
            green = $("#green").slider("value"),
            blue = $("#blue").slider("value"),
            hex = hexFromRGB(red, green, blue);
        $("#swatch").css("background-color", "#" + hex);
        controller.set_color("#" + hex);
    }
    $(function () {
        $("#red, #green, #blue").slider({
            orientation: "horizontal",
            range: "min",
            max: 255,
            value: 127,
            slide: refreshSwatch,
            change: refreshSwatch
        });
        $("#red").slider("value", 255);
        $("#green").slider("value", 140);
        $("#blue").slider("value", 60);

        var col = jQuery('#swatch').css('background-color');
        controller.set_color(col);
    });  
});

function controller_router(intent) {
    console.log('CONTROLS WINDOW RECEIVED AN INTENT!', intent);
    switch (intent.action) {
        case 'UPDATE_VIDEO_TIME':
            controller.get_updated_time(intent.extras.time);
            console.log('new time:', intent.extras.time);
            break;
        case 'UPDATE_VIDEO_DURATION':
            controller.update_duration(parseInt(intent.extras.duration));
            console.log('new duration:', intent.extras.duration);
            break;
        case 'NEW_ANNOTATION':
            controller.add_annotation_time( parseFloat(intent.extras.time));
            break;
        case 'DELETE_ANNO':
            controller.delete_annotation_time(parseFloat(intent.extras.time));
            break;
        case 'OWN_NEW_ANNO':
            controller.get_updated_time(intent.extras.time);
            //if (controller.playing) {
                controller.pause();
                controller.stop_anno_countdown();
            //}
            break;
        case 'I_AM_AT_ANNO':
            //controller.get_updated_user_pos(intent.extras.peerId, intent.extras.time);

            break;

        case 'MASTER_STATUS':
            controller.master_status_changed(intent.extras.isMaster);
            //jQuery('#debug').append('<p>Master: ' + intent.extras.isMaster+ '</p>');
            break;
        case 'JOIN_NETWORK':
            //controller.master_status_changed(intent.extras.isMaster);
            //TODO: only master boradcasts data
            sendIntent('I_AM_AT_ANNO', { peerId: controller.peerId, time: controller.curr_displayed_anno });
            break;

        case 'ACTION_OPEN':
            controller.change_video(intent.data);
            break;

        case 'CONNECTION_STATUS':
            if (intent.extras.status === 'connected')
                jQuery('#on-off-button').css('background', 'green');
            if (intent.extras.status === 'close')
                jQuery('#on-off-button').css('background', 'red');
            if (intent.extras.status === 'disconnected')
                jQuery('#on-off-button').css('background', 'yellow');
            break;

        /************** Check if other widgets are there ***********************/
        case 'I_AM_ALIVE':
            if (intent.extras.widget === 'video_canvas') {
                controller.set_color(controller.color);
                controller.jSlider.slider({ value: 0 });
            }
            break;
        case 'PEER_ID':
            controller.peerId = intent.extras.peerId;
            //jQuery('#debug').append('<p>PeerId: ' + controller.peerId+'</p>');
            break;
    }

}


iwcClient.connect(controller_router);

function locallySendIntent(action, data) {
    var intent = {
        "component": "",
        "sender": "",
        "data": "",
        "dataType": "text/xml",
        "action": action,
        "categories": [],
        "flags": ["PUBLISH_LOCAL"],
        "extras": data
    };

    if (iwc.util.validateIntent(intent)) {
        iwcClient.publish(intent);
        //yatta.getConnector().sendIwcIntent(intent);
    }
}

function sendIntent(action, data) {
    var intent = {
        "component": "",
        "sender": "",
        "data": "",
        "dataType": "text/xml",
        "action": action,
        "categories": [],
        "flags": ["PUBLISH_GLOBAL"],
        "extras": data
    };

    if (iwc.util.validateIntent(intent)) {
        iwcClient.publish(intent);
        //yatta.getConnector().sendIwcIntent(intent);
    }
}