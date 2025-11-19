import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { recipeRoutes } from '../../routes/recipeRoutes';
import { useAuthStore } from '../../store/authStore';
import { ArrowLeft, Heart, Clock, Flame, User, Share2, Bookmark } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { token } = useAuthStore();
  const [activeTab, setActiveTab] = useState('ingredients');

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const response = await axios.get(recipeRoutes.getRecipe(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!id && !!token,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="relative">
          <Image 
            source={{ uri: recipe.image?.url || 'https://via.placeholder.com/400' }} 
            style={{ width, height: 350 }}
            className="bg-gray-200"
          />
          <View className="absolute top-0 left-0 right-0 p-6 pt-12 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="bg-white/30 backdrop-blur-md p-2 rounded-full"
            >
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <View className="flex-row space-x-3">
               <TouchableOpacity className="bg-white/30 backdrop-blur-md p-2 rounded-full">
                <Share2 color="white" size={24} />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/30 backdrop-blur-md p-2 rounded-full">
                <Bookmark color="white" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="-mt-10 bg-white rounded-t-[40px] px-6 pt-8 min-h-screen">
          <View className="mb-6">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-3xl font-bold text-dark flex-1 mr-4">{recipe.title}</Text>
              <TouchableOpacity className="bg-red-50 p-2 rounded-full">
                <Heart color="#FF6B6B" size={24} fill={false ? "#FF6B6B" : "transparent"} />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row items-center mb-4">
              <Image 
                source={{ uri: recipe.creator?.profilePicture?.url || 'https://via.placeholder.com/50' }} 
                className="w-8 h-8 rounded-full bg-gray-200 mr-2"
              />
              <Text className="text-gray text-base">by </Text>
              <Text className="text-dark font-bold text-base">{recipe.creator?.username || 'Unknown Chef'}</Text>
            </View>

            <View className="flex-row justify-between bg-light p-4 rounded-2xl">
              <View className="flex-row items-center">
                <Clock color="#A0AEC0" size={20} />
                <Text className="text-dark font-bold ml-2">{recipe.cookingTime} min</Text>
              </View>
              <View className="w-[1px] h-full bg-gray/20" />
              <View className="flex-row items-center">
                <Flame color="#FF6B6B" size={20} />
                <Text className="text-dark font-bold ml-2">{recipe.calories} kcal</Text>
              </View>
              <View className="w-[1px] h-full bg-gray/20" />
              <View className="flex-row items-center">
                <User color="#A0AEC0" size={20} />
                <Text className="text-dark font-bold ml-2">{recipe.servings || 2} ppl</Text>
              </View>
            </View>
          </View>

          <Text className="text-gray leading-6 mb-6">
            {recipe.description}
          </Text>

          <View className="flex-row bg-light p-1 rounded-2xl mb-6">
            <TouchableOpacity 
              onPress={() => setActiveTab('ingredients')}
              className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'ingredients' ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`font-bold ${activeTab === 'ingredients' ? 'text-dark' : 'text-gray'}`}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveTab('instructions')}
              className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'instructions' ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`font-bold ${activeTab === 'instructions' ? 'text-dark' : 'text-gray'}`}>Instructions</Text>
            </TouchableOpacity>
          </View>

          <View>
            {activeTab === 'ingredients' ? (
              <View>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-dark">{recipe.ingredients?.length || 0} Items</Text>
                </View>
                {recipe.ingredients?.map((ingredient, index) => (
                  <View key={index} className="flex-row items-center bg-light p-4 rounded-2xl mb-3">
                    <View className="w-2 h-2 rounded-full bg-primary mr-4" />
                    <Text className="text-dark font-medium flex-1">{ingredient.name}</Text>
                    <Text className="text-gray">{ingredient.quantity} {ingredient.unit}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text className="text-lg font-bold text-dark mb-4">Steps</Text>
                {recipe.instructions?.map((instruction, index) => (
                  <View key={index} className="flex-row mb-6">
                    <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-4 mt-1">
                      <Text className="text-primary font-bold">{index + 1}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-dark leading-6">{instruction.step}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray/5">
        <TouchableOpacity className="bg-primary p-4 rounded-2xl items-center shadow-lg shadow-primary/30">
          <Text className="text-white font-bold text-lg">Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
