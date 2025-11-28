import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
export default function FlashCards() {
  const {courseParams}=useLocalSearchParams();
  const course=JSON.parse(courseParams)
  const flashcard=course?.FlashCards
  const [currentPage,setCurrentPage]=useState(0)
  const router = useRouter();
  const width=Dimensions.get('screen').width

  const totalQuestions = flashcard?.length || 0;
  const progress = totalQuestions ? (currentPage + 1) / totalQuestions : 0;

  const onMomentumScrollEnd = (e) => {
    const i = Math.round(e?.nativeEvent?.contentOffset.x / width);
    setCurrentPage(i);
  };

  function Card({ front, back }) {
    const [flipped, setFlipped] = useState(false);
    return (
      <TouchableOpacity activeOpacity={0.95} onPress={() => setFlipped(v => !v)}>
        <View style={[styles.FlipCard, flipped ? styles.backCard : styles.frontCard]}>
          {flipped ? (
            <Text style={styles.backText}>{back}</Text>
          ) : (
            <Text style={styles.frontText}>{front}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <Image source={require('./../../assets/images/wave.png')} style={styles.headerImage} />
      <View style={styles.headerOverlay}>
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

        <Text style={styles.headerCounter}>{currentPage + 1} of {totalQuestions}</Text>

        <View style={styles.progressWrapper}>
          <Progress.Bar progress={progress} width={Dimensions.get('window').width * 0.85} color='white' height={8} borderRadius={5} />
        </View>
      </View>

      {totalQuestions === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No flashcards available for this course.</Text>
        </View>
      ) : (
        <FlatList
          data={flashcard}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          keyExtractor={(item, idx) => (item.id ?? idx).toString()}
          contentContainerStyle={{ paddingVertical: 30 }}
          renderItem={({ item, index }) => (
            <View style={styles.cardWrapper}>
              <Card front={item?.front} back={item?.back} />
            </View>
          )}
        />
      )}

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
  ,
  pageContainer: { flex: 1, backgroundColor: Colors.BG_GRAY },
  headerImage: { width: '100%', height: 240, resizeMode: 'cover' },
  headerOverlay: { position: 'absolute', top: 20, left: 0, right: 0, padding: 20, alignItems: 'center' },
  headerCounter: { fontFamily: 'outfit-bold', fontSize: 20, color: Colors.WHITE },
  progressWrapper: { marginTop: 8 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16 },
  cardWrapper: { width: Dimensions.get('screen').width, alignItems: 'center' },
  frontText: { fontFamily: 'outfit-bold', fontSize: 24, paddingHorizontal: 18, textAlign: 'center' },
  backText: { fontFamily: 'outfit', fontSize: 20, color: Colors.WHITE, paddingHorizontal: 18, textAlign: 'center' }
})