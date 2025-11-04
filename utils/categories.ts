import type { TxType } from '@/db/sqlite/schema';
import { Utensils, Car, ShoppingBag, Film, Home, HeartPulse, Phone, Plane, PiggyBank, Gift, LucideIcon } from 'lucide-react-native';

export type CategoryKey =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'housing'
  | 'health'
  | 'phone'
  | 'travel'
  | 'savings'
  | 'gifts'
  | 'other';

export const Categories: Record<
  CategoryKey,
  { key: CategoryKey; label: string; icon: LucideIcon; type: TxType }
> = {
  food: { key: 'food', label: 'Food', icon: Utensils, type: 'expense' },
  transport: { key: 'transport', label: 'Transport', icon: Car, type: 'expense' },
  shopping: { key: 'shopping', label: 'Shopping', icon: ShoppingBag, type: 'expense' },
  entertainment: { key: 'entertainment', label: 'Entertainment', icon: Film, type: 'expense' },
  housing: { key: 'housing', label: 'Housing', icon: Home, type: 'expense' },
  health: { key: 'health', label: 'Health', icon: HeartPulse, type: 'expense' },
  phone: { key: 'phone', label: 'Phone', icon: Phone, type: 'expense' },
  travel: { key: 'travel', label: 'Travel', icon: Plane, type: 'expense' },
  savings: { key: 'savings', label: 'Savings', icon: PiggyBank, type: 'income' },
  gifts: { key: 'gifts', label: 'Gifts', icon: Gift, type: 'income' },
  other: { key: 'other', label: 'Other', icon: Gift, type: 'expense' },
};

export const CategoryList = Object.values(Categories);

