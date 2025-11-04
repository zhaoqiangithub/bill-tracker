import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-semibold mb-4">Profile</Text>
      <Text className="text-gray-500">Set up your profile and preferences.</Text>
    </View>
  );
}

