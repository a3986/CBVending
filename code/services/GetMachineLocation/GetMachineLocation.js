/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */

function GetMachineLocation(req, resp) {
    ClearBlade.init({
        request: req
    });
    log("In GetMachineLocation");
    MachineLocationLibrary.getBinInventory().then(MachineLocationLibrary.notifyAdmin)
        .then(function(err) {
            if (err) {
                log("GetMachineLocation - in if");
                resp.error("Failed to fetch records");
            } else {
                log("GetMachineLocation - in else");
                /*var msg = ClearBlade.Messaging();
                msg.publish("Machine Inventory","Inventory is low, please restock!")*/
                resp.success("Admin has been notified");
            }
        }).catch(function(error) {
            log("GetMachineLocation - In catch");
            resp.error("error");
        });
}