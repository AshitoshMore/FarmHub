import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Home from '../components/Home';
import Book from '../components/Records';
import Add from '../components/Create';
import Profile from '../components/Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing from @expo/vector-icons
import tw from 'twrnc';
import SafeLayout from '../components/SafeLayout';
const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'book', title: 'Book', icon: 'book' },
    { key: 'add', title: 'Add', icon: 'plus' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    book: Book,
    add: Add,
    profile: Profile,
  });

  const renderIcon = ({ route }) => (
    <MaterialCommunityIcons name={route.icon} size={24} color="black" />
  );

  return (
    <SafeLayout>
    <View style={tw`flex-1  bg-slate-100`}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header style={tw`bg-slate-100`}>
        <Appbar.Content style={tw` font-weight-bold`}  title="FarmHub"/>
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={tw`bg-white`}
        labeled={true}
        renderIcon={renderIcon}
      />
    </View>
    </SafeLayout>
  );
};

export default HomeScreen;





