import { create } from 'zustand';
import type { Transaction, TxType } from '@/db/sqlite/schema';
import {
  createTransaction as dbCreate,
  deleteTransaction as dbDelete,
  listTransactions as dbList,
  updateTransaction as dbUpdate,
  getIncomeExpenseTotals,
} from '@/db/sqlite/database';

export type Period = 'week' | 'month' | 'year';

type Filters = {
  accountId?: number;
  from?: string; // yyyy-MM-dd
  to?: string; // yyyy-MM-dd
};

type State = {
  items: Transaction[];
  loading: boolean;
  period: Period;
  filters?: Filters;
};

type Actions = {
  setPeriod: (p: Period) => void;
  setFilters: (f?: Filters) => void;
  refresh: () => void;
  add: (input: {
    type: TxType;
    amount: number;
    category: string;
    account_id: number;
    date: string;
    description?: string | null;
  }) => Promise<Transaction>;
  update: (
    id: number,
    patch: Partial<Pick<Transaction, 'type' | 'amount' | 'category' | 'account_id' | 'date' | 'description'>>,
  ) => Promise<Transaction>;
  remove: (id: number) => Promise<void>;
  totals: () => { income: number; expense: number };
};

export const useTransactionStore = create<State & Actions>((set, get) => ({
  items: [],
  loading: false,
  period: 'month',
  filters: undefined,

  setPeriod: (p) => set({ period: p }),
  setFilters: (f) => set({ filters: f }),

  refresh: () => {
    set({ loading: true });
    const { filters } = get();
    const rows = dbList(filters);
    set({ items: rows, loading: false });
  },

  add: async (input) => {
    const row = dbCreate(input);
    get().refresh();
    return row;
  },

  update: async (id, patch) => {
    const row = dbUpdate(id, patch);
    get().refresh();
    return row;
  },

  remove: async (id) => {
    dbDelete(id);
    get().refresh();
  },

  totals: () => {
    const { filters } = get();
    return getIncomeExpenseTotals(filters);
  },
}));

