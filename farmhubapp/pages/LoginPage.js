import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { supabase } from '../supabase'; // Ensure you import your Supabase client
import tw from 'twrnc'; // Assuming you're using Tailwind CSS for styling
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import SafeLayout from '../components/SafeLayout';

const LoginScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [mobileNumber, setMobileNumber] = useState('');  // Store mobile number input
  const [pin, setPin] = useState(['', '', '', '']);  // Store each digit of the PIN
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');  // Display notification message
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  
  // Create refs for each PIN input
  const pinRefs = useRef(pin.map(() => React.createRef()));

  // Function to validate mobile number and PIN, and log in the user
  const handleLogin = async () => {
    const pinString = pin.join('');

    // Validate 10-digit mobile number and 4-digit PIN
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setNotification('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!/^\d{4}$/.test(pinString)) {
      setNotification('Please enter a valid 4-digit PIN.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('mobile_number', mobileNumber)
      .single();

    setLoading(false);

    if (error || !data) {
      setNotification('Mobile number not found.');
    } else if (data.password === pinString) {
      setNotification('Login successful!');
      setMobileNumber('');
      setPin(['', '', '', '']);
      setNotification('');
      navigation.navigate('Home');
    } else {
      setNotification('Incorrect PIN. Please try again.');
    }
  };

  const handlePinChange = (text, index) => {
    const newPin = [...pin];

    // Handle backspace
    if (text === '') {
      if (index === 0) {
        newPin[index] = ''; // Clear the first box
        setPin(newPin);
      } else {
        newPin[index] = ''; // Clear the current box
        setPin(newPin);
        // Move focus to the previous input box
        pinRefs.current[index - 1].current.focus();
      }
    } else {
      newPin[index] = text.replace(/[^0-9]/g, '');
      setPin(newPin);

      // Move to the next input field if current field is filled
      if (text && index < 3) {
        pinRefs.current[index + 1].current.focus();
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
   <SafeLayout>
    <View style={tw`flex-1 justify-center px-6 mb-10 bg-slate-100`}>
      {/* Header */}
      <Text style={tw`text-2xl font-bold text-center mb-10`}>Login</Text>

      {notification ? (
        <Text style={tw`text-red-500 text-center mb-4`}>{notification}</Text>
      ) : null}

      <TextInput
        style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-10 text-lg`}
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
        autoCapitalize="none"
        maxLength={10}
      />

      <View style={tw`flex-row items-center justify-between mb-10`}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={pinRefs.current[index]} // Set the ref for each input
            style={tw`border border-gray-400 rounded-lg h-16 w-16 text-lg text-center mx-1`} // Smaller width
            placeholder="" // Make placeholder empty when there is nothing
            value={digit}
            onChangeText={(text) => handlePinChange(text, index)}
            keyboardType="numeric"
            secureTextEntry={!showPassword}
            maxLength={1}
          />
        ))}
        {/* Show Password Button next to PIN inputs */}
        <TouchableOpacity onPress={toggleShowPassword} style={tw`ml-2`}>
          <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={handleLogin} 
        disabled={loading}
        style={tw`bg-blue-500 py-4 rounded-lg  mb-10`}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white text-center text-lg`}>Login</Text>}
      </TouchableOpacity>

      {/* Navigation to Signup */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SignupPage')} // Fixed: moved the onPress to TouchableOpacity
        style={tw`border border-green-500 py-4 rounded-lg`}>
        <Text style={tw`text-green-500 text-center text-lg`}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
    </SafeLayout>
  );
};

export default LoginScreen;

