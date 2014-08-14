/// <reference path="definitions/fabricjs.d.ts" />
declare var require, openapp;

var OTENGINE;

require([
     "coweb/jsoe/OTEngine"
    //, "dojo/dom"
], function ( OTEngine) {
    //collab = new Collaboration();
    console.log('collab OTEngine', OTEngine);
    OTENGINE = OTEngine;
    var id = Math.random() > 0.5? 1:2;//parseInt( Math.random()*10000);
    collab = new Collaboration(id);
    
    //collab.ote = new OTEngine(collab.jid_map[collab.user.uri]);

});

class Collaboration {
    
    public ote:any;
    public t = 0;

    public FETCH_INTERVAL = 500;
    public SYNC_INTERVAL = 3000;
    public PURGE_INTERVAL = 3000;

    public iwcClient;

    public context;
    public members = [];
    public membersNumber = 0;
    public user;

    public connection = null;
    public collaborators = [];

    public state = [];

    public jid_map = [];

    //publiciable used for referencing the openApp space
    public space;

    //publiciables used for storing the text file
    public master = false;
    public textURI = "";

    // use a buffer for storing the key pressed, for the case when many intents should be sent
    // in a very short time period (see Dominik Renzels IWC Paint Widget)
    public actionbuffer = [];
    public actionbuffermaxlength = 2;
    public actionbufferflushdelay = 200;

    public saveTextDelay = 10000;

    public saveTime = 0;

    public shouldPurge = false;
    public shouldSync = false;
    // Timers for syncing and purging.
    public syncTimer;
    public purgeTimer;

    public graphicalElementsContainer: any;

    constructor(id) {
        this.ote = new OTENGINE(id);
        //this.syncTimer = setInterval(this.engineSyncOutbound, this.SYNC_INTERVAL);
        this.purgeTimer = setInterval(this.onPurgeEngine, this.PURGE_INTERVAL);

        this.start_collaboration();
        this.actionbuffer = [];        

        /*openapp.resource.get(openapp.param.space(), (s) => {
            this.context = s;
            openapp.resource.get(openapp.param.user(), (u) => {
                this.user = u;
                this.newGetUsers();
                
                
            });

        });*/
    }

    public prepareForYatta(elem: fabric.IObject) {
        var res = <any>JSON.stringify(elem);
        res = JSON.parse(res);
        for (var key in res) {

            if (res[key] != null && typeof res[key] !== 'string') {
                res[key] = JSON.stringify( res[key]);
            }            
        }
        console.log('collab prepareForYatta:', res);

        return res;
    }

/**
Initialize:
  *the current user, 
  *the vector of users which are members in the same space
  *the previously saved text (using openApp)
*/


/**
* Function meant for retrieving the unique identifiers of users,
* available in the information section, under "http://www.w3.org/2002/07/owl#sameAs"
*/
public newGetUsers() {

    var spaceURI = openapp.param.space();
    this.space = new openapp.oo.Resource(spaceURI);
    
    this.space.getSubResources({
        relation: openapp.ns.foaf + "member",
        onEach: this.renderEntry
    });

}

/**
* Function to be called for each discovered member of the space
*/
public renderEntry (entryResource) {
    
    var entry = new openapp.oo.Resource(entryResource.getURI());
    
    var mlist = openapp.resource.context(this.context).sub(openapp.ns.foaf + "member").list();
    this.membersNumber = mlist.length;

    entry.getInfo((metadata1)=> {
        console.log('collab getInfo', metadata1);
        this.members.push(metadata1["http://www.w3.org/2002/07/owl#sameAs"]);
        console.log("In the renderEntry call, the members vector is:");
        console.log(this.members);

        if (metadata1["http://www.w3.org/2002/07/owl#sameAs"] !== this.user.uri) {
            this.collaborators.push(metadata1["http://www.w3.org/2002/07/owl#sameAs"]);
        }
        
        if (this.members.length === this.membersNumber) {
            this.start_collaboration();
        }
    });
}

/**
* Initialize the OT
*/
public start_collaboration () {
    console.log('collab start_collaboration');
    //var buffer = $('#editArea').val();
    this.members.sort();
    for (var k = 0; k < this.members.length; k++) {
        this.jid_map[this.members[k]] = k;
        this.state.push(0);
    }

   // this.init();

    //console.log('collab jid_map', this.jid_map);
    //this.ote = new OTENGINE(42);
}
    

    public sendOp(op) {
        var user = 42;//this.jid_map[this.user.uri];
        var a = {
            "expeditor": user,
            "operation": op
        };

        this.actionbuffer.push(a);
        console.log('collab sendOp', this.actionbuffer);
    }

    public flush_actions () {
        
        // when we flush, we first clear the delay timer, if running.
        clearTimeout(this.t);
        this.t = 0;

        // then, we pack all buffered actions into one intent.
        if (this.actionbuffer && this.actionbuffer.length > 0) {

            var expeditor = [];
            var oper = [];

            var i;
            for (i = 0; i < this.actionbuffer.length; i++) {
                var a = this.actionbuffer[i];
                expeditor.push(a.expeditor);
                oper.push(a.operation);
            }
            this.actionbuffer = [];

            var intents = {
                "component": "",
                "action": "COLL_WRITE",
                "data": "",
                "dataType": "text/plain",
                "flags": ["PUBLISH_GLOBAL"],
                "extras": {
                    "expeditors": expeditor,
                    "names": oper
                }
            };

            console.log('collab send intents', intents);

            this.sendIntent(intents);
        }
    }

    public sendIntent (intent) {
        if (iwc.util.validateIntent(intent)) {
            iwcClient.publish(intent);
        } else {
            alert("Intent not valid!");
        }
       // console.log('collab sent intents');
    }

    public engineSyncOutbound() {
        if (this.shouldSync) {
            var toSend = this.ote.syncOutbound();
            try {
                this.engineSync(this.jid_map[this.user.uri], toSend);
            } catch (e) {
                console.warn("Failed to send engine syncs to server ", e);
                return;
            }
            this.shouldSync = false;
        }
    }

    /** TODO
    */
    public onPurgeEngine () {
        if (this.shouldPurge) {
            alert("Operation Transformator Engine is stable:" + this.ote.isStable());
        }
        collab.ote.purge();
        this.shouldPurge = false;
    }

    public  saveExistingText () {
        clearTimeout(this.saveTime);
        this.saveTime = 0;
        if (this.master) {
            if (this.textURI !== "") {

                this.updateLiteral(this.textURI);
                var intent = {
                    "component": "",
                    "sender": this.user.uri,
                    "data": "http://example.org/some/data",
                    "dataType": "text/json",
                    "action": "ACTION_DATA_SAVED",
                    "flags": ["PUBLISH_GLOBAL"],
                    "extras": {
                        "expeditor": this.user.uri,
                    }
                };
                this.sendIntent(intent);
            }
        }
    }

    public updateLiteral (textUri) {
        
    }

    public engineSync (site, cv) {
        var obj = {
            site: site,
            sites: cv
        };
        var intent = {
            "component": "",
            "action": "ACTION_SYNC",
            "data": "",
            "dataType": "text/plain",
            "flags": ["PUBLISH_GLOBAL"],
            "extras": {
                "site": site,
                "sites": cv
            }
        };
        console.log(intent);
        this.sendIntent(intent);
    }

}//*/

var collab;
