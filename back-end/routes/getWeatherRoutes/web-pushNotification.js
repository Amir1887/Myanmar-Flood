const webPush = require("web-push");

//Voluntary Application Server Identification(should only generated once!)
// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys);



const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webPush.setVapidDetails(
    "mailto:amiradel1234567@gmail.com",
    publicVapidKey,
    privateVapidKey
  );


//subscription: This is the subscription object saved from the frontend.
//payload: The message data you want to send, such as an alert for weather warnings.
const sendPushNotification = async (subscription, payload) => {
  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
    console.log("Push notification sent successfully");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};


module.exports = { sendPushNotification };