import { useState } from 'react';
import { AccountsList } from '@/features/accounts/AccountsList';
import { Transactions } from '@/features/accounts/Transactions';

export default function AccountsPage() {
  const [selectedId, setSelectedId] = useState<string>('a-001');
  return (
    <section className="row" style={{ gap: 16, alignItems: 'start' }}>
      <div style={{ flex: 1, minWidth: 360 }}>
        <h3>Accounts</h3>
        <AccountsList onSelect={a => setSelectedId(a.id)} />
      </div>
      <div style={{ flex: 1.3, minWidth: 420 }}>
        <h3>Recent Transactions</h3>
        <Transactions accountId={selectedId} />
      </div>
    </section>
  );
}

