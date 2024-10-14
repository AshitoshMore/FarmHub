import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons

const Add = () => {
  const navigation = useNavigation(); // Use navigation hook to access navigation

  return (
    <View style={tw`flex-1 justify-center items-center bg-slate-100`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddForm')}
        style={tw`bg-blue-500 p-4 rounded-full absolute bottom-5 right-5 items-center justify-center`}>
        <Ionicons  name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Add;
