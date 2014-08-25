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
        this.annotations = [];
        this.collabPeerIds = [];
        this.fabricCounter = 0;
        this.video = document.getElementById(id);
        this.start_video_observer();

        //console.log('Collaboration:',collab);
        //console.log('golo video', this.video.duration);
        //this.video.onloadstart = () => { console.log('golo dur', this.video.duration);};
        this.peerId = yatta.getUserId();
        console.log('peer id:', this.peerId);
        this.duration = isNaN(this.video.duration) ? 0 : this.video.duration;
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "UPDATE_VIDEO_DURATION",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": { "duration": this.duration.toString() }
        };

        if (iwc.util.validateIntent(intent)) {
            iwcClient.publish(intent);
            //yatta.getConnector().sendIwcIntent(intent);
        }

        $(this.video).on("durationchange", function () {
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
                //yatta.getConnector().sendIwcIntent(intent);
            }
        });

        setTimeout(function () {
            var intent2 = {
                "component": "",
                "sender": "",
                "data": "",
                "dataType": "text/xml",
                "action": "REGISTER_MY_P2P_ID",
                "categories": [],
                "flags": ["PUBLISH_GLOBAL"],
                "extras": { "peerId": _this.peerId }
            };

            if (iwc.util.validateIntent(intent2)) {
                iwcClient.publish(intent2);
                //yatta.getConnector().sendIwcIntent(intent);
            }
        }, 1000);

        //var canvas;
        //var VIDEO = <HTMLVideoElement>document.getElementById('video_player');
        //console.log('OOOOOOOOOOOOONNNNNN JAAAAAAA');
        this.canvas = new fabric.Canvas('c', {
            isDrawingMode: true
        });
        this.canvas.setHeight(245);
        this.canvas.setWidth(620);
        this.canvas.selection = false;
        this.svg_adapter = new Adapter(this.canvas);

        this.svg_adapter.register_annotation_event(this.on_object_added);

        jQuery('.canvas-container').css({ 'position': 'absolute' });

        fabric.loadSVGFromURL("http://golovin.de/ba/video_canvas/svg/1.svg", function (objects, options) {
            //this.canvas.add(objects[0]);
            //this.annotations.push({ doc: objects[0], time: 5.0 });
            //this.svg_docs[5.0] = objects[0];
            //console.log(this.svg_docs);
            //this.update_anno({ doc: objects[0], time: 5.0 });
        });

        yatta.on('addProperty', function (e, prop) {
            //
            console.log('collab addProperty triggered', prop);
            if (prop.indexOf(_this.peerId) === -1) {
                var anno = yatta.val(prop).val();
                anno.doc = collab.unpackFromYatta(anno.doc);
                console.log('collab received anno and unpacked', anno);
                _this.update_anno(anno);
                _this.display_annotation_at(_this.video.currentTime, false);
            }
        });

        yatta.on('change', function (e, prop) {
            if (prop.indexOf(this.peerId) !== -1)
                return;

            //console.log('collab Property change was triggered', this);
            var id = this.val('collab_id');
            if (id) {
                var doc = videoCtr.get_doc_by_id(id);

                //console.log('collab doc', doc);
                doc[prop] = this.val(prop);
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
            }
        });

        this.svg_adapter.on_object_moved = this.on_object_changed;
        this.svg_adapter.on_object_rotated = this.on_object_changed;
        this.svg_adapter.on_object_scaled = this.on_object_changed;
    }
    VideoController.prototype.set_video_time = function (time) {
        if (!this.video.paused)
            this.play_pause();
        this.video.currentTime = time;
        this.canvas.clear();
    };

    VideoController.prototype.on_object_added = function (object) {
        var id = videoCtr.peerId + '_' + videoCtr.fabricCounter++;
        object.set('collab_id', id);

        var time = parseFloat(videoCtr.video.currentTime.toFixed(2));
        videoCtr.update_anno({ time: time, doc: object });

        var layer = 0;

        //if (object instanceof Array) console.error('warum ist das ein array??');
        var prepDoc = collab.prepareForYatta(object);
        console.log('collab json fabric', prepDoc);
        var anno = { time: time, doc: prepDoc };

        yatta.val(id, anno, "immutable");
        console.log('collab yatta added anno');
    };

    VideoController.prototype.on_object_changed = function (object, event) {
        var tempJson = object.toJSON(['collab_id']);
        var id = object.get('collab_id');
        var tempYatta = collab.unpackFromYatta(yatta.val(id).val('doc').val());
        fabric.util.enlivenObjects([tempYatta], function (objects) {
            var tempJSON2 = objects[0].toJSON(['collab_id']);
            videoCtr.svg_adapter.handle_diverged_props(tempJson, tempJSON2, function (prop) {
                //console.log('would change:', prop, tempJson[prop], tempJSON2[prop]);
                yatta.val(id).val('doc').val(prop, tempJson[prop]);
            });
        });
        /*var id = object.get('collab_id');
        
        if (event === 'object:moving') {
        yatta.val(id).val('doc').val('left', object.left);
        yatta.val(id).val('doc').val('top', object.top);
        }
        if (event === 'object:scaling') {
        yatta.val(id).val('doc').val('left', object.left);
        yatta.val(id).val('doc').val('top', object.top);
        yatta.val(id).val('doc').val('scaleX', object.scaleX);
        yatta.val(id).val('doc').val('scaleY', object.scaleY);
        yatta.val(id).val('doc').val('flipX', object.flipX);
        yatta.val(id).val('doc').val('flipY', object.flipY);
        // console.log('fabric scaled object (old, new)', object.toJSON(['collab_id']) );
        
        }
        if (event === 'object:rotating') {
        yatta.val(id).val('doc').val('angle', object.angle);
        }*/
    };

    VideoController.prototype.update_anno = function (anno) {
        var _this = this;
        console.log('collab time', new Date().getTime());
        var curr_anno = this.annotation_at(anno.time);
        if (!curr_anno) {
            var intent = {
                "component": "",
                "sender": "",
                "data": "",
                "dataType": "text/xml",
                "action": "NEW_ANNOTATION",
                "categories": [],
                "flags": ["PUBLISH_LOCAL"],
                "extras": { "time": anno.time }
            };
            if (iwc.util.validateIntent(intent)) {
                iwcClient.publish(intent);
                //yatta.getConnector().sendIwcIntent(intent);
            }
        }

        if (anno.doc instanceof fabric.Object) {
            if (!curr_anno) {
                this.annotations.push({ time: anno.time, doc: [jQuery.extend(true, {}, anno.doc)] });
            } else {
                curr_anno.doc.push(jQuery.extend(true, {}, anno.doc)); //cloning is important, since objs get destroyed if not displayed
            }
        } else
            fabric.util.enlivenObjects([anno.doc], function (objects) {
                anno.doc = objects[0];

                //this.canvas.add(objects[0]);
                var curr_anno = _this.annotation_at(anno.time);
                if (!curr_anno)
                    _this.annotations.push({ time: anno.time, doc: [jQuery.extend(true, {}, anno.doc)] });
                else {
                    curr_anno.doc.push(jQuery.extend(true, {}, anno.doc)); //cloning is important, since objs get destroyed if not displayed
                }
            });

        this.annotations.sort(function (a, b) {
            return a.time - b.time;
        });
    };

    VideoController.prototype.applyOp = function (op) {
        if (op.type === "insert") {
            this.update_anno(op.value);
            this.display_annotation_at(this.video.currentTime, false);
        } else if (op.type === "delete") {
        } else if (op.type === "update") {
        }
    };

    VideoController.prototype.get_next_anno = function (from) {
        var res = null;
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.annotations[i].time > from) {
                res = this.annotations[i];
                break;
            }
        }
        return res;
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
        this.annotations.forEach(function (anno) {
            var currDist = Math.abs(anno.time - time);
            if (currDist < dist && threshold >= currDist) {
                dist = currDist;
                res = anno;
            }
        });

        return res;
    };

    VideoController.prototype.display_annotation_at = function (time, temporal, threshold) {
        if (typeof time === "undefined") { time = this.video.currentTime; }
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
                try  {
                    /*fabric.util.enlivenObjects([a], (objects)=> {
                    
                    });*/
                    _this.canvas.add(a);
                } catch (e) {
                    console.log(e);
                }
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

    VideoController.prototype.registerPeerId = function (peerId) {
        if (peerId === this.peerId)
            return;
        this.collabPeerIds.push(peerId);
        yatta.connector.connectToPeer(peerId); //two way connection
    };

    VideoController.prototype.start_video_observer = function () {
        var _this = this;
        window.setInterval(function () {
            if (_this.last_video_time == _this.video.currentTime)
                return;

            _this.display_annotation_at(_this.video.currentTime, !_this.video.paused);

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
                //yatta.getConnector().sendIwcIntent(intent);
            }
            _this.last_video_time = _this.video.currentTime;
        }, 500);
    };

    VideoController.prototype.get_doc_by_id = function (id) {
        for (var i = 0; i < this.annotations.length; i++)
            for (var j = 0; j < this.annotations[i].doc.length; j++) {
                if (this.annotations[i].doc[j].get('collab_id') === id)
                    return this.annotations[i].doc[j];
            }
        return null;
    };

    VideoController.prototype.make_circle = function () {
        this.video.pause();
        var circle = new fabric.Circle({
            left: Math.random() * this.canvas.getWidth(),
            top: Math.random() * this.canvas.getHeight(),
            fill: 'rgba(0,0,0,0)',
            radius: 20,
            strokeWidth: 2,
            stroke: 'rgba(0,0,0,1)'
        });
        this.canvas.add(circle);
        this.canvas.renderAll();
    };

    VideoController.prototype.make_rect = function () {
        this.video.pause();
        var rect = new fabric.Rect({
            left: Math.random() * this.canvas.getWidth(),
            top: Math.random() * this.canvas.getHeight(),
            fill: 'rgba(0,0,0,0)',
            width: 20,
            height: 20,
            strokeWidth: 2,
            stroke: 'rgba(0,0,0,1)'
        });
        this.canvas.add(rect);
        this.canvas.renderAll();
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

            break;
        case 'TOGGLE':
            videoCtr.toggle();
            break;

        case 'COLL_WRITE':
            //console.log('collab intent', intent);
            if (intent.sender.indexOf("@") > -1) {
                var len = intent.extras.names.length;
                var i;
                for (i = 0; i < len; i++) {
                    var toApply = collab.ote.remoteEvent(new Date().getTime(), intent.extras.names[i]);
                    if (toApply) {
                        console.log('collab toApplay', toApply);
                        videoCtr.applyOp(toApply);
                        console.log(videoCtr.annotations);
                    } else {
                        console.error("Couldn't apply remote Event!!!!");
                    }
                }
            }
            break;
        case 'REGISTER_MY_P2P_ID':
            videoCtr.registerPeerId(intent.extras.peerId);
            break;

        case 'MAKE_CIRCLE':
            videoCtr.make_circle();
            break;
        case 'MAKE_RECT':
            videoCtr.make_rect();
            break;
    }
}

//yatta.getConnector().setIwcHandler(router);
iwcClient.connect(router);
//# sourceMappingURL=app.js.map
