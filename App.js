import React, {useEffect, useState} from "react";
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import UserContext from "./connection/userContext";
import AuthNavigation from "./navigation/AuthNavigation";
import {getData} from "./connection/AsyncStorage";

const Stack = createStackNavigator();

export default App = () => {
    console.disableYellowBox = true;
    const [loggedIn, setLoggedin] = useState(false);

    useEffect(() => {
        if (!loggedIn) {
            getData().then(r => {
                console.log("Storage to state in App.js")
                setLoggedin(r)
            })
        }
    })

    const value = {loggedIn, setLoggedin};

    console.log("App.js -> ", loggedIn)

    if (loggedIn) {
        return (
            <UserContext.Provider value={value}>
                <UserContext.Consumer>
                    {({loggedIn, setLoggedin}) => (
                        <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                            <NavigationContainer>
                                <Stack.Navigator>
                                    <Stack.Screen name="Root" component={BottomTabNavigator}/>
                                </Stack.Navigator>
                            </NavigationContainer>
                        </View>
                    )}
                </UserContext.Consumer>
            </UserContext.Provider>
        );
    } else {
        return (
            <UserContext.Provider value={value}>
                <UserContext.Consumer>
                    {({loggedIn, setLoggedin}) => (
                        <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                            <NavigationContainer>
                                <AuthNavigation/>
                            </NavigationContainer>
                        </View>
                    )}
                </UserContext.Consumer>
            </UserContext.Provider>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
