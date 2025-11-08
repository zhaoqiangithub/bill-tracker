import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react-native';

import { formatCurrency } from '@/utils/format';

type Props = {
  total: number;
  income: number;
  expense: number;
  currency?: string;
};

function StatPill({
  label,
  amount,
  color,
  Icon,
  currency,
}: {
  label: string;
  amount: number;
  color: string;
  Icon: typeof ArrowUpCircle;
  currency: string;
}) {
  return (
    <View className="flex-1 rounded-3xl border border-graphite bg-jungle-900/80 px-4 py-3">
      <View className="flex-row items-center gap-2 mb-1">
        <Icon size={18} color={color} />
        <Text className="text-mist text-xs uppercase tracking-wider">{label}</Text>
      </View>
      <Text className="text-lg font-semibold text-white">{formatCurrency(amount, currency)}</Text>
    </View>
  );
}

export default function BalanceCard({ total, income, expense, currency = 'USD' }: Props) {
  return (
    <LinearGradient
      colors={['#191F1B', '#0C100E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 32 }}>
      <View className="rounded-4xl p-5">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-mist text-sm">Total Balance</Text>
            <Text className="text-4xl font-extrabold text-white mt-1">{formatCurrency(total, currency)}</Text>
          </View>
          <View className="rounded-2xl border border-graphite px-4 py-2 bg-black/20">
            <Text className="text-xs text-mist uppercase tracking-wider">This Month</Text>
            <Text className="text-lg font-semibold text-white">{formatCurrency(income - expense, currency)}</Text>
          </View>
        </View>
        <View className="flex-row gap-3">
          <StatPill label="Income" amount={income} color="#9FE870" Icon={ArrowUpCircle} currency={currency} />
          <StatPill label="Expense" amount={expense} color="#FB7185" Icon={ArrowDownCircle} currency={currency} />
        </View>
      </View>
    </LinearGradient>
  );
}
