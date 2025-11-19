import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'

export default function Button({text,type="fill",onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={{
      padding:15,
      width:'100%',
     borderRadius:15,
     marginTop:15,
     borderWidth:type=='outline'?1:0,
     borderColor:Colors.PRIMARY,
     backgroundColor:type=='fill'?Colors.PRIMARY:Colors.WHITE,
     }}>
      <Text style={{
        textAlign:'center',
        fontFamily:'outfit-bold',
        fontSize:18,
        color:type=='fill'?Colors.WHITE:Colors.PRIMARY
      }}>{text}</Text>
    </TouchableOpacity>
  )
}