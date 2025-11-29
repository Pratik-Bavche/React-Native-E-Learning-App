import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { CourseCategory } from '../../constant/Option'
import CourseListByCategory from '../../components/Explore/CourseListByCategory.jsx'

export default function Explore() {

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={{ padding: 25, paddingTop: 50, flex: 1 }}>
        
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginBottom: 10
        }}>Explore More Courses</Text>

        <FlatList
          data={CourseCategory}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View>
              {/* We removed the <Text>{item}</Text> from here.
                 The component below will now handle showing the Title 
                 ONLY if data exists.
              */}
              <CourseListByCategory category={item} />
            </View>
          )}
        />
      </View>
    </View>
  )
}