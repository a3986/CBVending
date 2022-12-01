/**
 * Type: Library
 * Description: A library that contains a function which, when called, returns an object with a public API.
 */
function VendingMachineInventoryLib(){
    function getBinInventory(machineID, binNum, quantity, callback) {
        log("VendingMachineInventoryLib-getBinInventory");
        var q = ClearBlade.Query({ collectionName: "Vending_Machine_Inventory" });
        q.columns(["quantity"]);
        q.equalTo("vending_machine_id", machineID);
        q.equalTo("slot", binNum);
        q.fetch(function (err, data) {
            if (err) {
                log("VendingMachineInventoryLib-getBinInventory:Error executing fetch" + JSON.stringify(err));
                callback(err, data);
            } else {
                log("VendingMachineInventoryLib-getBinInventory:Row retrieved" + JSON.stringify(data));
                callback(err, { "quantity": data.DATA[0].quantity });
            }
        });
    }
    function updateBinInventory(machineID, binNum, quantity, callback) {
        log("VendingMachineInventoryLib-updateBinInventory");
        this.getBinInventory(machineID, binNum, quantity, function(err, data){
            if (err) {
                log("VendingMachineInventoryLib-updateBinInventory:Error executing fetch" + JSON.stringify(err));
                callback(data);
            } else {
                log("VendingMachineInventoryLib-updateBinInventory:Row retrieved" + JSON.stringify(data));
                var updateQuantity = parseInt(data.quantity) + parseInt(quantity);
                var q = ClearBlade.Query({ collectionName: "Vending_Machine_Inventory" });
                q.columns(["quantity"]);
                q.equalTo("vending_machine_id", machineID);
                q.equalTo("slot", binNum);
                var updateRow = {
                    "quantity": updateQuantity
                };
                q.update(updateRow, function (err, data) {
                    log("VendingMachineInventoryLib-updateBinInventory:err = " + JSON.stringify(err));
                    log("VendingMachineInventoryLib-updateBinInventory:data = " + JSON.stringify(data));
                    callback(err, { "updatedQuantity": updateQuantity });
                });
            }
        });
    };
    function function3() {}

    return {
        getBinInventory,
        updateBinInventory,
        function3
    }
}
