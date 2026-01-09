import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Hexagon,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { mockRuchers } from '../data/mock';

const RucherCard = ({ rucher, onEdit, onDelete }) => (
  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
    <div className={`h-2 ${rucher.status === 'actif' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-slate-300 to-slate-400'}`} />
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${rucher.status === 'actif' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
            <MapPin className={`w-6 h-6 ${rucher.status === 'actif' ? 'text-emerald-600' : 'text-slate-400'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-800 group-hover:text-amber-600 transition-colors">{rucher.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {rucher.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => onEdit(rucher)}>
            <Edit className="w-4 h-4 text-slate-400 hover:text-amber-500" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" onClick={() => onDelete(rucher.id)}>
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <Hexagon className="w-4 h-4" />
            <span>Ruches</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{rucher.ruchesCount}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <Calendar className="w-4 h-4" />
            <span>Création</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">{new Date(rucher.dateCreation).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          rucher.status === 'actif' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-slate-100 text-slate-600'
        }`}>
          {rucher.status === 'actif' ? 'Actif' : 'Inactif'}
        </span>
        <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
          <Eye className="w-4 h-4 mr-2" />
          Détails
        </Button>
      </div>
    </CardContent>
  </Card>
);

const AddRucherDialog = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: 'actif'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', location: '', status: 'actif' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Ajouter un Rucher</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Nom du rucher</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Rucher du Soleil"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Localisation</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Saint-Martin"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Statut</Label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white">
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
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRuchers = ruchers.filter(rucher => {
    const matchesSearch = rucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rucher.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || rucher.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAdd = (data) => {
    const newRucher = {
      id: String(ruchers.length + 1),
      ...data,
      ruchesCount: 0,
      dateCreation: new Date().toISOString().split('T')[0]
    };
    setRuchers([...ruchers, newRucher]);
  };

  const handleDelete = (id) => {
    setRuchers(ruchers.filter(r => r.id !== id));
  };

  const totalRuches = ruchers.reduce((sum, r) => sum + r.ruchesCount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Mes Ruchers</h1>
          <p className="text-slate-500 mt-1">{ruchers.length} ruchers • {totalRuches} ruches au total</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Rucher
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un rucher..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'actif', 'inactif'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'Tous' : status === 'actif' ? 'Actifs' : 'Inactifs'}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRuchers.map((rucher) => (
          <RucherCard
            key={rucher.id}
            rucher={rucher}
            onEdit={() => {}}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredRuchers.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Aucun rucher trouvé</h3>
          <p className="text-slate-400 mt-1">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      <AddRucherDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Ruchers;
