import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-[#171A1F] px-6">
      <Text className="text-5xl font-bold text-[#4F7CFF]">
        Rifast
      </Text>

      <Text className="mt-3 text-center text-base text-gray-300">
        Organiza tus rifas de forma rápida y sencilla.
      </Text>
      <Pressable
        onPress={() => router.navigate('/dashboard')}
        className="mt-8 rounded-2xl bg-[#4F7CFF] px-8 py-4"
      >
        <Text className="text-base font-bold text-white">
          Comenzar
        </Text>
      </Pressable>
      </View>
  );
}
