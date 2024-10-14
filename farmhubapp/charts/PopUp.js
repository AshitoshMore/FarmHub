// PopUpComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import tw from 'twrnc'; // Tailwind import

const PopUpComponent = ({ message, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-6 rounded-lg shadow-lg w-80`}>
          <Text style={tw`text-lg font-bold mb-4 text-center`}>Message</Text>
          <Text style={tw`text-center mb-6`}>{message}</Text>

          {/* OK Button */}
          <TouchableOpacity
            style={tw`bg-blue-500 py-2 px-4 rounded`}
            onPress={onClose}
          >
            <Text style={tw`text-white font-bold text-center`}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpComponent;
