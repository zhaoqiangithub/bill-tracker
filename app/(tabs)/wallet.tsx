import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { useAccountStore } from '@/store/useAccountStore';
import AccountItem from '@/components/AccountItem';
import { formatCurrency } from '@/utils/format';

export default function WalletScreen() {
  const router = useRouter();
  const refresh = useAccountStore((s) => s.refresh);
  const accounts = useAccountStore((s) => s.accounts);
  const total = useAccountStore((s) => s.total());

  useEffect(() => {
    refresh();
  }, [refresh]);

  const goAddAccount = () => router.push('/(modals)/add-account');

  return (
    <View className="flex-1 bg-night-900">
      <ScrollView className="px-5 pt-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-semibold text-white">钱包</Text>
          <Pressable
            onPress={goAddAccount}
            className="flex-row items-center gap-2 rounded-3xl bg-neon px-4 py-2">
            <Plus color="#050607" size={18} />
            <Text className="font-semibold text-night-900">新账户</Text>
          </Pressable>
        </View>

        <View className="rounded-4xl border border-graphite bg-jungle-900 px-5 py-6">
          <Text className="text-sm text-mist">总余额</Text>
          <Text className="text-4xl font-bold text-white mt-2">{formatCurrency(total)}</Text>
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-white">我的账户</Text>
          <Pressable
            onPress={goAddAccount}
            className="h-10 w-10 items-center justify-center rounded-2xl border border-graphite bg-night-800">
            <Plus color="#9FE870" size={20} />
          </Pressable>
        </View>

        <View className="mt-4">
          {accounts.length === 0 ? (
            <View className="rounded-3xl border border-dashed border-graphite/60 bg-night-800 px-4 py-6">
              <Text className="text-center text-mist">暂无账户，点击右上角创建一个。</Text>
            </View>
          ) : (
            accounts.map((a) => <AccountItem key={a.id} item={a} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}
