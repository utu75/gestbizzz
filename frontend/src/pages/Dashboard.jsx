import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Hexagon,
  Droplet,
  Calendar,
  Package,
  DollarSign,
  FileText,
  Settings,
  ChevronRight,
  Upload,
  Download
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockStats, mockRuchers, mockRuches } from '../data/mock';
import { useAuth } from '../contexts/AuthContext';

const StatCard = ({ icon: Icon, value, label, unit, iconBg }) => (
  <Card className="border border-slate-200 shadow-sm">
    <CardContent className="p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        {unit && <span className="text-sm text-slate-400">{unit}</span>}
      </div>
    </CardContent>
  </Card>
);

const ModuleCard = ({ icon: Icon, title, description, path, iconColor }) => {
  const navigate = useNavigate();
  return (
    <Card 
      className="border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={() => navigate(path)}
    >
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const totalRuchers = mockRuchers.length;
  const totalRuches = mockRuches.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mon Exploitation</h1>
          <p className="text-slate-500">Bonjour, {user?.email || 'utilisateur'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Importer
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>À jour • Dernière synchronisation : il y a 5 heures</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={MapPin} value={totalRuchers} label="Ruchers" iconBg="bg-amber-500" />
        <StatCard icon={Hexagon} value={totalRuches} label="Ruches" iconBg="bg-amber-600" />
        <StatCard icon={Droplet} value="0" label="Récoltes" iconBg="bg-amber-400" />
        <StatCard icon={Droplet} value="0" label="Beaucoup" unit="kg" iconBg="bg-amber-300" />
      </div>

      {/* Main Modules */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Modules principaux</h2>
        <div className="grid grid-cols-3 gap-4">
          <ModuleCard 
            icon={MapPin} 
            title="Ruchers" 
            description="Gérez vos emplacements apicoles et leur géolocalisation"
            path="/ruchers"
            iconColor="bg-amber-100 text-amber-600"
          />
          <ModuleCard 
            icon={Hexagon} 
            title="Ruches" 
            description="Suivez vos colonies, leur santé et leurs interventions"
            path="/ruches"
            iconColor="bg-amber-100 text-amber-600"
          />
          <ModuleCard 
            icon={Droplet} 
            title="Miellerie" 
            description="Cahier de récoltes, traçabilité et conditionnement"
            path="/miellerie"
            iconColor="bg-amber-100 text-amber-600"
          />
        </div>
      </div>

      {/* Management Modules */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Gestion et suivi</h2>
        <div className="grid grid-cols-2 gap-4">
          <ModuleCard 
            icon={Calendar} 
            title="Visites" 
            description="techniques de visites"
            path="/visites"
            iconColor="bg-blue-100 text-blue-600"
          />
          <ModuleCard 
            icon={Droplet} 
            title="Stock Miel" 
            description="Inventaire miel"
            path="/miellerie"
            iconColor="bg-amber-100 text-amber-600"
          />
          <ModuleCard 
            icon={Package} 
            title="Inventaire" 
            description="Matériel et équipement"
            path="/inventaire"
            iconColor="bg-purple-100 text-purple-600"
          />
          <ModuleCard 
            icon={DollarSign} 
            title="Événements" 
            description="Transactions (XPF)"
            path="/evenements"
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <ModuleCard 
            icon={FileText} 
            title="Rapports & Stats" 
            description="Analyses et statistiques"
            path="/rapports"
            iconColor="bg-slate-100 text-slate-600"
          />
          <ModuleCard 
            icon={Settings} 
            title="Paramètres" 
            description="Configuration de l'application"
            path="/parametres"
            iconColor="bg-slate-100 text-slate-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
