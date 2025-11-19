import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import Button from '../../components/Shared/Button'

export default function AddCourse() {

    const [loading,setLoading]=useState(false);

    const onGenerateTopic=()=>{
       
    }

  return (
    <View style={{
        padding:25,
        backgroundColor:Colors.WHITE,
        flex:1
    }} >

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:20
        }}>Create New Course</Text>


        <Text style={{
        fontFamily:'outfit',
        fontSize:25,
        marginTop:10,
        }}>What you want to learn today?</Text>


        <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        marginTop:10,
        color:Colors.GRAY
        }}>Write what course you want to create (Ex. Learn React Js, Digital Marketting Guide, 10th Science Chapter)</Text>


        <TextInput style={{
            borderWidth:2,
            borderRadius:10,
            marginTop:20,
            padding:30,
            alignItems:'flex-start',
            fontSize:18
            }} 
            numberOfLines={3}
             multiline={true} 
             placeholder='Learn Java,Maths...etc.'/>


             <Button text={"Generate Topics" } type="fill" onPress={()=>onGenerateTopic()} loading={loading}/>
    </View>
  )
}