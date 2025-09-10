import { useMutation, useQuery } from '@tanstack/react-query';
import { createPayment } from './api';
import { getAccounts } from '@/features/accounts/api';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { useState } from 'react';

export function PaymentForm() {
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  const [fromAccountId, setFromAccountId] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const mutation = useMutation({ mutationFn: createPayment });

  return (
    <form
      className="card"
      onSubmit={async e => {
        e.preventDefault();
        await mutation.mutateAsync({ fromAccountId, to, amount: Number(amount) });
        setTo('');
        setAmount('');
      }}
    >
      <h3 style={{ marginTop: 0 }}>Schedule Payment</h3>
      <label className="row" style={{ gap: 8 }}>
        <span style={{ minWidth: 120 }}>From</span>
        <select
          value={fromAccountId}
          required
          onChange={e => setFromAccountId(e.target.value)}
          style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <option value="" disabled>
            Select account
          </option>
          {(accounts ?? []).map(a => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.number})
            </option>
          ))}
        </select>
      </label>
      <Input label="To" placeholder="Recipient" value={to} onChange={e => setTo(e.target.value)} required />
      <Input label="Amount" type="number" min="0" step="0.01" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Scheduling…' : 'Schedule'}
        </Button>
      </div>
      {mutation.isSuccess && (
        <div style={{ color: 'var(--color-accent-2)' }}>Payment scheduled (id: {mutation.data.id})</div>
      )}
      {mutation.isError && (
        <div style={{ color: 'salmon' }}>{(mutation.error as Error).message}</div>
      )}
    </form>
  );
}

export default PaymentForm;

