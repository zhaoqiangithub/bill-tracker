import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Plus, Minus, Wallet, ArrowDownCircle, ArrowUpCircle } from 'lucide-react-native';

type Props = {
  onAddExpense?: () => void;
  onAddIncome?: () => void;
  onAddAccount?: () => void;
};

export default function FloatingActionButton({ onAddExpense, onAddIncome, onAddAccount }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <View className="absolute bottom-6 right-6 items-end gap-3">
      {open && (
        <>
          <Pressable
            onPress={onAddExpense}
            className="flex-row items-center gap-2 rounded-full bg-rose-500 px-3 py-2">
            <ArrowDownCircle color="#fff" size={18} />
            <Text className="text-white">Add Expense</Text>
          </Pressable>
          <Pressable
            onPress={onAddIncome}
            className="flex-row items-center gap-2 rounded-full bg-green-500 px-3 py-2">
            <ArrowUpCircle color="#fff" size={18} />
            <Text className="text-white">Add Income</Text>
          </Pressable>
          <Pressable
            onPress={onAddAccount}
            className="flex-row items-center gap-2 rounded-full bg-sky-500 px-3 py-2">
            <Wallet color="#fff" size={18} />
            <Text className="text-white">Add Account</Text>
          </Pressable>
        </>
      )}
      <Pressable
        onPress={() => setOpen((v) => !v)}
        className="rounded-full bg-black/80 dark:bg-white/10 p-4">
        {open ? <Minus color="#fff" /> : <Plus color="#fff" />}
      </Pressable>
    </View>
  );
}

