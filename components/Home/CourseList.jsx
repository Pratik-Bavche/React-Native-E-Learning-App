import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option.jsx';
import Ionicons from '@expo/vector-icons/Ionicons.js';

export default function CourseList({ courseList }) {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }}>Courses</Text>



      <FlatList
        data={courseList}
        horizontal={true}


        renderItem={({ item,index }) => {
          const img = imageAssets[ item?.banner_image] || imageAssets["/banner2.png"]; 
          return (
            <View key={index} style={styles.courseContainer}>
              <Image source={img} style={{ width: '100%', height: 200, borderRadius: 10 }}/>
              <Text style={{fontFamily:'outfit-bold',fontSize:18,marginTop:8}}>{item?.courseTitle}</Text>
              <Text style={{fontFamily:'outfit',fontSize:15,marginTop:3}}>{item?.chapters?.length} Chapters</Text>
              <Ionicons name="chevron-forward-circle" size={30} color="#000" style={{ position: 'absolute', bottom: 10, right: 10 }} /> 
            </View>
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
