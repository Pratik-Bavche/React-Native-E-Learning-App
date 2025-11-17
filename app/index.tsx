import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
     <Image source={require('./../assets/images/landing.png')}/> 
    </View>
  );
}
