import { z } from 'zod';

const AccountZ = z.object({
  id: z.string(),
  name: z.string(),
  number: z.string(),
  currency: z.string().length(3),
  balance: z.number()
});

export type Account = z.infer<typeof AccountZ>;

export async function getAccounts(): Promise<Account[]> {
  try {
    const res = await fetch('/api/accounts');
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) throw new Error('not-json');
    const json = await res.json();
    const parsed = z.object({ accounts: z.array(AccountZ) }).safeParse(json);
    if (!parsed.success) throw new Error('Accounts payload invalid');
    return parsed.data.accounts;
  } catch {
    // Fallback demo data if mocks are not available
    return [
      { id: 'a-001', name: 'Everyday Checking', number: '**** 1101', currency: 'USD', balance: 4250.13 },
      { id: 'a-002', name: 'High-Yield Savings', number: '**** 9920', currency: 'USD', balance: 15890.44 },
      { id: 'a-003', name: 'Travel Card', number: '**** 7742', currency: 'EUR', balance: 634.5 }
    ];
  }
}

export async function getTransactions(accountId: string) {
  try {
    const res = await fetch(`/api/transactions?accountId=${accountId}`);
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) throw new Error('not-json');
    return (await res.json()).transactions as Array<{
      id: string;
      date: string;
      description: string;
      amount: number;
      currency: string;
    }>;
  } catch {
    // Fallback demo transactions
    return Array.from({ length: 6 }).map((_, i) => ({
      id: `${accountId}-t-${i}`,
      date: new Date(Date.now() - i * 86400000).toISOString(),
      description: ['Card purchase', 'ATM withdrawal', 'Direct deposit'][i % 3],
      amount: (i % 2 === 0 ? -1 : 1) * Number((Math.random() * 120).toFixed(2)),
      currency: 'USD'
    }));
  }
}
