import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AppNotification } from '../types/index';
import { api } from '../lib/api';

export interface PersonaOption {
  id: string;
  name: string;
  role: User['role'];
  title: string;
  badge: string;
}

export const DEMO_PERSONAS: PersonaOption[] = [
  {
    id: 'usr_candidate_1',
    name: 'Elena Rostova',
    role: 'candidate',
    title: 'Senior Cloud Infrastructure Architect',
    badge: 'Candidate Portal',
  },
  {
    id: 'usr_recruiter_1',
    name: 'Marcus Vance',
    role: 'recruiter',
    title: 'Principal Technical Recruiter',
    badge: 'Recruiter Workspace',
  },
  {
    id: 'usr_hr_1',
    name: 'Sarah Jenkins',
    role: 'hr_manager',
    title: 'VP of People & Talent',
    badge: 'HR Executive',
  },
  {
    id: 'usr_admin_1',
    name: 'David Sterling',
    role: 'super_admin',
    title: 'CTO / Platform Super Admin',
    badge: 'Enterprise Admin',
  },
];

interface AuthContextType {
  currentUser: User | null;
  permissions: string[];
  isAuthenticated: boolean;
  loading: boolean;
  notifications: AppNotification[];
  unreadCount: number;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<{ user: User; redirectUrl?: string; message?: string }>;
  register: (data: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    phone?: string;
    headline?: string;
  }) => Promise<{ user: User; redirectUrl?: string; verificationEmailSent?: boolean; verificationPreview?: any }>;
  logout: () => Promise<void>;
  switchPersona: (personaId: string) => Promise<{ user: User; redirectUrl?: string }>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (...roles: Array<User['role']>) => boolean;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const fetchUserAndNotifs = async () => {
    try {
      const res = await api.getMe();
      if (res?.user) {
        setCurrentUser(res.user);
        setPermissions(res.permissions || []);
        const notifRes = await api.getNotifications().catch(() => ({ notifications: [] }));
        setNotifications(notifRes?.notifications || []);
      } else {
        setCurrentUser(null);
        setPermissions([]);
        setNotifications([]);
      }
    } catch (err) {
      console.warn('Auth init note:', err);
      setCurrentUser(null);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndNotifs();
  }, []);

  const login = async (email: string, password?: string, rememberMe?: boolean) => {
    setLoading(true);
    try {
      const res = await api.login(email, password, rememberMe);
      setCurrentUser(res.user);
      // Refresh full profile and permissions
      const meRes = await api.getMe();
      setPermissions(meRes?.permissions || []);
      const notifRes = await api.getNotifications().catch(() => ({ notifications: [] }));
      setNotifications(notifRes?.notifications || []);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    phone?: string;
    headline?: string;
  }) => {
    setLoading(true);
    try {
      const res = await api.register(data);
      setCurrentUser(res.user);
      const meRes = await api.getMe();
      setPermissions(meRes?.permissions || []);
      const notifRes = await api.getNotifications().catch(() => ({ notifications: [] }));
      setNotifications(notifRes?.notifications || []);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.logout();
      setCurrentUser(null);
      setPermissions([]);
      setNotifications([]);
      localStorage.removeItem('codeology_user_id');
    } finally {
      setLoading(false);
    }
  };

  const switchPersona = async (personaId: string) => {
    setLoading(true);
    try {
      const res = await api.switchPersona(personaId);
      setCurrentUser(res.user);
      const meRes = await api.getMe();
      setPermissions(meRes?.permissions || []);
      const notifRes = await api.getNotifications().catch(() => ({ notifications: [] }));
      setNotifications(notifRes?.notifications || []);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUserAndNotifs();
  };

  const hasPermission = (perm: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'super_admin') return true;
    return permissions.includes(perm);
  };

  const hasRole = (...roles: Array<User['role']>): boolean => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  };

  const markNotificationRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        (prev || []).map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.warn('Notification read error:', err);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => (prev || []).map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.warn('Mark all notifications read error:', err);
    }
  };

  const refreshNotifications = async () => {
    if (!currentUser) return;
    try {
      const notifRes = await api.getNotifications();
      setNotifications(notifRes?.notifications || []);
    } catch (err) {
      console.warn('Refresh notifications error:', err);
    }
  };

  const unreadCount = (notifications || []).filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        permissions,
        isAuthenticated: !!currentUser,
        loading,
        notifications,
        unreadCount,
        login,
        register,
        logout,
        switchPersona,
        refreshUser,
        hasPermission,
        hasRole,
        markNotificationRead,
        markAllNotificationsRead,
        refreshNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
