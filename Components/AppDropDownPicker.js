import React, { useState } from "react";
import { Modal, StyleSheet, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

const AppDropDownPicker = ({
  label,
  items,
  selectedValue,
  onValueChange,
}) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        value={
          selectedValue
            ? items.find((item) => item.value === selectedValue).label
            : ""
        }
        right={<TextInput.Icon name="menu-down" />}
        onFocus={handleOpen}
        showSoftInputOnFocus={false} // Prevents keyboard from showing up on focus
        style={{ marginBottom: 20 }}
      />
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              onValueChange(itemValue);
              handleClose();
            }}
          >
            {items.map((item, index) => (
              <Picker.Item label={item.label} value={item.value} key={index} />
            ))}
          </Picker>
          <Button title="Done" onPress={handleClose} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  },
});

export default AppDropDownPicker;
