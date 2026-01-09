import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CreditCard,
  BarChart3,
  Megaphone,
  Settings,
  MapPin,
  Hexagon,
  Activity,
  DollarSign,
  Crown,
  Zap,
  Trash2,
  Search,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: BarChart3, label: 'Tableau de bord', id: 'dashboard' },
    { icon: Users, label: 'Utilisateurs', id: 'users' },
    { icon: CreditCard, label: 'Abonnements', id: 'subscriptions' },
    { icon: BarChart3, label: 'Statistiques', id: 'stats' },
    { icon: Megaphone, label: 'Annonces', id: 'announcements' },
    { icon: Settings, label: 'Paramètres', id: 'settings' },
  ];

  return (
    <aside className="w-56 bg-slate-900 min-h-screen fixed left-0 top-0 text-white">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Hexagon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold"><span className="text-amber-400">GEST</span>BIZZ</h1>
            <p className="text-xs text-slate-400">Administration</p>
          </div>
        </div>
      </div>

      <nav className="p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 text-xs text-slate-500">
        <p>Version 1.0.0</p>
        <p>© 2025 GESTBIZZ</p>
      </div>
    </aside>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, iconBg, iconColor }) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ActivityCard = ({ title, value, change, icon: Icon, iconBg, iconColor }) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {change && (
            <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
              <span>↗</span> {change}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const UserRow = ({ user, onChangeType, onDelete }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-100">
    <div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-800">{user.name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          user.type === 'VIP' 
            ? 'bg-amber-100 text-amber-700' 
            : 'bg-slate-100 text-slate-600'
        }`}>
          {user.type === 'VIP' && <Crown className="w-3 h-3 inline mr-1" />}
          {user.type}
        </span>
      </div>
      <p className="text-sm text-slate-500">{user.email}</p>
      <p className="text-xs text-slate-400">Inscrit le {user.date}</p>
    </div>
    <div className="flex items-center gap-2">
      <select 
        value={user.type}
        onChange={(e) => onChangeType(user.id, e.target.value)}
        className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
      >
        <option value="DEMO">DEMO</option>
        <option value="PREMIUM">PREMIUM</option>
        <option value="VIP">VIP</option>
      </select>
      <button 
        onClick={() => onDelete(user.id)}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: '1', name: 'Mon Exploitation', email: 'melimiel08@gmail.com', type: 'VIP', date: '18/12/2025' },
    { id: '2', name: 'test', email: 'h.rod@live.fr', type: 'DEMO', date: '18/12/2025' }
  ]);

  const handleChangeType = (userId, newType) => {
    setUsers(users.map(u => u.id === userId ? { ...u, type: newType } : u));
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const stats = {
    totalUsers: users.length,
    demoAccounts: users.filter(u => u.type === 'DEMO').length,
    premiumAccounts: users.filter(u => u.type === 'PREMIUM').length,
    vipAccounts: users.filter(u => u.type === 'VIP').length
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-56">
        {/* Header */}
        <header className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Panneau d'administration</h1>
            <p className="text-xs text-slate-400">Connecté en tant qu'administrateur</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sm text-slate-400 hover:text-white"
            >
              Retour à l'app
            </button>
            <button 
              onClick={logout}
              className="text-sm text-slate-400 hover:text-white"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Administration</h2>
            <p className="text-slate-500">Gestion des utilisateurs et abonnements</p>
          </div>

          {/* User Stats */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistiques utilisateurs</h3>
            <div className="grid grid-cols-4 gap-4">
              <StatCard 
                title="Total Utilisateurs" 
                value={stats.totalUsers}
                icon={Users}
                iconBg="bg-slate-100"
                iconColor="text-slate-600"
              />
              <StatCard 
                title="Comptes DEMO" 
                value={stats.demoAccounts}
                subtitle="Gratuit"
                icon={Users}
                iconBg="bg-slate-100"
                iconColor="text-slate-600"
              />
              <StatCard 
                title="PREMIUM" 
                value={stats.premiumAccounts}
                subtitle="45€/mois"
                icon={Zap}
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />
              <StatCard 
                title="VIP" 
                value={stats.vipAccounts}
                subtitle="Exclusif"
                icon={Crown}
                iconBg="bg-amber-100"
                iconColor="text-amber-600"
              />
            </div>
          </div>

          {/* Platform Activity */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Activité de la plateforme</h3>
            <div className="grid grid-cols-4 gap-4">
              <ActivityCard 
                title="Total Ruchers" 
                value="0"
                change="+12% ce mois"
                icon={MapPin}
                iconBg="bg-amber-100"
                iconColor="text-amber-600"
              />
              <ActivityCard 
                title="Total Ruches" 
                value="0"
                change="+8% ce mois"
                icon={Hexagon}
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />
              <ActivityCard 
                title="Total Visites" 
                value="0"
                change="Actif"
                icon={Activity}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
              />
              <ActivityCard 
                title="Revenu mensuel" 
                value="0€"
                change="MRR estimé"
                icon={DollarSign}
                iconBg="bg-emerald-100"
                iconColor="text-emerald-600"
              />
            </div>
          </div>

          {/* User Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Gestion des utilisateurs</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9 w-64"
                />
              </div>
            </div>
            <div className="space-y-3">
              {users.map(user => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onChangeType={handleChangeType}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
