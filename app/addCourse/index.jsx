import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import React, { useState, useContext } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { GenerateCourseAIModel, GenerateTopicsAIModel } from "../../config/AIModel";
import Prompt from "../../constant/Prompt";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../config/firebase";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useRouter } from "expo-router";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const onGenerateTopic = async () => {
    if (!userInput) return;
    try {
      setLoading(true);

      const PROMPT = userInput + " " + Prompt.IDEA;
      const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const textResponse = aiResp.response.text().trim();

      // Clean Markdown
      const cleaned = textResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let parsed = JSON.parse(cleaned);

      // Handle different array structures
      if (parsed.courseTitles) setTopics(parsed.courseTitles);
      else if (parsed.topics) setTopics(parsed.topics);
      else if (Array.isArray(parsed)) setTopics(parsed);
      else {
        // Fallback: look for the first array key
        const firstArray = Object.values(parsed).find(v => Array.isArray(v));
        if (firstArray) setTopics(firstArray);
        else throw new Error("JSON does not contain any list of topics");
      }

    } catch (err) {
      console.log("AI ERROR:", err.message);
      Alert.alert("Error", "Unable to generate topics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onTopicSelect = (topic) => {
    const isAlreadyExists = selectedTopic.find((t) => t === topic);
    if (isAlreadyExists) {
      const filteredTopics = selectedTopic.filter((t) => t !== topic);
      setSelectedTopic(filteredTopics);
    } else {
      setSelectedTopic([...selectedTopic, topic]);
    }
  };

  const isSelected = (topic) => {
    return selectedTopic.find((t) => t === topic);
  };

  const onGenerateCourse = async () => {
    try {
      setLoading(true);

      const topicsString = selectedTopic.join(", ");
      const PROMPT = topicsString + "\n\n" + Prompt.COURSE;

      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      let raw = aiResp.response.text();

      // --- ROBUST JSON CLEANING START ---
      // 1. Remove Markdown code blocks
      let cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

      // 2. Find specific start and end of JSON object to ignore intro/outro text
      const jsonStartIndex = cleaned.indexOf('{');
      const jsonEndIndex = cleaned.lastIndexOf('}');
      
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        cleaned = cleaned.substring(jsonStartIndex, jsonEndIndex + 1);
      }
      // --- ROBUST JSON CLEANING END ---

      let courseData = JSON.parse(cleaned);

      // Save to Firebase
      const customDocId = Date.now().toString();

      await setDoc(doc(db, "courses", customDocId), {
        ...courseData,
        topics: selectedTopic,
        createdBy: userDetail.email,
        createdAt: new Date(),
        docId: customDocId,
      });

      Alert.alert("Success", "Course saved successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);

    } catch (err) {
      console.log("COURSE GENERATION ERROR:", err.message);
      Alert.alert("Error", "Unable to generate course. The AI response was incomplete. Please try again with fewer topics.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={{ padding: 25, backgroundColor: Colors.WHITE, flex: 1 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30, marginTop: 20 }}>
        Create New Course
      </Text>

      <Text style={{ fontFamily: "outfit", fontSize: 25, marginTop: 10 }}>
        What do you want to learn today?
      </Text>

      <Text style={{ fontFamily: "outfit", fontSize: 20, marginTop: 10, color: Colors.GRAY }}>
        Write the topic for your new course (Example: Learn Java, React, etc.)
      </Text>

      <TextInput
        style={{
          borderWidth: 2,
          borderRadius: 10,
          marginTop: 20,
          padding: 25,
          fontSize: 18,
          borderColor: Colors.PRIMARY, // Added color for visibility
        }}
        numberOfLines={3}
        multiline={true}
        placeholder="Learn Java, Maths... etc."
        onChangeText={(val) => setUserInput(val)}
      />

      <Button
        text={"Generate Topics for Course"}
        type="fill"
        onPress={onGenerateTopic}
        loading={loading}
      />

      <ScrollView
        style={{ flex: 1, marginTop: 15 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {topics.length > 0 && (
          <View>
            <Text style={{ fontSize: 22, fontFamily: "outfit", width: "100%", marginBottom: 10 }}>
              Select all topics which you want to add in your course:
            </Text>

            {topics.map((item) => (
              <Pressable key={item} onPress={() => onTopicSelect(item)} style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "outfit",
                    borderWidth: 1,
                    borderRadius: 30,
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    alignSelf: "center",
                    backgroundColor: isSelected(item) ? Colors.PRIMARY : Colors.WHITE,
                    color: isSelected(item) ? Colors.WHITE : Colors.BLACK,
                    textAlign: "center",
                    overflow: 'hidden' // Fix for borderRadius on text
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {selectedTopic?.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 25,
            paddingBottom: 40,
            backgroundColor: Colors.WHITE,
            borderTopWidth: 1,
            borderTopColor: Colors.LIGHT_GRAY,
          }}
        >
          <Button
            text={"Create Course with Selected Topics"}
            onPress={onGenerateCourse}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
}