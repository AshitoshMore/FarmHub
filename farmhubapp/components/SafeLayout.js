import React from 'react';
import { SafeAreaView, View, StatusBar, Platform } from 'react-native';
import Constants from 'expo-constants'; // Import Constants to manage top padding for different devices
import tw from 'twrnc';

const SafeLayout = ({ children, style }) => {
  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, style]}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          tw`flex-1`,
          {
            paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0, // Add top padding based on device type
          },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeLayout;
