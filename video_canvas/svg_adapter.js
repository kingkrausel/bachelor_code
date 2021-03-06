/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/fabricjs.d.ts" />
var Adapter = (function () {
    function Adapter(canvas) {
        var _this = this;
        this.counter = 1;
        this.canvas = canvas;

        this.canvas.on("object:added", function (a) {
            console.log("fabric added", a);

            /*if (a.target.getObjects !== undefined) {
            a.target.getObjects().forEach((obj) => {
            console.log("fabric added", obj);
            this.on_object_added(obj);
            });
            }
            else*/
            _this.on_object_added(a.target);
            /*console.log("fabric added object", a.target);
            console.log("fabric instance of f.Obj:", a.target instanceof fabric.Object);*/
            //
        });

        this.canvas.on("object:removed", function (a) {
            //jQuery('#'+a.id).remove();
        });

        this.canvas.on("object:selected", function (a) {
            videoCtr.activeDoc = a.target;
        });

        this.canvas.on("selection:cleared", function (a) {
            try  {
                videoCtr.activeDoc = null;
            } catch (e) {
            }
        });

        this.canvas.on("text:changed", function (a) {
            _this.on_object_moved(a.target, "object:moving");
            console.log('text:changed', a);
        });

        this.canvas.on("object:moving", function (a) {
            /*console.log("fabric moved", a);
            if (a.target.getObjects !== undefined) {
            a.target.getObjects().forEach((obj) => {
            console.log("fabric moved", obj);
            this.on_object_moved(a.target, "object:moving");
            });
            }
            else*/
            _this.on_object_moved(a.target, "object:moving");
            /*var s = Snap('#' + a.target.id);
            //console.log('moved object', s);
            var myMatrix = new Snap.Matrix();
            var difX = 0, difY = 0;
            if (!(a.target instanceof fabric.Path)) {
            difX = a.target.width / 2;
            difY = a.target.height / 2;
            }
            
            myMatrix.translate(a.target.left + difX, a.target.top + difY);
            myMatrix.rotate(a.target.angle);
            //myMatrix.scale(a.target.scaleX, a.target.scaleY);
            
            myMatrix.scale(a.target.scaleX, a.target.scaleY, -difX, -difY);
            
            s.transform(myMatrix);*/
        });

        this.canvas.on("object:scaling", function (a) {
            _this.on_object_scaled(a.target, "object:scaling");
            /*var s = Snap('#' + a.target.id);
            console.log('scaled object', a.target);
            var myMatrix = new Snap.Matrix();
            var difX = 0, difY = 0;
            if (!(a.target instanceof fabric.Path)) {
            difX = a.target.width / 2;
            difY = a.target.height / 2;
            }
            
            myMatrix.translate(a.target.left + difX, a.target.top + difY);
            myMatrix.rotate(a.target.angle);
            myMatrix.scale(a.target.scaleX, a.target.scaleY, -difX, -difY);
            s.transform(myMatrix);*/
        });

        this.canvas.on("object:rotating", function (a) {
            _this.on_object_rotated(a.target, "object:rotating");
            /*var s = Snap('#' + a.target.id);
            console.log('rotated object', a.target);
            var myMatrix = new Snap.Matrix();
            myMatrix.translate(a.target.left, a.target.top);
            myMatrix.rotate(a.target.angle);
            myMatrix.scale(a.target.scaleX, a.target.scaleY);
            s.transform(myMatrix);*/
        });

        this.svg = jQuery('svg');

        this.canvas.on("after:render", function (a) {
            //  console.log('modified render');
        });

        /*this.canvas.on("object:modified", (a) => {
        
        console.log('modified:', a.toSVG());
        
        });*/
        this.svg = jQuery('svg');
    }
    Adapter.prototype.added_object = function (object) {
        console.log('added stuff:', object);
        if (object instanceof fabric.Line) {
            console.log('added line');

            //this.canvas.add(object);
            this.svg.append(object.toSVG());

            //console.log(this.canvas.toSVG());
            $("svg").html($("svg").html());
        }
    };

    Adapter.prototype.on_object_added = function (a) {
        //console.log('object:added', object);
        //object.id = this.make_id();
        //console.log('hier is was', this.on_annotation);
        //console.log('added a new object to canvas jungeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        //this.on_annotation(this.canvas.getObjects());
        this.on_annotation(a);
        //console.log('added a new object to canvas jungeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2');
        /*var svg = object.toSVG();
        //console.log($(svg).attr('id','joman'));
        this.svg.append($(svg).attr('id', this.make_id()));
        this.counter++;
        //console.log(this.canvas.toSVG());
        $("svg").html($("svg").html());*/
    };

    Adapter.prototype.make_id = function (id) {
        if (typeof id === "undefined") { id = this.counter; }
        return 'svg_id_' + id;
    };

    Adapter.prototype.register_annotation_event = function (callback) {
        this.on_annotation = callback;
    };

    Adapter.prototype.add = function (object) {
        if (object instanceof fabric.Rect) {
            console.log('added rect');
            this.canvas.add(object);
            /*this.svg.append(object.toSVG());
            console.log(this.canvas.toSVG());
            $("svg").html($("svg").html());*/
        }
        if (object instanceof fabric.Path) {
            console.log('added line');
            /*this.canvas.add(object);
            this.svg.append(object.toSVG());
            console.log(this.canvas.toSVG());
            $("svg").html($("svg").html());*/
        }
    };

    Adapter.prototype.instance_of_fabric_obj = function () {
    };

    Adapter.prototype.handle_diverged_props = function (a, b, callback) {
        for (var prop in a) {
            if (typeof a[prop] !== 'function') {
                if (typeof a[prop] === 'string' || typeof a[prop] === 'number' || typeof a[prop] === 'boolean') {
                    if (a[prop] !== b[prop])
                        callback(prop);
                }
                if (typeof a[prop] === 'object' || typeof a[prop] === 'array') {
                    try  {
                        if (JSON.stringify(a[prop]) !== JSON.stringify(b[prop]))
                            callback(prop);
                    } catch (e) {
                        console.warn('versions may be diverged: Unterschiede konnten nicht korrekt überprüft werden(handle_diverged_props).');
                    }
                }
            }
        }
    };
    return Adapter;
})();
//# sourceMappingURL=svg_adapter.js.map
