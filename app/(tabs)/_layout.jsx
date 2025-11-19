import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false, 
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray"}}>
        <Tabs.Screen name="home" options={{tabBarLabel:'Home', tabBarIcon:({color,size})=><AntDesign name="home" size={24} color="#e18649ff" />}}/> 
        <Tabs.Screen name="explore" options={{tabBarLabel:'Explore',tabBarIcon:({color,size})=><FontAwesome6 name="wpexplorer" size={24} color="#e18649ff" />}}/>
        <Tabs.Screen name="progress" options={{tabBarLabel:'Progress',tabBarIcon:({color,size})=><MaterialCommunityIcons name="progress-clock" size={24} color="#e18649ff"/>}}/>
        <Tabs.Screen name="profile" options={{tabBarLabel:'Profile',tabBarIcon:({color,size})=><FontAwesome5 name="user-circle" size={24} color="#e18649ff" />}}/>
    </Tabs>
  )
}