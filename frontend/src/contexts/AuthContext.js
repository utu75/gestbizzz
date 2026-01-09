import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const mockUsers = [
  {
    id: '1',
    name: 'Mon Exploitation',
    email: 'melimiel08@gmail.com',
    role: 'Apiculteur',
    avatar: 'ME',
    exploitation: 'Rucher du Soleil',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Administrateur',
    email: 'admin@gestbizz.com',
    role: 'Admin',
    avatar: 'AD',
    exploitation: 'GESTBIZZ Admin',
    isAdmin: true
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('gestbizz_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Check for admin
    if (email === 'admin@gestbizz.com' && password === 'admin123') {
      const adminUser = mockUsers.find(u => u.email === 'admin@gestbizz.com');
      localStorage.setItem('gestbizz_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true };
    }
    
    // Check for regular users
    if (email && password) {
      const existingUser = mockUsers.find(u => u.email === email);
      const userData = existingUser || {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: 'Apiculteur',
        avatar: email.substring(0, 2).toUpperCase(),
        exploitation: 'Mon Exploitation',
        isAdmin: false
      };
      localStorage.setItem('gestbizz_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'Email ou mot de passe incorrect' };
  };

  const loginWithGoogle = async () => {
    // Simulate Google login - creates a default user
    const googleUser = {
      id: 'google_' + Date.now(),
      name: 'Utilisateur Google',
      email: 'user@gmail.com',
      role: 'Apiculteur',
      avatar: 'UG',
      exploitation: 'Mon Exploitation',
      isAdmin: false
    };
    localStorage.setItem('gestbizz_user', JSON.stringify(googleUser));
    setUser(googleUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('gestbizz_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, loading }}>
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
