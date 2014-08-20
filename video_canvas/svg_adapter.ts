/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/fabricjs.d.ts" />
declare var Snap;
class Adapter {
    public canvas: fabric.ICanvas;
    public svg: JQuery;
    public counter = 1;
    public added_object(object) {
        console.log('added stuff:', object);
        if (object instanceof fabric.Line) {
            console.log('added line');
            //this.canvas.add(object);
            this.svg.append(object.toSVG());
            //console.log(this.canvas.toSVG());
            $("svg").html($("svg").html());
        }

    }
    public on_object_moved: (doc: fabric.IObject, event:string) => void;
    private on_annotation: (doc) => void;
    constructor(canvas: fabric.ICanvas) {
        this.canvas = canvas;

        this.canvas.on("object:added", (a) => {
            this.on_object_added(a);
            //
        });

        this.canvas.on("object:removed", (a) => {
            //jQuery('#'+a.id).remove();
        });
        
        this.canvas.on("object:moving", (a) => {
            this.on_object_moved(a.target, "object:moving");
            
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

        this.canvas.on("object:scaling", (a) => {
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

        this.canvas.on("object:rotating", (a) => {
            /*var s = Snap('#' + a.target.id);
            console.log('rotated object', a.target);
            var myMatrix = new Snap.Matrix();
            myMatrix.translate(a.target.left, a.target.top);
            myMatrix.rotate(a.target.angle);
            myMatrix.scale(a.target.scaleX, a.target.scaleY);
            s.transform(myMatrix);*/
            
           
        });


        this.svg = jQuery('svg');

        this.canvas.on("after:render", (a) => {


            //  console.log('modified render');

        });

        /*this.canvas.on("object:modified", (a) => {
            
            console.log('modified:', a.toSVG());
            
        });*/
        this.svg = jQuery('svg');
    }

    public on_object_added(a) {
        var object = a.target;
        //console.log('object:added', object);
        object.id = this.make_id();
        //console.log('hier is was', this.on_annotation);
        //console.log('added a new object to canvas jungeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        //this.on_annotation(this.canvas.getObjects());
        this.on_annotation(object);

        //console.log('added a new object to canvas jungeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2');
        var svg = object.toSVG();
        //console.log($(svg).attr('id','joman'));
        this.svg.append($(svg).attr('id', this.make_id()));
        this.counter++;
        //console.log(this.canvas.toSVG());
        $("svg").html($("svg").html());
    }

    public make_id(id= this.counter) {
        return 'svg_id_' + id;
    }

    public register_annotation_event(callback: (doc) => void) {
        this.on_annotation = callback;
    }

    public add(object) {
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
    }
}


 