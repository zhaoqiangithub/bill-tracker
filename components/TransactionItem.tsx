import { View, Text } from 'react-native';
import React from 'react';
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
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-10" style={{ columnGap: 10 }}>
        <View className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
          {Icon ? <Icon size={18} /> : null}
        </View>
        <View>
          <Text className="text-base font-medium">{cat?.label ?? item.category}</Text>
          <Text className="text-xs text-gray-500">{formatDate(item.date)}</Text>
        </View>
      </View>
      <Text className={sign > 0 ? 'text-green-600 font-semibold' : 'text-rose-600 font-semibold'}>
        {sign < 0 ? '-' : '+'}
        {formatCurrency(Math.abs(item.amount), currency)}
      </Text>
    </View>
  );
}

