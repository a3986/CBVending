/**
 * Type: Stream Service
 * Description: A service that does not have an execution timeout which allows for infinite execution of logic.
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

function TriggerStreamService(req, resp) {
  var deviceCreatedTopic = "$trigger/device/created";
  var deviceConnectedTopic = "$trigger/messaging/device/connected";

  ClearBlade.init({request:req});
  var messaging = ClearBlade.Messaging();

  messaging.subscribe(deviceCreatedTopic, function (err, errMsg) {
    if (err) {
      messaging.publish("service/error", "Subscribe failed");
      resp.error("Sub failed");
    }
  });

  messaging.subscribe(deviceConnectedTopic, function (err, errMsg) {
    if (err) {
      messaging.publish("service/error", "Subscribe failed");
      resp.error("Sub failed");
    }
  });

  while (true) {
    messaging.waitForMessage([deviceCreatedTopic, deviceConnectedTopic],     function (err, msg, topic) {
      if (err) {
        messaging.publish("service/error", "Wait for message failed");
        resp.error("failed to wait for message: " + err);
      } 
      else if (topic === deviceCreatedTopic) {
        // Process device created here. Do JSON.parse(msg) first
      } 
      else if (topic === deviceConnectedTopic) {
        // Process device connected here. Do JSON.parse(msg) first
      } 
      else {
        messaging.publish("service/error", "Bad topic: " + topic);
      }
    });
  }
}
