import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors.jsx';
import Button from '../Shared/Button.jsx';
import { useRouter } from 'expo-router';
export default function NoCourse() {
  const router=useRouter();
  return (
    <View style={{ padding: 20, marginTop: 40,height:712}}>
      <Image 
        source={require('../../assets/images/noCourse.png')} 
        style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 30, resizeMode: 'contain' }}
      />

      <Text 
        style={{ 
          fontFamily: 'outfit-bold',
          fontSize: 22,
          textAlign: 'center',
          marginTop: 20 
        }}
      >
        You have not enrolled in any course yet
      </Text>

      <Button text={"Create New Course"} onPress={()=>router.push('addCourse')}/>
      <Button text={"Explore Existing Courses"} type='outline'/>
    </View>
  );
}
