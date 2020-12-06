import React, {Component} from 'react';
import {Dimensions, Platform} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'native-base';

import Books from './screens/Books';
import Home from './screens/Home';
import Discover from './screens/Discover';
import ScanBarcode from './screens/ScanBarcode';
import Shelves from './screens/Shelves';
import Profile from './screens/Profile';
import ViewBook from './views/ViewBook';
import ViewAuthor from './views/ViewAuthor';
import ViewShelf from './views/ViewShelf';

let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-home-sharp" size={28} color={tintColor} />
      ),
    },
  },
  Shelves: {
    screen: Shelves,
    navigationOptions: {
      tabBarLabel: 'Shelves',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-list-circle-outline" size={28} color={tintColor} />
      ),
    },
  },
  Discover: {
    screen: Discover,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-compass-outline" size={28} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor}) => (
        <Icon name="md-person" size={28} color={tintColor} />
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
    screen: ViewBook,
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
