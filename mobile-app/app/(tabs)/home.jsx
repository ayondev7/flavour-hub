import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { recipeRoutes } from '../../routes/recipeRoutes';
import { useAuthStore } from '../../store/authStore';
import { Bell, Search as SearchIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import RecipeCard from '../../components/RecipeCard';
import CategoryPill from '../../components/CategoryPill';
import ChefCard from '../../components/ChefCard';

export default function Home() {
  const { user, token } = useAuthStore();
  const router = useRouter();

  const { data: recipes, isLoading: recipesLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await axios.get(recipeRoutes.getAllRecipes, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token,
  });

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Drinks'];

  return (
    <SafeAreaView className="flex-1 bg-light">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex-row justify-between items-center px-6 py-4">
          <View>
            <Text className="text-gray text-base">Hello, {user?.username || 'Chef'}</Text>
            <Text className="text-dark text-2xl font-bold">What do you want to cook today?</Text>
          </View>
          <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm">
            <Bell color="#2D3436" size={24} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/search')}
          className="mx-6 mt-2 mb-6 bg-white flex-row items-center p-4 rounded-2xl shadow-sm border border-gray/10"
        >
          <SearchIcon color="#A0AEC0" size={20} />
          <Text className="text-gray ml-3">Search recipes, ingredients...</Text>
        </TouchableOpacity>

        <View className="mb-6">
          <Text className="text-dark text-lg font-bold px-6 mb-3">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
            {categories.map((category, index) => (
              <CategoryPill key={index} title={category} active={index === 0} />
            ))}
          </ScrollView>
        </View>

        <View className="mb-6">
          <View className="flex-row justify-between items-center px-6 mb-3">
            <Text className="text-dark text-lg font-bold">Trending Now</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          
          {recipesLoading ? (
            <Text className="px-6 text-gray">Loading recipes...</Text>
          ) : (
            <FlatList
              data={recipes?.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <RecipeCard recipe={item} />}
            />
          )}
        </View>

        <View className="mb-6">
          <Text className="text-dark text-lg font-bold px-6 mb-3">Top Chefs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
             {[1, 2, 3].map((i) => (
               <ChefCard key={i} />
             ))}
          </ScrollView>
        </View>

         <View className="px-6">
          <Text className="text-dark text-lg font-bold mb-3">Recent Recipes</Text>
          {recipesLoading ? (
             <Text className="text-gray">Loading...</Text>
          ) : (
            recipes?.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} variant="horizontal" />
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
