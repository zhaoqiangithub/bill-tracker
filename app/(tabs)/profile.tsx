import React from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { UserRound, Palette, Shield, LogOut, ChevronRight } from 'lucide-react-native';

const menu = [
  { key: 'edit', label: '编辑资料', Icon: UserRound },
  { key: 'theme', label: '界面设置', Icon: Palette },
  { key: 'privacy', label: '隐私政策', Icon: Shield },
  { key: 'logout', label: '退出', Icon: LogOut, danger: true },
];

export default function ProfileScreen() {
  const handlePress = (key: string) => {
    Alert.alert('提示', `功能“${key}”暂未实现`);
  };

  return (
    <View className="flex-1 bg-night-900">
      <ScrollView className="px-5 pt-6" contentContainerStyle={{ paddingBottom: 80 }}>
        <Text className="text-2xl font-semibold text-white mb-6">个人资料</Text>
        <View className="items-center rounded-4xl border border-graphite bg-jungle-900 px-5 py-8">
          <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-night-800 border border-graphite">
            <Text className="text-3xl font-bold text-white">T</Text>
          </View>
          <Text className="text-xl font-semibold text-white">test@test.com</Text>
          <Text className="text-mist mt-1">test@test.com</Text>
        </View>

        <View className="mt-8">
          {menu.map(({ key, label, Icon, danger }) => (
            <Pressable
              key={key}
              onPress={() => handlePress(label)}
              className="mb-3 flex-row items-center justify-between rounded-3xl border border-graphite bg-night-800 px-4 py-4">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-night-900">
                  <Icon size={20} color={danger ? '#FB7185' : '#9FE870'} />
                </View>
                <Text className={`text-base font-semibold ${danger ? 'text-rose-400' : 'text-white'}`}>
                  {label}
                </Text>
              </View>
              <ChevronRight size={18} color="#9AA5A0" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
