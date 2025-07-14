import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, PetDetailScreen, AdoptionScreen, PaymentScreen, AdoptionSuccessScreen, LocationScreen} from '../screens';

export type RootStackParamList = {
  Home: undefined;
  PetDetail: {petId: string};
  Adoption: {petId: string};
  Payment: {petId: string; amount: number; petName: string};
  AdoptionSuccess: {petId: string; petName: string; amount: number};
  Location: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{title: 'Pet Adoption'}}
        />
        <Stack.Screen 
          name="PetDetail" 
          component={PetDetailScreen}
          options={{title: 'Pet Details'}}
        />
        <Stack.Screen 
          name="Adoption" 
          component={AdoptionScreen}
          options={{title: 'Adopt Pet'}}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{title: 'Payment'}}
        />
        <Stack.Screen 
          name="AdoptionSuccess" 
          component={AdoptionSuccessScreen}
          options={{title: 'Success', headerLeft: () => null}}
        />
        <Stack.Screen 
          name="Location" 
          component={LocationScreen}
          options={{title: 'Find Nearby Services'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
