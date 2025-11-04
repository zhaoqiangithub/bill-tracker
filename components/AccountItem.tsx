import { View, Text } from 'react-native';
import React from 'react';
import type { Account } from '@/db/sqlite/schema';
import { Wallet } from 'lucide-react-native';
import { formatCurrency } from '@/utils/format';

type Props = {
  item: Account;
  currency?: string;
};

export default function AccountItem({ item, currency = 'USD' }: Props) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center gap-10" style={{ columnGap: 10 }}>
        <View className="rounded-full bg-sky-500/10 p-2">
          <Wallet size={18} />
        </View>
        <Text className="text-base">{item.name}</Text>
      </View>
      <Text className="font-semibold">{formatCurrency(item.balance, currency)}</Text>
    </View>
  );
}

