function MachineLib(){

    function GetBinInventory(machineID,binNum, newQuantity){
        log("VendingMachineInventoryLib-getBinInventory");
        
        var deferred = Q.defer();
        var query = ClearBlade.Query({ collectionName: "Vending_Machine_Inventory" });
        
        query.columns(["quantity"]);
        query.equalTo("vending_machine_id", machineID);
        query.equalTo("slot", binNum);
        query.fetch(function (err, data) {
            if (err) {
                log("VendingMachineInventoryLib-getBinInventory:Error executing fetch for Getting Bin Inventory: " + JSON.stringify(err));
                deferred.reject(data);
            } else {
                log("VendingMachineInventoryLib-getBinInventory:Row retrieved" + JSON.stringify(data));
                deferred.resolve({ "quantity": data.DATA[0].quantity, "vending_machine_id":machineID, "slot": binNum, "newQuantity":newQuantity });
            }
        });
        return deferred.promise;
    }

    function PerformUpdate(data){
        var deferred = Q.defer();
        log("VendingMachineInventoryLib-updateBinInventory:Row retrieved" + JSON.stringify(data));
        var updateQuantity = parseInt(data.quantity) + parseInt(data.newQuantity);
        var query = ClearBlade.Query({ collectionName: "Vending_Machine_Inventory" });
        query.columns(["quantity"]);
        query.equalTo("vending_machine_id", data.vending_machine_id);
        query.equalTo("slot", data.slot);
        var updateRow = {
            "quantity": updateQuantity
        };
        query.update(updateRow, function (err, data) {
            if(err){
                log("VendingMachineInventoryLib-updateBinInventory:err = " + JSON.stringify(err));
                deferred.reject(data);
            } else{
                log("VendingMachineInventoryLib-updateBinInventory:data = " + JSON.stringify(data));
                deferred.resolve({ "updatedQuantity": updateQuantity })
            }
        });
        return deferred.promise;
    }

    

    function UpdateBinInventory(inventoryData){
        
        const machineID = inventoryData.VendingMachineID;
        const binNum = inventoryData.MachineBinNumber;
        const newQuantity = inventoryData.Quantity;
        log("MachineID: " + machineID+ " Bin Num: "+binNum);
        return GetBinInventory(machineID,binNum, newQuantity)
        .then(PerformUpdate);
        
    }
    return {
     UpdateBinInventory   
    }
}