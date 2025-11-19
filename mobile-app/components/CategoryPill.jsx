import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function CategoryPill({ title, active, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`px-5 py-2.5 rounded-full mr-3 ${active ? 'bg-primary' : 'bg-white border border-gray/10'}`}
    >
      <Text className={`font-medium ${active ? 'text-white' : 'text-gray'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
