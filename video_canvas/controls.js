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
        this.video_anno_map = {};
        this.drawinMode = true;
        this.anno_view_time = 5;
        this.anno_cd_timer = 0;
        this.watching_anno = false;
        this.user_positions = {};
        this.isMaster = false;
        this.awareness_timer = 0;
        this.displaying_anno = false;
        this.curr_displayed_anno = -1;
        // scope.self = this;
        this.jSlider = $("#resolution-slider");
        this.jSlider.slider();

        //this.jSlider.slider("pips");
        this.jSlider.slider("float");
        this.anno_countdown = this.anno_view_time;
        this.I_am_alive();
    }
    VideoInstructionsCtrl.prototype.I_am_alive = function () {
        locallySendIntent('I_AM_ALIVE', { widget: 'controls' });
    };

    VideoInstructionsCtrl.prototype.play_pause = function () {
        if (this.watching_anno) {
            this.stop_anno_countdown();
            this.pause();
        } else {
            this.playing ? this.pause() : this.play();
            this.stop_anno_countdown();
        }
    };

    VideoInstructionsCtrl.prototype.play = function () {
        //this.stop_anno_countdown();
        this.playing = true;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        locallySendIntent('PLAY', {});
    };

    VideoInstructionsCtrl.prototype.pause = function () {
        //this.stop_anno_countdown();
        this.playing = false;
        var newClass = !this.playing ? 'fa fa-play' : 'fa fa-pause';

        //if(this.drawinMode)
        jQuery('#play_pause i').removeClass();
        jQuery('#play_pause i').attr('class', newClass);
        locallySendIntent('PAUSE', {});
    };

    VideoInstructionsCtrl.prototype.annotation_at = function (time, threshold) {
        if (typeof threshold === "undefined") { threshold = 0.25; }
        var res = -1;

        var dist = 10000000;
        this.annotated_times.forEach(function (anno_time, index) {
            var currDist = Math.abs(anno_time - time);
            if (currDist < dist && threshold >= currDist) {
                dist = currDist;
                res = index;
            }
        });

        return res;
    };

    VideoInstructionsCtrl.prototype.set_color = function (color) {
        this.color = color;
        locallySendIntent('SET_COLOR', { color: color });
    };

    VideoInstructionsCtrl.prototype.add_annotation_time = function (anno) {
        this.annotated_times.push(anno);
        this.annotated_times.sort(function (a, b) {
            return a - b;
        });
        var i = 0;
        while (i < this.annotated_times.length) {
            if (this.annotated_times[i] === this.annotated_times[i + 1]) {
                this.annotated_times.splice(i + 1, 1);
            } else {
                i += 1;
            }
        }
        this.update_markers();
    };

    VideoInstructionsCtrl.prototype.delete_annotation_time = function (anno) {
        var index = this.annotated_times.indexOf(anno);
        if (index > -1) {
            this.annotated_times.splice(index, 1);
        }
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
            if (this.annotated_times[i] > from + 0.1) {
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
        locallySendIntent('MAKE_CIRCLE', {});
        if (this.playing)
            this.pause();
    };
    VideoInstructionsCtrl.prototype.rect = function () {
        if (this.drawinMode)
            this.toggle();
        locallySendIntent('MAKE_RECT', {});
        if (this.playing)
            this.pause();
    };

    VideoInstructionsCtrl.prototype.itext = function () {
        if (this.drawinMode)
            this.toggle();
        locallySendIntent('MAKE_ITEXT', {});
        if (this.playing)
            this.pause();
    };

    VideoInstructionsCtrl.prototype.arrow = function () {
        if (this.drawinMode)
            this.toggle();
        locallySendIntent('MAKE_ARROW', {});
        if (this.playing)
            this.pause();
    };

    VideoInstructionsCtrl.prototype.update_markers = function () {
        var _this = this;
        var max = this.jSlider.slider("option", "max");
        this.jSlider.find('.ui-slider-tick-mark').remove();
        this.annotated_times.forEach(function (time, index) {
            //var num_users = this.count_users_at(time);
            //$('<span class="ui-slider-tick-mark" id="marker_'+index+'"><p>'+num_users+'</p></span>').css('left', (100 * (time / max)) + '%').appendTo(this.jSlider);
            $('<span class="ui-slider-tick-mark" id="marker_' + index + '"></span>').css('left', (100 * (time / max)) + '%').appendTo(_this.jSlider);

            $('#marker_' + index).attr('data-marker-index', index);
            $('#marker_' + index).click(function () {
                var index = parseInt($(this).attr('data-marker-index'));

                //console.log('collba id is:', id);
                setTimeout(function () {
                    controller.goto_annotation(index);
                }, 0);
            });
        });
    };

    VideoInstructionsCtrl.prototype.frame = function (diff) {
        this.video_time += diff;
        this.set_video_time(this.video_time);
    };

    VideoInstructionsCtrl.prototype.init_drawings = function () {
    };

    VideoInstructionsCtrl.prototype.get_index_of_anno = function (annoTime) {
        for (var i = 0; i < this.annotated_times.length; i++)
            if (annoTime == this.annotated_times[i])
                return i;
        return -1;
    };

    VideoInstructionsCtrl.prototype.get_updated_time = function (time) {
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
    };

    VideoInstructionsCtrl.prototype.display_anno_status = function (time) {
        var anno_index = this.annotation_at(time);
        this.displaying_anno = anno_index === -1 ? false : true;

        if (this.curr_displayed_anno != this.annotated_times[anno_index]) {
            sendIntent('I_AM_AT_ANNO', { peerId: this.peerId, time: time });
        }

        this.curr_displayed_anno = anno_index === -1 ? -1 : this.annotated_times[anno_index];
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
        this.jSlider.slider("float");
        this.update_markers();
        this.set_video_time(0);
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

    VideoInstructionsCtrl.prototype.count_users_at = function (time) {
        var num_users_at = 0;
        for (var id in this.user_positions) {
            if (this.user_positions[id] === time)
                num_users_at++;
        }
        return num_users_at;
    };

    VideoInstructionsCtrl.prototype.get_updated_user_pos = function (peerId, time) {
        var oldTime = this.user_positions[peerId];
        this.user_positions[peerId] = time;
        if (oldTime !== -1 && oldTime !== undefined) {
            var oldIndex = this.get_index_of_anno(oldTime);
            var num_users_at = this.count_users_at(oldTime);
            jQuery('#marker_' + oldIndex + ' p').text(num_users_at);
        }

        var index = this.get_index_of_anno(time);
        if (index === -1)
            return;
        var num_users_at = this.count_users_at(time);

        jQuery('#marker_' + index + ' p').text(num_users_at);
    };

    VideoInstructionsCtrl.prototype.master_status_changed = function (isMaster) {
        this.isMaster = isMaster;
        if (this.isMaster) {
            window.clearInterval(this.awareness_timer);
            setInterval(function () {
                console.log('hi');
            }, 3000);
        }
    };

    VideoInstructionsCtrl.prototype.change_video = function (url) {
        if (this.video_anno_map[url] === undefined) {
            this.video_anno_map[url] = [];
        }

        this.annotated_times = this.video_anno_map[url];
        this.update_markers();
        //this.set_video_time(0);
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
        case 'DELETE_ANNO':
            controller.delete_annotation_time(parseFloat(intent.extras.time));
            break;
        case 'OWN_NEW_ANNO':
            controller.get_updated_time(intent.extras.time);

            //if (controller.playing) {
            controller.pause();
            controller.stop_anno_countdown();

            break;
        case 'I_AM_AT_ANNO':
            break;

        case 'MASTER_STATUS':
            controller.master_status_changed(intent.extras.isMaster);

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

        case 'I_AM_ALIVE':
            if (intent.extras.widget === 'video_canvas') {
                controller.set_color(controller.color);
                controller.jSlider.slider({ value: 0 });
            }
            break;
        case 'PEER_ID':
            controller.peerId = intent.extras.peerId;

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
//# sourceMappingURL=controls.js.map
