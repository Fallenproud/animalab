import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { PlaygroundContainer } from '@/components/playground/PlaygroundContainer';

// Wrapper component for router context
function PlaygroundWrapper() {
  return (
    <BrowserRouter>
      <PlaygroundContainer />
    </BrowserRouter>
  );
}

describe('Playground Integration', () => {
  beforeEach(() => {
    // Reset any mocks or state before each test
  });

  it('renders the playground interface', () => {
    const { getByText, getByRole } = render(<PlaygroundWrapper />);
    
    expect(getByText('Playground')).toBeInTheDocument();
    expect(getByText('Describe Your Component')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('Generate Component')).toBeInTheDocument();
  });

  it('shows empty state initially', () => {
    const { getByText } = render(<PlaygroundWrapper />);
    
    expect(getByText('Generated code will appear here')).toBeInTheDocument();
    expect(getByText('Component preview will appear here')).toBeInTheDocument();
  });

  it('enables generate button when text is entered', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<PlaygroundWrapper />);
    
    const textarea = getByRole('textbox');
    const generateButton = getByText('Generate Component');
    
    expect(generateButton).toBeDisabled();
    
    await user.type(textarea, 'Create a button component');
    expect(generateButton).toBeEnabled();
  });

  it('shows loading state when generating', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<PlaygroundWrapper />);
    
    const textarea = getByRole('textbox');
    const generateButton = getByText('Generate Component');
    
    await user.type(textarea, 'Create a pricing card');
    await user.click(generateButton);
    
    expect(getByText('Generating...')).toBeInTheDocument();
  });

  it('switches between preview and code tabs', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<PlaygroundWrapper />);
    
    const previewTab = getByText('Preview');
    const codeTab = getByText('Code');
    
    expect(previewTab).toBeInTheDocument();
    expect(codeTab).toBeInTheDocument();
    
    await user.click(codeTab);
    expect(codeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('handles keyboard shortcuts', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<PlaygroundWrapper />);
    
    const textarea = getByRole('textbox');
    await user.type(textarea, 'Create a hero section');
    
    // Test Ctrl+Enter shortcut
    await user.keyboard('{Control>}{Enter}{/Control}');
    
    expect(getByText('Generating...')).toBeInTheDocument();
  });
});