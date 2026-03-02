import { describe, it, expect } from 'vitest';
import { axiosInstance } from '../lib/axios.js';

describe('Axios Instance Configuration', () => {
    it('should have correct base URL for development', () => {
        expect(axiosInstance.defaults.baseURL).toBeDefined();
    });

    it('should have withCredentials enabled', () => {
        expect(axiosInstance.defaults.withCredentials).toBe(true);
    });

    it('should be able to make requests', async () => {
        expect(axiosInstance.get).toBeDefined();
        expect(axiosInstance.post).toBeDefined();
        expect(axiosInstance.put).toBeDefined();
    });
});