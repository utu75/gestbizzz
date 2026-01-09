import React from 'react';
import {
  TrendingUp,
  Hexagon,
  MapPin,
  Wheat,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { mockStats, mockRuchers, mockTaches, mockNotifications } from '../data/mock';

const StatCard = ({ title, value, unit, icon: Icon, trend, trendValue, color }) => (
  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-800">{value}</span>
            {unit && <span className="text-lg text-slate-500">{unit}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
    <div className={`absolute bottom-0 left-0 right-0 h-1 ${color}`} />
  </Card>
);

const ProductionChart = ({ data }) => {
  const maxProduction = Math.max(...data.map(d => d.production));
  
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">Production Mensuelle</CardTitle>
          <span className="text-2xl font-bold text-amber-500">{mockStats.productionAnnuelle} kg</span>
        </div>
        <p className="text-sm text-slate-500">Année 2024</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-end justify-between gap-2 h-48">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '160px' }}>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg transition-all duration-500 hover:from-amber-400 hover:to-amber-300"
                  style={{ height: `${maxProduction > 0 ? (item.production / maxProduction) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">{item.mois}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RepartitionChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.valeur, 0);
  
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Répartition Production</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.type}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{item.valeur} kg</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{ 
                    width: `${(item.valeur / total) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RuchersOverview = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-800">Mes Ruchers</CardTitle>
        <button className="text-amber-500 hover:text-amber-600 text-sm font-medium">Voir tout</button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {mockRuchers.slice(0, 4).map((rucher) => (
          <div key={rucher.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rucher.status === 'actif' ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                <MapPin className={`w-5 h-5 ${rucher.status === 'actif' ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>
              <div>
                <p className="font-medium text-slate-800 group-hover:text-amber-600 transition-colors">{rucher.name}</p>
                <p className="text-sm text-slate-500">{rucher.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-800">{rucher.ruchesCount}</p>
              <p className="text-xs text-slate-500">ruches</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const TachesWidget = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-800">Tâches à Venir</CardTitle>
        <Calendar className="w-5 h-5 text-slate-400" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {mockTaches.slice(0, 4).map((tache) => (
          <div key={tache.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              tache.priorite === 'Haute' ? 'bg-red-500' :
              tache.priorite === 'Moyenne' ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <div className="flex-1">
              <p className="font-medium text-slate-800 text-sm">{tache.titre}</p>
              <p className="text-xs text-slate-500 mt-0.5">{tache.date} • {tache.rucher}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              tache.statut === 'Planifié' ? 'bg-blue-100 text-blue-700' :
              tache.statut === 'En cours' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {tache.statut}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const AlertesWidget = () => (
  <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <CardTitle className="text-lg font-semibold text-slate-800">Alertes</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {mockNotifications.filter(n => !n.read).map((notif) => (
          <div key={notif.id} className={`p-3 rounded-lg text-sm ${
            notif.type === 'warning' ? 'bg-amber-50 text-amber-800' :
            notif.type === 'info' ? 'bg-blue-50 text-blue-800' : 'bg-emerald-50 text-emerald-800'
          }`}>
            {notif.message}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Tableau de Bord</h1>
          <p className="text-slate-500 mt-1">Bienvenue sur votre espace de gestion apicole</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
            <option>Année 2024</option>
            <option>Année 2023</option>
            <option>Année 2022</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all">
            Exporter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Ruches"
          value={mockStats.totalRuches}
          icon={Hexagon}
          trend="up"
          trendValue="+5 ce mois"
          color="bg-gradient-to-br from-amber-400 to-amber-600"
        />
        <StatCard
          title="Ruchers Actifs"
          value={mockStats.totalRuchers}
          icon={MapPin}
          color="bg-gradient-to-br from-emerald-400 to-emerald-600"
        />
        <StatCard
          title="Production Annuelle"
          value={mockStats.productionAnnuelle}
          unit="kg"
          icon={Wheat}
          trend="up"
          trendValue="+12% vs 2023"
          color="bg-gradient-to-br from-blue-400 to-blue-600"
        />
        <StatCard
          title="Santé Moyenne"
          value={mockStats.santeMoyenne}
          unit="%"
          icon={TrendingUp}
          trend="up"
          trendValue="Bon état"
          color="bg-gradient-to-br from-purple-400 to-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionChart data={mockStats.productionParMois} />
        <RepartitionChart data={mockStats.repartitionProduction} />
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RuchersOverview />
        <TachesWidget />
        <AlertesWidget />
      </div>
    </div>
  );
};

export default Dashboard;
