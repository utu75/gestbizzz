import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'hkbees_demo_session';

const pilotUser = {
  id: 'pilot-haiti-melina',
  name: 'Équipe pilote',
  email: 'pilote@hkbees.local',
  role: 'Propriétaire',
  avatar: 'HM',
  exploitation: 'Exploitation agricole Haïti Mélina',
  plan: 'pro',
  isAdmin: false,
  twoFactorEnabled: false,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async () => ({
    success: false,
    error: "L'authentification sécurisée sera connectée à l'API HKBEES. Utilisez le pilote pour la prévisualisation.",
  });

  const enterPilot = async () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pilotUser));
    setUser(pilotUser);
    return { success: true };
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, enterPilot, logout, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
