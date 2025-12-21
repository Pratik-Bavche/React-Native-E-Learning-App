import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase.jsx";
import { UserDetailContext } from "../context/UserDetailContext.jsx";

export default function RootLayout() {

  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data
        const result = await getDoc(doc(db, "users", user.uid));
        if (result.exists()) {
          setUserDetail(result.data());
        }
      } else {
        setUserDetail(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </UserDetailContext.Provider>
  )
}
