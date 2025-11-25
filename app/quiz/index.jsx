import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';
import Button from './../../components/Shared/Button';

export default function Quiz() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [result, setSelectedResult] = useState([]);

  const quiz = course?.quiz || [];
  const totalQuestions = quiz.length;

  const onNext = () => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedOption(undefined); // reset selection
    } else {
      alert('Quiz completed!');
      router.back();
    }
  };


  const progress = totalQuestions ? (currentPage + 1) / totalQuestions : 0;


    const onOptionSelect=(choice)=>{
      setSelectedResult(prev=>({
        ...prev,
        [currentPage]:{
          userChoice:choice,
          isCorrect:quiz[currentPage]?.answer===choice,
          question:quiz[currentPage]?.question,
          answer:quiz[currentPage]?.answer
        }
      }))
      console.log(result)
    }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BG_GRAY }}>
      {/* Header Image */}
      <Image 
        source={require('./../../assets/images/wave.png')} 
        style={{ width: "100%", height: 500 }}
      />

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

        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 24,
          color: Colors.WHITE
        }}>
          {currentPage + 1} of {totalQuestions}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={{ marginTop:-400, alignItems:'center' }}>
        <Progress.Bar 
          progress={progress} 
          width={Dimensions.get('window').width*0.85} 
          color='white' 
          height={10} 
          borderRadius={5}
        />
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
              onPress={() => {
                setSelectedOption(index); onOptionSelect(item)
              } }
              style={{
                backgroundColor: selectedOption === index ? Colors.PRIMARY : Colors.WHITE,
                paddingVertical: 15,
                paddingHorizontal: 25,
                marginVertical: 10,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: selectedOption === index ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                width: 300,
                alignItems: 'center',
                elevation: 2,
              }}
            >
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                color: selectedOption === index ? Colors.WHITE : Colors.BLACK,
                textAlign: 'center'
              }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Next / Finish Button */}
      {selectedOption !== undefined && (
        <Button
          text={currentPage < totalQuestions - 1 ? "Next" : "Finish"}
          style={{ width: 350, alignSelf: 'center', marginTop: 20, borderRadius: 15 }}
          onPress={onNext}
        />
      )}
    </View>
  );
}
