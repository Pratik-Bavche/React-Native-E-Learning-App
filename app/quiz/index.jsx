import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
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

  const quiz = course?.quiz || [];
  const totalQuestions = quiz.length;

  const onNext = () => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      alert('Quiz completed!');
      router.back();
    }
  };

  const progress = totalQuestions ? (currentPage + 1) / totalQuestions : 0;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BG_GRAY }}>
      
      {/* Header Image */}
      <Image 
        source={require('./../../assets/images/wave.png')} 
        style={{
          width: "100%",
          height: 500,
        }}
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

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 24,
            color: Colors.WHITE
          }}
        >
          {currentPage + 1} of {totalQuestions}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={{ marginTop:-400, alignItems:'center' }}>
          <Progress.Bar progress={progress} width={Dimensions.get('window').width*0.85} color='white' height={10} />
      </View>

      {/* Question Box */}
      <View style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          height: '70%',
          marginTop: 30,
          elevation: 1,
          borderRadius: 20,
          width: 350,
          justifyContent: 'center', 
          alignItems: 'center',    
          alignSelf: 'center'       
      }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 18, textAlign: 'center' }}>
          {quiz[currentPage]?.question || "No question available"}
        </Text>
      </View>

      {/* Next Button */}
      <Button 
        text={currentPage < totalQuestions - 1 ? "Next" : "Finish"}
        style={{ width: 350, alignSelf: 'center' }}
        onPress={onNext}
      />
    </View>
  );
}
