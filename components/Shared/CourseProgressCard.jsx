import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import React from 'react';
import { imageAssets } from '../../constant/Option';
import * as Progress from 'react-native-progress';

// Get screen width for calculation
const screenWidth = Dimensions.get('window').width;

export default function CourseProgressCard({ courseList, title = "", width = 250 }) {

  // 1. Helper to normalize width (Handles '80%' string or 250 number)
  const getCardWidth = () => {
    if (typeof width === 'string' && width.includes('%')) {
        const percentage = parseFloat(width) / 100;
        return screenWidth * percentage;
    }
    return width;
  }

  const cardWidth = getCardWidth();
  const padding = 15;
  // 2. Calculate Progress Bar Width (Card Width - (PaddingLeft + PaddingRight))
  const progressBarWidth = cardWidth - (padding * 2);

  const GetCompletedChapters = (course) => {
    const completed = course?.completedChapter?.length || 0;
    const total = course?.chapters?.length || 0;
    if (total === 0) return 0;
    return completed / total;
  };

  return (
    <View style={{ marginTop: 10 }}>
      {title ? (
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}>
          {title}
        </Text>
      ) : null}

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: padding,
              margin: 5,
              backgroundColor: 'white',
              borderRadius: 15,
              width: cardWidth, // Apply calculated pixel width
            }}>
            
            {/* Top Section */}
            <View style={{ 
                flexDirection: 'row', 
                gap: 10, 
                alignItems: 'center' 
            }}>
              <Image
                source={imageAssets[item?.banner_image]}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              
              <View style={{ flex: 1 }}> 
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 15,
                    flexWrap: 'wrap',
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

            {/* Bottom Section */}
            <View style={{ marginTop: 10 }}>
              {/* 3. Apply exact calculated width so it never overflows */}
              <Progress.Bar 
                progress={GetCompletedChapters(item)} 
                width={progressBarWidth} 
                height={7}
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