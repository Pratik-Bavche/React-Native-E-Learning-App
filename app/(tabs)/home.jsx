import { View, Text, Platform, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constant/Colors.jsx'
import NoCourse from '../../components/Home/NoCourse.jsx'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase.jsx'
import { UserDetailContext } from '../../context/UserDetailContext.jsx'
import CourseList from '../../components/Home/CourseList.jsx'
import PracticeSection from '../../components/Home/PracticeSection.jsx' // <-- Correct
import CourseProgress from '../../components/Home/CourseProgress.jsx'

export default function Home() {

  const [courseList, setCourseList] = React.useState([])
  const { userDetail } = React.useContext(UserDetailContext)

  useEffect(() => {
    if (userDetail) getCourseList()
  }, [userDetail])

  const getCourseList = async () => {
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
  }

  return (
       <FlatList
        data={[]}
        ListHeaderComponent={
    <View style={{
      padding: 25,
      paddingTop: Platform.OS === 'ios' ? 45 : 25,
      flex: 1,
      backgroundColor: Colors.WHITE
    }}>
      <Header />
      
      {courseList.length === 0 ? (
        <NoCourse />
      ) : (
        <View>
        <CourseProgress courseList={courseList }/>
        <PracticeSection />
        <CourseList courseList={courseList} />
        </View>
      )}
    </View>}/>
  )
}
