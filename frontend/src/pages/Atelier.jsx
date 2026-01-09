import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const mockTaches = [
  { id: '1', titre: 'preparer 100 cadres', description: 'cadre pour pose rucher H2', dateCreation: '21/12/2025', echeance: '22/12/2025', priorite: 'Moyenne', status: 'todo' },
];

const Atelier = () => {
  const [taches, setTaches] = useState(mockTaches);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState('toutes');

  const stats = {
    aFaire: taches.filter(t => t.status === 'todo').length,
    enCours: taches.filter(t => t.status === 'progress').length,
    terminees: taches.filter(t => t.status === 'done').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Atelier</h1>
          <p className="text-slate-500">Gérez vos tâches d'atelier</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvelle tâche
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

      {/* Tasks List */}
      <div className="space-y-3">
        {taches.map((tache) => (
          <div key={tache.id} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center mt-1">
              {tache.status === 'done' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-800">{tache.titre}</h3>
              <p className="text-sm text-slate-500">{tache.description}</p>
              <p className="text-xs text-slate-400 mt-2">
                Créée le {tache.dateCreation} • Échéance: {tache.echeance}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              tache.priorite === 'Haute' ? 'bg-red-100 text-red-700' :
              tache.priorite === 'Moyenne' ? 'bg-amber-100 text-amber-700' :
              'bg-emerald-100 text-emerald-700'
            }`}>
              {tache.priorite}
            </span>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle tâche</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Titre</Label>
              <Input placeholder="Ex: Préparer 50 cadres" className="mt-1.5" />
            </div>
            <div>
              <Label>Description</Label>
              <Input placeholder="Description de la tâche" className="mt-1.5" />
            </div>
            <div>
              <Label>Priorité</Label>
              <select className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg">
                <option>Basse</option>
                <option>Moyenne</option>
                <option>Haute</option>
              </select>
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

export default Atelier;
