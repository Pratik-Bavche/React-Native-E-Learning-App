import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { imageAssets } from '../../constant/Option'
import Ionicons from '@expo/vector-icons/Ionicons'
import CourseList from '../Home/CourseList'

export default function CourseListByCategory({category}) {
    const [courseList,setCourseList]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        GetCourseListByCategory()
    },[category])

    const GetCourseListByCategory=async()=>{
        setCourseList([])
        setLoading(true)
        const q=query(collection(db,'Courses'),where('category','==',category),orderBy('createdOn','desc'))
        const querySnapshop=await getDocs(q)

        querySnapshop?.forEach((doc)=>{
            console.log(doc.data())
            setCourseList(prev=>[...prev,doc.data()])
        })
        setLoading(false)
    }
    

  return (
    <View>
      {CourseList?.length>0 && <CourseList courseList={courseList} heading={category}/>}
    </View>
  )
}

