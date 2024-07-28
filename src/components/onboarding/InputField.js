import React, { useState } from 'react';
import { StyleSheet, View, TextInput, } from 'react-native';
import SubmitButton from './SubmitButton';

const InputField = ({ value, placeholder }) => {
  const [text, setText] = useState('');

  const handleInputChange = (inputValue) => {
    setText(inputValue);
  };

  const handleSubmit = () => {
    console.log('Input value:', text);
  };
  return (
    <View>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={handleInputChange}
      value={value}
    />
    <SubmitButton text={"Submit"} onPress={handleSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    width: 300,
    marginBottom: 16,
    paddingHorizontal: 22,
    paddingVertical: 16,
    textAlign: 'left',
  },
});

export default InputField;