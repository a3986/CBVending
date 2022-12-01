function TestCache(req, resp) {
  const MSG_TOPIC = "shared_cache_tutorial";
  const SERVICE_INSTANCE_ID = req.service_instance_id;

  ClearBlade.init({ request: req });
  var cache = ClearBlade.Cache('SampleCache');
  const messaging = ClearBlade.Messaging();

  messaging.subscribe(MSG_TOPIC, function (err, errMsg) {
    if (err) {
      messaging.publish("error", "sub failed: " + errMsg);
      resp.error(errMsg);
    }
    messaging.publish("success", "Subscribed to " + MSG_TOPIC);
    WaitLoop();
  });

  function WaitLoop() {
    while (true) {
        messaging.waitForMessage([MSG_TOPIC], HandleMessage);
    }
  }
  function HandleMessage(err, msg, topic) {
    if (err) {
      messaging.publish("error", "failed to wait for message: " + err + " " + msg + "  " + topic);
    } else {
      // ### Invoke ProcessMessage Function Here!! ###
      ProcessMessage(msg, topic);
    }
  }
  function ProcessMessage(msg, topic) {
    try {
      const msgBody = JSON.parse(msg);
    } catch (e) {
      messaging.publish("error", "Error Parsing Message. Please publish valid JSON on "+ topic+" : " + e);
    }

    const key = (msgBody["cache"]) ? "cache" : "test";
    const value = (msgBody["cache"]) ? msgBody["cache"] : SERVICE_INSTANCE_ID;
    cache.get(key, function (err, data) {
      if (!err){
        messaging.publish("cached_data_reads", "Read " + JSON.stringify(data) + " by " + SERVICE_INSTANCE_ID)
      }
      cache.set(key, value, cacheSetCallback);
    });
  }

  function cacheSetCallback(errSet, setResp) {
    if (errSet) {
      resp.error("Error setting data: " + setResp);
    }
  }
}