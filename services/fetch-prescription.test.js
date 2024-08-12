import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { getPrescriptions } from './fetch-prescriptions';
import { getCookie } from '../utils/getCookie';

vi.mock('../utils/getCookie', () => ({
  getCookie: vi.fn(),
}));

describe('getPrescriptions', () => {
  const mockFetch = vi.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterAll(() => {
    global.fetch = undefined;
  });

  it('should fetch prescriptions successfully', async () => {
    const mockResponse = {
      data: [{ id: 1 }, { id: 2 }],
      meta: { 'has_next_page?': true },
    };
    
    getCookie.mockReturnValue('mockToken');
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getPrescriptions(1);

    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith('http://rec-staging.recemed.cl/api/patients/prescriptions?page=1', {
      headers: {
        'Authorization': 'Bearer mockToken',
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle fetch errors', async () => {
    getCookie.mockReturnValue('mockToken');
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Error fetching data' }),
    });

    await expect(getPrescriptions(1)).rejects.toThrow('Error fetching data');
  });

  it('should handle unexpected errors', async () => {
    getCookie.mockReturnValue('mockToken');
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(getPrescriptions(1)).rejects.toThrow('Network error');
  });
});
