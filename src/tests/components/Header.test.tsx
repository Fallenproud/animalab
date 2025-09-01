import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Header } from '@/components/layout/Header';

describe('Header', () => {
  it('renders the AnimaLab logo', () => {
    const { getByText } = render(<Header />);
    expect(getByText('AnimaLab')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Features')).toBeInTheDocument();
    expect(getByText('Examples')).toBeInTheDocument();
    expect(getByText('Docs')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByText('Playground')).toBeInTheDocument();
  });

  it('calls onPlaygroundClick when playground button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnPlaygroundClick = vi.fn();
    const { getByText } = render(<Header onPlaygroundClick={mockOnPlaygroundClick} />);
    
    await user.click(getByText('Playground'));
    expect(mockOnPlaygroundClick).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    const { getByRole } = render(<Header />);
    const header = getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});