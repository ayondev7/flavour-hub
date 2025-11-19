import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { recipeRoutes } from '../../routes/recipeRoutes';
import RecipeCard from '../../components/RecipeCard';
import { useAuthStore } from '../../store/authStore';

export default function Search() {
  const [query, setQuery] = useState('');
  const { token } = useAuthStore();

  const { data: searchResults, isLoading, refetch } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return [];
      const response = await axios.get(`${recipeRoutes.search}?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (query.trim()) {
      refetch();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-light px-6 pt-4">
      <Text className="text-2xl font-bold text-dark mb-4">Search Recipes</Text>
      
      <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 border border-gray/20 mb-6">
        <SearchIcon color="#A0AEC0" size={20} />
        <TextInput
          className="flex-1 ml-3 text-dark text-base"
          placeholder="Search recipes, ingredients..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <X color="#A0AEC0" size={20} />
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FF6B6B" />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RecipeCard recipe={item} variant="horizontal" />}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-10">
              <Text className="text-gray text-base">
                {query ? 'No recipes found' : 'Start searching for delicious recipes!'}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
