import * as SQLite from 'expo-sqlite';
import { SCHEMA, type Account, type Transaction, type TxType } from './schema';

// Open or create a persistent database.
const db = SQLite.openDatabaseSync('expense-tracker.db');

export function initDatabase() {
  // Enable foreign keys and create tables atomically.
  db.execSync('PRAGMA foreign_keys = ON;');
  db.execSync('BEGIN TRANSACTION;');
  try {
    db.execSync(SCHEMA.accounts);
    db.execSync(SCHEMA.transactions);
    db.execSync(SCHEMA.indexes);
    db.execSync('COMMIT;');
  } catch (e) {
    db.execSync('ROLLBACK;');
    throw e;
  }
}

// Low-level helpers
function run(sql: string, params: any[] = []) {
  db.runSync(sql, params);
}

function getAll<T = any>(sql: string, params: any[] = []) {
  const rows = db.getAllSync(sql, params) as T[];
  return rows;
}

function getFirst<T = any>(sql: string, params: any[] = []) {
  const rows = getAll<T>(sql, params);
  return rows[0] ?? null;
}

// Accounts API
export function listAccounts(): Account[] {
  return getAll<Account>('SELECT * FROM accounts ORDER BY id DESC');
}

export function createAccount(input: { name: string; balance?: number; icon?: string | null }): Account {
  const now = new Date().toISOString();
  const balance = input.balance ?? 0;
  run('INSERT INTO accounts (name, balance, icon, created_at) VALUES (?, ?, ?, ?)', [
    input.name,
    balance,
    input.icon ?? null,
    now,
  ]);
  const row = getFirst<Account>('SELECT * FROM accounts ORDER BY id DESC LIMIT 1');
  if (!row) throw new Error('Failed to create account');
  return row;
}

export function updateAccount(
  id: number,
  patch: Partial<Pick<Account, 'name' | 'balance' | 'icon'>>,
): Account {
  const existing = getFirst<Account>('SELECT * FROM accounts WHERE id = ?', [id]);
  if (!existing) throw new Error('Account not found');
  const next = {
    name: patch.name ?? existing.name,
    balance: patch.balance ?? existing.balance,
    icon: patch.icon ?? existing.icon,
  };
  run('UPDATE accounts SET name = ?, balance = ?, icon = ? WHERE id = ?', [
    next.name,
    next.balance,
    next.icon ?? null,
    id,
  ]);
  const updated = getFirst<Account>('SELECT * FROM accounts WHERE id = ?', [id]);
  if (!updated) throw new Error('Failed to update account');
  return updated;
}

export function deleteAccount(id: number) {
  run('DELETE FROM accounts WHERE id = ?', [id]);
}

// Transactions API
export function listTransactions(opts?: { accountId?: number; from?: string; to?: string }): Transaction[] {
  const clauses: string[] = [];
  const params: any[] = [];
  if (opts?.accountId != null) {
    clauses.push('account_id = ?');
    params.push(opts.accountId);
  }
  if (opts?.from) {
    clauses.push('date >= ?');
    params.push(opts.from);
  }
  if (opts?.to) {
    clauses.push('date <= ?');
    params.push(opts.to);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  return getAll<Transaction>(`SELECT * FROM transactions ${where} ORDER BY date DESC, id DESC`, params);
}

export function createTransaction(input: {
  type: TxType;
  amount: number;
  category: string;
  account_id: number;
  date: string; // yyyy-MM-dd
  description?: string | null;
}): Transaction {
  const now = new Date().toISOString();
  db.execSync('BEGIN TRANSACTION;');
  try {
    run(
      'INSERT INTO transactions (type, amount, category, account_id, date, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        input.type,
        input.amount,
        input.category,
        input.account_id,
        input.date,
        input.description ?? null,
        now,
      ],
    );
    // Update account balance based on type
    const sign = input.type === 'income' ? 1 : -1;
    run('UPDATE accounts SET balance = balance + ? WHERE id = ?', [sign * input.amount, input.account_id]);
    db.execSync('COMMIT;');
  } catch (e) {
    db.execSync('ROLLBACK;');
    throw e;
  }
  const row = getFirst<Transaction>('SELECT * FROM transactions ORDER BY id DESC LIMIT 1');
  if (!row) throw new Error('Failed to create transaction');
  return row;
}

export function updateTransaction(
  id: number,
  patch: Partial<Pick<Transaction, 'type' | 'amount' | 'category' | 'account_id' | 'date' | 'description'>>,
): Transaction {
  const existing = getFirst<Transaction>('SELECT * FROM transactions WHERE id = ?', [id]);
  if (!existing) throw new Error('Transaction not found');

  db.execSync('BEGIN TRANSACTION;');
  try {
    // If amount/type/account changed, reverse old impact and apply new impact
    const affectBalance =
      patch.amount != null || patch.type != null || patch.account_id != null;
    if (affectBalance) {
      const oldSign = existing.type === 'income' ? 1 : -1;
      run('UPDATE accounts SET balance = balance - ? WHERE id = ?', [oldSign * existing.amount, existing.account_id]);
    }

    const next: Transaction = {
      ...existing,
      ...patch,
    };

    run(
      'UPDATE transactions SET type = ?, amount = ?, category = ?, account_id = ?, date = ?, description = ? WHERE id = ?',
      [
        next.type,
        next.amount,
        next.category,
        next.account_id,
        next.date,
        next.description ?? null,
        id,
      ],
    );

    if (affectBalance) {
      const newSign = next.type === 'income' ? 1 : -1;
      run('UPDATE accounts SET balance = balance + ? WHERE id = ?', [newSign * next.amount, next.account_id]);
    }

    db.execSync('COMMIT;');
  } catch (e) {
    db.execSync('ROLLBACK;');
    throw e;
  }

  const updated = getFirst<Transaction>('SELECT * FROM transactions WHERE id = ?', [id]);
  if (!updated) throw new Error('Failed to update transaction');
  return updated;
}

export function deleteTransaction(id: number) {
  const existing = getFirst<Transaction>('SELECT * FROM transactions WHERE id = ?', [id]);
  if (!existing) return;
  db.execSync('BEGIN TRANSACTION;');
  try {
    // reverse impact
    const sign = existing.type === 'income' ? 1 : -1;
    run('UPDATE accounts SET balance = balance - ? WHERE id = ?', [sign * existing.amount, existing.account_id]);
    run('DELETE FROM transactions WHERE id = ?', [id]);
    db.execSync('COMMIT;');
  } catch (e) {
    db.execSync('ROLLBACK;');
    throw e;
  }
}

export function getIncomeExpenseTotals(opts?: { from?: string; to?: string; accountId?: number }) {
  const clauses: string[] = [];
  const params: any[] = [];
  if (opts?.from) {
    clauses.push('date >= ?');
    params.push(opts.from);
  }
  if (opts?.to) {
    clauses.push('date <= ?');
    params.push(opts.to);
  }
  if (opts?.accountId != null) {
    clauses.push('account_id = ?');
    params.push(opts.accountId);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

  const rows = getAll<{ type: string; total: number }>(
    `SELECT type, SUM(amount) as total FROM transactions ${where} GROUP BY type`,
    params,
  );
  const income = rows.find((r) => r.type === 'income')?.total ?? 0;
  const expense = rows.find((r) => r.type === 'expense')?.total ?? 0;
  return { income, expense };
}

export function getTotalBalance() {
  const row = getFirst<{ total: number }>('SELECT SUM(balance) as total FROM accounts');
  return row?.total ?? 0;
}

