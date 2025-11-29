import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { imageAssets } from '../../constant/Option';
import * as Progress from 'react-native-progress';

export default function CourseProgressCard({ courseList, title = "Progress" }) {

  const GetCompletedChapters = (course) => {
    const completed = course?.completedChapter?.length || 0;
    const total = course?.chapters?.length || 0;
    if (total === 0) return 0;
    return completed / total;
  };

  return (
    <View style={{ marginTop: 10 }}>
      {/* Optional Title: Only renders if a title string is provided */}
      {title && (
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}>
          {title}
        </Text>
      )}

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              margin: 5,
              backgroundColor: 'white',
              borderRadius: 15,
              width: 250,
            }}>
            
            {/* Top Section: Image and Text */}
            <View style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 10, // Using gap from original component for exact spacing
                alignItems: 'center' 
            }}>
              <Image
                source={imageAssets[item?.banner_image]}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              
              <View style={{ flexShrink: 1 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 15,
                    flexWrap: 'wrap',
                    width: 120,
                  }}>
                  {item?.courseTitle}
                </Text>
                <Text
                  style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    marginTop: 5,
                  }}>
                  {item?.chapters?.length} Chapter
                </Text>
              </View>
            </View>

            {/* Bottom Section: Progress Bar */}
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Progress.Bar 
                progress={GetCompletedChapters(item)} 
                width={230} 
              />
              <Text
                style={{
                  fontFamily: 'outfit',
                  fontSize: 14,
                  marginTop: 5,
                }}>
                {item?.completedChapter?.length || 0} out of {item?.chapters?.length} chapters
                completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}