var NetworkController = (function () {
    function NetworkController() {
        this.isMaster = false;
        this.masterAbilityScore = 0;
        this.masterAlive = false;
        this.masterPingTime = 3 * 1000;
        this.waitForMasterPing = this.masterPingTime * 2;
        this.timerID = 0;
        this.masterPingTimerID = 0;
        this.shouldBecomeMaster = true;
        this.masterAbilityScore = this.calcMasterDeviceAbility();
        this.timerID = setInterval(NetworkController.askToBecomeMaster, this.waitForMasterPing); //assume after waitForMasterPing that master is dead.
    }
    NetworkController.prototype.calcMasterDeviceAbility = function () {
        /**
        returns number between 0 and 1. 0 not good suited, 1 good suited master device.
        */
        var score = 1.0;
        var mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

        score = mobile ? score / 10 : score;
        this.randomOnScoreCollision = Math.random();
        return score;
    };

    NetworkController.prototype.masterIsAlive = function () {
        console.log('Master is alive, clear intervall: ', this.timerID);
        this.masterAlive = true;
        clearInterval(this.timerID); //master is alive, don't ask to become master...maybe next time ;)
        this.timerID = setInterval(NetworkController.askToBecomeMaster, this.waitForMasterPing); //maybe master dies this time (in next time intervall)
    };

    NetworkController.askToBecomeMaster = function () {
        networkCtrl.masterAlive = false;

        var data = {
            score: networkCtrl.masterAbilityScore,
            onCollision: networkCtrl.randomOnScoreCollision
        };

        /**
        After half masterPingTime time all askToBecomeMaster messages should be received.
        Therefore, we can decide if we should become master.
        */
        setTimeout(NetworkController.decideToBecomeMaster, networkCtrl.masterPingTime / 2);
        networkCtrl.sendIntent("UPDATE_MASTER_DEVICE", [], data);
    };

    NetworkController.decideToBecomeMaster = function () {
        clearInterval(networkCtrl.masterPingTimerID); // in case some sync errors occured
        networkCtrl.isMaster = false;
        if (networkCtrl.shouldBecomeMaster) {
            networkCtrl.isMaster = true;
            networkCtrl.sendIntent('MASTER_IS_ALIVE'); //shout out that we are the new master! (Hopefully we are in time...)
            networkCtrl.masterPingTimerID = setInterval(function () {
                networkCtrl.sendIntent('MASTER_IS_ALIVE');
            }, networkCtrl.masterPingTime); // and keep being it!
        }
    };

    NetworkController.prototype.calcUniqueId = function () {
    };

    NetworkController.prototype.sendIntent = function (action, categories, extras) {
        if (typeof categories === "undefined") { categories = []; }
        if (typeof extras === "undefined") { extras = {}; }
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
        } else
            console.error('Invalid intent!');
    };
    return NetworkController;
})();

var networkCtrl = new NetworkController();

function routerNetwork(intent) {
    switch (intent.action) {
        case 'UPDATE_MASTER_DEVICE':
            if (networkCtrl.masterAbilityScore !== intent.extras.score || networkCtrl.randomOnScoreCollision !== intent.extras.onCollision) {
                // if nobody before proofed to be better master and current score is also smaller -> become master
                if (networkCtrl.masterAbilityScore > intent.extras.score && networkCtrl.shouldBecomeMaster)
                    networkCtrl.shouldBecomeMaster = true;

                // this one is better master than we, don't become master
                if (networkCtrl.masterAbilityScore < intent.extras.score)
                    networkCtrl.shouldBecomeMaster = false;

                // we are currently the best option, but somebody else is also good. Decide by random numbers.
                if (networkCtrl.masterAbilityScore == intent.extras.score && networkCtrl.shouldBecomeMaster)
                    networkCtrl.shouldBecomeMaster = networkCtrl.randomOnScoreCollision > intent.extras.OnCollision ? true : false;
            }
            break;
        case 'MASTER_IS_ALIVE':
            networkCtrl.masterIsAlive();
            break;
    }

    if (intent.categories && intent.categories.indexOf('master') !== -1 && networkCtrl.isMaster) {
        switch (intent.action) {
            case '':
                break;
        }
    }
}
//# sourceMappingURL=networkCtr.js.map
