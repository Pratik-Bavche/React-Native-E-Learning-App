import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option.jsx';
import Ionicons from '@expo/vector-icons/Ionicons.js';
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors.jsx';
export default function CourseList({ courseList }) {


const router = useRouter();

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }}>Courses</Text>
      <FlatList
        data={courseList}
        horizontal={true}
        renderItem={({ item,index }) => {
          const img = imageAssets[ item?.banner_image] || imageAssets["/banner2.png"]; 
          return (
            <TouchableOpacity onPress={()=>router.push({
              pathname:'/courseView',
              params:{courseParam:JSON.stringify(item)}
            })}
             key={index} style={styles.courseContainer}>
              <Image source={img} style={{ width: '100%', height: 200, borderRadius: 10 }}/>
              <Text style={{fontFamily:'outfit-bold',fontSize:18,marginTop:8}}>{item?.courseTitle}</Text>
              <Text style={{fontFamily:'outfit',fontSize:15,marginTop:3}}>{item?.chapters?.length} Chapters</Text>
              <Ionicons name="chevron-forward-circle" size={30} color={Colors.PRIMARY} style={{ position: 'absolute', bottom: 10, right: 10 }} /> 
            </TouchableOpacity>
          );
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  courseContainer:{
   padding:10,
   margin:5,
   backgroundColor:'#f2f2f2',
   width:300,
    borderRadius:10
  }
})
