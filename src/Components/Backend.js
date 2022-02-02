import firebase from "firebase";

class Backend {
  uid = "";
  messageRef = null;

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyA8-l0b8nhN8qqs-vUpBKnea4Dax1Tg9Rw",
      authDomain: "chat-app-rn-9b0a2.firebaseapp.com",
      projectId: "chat-app-rn-9b0a2",
      storageBucket: "chat-app-rn-9b0a2.appspot.com",
      messagingSenderId: "305168639184",
      appId: "1:305168639184:web:4ec3feb3f0a3de7d4c2ad5",
      measurementId: "G-XYLMVT62X2",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            alert(error.message);
          });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  //retrieve the messages from the backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref("messages");
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on("child_added", onReceive);
  }
  // send the message to the backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
