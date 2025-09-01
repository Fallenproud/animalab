import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Hero } from '@/components/landing/Hero';

describe('Hero', () => {
  it('renders the main heading', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Design to Code')).toBeInTheDocument();
    expect(getByText('in Seconds')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    const { getByText } = render(<Hero />);
    expect(getByText(/Transform your designs into production-ready code/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Try Playground')).toBeInTheDocument();
    expect(getByText('View Examples')).toBeInTheDocument();
  });

  it('calls onGetStarted when CTA button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnGetStarted = vi.fn();
    const { getByText } = render(<Hero onGetStarted={mockOnGetStarted} />);
    
    await user.click(getByText('Try Playground'));
    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });

  it('renders feature badges', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Powered by AI • Real-time Code Generation')).toBeInTheDocument();
  });

  it('renders stats section', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('99.9% Uptime')).toBeInTheDocument();
    expect(getByText('10k+ Components Generated')).toBeInTheDocument();
    expect(getByText('Sub-second Response')).toBeInTheDocument();
  });
});