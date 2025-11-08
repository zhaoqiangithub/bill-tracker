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
      <Pressable
        className="rounded-3xl border border-graphite bg-jungle-900 px-4 py-3"
        onPress={() => setOpen(true)}>
        <Text className="text-white">{current ? current.label : '选择分类'}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/60" onPress={() => setOpen(false)}>
          <View className="mt-auto rounded-t-3xl border border-graphite bg-night-900 p-5">
            <Text className="text-lg font-semibold text-white mb-4">选择一个分类</Text>
            <FlatList
              data={CategoryList}
              keyExtractor={(item) => item.key}
              ItemSeparatorComponent={() => <View className="h-px bg-graphite/60" />}
              renderItem={({ item }) => (
                <Pressable
                  className="flex-row items-center justify-between py-3"
                  onPress={() => {
                    onChange?.(item.key as CategoryKey);
                    setOpen(false);
                  }}>
                  <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-2xl bg-night-800">
                      <item.icon size={20} color="#9FE870" />
                    </View>
                    <Text className="text-white">{item.label}</Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
