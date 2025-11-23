import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function CourseListGrid({ courseList, option }) {
  return (
    <FlatList
      data={courseList}
      numColumns={2}
      contentContainerStyle={{ padding: 20 }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 15,
            backgroundColor: Colors.WHITE,
            margin: 7,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.LIGHT_GRAY,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 2,
            position: "relative"
          }}
        >

          {/* ✔ Checkmark Circle Icon */}
          <Ionicons
            name="checkmark-circle"
            size={26}
            color={Colors.PRIMARY}
            style={{
              position: "absolute",
              right: 8,
              top: 8
            }}
          />

          {/* Icon */}
          <Image
            source={option?.icon}
            style={{
              width: "100%",
              height: 80,
              resizeMode: 'contain'
            }}
          />

          {/* Title */}
          <Text
            style={{
              fontFamily: 'outfit',
              textAlign: 'center',
              marginTop: 7,
              fontSize: 15
            }}
          >
            {item.courseTitle}
          </Text>

        </View>
      )}
    />
  );
}
