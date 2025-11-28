import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FlipCard from 'react-native-flip-card'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
export default function FlashCards() {
  const {courseParams}=useLocalSearchParams();
  const course=JSON.parse(courseParams)
  const flashcard=course?.FlashCards
  const [currentPage,setCurrentPage]=useState(0)
  const width=Dimensions.get('screen').width

  const progress = totalQuestions ? (currentPage + 1) / totalQuestions : 0;
const onScroll=(e)=>{
const i=Math.round(e?.nativeEvent?.contentOffset.x/width)
console.log(index)
setCurrentPage(index)
}

  return (
    <View>
      <Image source={require('./../../assets/images/wave.png')} style={{ width: "100%", height: 500 }} />
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
          {currentPage + 1} of {flashcard?.length}
        </Text>
        <View style={{ marginTop: -400, alignItems: 'center' }}>
                <Progress.Bar progress={progress} width={Dimensions.get('window').width * 0.85} color='white' height={10} borderRadius={5} />
              </View>
        <FlatList
        data={flashcard}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({item,index})=>(
            <View style={{
              height:500,
              marginTop:60
            }}>
              <FlipCard style={styles.FlipCard}>
              {/* Face Side */}
              <View style={styles.frontCard}>
                <Text style={{
                  fontFamily:'outfit-bold',
                  fontSize:28
                }}>{item?.front}</Text>
              </View>
              {/* Back Side */}
              <View style={styles.backCard}>
                <Text style={{
                  width:Dimensions.get('screen').width*0.78,
                  padding:20,
                  fontFamily:'outfit',
                  fontSize:28,textAlign:'center',color:Colors.WHITE
                }}>{item?.back}</Text>
              </View>
            </FlipCard>
            </View>
        )}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  FlipCard:{
    width:Dimensions.get('screen').width*0.78,
    height:400,
    backgroundColor:Colors.WHITE,
    display:'flex',
    alignItems:'center',
    borderRadius:20,
    marginHorizontal:Dimensions.get('screen').width*0.05
  },
  frontCard:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    borderRadius:20
  },
   backCard:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    borderRadius:20,
    backgroundColor:Colors.PRIMARY
  }
})