function TemperatureSensorTriggerHandler(req,resp){
    //Parse the sensor data
    var sensorData=JSON.parse(req.params.body);
    //if the temperature reading is above 50F, we need to schedule maintenance
    if(sensorData.temperature > 50) {
        //Hardcode the VendingMachineID for now. We will modify the code in a future module to retrieve
        //the VendingMachineID from the data collection.
        var repairData = {
            "VendingMachineID": "1",
            "MaintenanceCode": "CoolingSystem",
            "Temperature": sensorData.temperature
        };
        
        var topics = req.params.topic.split("/");
        repairData.SensorID = topics[topics.length -1];
        
        ClearBlade.init({request:req});
        var code = ClearBlade.Code();
        
        log("Scheduling repair for vending machine" + JSON.stringify(repairData) + "\n");
        
        code.execute("ScheduleMachineRepair", repairData, true, function(err, data) {
            if(!err) {
                log(JSON.stringify(data));
            }
        });
    }
    else
        resp.success();
}