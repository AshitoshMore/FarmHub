import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const SelectLocation = ({ onSave, onCancel }) => {
  const [region, setRegion] = useState(null); // Track map region
  const [loading, setLoading] = useState(true);
  const [debouncedRegion, setDebouncedRegion] = useState(null);
  const regionChangeTimeout = useRef(null); // Ref to store timeout ID

  useEffect(() => {
    // Request location permission and get the current location
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          onCancel(); // Cancel and close map if permission is denied
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.00005,
          longitudeDelta: 0.00005,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error getting location:', err);
        alert(
          'Error retrieving location. Make sure location services are enabled.'
        );
        onCancel();
      }
    };

    getLocation();
  }, [onCancel]);

  const handleRegionChangeComplete = (newRegion) => {
    // Clear previous timeout
    if (regionChangeTimeout.current) {
      clearTimeout(regionChangeTimeout.current);
    }

    // Set the new region with a debounce effect
    regionChangeTimeout.current = setTimeout(() => {
      setDebouncedRegion(newRegion); // Update debounced region
    }, 500); // Adjust the debounce time as necessary
  };

  const handleSave = () => {
    // Save the last debounced region
    if (debouncedRegion) {
      onSave(debouncedRegion);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={tw`mt-2 text-lg`}>Loading your location...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white rounded-lg p-4`}>
      <View
        style={tw`flex-1 rounded-lg overflow-hidden border border-gray-300`}>
        <MapView
          style={[
            tw`rounded-lg`, // Use Tailwind for rounded corners
            {
              width: Dimensions.get('window').width - 32, // Adjust width considering padding
              height: Dimensions.get('window').height * 0.6, // Adjust height
            },
          ]}
          region={region}
          onRegionChangeComplete={handleRegionChangeComplete} // Update region on map move
          showsUserLocation={true} // Show user's current location on the map
        />
        {/* Center Pin Icon */}
        <View style={tw`absolute top-1/2 left-1/2 -ml-6 -mt-6`}>
          <MaterialIcons name="location-pin" size={40} color="red" />
        </View>
      </View>
      {/* Display the current center coordinates */}
      <View style={tw`p-4 bg-gray-100 border-t font-bold border-gray-200`}>
        <Text style={tw`text-center text-sm text-gray-600 mt-1`}>
          Move the map to select your desired location.
        </Text>
        <Text style={tw`text-center text font-semibold`}>
          Selected Location:
        </Text>
        <Text style={tw`text-center text-md`}>
          Latitude: {debouncedRegion?.latitude?.toFixed(6)}
        </Text>
        <Text style={tw`text-center text-md`}>
          Longitude: {debouncedRegion?.longitude?.toFixed(6)}
        </Text>
      </View>
      {/* Action Buttons */}
      <View
        style={tw`flex-row justify-around mb-6 bg-gray-100 border-t border-gray-200 py-3`}>
        <TouchableOpacity
          onPress={handleSave} // Save the selected region
          style={tw`bg-green-500 py-3 rounded-xl w-1/3`}>
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Confirm Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCancel} // Cancel and close the map
          style={tw`bg-red-500 py-3 rounded-xl w-1/3`}>
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectLocation;
