import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTransactionStore, type Period } from '@/store/useTransactionStore';
import { CategoryList } from '@/utils/categories';
import { BarChart } from 'react-native-gifted-charts';

export default function StatisticsScreen() {
  const { refresh, items, period, setPeriod } = useTransactionStore();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setP = (p: Period) => () => setPeriod(p);

  // Aggregate expenses by category
  const sums = new Map<string, number>();
  for (const t of items) {
    if (t.type !== 'expense') continue;
    const key = t.category;
    sums.set(key, (sums.get(key) ?? 0) + t.amount);
  }
  const data = CategoryList.map((c) => ({ value: (sums.get(c.key) ?? 0) as number, label: c.label }))
    .filter((d) => d.value > 0);

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-semibold mb-4">Statistics</Text>

      <View className="flex-row gap-3 mb-4">
        {(['week', 'month', 'year'] as Period[]).map((p) => (
          <Pressable
            key={p}
            onPress={setP(p)}
            className={
              'rounded-full px-3 py-1 ' + (period === p ? 'bg-sky-500' : 'bg-gray-200 dark:bg-gray-800')
            }>
            <Text className={period === p ? 'text-white' : ''}>{p.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {data.length === 0 ? (
        <Text className="text-gray-500">No expense data.</Text>
      ) : (
        <BarChart
          data={data.map((d) => ({ value: d.value }))}
          barWidth={24}
          spacing={12}
          hideRules
          frontColor="#38bdf8"
          xAxisThickness={0}
          yAxisThickness={0}
        />
      )}
    </ScrollView>
  );
}

