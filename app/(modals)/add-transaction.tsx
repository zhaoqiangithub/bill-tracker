import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAccountStore } from '@/store/useAccountStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import CategoryPicker from '@/components/CategoryPicker';
import { CategoryList } from '@/utils/categories';

export default function AddTransactionModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const add = useTransactionStore((s) => s.add);
  const accounts = useAccountStore((s) => s.accounts);
  const refreshAccounts = useAccountStore((s) => s.refresh);
  const [type, setType] = useState<'income' | 'expense'>(
    params.type === 'income' ? 'income' : 'expense',
  );
  const [accountId, setAccountId] = useState<number | undefined>(accounts[0]?.id);
  const [category, setCategory] = useState<any>('food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  React.useEffect(() => {
    refreshAccounts();
  }, [refreshAccounts]);

  const onSubmit = async () => {
    if (!accountId) {
      Alert.alert('Please create an account first');
      return;
    }
    const amt = parseFloat(amount || '0');
    if (!amt || amt <= 0) {
      Alert.alert('Please enter amount');
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

  const categories = CategoryList.filter((c) => c.type === type);

  return (
    <View className="flex-1 p-4 gap-3 bg-white">
      <Text className="text-xl font-semibold mb-2">Add Transaction</Text>

      <View className="flex-row gap-2">
        {(['expense', 'income'] as const).map((t) => (
          <Pressable
            key={t}
            onPress={() => setType(t)}
            className={`rounded-full px-3 py-1 ${type === t ? 'bg-sky-500' : 'bg-gray-200'}`}>
            <Text className={type === t ? 'text-white' : ''}>{t.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-sm mt-2">Account</Text>
      <View className="flex-row flex-wrap gap-2">
        {accounts.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => setAccountId(a.id)}
            className={`rounded-full border px-3 py-1 ${
              accountId === a.id ? 'bg-sky-500 border-sky-500' : 'border-gray-300'
            }`}>
            <Text className={accountId === a.id ? 'text-white' : ''}>{a.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-sm mt-2">Category</Text>
      <CategoryPicker value={category} onChange={setCategory as any} />

      <Text className="text-sm mt-2">Amount</Text>
      <TextInput
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        className="rounded-xl border border-gray-200 p-3"
      />

      <Text className="text-sm mt-2">Description (optional)</Text>
      <TextInput value={description} onChangeText={setDescription} className="rounded-xl border border-gray-200 p-3" />

      <Pressable onPress={onSubmit} className="mt-4 rounded-xl bg-sky-500 p-3">
        <Text className="text-center text-white font-semibold">Save</Text>
      </Pressable>
    </View>
  );
}

