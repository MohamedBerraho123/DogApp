import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DogList from './screens/DogList';
import AddDog from './screens/AddDog';
import DogDetails from './screens/DogDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DogList" component={DogList} options={{ title: 'Dogs' }} />
        <Stack.Screen name="AddDog" component={AddDog} options={{ title: 'Add Dog' }} />
        <Stack.Screen name="DogDetails" component={DogDetails} options={{ title: 'Dog Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
