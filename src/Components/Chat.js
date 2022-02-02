import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Backend from "./Backend";

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const name = route.params.name;
  componentWillMount = () => {};
  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => {
        Backend.sendMessage(message);
      }}
      user={{
        _id: Backend.getUid(),
        name: name,
      }}
    />
  );
};
componentDidMount = () => {
  Backend.loadMessages((message) => {
    setMessages((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message),
      };
    });
  });
};
componentWillUnmount = () => {
  Backend.closeChat();
};

// Chat.defaultProps = {
//   name: "Bilal",
// };

// Chat.propTypes = {
//   name: React.propTypes.string,
// };

const styles = StyleSheet.create({});

export default Chat;
