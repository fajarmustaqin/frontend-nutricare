import { getCookie } from './index';

// Decode JWT token to get user data
export const decodeToken = (token) => {
    try {
        if (!token) return null;
        
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Get current user info from token
export const getCurrentUser = () => {
    const token = getCookie('token');
    if (!token) return null;
    
    const decoded = decodeToken(token);
    return decoded?.data || null;
};

// Check if current user is admin
export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === 'admin';
};

// Check if current user is regular user
export const isUser = () => {
    const user = getCurrentUser();
    return user?.role === 'user';
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = getCookie('token');
    return !!token;
};
