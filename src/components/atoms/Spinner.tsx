export function Spinner({ size = 18 }: { size?: number }) {
  const border = Math.max(2, Math.round(size / 9));
  return (
    <span
      aria-label="loading"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${border}px solid rgba(255,255,255,0.15)`,
        borderTopColor: 'var(--color-accent)',
        animation: 'spin 1s linear infinite'
      }}
    />
  );
}

export default Spinner;

