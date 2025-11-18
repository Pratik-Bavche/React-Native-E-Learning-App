import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Colors from "./../../constant/Colors.jsx"
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db ,auth} from './../../config/firebase.jsx';
import { doc, setDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext.jsx';
export default function SignUp() {
    const router=useRouter();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {userDetail, setUserDetail}=useContext(UserDetailContext);

  const CraeteNewAccount=()=>{
    //logic for creating new account
    createUserWithEmailAndPassword(auth,email,password)
    .then(async(res)=>{
      const user=res.user;
      console.log("User created successfully:",user);
      //Save user info to database
      await SaveUser(user);
    })
    .catch((error)=>{
      console.log("Error creating user:",error.message);
    });
  }

 const SaveUser = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    fullName: fullName,
    email: email,
    member: false,
    createdAt: new Date(),
    uid: user.uid
  });

  setUserDetail({
    fullName,
    email,
    member: false,
    uid: user.uid
  });

  router.replace('/');
};


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
        style={{fontSize:30,fontFamily:'outfit-bold',marginTop:30}}>Create New Account</Text>

        <TextInput style={styles.textInput} onChangeText={(val)=>setFullName(val)} placeholder='Enter Full Name'/>
        <TextInput style={styles.textInput} onChangeText={(val)=>setEmail(val)} placeholder='Enter Email'/>
        <TextInput style={styles.textInput} onChangeText={(val)=>setPassword(val)} secureTextEntry={true} placeholder='Enter Password'/>

        <TouchableOpacity onPress={CraeteNewAccount} style={{
          padding:15,
          backgroundColor:Colors.PRIMARY,
          width:'100%',
          marginTop:40,
          borderRadius:10,
          alignItems:'center',
          }}>
            <Text style={{fontFamily:'outfit',color:Colors.WHITE,fontSize:20}}>Create Account</Text>
        </TouchableOpacity>

        <View style={{flexDirection:'row',marginTop:20,alignItems:'center',gap:5}}>
            <Text style={{fontFamily:'outfit'}}>Already have an account?</Text>
            <Pressable onPress={()=>router.push('/auth/SignIn')}>
                <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-bold'}}>Sign In here</Text>
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