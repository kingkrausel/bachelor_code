/// <reference path="networkCtr.ts" />
/// <reference path="svg_adapter.ts" />
/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/fabricjs.d.ts" />
//var XML_TEST = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">    < svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" version = "1.1" width = "640" height = "480" xml: space = "preserve" > <desc>Created with Fabric.js 1.4.0 < /desc><defs></defs ><g transform = "translate(196 106)" ><path d = "M 54.5 9 Q 54.5 9 55 9 Q 55.5 9 55.25 9 Q 55 9 53.5 8 Q 52 7 50.5 6 Q 49 5 47 4.5 Q 45 4 43 3.5 Q 41 3 38.5 3 Q 36 3 34.5 2.5 Q 33 2 32 1.5 Q 31 1 30.5 0.5 Q 30 0 28 0 Q 26 0 25 0 Q 24 0 21.5 0.5 Q 19 1 18 1.5 Q 17 2 15.5 3 Q 14 4 13 4.5 Q 12 5 10 7.5 Q 8 10 7.5 11 Q 7 12 5 15.5 Q 3 19 2.5 20.5 Q 2 22 2 23.5 Q 2 25 1 29.5 Q 0 34 0 35.5 Q 0 37 0 40.5 Q 0 44 0 45.5 Q 0 47 0 50 Q 0 53 0 54.5 Q 0 56 0 56.5 Q 0 57 0.5 59 Q 1 61 1 62.5 Q 1 64 1.5 66 Q 2 68 3 69 Q 4 70 5 72 Q 6 74 7 74.5 Q 8 75 9.5 76.5 Q 11 78 11.5 78.5 Q 12 79 13 79.5 Q 14 80 16 81 Q 18 82 18.5 82 Q 19 82 20 82 Q 21 82 22 82 Q 23 82 25 82 Q 27 82 28 82 Q 29 82 30.5 82 Q 32 82 32.5 82 Q 33 82 34.5 81 Q 36 80 37 79.5 Q 38 79 38.5 78.5 Q 39 78 41 77 Q 43 76 43.5 75.5 Q 44 75 45 74 Q 46 73 47 72.5 Q 48 72 49.5 71 Q 51 70 51.5 69 Q 52 68 52.5 68 Q 53 68 54 67 Q 55 66 55.5 65 Q 56 64 56 63.5 Q 56 63 57.5 61 Q 59 59 59.5 58 Q 60 57 61 54.5 Q 62 52 62.5 51 Q 63 50 63 49 Q 63 48 64 47 Q 65 46 65 45 Q 65 44 65 43.5 Q 65 43 65.5 39 Q 66 35 66 33.5 Q 66 32 66 29 Q 66 26 66 25.5 Q 66 25 66 24 Q 66 23 65.5 23 Q 65 23 64.5 22.5 Q 64 22 64 21.5 Q 64 21 63.5 21 Q 63 21 62.5 21 Q 62 21 61.5 20.5 Q 61 20 60.5 19.5 Q 60 19 59.5 18.5 Q 59 18 58 17.5 Q 57 17 56.5 16.5 Q 56 16 55 15 Q 54 14 53.5 13 Q 53 12 52.5 11.5 Q 52 11 52 10 Q 52 9 51.5 9 Q 51 9 50.5 8.5 Q 50 8 49.5 7 Q 49 6 48.5 4.5 Q 48 3 47.5 3 Q 47 3 46.5 3 L 46 3" style = "stroke: rgb(0, 0, 0); stroke-width: 1; stroke-dasharray: ; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; opacity: 1;" transform = "translate(-33 -41)" stroke - linecap ="round" / ></g></svg >';
/**********************************
Google accounts:
rolegolovin
rolesdktest
justgive...
*/
var lasFeedbackHandler = function (statusCode, message) {
    console.log("VD: Feedback: " + statusCode + ", " + message);
};

var lasClient = new LasAjaxClient("video drawer", lasFeedbackHandler);

var XML_TEST = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>    < svg id = "svg2816" xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 48 48" version = "1.1" xmlns: cc = "http://creativecommons.org/ns#" xmlns: dc = "http://purl.org/dc/elements/1.1/" > <defs id = "defs2818" >< / defs > <metadata id = "metadata2821" >  <rdf:RDF>   <cc:Work rdf: about = "" >    <dc:format > image / svg + xml </dc:format >    <dc:type rdf: resource ="http://purl.org/dc/dcmitype/StillImage"/ >    <dc:title/ >   </cc:Work >  </rdf:RDF > < / metadata > <g id = "layer1" stroke - linejoin = "miter" stroke = "#ce3762" stroke - linecap = "butt" >  <path id = "path2828" style = "stroke-dasharray:none;" d = "M40,3,35,3,20,18,10,18s-5,5,0,10h10l15,15h5v-40z" transform = "translate(-5,0)" stroke - miterlimit = "4" stroke - width = "0.5" fill ="#42101e"/ >  <path id = "path2830" d = "m37,13s2,7.5359,0,15" transform = "translate(0,2)" stroke - width = "1px" fill ="none"/ >  <path id = "path2834" d = "m40,11s3,10,0,19" transform = "translate(0,2)" stroke - width = "1px" fill ="none"/ >  <path id = "path2836" d = "m43,6s6,14,0,29" transform = "translate(0,2)" stroke - width = "1px" fill ="none"/ > < / g >< / svg >';

var SVG_TEST;
var SVG_ARROW = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 16.0.4, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="104.08px" height="94.747px" viewBox="0 0 104.08 94.747" enable-background="new 0 0 104.08 94.747" xml:space="preserve"> <path d="M104.08,47.374L56.707,94.747l-1.414-1.414l45.959-45.959L55.293,1.414L56.707,0L104.08,47.374z M100.112,46.374H0v2 h100.112V46.374z"/> </svg> ';
var HACK_JOIN_NTWRK = 0;
var HACK_JOIN_COUNTER = 60;
var HACK_FABRIC_E = null;
var DEVELOPMENT = true;

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
        this.max_path_length = 400;
        this.yatta_garbage_time = 0;
        this.yatta_garbage_timeout = 10 * 1000;
        this.op_buffer = {};
        this.connected = false;
        this.lasurl = "http://steen.informatik.rwth-aachen.de:9914/";
        this.appCode = "vc";
        this.not_saved_annos_buffer = {};
        this.not_in_network_annos = {};
        //loading();
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
            //console.log('measurment received new object:', new Date().getTime());
            //console.log('collab addProperty triggered', prop);
            if (prop === 'not_saved')
                return;

            if (prop.indexOf(_this.peerId) === -1 && prop.indexOf('://') === -1) {
                for (var url in yatta.val()) {
                    if (yatta.val(url).val(prop) !== undefined && yatta.val(url).val(prop) !== 'deleted') {
                        console.log('DG add object:', prop);
                        var anno = yatta.val(url).val(prop).val();
                        var local_anno = videoCtr.get_anno_by_url_time(url, anno.time);
                        if (local_anno !== null) {
                            if (local_anno.not_in_network === true) {
                                _this.delete_anno_by_url_time(url, anno.time); //delete it locally, because someone else put it into the network
                            }
                        }
                        anno.doc = collab.unpackFromYatta(anno.doc);
                        console.log('collab received anno and unpacked', anno);
                        if (_this.video.src === url) {
                            _this.update_anno(anno);
                            _this.display_annotation_at(_this.video.currentTime, false);
                            //break;
                        } else {
                            if (anno.doc.type === 'i-text')
                                anno.doc.text = 'text'; //hack
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
            if (prop.indexOf('://') !== -1)
                return;

            //console.log('collab Property change was triggered', this);
            if (prop === 'not_saved')
                return;

            /*if (videoCtr.isMaster) {
            var time = this.replace_manager.parent.val().time;
            if (time !== null && time !== undefined) {
            var videoURL = videoCtr.get_video_by_docId(id);
            if (videoURL === null) return;
            console.log('DG anno changed at:', videoURL, time);
            
            videoCtr.mark_anno_as_not_saved(videoURL, time);
            }
            
            }*/
            if (op.creator == yatta.getUserId()) {
                //console.log("You changed the value of property '" + prop + "'!");
                //if (prop === 'text')
                // return;
            }

            if (this.val(prop) === 'deleted') {
                // console.warn('have to delete stuff (TODO)', this.val());
                videoCtr.delete_object(prop);
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);
                return;
            }

            //console.log('measurment received new change:', new Date().getTime());
            var id = this.val('collab_id');

            if (id) {
                var doc = videoCtr.get_doc_by_id(id);

                //console.log('collab doc', doc);
                if (doc === null)
                    return;

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
                console.log('collab changed recieved on prop', prop, this.val(prop));
                if (prop !== 'isEditing') {
                    if (this.val(prop) instanceof Object) {
                        doc[prop] = this.val(prop).val();
                    } else {
                        doc[prop] = this.val(prop);
                    }
                }

                //doc.animate(prop, this.val(prop), { onChange: videoCtr.canvas.renderAll.bind(canvas) });
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);

                if (videoCtr.isMaster) {
                    var time = this.replace_manager.parent.val().time;
                    if (time !== null && time !== undefined) {
                        console.log('DG anno changed at:', time);
                        var videoURL = videoCtr.get_video_by_docId(id);
                        videoCtr.mark_anno_as_not_saved(videoURL, time);
                    }
                }
            }
        });

        this.svg_adapter.on_object_moved = this.on_object_changed;
        this.svg_adapter.on_object_rotated = this.on_object_changed;
        this.svg_adapter.on_object_scaled = this.on_object_changed;

        locallySendIntent("I_AM_ALIVE", { widget: 'video_canvas' });
        locallySendIntent("PEER_ID", { peerId: this.peerId });
        networkCtrl.joinNetwork(this.peerId);
        this.change_video('http://golovin.de/ba/parking.mp4');

        jQuery("body").keyup(function (event) {
            if (event.keyCode == 46) {
                var selected = _this.canvas.getActiveObject();
                if (selected instanceof fabric.IText && selected.isEditing)
                    return;

                _this.delete_selected();
            }
            //console.log('keypress!', event.keyCode);
        });

        setInterval(function () {
            videoCtr.flushBuffer();
        }, 200);

        yatta.getConnector().peer.on('connection', function () {
            HACK_JOIN_COUNTER = 0;
            locallySendIntent("CONNECTION_STATUS", { status: 'connected' });
            videoCtr.connected = true;
            kill_loading();
        });

        yatta.getConnector().peer.on('close', function () {
            HACK_JOIN_COUNTER = 0;
            locallySendIntent("CONNECTION_STATUS", { status: 'close' });
            videoCtr.connected = false;
        });

        yatta.getConnector().peer.on('disconnected', function () {
            HACK_JOIN_COUNTER = 0;
            locallySendIntent("CONNECTION_STATUS", { status: 'disconnected' });
            videoCtr.connected = true;
        });

        locallySendIntent("GET_LAS_INFO");
        //this.yatta_garbage_time = setInterval(() => { console.log('clearing garbage!'); yatta.HB.emptyGarbage(); }, this.yatta_garbage_timeout);
    }
    VideoController.prototype.flushBuffer = function () {
        for (var url in videoCtr.op_buffer)
            for (var id in videoCtr.op_buffer[url])
                for (var prop in videoCtr.op_buffer[url][id]) {
                    var len = videoCtr.op_buffer[url][id][prop].length;
                    yatta.val(url).val(id).val('doc').val(prop, videoCtr.op_buffer[url][id][prop][len - 1]);
                    delete videoCtr.op_buffer[url][id][prop];
                }
    };

    VideoController.prototype.set_video_time = function (time) {
        // if (!this.video.paused) this.play_pause();
        this.video.currentTime = time;
        this.canvas.clear();
    };

    VideoController.prototype.mark_anno_as_not_saved = function (videoURL, time) {
        if (yatta.val(videoURL) === undefined)
            return;
        if (this.not_saved_annos_buffer[videoURL] === undefined) {
            this.not_saved_annos_buffer[videoURL] = [];
        }
        if (this.not_saved_annos_buffer[videoURL].indexOf(time) === -1) {
            this.not_saved_annos_buffer[videoURL].push(time);
            yatta.val(videoURL).val('not_saved', this.not_saved_annos_buffer[videoURL]);
        }
    };

    VideoController.prototype.on_object_added = function (object) {
        if (object instanceof fabric.Path) {
            if (object.path.length > videoCtr.max_path_length) {
                videoCtr.display_annotation_at(videoCtr.video.currentTime, false);

                //console.warn('Too long path inserted, ignore it.');
                videoCtr.show_error_message('Path was too long.');
                return;
            }
        }
        var videoURL = videoCtr.video.src;

        console.log('measurment add object:', new Date().getTime());
        var id = videoCtr.peerId + '_' + videoCtr.fabricCounter++;
        object.set('collab_id', id);

        var time = parseFloat(videoCtr.video.currentTime.toFixed(2));

        videoCtr.update_anno({ time: time, doc: object });

        var layer = 0;

        //if (object instanceof Array) console.error('warum ist das ein array??');
        //clearInterval(videoCtr.yatta_garbage_time);
        //videoCtr.yatta_garbage_time = setInterval(() => { console.log('clearing garbage!'); yatta.HB.emptyGarbage(); }, videoCtr.yatta_garbage_timeout);
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
        //clearInterval(videoCtr.yatta_garbage_time);
        //videoCtr.yatta_garbage_time = setInterval(() => { console.log('clearing garbage!'); yatta.HB.emptyGarbage(); }, videoCtr.yatta_garbage_timeout);
        var tempYatta = yatta.val(videoCtr.video.src).val(id).val('doc').val();

        if (videoCtr)
            videoCtr.svg_adapter.handle_diverged_props(tempJson, tempYatta, function (prop) {
                //console.log('would change:', prop, tempJson[prop], tempJSON2[prop]);
                //yatta.val(id).val('doc').val(prop, tempJson[prop]);
                //console.log('measurment new change:', new Date().getTime());
                if (videoCtr.op_buffer[videoCtr.video.src] === undefined)
                    videoCtr.op_buffer[videoCtr.video.src] = {};

                //console.log('buffer',videoCtr.op_buffer);
                if (videoCtr.op_buffer[videoCtr.video.src][id] === undefined)
                    videoCtr.op_buffer[videoCtr.video.src][id] = {};

                //console.log('buffer', videoCtr.op_buffer);
                if (videoCtr.op_buffer[videoCtr.video.src][id][prop] === undefined)
                    videoCtr.op_buffer[videoCtr.video.src][id][prop] = [];

                videoCtr.op_buffer[videoCtr.video.src][id][prop].push(tempJson[prop]);
                // yatta.val(videoCtr.video.src).val(id).val('doc').val(prop, tempJson[prop]);
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
        } else {
            if (anno.doc.type === 'i-text')
                anno.doc.text = 'text'; //hack, because yatta sets it to undefined

            fabric.util.enlivenObjects([anno.doc], function (objects) {
                anno.doc = objects[0];

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
        }

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

    VideoController.prototype.get_anno_by_url_time = function (url, time) {
        if (this.video_anno_map[url] === undefined)
            return null;
        for (var i = 0; i < this.video_anno_map[url].length; i++) {
            if (this.video_anno_map[url][i].time === time)
                return this.video_anno_map[url][i];
        }
        return null;
    };

    VideoController.prototype.delete_anno_by_url_time = function (url, time) {
        if (this.video_anno_map[url] === undefined)
            return false;
        for (var i = 0; i < this.video_anno_map[url].length; i++) {
            if (this.video_anno_map[url][i].time === time) {
                this.video_anno_map[url].splice(i, 1);
                return true;
            }
        }
        return false;
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
        //return;
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
        var isEditing = false;
        if (cacheActive instanceof fabric.IText) {
            isEditing = cacheActive.isEditing;
        }

        // if (res != this.last_displayed_anno) {
        this.canvas.clear();

        /*var deactivate = false;
        if (res.doc[0].get('collab_id') !== undefined) {
        this.canvas.off('object:added');
        deactivate = true;
        }*/
        this.canvas.off('object:added');

        if (res.doc instanceof Array) {
            /* var docClone = [];
            res.doc.forEach((a) => {
            var cloneObj;
            var test = a.clone(function (obj) { console.log('cloned obj1', obj); cloneObj = obj; }, []);
            cloneObj = test ? test : cloneObj;
            docClone.push(cloneObj);
            });
            if (deactivate === false) {
            docClone = res.doc;
            }
            else {
            res.doc = [];
            }*/
            // docClone.forEach((a, index) => {
            res.doc.forEach(function (a, index) {
                try  {
                    _this.canvas.add(a);
                } catch (e) {
                    console.error(e);
                }
            });
            if (res.not_in_network === true)
                this.add_video_annos_to_network(this.video.src);
            //console.log("DG loaded from server",res.doc);
        } else
            this.canvas.add(res.doc);

        //if (res.doc[0].get('collab_id') !== undefined)
        //if(deactivate === true)
        this.canvas.on('object:added', function (a) {
            _this.svg_adapter.on_object_added(a.target);
        });

        //  }
        if (cacheActive) {
            this.canvas.setActiveObject(cacheActive);
            if (cacheActive instanceof fabric.IText) {
                if (isEditing) {
                    //cacheActive.isEditing = false;
                    cacheActive.exitEditing();

                    //jQuery('textarea').remove();
                    cacheActive.enterEditing();
                    $('textarea').bind('input propertychange', function () {
                        var text = this.value;
                        if (cacheActive.text.indexOf(text) !== 0) {
                            // cacheActive.text = text + cacheActive.text.substring(text.length - 1, cacheActive.text.length);
                            //console.log('HACK', text, cacheActive);
                            cacheActive.onKeyPress(HACK_FABRIC_E);
                            //cacheActive.text = text;
                        }
                        if (HACK_FABRIC_E.which === 8 || HACK_FABRIC_E.which === 46) {
                            cacheActive.onKeyDown(HACK_FABRIC_E);
                            HACK_FABRIC_E = null;
                        }
                    }); //*/

                    /*$("textarea").keydown(function () {
                    console.log('HACK textarea keydown');
                    });*/
                    //$("textarea").attr('onkeydown', 'myFunction()');
                    /* $("canvas").keydown(function () {
                    console.log('HACK textarea keydown');
                    });*/
                    this.canvas.renderAll();
                    cacheActive.initDelayedCursor();
                    //cacheActive.cursorColor = 'red';
                }
                console.log('set editing', isEditing);
            }
        }
        return res;
    };

    VideoController.prototype.add_video_annos_to_network = function (videoURL) {
        var _this = this;
        this.video_anno_map[videoURL].forEach(function (anno) {
            if (anno.not_in_network === true) {
                //if (a.get('collab_id') === undefined) { // when new stuff is loaded from the server but not pushed into the network yet.
                anno.doc.forEach(function (a, index) {
                    var id = _this.peerId + '_' + _this.fabricCounter++;
                    a.set('collab_id', id);
                    var prepDoc = collab.prepareForYatta(a);
                    var anno2 = { time: anno.time, doc: prepDoc };
                    if (yatta.val(_this.video.src) === undefined)
                        yatta.val(_this.video.src, {}, "immutable");
                    yatta.val(_this.video.src).val(id, anno2, "immutable");
                });

                delete anno.not_in_network;
            }
        });
    };

    VideoController.prototype.registerPeerId = function (peerId) {
        if (peerId === this.peerId)
            return;
        if (this.collabPeerIds.indexOf(peerId) !== -1)
            return;
        this.collabPeerIds.push(peerId);
        yatta.connector.connectToPeer(peerId); //two way connection
        locallySendIntent("CONNECTION_STATUS", { status: 'connected' });
        videoCtr.connected = true;
        kill_loading();
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
        var _this = this;
        this.video.src = url;
        url = this.video.src; //because of reasons

        if (!this.video_anno_map[url]) {
            this.video_anno_map[url] = [];
        }

        this.annotations = this.video_anno_map[url];
        this.display_annotation_at(0, false);

        if (this.annotations.length === 0) {
            console.log('DG start retreiving annos...');
            getVideoSegments(url, function (stat, annos) {
                if (stat !== 200)
                    console.error('Could not retrieve annotations.');
                if (stat === 200) {
                    console.log('DG retreived annos:', annos);
                    _this.video_anno_map[url] = annos;

                    /*this.not_in_network_annos[url] = [];
                    annos.forEach((anno) => {
                    this.not_in_network_annos[url].push(anno.time);
                    });*/
                    annos.forEach(function (anno) {
                        anno.not_in_network = true;
                    });
                    _this.annotations = _this.video_anno_map[url];
                    _this.display_annotation_at(0, false);
                    _this.annotations.forEach(function (anno) {
                        locallySendIntent("NEW_ANNOTATION", { "time": anno.time });
                    });
                }
            });
        }

        this.annotations.forEach(function (anno) {
            locallySendIntent("NEW_ANNOTATION", { "time": anno.time });
        });
    };

    VideoController.prototype.master_changed = function (isMaster) {
        //this.isMaster = isMaster;
        console.log('became master', this.isMaster);
        if (this.isMaster && this.server_updater_timer === 0) {
            this.start_server_updater();
        } else {
            this.stop_server_updater();
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
        var _this = this;
        this.server_updater_timer = setInterval(function () {
            var j = 0;
            for (var url in _this.not_saved_annos_buffer)
                for (var i = 0; i < _this.not_saved_annos_buffer[url]; i++) {
                    var time = _this.not_saved_annos_buffer[url].pop();
                    var annoToStringify = _this.get_anno_by_url_time(url, time);
                    if (annoToStringify !== null) {
                        var AnnoStr = JSON.stringify(annoToStringify.doc);
                        j++;
                        updateVideoSegmentByTime(url, time.toString(), AnnoStr, function (stat) {
                            if (stat === 200) {
                                console.log('successfully updated server');
                                yatta.val(url).val('not_saved', videoCtr.not_saved_annos_buffer[url]);
                            } else {
                                console.error('could not update server. Status:', stat);
                            }
                        });
                    }
                }
            console.log('Pushed annos to Server', j);
        }, 10000);
    };

    VideoController.prototype.stop_server_updater = function () {
        clearInterval(this.server_updater_timer);
        this.server_updater_timer = 0;
    };

    VideoController.prototype.on_xmpp_connection = function () {
        // HACK_JOIN_COUNTER = 2; //next REGISTER_MY_PEERID will succeed (hopefully)
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

    VideoController.prototype.show_error_message = function (text) {
        var _this = this;
        this.canvas.off('object:added');
        var iText = new fabric.IText(text);

        //iText.set('error_message', true);
        var error_message_id = 'error_message_' + this.fabricCounter++;
        iText.set('collab_id', error_message_id);
        iText.fontSize = 15;
        iText.backgroundColor = '#EB4457';
        iText.selectable = false;

        //iText.setOptions({ stroke: 'red' });
        var anno = videoCtr.annotation_at(this.video.currentTime);
        var time = this.video.currentTime;
        if (anno !== null) {
            anno.doc.push(iText);
            this.display_annotation_at(this.video.currentTime);
            setTimeout(function () {
                videoCtr.delete_object(error_message_id);
                if (_this.video.currentTime === time)
                    _this.display_annotation_at(_this.video.currentTime);
            }, 2000);
        }
        this.canvas.on('object:added', function (a) {
            _this.svg_adapter.on_object_added(a.target);
        });
    };
    return VideoController;
})();

function sleep(milliseconds) {
    var start = new Date().getTime();

    while ((new Date().getTime() - start) < milliseconds)
        ;
}

if (!DEVELOPMENT) {
    console.log = function () {
    };
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
                    if (videoCtr.connected)
                        locallySendIntent("CONNECTED");
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
        case "RESTORE_LAS_SESSION":
            break;
        case "LAS_INFO":
            console.log("allvideo-drawings: LAS_INFO.");
            if (lasClient.getStatus != "loggedIn" && intent.extras != null && intent.extras.userName != null && intent.extras.session != null)
                lasClient.setCustomSessionData(intent.extras.session, intent.extras.userName, videoCtr.lasurl, videoCtr.appCode);
            break;
    }

    routerNetwork(intent);
}

//yatta.getConnector().setIwcHandler(router);
iwcClient.connect(router);

function getMpeg7MediaIds() {
    var videoURLs = null, thumbnailsURLs = null, videoNames = new Array(), uploaderNames = new Array(), serviceName = "mpeg7_multimediacontent_service", methodName2 = "getMediaURLs", uploader = "uploader", parametersAsJSONArray = new Array();

    //console.log(lasClient);
    lasClient.invoke(serviceName, methodName2, parametersAsJSONArray, function (stat, res) {
        console.log("DG: ", stat, res);
    });
}
var SVG;
function getVideoSegments(mediaURL, callback) {
    var serviceName = "mpeg7_multimediacontent_service", methodName = "getVideoSegments", parametersAsJSONArray = new Array();
    parametersAsJSONArray[0] = {
        "type": "String",
        "value": mediaURL
    };

    //console.log(lasClient);
    lasClient.invoke(serviceName, methodName, parametersAsJSONArray, function (stat, res) {
        console.log("DG getVideoSegments status: ", stat);
        console.log("DG getVideoSegments result: ", res);
        var annos = [];
        for (var i = 0; i < res.value.length; i += 2) {
            //console.log("DG putting ", res.value[i]);
            var json_string = res.value[i];

            // console.log("DG time: ", parseFloat(res.value[i + 1]));
            var timepoint = parseFloat(res.value[i + 1]);

            var objs = JSON.parse(json_string);

            //console.log("DG objs:",objs);
            fabric.util.enlivenObjects(objs, function (objects) {
                annos.push({ time: timepoint, doc: objects });
                if (annos.length === res.value.length / 2)
                    callback(stat, annos);
            });
        }
    });
}

function setVideoSegment(mediaURL, timepoint, SVG) {
    var videoURL = "http://tosini.informatik.rwth-aachen.de:8134/videos/construction.mp4", serviceName = "mpeg7_multimediacontent_service", methodName = "setVideoSegment", parametersAsJSONArray = new Array();
    parametersAsJSONArray[0] = {
        "type": "String",
        "value": mediaURL
    };
    parametersAsJSONArray[1] = {
        "type": "String",
        "value": timepoint
    };
    parametersAsJSONArray[2] = {
        "type": "String",
        "value": SVG
    };

    //console.log(lasClient);
    lasClient.invoke(serviceName, methodName, parametersAsJSONArray, function (stat, res) {
        console.log("DG setVideoSegment status: ", stat);
        console.log("DG setVideoSegment result: ", res);
    });
}

function removeVideoSegmentByTime(mediaURL, timepoint) {
    var serviceName = "mpeg7_multimediacontent_service", methodName = "removeVideoSegmentByTime", parametersAsJSONArray = new Array();
    parametersAsJSONArray[0] = {
        "type": "String",
        "value": mediaURL
    };
    parametersAsJSONArray[1] = {
        "type": "String",
        "value": timepoint
    };

    //console.log(lasClient);
    lasClient.invoke(serviceName, methodName, parametersAsJSONArray, function (stat, res) {
        console.log("DG removeVideoSegmentByTime status: ", stat);
        console.log("DG removeVideoSegmentByTime result: ", res);
    });
}

function removeAllVideoSegments(mediaURL) {
    var serviceName = "mpeg7_multimediacontent_service", methodName = "getVideoSegments", parametersAsJSONArray = new Array();
    parametersAsJSONArray[0] = {
        "type": "String",
        "value": mediaURL
    };

    //console.log(lasClient);
    lasClient.invoke(serviceName, methodName, parametersAsJSONArray, function (stat, res) {
        console.log("DG getVideoSegments status: ", stat);
        console.log("DG getVideoSegments result: ", res);
        var annos = [];
        for (var i = 1; i < res.value.length; i += 2) {
            removeVideoSegmentByTime(mediaURL, res.value[i]);
        }
    });
}

function updateVideoSegmentByTime(mediaURL, timepoint, SVG, callback) {
    if (mediaURL === "http://golovin.de/ba/parking.mp4")
        return;
    var serviceName = "mpeg7_multimediacontent_service", methodName = "updateVideoSegmentByTime", parametersAsJSONArray = new Array();
    parametersAsJSONArray[0] = {
        "type": "String",
        "value": mediaURL
    };
    parametersAsJSONArray[1] = {
        "type": "String",
        "value": timepoint
    };
    parametersAsJSONArray[2] = {
        "type": "String",
        "value": SVG
    };

    //console.log(lasClient);
    lasClient.invoke(serviceName, methodName, parametersAsJSONArray, function (stat, res) {
        callback(stat);
        //console.log("DG updateVideoSegmentByTime status: ", stat);
        //console.log("DG updateVideoSegmentByTime result: ", res);
    });
}

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

function testImportSVG() {
    console.log("SVG: ", SVG);
    fabric.loadSVGFromString(SVG, function (objs, opts) {
        console.log(objs);
        for (var i = 0; i < objs.length; i++) {
            videoCtr.canvas.add(objs[i]);
        }

        videoCtr.canvas.renderAll();
    });
}

function testExportSVG() {
    SVG = videoCtr.canvas.toSVG();
    console.log("SVG: ", SVG);
}
var JSONTest;
function testImportJSON() {
    /*
    videoCtr.canvas.loadFromJSON(JSONTest, function (objs, opts) {
    console.log(objs);
    for (var i = 0; i < objs.length; i++) {
    videoCtr.canvas.add(objs[i]);
    }
    
    });*/
    var objs = JSON.parse(JSONTest).objects;

    //console.log("DG objs:",objs);
    fabric.util.enlivenObjects(objs, function (objects) {
        for (var i = 0; i < objects.length; i++) {
            videoCtr.canvas.add(objects[i]);
        }
    });

    videoCtr.canvas.renderAll();
}

function testExportJSON() {
    JSONTest = JSON.stringify(videoCtr.canvas.toJSON());
    console.log("JSON: ", JSONTest);
}

/*
function myFunction(e) {
console.log('HACK myfunction called!', e);
HACK_FABRIC_E = e;
}*/
$("body").keydown(function (e) {
    if (e.originalEvent.which === 8 || e.originalEvent.which === 46) {
        HACK_FABRIC_E = e.originalEvent;

        console.log('HACK original event DOWN', e.originalEvent);
    }
});
$("body").keypress(function (e) {
    HACK_FABRIC_E = e.originalEvent;
    console.log('HACK original event keypress', HACK_FABRIC_E);
});
//# sourceMappingURL=app.js.map
