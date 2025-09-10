import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Input({ label, style, ...props }: Props) {
  return (
    <label className="row" style={{ gap: 8, alignItems: 'start' }}>
      {label && <span style={{ minWidth: 120, opacity: 0.9 }}>{label}</span>}
      <input
        {...props}
        style={{
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          width: '100%',
          ...style
        }}
      />
    </label>
  );
}

export default Input;

