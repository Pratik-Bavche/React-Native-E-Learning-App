import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PraticeOption } from '../../../constant/Option';
import Colors from '../../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from './../../../config/firebase';
import { UserDetailContext } from '../../../context/UserDetailContext';
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid';

export default function PracticeTypeHome() {

  const { type } = useLocalSearchParams();
  const router = useRouter();

  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  const option = PraticeOption.find(item => item.name === type);
  const { userDetail } = useContext(UserDetailContext);

  useEffect(() => {
    if (userDetail) {
      GetCourseList();
    }
  }, [userDetail]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      setCourseList([]);

      const q = query(collection(db, "courses"),
        where('createdBy', '==', userDetail?.email)
      );

      const querySnapshot = await getDocs(q);
       console.log("DOC COUNT:", querySnapshot.size);

      querySnapshot.forEach((docSnap) => {
        setCourseList(prev => [...prev, { id: docSnap.id, ...docSnap.data() }]);
      });

    } catch (err) {
      console.log("Error fetching courses:", err);
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

      <Image 
        source={option?.image}
        style={{ height: 240, width: '100%' }}
      />

      <View style={{
        position: 'absolute',
        top: 40,
        left: 15,
        gap: 10
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color={Colors.WHITE} />
        </TouchableOpacity>

        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          color: Colors.WHITE
        }}>
          {type}
        </Text>
      </View>

      {loading && (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 150 }} />
      )}

      <CourseListGrid courseList={courseList} option={option} />

    </View>
  );
}
