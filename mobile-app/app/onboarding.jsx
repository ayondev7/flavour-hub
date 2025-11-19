import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Discover Recipes',
    description: 'Find thousands of recipes from around the world to suit your taste.',
    image: require('../assets/images/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Cook Like a Chef',
    description: 'Follow step-by-step instructions and master your culinary skills.',
    image: require('../assets/images/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Share Your Creations',
    description: 'Join our community, share your own recipes, and get inspired.',
    image: require('../assets/images/onboarding3.png'),
  },
];

const PlaceholderImage = ({ color }) => (
  <View style={{ width: width * 0.8, height: width * 0.8, backgroundColor: color, borderRadius: 20, marginBottom: 40 }} />
);

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        router.replace('/(auth)/login');
      } catch (err) {
        console.log('Error @setItem: ', err);
      }
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <StatusBar style="dark" />
      
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View style={{ width, alignItems: 'center', padding: 20, paddingTop: 100 }}>
               <View className="w-full aspect-square bg-gray-100 rounded-3xl mb-10 items-center justify-center shadow-sm">
                  <Text className="text-6xl">🍳</Text>
               </View>
              
              <Text className="text-3xl font-bold text-dark text-center mb-4">
                {item.title}
              </Text>
              <Text className="text-base text-gray text-center px-4 leading-6">
                {item.description}
              </Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View className="flex-1 items-center justify-center w-full px-8">
        <View className="flex-row h-16">
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={{ width: dotWidth, opacity }}
                key={i.toString()}
                className="h-2.5 rounded-full bg-primary mx-1"
              />
            );
          })}
        </View>

        <TouchableOpacity
          onPress={scrollTo}
          className="bg-primary p-4 rounded-full w-full flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg mr-2">
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
