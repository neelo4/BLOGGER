import { useQuery } from '@tanstack/react-query';
import { getTransactions } from './api';
import { DataTable } from '@/components/organisms/DataTable';

export function Transactions({ accountId }: { accountId: string }) {
  const { data } = useQuery({ queryKey: ['txn', accountId], queryFn: () => getTransactions(accountId), enabled: !!accountId });
  return (
    <DataTable
      columns={[
        { key: 'date', header: 'Date', render: v => new Date(v).toLocaleDateString() },
        { key: 'description', header: 'Description' },
        { key: 'amount', header: 'Amount', render: (v, r) => `${r.currency} ${Number(v).toFixed(2)}` }
      ]}
      data={data ?? []}
    />
  );
}

export default Transactions;

