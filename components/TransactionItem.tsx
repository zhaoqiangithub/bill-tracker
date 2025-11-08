import React from 'react';
import { View, Text } from 'react-native';
import type { Transaction } from '@/db/sqlite/schema';
import { Categories } from '@/utils/categories';
import { formatCurrency, formatDate } from '@/utils/format';

type Props = {
  item: Transaction;
  currency?: string;
};

export default function TransactionItem({ item, currency = 'USD' }: Props) {
  const cat = (Categories as any)[item.category] ?? undefined;
  const Icon = cat?.icon;
  const sign = item.type === 'income' ? 1 : -1;
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-3xl border border-graphite bg-jungle-900 px-4 py-3">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 rounded-2xl bg-night-800 items-center justify-center border border-graphite/50">
          {Icon ? <Icon size={20} color="#9FE870" /> : null}
        </View>
        <View>
          <Text className="text-base font-semibold text-white">{cat?.label ?? item.category}</Text>
          <Text className="text-xs text-mist">{formatDate(item.date)}</Text>
        </View>
      </View>
      <Text className={`text-lg font-semibold ${sign > 0 ? 'text-neon' : 'text-rose-400'}`}>
        {sign < 0 ? '-' : '+'}
        {formatCurrency(Math.abs(item.amount), currency)}
      </Text>
    </View>
  );
}
