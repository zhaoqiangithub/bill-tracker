import { View, Text } from 'react-native';
import React from 'react';
import { formatCurrency } from '@/utils/format';

type Props = {
  total: number;
  income: number;
  expense: number;
  currency?: string;
};

export default function BalanceCard({ total, income, expense, currency = 'USD' }: Props) {
  return (
    <View className="rounded-2xl bg-sky-400/10 dark:bg-sky-400/20 p-4 gap-2">
      <Text className="text-base text-gray-500 dark:text-gray-300">Total Balance</Text>
      <Text className="text-3xl font-semibold">{formatCurrency(total, currency)}</Text>
      <View className="flex-row justify-between mt-2">
        <View className="flex-1 mr-2 rounded-xl bg-green-500/10 p-3">
          <Text className="text-xs text-gray-500 dark:text-gray-300">Income</Text>
          <Text className="text-lg font-medium text-green-600 dark:text-green-400">
            {formatCurrency(income, currency)}
          </Text>
        </View>
        <View className="flex-1 ml-2 rounded-xl bg-rose-500/10 p-3">
          <Text className="text-xs text-gray-500 dark:text-gray-300">Expense</Text>
          <Text className="text-lg font-medium text-rose-600 dark:text-rose-400">
            {formatCurrency(expense, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
}

