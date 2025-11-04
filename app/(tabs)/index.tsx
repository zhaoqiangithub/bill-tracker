import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import BalanceCard from '@/components/BalanceCard';
import TransactionItem from '@/components/TransactionItem';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useAccountStore } from '@/store/useAccountStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { useRouter } from 'expo-router';

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
    <View className="flex-1 p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-semibold">Expenses</Text>
        </View>

        <BalanceCard total={total} income={income} expense={expense} />

        <View className="mt-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold">Recent</Text>
            <Pressable onPress={() => router.push('/(tabs)/statistics')}>
              <Text className="text-sky-600">See All</Text>
            </Pressable>
          </View>
          {items.length === 0 ? (
            <Text className="text-gray-500">No transactions yet.</Text>
          ) : (
            items.slice(0, 10).map((t) => <TransactionItem key={t.id} item={t} />)
          )}
        </View>
      </ScrollView>

      <FloatingActionButton
        onAddExpense={() => router.push({ pathname: '/(modals)/add-transaction', params: { type: 'expense' } })}
        onAddIncome={() => router.push({ pathname: '/(modals)/add-transaction', params: { type: 'income' } })}
        onAddAccount={() => router.push('/(modals)/add-account')}
      />
    </View>
  );
}
