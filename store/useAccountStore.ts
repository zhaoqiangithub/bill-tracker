import { create } from 'zustand';
import type { Account } from '@/db/sqlite/schema';
import {
  createAccount as dbCreateAccount,
  deleteAccount as dbDeleteAccount,
  listAccounts as dbListAccounts,
  updateAccount as dbUpdateAccount,
  getTotalBalance,
} from '@/db/sqlite/database';

type State = {
  accounts: Account[];
  loading: boolean;
};

type Actions = {
  refresh: () => void;
  add: (input: { name: string; balance?: number; icon?: string | null }) => Promise<Account>;
  update: (id: number, patch: Partial<Pick<Account, 'name' | 'balance' | 'icon'>>) => Promise<Account>;
  remove: (id: number) => Promise<void>;
  total: () => number;
};

export const useAccountStore = create<State & Actions>((set, get) => ({
  accounts: [],
  loading: false,

  refresh: () => {
    set({ loading: true });
    const rows = dbListAccounts();
    set({ accounts: rows, loading: false });
  },

  add: async (input) => {
    const row = dbCreateAccount(input);
    get().refresh();
    return row;
  },

  update: async (id, patch) => {
    const row = dbUpdateAccount(id, patch);
    get().refresh();
    return row;
  },

  remove: async (id) => {
    dbDeleteAccount(id);
    get().refresh();
  },

  total: () => getTotalBalance(),
}));

