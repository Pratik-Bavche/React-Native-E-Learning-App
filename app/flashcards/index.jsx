import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

export default function FlashCards() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams || '{}');
  const demoFlashcards = [
    { id: 'demo-1', front: 'What is React Native?', back: 'A framework for building native apps using React.' },
    { id: 'demo-2', front: 'How do you create a component?', back: 'By writing a function that returns JSX or using a class extending React.Component.' },
    { id: 'demo-3', front: 'What is a hook?', back: 'A special function that lets you use React features (like state) in functional components.' }
  ];
  const flashcard = (course?.FlashCards && course.FlashCards.length > 0) ? course.FlashCards : demoFlashcards
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter();
  
  // Get Screen Dimensions
  const { width, height } = Dimensions.get('window');

  const totalQuestions = flashcard?.length || 0;
  const progress = totalQuestions ? (currentPage + 1) / totalQuestions : 0;

  const onMomentumScrollEnd = (e) => {
    const i = Math.round(e?.nativeEvent?.contentOffset.x / width);
    setCurrentPage(i);
  };

  function Card({ front, back }) {
    const [flipped, setFlipped] = useState(false);
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => setFlipped(v => !v)}>
        <View style={[styles.FlipCard, flipped ? styles.backCard : styles.frontCard]}>
          {flipped ? (
            <Text style={styles.backText}>{back}</Text>
          ) : (
            <Text style={styles.frontText}>{front}</Text>
          )}
          <Text style={[styles.hintText, { color: flipped ? Colors.WHITE : Colors.GRAY }]}>
            Tap to Flip
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.pageContainer}>
      
      {/* --- WAVE BACKGROUND IMAGE --- */}
      {/* Kept strict as requested, positioned absolute to sit behind content */}
  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: -1 }}>
  <Image source={require('./../../assets/images/wave.png')} style={{ width: '100%', height: 250 }} />
</View>



      {/* Header Overlay */}
      <View style={styles.headerContainer}>
        <View style={styles.topHeader}>
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
            </TouchableOpacity>
            <Text style={styles.headerCounter}>{currentPage + 1} of {totalQuestions}</Text>
        </View>
        
        <View style={styles.progressWrapper}>
          <Progress.Bar 
            progress={progress} 
            width={width * 0.85} 
            color={Colors.PRIMARY} 
            height={10} 
            borderRadius={5} 
            unfilledColor={Colors.WHITE}
            borderWidth={0}
          />
        </View>
      </View>

      {/* Main Card Area - Centered */}
      <View style={styles.listContainer}>
        {totalQuestions === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No flashcards available.</Text>
          </View>
        ) : (
          <FlatList
            data={flashcard}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
            keyExtractor={(item, idx) => (item.id ?? idx).toString()}
            // This centers the content
            contentContainerStyle={{ alignItems: 'center' }} 
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <Card front={item?.front} back={item?.back} />
              </View>
            )}
          />
        )}
      </View>
    </View>
  )
}

// Fixed dimensions for cleaner styling
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pageContainer: { 
    flex: 1, 
    backgroundColor: 'gray',
    position: 'relative'
  },
  
  // Style for the Wave Background
  waveBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    height: 450, // Adjust height if you want it to cover more/less
    resizeMode: 'cover',
    zIndex: -1 // Ensures it stays behind the card
  },

  headerContainer: {
    padding: 25,
    paddingTop: 50,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  headerCounter: { 
    fontFamily: 'outfit-bold', 
    fontSize: 18, 
    color: Colors.WHITE // Assuming wave background is dark/primary
  },
  progressWrapper: { 
    alignItems: 'center',
    marginTop: 10 
  },

  listContainer: {
    flex: 1,
    justifyContent: 'center', // Vertically centers the list
    alignItems: 'center',
  },
  cardWrapper: {
    width: width, // Full width to ensure paging works correctly
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // CARD STYLES
  FlipCard: {
    width: width * 0.85,
    height: height * 0.6, // Fixed height (60% of screen)
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    
    // Centering content inside card
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    // Shadows
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 20
  },
  frontCard: {
    backgroundColor: Colors.WHITE,
  },
  backCard: {
    backgroundColor: Colors.PRIMARY || '#444', 
  },
  frontText: { 
    fontFamily: 'outfit-bold', 
    fontSize: 26, 
    textAlign: 'center',
    lineHeight: 34
  },
  backText: { 
    fontFamily: 'outfit', 
    fontSize: 24, 
    color: Colors.WHITE, 
    textAlign: 'center',
    lineHeight: 32
  },
  hintText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    fontFamily: 'outfit',
    opacity: 0.7
  },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16 },
})