import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext.jsx';
import { auth, db } from './../../config/firebase.jsx';
import Colors from "./../../constant/Colors.jsx";
export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const CraeteNewAccount = () => {
    //logic for creating new account
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        console.log("User created successfully:", user);
        //Save user info to database
        await SaveUser(user);
      })
      .catch((error) => {
        let msg = error.message;
        if (error.code === 'auth/email-already-in-use') {
          msg = "This email is already in use. Please sign in.";
        } else if (error.code === 'auth/invalid-email') {
          msg = "Invalid email format.";
        } else if (error.code === 'auth/weak-password') {
          msg = "Password should be at least 6 characters.";
        }

        ToastAndroid.show(msg, ToastAndroid.LONG);
        console.log("Error creating user:", error.message);
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

    router.replace('/(tabs)/home');
  };


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 20
      }}
    >
      {/* Wrapper for Tablet/Desktop */}
      <View style={{ width: '100%', maxWidth: 500, alignItems: 'center' }}>

        <Image source={require('./../../assets/images/logo.png')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 190,
            marginTop: 100,
          }} />

        <Text
          style={{ fontSize: 30, fontFamily: 'outfit-bold', marginTop: 30 }}>Create New Account</Text>

        <TextInput style={styles.textInput} onChangeText={(val) => setFullName(val)} placeholder='Enter Full Name' />
        <TextInput style={styles.textInput} onChangeText={(val) => setEmail(val)} placeholder='Enter Email' />
        <TextInput style={styles.textInput} onChangeText={(val) => setPassword(val)} secureTextEntry={true} placeholder='Enter Password' />

        <TouchableOpacity onPress={CraeteNewAccount} style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          marginTop: 40,
          borderRadius: 10,
          alignItems: 'center',
        }}>
          <Text style={{ fontFamily: 'outfit', color: Colors.WHITE, fontSize: 20 }}>Create Account</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 5 }}>
          <Text style={{ fontFamily: 'outfit' }}>Already have an account?</Text>
          <Pressable onPress={() => router.push('/auth/SignIn')}>
            <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>Sign In here</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderWidth: 1,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 30,
    fontFamily: 'outfit'
  }
})