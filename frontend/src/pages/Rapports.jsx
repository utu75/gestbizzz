import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  PieChart,
  BarChart3,
  Filter,
  Printer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockStats, mockRecoltes, mockRuchers, mockRuches } from '../data/mock';

const ReportCard = ({ title, description, icon: Icon, color, onGenerate }) => (
  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={onGenerate}>
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-slate-800 group-hover:text-amber-600 transition-colors">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">Cliquer pour générer</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="w-4 h-4 text-slate-400" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Printer className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatWidget = ({ title, value, subtitle, color }) => (
  <div className={`p-4 rounded-xl ${color}`}>
    <p className="text-sm font-medium opacity-80">{title}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
    <p className="text-xs opacity-60 mt-1">{subtitle}</p>
  </div>
);

const Rapports = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedRucher, setSelectedRucher] = useState('all');

  const reports = [
    {
      title: 'Rapport de Production',
      description: 'Synthèse complète de la production de miel, pollen, propolis et cire',
      icon: BarChart3,
      color: 'bg-gradient-to-br from-amber-400 to-amber-600'
    },
    {
      title: 'Registre Sanitaire',
      description: 'État des traitements, inspections et suivi sanitaire des colonies',
      icon: FileText,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600'
    },
    {
      title: 'Inventaire des Ruches',
      description: 'Liste détaillée de toutes les ruches avec leur état et historique',
      icon: PieChart,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
      title: 'Bilan Annuel',
      description: 'Rapport complet de l\'activité apicole sur l\'année',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-600'
    }
  ];

  const totalProduction = mockRecoltes.reduce((sum, r) => sum + r.quantite, 0);
  const moyenneParRuche = (totalProduction / mockRuches.length).toFixed(1);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Rapports & Statistiques</h1>
          <p className="text-slate-500 mt-1">Générez et exportez vos rapports d'activité</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="2024">Année 2024</option>
            <option value="2023">Année 2023</option>
            <option value="2022">Année 2022</option>
          </select>
          <select 
            value={selectedRucher}
            onChange={(e) => setSelectedRucher(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="all">Tous les ruchers</option>
            {mockRuchers.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Résumé {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatWidget
              title="Production Totale"
              value={`${totalProduction} kg`}
              subtitle="Tous produits confondus"
              color="bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800"
            />
            <StatWidget
              title="Nombre de Ruches"
              value={mockRuches.length}
              subtitle={`Réparties sur ${mockRuchers.length} ruchers`}
              color="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800"
            />
            <StatWidget
              title="Moyenne/Ruche"
              value={`${moyenneParRuche} kg`}
              subtitle="Production moyenne"
              color="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800"
            />
            <StatWidget
              title="Santé Colonies"
              value={`${mockStats.santeMoyenne}%`}
              subtitle="Indice de santé moyen"
              color="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-800"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            {...report}
            onGenerate={() => alert(`Génération du rapport: ${report.title}`)}
          />
        ))}
      </div>

      {/* Production Chart Placeholder */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-800">Évolution de la Production</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4 pt-4">
            {mockStats.productionParMois.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '200px' }}>
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg transition-all duration-500 hover:from-amber-400 hover:to-amber-300"
                    style={{ height: `${mockStats.productionParMois.reduce((max, m) => Math.max(max, m.production), 0) > 0 ? (item.production / mockStats.productionParMois.reduce((max, m) => Math.max(max, m.production), 0)) * 100 : 0}%` }}
                  >
                    {item.production > 0 && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-600">
                        {item.production}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.mois}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Dernières Récoltes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Rucher</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Variété</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Quantité</th>
                </tr>
              </thead>
              <tbody>
                {mockRecoltes.slice(0, 5).map((recolte) => (
                  <tr key={recolte.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(recolte.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-800 font-medium">{recolte.rucherName}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        recolte.type === 'Miel' ? 'bg-amber-100 text-amber-700' :
                        recolte.type === 'Pollen' ? 'bg-yellow-100 text-yellow-700' :
                        recolte.type === 'Propolis' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {recolte.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{recolte.variete}</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-slate-800">
                      {recolte.quantite} {recolte.unite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rapports;
