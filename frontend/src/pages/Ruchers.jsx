import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Search,
  Grid,
  List,
  Eye,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { mockRuchers } from '../data/mock';

const RucherCard = ({ rucher, onView, onAddRuche }) => (
  <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all">
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{rucher.name}</h3>
          <p className="text-sm text-slate-500">{rucher.location}</p>
        </div>
        <button className="p-1 hover:bg-slate-100 rounded">
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-3xl font-bold text-amber-500">{rucher.ruchesCount}</span>
        <span className="text-sm text-slate-500">ruches</span>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 gap-2"
          onClick={() => onView(rucher)}
        >
          <Eye className="w-4 h-4" />
          Voir
        </Button>
        <Button 
          className="flex-1 gap-2 bg-slate-900 hover:bg-slate-800 text-white"
          onClick={() => onAddRuche(rucher)}
        >
          <Plus className="w-4 h-4" />
          Ruche
        </Button>
      </div>
    </CardContent>
  </Card>
);

const AddRucherDialog = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', location: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau rucher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Nom du rucher</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: H1"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label>Emplacement</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Hatiheu (Poihapapu)"
              className="mt-1.5"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Ruchers = () => {
  const [ruchers, setRuchers] = useState(mockRuchers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const handleAdd = (data) => {
    const newRucher = {
      id: String(ruchers.length + 1),
      ...data,
      ruchesCount: 0,
      status: 'actif',
      dateCreation: new Date().toISOString().split('T')[0]
    };
    setRuchers([...ruchers, newRucher]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Ruchers</h1>
          <p className="text-slate-500">Gérez vos emplacements apicoles</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouveau rucher
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">Affichage :</span>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
            >
              <Grid className="w-5 h-5 text-slate-600" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
            >
              <List className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">Triés par :</span>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm">
            Nom
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {ruchers.map((rucher) => (
          <RucherCard
            key={rucher.id}
            rucher={rucher}
            onView={() => {}}
            onAddRuche={() => {}}
          />
        ))}
      </div>

      <AddRucherDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Ruchers;
