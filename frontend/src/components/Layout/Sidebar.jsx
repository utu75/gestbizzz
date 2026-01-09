import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Box,
  Wheat,
  HeartPulse,
  Package,
  Calendar,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockNotifications } from '../../data/mock';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
    { icon: MapPin, label: 'Ruchers', path: '/ruchers' },
    { icon: Box, label: 'Ruches', path: '/ruches' },
    { icon: Wheat, label: 'Récoltes', path: '/recoltes' },
    { icon: HeartPulse, label: 'Registre Sanitaire', path: '/sanitaire' },
    { icon: Package, label: 'Stocks', path: '/stocks' },
    { icon: Calendar, label: 'Calendrier', path: '/calendrier' },
    { icon: FileText, label: 'Rapports', path: '/rapports' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Hexagon className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg text-white">GESTBIZZ</h1>
              <p className="text-xs text-slate-400">Gestion Apicole</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-400 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 shadow-lg shadow-amber-500/5'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-amber-400' : 'group-hover:text-amber-400'}`} />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </NavLink>
              </li>
            );
          })}  
        </ul>
      </nav>

      {/* Notifications */}
      <div className="px-3 py-2">
        <NavLink
          to="/notifications"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          {!collapsed && <span className="font-medium text-sm">Notifications</span>}
        </NavLink>
      </div>

      {/* User section */}
      <div className="p-3 border-t border-slate-700/50">
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
            {user?.avatar || 'U'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.role}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-3">
          <NavLink
            to="/settings"
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all ${collapsed ? 'px-2' : ''}`}
          >
            <Settings className="w-4 h-4" />
            {!collapsed && <span className="text-xs">Paramètres</span>}
          </NavLink>
          <button
            onClick={logout}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all ${collapsed ? 'px-2' : ''}`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="text-xs">Déconnexion</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
