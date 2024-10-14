// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
//   ScrollView,
// } from 'react-native';
// import tw from 'twrnc';
// import { supabase } from '../supabase'; // Import Supabase client
// import PopUpComponent from '../charts/PopUp'; // Import PopUpComponent
// import SelectLocation from '../charts/SelectLocation'; // Import SelectLocation component
// import SafeLayout from '../components/SafeLayout';

// const SignupPage = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [confirmMobileNumber, setConfirmMobileNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [mapVisible, setMapVisible] = useState(false);
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [pinDigits, setPinDigits] = useState(['', '', '', '']);
//   const [c_pinDigits, setC_PinDigits] = useState(['', '', '', '']); // Function to clear form data

//   const clearFormData = () => {
//     setName('');
//     setMobileNumber('');
//     setConfirmMobileNumber('');
//     setPinDigits(['', '', '', '']);
//     setC_PinDigits(['', '', '', '']);
//     setMarkerPosition(null);
//   };

//   const handleSignup = async () => {
//     if (mobileNumber !== confirmMobileNumber) {
//       setPopupMessage("Mobile numbers don't match!");
//       setPopupVisible(true);
//       return;
//     }

//     if (pinDigits.join('') !== c_pinDigits.join('')) {
//       setPopupMessage("Pins don't match!");
//       setPopupVisible(true);
//       return;
//     }

//     if (!markerPosition) {
//       setPopupMessage('Please select a location on the map!');
//       setPopupVisible(true);
//       return;
//     }

//     setLoading(true); // Use a hashed or encrypted method for PIN in production

//     const newPinDigits = pinDigits.join(''); // Insert signup details into Supabase

//     const { data, error } = await supabase.from('farmers').insert([
//       {
//         name,
//         mobile_number: mobileNumber,
//         password: newPinDigits,
//         location_access: true,
//         latitude: markerPosition.latitude,
//         longitude: markerPosition.longitude,
//       },
//     ]);

//     setLoading(false);

//     if (error) {
//       console.error('Error signing up:', error);
//       setPopupMessage('Signup failed. Please try again.');
//       setPopupVisible(true);
//     } else {
//       console.log('Signup successful:', data);
//       setPopupMessage('Signup successful!');
//       setPopupVisible(true);
//       clearFormData();
//     }
//   };

//   const handlePinChange = (index, value) => {
//     const newPinDigits = [...pinDigits];
//     newPinDigits[index] = value;
//     setPinDigits(newPinDigits);
//   };

//   const handleC_PinChange = (index, value) => {
//     const newPinDigitsC = [...c_pinDigits];
//     newPinDigitsC[index] = value;
//     setC_PinDigits(newPinDigitsC);
//   };

//   const handleSelectLocation = () => {
//     setMapVisible(true);
//   };

//   const handleSaveLocation = (position) => {
//     setMarkerPosition(position);
//     setMapVisible(false);
//   };

//   const handleCancelLocation = () => {
//     setMapVisible(false);
//   }; // Handle popup close and navigate to login page

//   const handlePopupClose = () => {
//     setPopupVisible(false);
//     navigation.navigate('Login');
//   }; // Handle "Already have an account" click

//   const handleAlreadyHaveAccount = () => {
//     clearFormData();
//     navigation.navigate('Login');
//   };

//   return (
//     <SafeLayout>
//       <ScrollView
//         contentContainerStyle={tw`flex-grow justify-center`}
//         keyboardShouldPersistTaps="handled">
//         <View style={tw`flex-1 justify-center px-6 bg-slate-100`}>
//           {!mapVisible ? (
//             <>
//               <Text style={tw`text-3xl font-bold text-center text-black mb-8`}>
//                 Signup
//               </Text>
//               <TextInput
//                 style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-4 text-lg`}
//                 placeholder="Name"
//                 value={name}
//                 onChangeText={setName}
//               />
//               <TextInput
//                 style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-4 text-lg`}
//                 placeholder="Mobile Number"
//                 value={mobileNumber}
//                 onChangeText={setMobileNumber}
//                 keyboardType="phone-pad"
//               />
//               <TextInput
//                 style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-4 text-lg`}
//                 placeholder="Confirm Mobile Number"
//                 value={confirmMobileNumber}
//                 onChangeText={setConfirmMobileNumber}
//                 keyboardType="phone-pad"
//               />
//               <Text style={tw`text-lg mr-2 mb-2`}>Set 4 Digit Pin</Text>
//               <View style={tw`flex-row justify-center mb-6`}>
//                 {pinDigits.map((digit, index) => (
//                   <TextInput
//                     key={index}
//                     style={tw`border border-gray-400 rounded-lg py-2 px-3 text-center mx-1 w-14 h-14 text-lg`}
//                     maxLength={1}
//                     keyboardType="numeric"
//                     value={digit}
//                     onChangeText={(value) => handlePinChange(index, value)}
//                     selectionColor="#000"
//                   />
//                 ))}
//               </View>

//               <Text style={tw`text-lg mr-2 mb-2`}>Confirm 4 Digit Pin</Text>

//               <View style={tw`flex-row justify-center mb-6`}>
//                 {c_pinDigits.map((digit, index) => (
//                   <TextInput
//                     key={index}
//                     style={tw`border border-gray-400 rounded-lg py-2 px-3 text-center mx-1 w-14 h-14 text-lg`}
//                     maxLength={1}
//                     keyboardType="numeric"
//                     value={digit}
//                     onChangeText={(value) => handleC_PinChange(index, value)}
//                     selectionColor="#000"
//                   />
//                 ))}
//               </View>
//               <TouchableOpacity
//                 onPress={handleSelectLocation}
//                 style={tw`bg-blue-500 py-4 rounded-xl mb-2 mx-10`}
//                 disabled={loading}>
//                 {loading ? (
//                   <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                   <Text style={tw`text-white text-center text-lg`}>
//                     Select Location
//                   </Text>
//                 )}
//               </TouchableOpacity>
//               {markerPosition && (
//                 <Text style={tw`text-center text-lg mb-4`}>
//                                     Selected Location:
//                   {`${markerPosition.latitude}, ${markerPosition.longitude}`}   
//                 </Text>
//               )}
//               <TouchableOpacity
//                 onPress={handleSignup}
//                 style={tw`bg-green-500 py-4 rounded-xl mb-6 mx-10`}
//                 disabled={loading}>
//                 {loading ? (
//                   <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                   <Text style={tw`text-white text-center text-lg`}>Signup</Text>
//                 )}
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleAlreadyHaveAccount}
//                 style={tw`border border-green-500 py-4 rounded-xl mb-6 mx-10`}>
//                 <Text style={tw`text-green-500 text-center text-lg`}>
//                   Already have an account? Login
//                 </Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <SelectLocation
//               onSave={handleSaveLocation}
//               onCancel={handleCancelLocation}
//             />
//           )}
//         </View>
//                 {/* Popup Component */} 
//         <PopUpComponent
//           visible={popupVisible}
//           message={popupMessage}
//           onClose={handlePopupClose}
//         />
//       </ScrollView>
//     </SafeLayout>
//   );
// };

// export default SignupPage;

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import { supabase } from '../supabase'; // Import Supabase client
import PopUpComponent from '../charts/PopUp'; // Import PopUpComponent
import SelectLocation from '../charts/SelectLocation'; // Import SelectLocation component
import SafeLayout from '../components/SafeLayout';

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmMobileNumber, setConfirmMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [mapVisible, setMapVisible] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [c_pinDigits, setC_PinDigits] = useState(['', '', '', '']);

  const pinRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const confirmPinRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  // Function to clear form data
  const clearFormData = () => {
    setName('');
    setMobileNumber('');
    setConfirmMobileNumber('');
    setPinDigits(['', '', '', '']);
    setC_PinDigits(['', '', '', '']);
    setMarkerPosition(null);
  };

  const handleSignup = async () => {
    if (mobileNumber !== confirmMobileNumber) {
      setPopupMessage("Mobile numbers don't match!");
      setPopupVisible(true);
      return;
    }

    if (pinDigits.join('') !== c_pinDigits.join('')) {
      setPopupMessage("Pins don't match!");
      setPopupVisible(true);
      return;
    }

    if (!markerPosition) {
      setPopupMessage('Please select a location on the map!');
      setPopupVisible(true);
      return;
    }

    setLoading(true);

    const newPinDigits = pinDigits.join('');

    const { data, error } = await supabase
      .from('farmers') // Ensure this table name is correct
      .insert([
        {
          name,
          mobile_number: mobileNumber,
          password: newPinDigits, // Ensure to hash or encrypt passwords in production
          location_access: true,
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error('Error signing up:', error);
      setPopupMessage('Signup failed. Please try again.');
      setPopupVisible(true);
    } else {
      console.log('Signup successful:', data);
      setPopupMessage('Signup successful!');
      setPopupVisible(true);
      clearFormData(); // Clear form data after successful signup
    }
  };

  const handlePinChange = (text, index) => {
    const newPin = [...pinDigits];

    // Handle backspace
    if (text === '') {
      newPin[index] = ''; // Clear the current box
      setPinDigits(newPin);
      // Move focus to the previous input box
      if (index > 0) {
        pinRefs.current[index - 1].current.focus();
      }
    } else {
      newPin[index] = text.replace(/[^0-9]/g, ''); // Allow only numeric input
      setPinDigits(newPin);

      // Move to the next input field if current field is filled
      if (text && index < 3) {
        pinRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleC_PinChange = (text, index) => {
    const newPinC = [...c_pinDigits];

    // Handle backspace
    if (text === '') {
      newPinC[index] = ''; // Clear the current box
      setC_PinDigits(newPinC);
      // Move focus to the previous input box
      if (index > 0) {
        confirmPinRefs.current[index - 1].current.focus();
      }
    } else {
      newPinC[index] = text.replace(/[^0-9]/g, ''); // Allow only numeric input
      setC_PinDigits(newPinC);

      // Move to the next input field if current field is filled
      if (text && index < 3) {
        confirmPinRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleSelectLocation = () => {
    setMapVisible(true);
  };

  const handleSaveLocation = (position) => {
    setMarkerPosition(position);
    setMapVisible(false);
  };

  const handleCancelLocation = () => {
    setMapVisible(false);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    navigation.navigate('Login');
  };

  const handleAlreadyHaveAccount = () => {
    clearFormData();
    navigation.navigate('Login');
  };

  return (
    <SafeLayout>
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center`}
        keyboardShouldPersistTaps="handled">
        <View style={tw`flex-1 justify-center px-6 bg-slate-100`}>
          {!mapVisible ? (
            <>
              <Text style={tw`text-3xl font-bold text-center text-black mb-8`}>
                Signup
              </Text>
              <TextInput
                style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-4 text-lg`}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-4 text-lg`}
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />
              <TextInput
                style={tw`border border-gray-400 rounded-lg py-4 px-6 mb-4 text-lg`}
                placeholder="Confirm Mobile Number"
                value={confirmMobileNumber}
                onChangeText={setConfirmMobileNumber}
                keyboardType="phone-pad"
              />
              <Text style={tw`text-lg mr-2 mb-2`}>Set 4 Digit Pin</Text>
              <View style={tw`flex-row justify-center mb-6`}>
                {pinDigits.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={pinRefs.current[index]}
                    style={tw`border border-gray-400 rounded-lg py-2 px-3 text-center mx-1 w-14 h-14 text-lg`}
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(value) => handlePinChange(value, index)}
                    selectionColor="#000"
                  />
                ))}
              </View>

              <Text style={tw`text-lg mr-2 mb-2`}>Confirm 4 Digit Pin</Text>
              <View style={tw`flex-row justify-center mb-6`}>
                {c_pinDigits.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={confirmPinRefs.current[index]}
                    style={tw`border border-gray-400 rounded-lg py-2 px-3 text-center mx-1 w-14 h-14 text-lg`}
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(value) => handleC_PinChange(value, index)}
                    selectionColor="#000"
                  />
                ))}
              </View>
              <TouchableOpacity
                onPress={handleSelectLocation}
                style={tw`bg-blue-500 py-4 rounded-xl mb-2 mx-10`}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={tw`text-white text-center text-lg`}>
                    Select Location
                  </Text>
                )}
              </TouchableOpacity>
              {markerPosition && (
                <Text style={tw`text-center text-lg mb-4`}>
                  Selected Location: {`${markerPosition.latitude}, ${markerPosition.longitude}`}
                </Text>
              )}
              <TouchableOpacity
                onPress={handleSignup}
                style={tw`bg-green-500 py-4 rounded-xl mb-6 mx-10`}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={tw`text-white text-center text-lg`}>Signup</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAlreadyHaveAccount}
                style={tw`border border-green-500 py-4 rounded-xl mb-6 mx-10`}>
                <Text style={tw`text-green-500 text-center text-lg`}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <SelectLocation
              onSave={handleSaveLocation}
              onCancel={handleCancelLocation}
            />
          )}
        </View>
      </ScrollView>
      <PopUpComponent
        visible={popupVisible}
        message={popupMessage}
        onClose={handlePopupClose}
      />
    </SafeLayout>
  );
};

export default SignupPage;
