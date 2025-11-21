import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constant/Colors.jsx";
import { useRouter, useRootNavigationState } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase.jsx";
import { useEffect, useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext.jsx";
import { doc, getDoc } from "firebase/firestore";

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    // Wait for router to be ready
    if (!navigationState?.key) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data
        const result = await getDoc(doc(db, "users", user.uid));
        if (result.exists()) {
          setUserDetail(result.data());
        }

        // Navigate safely
        router.replace("/(tabs)/home");
      }
    });

    return unsubscribe;
  }, [navigationState]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require("./../assets/images/landing.png")}
        style={{
          width: "100%",
          height: 480,
          marginTop: 70,
          resizeMode: "contain",
        }}
      />

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome to Future Classes
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Your ideas, transformed into meaningful learning experiences.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/SignIn")}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.WHITE },
          ]}
          onPress={() => router.push("/auth/SignUp")}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 30,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
