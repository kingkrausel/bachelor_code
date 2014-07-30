/// <reference path="definitions/angularjs.d.ts" />
/// <reference path="definitions/jquery.d.ts" />
var VideoInstructionsCtrl = (function () {
    function VideoInstructionsCtrl() {
        this.play_btn = jQuery('#play_pause');
        this.playing = false;
        this.video_time = 0;
        this.duration = 1;
        this.annotated_times = [];
        // scope.self = this;
        this.jSlider = $("#resolution-slider");
        this.jSlider.slider();
    }
    VideoInstructionsCtrl.prototype.play_pause = function () {
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
        if (this.playing)
            this.play_btn.text('Pause');
        else
            this.play_btn.text('Play');

        if (iwc.util.validateIntent(intent)) {
            //console.log('intent gesendet!');
            iwcClient.publish(intent);
        }
    };

    VideoInstructionsCtrl.prototype.add_annotation_time = function (anno) {
        this.annotated_times.push(anno);
        this.annotated_times.sort(function (a, b) {
            return a - b;
        });
        this.update_markers();
    };

    VideoInstructionsCtrl.prototype.toggle = function () {
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
    };

    VideoInstructionsCtrl.prototype.goto_next_anno = function (from) {
        if (typeof from === "undefined") { from = this.video_time; }
        for (var i = 0; i < this.annotated_times.length; i++) {
            if (this.annotated_times[i] > from) {
                this.set_video_time(this.annotated_times[i]);
                break;
            }
        }
    };

    VideoInstructionsCtrl.prototype.update_markers = function () {
        var _this = this;
        var max = this.jSlider.slider("option", "max");
        this.jSlider.find('.ui-slider-tick-mark').remove();
        this.annotated_times.forEach(function (time) {
            $('<span class="ui-slider-tick-mark"></span>').css('left', (100 * (time / max)) + '%').appendTo(_this.jSlider);
        });
    };

    VideoInstructionsCtrl.prototype.frame = function (diff) {
        this.video_time += diff;
        this.set_video_time(this.video_time);
    };

    VideoInstructionsCtrl.prototype.init_drawings = function () {
    };

    VideoInstructionsCtrl.prototype.get_updated_time = function (time) {
        this.video_time = time;
        this.jSlider.slider({ value: time });
    };

    VideoInstructionsCtrl.prototype.set_video_time = function (time) {
        console.log('set_video_time');
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "SET_VIDEO_TIME",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": { 'time': time.toString() }
        };

        iwcClient.publish(intent);
    };

    VideoInstructionsCtrl.prototype.update_duration = function (dur) {
        var _this = this;
        this.duration = dur;
        this.jSlider.slider({
            max: dur,
            step: 0.1,
            slide: function (ev, ui) {
                _this.set_video_time(ui.value);
            },
            change: function (ev, ui) {
                _this.video_time = ui.value;
            }
        });

        this.update_markers();
    };
    return VideoInstructionsCtrl;
})();

var controller;
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
            controller.add_annotation_time(parseFloat(intent.extras.time));
            break;
    }
}

iwcClient.connect(controller_router);
//# sourceMappingURL=controls.js.map
