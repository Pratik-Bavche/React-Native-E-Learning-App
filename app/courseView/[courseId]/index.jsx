import { View, Text, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { imageAssets } from '../../../constant/Option.jsx';
import Intro from '../../../components/CourseView/Intro.jsx';
import Chapters from '../../../components/CourseView/Chapters.jsx';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase.jsx";

export default function CourseView() {
  const { courseParam, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!courseParam) {
      GetCourseById();
    } else {
      setCourse(JSON.parse(courseParam));
    }
  }, [courseId]);

  const GetCourseById = async () => {
    const snap = await getDoc(doc(db, 'courses', courseId));
    setCourse({ ...snap.data(), docId: courseId });
  };

  return course && (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
}
