import { http, HttpResponse, delay } from 'msw';

type Account = {
  id: string;
  name: string;
  number: string;
  currency: string;
  balance: number;
};

const accounts: Account[] = [
  { id: 'a-001', name: 'Everyday Checking', number: '**** 1101', currency: 'USD', balance: 4250.13 },
  { id: 'a-002', name: 'High-Yield Savings', number: '**** 9920', currency: 'USD', balance: 15890.44 },
  { id: 'a-003', name: 'Travel Card', number: '**** 7742', currency: 'EUR', balance: 634.5 }
];

export const handlers = [
  http.get('/api/health', async () => {
    await delay(150);
    return HttpResponse.json({ status: 'ok', time: new Date().toISOString() });
  }),

  // Simple GraphQL endpoint for FX rates
  http.post('/graphql', async ({ request }) => {
    await delay(120);
    const { query, variables } = (await request.json()) as { query: string; variables?: any };
    if (query.includes('rate')) {
      const { base = 'USD', counter = 'EUR' } = variables ?? {};
      const table: Record<string, number> = { 'USD/EUR': 0.91, 'EUR/USD': 1.1 };
      const key = `${base}/${counter}`;
      return HttpResponse.json({ data: { rate: { base, counter, value: table[key] ?? 1 } } });
    }
    return HttpResponse.json({ data: {} });
  }),

  http.get('/api/accounts', async () => {
    await delay(300);
    return HttpResponse.json({ accounts });
  }),

  http.get('/api/transactions', async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const accountId = url.searchParams.get('accountId');
    const tx = Array.from({ length: 6 }).map((_, i) => ({
      id: `${accountId}-t-${i}`,
      date: new Date(Date.now() - i * 86400000).toISOString(),
      description: ['Card purchase', 'ATM withdrawal', 'Direct deposit'][i % 3],
      amount: (i % 2 === 0 ? -1 : 1) * Number((Math.random() * 120).toFixed(2)),
      currency: accounts.find(a => a.id === accountId)?.currency ?? 'USD'
    }));
    return HttpResponse.json({ transactions: tx });
  }),

  http.post('/api/payments', async ({ request }) => {
    await delay(450);
    const body = (await request.json()) as { fromAccountId: string; amount: number; to: string };
    if (body.amount <= 0) {
      return new HttpResponse(JSON.stringify({ error: 'Amount must be positive' }), { status: 400 });
    }
    return HttpResponse.json({ status: 'scheduled', id: `p-${Math.random().toString(16).slice(2)}` });
  })
];

export type { Account };
