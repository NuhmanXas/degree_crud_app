import React from "react";
import { TextInput } from "react-native-paper";

const AppTextInputField = ({ label, value, onChangeText }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      style={{ marginBottom: 20 }}
      mode="outlined"
    />
  );
};

export default AppTextInputField;
