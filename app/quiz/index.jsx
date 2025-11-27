import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';
import Button from './../../components/Shared/Button';
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Quiz() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [result, setSelectedResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quiz = course?.quiz || [];
  const totalQuestions = quiz.length;

  const progress = totalQuestions ? (currentPage + 1) / totalQuestions : 0;

  const onOptionSelect = (choice) => {
    setSelectedOption(choice);
    setSelectedResult(prev => ({
      ...prev,
      [currentPage]: {
        userChoice: choice,
        isCorrect: quiz[currentPage]?.answer === choice,
        question: quiz[currentPage]?.question,
        answer: quiz[currentPage]?.answer,
      }
    }));
  };

  const onNext = async () => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedOption(undefined); // Reset selection for next question
    } else {
      await onQuizFinish();
    }
  };

  const onQuizFinish = async () => {
    setLoading(true);
    try {
      const docId = course?.docId || course?.id;
      if (!docId) throw new Error("Course document ID is missing.");

      // Ensure the latest selected option for the current page is included
      const finalResult = { ...result };
      if (selectedOption !== undefined) {
        finalResult[currentPage] = {
          userChoice: selectedOption,
          isCorrect: quiz[currentPage]?.answer === selectedOption,
          question: quiz[currentPage]?.question,
          answer: quiz[currentPage]?.answer,
        };
      }

      console.log("Saving quizResult to docId:", docId);
      console.log("Final quiz payload:", finalResult);

      // Use setDoc with merge: true to create the document if it does not exist
      await setDoc(doc(db, "courses", docId), {
        quizResult: finalResult
      }, { merge: true });

      setQuizCompleted(true);
      setTimeout(() => {
        try {
          // router.back();
        } catch (e) {
          console.log('Navigation back failed:', e);
        }
      }, 1500);
    } catch (error) {
      console.log("Error saving quiz result:", error);
      alert("Failed to save quiz result. Try again.");
    } finally {
      setLoading(false);
      router.replace({
        pathname:'/quiz/summery',
        params:{
          quizResultParam:JSON.stringify(result)
        }
      })
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BG_GRAY }}>
      {/* Header Image */}
      <Image source={require('./../../assets/images/wave.png')} style={{ width: "100%", height: 500 }} />

      {/* Header Overlay */}
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            backgroundColor: Colors.BG_GRAY,
            borderRadius: 50,
            padding: 8,
            elevation: 3
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontFamily: "outfit-bold", fontSize: 24, color: Colors.WHITE }}>
          {currentPage + 1} of {totalQuestions}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={{ marginTop: -400, alignItems: 'center' }}>
        <Progress.Bar progress={progress} width={Dimensions.get('window').width * 0.85} color='white' height={10} borderRadius={5} />
      </View>

      {/* Question Box */}
      <View style={{
        backgroundColor: Colors.WHITE,
        height: '65%',
        marginTop: 30,
        elevation: 3,
        borderRadius: 25,
        width: 350,
        padding: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'outfit-bold',
            textAlign: 'center',
            marginBottom: 25,
            color: Colors.BLACK
          }}>
            {quiz[currentPage]?.question || "No question available"}
          </Text>

          {quiz[currentPage]?.options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onOptionSelect(item)}
              style={{
                backgroundColor: selectedOption === item ? Colors.PRIMARY : Colors.WHITE,
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginVertical: 10,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: selectedOption === item ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                width: 300,
                alignItems: 'center',
                elevation: 2,
              }}
            >
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: selectedOption === item ? Colors.WHITE : Colors.BLACK,
                textAlign: 'center'
              }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Next / Finish Button */}
      {selectedOption && (
        <Button
          text={currentPage < totalQuestions - 1 ? "Next" : "Finish"}
          style={{ width: 350, alignSelf: 'center', marginTop: 20, borderRadius: 15 }}
          onPress={onNext}
        />
      )}

      {/* Loading Spinner */}
      {loading && (
        <View style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      )}

      {/* Quiz Completed Modal */}
      <Modal visible={quizCompleted} transparent animationType="fade">
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            width: 300,
            backgroundColor: Colors.WHITE,
            padding: 25,
            borderRadius: 20,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 22, fontFamily: 'outfit-bold', marginBottom: 15 }}>Quiz Completed!</Text>
            <Text style={{ fontSize: 18, fontFamily: 'outfit', marginBottom: 25 }}>You have completed all the questions.</Text>
            <Button text="Go Back" onPress={() => router.back()} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
