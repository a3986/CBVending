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

function UpdateMachineInventory(req,resp){
    // These are parameters passed into the code service
    ClearBlade.init({request:req});
    const vendingMachine = MachineLib();
    if(!req.params.VendingMachineID || !req.params.MachineBinNumber || !req.params.Quantity){
      resp.error("Some Inventory Data is missing, please Check");
    }
    const inventoryData = req.params;
    vendingMachine.UpdateBinInventory(inventoryData)
    .then(function(data){
      var msg = "The inventory for bin number " + inventoryData.MachineBinNumber + "";
      msg += " in vending machine " + inventoryData.VendingMachineID + "";
      msg += " has been updated to " + data.updatedQuantity + ".";
        
        resp.success(msg);
    })
    .fail(function(errData){
        resp.error("An error occured updating machine inventory" + JSON.stringify(errData));
    });
}
