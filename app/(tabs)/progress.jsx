import { Image, TouchableOpacity, View, FlatList, Text, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import CourseProgressCard from '../../components/Shared/CourseProgressCard'
import { UserDetailContext } from '../../context/UserDetailContext'

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase.jsx'
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function Progress() {
  const [courseList, setCourseList] = useState([])
  const { userDetail } = useContext(UserDetailContext)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (userDetail) getCourseList()
  }, [userDetail])

  const getCourseList = async () => {
    setLoading(true)

    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userDetail?.email)
    )

    const querySnapshot = await getDocs(q);

    let list = []
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    })

    setCourseList(list)
    setLoading(false)
  }

  return (
    <ScrollView 
      style={{ flex: 1 }} 
      contentContainerStyle={{ paddingBottom: 40,marginTop:20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{
        width: '100%',
        position: 'absolute',
        padding: 20,
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          color: Colors.BLACK,
          marginTop:10,
        }}>
          Course Progress
        </Text>
      </View>

      {/* Course List */}
  <View style={{ marginTop: 100, paddingHorizontal: 20 }}>
        <FlatList
          data={courseList}
          scrollEnabled={false}   // IMPORTANT
          onRefresh={() => getCourseList()}
          refreshing={loading}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/courseView/${item.docId}`,
                  params: { courseParam: JSON.stringify(item) }
                })
              }
            >
              <CourseProgressCard courseList={[item]} width='88%' />
            </TouchableOpacity>
          )}
        />
      </View>

    </ScrollView>
  )
}
