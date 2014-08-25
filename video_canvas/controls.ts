/// <reference path="definitions/angularjs.d.ts" />
/// <reference path="definitions/jquery.d.ts" />


class VideoInstructionsCtrl {
    public play_btn = jQuery('#play_pause');
    public playing = false;
    public video_time = 0;
    public last_video_time = 0;
    public duration = 1;
    public jSlider: any;
    private annotated_times: number[] = [];
    public drawinMode = true;
    public anno_countdown;
    public anno_view_time = 5;
    public anno_cd_timer = 0;
    public watching_anno = false;
    public color: string;
    constructor() {
        // scope.self = this;
        this.jSlider = $("#resolution-slider");
        this.jSlider.slider();
        this.anno_countdown = this.anno_view_time;
    }
    public play_pause() {
        if (this.watching_anno) { //watching anno, but clicked play/pause
            this.stop_anno_countdown();
            this.pause();
        } else { //normal play/pause
            this.playing ? this.pause() : this.play();
            this.stop_anno_countdown();
        }
        /*this.stop_anno_countdown();
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "PLAY/PAUSE",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": {}
        };
        this.playing = !this.playing;
        //if (this.playing) this.play_btn.text('Pause');
        //else this.play_btn.text('Play');

        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        //if(this.drawinMode)
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);

        if (iwc.util.validateIntent(intent)) {
            //console.log('intent gesendet!');
            iwcClient.publish(intent);
        }*/
    }

    public play() {
        //this.stop_anno_countdown();
        this.playing = true;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        sendIntent('PLAY',{});
    }

    public pause() {
        //this.stop_anno_countdown();
        this.playing = false;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        //if(this.drawinMode)
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        sendIntent('PAUSE', {});
    }

    public set_color(color) {
        this.color = color;
        sendIntent('SET_COLOR', { color: color });
    }

    public add_annotation_time(anno) {
        this.annotated_times.push(anno);
        this.annotated_times.sort((a, b)=>{return a - b;});
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
            if (this.annotated_times[i] > from) {
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
        sendIntent('MAKE_CIRCLE', {});
        if(this.playing)
            this.pause();
    }
    public rect() {
        if (this.drawinMode) this.toggle()
        sendIntent('MAKE_RECT', {});
        if (this.playing)
            this.pause();
    }

    public update_markers() {
        var max = this.jSlider.slider("option", "max");
        this.jSlider.find('.ui-slider-tick-mark').remove();
        this.annotated_times.forEach((time,index) => {
            $('<span class="ui-slider-tick-mark" id="marker_'+index+'"></span>').css('left', (100 * (time / max)) + '%').appendTo(this.jSlider);
            $('#marker_' + index).attr('data-marker-index',index);
            $('#marker_' + index).click(function () {
                var index = parseInt( $(this).attr('data-marker-index') );
                //console.log('collba id is:', id);
                controller.goto_annotation(index);
            });
        });
    }

    public frame(diff: number) {
        this.video_time += diff;
        this.set_video_time(this.video_time);
    }

    public init_drawings() {

    }

    public get_updated_time(time: number) {
        this.last_video_time = this.video_time;
        this.video_time = time;
        this.jSlider.slider({ value: time });
        var anno_at = this.get_time_between(this.last_video_time, time);
        if (this.playing && anno_at >= 0) {
            this.pause();            
            this.set_video_time(anno_at);
            this.start_anno_countdown();
            this.last_video_time = anno_at;
        }
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

        this.update_markers();
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
        case 'OWN_NEW_ANNO':
            controller.get_updated_time(intent.extras.time);
            //if (controller.playing) {
                controller.pause();
                controller.stop_anno_countdown();
            //}
            break;
    }

}


iwcClient.connect(controller_router);

function sendIntent(action, data) {
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
