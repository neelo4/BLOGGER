import { useQuery } from '@tanstack/react-query';
import { getAccounts, type Account } from './api';
import { DataTable } from '@/components/organisms/DataTable';

export function AccountsList({ onSelect }: { onSelect: (a: Account) => void }) {
  const { data } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  return (
    <DataTable
      columns={[
        { key: 'name', header: 'Account' },
        { key: 'number', header: 'Number' },
        { key: 'currency', header: 'CCY' },
        { key: 'balance', header: 'Balance', render: (v, r) => `${r.currency} ${Number(v).toLocaleString()}` }
      ]}
      data={data ?? []}
    />
  );
}

export default AccountsList;

