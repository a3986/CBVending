/**
 * Type: Library
 * Description: A library that contains a function which, when called, returns an object with a public API.
 */
function MachineLocationLibrary() {
    function getBinInventory() {
        var deferred = Q.defer();
        log("MachineLocationLibrary-getBinInventory");
        var q = ClearBlade.Query({
            collectionName: "Vending_Machine_Inventory"
        });
        q.columns(["quantity", "vending_machine_id"]);
        q.equalTo("vending_machine_id", 1);
        q.fetch(function(err, data) {
            if (err) {
                log("MachineLocationLibrary-getBinInventory: Error executing fetch " + JSON.stringify(err));
                deferred.reject("unable to fetch");
            } else {
                log("MachineLocationLibrary-getBinInventory: Row retrieved " + JSON.stringify(data));
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    };

    function notifyAdmin(data) {
        log("Data is: " + JSON.stringify(data));
        if (data.DATA[0].quantity <= 3) {
            return false;
        } else {
            return true;
        }
    }

    return {
        getBinInventory,
        notifyAdmin
    }
}