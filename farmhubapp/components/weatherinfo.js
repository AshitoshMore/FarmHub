// WeatherInfoCard.js
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importing Expo vector icons
import tw from 'twrnc';

// Mapping titles to respective icons and background colors
const iconMapping = {
  "Min Temp": { icon: "arrow-downward"},
  "Max Temp": { icon: "arrow-upward" },
  "Wind Speed": { icon: "air" },
  "Humidity": { icon: "water" },
};

const WeatherInfoCard = ({ title, value }) => {
  const { icon} = iconMapping[title] || {};

  return (
    <View style={tw`m-1 rounded-lg bg-white shadow border items-center p-2 border-solid border-1 border-gray-600`} >
      <View style={tw`flex-row items-center`}>
        {icon && <MaterialIcons name={icon} size={24} color="black" style={tw`mr-2`} />}
        <Text style={tw`text-black text-lg font-semibold`}>{title}</Text>
      </View>
      <Text style={tw`text-gray-900 text-xl font-bold`}>{value}</Text>
    </View>
  );
};

export default WeatherInfoCard;
