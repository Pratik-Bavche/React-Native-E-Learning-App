import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from "./../../constant/Colors.jsx"
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase.jsx';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext.jsx';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);

    if (!email || !password) {
      ToastAndroid.show("Please enter email & password", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await getUserDetails(res.user.uid);
        setLoading(false);
        router.replace('/');
      })
      .catch((error) => {
        setLoading(false);
        ToastAndroid.show("Error: " + error.message, ToastAndroid.LONG);
      });
  }

  const getUserDetails = async (uid) => {
    const result = await getDoc(doc(db, "users", uid));
    const data = result.data();
    setUserDetail(data);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.WHITE, padding: 20 }}>

      <Image 
        source={require('./../../assets/images/logo.png')} 
        style={{ width: 200, height: 200, borderRadius: 190, marginTop: 100 }}
      />

      <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', marginTop: 30 }}>
        Log In to Your Account
      </Text>

      <TextInput 
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder='Enter Email'
        keyboardType='email-address'
      />

      <TextInput 
        style={styles.textInput} 
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder='Enter Password'
      />

      <TouchableOpacity 
        disabled={loading}
        onPress={onSignInClick} 
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          marginTop: 40,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        {!loading 
          ? <Text style={{ fontFamily:'outfit', color: Colors.WHITE, fontSize: 20 }}>Log In</Text>
          : <ActivityIndicator size="small" color={Colors.WHITE} />
        }
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 5 }}>
        <Text style={{ fontFamily:'outfit' }}>Don't have an account?</Text>
        <Pressable onPress={() => router.push('/auth/SignUp')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily:'outfit-bold' }}>
            Create account here
          </Text>
        </Pressable>
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
