import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import BalanceCard from '@/components/BalanceCard';
import TransactionItem from '@/components/TransactionItem';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useAccountStore } from '@/store/useAccountStore';
import { useTransactionStore } from '@/store/useTransactionStore';

const placeholderEmail = 'test@test.com';

export default function HomeScreen() {
  const router = useRouter();
  const refreshAccounts = useAccountStore((s) => s.refresh);
  const total = useAccountStore((s) => s.total());
  const { refresh, items, totals } = useTransactionStore();
  const { income, expense } = totals();

  useEffect(() => {
    refreshAccounts();
    refresh();
  }, [refreshAccounts, refresh]);

  return (
    <View className="flex-1 bg-night-900">
      <ScrollView className="px-5 pt-6" contentContainerStyle={{ paddingBottom: 180 }}>
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-mist text-sm">你好，</Text>
            <Text className="text-2xl font-semibold text-white">{placeholderEmail}</Text>
          </View>
          <View className="flex-row gap-3">
            {[Search, Bell].map((Icon, idx) => (
              <Pressable
                key={idx}
                className="h-12 w-12 items-center justify-center rounded-2xl border border-graphite bg-night-800 active:bg-night-700">
                <Icon size={20} color="#F7FFF2" />
              </Pressable>
            ))}
          </View>
        </View>

        <BalanceCard total={total} income={income} expense={expense} />

        <View className="mt-8">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-white">最近账单</Text>
            <Pressable onPress={() => router.push('/(tabs)/statistics')}>
              <Text className="text-neon text-sm">查看全部</Text>
            </Pressable>
          </View>
          {items.length === 0 ? (
            <View className="rounded-3xl border border-dashed border-graphite/60 bg-night-800 px-4 py-6">
              <Text className="text-center text-mist">暂无账单，点击下方按钮快速记一笔。</Text>
            </View>
          ) : (
            items.slice(0, 8).map((t) => <TransactionItem key={t.id} item={t} />)
          )}
        </View>
      </ScrollView>

      <FloatingActionButton
        onAddExpense={() => router.push({ pathname: '/(modals)/add-transaction', params: { type: 'expense' } })}
        onAddIncome={() => router.push({ pathname: '/(modals)/add-transaction', params: { type: 'income' } })}
        onAddAccount={() => router.push('/(modals)/add-account')}
        onScanReceipt={() => router.push('/(modals)/add-transaction')}
      />
    </View>
  );
}
