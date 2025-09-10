import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '@/features/accounts/api';
import { StatCard } from '@/components/molecules/StatCard';
import { FxRate } from '@/features/fx/FxRate';

export default function DashboardPage() {
  const { data } = useQuery({ queryKey: ['accounts'], queryFn: getAccounts });
  const total = (data ?? []).reduce((acc, a) => acc + (a.currency === 'USD' ? a.balance : 0), 0);
  return (
    <section className="stats-grid">
      <StatCard label="Total USD" value={`USD ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
      <StatCard label="Accounts" value={String(data?.length ?? 0)} hint="Linked to your profile" />
      <StatCard label="Net Flow (7d)" value={'+$1,240'} hint="Demo metric" />
      <FxRate />
    </section>
  );
}
