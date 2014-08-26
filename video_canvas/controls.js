/// <reference path="definitions/angularjs.d.ts" />
/// <reference path="definitions/jquery.d.ts" />
var VideoInstructionsCtrl = (function () {
    function VideoInstructionsCtrl() {
        this.play_btn = jQuery('#play_pause');
        this.playing = false;
        this.video_time = 0;
        this.last_video_time = 0;
        this.duration = 1;
        this.annotated_times = [];
        this.drawinMode = true;
        this.anno_view_time = 5;
        this.anno_cd_timer = 0;
        this.watching_anno = false;
        // scope.self = this;
        this.jSlider = $("#resolution-slider");
        this.jSlider.slider();
        this.anno_countdown = this.anno_view_time;
    }
    VideoInstructionsCtrl.prototype.I_am_alive = function () {
        sendIntent('I_AM_ALIVE', { widget: 'controls' });
    };

    VideoInstructionsCtrl.prototype.play_pause = function () {
        if (this.watching_anno) {
            this.stop_anno_countdown();
            this.pause();
        } else {
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
    };

    VideoInstructionsCtrl.prototype.play = function () {
        //this.stop_anno_countdown();
        this.playing = true;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        sendIntent('PLAY', {});
    };

    VideoInstructionsCtrl.prototype.pause = function () {
        //this.stop_anno_countdown();
        this.playing = false;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';

        //if(this.drawinMode)
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        sendIntent('PAUSE', {});
    };

    VideoInstructionsCtrl.prototype.set_color = function (color) {
        this.color = color;
        sendIntent('SET_COLOR', { color: color });
    };

    VideoInstructionsCtrl.prototype.add_annotation_time = function (anno) {
        this.annotated_times.push(anno);
        this.annotated_times.sort(function (a, b) {
            return a - b;
        });
        this.update_markers();
    };

    VideoInstructionsCtrl.prototype.toggle = function () {
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
        var newClass = this.drawinMode ? 'fa fa-pencil' : 'fa fa-arrows';

        //if(this.drawinMode)
        jQuery('#toggle i').removeClass();
        jQuery('#toggle i').attr('class', newClass);
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

    VideoInstructionsCtrl.prototype.goto_annotation = function (annoIndex) {
        this.set_video_time(this.annotated_times[annoIndex]);
    };

    VideoInstructionsCtrl.prototype.on_click_marker = function () {
    };

    VideoInstructionsCtrl.prototype.circle = function () {
        if (this.drawinMode)
            this.toggle();
        sendIntent('MAKE_CIRCLE', {});
        if (this.playing)
            this.pause();
    };
    VideoInstructionsCtrl.prototype.rect = function () {
        if (this.drawinMode)
            this.toggle();
        sendIntent('MAKE_RECT', {});
        if (this.playing)
            this.pause();
    };

    VideoInstructionsCtrl.prototype.update_markers = function () {
        var _this = this;
        var max = this.jSlider.slider("option", "max");
        this.jSlider.find('.ui-slider-tick-mark').remove();
        this.annotated_times.forEach(function (time, index) {
            $('<span class="ui-slider-tick-mark" id="marker_' + index + '"></span>').css('left', (100 * (time / max)) + '%').appendTo(_this.jSlider);
            $('#marker_' + index).attr('data-marker-index', index);
            $('#marker_' + index).click(function () {
                var index = parseInt($(this).attr('data-marker-index'));

                //console.log('collba id is:', id);
                controller.goto_annotation(index);
            });
        });
    };

    VideoInstructionsCtrl.prototype.frame = function (diff) {
        this.video_time += diff;
        this.set_video_time(this.video_time);
    };

    VideoInstructionsCtrl.prototype.init_drawings = function () {
    };

    VideoInstructionsCtrl.prototype.get_updated_time = function (time) {
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
    };

    VideoInstructionsCtrl.prototype.get_time_between = function (a, b) {
        for (var i = 0; i < this.annotated_times.length; i++) {
            if (a < this.annotated_times[i] && this.annotated_times[i] <= b)
                return this.annotated_times[i];
        }
        return -1;
    };

    VideoInstructionsCtrl.prototype.set_video_time = function (time) {
        this.stop_anno_countdown();
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
        this.get_updated_time(time);
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

    VideoInstructionsCtrl.prototype.start_anno_countdown = function () {
        var _this = this;
        //this.playing = false;
        this.watching_anno = true;
        jQuery('#play_pause i').removeClass("fa-play fa-pause").text(this.anno_countdown);

        this.anno_cd_timer = setInterval(function () {
            _this.anno_countdown--;
            jQuery('#play_pause i').text(_this.anno_countdown);
            if (_this.anno_countdown <= 0) {
                _this.stop_anno_countdown();
                _this.play();
            }
        }, 1000);
    };
    VideoInstructionsCtrl.prototype.stop_anno_countdown = function () {
        jQuery('#play_pause i').text('');

        //this.play_pause();
        this.anno_countdown = this.anno_view_time;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        window.clearInterval(this.anno_cd_timer);
        this.watching_anno = false;
    };
    return VideoInstructionsCtrl;
})();

var controller;
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
        var red = $("#red").slider("value"), green = $("#green").slider("value"), blue = $("#blue").slider("value"), hex = hexFromRGB(red, green, blue);
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
            controller.add_annotation_time(parseFloat(intent.extras.time));
            break;
        case 'OWN_NEW_ANNO':
            controller.get_updated_time(intent.extras.time);

            //if (controller.playing) {
            controller.pause();
            controller.stop_anno_countdown();

            break;

        case 'I_AM_ALIVE':
            if (intent.extras.widget === 'video_canvas') {
                controller.set_color(controller.color);
                controller.jSlider.slider({ value: 0 });
            }
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
//# sourceMappingURL=controls.js.map
