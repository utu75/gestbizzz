import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const mockVisites = [
  { id: '1', titre: 'Visite R042', description: 'Enregistrée', date: '2025-12-21', status: 'done' },
  { id: '2', titre: 'Récolte 15kg', description: 'Enregistrée', date: '2025-12-20', status: 'done' },
  { id: '3', titre: 'Nouveau rucher', description: 'Enregistré', date: '2025-12-19', status: 'done' }
];

const VisiteCard = ({ visite }) => (
  <Card className="border border-slate-200">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-slate-800">{visite.titre}</h3>
          <p className="text-sm text-slate-500">{visite.description} ✓</p>
        </div>
        <CheckCircle className="w-5 h-5 text-emerald-500" />
      </div>
    </CardContent>
  </Card>
);

const Visites = () => {
  const [visites, setVisites] = useState(mockVisites);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const stats = {
    aFaire: visites.filter(v => v.status === 'todo').length,
    enCours: visites.filter(v => v.status === 'progress').length,
    terminees: visites.filter(v => v.status === 'done').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visites</h1>
          <p className="text-slate-500">Gérez vos visites et interventions</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvelle visite
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-amber-500">{stats.aFaire}</p>
            <p className="text-sm text-slate-500">À faire</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-blue-500">{stats.enCours}</p>
            <p className="text-sm text-slate-500">En cours</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-emerald-500">{stats.terminees}</p>
            <p className="text-sm text-slate-500">Terminées</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {['Toutes', 'À faire', 'En cours', 'Terminées'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab.toLowerCase())}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === tab.toLowerCase()
                ? 'bg-slate-100 text-slate-800'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Visites List */}
      <div className="space-y-3">
        {visites.map((visite) => (
          <div key={visite.id} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">
              {visite.status === 'done' && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">{visite.titre}</h3>
              <p className="text-sm text-slate-500">{visite.description}</p>
              <p className="text-xs text-slate-400 mt-1">Créée le {visite.date} • Échéance: {visite.date}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">Moyenne</span>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle visite</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Titre</Label>
              <Input placeholder="Ex: Visite de contrôle" className="mt-1.5" />
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="Description de la visite" className="mt-1.5" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Visites;
