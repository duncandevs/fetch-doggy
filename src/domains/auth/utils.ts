import { Credentials } from "./types";

export function createUserSession(credential: Credentials) {
    const session = {
        ...credential,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000,
    };
    const expirationTime = new Date(session.expiresAt);
    const sessionStr = encodeURIComponent(JSON.stringify(session));
    document.cookie = `doggy_session=${sessionStr}; expires=${expirationTime.toUTCString()}; path=/`;
}

export function getUserSession(): Credentials | null {
    if (typeof document === "undefined") return null;

    const cookieStr = document.cookie.split('; ').find(row => row.startsWith('doggy_session='));
    if (!cookieStr) return null;
    
    try {
        const value = cookieStr.split('=')[1];
        const session = JSON.parse(decodeURIComponent(value));

        if (session.expiresAt && session.expiresAt < Date.now()) {
            deleteUserSession();
            return null;
        }

        return session;
    } catch (error) {
        return null;
    }
};

export function deleteUserSession() {
    if (typeof document === "undefined") return null;
    document.cookie = `doggy_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function logout() {
    if (typeof document === "undefined") return null;
    document.cookie = `doggy_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
}
  