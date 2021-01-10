// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import {MainStackNavigator} from './navigation/StackNavigator';

import Discover from './screens/Discover';
import BookDetails from './screens/BookDetails';
import ScanBarcode from './screens/ScanBarcode';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Discover">
        <Stack.Screen
          name="Discover"
          component={Discover}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScanBarcode"
          component={ScanBarcode}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
