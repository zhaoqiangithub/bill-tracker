import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useAccountStore } from '@/store/useAccountStore';
import AccountItem from '@/components/AccountItem';
import { formatCurrency } from '@/utils/format';
import { useRouter } from 'expo-router';

export default function WalletScreen() {
  const router = useRouter();
  const refresh = useAccountStore((s) => s.refresh);
  const accounts = useAccountStore((s) => s.accounts);
  const total = useAccountStore((s) => s.total());

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-semibold">Wallet</Text>
        <Pressable
          className="rounded-full bg-sky-500 px-3 py-2"
          onPress={() => router.push('/(modals)/add-account')}>
          <Text className="text-white">Add Account</Text>
        </Pressable>
      </View>
      <View className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-4 mb-4">
        <Text className="text-sm text-gray-500">Total Balance</Text>
        <Text className="text-2xl font-semibold">{formatCurrency(total)}</Text>
      </View>
      {accounts.map((a) => (
        <AccountItem key={a.id} item={a} />
      ))}
      {accounts.length === 0 && <Text className="text-gray-500">No accounts. Create one to start.</Text>}
    </ScrollView>
  );
}

