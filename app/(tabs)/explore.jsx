import { useRouter } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import CourseListByCategory from '../../components/Explore/CourseListByCategory.jsx'
import Button from '../../components/Shared/Button'
import Colors from '../../constant/Colors'
import { CourseCategory } from '../../constant/Option'

export default function Explore() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={{ padding: 25, paddingTop: 50, flex: 1 }}>

        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginBottom: 10
        }}>Explore More Courses</Text>

        <Button
          text="Create New Course"
          onPress={() => router.push('/addCourse')}
          style={{ marginBottom: 20 }}
        />

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