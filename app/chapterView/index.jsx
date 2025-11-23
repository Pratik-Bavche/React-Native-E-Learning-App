import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';
import Colors from '../../constant/Colors';
import Button from "../../components/Shared/Button.jsx";

// Firestore imports
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase.jsx";

export default function ChapterView() {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const router = useRouter();

  let chapters = null;
  try {
    chapters = JSON.parse(chapterParams);
  } catch (e) {
    console.warn("Invalid JSON for chapterParams:", chapterParams);
  }

  if (!chapters || !chapters.content) {
    return <Text style={{ padding: 20 }}>No chapter content.</Text>;
  }

  const [currentP, setCurrentP] = useState(0);
  const [loader, setLoader] = useState(false);

  const totalContent = chapters.content.length;

  const GetProgress = () => (currentP + 1) / totalContent;

  const handleNext = async () => {
    // Go to next topic if not last
    if (currentP < totalContent - 1) {
      setCurrentP(currentP + 1);
      return;
    }

    // LAST PAGE → update Firestore & redirect
    setLoader(true);

    try {
    const docRef = doc(db, "courses", docId);

    await updateDoc(docRef, {
      completedChapter: arrayUnion(Number(chapterIndex)),
    });

    router.replace(`/courseView/${docId}`);
  } catch (err) {
    console.log("Update error:", err);
  }


    setLoader(false);
  };

  return (
    <View style={{
      padding: 30,
      backgroundColor: Colors.WHITE,
      flex: 1,
      marginTop: 10
    }}>

      <Progress.Bar
        progress={GetProgress()}
        width={Dimensions.get('screen').width * 0.85}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 25
        }}>
          {chapters.content[currentP]?.topic}
        </Text>

        <Text style={{
          fontFamily: 'outfit',
          fontSize: 20,
          marginTop: 7
        }}>
          {chapters.content[currentP]?.explain}
        </Text>

        {chapters.content[currentP]?.code && (
          <Text style={[
            styles.codeExampleText,
            { color: Colors.WHITE, backgroundColor: Colors.BLACK }
          ]}>
            {chapters.content[currentP].code}
          </Text>
        )}

        {chapters.content[currentP]?.example && (
          <Text style={styles.codeExampleText}>
            {chapters.content[currentP].example}
          </Text>
        )}
      </View>

      <Button
        text={currentP === totalContent - 1 ? "Finish" : "Next"}
        onPress={handleNext}
        loading={loader}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: 'outfit',
    fontSize: 18,
    marginTop: 15
  }
});
