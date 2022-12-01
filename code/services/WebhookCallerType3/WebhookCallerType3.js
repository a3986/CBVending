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

function WebhookCallerType3(req,resp){
    // These are parameters passed into the code service
    var params = req.params
    var http = Requests();
    var options = {
        uri:"https://platform.clearblade.com/api/v/4/webhook/execute/c0f6e6b70cfae2c890dca4cba028/Webhook_3_Payload_Auth",
        body:{
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhNDhkZmRiNzBjZjI4YmVlZWFkMWU0ZGQ4ZWM1MDEiLCJzaWQiOiJmZjVjNzZlMi1kZmI1LTQ1MDktOTRmNS1mNDFiOTlkMmY4ZmMiLCJ1dCI6MiwidHQiOjEsImV4cCI6MTY2OTc0MTI3NywiaWF0IjoxNjY5MzA5Mjc3fQ.DpP-nGJ1FRv25JLfTUWpRGSnETNFejh6bF7QQLSr6Y4",
            "data":"Authenticated using Http Payload"
        }
    }
    http.post(options, function(err, response){
        if(err){
            resp.error("Failed to call the webhook");
        }
        resp.success("Success"+ response);
    });
}
