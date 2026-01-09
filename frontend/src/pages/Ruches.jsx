import React, { useState } from 'react';
import {
  Box,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Crown,
  Calendar,
  Wheat,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockRuches, mockRuchers } from '../data/mock';

const getEtatColor = (etat) => {
  switch (etat) {
    case 'Fort': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Moyen': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Faible': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const RucheRow = ({ ruche, onEdit, onDelete }) => (
  <tr className="hover:bg-slate-50 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
          <Box className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">{ruche.numero}</p>
          <p className="text-sm text-slate-500">{ruche.type}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <p className="text-slate-800">{ruche.rucherName}</p>
    </td>
    <td className="px-6 py-4">
      <Badge className={`${getEtatColor(ruche.etat)} border`}>
        {ruche.etat}
      </Badge>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-amber-500" />
        <div>
          <p className="text-sm text-slate-800">{ruche.reine}</p>
          <p className="text-xs text-slate-500">{ruche.race}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Wheat className="w-4 h-4 text-amber-500" />
        <span className="font-semibold text-slate-800">{ruche.production} kg</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-slate-600">{new Date(ruche.derniereVisite).toLocaleDateString('fr-FR')}</p>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Eye className="w-4 h-4 text-slate-400 hover:text-blue-500" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => onEdit(ruche)}>
          <Edit className="w-4 h-4 text-slate-400 hover:text-amber-500" />
        </button>
        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" onClick={() => onDelete(ruche.id)}>
          <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
        </button>
      </div>
    </td>
  </tr>
);

const AddRucheDialog = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    numero: '',
    rucherId: '',
    type: 'Dadant',
    etat: 'Moyen',
    race: 'Buckfast',
    reine: 'Non marquée'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const rucher = mockRuchers.find(r => r.id === formData.rucherId);
    onAdd({
      ...formData,
      rucherName: rucher?.name || '',
      production: 0,
      dateInstallation: new Date().toISOString().split('T')[0],
      derniereVisite: new Date().toISOString().split('T')[0]
    });
    setFormData({ numero: '', rucherId: '', type: 'Dadant', etat: 'Moyen', race: 'Buckfast', reine: 'Non marquée' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Ajouter une Ruche</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Numéro</Label>
              <Input
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                placeholder="Ex: R009"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Rucher</Label>
              <select 
                value={formData.rucherId}
                onChange={(e) => setFormData({ ...formData, rucherId: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              >
                <option value="">Sélectionner...</option>
                {mockRuchers.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Type</Label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Dadant">Dadant</option>
                <option value="Langstroth">Langstroth</option>
                <option value="Warré">Warré</option>
                <option value="Kenyane">Kenyane</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">État</Label>
              <select 
                value={formData.etat}
                onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Fort">Fort</option>
                <option value="Moyen">Moyen</option>
                <option value="Faible">Faible</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Race</Label>
              <select 
                value={formData.race}
                onChange={(e) => setFormData({ ...formData, race: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Buckfast">Buckfast</option>
                <option value="Carnica">Carnica</option>
                <option value="Noire">Abeille Noire</option>
                <option value="Italienne">Italienne</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Reine</Label>
              <Input
                value={formData.reine}
                onChange={(e) => setFormData({ ...formData, reine: e.target.value })}
                placeholder="Ex: Marquée 2024"
                className="mt-1.5"
              />
            </div>
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

const Ruches = () => {
  const [ruches, setRuches] = useState(mockRuches);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterEtat, setFilterEtat] = useState('all');
  const [filterRucher, setFilterRucher] = useState('all');

  const filteredRuches = ruches.filter(ruche => {
    const matchesSearch = ruche.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ruche.rucherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEtat = filterEtat === 'all' || ruche.etat === filterEtat;
    const matchesRucher = filterRucher === 'all' || ruche.rucherId === filterRucher;
    return matchesSearch && matchesEtat && matchesRucher;
  });

  const handleAdd = (data) => {
    const newRuche = {
      id: String(ruches.length + 1),
      ...data
    };
    setRuches([...ruches, newRuche]);
  };

  const handleDelete = (id) => {
    setRuches(ruches.filter(r => r.id !== id));
  };

  const stats = {
    fort: ruches.filter(r => r.etat === 'Fort').length,
    moyen: ruches.filter(r => r.etat === 'Moyen').length,
    faible: ruches.filter(r => r.etat === 'Faible').length
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Mes Ruches</h1>
          <p className="text-slate-500 mt-1">{ruches.length} ruches enregistrées</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Ruche
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-md border-l-4 border-l-emerald-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">État Fort</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.fort}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Box className="w-6 h-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">État Moyen</p>
              <p className="text-2xl font-bold text-amber-600">{stats.moyen}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Box className="w-6 h-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-red-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">État Faible</p>
              <p className="text-2xl font-bold text-red-600">{stats.faible}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Box className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
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
                placeholder="Rechercher une ruche..."
                className="pl-10"
              />
            </div>
            <select 
              value={filterRucher}
              onChange={(e) => setFilterRucher(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="all">Tous les ruchers</option>
              {mockRuchers.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <div className="flex gap-2">
              {['all', 'Fort', 'Moyen', 'Faible'].map((etat) => (
                <button
                  key={etat}
                  onClick={() => setFilterEtat(etat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterEtat === etat
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {etat === 'all' ? 'Tous' : etat}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ruche</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rucher</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">État</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reine</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Production</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dernière visite</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRuches.map((ruche) => (
                <RucheRow key={ruche.id} ruche={ruche} onEdit={() => {}} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
        {filteredRuches.length === 0 && (
          <div className="text-center py-12">
            <Box className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600">Aucune ruche trouvée</h3>
          </div>
        )}
      </Card>

      <AddRucheDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Ruches;
