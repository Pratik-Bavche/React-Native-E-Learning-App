import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Chapters({ course }) {
  const router = useRouter();

  const isChapterCompleted = (index) => {
    // FIX: Added ?. before find. 
    // This prevents the crash if completedChapter is null/undefined
    const isCompleted = course?.completedChapter?.find(item => item == index)
    return isCompleted ? true : false;
  }

  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}>
        Chapters
      </Text>

      <FlatList
        data={course?.chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (

          <TouchableOpacity onPress={() => {
            router.push({
              pathname: '/chapterView',
              params: {
                chapterParams: JSON.stringify(item),
                docId: course?.docId,
                chapterIndex: index
              }
            })
          }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f3f3f3",
              borderRadius: 10,
              marginBottom: 10
            }}
          >

            {/* Left side: number + name */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
              <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
                {index + 1}.
              </Text>

              <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
                {item.chapterName}
              </Text>
            </View>

            {/* Right side: Play button */}
            {isChapterCompleted(index) 
              ? <FontAwesome name="check-circle" size={24} color={Colors.GREEN} /> 
              : <AntDesign name="play-circle" size={24} color={Colors.PRIMARY} />
            }

          </TouchableOpacity>

        )}
      />
    </View>
  )
}