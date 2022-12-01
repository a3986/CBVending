function	WeightSensorTriggerHandler(req,	resp){
	ClearBlade.init({request:req});
	//Parse	the	sensor	data
	log(req);
	if(!req.params.body){
		resp.error("Body not passed")
	}
	try{
	 var sensorData	=	JSON.parse(req.params.body);
	} catch(e){
		resp.error("Error Parsing Data"+ e);
	}
	//Create	the	request	data	that	needs	to	be	sent	to	the	UpdateMachineInventory	service
	//Hardcode	the	VendingMachineID	for	now.	We	will	modify	the	code	in	a	future	module	to	retrieve
	//the	VendingMachineID	from	the	data	collection.
	var	inventoryData	=	{
		"VendingMachineID":	"1",
		"MachineBinNumber":	sensorData.bin,
		"Weight":	sensorData.weight,
		"Quantity":	1
	};
	var	topics	=	req.params.topic.split("/");
	var vendingMachine = VendingMachine();

	vendingMachine.UpdateBinInventory(inventoryData)
	.then(function(data){
		//if	the	weight	reading	is	less	than	or	equal	to	0,	we	need	to	schedule	maintenance
		if(inventoryData.weight	<=	0)	{
			//Create	the	request	data	that	needs	to	be	sent	to	the	ScheduleMachineRepair	service
			var	repairData	=	{
				"VendingMachineID":	inventoryData.VendingMachineID,
				"MaintenanceCode":	"BinWeight",
				"Weight":	sensorData.weight
			};
			vendingMachine.ScheduleMachineRepair(repairData);
		} else{
			resp.success("Data Updated on Sensor Publish");
		}
	},function(errData){
		resp.error(errData);
	})
}