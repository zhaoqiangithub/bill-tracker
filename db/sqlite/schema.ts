// SQLite schema definitions and helpers
// Keep SQL strings centralized for easier migrations.

export const SCHEMA = {
  accounts: `
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      balance REAL NOT NULL DEFAULT 0,
      icon TEXT,
      created_at TEXT NOT NULL
    );
  `,
  transactions: `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('income','expense')),
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      account_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
    );
  `,
  indexes: `
    CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
  `,
};

export type Account = {
  id: number;
  name: string;
  balance: number;
  icon?: string | null;
  created_at: string; // ISO string
};

export type TxType = 'income' | 'expense';

export type Transaction = {
  id: number;
  type: TxType;
  amount: number;
  category: string;
  account_id: number;
  date: string; // ISO string / yyyy-MM-dd
  description?: string | null;
  created_at: string; // ISO string
};

