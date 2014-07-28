/// <reference path="svg_adapter.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/fabricjs.d.ts" />
//var XML_TEST = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">    < svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" version = "1.1" width = "640" height = "480" xml: space = "preserve" > <desc>Created with Fabric.js 1.4.0 < /desc><defs></defs ><g transform = "translate(196 106)" ><path d = "M 54.5 9 Q 54.5 9 55 9 Q 55.5 9 55.25 9 Q 55 9 53.5 8 Q 52 7 50.5 6 Q 49 5 47 4.5 Q 45 4 43 3.5 Q 41 3 38.5 3 Q 36 3 34.5 2.5 Q 33 2 32 1.5 Q 31 1 30.5 0.5 Q 30 0 28 0 Q 26 0 25 0 Q 24 0 21.5 0.5 Q 19 1 18 1.5 Q 17 2 15.5 3 Q 14 4 13 4.5 Q 12 5 10 7.5 Q 8 10 7.5 11 Q 7 12 5 15.5 Q 3 19 2.5 20.5 Q 2 22 2 23.5 Q 2 25 1 29.5 Q 0 34 0 35.5 Q 0 37 0 40.5 Q 0 44 0 45.5 Q 0 47 0 50 Q 0 53 0 54.5 Q 0 56 0 56.5 Q 0 57 0.5 59 Q 1 61 1 62.5 Q 1 64 1.5 66 Q 2 68 3 69 Q 4 70 5 72 Q 6 74 7 74.5 Q 8 75 9.5 76.5 Q 11 78 11.5 78.5 Q 12 79 13 79.5 Q 14 80 16 81 Q 18 82 18.5 82 Q 19 82 20 82 Q 21 82 22 82 Q 23 82 25 82 Q 27 82 28 82 Q 29 82 30.5 82 Q 32 82 32.5 82 Q 33 82 34.5 81 Q 36 80 37 79.5 Q 38 79 38.5 78.5 Q 39 78 41 77 Q 43 76 43.5 75.5 Q 44 75 45 74 Q 46 73 47 72.5 Q 48 72 49.5 71 Q 51 70 51.5 69 Q 52 68 52.5 68 Q 53 68 54 67 Q 55 66 55.5 65 Q 56 64 56 63.5 Q 56 63 57.5 61 Q 59 59 59.5 58 Q 60 57 61 54.5 Q 62 52 62.5 51 Q 63 50 63 49 Q 63 48 64 47 Q 65 46 65 45 Q 65 44 65 43.5 Q 65 43 65.5 39 Q 66 35 66 33.5 Q 66 32 66 29 Q 66 26 66 25.5 Q 66 25 66 24 Q 66 23 65.5 23 Q 65 23 64.5 22.5 Q 64 22 64 21.5 Q 64 21 63.5 21 Q 63 21 62.5 21 Q 62 21 61.5 20.5 Q 61 20 60.5 19.5 Q 60 19 59.5 18.5 Q 59 18 58 17.5 Q 57 17 56.5 16.5 Q 56 16 55 15 Q 54 14 53.5 13 Q 53 12 52.5 11.5 Q 52 11 52 10 Q 52 9 51.5 9 Q 51 9 50.5 8.5 Q 50 8 49.5 7 Q 49 6 48.5 4.5 Q 48 3 47.5 3 Q 47 3 46.5 3 L 46 3" style = "stroke: rgb(0, 0, 0); stroke-width: 1; stroke-dasharray: ; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; opacity: 1;" transform = "translate(-33 -41)" stroke - linecap ="round" / ></g></svg >';
var XML_TEST = '<svg height="100" width="100">< circle cx = "50" cy = "50" r = "40" stroke = "black" stroke-width = "3" fill ="red" /></svg>';

var VideoController = (function () {
    /////public isPlaying: boolean = false;
    function VideoController(id) {
        if (typeof id === "undefined") { id = 'video_player'; }
        var _this = this;
        this.last_video_time = 0;
        this.svg_docs = [];
        this.video = document.getElementById(id);
        this.start_video_observer();
        console.log('Collaboration:', collab);

        $(this.video).bind("durationchange", function () {
            _this.duration = _this.video.duration;
            var dur = _this.duration;
            var intent = {
                "component": "",
                "sender": "",
                "data": "",
                "dataType": "text/xml",
                "action": "UPDATE_VIDEO_DURATION",
                "categories": [],
                "flags": ["PUBLISH_LOCAL"],
                "extras": { "duration": dur.toString() }
            };

            if (iwc.util.validateIntent(intent)) {
                iwcClient.publish(intent);
            }
        });

        //var canvas;
        //var VIDEO = <HTMLVideoElement>document.getElementById('video_player');
        //console.log('OOOOOOOOOOOOONNNNNN JAAAAAAA');
        this.canvas = new fabric.Canvas('c', {
            isDrawingMode: true
        });
        this.canvas.setHeight(480);
        this.canvas.setWidth(640);
        this.svg_adapter = new Adapter(this.canvas);

        /*this.svg_adapter.register_annotation_event((jup:any)=> {
        console.log('doc:',jup);
        var intent = {
        "component": "",
        "sender": "",
        "data": "",
        "dataType": "text/xml",
        "action": "NEW_ANNOTATION",
        "categories": [],
        "flags": ["PUBLISH_LOCAL"],
        "extras": { "time": videoCtr.video.currentTime }
        };
        videoCtr.svg_docs.push({ time: videoCtr.video.currentTime, doc: jup });
        console.log(videoCtr.svg_docs);
        if (iwc.util.validateIntent(intent)) {
        iwcClient.publish(intent);
        }
        });*/
        this.svg_adapter.register_annotation_event(this.on_object_added);

        jQuery('.canvas-container').css({ 'position': 'absolute' });
        console.log(fabric.loadSVGFromString);

        /*document.getElementById('c').addEventListener('keydown', function (e) {
        if (e.keyCode == 46)
        this.canvas.remove(this.canvas.getActiveObject());
        }, false);*/
        /*fabric.loadSVGFromString(XML_TEST, (objects, options) => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        this.canvas.add(objects[0]);
        });*/
        //fabric.loadSVGFromString(XML_TEST, (a, b) => { console.log('Denis Golovin');});
        fabric.loadSVGFromURL("http://golovin.de/ba/video_canvas/svg/1.svg", function (objects, options) {
            //this.canvas.add(objects[0]);
            _this.svg_docs.push({ doc: objects[0], time: 5.0 });
            //this.svg_docs[5.0] = objects[0];
            //console.log(this.svg_docs);
        });
    }
    VideoController.prototype.set_video_time = function (time) {
        if (!this.video.paused)
            this.play_pause();
        this.video.currentTime = time;
        this.canvas.clear();
    };

    VideoController.prototype.on_object_added = function (object) {
        //
        //console.log('object added jo!', videoCtr.svg_docs);
        var time = parseFloat(videoCtr.video.currentTime.toFixed(2));
        var result = videoCtr.annotation_at(time);

        console.log('result', result);
        if (!result)
            videoCtr.svg_docs.push({ time: time, doc: jQuery.extend(true, [], object) });
        else {
            result.doc = jQuery.extend(true, [], object); //clone
            time = result.time; // so no new (visible) marker is created
        }

        console.log(videoCtr.svg_docs);

        var layer = 0;
        var anno = { time: time, doc: object };
        var op = collab.ote.createOp("change", anno, "insert", layer);
        collab.sendOp(collab.ote.localEvent(op));

        if (collab.t === 0) {
            collab.t = setTimeout(collab.flush_actions, collab.actionbufferflushdelay);
        }

        // if buffer length exceeds maximum, flush buffer.
        if (collab.actionbuffer.length >= collab.actionbuffermaxlength) {
            collab.flush_actions();
        }

        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "NEW_ANNOTATION",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": { "time": time }
        };
        if (iwc.util.validateIntent(intent)) {
            iwcClient.publish(intent);
        }
    };

    VideoController.prototype.play_pause = function () {
        //this.video = VIDEO;
        console.log('PLAY VIDEO');
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    };

    VideoController.prototype.toggle = function () {
        console.log('toggle');
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    };

    VideoController.prototype.annotation_at = function (time, threshold) {
        if (typeof threshold === "undefined") { threshold = 0.25; }
        var res = null;

        var dist = 10000000;
        this.svg_docs.forEach(function (anno) {
            var currDist = Math.abs(anno.time - time);
            if (currDist < dist && threshold >= currDist) {
                dist = currDist;
                res = anno;
            }
        });

        return res;
    };

    VideoController.prototype.display_annotation_at = function (time, temporal, threshold) {
        if (typeof temporal === "undefined") { temporal = true; }
        if (typeof threshold === "undefined") { threshold = 0.25; }
        var _this = this;
        var res = this.annotation_at(time);
        this.canvas.clear();
        if (!res)
            return;

        //if (!this.video.paused) {
        this.canvas.off('object:added');
        if (res.doc instanceof Array) {
            res.doc.forEach(function (a) {
                _this.canvas.add(a);
            });
        } else
            this.canvas.add(res.doc);

        this.canvas.on('object:added', function (a) {
            _this.svg_adapter.on_object_added(a);
        });
        if (temporal) {
            this.video.pause();
            window.setTimeout(function () {
                _this.canvas.clear();
                _this.video.play();
            }, 3000);
        }

        //}
        return res;
    };

    VideoController.prototype.apply_op = function (op) {
    };

    VideoController.prototype.start_video_observer = function () {
        var _this = this;
        window.setInterval(function () {
            if (_this.last_video_time == _this.video.currentTime)
                return;

            /*if (this.last_video_time < this.svg_docs[0].time
            && this.svg_docs[0].time <= this.video.currentTime
            && !this.video.paused) {
            this.canvas.add(this.svg_docs[0].doc);
            this.video.pause();
            window.setTimeout(() => {
            this.canvas.clear();
            this.video.play();
            }, 3000);
            }*/
            if (!_this.video.paused)
                _this.display_annotation_at(_this.video.currentTime);

            var intent = {
                "component": "",
                "sender": "",
                "data": "",
                "dataType": "text/xml",
                "action": "UPDATE_VIDEO_TIME",
                "categories": [],
                "flags": ["PUBLISH_LOCAL"],
                "extras": { "time": _this.video.currentTime.toString() }
            };

            if (iwc.util.validateIntent(intent)) {
                console.log('send time intent');
                iwcClient.publish(intent);
            }
            _this.last_video_time = _this.video.currentTime;
        }, 500);
    };
    return VideoController;
})();

var videoCtr;

videoCtr = new VideoController();

function router(intent) {
    console.log('VIDEO WINDOW RECEIVED AN INTENT!');
    switch (intent.action) {
        case 'PLAY/PAUSE':
            videoCtr.play_pause();
            break;
        case 'SET_VIDEO_TIME':
            if (!videoCtr.video.paused)
                videoCtr.play_pause();
            videoCtr.video.currentTime = parseFloat(intent.extras.time);
            videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
            console.log('coll', collab);
            break;
        case 'TOGGLE':
            videoCtr.toggle();
            break;

        case 'COLL_WRITE':
            console.log('collab intent', intent);
            if (intent.sender.indexOf("@") > -1) {
                var len = intent.extras.names.length;
                var i;
                for (i = 0; i < len; i++) {
                    var toApply = collab.ote.remoteEvent(parseInt(new Date().getTime(), 10), intent.extras.names[i]);
                    if (toApply) {
                        //update_pad(toApply);
                    } else {
                        console.error("Couldn't apply remote Event!!!!");
                    }
                }
            }
            break;
    }
}

iwcClient.connect(router);
//# sourceMappingURL=app.js.map