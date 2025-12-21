import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function Header() {
  const router = useRouter();
  const { userDetail, setUserDetail } = React.useContext(UserDetailContext)
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 25,
          marginTop: 30,
          color: 'white'
        }}>Welcome {userDetail?.fullName}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Let's Get Started!</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="settings-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}