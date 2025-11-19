import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

export default function Create() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light items-center justify-center">
      <Text className="text-2xl font-bold text-dark mb-4">Create Recipe</Text>
      <Text className="text-gray text-center px-10 mb-8">
        Share your culinary masterpiece with the world!
      </Text>
      
      <TouchableOpacity 
        className="bg-primary px-8 py-4 rounded-full shadow-lg shadow-primary/30"
        onPress={() => {
            alert("Create Recipe Feature Coming Soon!");
        }}
      >
        <Text className="text-white font-bold text-lg">Start Creating</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
