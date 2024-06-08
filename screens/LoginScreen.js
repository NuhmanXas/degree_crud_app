import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import AppTextInputField from "../Components/AppTextInputField";
import AppPasswordTextInputField from "../Components/AppPasswordTextInputField";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { auth } from "../Store/firebaseConfig"; // Adjust this path as necessary


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUserUIDToSecureStore = async (uid) => {
    await SecureStore.setItemAsync("userUID", uid);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await saveUserUIDToSecureStore(user.uid);
      navigation.navigate("MainApp");
    } catch (error) {
      console.error("Error logging in: ", error);
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AppTextInputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <AppPasswordTextInputField
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.text} onPress={() => navigation.navigate("SignUp")}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});

export default LoginScreen;
