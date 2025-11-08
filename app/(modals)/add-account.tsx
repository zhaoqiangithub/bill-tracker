import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useAccountStore } from '@/store/useAccountStore';

export default function AddAccountModal() {
  const router = useRouter();
  const add = useAccountStore((s) => s.add);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('0');

  const onSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('请输入账户名称');
      return;
    }
    const initial = parseFloat(balance || '0') || 0;
    await add({ name: name.trim(), balance: initial });
    router.back();
  };

  return (
    <View className="flex-1 bg-night-900 px-5 pt-6">
      <Pressable onPress={() => router.back()} className="mb-4 h-12 w-12 items-center justify-center rounded-2xl bg-night-800">
        <ChevronLeft color="#F7FFF2" size={20} />
      </Pressable>
      <Text className="text-2xl font-semibold text-white mb-6">添加账户</Text>

      <Text className="text-sm text-mist">账户名称</Text>
      <TextInput
        placeholder="例如：现金、银行卡"
        placeholderTextColor="#55645B"
        value={name}
        onChangeText={setName}
        className="mt-2 rounded-3xl border border-graphite bg-night-800 px-4 py-3 text-white"
      />

      <Text className="mt-6 text-sm text-mist">初始余额</Text>
      <TextInput
        keyboardType="decimal-pad"
        value={balance}
        onChangeText={setBalance}
        placeholder="0"
        placeholderTextColor="#55645B"
        className="mt-2 rounded-3xl border border-graphite bg-night-800 px-4 py-3 text-white"
      />

      <Pressable onPress={onSubmit} className="mt-8 rounded-3xl bg-neon py-4">
        <Text className="text-center text-lg font-semibold text-night-900">保存</Text>
      </Pressable>
    </View>
  );
}
