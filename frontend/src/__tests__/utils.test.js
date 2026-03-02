import { describe, it, expect } from 'vitest';
import { capitalize } from '../lib/utils.js';

describe('Utility Functions', () => {
    describe('capitalize', () => {
        it('should capitalize the first letter of a string', () => {
            expect(capitalize('hello')).toBe('Hello');
        });

        it('should handle single character strings', () => {
            expect(capitalize('a')).toBe('A');
        });

        it('should not change already capitalized strings', () => {
            expect(capitalize('Hello')).toBe('Hello');
        });

        it('should handle strings with numbers', () => {
            expect(capitalize('123abc')).toBe('123abc');
        });

        it('should handle mixed case strings', () => {
            expect(capitalize('hELLO')).toBe('HELLO');
        });

        it('should handle empty strings', () => {
            expect(capitalize('')).toBe('');
        });

        it('should handle strings with spaces', () => {
            expect(capitalize('hello world')).toBe('Hello world');
        });
    });
});