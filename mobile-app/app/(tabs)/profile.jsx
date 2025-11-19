import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { Settings, LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="items-center pt-6 pb-8 bg-white rounded-b-[40px] shadow-sm mb-6">
          <View className="relative mb-4">
            <Image 
              source={{ uri: user?.profilePicture?.url || 'https://via.placeholder.com/150' }} 
              className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white shadow-sm"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-2 border-white">
              <Settings color="white" size={16} />
            </TouchableOpacity>
          </View>
          
          <Text className="text-2xl font-bold text-dark mb-1">{user?.username || 'User'}</Text>
          <Text className="text-gray text-base mb-6">{user?.email || 'email@example.com'}</Text>

          <View className="flex-row justify-center space-x-8 w-full px-10">
            <View className="items-center">
              <Text className="text-xl font-bold text-dark">{user?.recipes?.length || 0}</Text>
              <Text className="text-gray text-sm">Recipes</Text>
            </View>
            <View className="w-[1px] h-10 bg-gray/20" />
            <View className="items-center">
              <Text className="text-xl font-bold text-dark">{user?.followers?.length || 0}</Text>
              <Text className="text-gray text-sm">Followers</Text>
            </View>
            <View className="w-[1px] h-10 bg-gray/20" />
            <View className="items-center">
              <Text className="text-xl font-bold text-dark">{user?.following?.length || 0}</Text>
              <Text className="text-gray text-sm">Following</Text>
            </View>
          </View>
        </View>

        <View className="px-6 space-y-4">
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-dark font-medium text-base">Edit Profile</Text>
            <ChevronRight color="#A0AEC0" size={20} />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-dark font-medium text-base">My Recipes</Text>
            <ChevronRight color="#A0AEC0" size={20} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-dark font-medium text-base">Notifications</Text>
            <ChevronRight color="#A0AEC0" size={20} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm mt-4"
          >
            <Text className="text-red-500 font-medium text-base">Log Out</Text>
            <LogOut color="#EF4444" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
