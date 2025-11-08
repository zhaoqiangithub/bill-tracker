import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useAccountStore } from '@/store/useAccountStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import CategoryPicker from '@/components/CategoryPicker';

export default function AddTransactionModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const add = useTransactionStore((s) => s.add);
  const accounts = useAccountStore((s) => s.accounts);
  const refreshAccounts = useAccountStore((s) => s.refresh);
  const [type, setType] = useState<'income' | 'expense'>(params.type === 'income' ? 'income' : 'expense');
  const [accountId, setAccountId] = useState<number | undefined>(accounts[0]?.id);
  const [category, setCategory] = useState<any>('food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  React.useEffect(() => {
    refreshAccounts();
  }, [refreshAccounts]);

  React.useEffect(() => {
    if (!accountId && accounts[0]) {
      setAccountId(accounts[0].id);
    }
  }, [accounts, accountId]);

  const onSubmit = async () => {
    if (!accountId) {
      Alert.alert('请先创建账户');
      return;
    }
    const amt = parseFloat(amount || '0');
    if (!amt || amt <= 0) {
      Alert.alert('请输入正确的金额');
      return;
    }
    await add({
      type,
      amount: amt,
      category,
      account_id: accountId,
      date: today,
      description: description.trim() || null,
    });
    router.back();
  };

  return (
    <View className="flex-1 bg-night-900">
      <ScrollView className="px-5 pt-6" contentContainerStyle={{ paddingBottom: 60 }}>
        <Pressable onPress={() => router.back()} className="mb-4 h-12 w-12 items-center justify-center rounded-2xl bg-night-800">
          <ChevronLeft color="#F7FFF2" size={20} />
        </Pressable>
        <Text className="text-2xl font-semibold text-white mb-4">添加账单</Text>

        <View className="mb-4 flex-row gap-3">
          {(['expense', 'income'] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => setType(t)}
              className={`flex-1 rounded-3xl border px-4 py-3 ${
                type === t ? 'border-neon bg-neon/10' : 'border-graphite bg-night-800'
              }`}>
              <Text className={`text-center font-semibold ${type === t ? 'text-neon' : 'text-mist'}`}>
                {t === 'expense' ? '支出' : '收入'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-sm text-mist mb-2">账户</Text>
        <View className="flex-row flex-wrap gap-2">
          {accounts.map((a) => (
            <Pressable
              key={a.id}
              onPress={() => setAccountId(a.id)}
              className={`rounded-3xl border px-4 py-2 ${
                accountId === a.id ? 'border-neon bg-neon/10' : 'border-graphite bg-night-800'
              }`}>
              <Text className={`font-medium ${accountId === a.id ? 'text-neon' : 'text-white'}`}>{a.name}</Text>
            </Pressable>
          ))}
        </View>

        <Text className="mt-6 text-sm text-mist">分类</Text>
        <CategoryPicker value={category} onChange={setCategory as any} />

        <Text className="mt-6 text-sm text-mist">金额</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          placeholderTextColor="#55645B"
          className="mt-2 rounded-3xl border border-graphite bg-night-800 px-4 py-3 text-white"
        />

        <Text className="mt-6 text-sm text-mist">备注（可选）</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="写点什么..."
          placeholderTextColor="#55645B"
          className="mt-2 rounded-3xl border border-graphite bg-night-800 px-4 py-3 text-white"
        />

        <Pressable onPress={onSubmit} className="mt-8 rounded-3xl bg-neon py-4">
          <Text className="text-center text-lg font-semibold text-night-900">提交</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
