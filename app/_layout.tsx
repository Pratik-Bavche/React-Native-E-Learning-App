import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase.jsx";
import { UserDetailContext } from "../context/UserDetailContext.jsx";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [userDetail, setUserDetail] = useState();
  const [loading, setLoading] = useState(true);

  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  // 1. Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const result = await getDoc(doc(db, "users", user.uid));
          if (result.exists()) {
            setUserDetail(result.data());
          }
        } catch (e) {
          console.log("Error fetching user data:", e);
        }
      } else {
        setUserDetail(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 2. Auth Guard / Navigation Protection
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments?.[0] === 'auth';
    const inTabsGroup = segments?.[0] === '(tabs)';

    // If logged in & trying to access Index or Auth pages -> Redirect to Home
    // segments.length === 0 means we are on the Root Index
    if (userDetail && (segments.length === 0 || inAuthGroup)) {
      try {
        router.replace('/(tabs)/home');
      } catch (e) { console.log(e) }
    }

    // If NOT logged in & trying to access tabs -> Redirect to Login
    else if (!userDetail && inTabsGroup) {
      try {
        router.replace('/auth/SignIn');
      } catch (e) { console.log(e) }
    }

  }, [userDetail, segments, loading]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </UserDetailContext.Provider>
  )
}
