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
      
      {/* Wave image (unchanged) */}
      <Image source={require('./../../assets/images/wave.png')} />

      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        
        {/* Back button styled */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
        </TouchableOpacity>

        <View style={{ marginLeft: 5 }}>
          <Text style={styles.headerTitle}>Question & Answers</Text>
          <Text style={styles.headerSubtitle}>{course?.courseTitle}</Text>
        </View>
      </View>

      {/* Q&A List */}
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: -100 }}>
        <FlatList
          data={qaList}
          showsVerticalScrollIndicator={false}
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
  headerContainer: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    marginTop: 40,
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
    fontSize: 28,
    color: Colors.WHITE,
  },

  headerSubtitle: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.WHITE,
  },

  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 1,
  },

  questionText: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },

  answerBox: {
    borderTopWidth: 0.4,
    marginVertical: 10,
    paddingTop: 10,
  },

  answerText: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: 'green',
  }
});
