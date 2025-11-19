import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Clock, Flame, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function RecipeCard({ recipe, variant = 'vertical' }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/recipe/${recipe._id}`);
  };

  if (variant === 'horizontal') {
    return (
      <TouchableOpacity 
        onPress={handlePress}
        className="flex-row bg-white rounded-2xl p-3 mb-4 shadow-sm border border-gray/10"
      >
        <Image 
          source={{ uri: recipe.image?.url || 'https://via.placeholder.com/150' }} 
          className="w-24 h-24 rounded-xl bg-gray-200"
        />
        <View className="flex-1 ml-4 justify-center">
          <Text className="text-dark font-bold text-lg mb-1" numberOfLines={1}>{recipe.title}</Text>
          <Text className="text-gray text-sm mb-2" numberOfLines={1}>By {recipe.creator?.username || 'Unknown'}</Text>
          
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center mr-3">
              <Clock size={14} color="#A0AEC0" />
              <Text className="text-gray text-xs ml-1">{recipe.cookingTime || 0} min</Text>
            </View>
            <View className="flex-row items-center">
              <Flame size={14} color="#FF6B6B" />
              <Text className="text-primary text-xs ml-1">{recipe.calories || 0} kcal</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={handlePress}
      className="w-64 bg-white rounded-3xl p-3 mr-4 shadow-sm border border-gray/10"
    >
      <View className="relative">
        <Image 
          source={{ uri: recipe.image?.url || 'https://via.placeholder.com/300' }} 
          className="w-full h-40 rounded-2xl bg-gray-200"
        />
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex-row items-center">
          <Star size={12} color="#FFD700" fill="#FFD700" />
          <Text className="text-xs font-bold ml-1">{recipe.averageRating?.toFixed(1) || 'New'}</Text>
        </View>
      </View>
      
      <View className="mt-3 px-1">
        <Text className="text-dark font-bold text-lg mb-1" numberOfLines={1}>{recipe.title}</Text>
        <Text className="text-gray text-sm mb-3" numberOfLines={1}>By {recipe.creator?.username || 'Unknown'}</Text>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Clock size={16} color="#A0AEC0" />
            <Text className="text-gray text-xs ml-1">{recipe.cookingTime || 0} min</Text>
          </View>
          <View className="flex-row items-center">
            <Flame size={16} color="#FF6B6B" />
            <Text className="text-primary text-xs ml-1">{recipe.calories || 0} kcal</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
