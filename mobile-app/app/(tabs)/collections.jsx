import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { collectionRoutes } from '../../routes/collectionRoutes';
import { useAuthStore } from '../../store/authStore';
import { Plus } from 'lucide-react-native';

export default function Collections() {
  const { user, token } = useAuthStore();

  const { data: collections, isLoading } = useQuery({
    queryKey: ['collections', user?._id],
    queryFn: async () => {
      const response = await axios.get(collectionRoutes.getCollections(user._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!user && !!token,
  });

  const renderCollection = ({ item }) => (
    <TouchableOpacity className="flex-1 m-2 bg-white rounded-2xl p-3 shadow-sm border border-gray/10 aspect-square justify-between">
       <View className="flex-row flex-wrap">
          <View className="w-full h-24 bg-gray-100 rounded-xl mb-2" />
       </View>
       <View>
         <Text className="text-dark font-bold text-lg" numberOfLines={1}>{item.name}</Text>
         <Text className="text-gray text-xs">{item.recipes?.length || 0} recipes</Text>
       </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-light px-4 pt-4">
      <View className="flex-row justify-between items-center mb-6 px-2">
        <Text className="text-2xl font-bold text-dark">My Collections</Text>
        <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm border border-gray/10">
          <Plus color="#2D3436" size={24} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text className="text-center text-gray mt-10">Loading collections...</Text>
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item) => item._id}
          renderItem={renderCollection}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-20">
              <Text className="text-gray">No collections yet.</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
