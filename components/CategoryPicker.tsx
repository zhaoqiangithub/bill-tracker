import React from 'react';
import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { CategoryList, type CategoryKey } from '@/utils/categories';

type Props = {
  value?: CategoryKey;
  onChange?: (v: CategoryKey) => void;
};

export default function CategoryPicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const current = CategoryList.find((c) => c.key === value);
  return (
    <>
      <Pressable className="rounded-xl border border-gray-200 p-3" onPress={() => setOpen(true)}>
        <Text>{current ? current.label : 'Select category'}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)}>
          <View className="mt-auto rounded-t-2xl bg-white p-4">
            <Text className="text-lg font-semibold mb-2">Pick a category</Text>
            <FlatList
              data={CategoryList}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <Pressable
                  className="flex-row items-center gap-3 py-2"
                  onPress={() => {
                    onChange?.(item.key as CategoryKey);
                    setOpen(false);
                  }}>
                  <item.icon size={18} />
                  <Text>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

