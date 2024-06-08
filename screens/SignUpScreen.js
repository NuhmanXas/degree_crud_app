import React, { useState } from "react";
import { View, StyleSheet, Button, ScrollView, Alert } from "react-native";
import AppTextInputField from "../Components/AppTextInputField";
import { Picker } from "@react-native-picker/picker";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../Store/firebaseConfig";
import AppDropDownPicker from "../Components/AppDropDownPicker";
import { createDataInFirestore } from "../Store/Firestore_CRUD";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  function generateTempPassword(length = 10) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }


  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !gender) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    try {
      const tempPassword = generateTempPassword();
      console.log(tempPassword);
      await createUserWithEmailAndPassword(auth, email, tempPassword);

      const id = createDataInFirestore({
        _collection: "users",
        _data: { firstName, lastName, gender, email },
      });

      console.log(id);

      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        "Account created successfully. Please check your email to set your password."
      );
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up: ", error);
      Alert.alert("Error signing up", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <AppTextInputField
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <AppTextInputField
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <View>
          <AppDropDownPicker
            label={"Gender"}
            onValueChange={(itemValue) => setGender(itemValue)}
            selectedValue={gender}
            items={[
              { label: "Select Gender", value: "" },
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />
        </View>
        <AppTextInputField label="Email" value={email} onChangeText={setEmail} />
        <View style={styles.buttonContainer}>
          <Button title="Create New Account" onPress={handleSignUp} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="I Already Have an Account"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  form: {
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});

export default SignUpScreen;
