import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCodeGeneration, CodeGenerationService } from '@/services/codeGeneration';

describe('CodeGenerationService', () => {
  let service: CodeGenerationService;

  beforeEach(() => {
    service = new CodeGenerationService();
  });

  it('generates code for pricing prompt', async () => {
    const result = await service.generateCode('Create a pricing card with three tiers');
    
    expect(result.code).toContain('PricingCard');
    expect(result.code).toContain('Pro Plan');
    expect(result.tokens).toBeGreaterThan(0);
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('generates code for hero section prompt', async () => {
    const result = await service.generateCode('Build a hero section for landing page');
    
    expect(result.code).toContain('HeroSection');
    expect(result.code).toContain('Welcome to the Future');
    expect(result.tokens).toBeGreaterThan(0);
  });

  it('generates code for form prompt', async () => {
    const result = await service.generateCode('Create a contact form with validation');
    
    expect(result.code).toContain('ContactForm');
    expect(result.code).toContain('Full Name');
    expect(result.tokens).toBeGreaterThan(0);
  });

  it('generates default component for generic prompt', async () => {
    const prompt = 'Make something cool';
    const result = await service.generateCode(prompt);
    
    expect(result.code).toContain('GeneratedComponent');
    expect(result.code).toContain(prompt);
    expect(result.tokens).toBeGreaterThan(0);
  });
});

describe('useCodeGeneration hook', () => {
  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useCodeGeneration());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.generatedCode).toBe('');
    expect(result.current.error).toBe('');
  });

  it('generates code successfully', async () => {
    const { result } = renderHook(() => useCodeGeneration());

    await act(async () => {
      result.current.generateCode('Create a button component');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.generatedCode).toBeTruthy();
    expect(result.current.error).toBe('');
  });

  it('clears code when requested', () => {
    const { result } = renderHook(() => useCodeGeneration());

    act(() => {
      result.current.clearCode();
    });

    expect(result.current.generatedCode).toBe('');
  });

  it('clears error when requested', () => {
    const { result } = renderHook(() => useCodeGeneration());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe('');
  });
});