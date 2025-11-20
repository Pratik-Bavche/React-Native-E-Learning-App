import { View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constant/Colors.jsx'
import NoCourse from '../../components/Home/NoCourse.jsx'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase.jsx'
import { UserDetailContext } from '../../context/UserDetailContext.jsx'
import CourseList from '../../components/Home/CourseList.jsx'

export default function Home() {

  const [courseList, setCourseList] = React.useState([])
  const { userDetail, setUserDetail } = React.useContext(UserDetailContext)

  useEffect(() => {
    userDetail && getCourseList()
  }, [userDetail])

  const getCourseList = async () => {
    const q = query(collection(db, "courses"), where("createdBy", "==", userDetail?.email))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("----", doc.data())
      setCourseList(prev => [...prev, doc.data()])
    })
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: Platform.OS == 'ios' && 45,
      flex: 1,
      backgroundColor: Colors.WHITE
    }}>
      <Header />
      {courseList?.length===0 ? <NoCourse /> :<CourseList courseList={courseList} />}
    </View>
  )
}
