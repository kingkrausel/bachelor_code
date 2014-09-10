/// <reference path="definitions/fabricjs.d.ts" />

var OTENGINE;

require([
    "coweb/jsoe/OTEngine"
], function (OTEngine) {
    //collab = new Collaboration();
    console.log('collab OTEngine', OTEngine);
    OTENGINE = OTEngine;
    var id = Math.random() > 0.5 ? 1 : 2;
    collab = new Collaboration(id);
    //collab.ote = new OTEngine(collab.jid_map[collab.user.uri]);
});

var Collaboration = (function () {
    function Collaboration(id) {
        this.t = 0;
        this.FETCH_INTERVAL = 500;
        this.SYNC_INTERVAL = 3000;
        this.PURGE_INTERVAL = 3000;
        this.members = [];
        this.membersNumber = 0;
        this.connection = null;
        this.collaborators = [];
        this.state = [];
        this.jid_map = [];
        //publiciables used for storing the text file
        this.master = false;
        this.textURI = "";
        // use a buffer for storing the key pressed, for the case when many intents should be sent
        // in a very short time period (see Dominik Renzels IWC Paint Widget)
        this.actionbuffer = [];
        this.actionbuffermaxlength = 2;
        this.actionbufferflushdelay = 200;
        this.saveTextDelay = 10000;
        this.saveTime = 0;
        this.shouldPurge = false;
        this.shouldSync = false;
        this.ote = new OTENGINE(id);
        //this.syncTimer = setInterval(this.engineSyncOutbound, this.SYNC_INTERVAL);
        //this.purgeTimer = setInterval(this.onPurgeEngine, this.PURGE_INTERVAL);
        //this.start_collaboration();
        //this.actionbuffer = [];
        /*openapp.resource.get(openapp.param.space(), (s) => {
        this.context = s;
        openapp.resource.get(openapp.param.user(), (u) => {
        this.user = u;
        this.newGetUsers();
        
        
        });
        
        });*/
    }
    Collaboration.prototype.prepareForYatta = function (elem) {
        var json = elem.toJSON(['collab_id']);

        for (var key in elem) {
            if (json[key] === null) {
                json[key] = 'null';
            }
        }
        console.log('collab prepareForYatta:', json);

        return json;
    };

    Collaboration.prototype.unpackFromYatta = function (json) {
        for (var key in json) {
            if (json[key] === 'null') {
                json[key] = null;
            }
        }

        return json;
    };

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
    Collaboration.prototype.newGetUsers = function () {
        var spaceURI = openapp.param.space();
        this.space = new openapp.oo.Resource(spaceURI);

        this.space.getSubResources({
            relation: openapp.ns.foaf + "member",
            onEach: this.renderEntry
        });
    };

    /**
    * Function to be called for each discovered member of the space
    */
    Collaboration.prototype.renderEntry = function (entryResource) {
        var _this = this;
        var entry = new openapp.oo.Resource(entryResource.getURI());

        var mlist = openapp.resource.context(this.context).sub(openapp.ns.foaf + "member").list();
        this.membersNumber = mlist.length;

        entry.getInfo(function (metadata1) {
            console.log('collab getInfo', metadata1);
            _this.members.push(metadata1["http://www.w3.org/2002/07/owl#sameAs"]);
            console.log("In the renderEntry call, the members vector is:");
            console.log(_this.members);

            if (metadata1["http://www.w3.org/2002/07/owl#sameAs"] !== _this.user.uri) {
                _this.collaborators.push(metadata1["http://www.w3.org/2002/07/owl#sameAs"]);
            }

            if (_this.members.length === _this.membersNumber) {
                _this.start_collaboration();
            }
        });
    };

    /**
    * Initialize the OT
    */
    Collaboration.prototype.start_collaboration = function () {
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
    };

    Collaboration.prototype.sendOp = function (op) {
        var user = 42;
        var a = {
            "expeditor": user,
            "operation": op
        };

        this.actionbuffer.push(a);
        console.log('collab sendOp', this.actionbuffer);
    };

    Collaboration.prototype.flush_actions = function () {
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
    };

    Collaboration.prototype.sendIntent = function (intent) {
        if (iwc.util.validateIntent(intent)) {
            iwcClient.publish(intent);
        } else {
            alert("Intent not valid!");
        }
        // console.log('collab sent intents');
    };

    Collaboration.prototype.engineSyncOutbound = function () {
        if (this.shouldSync) {
            var toSend = this.ote.syncOutbound();
            try  {
                this.engineSync(this.jid_map[this.user.uri], toSend);
            } catch (e) {
                console.warn("Failed to send engine syncs to server ", e);
                return;
            }
            this.shouldSync = false;
        }
    };

    /** TODO
    */
    Collaboration.prototype.onPurgeEngine = function () {
        if (this.shouldPurge) {
            alert("Operation Transformator Engine is stable:" + this.ote.isStable());
        }
        collab.ote.purge();
        this.shouldPurge = false;
    };

    Collaboration.prototype.saveExistingText = function () {
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
                        "expeditor": this.user.uri
                    }
                };
                this.sendIntent(intent);
            }
        }
    };

    Collaboration.prototype.updateLiteral = function (textUri) {
    };

    Collaboration.prototype.engineSync = function (site, cv) {
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
    };
    return Collaboration;
})();

var collab;
//# sourceMappingURL=collaboration.js.map
