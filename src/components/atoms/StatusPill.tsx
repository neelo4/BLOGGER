export function StatusPill({ text = 'OK' }: { text?: string }) {
  return (
    <span className="pill">
      <span className="dot" />
      {text}
    </span>
  );
}

export default StatusPill;

