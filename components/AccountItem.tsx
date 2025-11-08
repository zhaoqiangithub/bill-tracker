import React from 'react';
import { View, Text } from 'react-native';
import type { Account } from '@/db/sqlite/schema';
import { Wallet, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { formatCurrency } from '@/utils/format';

type Props = {
  item: Account;
  currency?: string;
};

export default function AccountItem({ item, currency = 'USD' }: Props) {
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-3xl border border-graphite bg-jungle-900 px-4 py-4">
      <View className="flex-row items-center gap-3">
        <LinearGradient
          colors={['#74D34A', '#9FE870']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 18 }}>
          <View className="h-12 w-12 items-center justify-center">
            <Wallet size={20} color="#0B0F0E" />
          </View>
        </LinearGradient>
        <View>
          <Text className="text-base font-semibold text-white">{item.name}</Text>
          <Text className="text-xs text-mist">余额</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Text className="text-lg font-semibold text-white">{formatCurrency(item.balance, currency)}</Text>
        <ChevronRight size={18} color="#9AA5A0" />
      </View>
    </View>
  );
}
