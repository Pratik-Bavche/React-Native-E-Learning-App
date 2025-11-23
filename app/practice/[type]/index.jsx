import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { imageAssets, PraticeOption } from '../../../constant/Option';
import Colors from '../../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from './../../../config/firebase';
import { UserDetailContext } from '../../../context/UserDetailContext';

export default function PracticeTypeHome() {
  const { type } = useLocalSearchParams();
  const router = useRouter();

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

      const q = query(
        collection(db, 'Courses'),
        where('createdBy', '==', userDetail?.email)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

    } catch (err) {
      console.log("Error fetching courses:", err);
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

      {/* Background Image */}
      <Image 
        source={option?.image}
        style={{ height: 240, width: '100%' }}
        resizeMode="cover"
      />

      {/* Overlay Section */}
      <View style={{
        position: 'absolute',
        top: 40,
        left: 15,
        right: 15,
        flexDirection: 'column',
        gap: 10
      }}>
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color={Colors.WHITE} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          color: Colors.WHITE
        }}>
          {type}
        </Text>
      </View>

      {/* Loader */}
      {loading && (
        <ActivityIndicator 
          size="large" 
          color={Colors.PRIMARY} 
          style={{ marginTop: 150 }}
        />
      )}

    </View>
  );
}
