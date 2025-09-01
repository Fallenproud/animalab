import { describe, it, expect } from 'vitest';
import { 
  getRandomMockResponse, 
  simulateApiDelay, 
  mockSuccessResponses, 
  mockErrorResponses 
} from '@/mocks/apiResponses';

describe('API Mock Responses', () => {
  describe('mockSuccessResponses', () => {
    it('contains valid success response structure', () => {
      mockSuccessResponses.forEach(response => {
        expect(response.success).toBe(true);
        expect(response.data.code).toBeTruthy();
        expect(response.data.language).toBe('tsx');
        expect(response.data.framework).toBe('react');
        expect(response.data.tokens).toBeGreaterThan(0);
        expect(response.data.processingTime).toBeGreaterThan(0);
        expect(new Date(response.timestamp)).toBeInstanceOf(Date);
      });
    });

    it('has at least one success response', () => {
      expect(mockSuccessResponses.length).toBeGreaterThan(0);
    });
  });

  describe('mockErrorResponses', () => {
    it('contains valid error response structure', () => {
      mockErrorResponses.forEach(response => {
        expect(response.success).toBe(false);
        expect(response.error.code).toBeTruthy();
        expect(response.error.message).toBeTruthy();
        expect(new Date(response.timestamp)).toBeInstanceOf(Date);
      });
    });

    it('has at least one error response', () => {
      expect(mockErrorResponses.length).toBeGreaterThan(0);
    });
  });

  describe('getRandomMockResponse', () => {
    it('returns either success or error response', () => {
      const response = getRandomMockResponse();
      
      expect(typeof response.success).toBe('boolean');
      expect(new Date(response.timestamp)).toBeInstanceOf(Date);
      
      if (response.success) {
        expect((response as any).data).toBeDefined();
      } else {
        expect((response as any).error).toBeDefined();
      }
    });

    it('returns different responses on multiple calls', () => {
      const responses = Array.from({ length: 10 }, () => getRandomMockResponse());
      const uniqueMessages = new Set(
        responses.map(r => r.success ? (r as any).data.code : (r as any).error.message)
      );
      
      // Should have some variety (not all identical)
      expect(uniqueMessages.size).toBeGreaterThan(1);
    });
  });

  describe('simulateApiDelay', () => {
    it('returns a promise that resolves after minimum time', async () => {
      const startTime = Date.now();
      const minDelay = 100;
      
      await simulateApiDelay(minDelay, minDelay + 50);
      
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeGreaterThanOrEqual(minDelay - 10); // Small tolerance
    });

    it('uses default delay range when no parameters provided', async () => {
      const startTime = Date.now();
      
      await simulateApiDelay();
      
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeGreaterThanOrEqual(800 - 10); // Default min - tolerance
    });
  });
});