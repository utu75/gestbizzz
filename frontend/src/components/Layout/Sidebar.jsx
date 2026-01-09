import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Hexagon,
  Calendar,
  Droplet,
  Wrench,
  Package,
  Gift,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
    { icon: MapPin, label: 'Ruchers', path: '/ruchers' },
    { icon: Hexagon, label: 'Ruches', path: '/ruches' },
    { icon: Calendar, label: 'Visites', path: '/visites' },
    { icon: Droplet, label: 'Miellerie', path: '/miellerie' },
    { icon: Wrench, label: 'Atelier', path: '/atelier' },
    { icon: Package, label: 'Inventaire', path: '/inventaire' },
    { icon: Gift, label: 'Parrainage', path: '/parrainage' },
    { icon: Settings, label: 'Paramètres', path: '/parametres' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col ${
        collapsed ? 'w-20' : 'w-56'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Hexagon className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-slate-800"><span className="text-amber-500">GEST</span>BIZZ</h1>
              <p className="text-xs text-slate-400">Mon Exploitation</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-amber-500' : ''}`} />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}  
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        {!collapsed && (
          <div className="text-xs text-slate-400 mb-3">
            <p>Version 1.0.0</p>
            <p>© 2025 GESTBIZZ</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all text-sm"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
