import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, View } from 'react-native'
import CourseList from '../../components/Home/CourseList.jsx'
import CourseProgress from '../../components/Home/CourseProgress.jsx'
import Header from '../../components/Home/Header'
import NoCourse from '../../components/Home/NoCourse.jsx'
import PracticeSection from '../../components/Home/PracticeSection.jsx'; // <-- Correct
import { db } from '../../config/firebase.jsx'
import Colors from '../../constant/Colors.jsx'
import { UserDetailContext } from '../../context/UserDetailContext.jsx'

export default function Home() {

  const [courseList, setCourseList] = React.useState([])
  const { userDetail } = React.useContext(UserDetailContext)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (userDetail) getCourseList()
  }, [userDetail])

  const getCourseList = async () => {
    setLoading(true)
    console.log("Fetching courses for user:", userDetail?.email);

    try {
      const q = query(
        collection(db, "courses"),
        where("createdBy", "==", userDetail?.email)
      )

      const querySnapshot = await getDocs(q);

      let list = []
      querySnapshot.forEach((doc) => {
        console.log("Found course:", doc.data());
        list.push(doc.data())
      })

      console.log("Total courses found:", list.length);
      setCourseList(list)
    } catch (e) {
      console.log("Error fetching courses:", e);
    }
    setLoading(false)
  }

  return (
    <FlatList
      data={[]}
      onRefresh={() => getCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View style={{
          flex: 1,
          backgroundColor: Colors.WHITE
        }}>
          <Image source={require('./../../assets/images/wave.png')} style={{ position: 'absolute', height: 500 }} />
          <View style={{
            padding: 25,
            paddingTop: Platform.OS === 'ios' ? 45 : 25,

          }}>
            <Header />

            {courseList.length === 0 ? (
              <NoCourse />
            ) : (
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>

      } />
  )
}
