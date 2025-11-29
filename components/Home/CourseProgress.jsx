import { View } from 'react-native'
import React from 'react'
import CourseProgressCard from '../../components/Shared/CourseProgressCard.jsx' // Ensure this path points to your new shared file

export default function CourseProgress({courseList}) {
  return (
    <View>
       <CourseProgressCard 
          courseList={courseList} 
          title="Progress" 
       />
    </View>
  )
}