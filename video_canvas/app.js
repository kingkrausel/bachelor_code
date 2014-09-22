/// <reference path="networkCtr.ts" />
/// <reference path="svg_adapter.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/fabricjs.d.ts" />
//var XML_TEST = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">    < svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" version = "1.1" width = "640" height = "480" xml: space = "preserve" > <desc>Created with Fabric.js 1.4.0 < /desc><defs></defs ><g transform = "translate(196 106)" ><path d = "M 54.5 9 Q 54.5 9 55 9 Q 55.5 9 55.25 9 Q 55 9 53.5 8 Q 52 7 50.5 6 Q 49 5 47 4.5 Q 45 4 43 3.5 Q 41 3 38.5 3 Q 36 3 34.5 2.5 Q 33 2 32 1.5 Q 31 1 30.5 0.5 Q 30 0 28 0 Q 26 0 25 0 Q 24 0 21.5 0.5 Q 19 1 18 1.5 Q 17 2 15.5 3 Q 14 4 13 4.5 Q 12 5 10 7.5 Q 8 10 7.5 11 Q 7 12 5 15.5 Q 3 19 2.5 20.5 Q 2 22 2 23.5 Q 2 25 1 29.5 Q 0 34 0 35.5 Q 0 37 0 40.5 Q 0 44 0 45.5 Q 0 47 0 50 Q 0 53 0 54.5 Q 0 56 0 56.5 Q 0 57 0.5 59 Q 1 61 1 62.5 Q 1 64 1.5 66 Q 2 68 3 69 Q 4 70 5 72 Q 6 74 7 74.5 Q 8 75 9.5 76.5 Q 11 78 11.5 78.5 Q 12 79 13 79.5 Q 14 80 16 81 Q 18 82 18.5 82 Q 19 82 20 82 Q 21 82 22 82 Q 23 82 25 82 Q 27 82 28 82 Q 29 82 30.5 82 Q 32 82 32.5 82 Q 33 82 34.5 81 Q 36 80 37 79.5 Q 38 79 38.5 78.5 Q 39 78 41 77 Q 43 76 43.5 75.5 Q 44 75 45 74 Q 46 73 47 72.5 Q 48 72 49.5 71 Q 51 70 51.5 69 Q 52 68 52.5 68 Q 53 68 54 67 Q 55 66 55.5 65 Q 56 64 56 63.5 Q 56 63 57.5 61 Q 59 59 59.5 58 Q 60 57 61 54.5 Q 62 52 62.5 51 Q 63 50 63 49 Q 63 48 64 47 Q 65 46 65 45 Q 65 44 65 43.5 Q 65 43 65.5 39 Q 66 35 66 33.5 Q 66 32 66 29 Q 66 26 66 25.5 Q 66 25 66 24 Q 66 23 65.5 23 Q 65 23 64.5 22.5 Q 64 22 64 21.5 Q 64 21 63.5 21 Q 63 21 62.5 21 Q 62 21 61.5 20.5 Q 61 20 60.5 19.5 Q 60 19 59.5 18.5 Q 59 18 58 17.5 Q 57 17 56.5 16.5 Q 56 16 55 15 Q 54 14 53.5 13 Q 53 12 52.5 11.5 Q 52 11 52 10 Q 52 9 51.5 9 Q 51 9 50.5 8.5 Q 50 8 49.5 7 Q 49 6 48.5 4.5 Q 48 3 47.5 3 Q 47 3 46.5 3 L 46 3" style = "stroke: rgb(0, 0, 0); stroke-width: 1; stroke-dasharray: ; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; opacity: 1;" transform = "translate(-33 -41)" stroke - linecap ="round" / ></g></svg >';
var XML_TEST = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>    < svg id = "svg2816" xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 48 48" version = "1.1" xmlns: cc = "http://creativecommons.org/ns#" xmlns: dc = "http://purl.org/dc/elements/1.1/" > <defs id = "defs2818" >< / defs > <metadata id = "metadata2821" >  <rdf:RDF>   <cc:Work rdf: about = "" >    <dc:format > image / svg + xml </dc:format >    <dc:type rdf: resource ="http://purl.org/dc/dcmitype/StillImage"/ >    <dc:title/ >   </cc:Work >  </rdf:RDF > < / metadata > <g id = "layer1" stroke - linejoin = "miter" stroke = "#ce3762" stroke - linecap = "butt" >  <path id = "path2828" style = "stroke-dasharray:none;" d = "M40,3,35,3,20,18,10,18s-5,5,0,10h10l15,15h5v-40z" transform = "translate(-5,0)" stroke - miterlimit = "4" stroke - width = "0.5" fill ="#42101e"/ >  <path id = "path2830" d = "m37,13s2,7.5359,0,15" transform = "translate(0,2)" stroke - width = "1px" fill ="none"/ >  <path id = "path2834" d = "m40,11s3,10,0,19" transform = "translate(0,2)" stroke - width = "1px" fill ="none"/ >  <path id = "path2836" d = "m43,6s6,14,0,29" transform = "translate(0,2)" stroke - width = "1px" fill ="none"/ > < / g >< / svg >';

var SVG_TEST;
var SVG_ARROW = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 16.0.4, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="104.08px" height="94.747px" viewBox="0 0 104.08 94.747" enable-background="new 0 0 104.08 94.747" xml:space="preserve"> <path d="M104.08,47.374L56.707,94.747l-1.414-1.414l45.959-45.959L55.293,1.414L56.707,0L104.08,47.374z M100.112,46.374H0v2 h100.112V46.374z"/> </svg> ';
var HACK_JOIN_NTWRK = 0;
var HACK_JOIN_COUNTER = 3;
var VideoController = (function () {
    /////public isPlaying: boolean = false;
    function VideoController(id) {
        if (typeof id === "undefined") { id = 'video_player'; }
        var _this = this;
        this.last_video_time = 0;
        this.annotations = [];
        this.video_anno_map = {};
        this.collabPeerIds = [];
        this.fabricCounter = 0;
        this.watching_anno = false;
        this.video_observer_timer = 0;
        this.color = 'black';
        this.activeDoc = null;
        this.last_displayed_anno = null;
        this.curr_anno = null;
        this.isMaster = false;
        this.server_updater_timer = 0;
        this.video = document.getElementById(id);
        this.start_video_observer();
        fabric.loadSVGFromString(SVG_ARROW, function (objs, options) {
            _this.fabric_arrow = objs[0];
        });

        //console.log('Collaboration:',collab);
        //console.log('golo video', this.video.duration);
        //this.video.onloadstart = () => { console.log('golo dur', this.video.duration);};
        this.peerId = yatta.getUserId();
        console.log('peer id:', this.peerId);
        this.duration = isNaN(this.video.duration) ? 0 : this.video.duration;
        if (!isNaN(this.video.duration))
            locallySendIntent("UPDATE_VIDEO_DURATION", { "duration": this.duration.toString() });

        $(this.video).on("durationchange", function () {
            _this.duration = _this.video.duration;
            var dur = _this.duration;
            locallySendIntent("UPDATE_VIDEO_DURATION", { "duration": dur.toString() });
        });

        HACK_JOIN_NTWRK = setInterval(function () {
            if (HACK_JOIN_COUNTER-- <= 0)
                clearInterval(HACK_JOIN_NTWRK);
            if (_this.collabPeerIds.length > 0)
                clearInterval(HACK_JOIN_NTWRK);
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
        try  {
            this.svg_adapter = new Adapter(this.canvas);
            this.svg_adapter.register_annotation_event(this.on_object_added);
        } catch (e) {
            jQuery('#includedContent').append('<h1>Fabric Adapter was not loadad. Reload the page.</h1>');
        }

        jQuery('.canvas-container').css({ 'position': 'absolute' });

        fabric.loadSVGFromURL("http://golovin.de/ba/media/1.svg", function (objects, options) {
            SVG_TEST = objects;
            /*setTimeout(() => {
            var loadedObjects = objects[0];
            videoCtr.canvas.add(loadedObjects);
            videoCtr.canvas.renderAll();
            }, 2000);
            //*/
            //this.annotations.push({ doc: objects[0], time: 5.0 });
            //this.svg_docs[5.0] = objects[0];
            //console.log(this.svg_docs);
            //this.update_anno({ doc: objects[0], time: 5.0 });
        });

        yatta.on('addProperty', function (e, prop) {
            //
            console.log('collab addProperty triggered', prop);
            if (prop.indexOf(_this.peerId) === -1 && prop.indexOf('//:') === -1) {
                for (var url in yatta.val()) {
                    if (yatta.val(url).val(prop) !== undefined) {
                        var anno = yatta.val(url).val(prop).val();
                        anno.doc = collab.unpackFromYatta(anno.doc);

                        //console.log('collab received anno and unpacked', anno);
                        if (_this.video.src === url) {
                            _this.update_anno(anno);
                            _this.display_annotation_at(_this.video.currentTime, false);
                            //break;
                        } else {
                            fabric.util.enlivenObjects([anno.doc], function (objects) {
                                anno.doc = objects[0];
                                _this.video_anno_map[url] = _this.video_anno_map[url] ? _this.video_anno_map[url] : [];
                                var curr_anno = _this.annotation_at(anno.time, url);

                                if (!curr_anno) {
                                    _this.video_anno_map[url].push({ time: anno.time, doc: [anno.doc] });
                                } else {
                                    curr_anno.doc.push(anno.doc);
                                }
                            });

                            _this.video_anno_map[url].sort(function (a, b) {
                                return a.time - b.time;
                            });
                        }
                    }
                }
                /* var anno = yatta.val(prop).val();
                anno.doc = collab.unpackFromYatta(anno.doc);
                console.log('collab received anno and unpacked', anno);
                this.update_anno(anno);
                this.display_annotation_at(this.video.currentTime, false);    */
            }
        });

        yatta.on('change', function (e, prop, op) {
            if (prop.indexOf('//:') !== -1)
                return;

            //console.log('collab Property change was triggered', this);
            if (op.creator == yatta.getUserId()) {
                //console.log("You changed the value of property '" + prop + "'!");
                return;
            }
            if (this.val(prop) === 'deleted') {
                // console.warn('have to delete stuff (TODO)', this.val());
                videoCtr.delete_object(prop);
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
                return;
            }
            var id = this.val('collab_id');
            if (id) {
                var doc = videoCtr.get_doc_by_id(id);

                //console.log('collab doc', this);
                /* if (doc[prop] !== this.val(prop)) { //remote change or nearly euqivalent numbers
                
                if (typeof this.val(prop) === 'number') {
                if (Math.floor(this.val(prop)) === Math.floor(doc[prop])) {
                console.log('collab doc, change ', doc[prop], 'to', this.val(prop));
                doc[prop] = this.val(prop);
                return;
                }
                }
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
                }*/
                doc[prop] = this.val(prop);
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
            }
        });

        this.svg_adapter.on_object_moved = this.on_object_changed;
        this.svg_adapter.on_object_rotated = this.on_object_changed;
        this.svg_adapter.on_object_scaled = this.on_object_changed;

        locallySendIntent("I_AM_ALIVE", { widget: 'video_canvas' });
        locallySendIntent("PEED_ID", { peerId: this.peerId });
        networkCtrl.joinNetwork(this.peerId);
        this.change_video('http://golovin.de/ba/parking.mp4');

        jQuery("body").keyup(function (event) {
            if (event.keyCode == 46) {
                _this.delete_selected();
            }
            //console.log('keypress!', event.keyCode);
        });
    }
    VideoController.prototype.set_video_time = function (time) {
        // if (!this.video.paused) this.play_pause();
        this.video.currentTime = time;
        this.canvas.clear();
    };

    VideoController.prototype.on_object_added = function (object) {
        var videoURL = videoCtr.video.src;

        console.log('fabric added:', object);
        var id = videoCtr.peerId + '_' + videoCtr.fabricCounter++;
        object.set('collab_id', id);

        var time = parseFloat(videoCtr.video.currentTime.toFixed(2));

        videoCtr.update_anno({ time: time, doc: object });

        var layer = 0;

        //if (object instanceof Array) console.error('warum ist das ein array??');
        var prepDoc = collab.prepareForYatta(object);

        //console.log('collab json fabric', prepDoc);
        var anno = { time: time, doc: prepDoc };
        if (yatta.val(videoURL) === undefined)
            yatta.val(videoURL, {}, "immutable");
        yatta.val(videoURL).val(id, anno, "immutable");

        //yatta.val(id, anno, "immutable");
        //console.log('collab yatta added anno');
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": "OWN_NEW_ANNO",
            "categories": [],
            "flags": ["PUBLISH_LOCAL"],
            "extras": { "time": anno.time }
        };

        iwcClient.publish(intent);
    };

    VideoController.prototype.on_object_changed = function (object, event) {
        if (object instanceof fabric.Group) {
            object.getObjects().forEach(function (obj) {
                console.log('on_object_changed', obj);
                videoCtr.on_object_changed(obj, 'recursion');
            });
            return;
        }

        //console.log('on_object_changed not recursive', object);
        var tempJson = object.toJSON(['collab_id']);
        var id = object.get('collab_id');

        //var tempYatta = collab.unpackFromYatta(yatta.val(id).val('doc').val());
        var tempYatta = yatta.val(videoCtr.video.src).val(id).val('doc').val();

        videoCtr.svg_adapter.handle_diverged_props(tempJson, tempYatta, function (prop) {
            //console.log('would change:', prop, tempJson[prop], tempJSON2[prop]);
            //yatta.val(id).val('doc').val(prop, tempJson[prop]);
            yatta.val(videoCtr.video.src).val(id).val('doc').val(prop, tempJson[prop]);
        });
        /*var tempYatta = collab.unpackFromYatta(yatta.val(videoCtr.video.src).val(id).val('doc').val());
        
        fabric.util.enlivenObjects([tempYatta], (objects) => {
        var tempJSON2 = objects[0].toJSON(['collab_id']);
        videoCtr.svg_adapter.handle_diverged_props(tempJson, tempJSON2, (prop) => {
        //console.log('would change:', prop, tempJson[prop], tempJSON2[prop]);
        //yatta.val(id).val('doc').val(prop, tempJson[prop]);
        yatta.val(videoCtr.video.src).val(id).val('doc').val(prop, tempJson[prop]);
        });
        
        }); //*/
    };

    VideoController.prototype.update_anno = function (anno) {
        var _this = this;
        //console.log('collab time', new Date().getTime());
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
            var cloneObj;
            var test = anno.doc.clone(function (obj) {
                console.log('cloned obj1', obj);
                cloneObj = obj;
            }, ['collab_id']);
            cloneObj = test ? test : cloneObj; //sometimes test works? (bug in fabric)

            //cloneObj = anno.doc;
            //console.log('cloned obj', cloneObj);
            //console.log('cloned test', test);
            if (!curr_anno) {
                this.annotations.push({ time: anno.time, doc: [cloneObj] });
                //this.annotations.push({ time: anno.time, doc: [jQuery.extend(true, {}, anno.doc)] });
            } else {
                // curr_anno.doc.push(jQuery.extend(true, {}, anno.doc)); //cloning is important, since objs get destroyed if not displayed
                curr_anno.doc.push(cloneObj);
            }

            this.display_annotation_at(this.video.currentTime, false);
        } else
            fabric.util.enlivenObjects([anno.doc], function (objects) {
                anno.doc = objects[0];

                //console.log('fabric enlivenObjects', anno.doc);
                //this.canvas.add(objects[0]);
                var curr_anno = _this.annotation_at(anno.time);
                if (!curr_anno)
                    //this.annotations.push({ time: anno.time, doc: [jQuery.extend(true, {}, anno.doc)] });
                    _this.annotations.push({ time: anno.time, doc: [anno.doc] });
                else {
                    //curr_anno.doc.push(jQuery.extend(true, {}, anno.doc)); //cloning is important, since objs get destroyed if not displayed
                    curr_anno.doc.push(anno.doc);
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

    VideoController.prototype.play_pause = function (force) {
        if (typeof force === "undefined") { force = 'no'; }
        //this.video = VIDEO;
        if (force === 'PLAY') {
            //this.start_video_observer();
            this.video.play();
        } else if (force === 'PAUSE') {
            //window.clearInterval(this.video_observer_timer);
            this.video.pause();
        }

        if (force === 'no') {
            if (this.video.paused) {
                this.video.play();
            } else {
                this.video.pause();
            }
        }
    };

    VideoController.prototype.toggle = function () {
        //console.log('toggle');
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    };

    VideoController.prototype.annotation_at = function (time, url, threshold) {
        if (typeof threshold === "undefined") { threshold = 0.25; }
        var res = null;
        if (!url)
            url = this.video.src;
        var dist = 10000000;

        var annotations = this.video_anno_map[url] ? this.video_anno_map[url] : [];
        annotations.forEach(function (anno) {
            var currDist = Math.abs(anno.time - time);
            if (currDist < dist && threshold >= currDist) {
                dist = currDist;
                res = anno;
            }
        });

        return res;
    };

    /* public i_am_at_anno() {
    var time = this.curr_anno ? this.curr_anno.time : -1;
    networkCtrl.sendIntent('I_AM_AT_ANNO', [], {peerId: this.peerId, time: time});
    }*/
    VideoController.prototype.display_annotation_at = function (time, temporal, threshold) {
        if (typeof time === "undefined") { time = this.video.currentTime; }
        if (typeof temporal === "undefined") { temporal = true; }
        if (typeof threshold === "undefined") { threshold = 0.25; }
        var _this = this;
        var res = this.annotation_at(time);
        this.last_displayed_anno = this.curr_anno;
        this.curr_anno = res;

        //console.log('display at time', time);
        //console.log('display at', res);
        /*if (this.curr_anno !== this.last_displayed_anno) {
        this.i_am_at_anno();
        }*/
        if (!res) {
            this.canvas.clear();
            return null;
        }
        var cacheActive = this.activeDoc;

        // if (res != this.last_displayed_anno) {
        this.canvas.clear();

        //if (!this.video.paused) {
        this.canvas.off('object:added');
        if (res.doc instanceof Array) {
            res.doc.forEach(function (a) {
                try  {
                    _this.canvas.add(a);
                } catch (e) {
                    console.error(e);
                }
            });
        } else
            this.canvas.add(res.doc);

        //this.canvas.renderAll();
        this.canvas.on('object:added', function (a) {
            _this.svg_adapter.on_object_added(a.target);
        });

        //  }
        if (temporal) {
            this.video.pause();
            window.setTimeout(function () {
                _this.canvas.clear();
                _this.video.play();
            }, 3000);
        }

        if (cacheActive)
            this.canvas.setActiveObject(cacheActive);
        return res;
    };

    VideoController.prototype.registerPeerId = function (peerId) {
        if (peerId === this.peerId)
            return;
        if (this.collabPeerIds.indexOf(peerId) !== -1)
            return;
        this.collabPeerIds.push(peerId);
        yatta.connector.connectToPeer(peerId); //two way connection
    };

    VideoController.prototype.update_color = function (color) {
        this.color = color;
        this.canvas.freeDrawingBrush.color = color;
        var fObj = this.canvas.getActiveObject();
        if (fObj) {
            fObj.setOptions({ stroke: color });
            this.canvas.renderAll();
            console.log('fabric color change', fObj);
            yatta.val(this.video.src).val(fObj.get('collab_id')).val('doc').val('stroke', color);
        }
    };

    VideoController.prototype.start_video_observer = function () {
        var _this = this;
        this.video_observer_timer = window.setInterval(function () {
            if (_this.video.paused)
                return;

            _this.canvas.clear();

            if (Math.abs(_this.last_video_time - _this.video.currentTime) > 0.3) {
                var intent = {
                    "component": "",
                    "sender": "",
                    "data": "",
                    "dataType": "text/xml",
                    "action": "UPDATE_VIDEO_TIME",
                    "categories": [],
                    "flags": ["PUBLISH_LOCAL"],
                    "extras": { "time": _this.video.currentTime }
                };

                if (iwc.util.validateIntent(intent)) {
                    //console.log('send time intent');
                    iwcClient.publish(intent);
                    //yatta.getConnector().sendIwcIntent(intent);
                }
                _this.last_video_time = _this.video.currentTime;
            }
        }, 100);
    };

    VideoController.prototype.get_doc_by_id = function (id) {
        for (var url in this.video_anno_map) {
            var annotations = this.video_anno_map[url];
            for (var i = 0; i < annotations.length; i++)
                for (var j = 0; j < annotations[i].doc.length; j++) {
                    if (annotations[i].doc[j].get('collab_id') === id)
                        return annotations[i].doc[j];
                }
        }
        return null;
    };

    VideoController.prototype.get_anno_by_docId = function (id) {
        for (var url in this.video_anno_map) {
            var annotations = this.video_anno_map[url];
            for (var i = 0; i < annotations.length; i++)
                for (var j = 0; j < annotations[i].doc.length; j++) {
                    if (annotations[i].doc[j].get('collab_id') === id)
                        return annotations[i];
                }
        }
        return null;
    };

    VideoController.prototype.get_video_by_docId = function (id) {
        for (var url in this.video_anno_map) {
            var annotations = this.video_anno_map[url];
            for (var i = 0; i < annotations.length; i++)
                for (var j = 0; j < annotations[i].doc.length; j++) {
                    if (annotations[i].doc[j].get('collab_id') === id)
                        return url;
                }
        }
        return null;
    };

    VideoController.prototype.make_circle = function () {
        this.video.pause();
        var circle = new fabric.Circle({
            left: Math.random() * this.canvas.getWidth() * 0.8,
            top: Math.random() * this.canvas.getHeight() * 0.8,
            fill: 'rgba(0,0,0,0)',
            radius: 20,
            strokeWidth: 2,
            stroke: this.color
        });
        this.canvas.add(circle);
        this.canvas.renderAll();
    };

    VideoController.prototype.make_rect = function () {
        this.video.pause();
        var rect = new fabric.Rect({
            left: Math.random() * this.canvas.getWidth() * 0.8,
            top: Math.random() * this.canvas.getHeight() * 0.8,
            fill: 'rgba(0,0,0,0)',
            width: 20,
            height: 20,
            strokeWidth: 2,
            stroke: this.color
        });
        this.canvas.add(rect);
        this.canvas.renderAll();
    };

    VideoController.prototype.make_itext = function () {
        this.video.pause();
        var itext = new fabric.IText('text');
        this.canvas.add(itext);
        this.canvas.renderAll();
    };

    VideoController.prototype.make_arrow = function () {
        this.video.pause();
        this.canvas.add(this.fabric_arrow);
        this.canvas.renderAll();
    };

    VideoController.prototype.change_video = function (url) {
        this.video.src = url;

        if (!this.video_anno_map[url]) {
            this.video_anno_map[url] = [];
        }

        this.annotations = this.video_anno_map[url];
        this.display_annotation_at(0, false);

        this.annotations.forEach(function (anno) {
            locallySendIntent("NEW_ANNOTATION", { "time": anno.time });
        });
    };

    VideoController.prototype.master_changed = function (isMaster) {
        this.isMaster = isMaster;
        console.log('became master', this.isMaster);
        if (this.isMaster) {
            if (this.annotations.length === 0) {
                fabric.loadSVGFromURL('http://golovin.de/ba/media/awesome.svg', function (objs) {
                    objs.forEach(function (obj) {
                        console.log('master added from server', obj);
                        // this.on_object_added(obj, 'http://137.226.58.2:8888/v1/AUTH_451035e5f9504a878946697522070c43/public/00022.mp4', 200);
                    });
                });
            }
            this.start_server_updater();
        }
    };

    VideoController.prototype.push_svg_to_mpeg7_test = function () {
        var svg = this.canvas.toSVG();
        var time = 500;
        var anno = { time: time, svg: svg };
        var videoURL = 'http://137.226.58.2:8888/v1/AUTH_451035e5f9504a878946697522070c43/public/00022.mp4';
        return anno;
    };

    VideoController.prototype.start_server_updater = function () {
        this.server_updater_timer = setInterval(function () {
            console.log('Update Server');
        }, 5000);
    };

    VideoController.prototype.stop_server_updater = function () {
        clearInterval(this.server_updater_timer);
    };

    VideoController.prototype.on_xmpp_connection = function () {
        HACK_JOIN_COUNTER = 1; //next REGISTER_MY_PEERID will succeed (hopefully)
    };

    VideoController.prototype.delete_selected = function () {
        var selected = this.canvas.getActiveObject();

        if (selected === null)
            return;
        var id = selected.get('collab_id');
        yatta.val(this.video.src).val(id, 'deleted');
        this.delete_object(id);
        this.display_annotation_at(this.video.currentTime, false);
        /* var id = selected.get('collab_id');
        yatta.val(this.video.src).val(id, 'deleted');
        console.log('before remove', selected);
        this.canvas.remove(selected);
        var annos = this.annotations;//this.get_anno_by_docId(id);
        for (var i = 0; i < annos.length; i++) {
        for (var j = 0; j < annos[i].doc.length; j++) {
        if (annos[i].doc[j] === selected) {
        annos[i].doc.splice(j, 1);
        }
        }
        }
        console.log('after remove', selected);*/
    };

    VideoController.prototype.delete_object = function (id) {
        for (var url in this.video_anno_map) {
            var annotations = this.video_anno_map[url];
            for (var i = 0; i < annotations.length; i++)
                for (var j = 0; j < annotations[i].doc.length; j++) {
                    if (annotations[i].doc[j].get('collab_id') === id) {
                        if (annotations[i].doc.length === 1)
                            locallySendIntent('DELETE_ANNO', { time: annotations[i].time });
                        annotations[i].doc.splice(j, 1);
                        if (annotations[i].doc.length === 0) {
                            annotations.splice(i, 1);
                        }
                        return;
                    }
                }
        }
        //console.log('after remove', toDelete);
    };
    return VideoController;
})();

function sleep(milliseconds) {
    var start = new Date().getTime();

    while ((new Date().getTime() - start) < milliseconds)
        ;
}

var videoCtr;

videoCtr = new VideoController();

function router(intent) {
    if (intent.sender.length > 0)
        videoCtr.on_xmpp_connection();

    switch (intent.action) {
        case 'PLAY/PAUSE':
            videoCtr.play_pause();
            break;
        case 'PLAY':
            videoCtr.play_pause('PLAY');
            break;
        case 'PAUSE':
            videoCtr.play_pause('PAUSE');
            break;
        case 'SET_VIDEO_TIME':
            try  {
                videoCtr.video.currentTime = parseFloat(intent.extras.time);
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
            } catch (e) {
                console.warn('versucht video-time zu aendern.');
            }

            break;
        case 'TOGGLE':
            videoCtr.toggle();
            break;
        case 'ACTION_OPEN':
            videoCtr.change_video(intent.data);
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
        case 'MAKE_ITEXT':
            videoCtr.make_itext();
            break;
        case 'MAKE_ARROW':
            videoCtr.make_arrow();
            break;
        case 'SET_COLOR':
            videoCtr.update_color(intent.extras.color);
            break;

        case 'I_AM_ALIVE':
            if (intent.extras.widget === 'controls') {
                videoCtr.annotations.forEach(function (anno) {
                    locallySendIntent("NEW_ANNOTATION", { "time": anno.time });
                });
                locallySendIntent("UPDATE_VIDEO_DURATION", { "duration": videoCtr.duration.toString() });
                locallySendIntent("PEED_ID", { "peerId": videoCtr.peerId });
            }
            break;

        case 'JOIN_NETWORK':
            break;
        case 'MASTER_STATUS':
            //TODO: only master boradcasts data of all users
            videoCtr.master_changed(intent.extras.isMaster);
            break;
    }

    routerNetwork(intent);
}

//yatta.getConnector().setIwcHandler(router);
iwcClient.connect(router);

function locallySendIntent(action, extras) {
    if (typeof extras === "undefined") { extras = {}; }
    var intent = {
        "component": "",
        "sender": "",
        "data": "",
        "dataType": "text/xml",
        "action": action,
        "categories": [],
        "flags": ["PUBLISH_LOCAL"],
        "extras": extras
    };
    iwcClient.publish(intent);
}
//# sourceMappingURL=app.js.map
