import { describe, it, expect } from 'vitest';
import { bookInterests, cinemaInterests } from '../constants/index.js';

describe('Constants', () => {
    describe('bookInterests', () => {
        it('should have multiple book interest options', () => {
            expect(bookInterests.length).toBeGreaterThan(0);
        });

        it('should have value and label for each interest', () => {
            bookInterests.forEach(interest => {
                expect(interest).toHaveProperty('value');
                expect(interest).toHaveProperty('label');
            });
        });

        it('should contain Fiction', () => {
            const hasFiction = bookInterests.some(i => i.value === 'Fiction');
            expect(hasFiction).toBe(true);
        });

        it('should contain at least 10 options', () => {
            expect(bookInterests.length).toBeGreaterThanOrEqual(10);
        });
    });

    describe('cinemaInterests', () => {
        it('should have multiple cinema interest options', () => {
            expect(cinemaInterests.length).toBeGreaterThan(0);
        });

        it('should have value and label for each interest', () => {
            cinemaInterests.forEach(interest => {
                expect(interest).toHaveProperty('value');
                expect(interest).toHaveProperty('label');
            });
        });

        it('should contain Action', () => {
            const hasAction = cinemaInterests.some(i => i.value === 'Action');
            expect(hasAction).toBe(true);
        });

        it('should not have duplicate values', () => {
            const values = cinemaInterests.map(i => i.value);
            const uniqueValues = new Set(values);
            expect(uniqueValues.size).toBe(values.length);
        });
    });
});