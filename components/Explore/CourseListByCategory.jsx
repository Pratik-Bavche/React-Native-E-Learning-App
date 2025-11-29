import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import CourseList from '../Home/CourseList'
import Colors from '../../constant/Colors' // Make sure to import Colors

export default function CourseListByCategory({ category }) {
    const [courseList, setCourseList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetCourseListByCategory()
    }, [category])

    const GetCourseListByCategory = async () => {
        setCourseList([])
        setLoading(true)
        try {
            const q = query(
                collection(db, 'courses'), 
                where('category', '==', category)
            )
            const querySnapshot = await getDocs(q)
            const list = []
            
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            
            setCourseList(list)
        } catch (e) {
            console.log("Error fetching explore courses:", e)
        }
        setLoading(false)
    }

    // CONDITION: If no courses, return null (renders nothing)
    if (courseList.length === 0) {
        return null;
    }

    return (
        <View style={{ marginTop: 15 }}>
            {/* Title is now rendered HERE, only if courses exist */}
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                marginBottom: 5,
                color: Colors.BLACK
            }}>
                {category}
            </Text>
            
            <CourseList courseList={courseList} />
        </View>
    )
}