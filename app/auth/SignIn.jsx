import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Colors from "./../../constant/Colors.jsx"
import { useRouter } from "expo-router";
export default function SignIn() {
    const router=useRouter();
  return (
    <View 
    style={{flex:1,
      alignItems:'center',
      backgroundColor:Colors.WHITE,
      padding:20
    }}
    >

     <Image source={require('./../../assets/images/logo.png')} 
      style={{width:200, 
        height:200,
        borderRadius:190,
        marginTop:100,
        }}/>

        <Text 
        style={{fontSize:30,fontFamily:'outfit-bold',marginTop:30}}>Log In to Your Account</Text>
        <TextInput style={styles.textInput} placeholder='Enter Email'/>
        <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Enter Password'/>

        <TouchableOpacity style={{
          padding:15,
          backgroundColor:Colors.PRIMARY,
          width:'100%',
          marginTop:40,
          borderRadius:10,
          alignItems:'center',
          }}>
            <Text style={{fontFamily:'outfit',color:Colors.WHITE,fontSize:20}}>Log In</Text>
        </TouchableOpacity>

        <View style={{flexDirection:'row',marginTop:20,alignItems:'center',gap:5}}>
            <Text style={{fontFamily:'outfit'}}>Don't have an account?</Text>
            <Pressable onPress={()=>router.push('/auth/SignUp')}>
                <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-bold'}}>Create account here</Text>
            </Pressable>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    textInput:{
        width:"100%",
        borderWidth:1,
        padding:15,
        fontSize:18,
        borderRadius:10,
        marginTop:30,
        fontFamily:'outfit'
    }
})