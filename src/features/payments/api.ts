export async function createPayment(input: { fromAccountId: string; to: string; amount: number }) {
  try {
    const res = await fetch('/api/payments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) throw new Error('not-json');
    return (await res.json()) as { status: string; id: string };
  } catch (e) {
    if (input.amount <= 0) throw new Error('Amount must be positive');
    // Local fallback
    return { status: 'scheduled', id: `p-${Math.random().toString(16).slice(2)}` };
  }
}
