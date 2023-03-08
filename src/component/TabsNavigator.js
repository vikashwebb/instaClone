import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Home from '../screens/Home';
import AddPost from '../screens/AddPost';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
const TabNavigatior = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name == 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                } else if (route.name == 'AddPost') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                    header: null
                }else if(route.name == 'Profile' ){
                    iconName = focused ? 'happy' : 'happy-outline';
                }
                
                // You can return any component that you like here!
                return <Icon name={iconName} color={color} size={25} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#333',
            headerShown: false 

        })}
        
        > 
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name='AddPost' component={AddPost} />
            <Tab.Screen name='Profile' component={Profile}   />
        </Tab.Navigator>
    )
}
export default TabNavigatior
