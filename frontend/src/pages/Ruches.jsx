import React, { useState } from 'react';
import {
  Box,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Crown,
  Wheat,
  MoreVertical,
  X
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { mockRuches as initialRuches, mockRuchers } from '../data/mock';

const getEtatColor = (etat) => {
  switch (etat) {
    case 'Fort': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Moyen': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Faible': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const RucheRow = ({ ruche, onEdit, onDelete, onView }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
        <div className="relative">
          <button 
            className="p-2 hover:bg-slate-100 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[140px]">
              <button 
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => { onView(ruche); setMenuOpen(false); }}
              >
                <Eye className="w-4 h-4" />
                Voir
              </button>
              <button 
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => { onEdit(ruche); setMenuOpen(false); }}
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              <button 
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                onClick={() => { onDelete(ruche.id); setMenuOpen(false); }}
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const AddRucheDialog = ({ open, onOpenChange, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    numero: '',
    rucherId: '',
    type: 'Dadant',
    etat: 'Moyen',
    race: 'Buckfast',
    reine: 'Non marquée'
  });

  React.useEffect(() => {
    if (editData) {
      setFormData({
        numero: editData.numero,
        rucherId: editData.rucherId,
        type: editData.type,
        etat: editData.etat,
        race: editData.race,
        reine: editData.reine
      });
    } else {
      setFormData({ numero: '', rucherId: '', type: 'Dadant', etat: 'Moyen', race: 'Buckfast', reine: 'Non marquée' });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rucher = mockRuchers.find(r => r.id === formData.rucherId);
    onAdd({
      ...formData,
      rucherName: rucher?.name || '',
      production: editData?.production || 0,
      dateInstallation: editData?.dateInstallation || new Date().toISOString().split('T')[0],
      derniereVisite: new Date().toISOString().split('T')[0]
    }, editData?.id);
    setFormData({ numero: '', rucherId: '', type: 'Dadant', etat: 'Moyen', race: 'Buckfast', reine: 'Non marquée' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editData ? 'Modifier la ruche' : 'Ajouter une Ruche'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Numéro</Label>
              <Input
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                placeholder="Ex: R009"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label>Rucher</Label>
              <select 
                value={formData.rucherId}
                onChange={(e) => setFormData({ ...formData, rucherId: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg"
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
              <Label>Type</Label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="Dadant">Dadant</option>
                <option value="Langstroth">Langstroth</option>
                <option value="Warré">Warré</option>
                <option value="Kenyane">Kenyane</option>
              </select>
            </div>
            <div>
              <Label>État</Label>
              <select 
                value={formData.etat}
                onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="Fort">Fort</option>
                <option value="Moyen">Moyen</option>
                <option value="Faible">Faible</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Race</Label>
              <select 
                value={formData.race}
                onChange={(e) => setFormData({ ...formData, race: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="Buckfast">Buckfast</option>
                <option value="Carnica">Carnica</option>
                <option value="Noire">Abeille Noire</option>
                <option value="Italienne">Italienne</option>
              </select>
            </div>
            <div>
              <Label>Reine</Label>
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
            <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
              {editData ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ViewRucheDialog = ({ open, onOpenChange, ruche }) => {
  if (!ruche) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            Ruche {ruche.numero}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Rucher</p>
              <p className="font-semibold text-slate-800">{ruche.rucherName}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Type</p>
              <p className="font-semibold text-slate-800">{ruche.type}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">État</p>
              <Badge className={`${getEtatColor(ruche.etat)} border mt-1`}>{ruche.etat}</Badge>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Production</p>
              <p className="font-semibold text-amber-600">{ruche.production} kg</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Reine</p>
              <p className="font-semibold text-slate-800">{ruche.reine}</p>
              <p className="text-xs text-slate-500">{ruche.race}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Dernière visite</p>
              <p className="font-semibold text-slate-800">{new Date(ruche.derniereVisite).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Ruches = () => {
  const [ruches, setRuches] = useState(initialRuches);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedRuche, setSelectedRuche] = useState(null);
  const [editRuche, setEditRuche] = useState(null);
  const [filterEtat, setFilterEtat] = useState('all');
  const [filterRucher, setFilterRucher] = useState('all');

  const filteredRuches = ruches.filter(ruche => {
    const matchesSearch = ruche.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ruche.rucherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEtat = filterEtat === 'all' || ruche.etat === filterEtat;
    const matchesRucher = filterRucher === 'all' || ruche.rucherId === filterRucher;
    return matchesSearch && matchesEtat && matchesRucher;
  });

  const handleAdd = (data, editId) => {
    if (editId) {
      setRuches(ruches.map(r => r.id === editId ? { ...r, ...data } : r));
    } else {
      const newRuche = {
        id: String(Date.now()),
        ...data
      };
      setRuches([...ruches, newRuche]);
    }
    setEditRuche(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ruche ?')) {
      setRuches(ruches.filter(r => r.id !== id));
    }
  };

  const handleView = (ruche) => {
    setSelectedRuche(ruche);
    setViewDialogOpen(true);
  };

  const handleEdit = (ruche) => {
    setEditRuche(ruche);
    setDialogOpen(true);
  };

  const stats = {
    fort: ruches.filter(r => r.etat === 'Fort').length,
    moyen: ruches.filter(r => r.etat === 'Moyen').length,
    faible: ruches.filter(r => r.etat === 'Faible').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mes Ruches</h1>
          <p className="text-slate-500">{ruches.length} ruches enregistrées</p>
        </div>
        <Button 
          onClick={() => { setEditRuche(null); setDialogOpen(true); }}
          className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
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
            <Box className="w-8 h-8 text-emerald-200" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">État Moyen</p>
              <p className="text-2xl font-bold text-amber-600">{stats.moyen}</p>
            </div>
            <Box className="w-8 h-8 text-amber-200" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-red-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">État Faible</p>
              <p className="text-2xl font-bold text-red-600">{stats.faible}</p>
            </div>
            <Box className="w-8 h-8 text-red-200" />
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
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Ruche</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Rucher</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">État</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Reine</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Production</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Dernière visite</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRuches.map((ruche) => (
                <RucheRow 
                  key={ruche.id} 
                  ruche={ruche} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete}
                  onView={handleView}
                />
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

      <AddRucheDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAdd={handleAdd}
        editData={editRuche}
      />
      <ViewRucheDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        ruche={selectedRuche}
      />
    </div>
  );
};

export default Ruches;
