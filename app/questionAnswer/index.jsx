import { View, Text, Image, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function QuestionAnswer() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const qaList = course?.qa;
  const [selectedQuestion, setSelectedQuestion] = useState();

  const OnQuestionSelect = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(index)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      
      {/* Wave image - Fixed width/height to ensure layout consistency */}
      <Image 
        source={require('./../../assets/images/wave.png')} 
        style={styles.fixedWave}
      />

      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        
        {/* Back button styled */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
        </TouchableOpacity>

        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.headerTitle}>Question & Answers</Text>
          <Text numberOfLines={1} style={styles.headerSubtitle}>{course?.courseTitle}</Text>
        </View>
      </View>

      {/* Q&A List */}
      {/* FIX: Reduced marginTop from 140 to 100 to pull list closer to title */}
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 150 }}>
        <FlatList
          data={qaList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }} // Adds space at bottom of scroll
          renderItem={({ item, index }) => (
            <Pressable style={styles.card} onPress={() => OnQuestionSelect(index)}>
              <Text style={styles.questionText}>{item?.question}</Text>

              {selectedQuestion === index && (
                <View style={styles.answerBox}>
                  <Text style={styles.answerText}>Answer: {item.answer}</Text>
                </View>
              )}
            </Pressable>
          )}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  fixedWave: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0, 
    right: 0,
    left: 0,
    resizeMode: 'cover'
  },

  headerContainer: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    marginTop: 35, // Slightly adjusted for StatusBar
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    backgroundColor: Colors.WHITE,
    padding: 8,
    borderRadius: 50,
    elevation: 3,
  },

  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 26, // Slightly smaller to fit better
    color: Colors.WHITE,
  },

  headerSubtitle: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.WHITE,
    opacity: 0.9
  },

  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 2, // Slightly increased shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  questionText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
  },

  answerBox: {
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0', // Lighter border color
    marginVertical: 5, // FIX: Reduced from 10 to 5
    paddingTop: 10,
    marginTop: 10,
  },

  answerText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GREEN || 'green', // Fallback color
    lineHeight: 22, // Better readability
  }
});