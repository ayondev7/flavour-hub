import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ChefCard({ chef }) {
  return (
    <TouchableOpacity className="items-center mr-5">
      <View className="p-1 rounded-full border-2 border-primary mb-2">
        <Image 
          source={{ uri: chef?.profilePicture?.url || 'https://via.placeholder.com/100' }} 
          className="w-16 h-16 rounded-full bg-gray-200"
        />
      </View>
      <Text className="text-dark font-medium text-sm">{chef?.username || 'Chef Name'}</Text>
    </TouchableOpacity>
  );
}
