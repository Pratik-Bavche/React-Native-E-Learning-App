import { Image, TouchableOpacity, View, FlatList, Text } from 'react-native'
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
  const router=useRouter();
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
    <View>
      <Image source={require('./../../assets/images/wave.png')} />
      
      <View
        style={{
          width: '100%',
          position: 'absolute',
          padding: 20,
          marginTop:20
        }}
      >

        
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:30,
          color:Colors.WHITE
        }}>Course Progress</Text>
        <FlatList
          data={courseList}
          onRefresh={()=>getCourseList()}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
                router.push({
                  pathname: `/courseView/${item.docId}`,
                  params: { courseParam: JSON.stringify(item) }
                })
              }>
              <CourseProgressCard courseList={[item]} width='88%'/>
            </TouchableOpacity>
          )}
        />

      </View>
    </View>
  )
}
