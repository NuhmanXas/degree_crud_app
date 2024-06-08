
import { useState } from "react";
import { TextInput } from "react-native-paper";


function AppPasswordTextInputField({ label, value, onChangeText }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!passwordVisible}
      style={{ marginBottom: 20 }}
      mode="outlined"
      right={
        <TextInput.Icon
          icon={passwordVisible ? "eye-off" : "eye"}
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      }
    />
  );
}

export default AppPasswordTextInputField;