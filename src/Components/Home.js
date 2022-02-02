import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Home = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Chat", { name: name });

    setName("");
  };

  return (
    <View>
      <Text style={styles.title}>Enter your name :</Text>
      <TextInput
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        style={styles.nameInput}
        placeholder="Your Name"
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.homebtn}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  nameInput: {
    height: 40,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 20,
  },
  homebtn: {
    color: "white",
    fontSize: 25,
    backgroundColor: "blue",
    textAlign: "center",
    padding: 10,
    marginHorizontal: 20,
  },
});

export default Home;
