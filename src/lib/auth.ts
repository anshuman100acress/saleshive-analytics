
import { User, UserRole } from '../types';
import { users } from './data';

// Simulated authentication functions
let currentUser: User | null = null;

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === 'password') { // In a real app, you would verify the password properly
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      localStorage.removeItem('currentUser');
      resolve();
    }, 300);
  });
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: UserRole | UserRole[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};

export const canAccessRole = (targetRole: UserRole): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const roleHierarchy: { [key in UserRole]: number } = {
    director: 3,
    salesHead: 2,
    teamLeader: 1,
    salesExecutive: 0
  };
  
  return roleHierarchy[user.role] >= roleHierarchy[targetRole];
};

export const canAccessUser = (targetUserId: string): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (user.role === 'director') return true;
  
  const targetUser = users.find(u => u.id === targetUserId);
  if (!targetUser) return false;
  
  if (user.role === 'salesHead') {
    // Sales heads can access their team leaders and below
    if (targetUser.parentId === user.id) return true;
    return users.some(u => u.parentId === user.id && targetUser.parentId === u.id);
  }
  
  if (user.role === 'teamLeader') {
    // Team leaders can access their sales executives
    return targetUser.parentId === user.id;
  }
  
  // Sales executives can only access themselves
  return user.id === targetUserId;
};

export const canAccessLead = (assignedToUserId: string): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (user.role === 'director') return true;
  
  if (user.id === assignedToUserId) return true;
  
  return canAccessUser(assignedToUserId);
};
