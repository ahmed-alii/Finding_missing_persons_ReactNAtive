import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddChildScreen from "../screens/AddChildScreen";
import SearchChild from "../screens/SearchChild";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
    navigation.setOptions({headerTitle: getHeaderTitle(route)});

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-home"/>,
                }}
            />

            <BottomTab.Screen
                name="AddChild"
                component={AddChildScreen}
                options={{
                    title: 'Add Child',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-person-add"/>,
                }}
            />

            <BottomTab.Screen
                name="Search"
                component={SearchChild}
                options={{
                    title: 'Search Missing',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-search"/>,
                }}
            />

            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-settings"/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    switch (routeName) {
        case 'Home':
            return 'SLC Home';
        case 'Profile':
            return 'Profile';
        case 'AddChild':
            return 'Add Missing Child';
        case 'Search':
            return 'Search Missing Child';
    }
}
