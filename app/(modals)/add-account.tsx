import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useAccountStore } from '@/store/useAccountStore';
import { useRouter } from 'expo-router';

export default function AddAccountModal() {
  const router = useRouter();
  const add = useAccountStore((s) => s.add);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('0');

  const onSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Please enter a name');
      return;
    }
    const initial = parseFloat(balance || '0') || 0;
    await add({ name: name.trim(), balance: initial });
    router.back();
  };

  return (
    <View className="flex-1 p-4 gap-3 bg-white">
      <Text className="text-xl font-semibold mb-2">Add Account</Text>
      <Text className="text-sm">Account Name</Text>
      <TextInput
        placeholder="e.g. Cash, Bank, Card"
        value={name}
        onChangeText={setName}
        className="rounded-xl border border-gray-200 p-3"
      />
      <Text className="text-sm mt-2">Initial Balance</Text>
      <TextInput
        keyboardType="decimal-pad"
        value={balance}
        onChangeText={setBalance}
        className="rounded-xl border border-gray-200 p-3"
      />
      <Pressable onPress={onSubmit} className="mt-4 rounded-xl bg-sky-500 p-3">
        <Text className="text-center text-white font-semibold">Save</Text>
      </Pressable>
    </View>
  );
}

