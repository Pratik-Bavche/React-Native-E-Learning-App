import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { imageAssets } from '../../constant/Option';
import Intro from '../../components/CourseView/Intro';
import Chapters from '../../components/CourseView/Chapters';

export default function CourseView() {

  const { courseParam } = useLocalSearchParams();
  const course=JSON.parse(courseParam);
  console.log(courseParam)

  return (
    <FlatList
    data={[]}
    ListHeaderComponent={
    <View style={{flex:1,backgroundColor:'#ffffff'}}>
      <Intro course={course}/>
      <Chapters course={course}/> 
    </View>
    }/>
  )
}