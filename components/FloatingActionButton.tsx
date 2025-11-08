import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { ArrowDownCircle, ArrowUpCircle, Wallet, Mic } from 'lucide-react-native';

type Props = {
  onAddExpense?: () => void;
  onAddIncome?: () => void;
  onAddAccount?: () => void;
  onScanReceipt?: () => void;
};

const actions = [
  { key: 'expense', label: '支出', color: '#FB7185', Icon: ArrowDownCircle, actionKey: 'onAddExpense' as const },
  { key: 'income', label: '收入', color: '#4ADE80', Icon: ArrowUpCircle, actionKey: 'onAddIncome' as const },
  { key: 'account', label: '账户', color: '#60A5FA', Icon: Wallet, actionKey: 'onAddAccount' as const },
  { key: 'voice', label: '语音', color: '#FACC15', Icon: Mic, actionKey: 'onScanReceipt' as const },
];

export default function FloatingActionButton(props: Props) {
  return (
    <View className="absolute bottom-6 left-0 right-0 px-5">
      <View className="flex-row items-center justify-between rounded-4xl border border-graphite bg-night-900/90 px-5 py-4">
        {actions.map(({ key, label, color, Icon, actionKey }) => {
          const disabled = !props[actionKey];
          return (
            <Pressable
              key={key}
              onPress={props[actionKey]}
              disabled={disabled}
              className={`items-center ${disabled ? 'opacity-40' : 'opacity-100'}`}>
              <View className="mb-2 h-12 w-12 items-center justify-center rounded-2xl border border-graphite bg-night-800">
                <Icon size={22} color={color} />
              </View>
              <Text className="text-xs text-white">{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
