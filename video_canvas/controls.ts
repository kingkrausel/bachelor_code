/// <reference path="definitions/angularjs.d.ts" />
/// <reference path="definitions/jquery.d.ts" />


class VideoInstructionsCtrl {
    public play_btn = jQuery('#play_pause');
    public playing = false;
    public video_time = 0;
    public duration = 1;
    public jSlider: any;
    private annotated_times: number[] = [];
    public drawinMode = true;
    constructor() {
        // scope.self = this;
        this.jSlider = $("#resolution-slider");
        this.jSlider.slider();
    }
    public play_pause() {
        console.log('was geht');
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
        }
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
    }
    public rect() {
        if (this.drawinMode) this.toggle()
        sendIntent('MAKE_RECT', {});
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
        this.video_time = time;
        this.jSlider.slider({value:time});
    }

    public set_video_time(time: number) {
        console.log('set_video_time');
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

}

var controller:VideoInstructionsCtrl;
$(document).ready(function () {
    controller = new VideoInstructionsCtrl();    
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
