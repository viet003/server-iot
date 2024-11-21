import { getMessaging } from 'firebase-admin/messaging';

// đăng ký
export const notificationController = async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  getMessaging().send(message).then((response) => {
    console.log('Successfully sent message:', response);
    res.status(200).send('Notification sent successfully!');
  }).catch((error) => {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending notification');
  });
}

// send notification controller
export const sendNotificationController = async (token, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  getMessaging().send(message).then((response) => {
    console.log('Successfully sent message:', response);
    return true;
  }).catch((error) => {
    console.error('Error sending message:', error);
    return false;
  });
}