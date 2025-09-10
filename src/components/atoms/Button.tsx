import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ variant = 'primary', style, ...props }: Props) {
  const base: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-1)'
  };
  const themed: React.CSSProperties =
    variant === 'primary'
      ? { background: 'var(--color-accent)', color: '#001219' }
      : { background: 'transparent', color: 'var(--color-text)', borderColor: 'rgba(255,255,255,0.2)' };
  return <button {...props} style={{ ...base, ...themed, ...style }} />;
}

export default Button;

