// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import tw from 'twrnc';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Popup from './PopUp';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Define available resource types and icons
// const resourceTypes = [
//   { name: 'Farm Land', icon: 'sprout' }, // Sprout icon for Crop
//   { name: 'Cattle', icon: 'cow' }, // Cow icon for Cattle
// ];

// const AddForm = () => {
//   const navigation = useNavigation();

//   // State management
//   const [selectedResourceType, setSelectedResourceType] = useState(resourceTypes[0].name);
//   const [resourceName, setResourceName] = useState('');
//   const [resourceSize, setResourceSize] = useState('');
//   const [resourceDescription, setResourceDescription] = useState('');
//   const [startDate, setStartDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');

//   const handleSave = () => {
//     if (resourceName && resourceSize && resourceDescription && startDate) {
//       setPopupMessage('Details saved successfully!');
//       setPopupVisible(true);
//     } else {
//       setPopupMessage('Please fill all fields');
//       setPopupVisible(true);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) setStartDate(selectedDate);
//   };

//   return (
//     <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
//       <View style={tw`p-4 bg-white rounded-lg shadow-md mx-4 my-8`}>
//         <Text style={tw`text-xl font-bold mb-4 text-center`}>
//           Create Resource
//         </Text>

//         {/* Horizontal ScrollView for selecting resource type */}
//         <Text style={tw`mb-2 font-bold`}>Select Resource Type:</Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={tw`mb-4`}>
//           {resourceTypes.map((type) => (
//             <TouchableOpacity
//               key={type.name}
//               style={[
//                 tw`flex-row items-center py-2 px-4 mr-2 rounded-full`,
//                 selectedResourceType === type.name
//                   ? tw`bg-blue-500`
//                   : tw`bg-gray-300`,
//               ]}
//               onPress={() => setSelectedResourceType(type.name)}>
//               <MaterialCommunityIcons
//                 name={type.icon}
//                 size={20}
//                 color={selectedResourceType === type.name ? 'white' : 'black'}
//                 style={tw`mr-2`}
//               />
//               <Text
//                 style={tw`font-bold ${
//                   selectedResourceType === type.name ? 'text-white' : 'text-black'
//                 }`}>
//                 {type.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Input for Resource Name */}
//         <Text style={tw`mb-1 font-bold`}>Enter Name of Resource:</Text>
//         <TextInput
//           style={tw`border border-gray-300 p-2 mb-4 rounded`}
//           placeholder="Enter resource name"
//           value={resourceName}
//           onChangeText={setResourceName}
//         />

//         {/* Input for Resource Size */}
//         <Text style={tw`mb-1 font-bold`}>Enter Resource Size:</Text>
//         <TextInput
//           style={tw`border border-gray-300 p-2 mb-4 rounded`}
//           placeholder="Enter resource size"
//           value={resourceSize}
//           onChangeText={setResourceSize}
//           keyboardType="numeric"
//         />

//         {/* Input for Resource Description */}
//         <Text style={tw`mb-1 font-bold`}>Enter Resource Description:</Text>
//         <TextInput
//           style={tw`border border-gray-300 p-2 mb-4 rounded`}
//           placeholder="Enter resource description"
//           value={resourceDescription}
//           onChangeText={setResourceDescription}
//           multiline
//           numberOfLines={4}
//         />

//         {/* Start Date */}
//         <Text style={tw`mb-1 font-bold`}>Enter Start Date:</Text>
//         <TouchableOpacity
//           style={tw`border border-gray-300 p-3 rounded mb-4`}
//           onPress={() => setShowDatePicker(true)}>
//           <Text style={tw`text-gray-600`}>{startDate.toDateString()}</Text>
//         </TouchableOpacity>
//         {showDatePicker && (
//           <DateTimePicker
//             value={startDate}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}

//         {/* Save and Cancel Buttons */}
//         <View style={tw`flex-row justify-around mt-4`}>
//           <TouchableOpacity
//             style={tw`border border-green-500 bg-white py-2 px-4 rounded-full`}
//             onPress={handleSave}>
//             <Text style={tw`text-black font-bold`}>Save</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={tw`border border-red-500 bg-white py-2 px-4 rounded-full`}
//             onPress={() => navigation.navigate('Home')}>
//             <Text style={tw`text-black font-bold`}>Cancel</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Popup for displaying messages */}
//         <Popup
//           visible={popupVisible}
//           message={popupMessage}
//           onClose={() => {
//             setPopupVisible(false);
//             if (popupMessage === 'Details saved successfully!') {
//               navigation.navigate('Home'); // Navigate only when saving is successful
//             }
//           }}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default AddForm;






import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import DateTimePicker from '@react-native-community/datetimepicker';
import Popup from './PopUp';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown
import { supabase } from '../supabase'; // Assume Supabase is initialized here

const resourceTypes = [
  { name: 'Farm Land', icon: 'sprout' },
  { name: 'Cattle', icon: 'cow' },
];

const AddForm = () => {
  const navigation = useNavigation();

  const [selectedResourceType, setSelectedResourceType] = useState(resourceTypes[0].name);
  const [resourceName, setResourceName] = useState('');
  const [resourceSize, setResourceSize] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [cropName, setCropName] = useState('');
  const [cattleCount, setCattleCount] = useState('');
  const [cattleType, setCattleType] = useState('Cow'); // Default cattle type
  const [manualCattleType, setManualCattleType] = useState(''); // For custom cattle type
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSave = async () => {
    if (resourceName && resourceDescription && startDate) {
      const data = {
        type: selectedResourceType,
        name: selectedResourceType === 'Cattle' ? cattleType : resourceName,
        description: resourceDescription,
        date: startDate.toISOString(),
      };

      if (selectedResourceType === 'Farm Land') {
        data.size = resourceSize;
        data.crop_name = cropName;
        data.crop_cultivation_date = startDate.toISOString();
      } else if (selectedResourceType === 'Cattle') {
        data.cattle_name = cattleType === 'Other' ? manualCattleType : cattleType;
        data.cattle_count = cattleCount;
      }

      // Insert into Supabase
      const { error } = await supabase.from('FarmerResources').insert([data]);

      if (error) {
        setPopupMessage('Error saving details: ' + error.message);
      } else {
        setPopupMessage('Details saved successfully!');
      }
      setPopupVisible(true);
    } else {
      setPopupMessage('Please fill all fields');
      setPopupVisible(true);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
      <View style={tw`p-4 bg-white rounded-lg shadow-md mx-4 my-8`}>
        <Text style={tw`text-xl font-bold mb-4 text-center`}>
          Create Resource
        </Text>

        {/* Resource Type Selection */}
        <Text style={tw`mb-2 font-bold`}>Select Resource Type:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mb-4`}>
          {resourceTypes.map((type) => (
            <TouchableOpacity
              key={type.name}
              style={[
                tw`flex-row items-center py-2 px-4 mr-2 rounded-full`,
                selectedResourceType === type.name ? tw`bg-blue-500` : tw`bg-gray-300`,
              ]}
              onPress={() => setSelectedResourceType(type.name)}>
              <MaterialCommunityIcons
                name={type.icon}
                size={20}
                color={selectedResourceType === type.name ? 'white' : 'black'}
                style={tw`mr-2`}
              />
              <Text style={tw`font-bold ${selectedResourceType === type.name ? 'text-white' : 'text-black'}`}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input for Farm Name or Cattle Type */}
        <Text style={tw`mb-1 font-bold`}>
          {selectedResourceType === 'Farm Land' ? 'Enter Farm Name:' : 'Select Cattle Type:'}
        </Text>

        {/* Conditional Dropdown for Cattle Type */}
        {selectedResourceType === 'Cattle' ? (
          <>
            <Picker
              selectedValue={cattleType}
              onValueChange={(itemValue) => {
                setCattleType(itemValue);
                if (itemValue !== 'Other') {
                  setManualCattleType('');
                }
              }}
              style={tw`border border-gray-300 mb-4 rounded`}>
              <Picker.Item label="Cow" value="Cow" />
              <Picker.Item label="Buffalo" value="Buffalo" />
              <Picker.Item label="Bull" value="Bull" />
              <Picker.Item label="Sheep" value="Sheep" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            {cattleType === 'Other' && (
              <TextInput
                style={tw`border border-gray-300 p-2 mb-4 rounded`}
                placeholder="Enter custom cattle type"
                value={manualCattleType}
                onChangeText={setManualCattleType}
              />
            )}
          </>
        ) : (
          <TextInput
            style={tw`border border-gray-300 p-2 mb-4 rounded`}
            placeholder="Enter farm name"
            value={resourceName}
            onChangeText={setResourceName}
          />
        )}

        {/* Conditional Inputs for Farm Land */}
        {selectedResourceType === 'Farm Land' && (
          <>
            <Text style={tw`mb-1 font-bold`}>Enter Crop Name:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded`}
              placeholder="Enter crop name"
              value={cropName}
              onChangeText={setCropName}
            />

            <Text style={tw`mb-1 font-bold`}>Enter Farm Size (in Hectares):</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-4 rounded`}
              placeholder="Enter farm size"
              value={resourceSize}
              onChangeText={setResourceSize}
              keyboardType="numeric"
            />
          </>
        )}

        {/* Resource Description */}
        <Text style={tw`mb-1 font-bold`}>Enter Resource Description:</Text>
        <TextInput
          style={tw`border border-gray-300 p-2 mb-4 rounded`}
          placeholder="Enter resource description"
          value={resourceDescription}
          onChangeText={setResourceDescription}
          multiline
          numberOfLines={4}
        />

        {/* Start Date */}
        <Text style={tw`mb-1 font-bold`}>Enter Start Date:</Text>
        <TouchableOpacity
          style={tw`border border-gray-300 p-3 rounded mb-4`}
          onPress={() => setShowDatePicker(true)}>
          <Text style={tw`text-gray-600`}>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Save and Cancel Buttons */}
        <View style={tw`flex-row justify-around mt-4`}>
          <TouchableOpacity
            style={tw`border border-green-500 bg-white py-2 px-4 rounded-full`}
            onPress={handleSave}>
            <Text style={tw`text-black font-bold`}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`border border-red-500 bg-white py-2 px-4 rounded-full`}
            onPress={() => navigation.navigate('Home')}>
            <Text style={tw`text-black font-bold`}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Popup for displaying messages */}
        <Popup
          visible={popupVisible}
          message={popupMessage}
          onClose={() => {
            setPopupVisible(false);
            if (popupMessage === 'Details saved successfully!') {
              navigation.navigate('Home');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AddForm;







