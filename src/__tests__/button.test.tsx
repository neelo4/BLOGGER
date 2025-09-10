import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

it('renders button text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});

