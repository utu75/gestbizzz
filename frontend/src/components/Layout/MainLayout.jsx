import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from 'lucide-react';

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const titles = {
      '/dashboard': 'Tableau de bord',
      '/ruchers': 'Ruchers',
      '/ruches': 'Ruches',
      '/visites': 'Visites',
      '/miellerie': 'Miellerie',
      '/atelier': 'Atelier',
      '/inventaire': 'Inventaire',
      '/parrainage': 'Parrainage',
      '/parametres': 'Paramètres',
      '/admin': 'Administration'
    };
    return titles[location.pathname] || 'Dashboard';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      
      {/* Top Header */}
      <header className="fixed top-0 left-56 right-0 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-slate-400" />
          <h1 className="font-semibold text-slate-800">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user?.exploitation || 'Mon Exploitation'}</span>
          <span className="text-sm text-slate-400">Déconnexion</span>
        </div>
      </header>
      
      <main className="ml-56 pt-14 min-h-screen transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
