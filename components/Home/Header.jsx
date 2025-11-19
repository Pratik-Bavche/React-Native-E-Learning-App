import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { UserDetailContext } from '../../context/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
  const {userDetail,setUserDetail}=React.useContext(UserDetailContext)
  return (
    <View style={{flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    }}>
      <View>
        <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
        marginTop:30
      }}>Welcome {userDetail?.fullName}</Text>
      <Text style={{fontFamily:'outfit',fontSize:18}}>Let's Get Started!</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={30} color="black" />
        </TouchableOpacity>        
      </View>
    </View>
  )
}