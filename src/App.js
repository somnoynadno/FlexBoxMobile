import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RegisterScreen from './screens/RegisterScreen';
import RegisterOrLoginScreen from './screens/RegisterOrLoginScreen';
import LoginScreen from './screens/LoginScreen';
import JoinScreen from './screens/JoinScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createStackNavigator();

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="RegisterOrLogin" component={RegisterOrLoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Join" component={JoinScreen}/>
                    <Stack.Screen name="Game" component={GameScreen}/>
                    <Stack.Screen name="Result" component={ResultScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
