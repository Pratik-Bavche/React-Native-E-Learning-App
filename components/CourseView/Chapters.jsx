import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../constant/Colors';

export default function Chapters({ course }) {
  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}>
        Chapters
      </Text>

      <FlatList
        data={course?.chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (

          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",  // ✅ pushes play button to right
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
           <AntDesign name="play-circle" size={24} color={Colors.PRIMARY} />

          </View>

        )}
      />
    </View>
  )
}
