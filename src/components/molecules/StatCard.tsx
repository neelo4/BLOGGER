type Props = { label: string; value: string; hint?: string };

export function StatCard({ label, value, hint }: Props) {
  return (
    <div
      className="card stat"
      style={{
        minWidth: 260,
        minHeight: 120,
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-2)'
      }}
    >
      <div style={{ opacity: 0.7, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      {hint && <div style={{ opacity: 0.6, fontSize: 12 }}>{hint}</div>}
    </div>
  );
}

export default StatCard;
