import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { imageAssets } from '../../constant/Option';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';   

import Button from "../../components/Shared/Button.jsx";

export default function Intro({ course }) {
    const navigation = useNavigation();

    return ( 
        <View>
            {/* Back Button */}
            <Pressable 
                style={{
                    position: "absolute",
                    top: 45,
                    left: 15,
                    zIndex: 20,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    borderRadius: 50,
                    padding: 6,
                }}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </Pressable>
            
            {/* Banner Image */}
            <Image 
                source={imageAssets[course?.banner_image] || imageAssets["/banner2.png"]}
                style={{ width: '100%', height: 300, borderRadius: 10 }}
            />
            
            {/* Title, Chapters */}
            <View 
    style={{
        padding: 15,
        marginHorizontal: 15,
        marginTop: -20,     // slight overlap onto image for style (optional)
        backgroundColor: "#fff",
        borderRadius: 12,   // ✅ Rounded corners
        elevation: 4,       // Android shadow
        shadowColor: "#000", 
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    }}
>

                <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginTop: 10 }}>
                    {course?.courseTitle}
                </Text>

                <Text style={{ fontFamily: 'outfit', fontSize: 18, marginTop: 3 }}>
                    {course?.chapters?.length} Chapters
                </Text>

                {/* Book Icon */}
                <Entypo 
                    name="open-book" 
                    size={26} 
                    color="black" 
                    style={{ position: "absolute", right: 10, bottom: 12 }}
                />
            </View>
            
            {/* Description */}
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                paddingLeft: 15,
                marginTop: 10
            }}>
                Description
            </Text>
            
            <View style={{ padding: 15 }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#969292ff'
                }}>
                    {course?.description}
                </Text>

                <Button 
                    text={"Start Now"} 
                    onPress={() => console.log('Start course button pressed')}
                />
            </View>
        </View>
    );
}
