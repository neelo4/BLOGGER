import { useEffect, useState } from 'react';
import { gql } from '@/shared/graphql/client';

export function FxRate({ base = 'USD', counter = 'EUR' }: { base?: string; counter?: string }) {
  const [rate, setRate] = useState<number | null>(null);
  useEffect(() => {
    let cancel = false;
    gql<{ data: { rate: { value: number } } }>(
      `query Rate($base: String!, $counter: String!) { rate(base: $base, counter: $counter) { value } }`,
      { base, counter }
    ).then(r => !cancel && setRate(r.data.rate.value));
    return () => {
      cancel = true;
    };
  }, [base, counter]);

  return (
    <div className="card stat" style={{ minWidth: 260, minHeight: 120, display: 'flex', gap: 8, flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-2)' }}>
      <div style={{ opacity: 0.7, fontSize: 12 }}>FX</div>
      <div style={{ fontSize: 18 }}>{base}/{counter}: {rate ?? '—'}</div>
    </div>
  );
}

export default FxRate;
