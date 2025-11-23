import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { imageAssets, PraticeOption } from '../../../constant/Option';
import Colors from '../../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PracticeTypeHome() {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  const option = PraticeOption.find(item => item.name == type);

  return (
    <View>
      <Image 
        source={option.image}
        style={{ height: 240, width: '100%' }}
      />

      {/* Overlay Section */}
      <View style={{
        position: 'absolute',
        top: 40,
        left: 15,
        right: 15,
        flexDirection: 'column',
        gap: 10
      }}>
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color={Colors.WHITE} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          color: Colors.WHITE
        }}>
          {type}
        </Text>
      </View>
    </View>
  );
}
