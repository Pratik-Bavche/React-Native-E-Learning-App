import { View, Text, Image, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
export default function QuestionAnswer() {
    const {courseParams}=useLocalSearchParams();
    const course=JSON.parse(courseParams);
    const qaList=course?.qa 
    const [selectedQuestion,setSelectedQuestion]=useState()


    const OnQuestionSelect=(index)=>{
        if(selectedQuestion==index)
        {
            setSelectedQuestion(null)
        }
        else
        {
            setSelectedQuestion(index)
        }
    }
  return (
    <View>
      <Image source={require('./../../assets/images/wave.png')}/>
      <View style={{
        position:'absolute',
        width:'100%',
        padding:20,
        marginTop:35
      }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:7,
            alignItems:'center'
        }}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
             <Text style={{
            fontFamily:'outfit-bold',
            fontSize:28,
            color:Colors.WHITE
        }}>Question & Answers</Text>
        </View>
       
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            color:Colors.WHITE
        }}>{course?.courseTitle}</Text>
      </View>
      <FlatList
            data={qaList}
            renderItem={({item,index})=>(
               <Pressable style={styles.card}
                onPress={()=>OnQuestionSelect(index)}
               >
                    <Text style={{
                        fontFamily:'outfit-bold',
                        fontSize:20
                    }}>{item?.question}</Text>
                    {selectedQuestion==index&&
                    <View style={{
                        borderTopWidth:0.4,
                        marginVertical:10,
                        marginBottom:10
                    }}>
                        <Text style={{
                            fontFamily:'outfit',
                            fontSize:18,
                            Colors:'green',
                            marginTop:10
                        }}>Answer:{item.answer}</Text>
                    </View>
                    }
               </Pressable> 
            )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        padding:20,
        backgroundColor:Colors.WHITE,
        marginTop:15,
        borderRadius:15,
        elevation:1
    },
     topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
})