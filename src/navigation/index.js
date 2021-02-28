import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            // mode="modal"
            // headerMode="none"
            // initialRouteName=""
            >
                <Stack.Screen
                // name="" 
                // component={} 
                // options={{gestureEnabled: false, title: ''}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;