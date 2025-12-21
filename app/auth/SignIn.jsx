import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../config/firebase.jsx';
import { UserDetailContext } from '../../context/UserDetailContext.jsx';
import Colors from "./../../constant/Colors.jsx";

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
        router.replace('/(tabs)/home');
      })
      .catch((error) => {
        setLoading(false);
        let msg = error.message;
        if (error.code == 'auth/invalid-credential') {
          msg = "Invalid email or password. Please check your credentials."
        }
        else if (error.code == 'auth/user-not-found') {
          msg = "User not found. Please sign up first."
        }
        else if (error.code == 'auth/wrong-password') {
          msg = "Incorrect password. Please try again."
        }
        else if (error.code == 'auth/invalid-email') {
          msg = "Invalid email format."
        }
        ToastAndroid.show(msg, ToastAndroid.LONG);
      });
  }

  const getUserDetails = async (uid) => {
    const result = await getDoc(doc(db, "users", uid));
    const data = result.data();
    setUserDetail(data);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: Colors.WHITE, padding: 20 }}>
      {/* Wrapper for Tablet/Desktop */}
      <View style={{ width: '100%', maxWidth: 500, alignItems: 'center' }}>

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
            ? <Text style={{ fontFamily: 'outfit', color: Colors.WHITE, fontSize: 20 }}>Log In</Text>
            : <ActivityIndicator size="small" color={Colors.WHITE} />
          }
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 5 }}>
          <Text style={{ fontFamily: 'outfit' }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/auth/SignUp')}>
            <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>
              Create account here
            </Text>
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
