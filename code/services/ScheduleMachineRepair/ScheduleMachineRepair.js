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

function ScheduleMachineRepair(req,resp){
    // These are parameters passed into the code service
    var parameters = req.params
    if( ! parameters.VendingMachineID ){
        resp.error("Failed to provide valid VendingMachineID. Maintenance was not scheduled.");
    }

    if( ! parameters.MaintenanceCode ){
        resp.error("Failed to provide valid MaintenanceCode. Maintenance was not scheduled.");
    }
    
    var msg = "Maintenance scheduled for vending machine: " + parameters.VendingMachineID +". Maintenance code:" + parameters.MaintenanceCode + ".";
    resp.success(msg);
}
