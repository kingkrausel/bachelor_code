class NetworkController {
    public isMaster: boolean = false;
    public masterAbilityScore = 0;
    private masterAlive = false;

    public masterPingTime = 5 * 1000; //Master pings every 10 secs to validate that he is alive

    public waitForMasterPing = this.masterPingTime * 2;
    public initialWaiting = 20 * 1000; //be at least 20 seconds in network to become master
    private timerID = 0;
    public masterPingTimerID = 0;
    public randomOnScoreCollision: number;
    public shouldBecomeMaster = true;
   // public intialTimerID = 0;

    constructor() {
        this.masterAbilityScore = this.calcMasterDeviceAbility();
        this.timerID = setInterval(NetworkController.askToBecomeMaster, this.waitForMasterPing); //assume after waitForMasterPing that master is dead.
        //this.intialTimerID = this.timerID;
    }

    private calcMasterDeviceAbility():number {
        /**
        returns number between 0 and 1. 0 not good suited, 1 good suited master device.
        */
        var score = 1.0;
        var mobile: boolean = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

        score = mobile ? score / 10 : score;
        this.randomOnScoreCollision = Math.random();
        return score;
    }

    public masterIsAlive() {
        console.log('Master is alive, clear intervall: ',this.timerID);
        this.masterAlive = true;
        clearInterval(this.timerID); //master is alive, don't ask to become master...maybe next time ;)
        this.timerID = setInterval(NetworkController.askToBecomeMaster, this.waitForMasterPing); //maybe master dies this time (in next time intervall)
        console.log('New  intervall number: ', this.timerID);
    }

    

    public static askToBecomeMaster() { //finally, master is dead!
        networkCtrl.masterAlive = false;
        networkCtrl.isMaster = false;

        var data = {
            score: networkCtrl.masterAbilityScore,
            onCollision: networkCtrl.randomOnScoreCollision
        };
        /**
        After half masterPingTime time all askToBecomeMaster messages should be received.
        Therefore, we can decide if we should become master.
        */
        setTimeout(NetworkController.decideToBecomeMaster, networkCtrl.masterPingTime / 2);
        networkCtrl.sendIntent("UPDATE_MASTER_DEVICE",[], data);
    }

    public static decideToBecomeMaster() {
        clearInterval(networkCtrl.masterPingTimerID); // in case some sync errors occured

        console.log('make decision:', networkCtrl.shouldBecomeMaster);
        var wasMaster = networkCtrl.isMaster;

        networkCtrl.isMaster = false;
        if (networkCtrl.shouldBecomeMaster) {
            networkCtrl.isMaster = true;
            networkCtrl.sendIntent('MASTER_IS_ALIVE');//shout out that we are the new master! (Hopefully we are in time...)
            networkCtrl.masterPingTimerID = setInterval(() => { networkCtrl.sendIntent('MASTER_IS_ALIVE'); }, networkCtrl.masterPingTime); // and keep being it!


        }
        //if (wasMaster !== networkCtrl.isMaster) { //Master-status changed, inform all local widgets
        networkCtrl.locallySendIntent('MASTER_STATUS', { isMaster: networkCtrl.isMaster });
        //}

        networkCtrl.shouldBecomeMaster = true; //so we have a chance next time

    }


    public calcUniqueId() {

    }

    public sendIntent(action:string, categories= [], extras= {}) {
        var intent = {
            "component": "",
            "sender": "",
            "data": "",
            "dataType": "text/xml",
            "action": action,
            "categories": categories,
            "flags": ["PUBLISH_GLOBAL"],
            "extras": extras
        };

        if (iwc.util.validateIntent(intent)) {
            iwcClient.publish(intent);
        } else console.error('Invalid intent!');
    }


    public locallySendIntent(action: string, extras= {}) {
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

    public joinNetwork(id) {
        this.sendIntent('JOIN_NETWORK', [], {id:id});
    }

    public stopBeeingMaster() {
        this.isMaster = false;
        clearInterval(this.masterPingTimerID);
    }
} 

var networkCtrl = new NetworkController();


function routerNetwork(intent) { //called in app.js
    switch (intent.action) {
        case 'UPDATE_MASTER_DEVICE':
            if (networkCtrl.masterAbilityScore !== intent.extras.score
                || networkCtrl.randomOnScoreCollision !== intent.extras.onCollision) { //sender was not me
                    // if nobody before proofed to be better master and current score is also smaller -> become master

                    console.log('Contention phase, currently comapring profiles.');

                    if (networkCtrl.masterAbilityScore > intent.extras.score && networkCtrl.shouldBecomeMaster)
                        networkCtrl.shouldBecomeMaster = true; 
                    
                    // this one is better master than we, don't become master 
                    if (networkCtrl.masterAbilityScore < intent.extras.score)
                        networkCtrl.shouldBecomeMaster = false;


                    // we are currently the best option, but somebody else is also good. Decide by random numbers.
                    if (networkCtrl.masterAbilityScore == intent.extras.score && networkCtrl.shouldBecomeMaster) {
                        networkCtrl.shouldBecomeMaster = (networkCtrl.randomOnScoreCollision > intent.extras.onCollision) ? true : false;
                        console.log('Same device score, checking random numbers:', networkCtrl.randomOnScoreCollision, intent.extras.onCollision, networkCtrl.shouldBecomeMaster);
                    }


            }
                break;
        case 'MASTER_IS_ALIVE': //received message from master -> master is alive  
            if (intent.sender.length > 0 && networkCtrl.isMaster) {//remote master but I am master, too.
                console.warn('multiple masters in network, stop beeing master.'); //happens when XMPP-server takes way to long to responde
                networkCtrl.stopBeeingMaster();
                break;
            }  
            networkCtrl.masterIsAlive();
                break;        
    }

    if (intent.categories && intent.categories.indexOf('master') !== -1 && networkCtrl.isMaster) { // for master
        switch (intent.action) {
            case '':
                break;
        }
    }

}
