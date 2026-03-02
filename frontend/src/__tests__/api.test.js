import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
    getAuthUser, 
    signup, 
    login, 
    logout,
    getUserFriends,
    sendFriendRequest
} from '../lib/api.js';
import { axiosInstance } from '../lib/axios.js';

vi.mock('../lib/axios.js', () => ({
    axiosInstance: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
    }
}));

describe('API Functions', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('getAuthUser', () => {
        it('should fetch authenticated user', async () => {
            const mockUser = {
                _id: '123',
                fullName: 'John Doe',
                email: 'john@example.com',
                isOnboarded: true
            };

            axiosInstance.get.mockResolvedValue({ data: { user: mockUser } });

            const result = await getAuthUser();

            expect(axiosInstance.get).toHaveBeenCalledWith('/auth/me');
            expect(result).toEqual({ user: mockUser });
        });

        it('should return null on error', async () => {
            axiosInstance.get.mockRejectedValue(new Error('Network error'));

            const result = await getAuthUser();

            expect(result).toBeNull();
        });
    });

    describe('signup', () => {
        it('should send signup request with user data', async () => {
            const signupData = {
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            };

            const mockResponse = { success: true, user: { _id: '123' } };

            axiosInstance.post.mockResolvedValue({ data: mockResponse });

            const result = await signup(signupData);

            expect(axiosInstance.post).toHaveBeenCalledWith('/auth/signup', signupData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('login', () => {
        it('should send login request with credentials', async () => {
            const loginData = {
                email: 'john@example.com',
                password: 'password123'
            };

            const mockResponse = { success: true, user: { _id: '123' } };

            axiosInstance.post.mockResolvedValue({ data: mockResponse });

            const result = await login(loginData);

            expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', loginData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('logout', () => {
        it('should send logout request', async () => {
            const mockResponse = { success: true };

            axiosInstance.post.mockResolvedValue({ data: mockResponse });

            const result = await logout();

            expect(axiosInstance.post).toHaveBeenCalledWith('/auth/logout');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getUserFriends', () => {
        it('should fetch user friends', async () => {
            const mockFriends = [
                { _id: '1', fullName: 'Friend One' },
                { _id: '2', fullName: 'Friend Two' }
            ];

            axiosInstance.get.mockResolvedValue({ data: mockFriends });

            const result = await getUserFriends();

            expect(axiosInstance.get).toHaveBeenCalledWith('/users/friends');
            expect(result).toEqual(mockFriends);
        });
    });

    describe('sendFriendRequest', () => {
        it('should send friend request to a user', async () => {
            const userId = 'user456';
            const mockResponse = { friendRequest: { _id: 'req123' } };

            axiosInstance.post.mockResolvedValue({ data: mockResponse });

            const result = await sendFriendRequest(userId);

            expect(axiosInstance.post).toHaveBeenCalledWith(`/users/friend-request/${userId}`);
            expect(result).toEqual(mockResponse);
        });
    });
});