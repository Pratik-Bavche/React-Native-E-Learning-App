import { useRootNavigationState, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constant/Colors.jsx";
import { UserDetailContext } from "../context/UserDetailContext.jsx";

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    // Wait for router to be ready
    if (!navigationState?.key) return;
  }, [navigationState?.key]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: '100%', maxWidth: 600, alignSelf: 'center', flex: 1 }}>

          {/* Top Section: Image */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
            <Image
              source={require("./../assets/images/landing.png")}
              style={{
                width: "100%",
                height: 320, // Increased height for better visibility
                resizeMode: "contain",
              }}
            />
          </View>

          {/* Bottom Section: Content Panel */}
          <View
            style={{
              padding: 25,
              backgroundColor: Colors.PRIMARY,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingBottom: 50, // Adequate padding for bottom safe area
              marginTop: 'auto' // Pushes this section to the bottom
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
                fontSize: 18, // Slightly reduced for better fit
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20, // Reduced margin
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
