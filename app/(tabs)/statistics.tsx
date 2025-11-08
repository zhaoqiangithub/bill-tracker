import React, { useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { useTransactionStore, type Period } from '@/store/useTransactionStore';
import TransactionItem from '@/components/TransactionItem';

const tabs: { key: Period; label: string }[] = [
  { key: 'week', label: '每周' },
  { key: 'month', label: '每月' },
  { key: 'year', label: '每年' },
];

export default function StatisticsScreen() {
  const { refresh, items, period, setPeriod } = useTransactionStore();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const groups = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    if (period === 'week') {
      start.setDate(now.getDate() - 6);
    } else if (period === 'month') {
      start.setDate(1);
    } else {
      start.setMonth(now.getMonth() - 11);
      start.setDate(1);
    }

    const formatter =
      period === 'year'
        ? new Intl.DateTimeFormat('zh-CN', { month: 'short' })
        : period === 'month'
          ? new Intl.DateTimeFormat('zh-CN', { day: 'numeric' })
          : new Intl.DateTimeFormat('zh-CN', { weekday: 'short' });

    const sums = new Map<string, number>();
    for (const t of items) {
      if (t.type !== 'expense') continue;
      const txDate = new Date(t.date);
      if (txDate < start) continue;
      const label = formatter.format(txDate);
      sums.set(label, (sums.get(label) ?? 0) + t.amount);
    }
    return Array.from(sums.entries()).map(([label, value]) => ({ label, value }));
  }, [items, period]);

  const chartData = groups.length
    ? groups.map((d) => ({ label: d.label, value: d.value, frontColor: '#9FE870' }))
    : [{ value: 0, frontColor: '#1F2622', label: '' }];

  return (
    <View className="flex-1 bg-night-900">
      <ScrollView className="px-5 pt-6" contentContainerStyle={{ paddingBottom: 140 }}>
        <Text className="text-2xl font-semibold text-white mb-4">统计</Text>

        <View className="flex-row rounded-3xl border border-graphite bg-night-800 p-1">
          {tabs.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => setPeriod(tab.key)}
              className={`flex-1 rounded-3xl py-3 ${period === tab.key ? 'bg-neon' : ''}`}>
              <Text
                className={`text-center text-sm font-semibold ${
                  period === tab.key ? 'text-night-900' : 'text-mist'
                }`}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-6 rounded-4xl border border-graphite bg-jungle-900 px-4 py-5">
          {groups.length === 0 ? (
            <View className="py-6">
              <Text className="text-center text-mist">暂无支出数据</Text>
            </View>
          ) : (
            <BarChart
              data={chartData}
              barWidth={24}
              spacing={18}
              frontColor="#9FE870"
              hideRules
              yAxisColor={'transparent'}
              xAxisColor={'transparent'}
              xAxisLabelTextStyle={{ color: '#9AA5A0', fontSize: 12 }}
              noOfSections={4}
              maxValue={Math.max(...chartData.map((d) => d.value)) || 1}
            />
          )}
        </View>

        <View className="mt-8">
          <Text className="text-lg font-semibold text-white mb-3">账单</Text>
          {items.length === 0 ? (
            <View className="rounded-3xl border border-graphite bg-night-800 px-4 py-6">
              <Text className="text-center text-mist">暂无账单</Text>
            </View>
          ) : (
            items.slice(0, 10).map((t) => <TransactionItem key={t.id} item={t} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}
