import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import About from '../screens/About';
import Discover from '../screens/Discover';
import BookDetails from '../screens/BookDetails';
import ScanBarcode from '../screens/ScanBarcode';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="Home" component={Discover} />
      <Stack.Screen name="About" component={BookDetails} />
      <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};
