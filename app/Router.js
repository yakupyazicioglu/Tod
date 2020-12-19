import React, {Component} from 'react';
import {Dimensions, Platform} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Books from './screens/Books';
import Home from './screens/Home';
import Discover from './screens/Discover';
import ScanBarcode from './screens/ScanBarcode';
import Shelves from './screens/Shelves';
import Profile from './screens/Profile';
import BookDetails from './views/BookDetails';
import ViewShelf from './views/ViewShelf';

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <AntDesign name="home" size={28} color={tintColor} />
      ),
    },
  },
  Shelves: {
    screen: Shelves,
    navigationOptions: {
      tabBarLabel: 'Shelves',
      tabBarIcon: ({tintColor}) => (
        <AntDesign name="bars" size={28} color={tintColor} />
      ),
    },
  },
  Discover: {
    screen: Discover,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({tintColor}) => (
        <AntDesign name="find" size={28} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <AntDesign name="user" size={28} color={tintColor} />
      ),
    },
  },
});

export const BookcaseStack = createStackNavigator({
  Books: {
    screen: Books,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  ViewBook: {
    screen: BookDetails,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  ViewShelf: {
    screen: ViewShelf,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  ScanBarcode: {
    screen: ScanBarcode,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Barcode Scan',
      gestureEnabled: false,
    }),
  },
});

export const stackNavigator = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
      gestureEnabled: false,
    }),
  },
  BookcaseStack: {
    screen: BookcaseStack,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
      gestureEnabled: false,
    }),
  },
});

export const CreateAppContainer = createAppContainer(stackNavigator);
