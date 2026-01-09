import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Grid,
  List,
  Eye,
  MoreVertical,
  ChevronDown,
  Edit,
  Trash2,
  X,
  Hexagon
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { mockRuchers as initialRuchers, mockRuches } from '../data/mock';

const RucherCard = ({ rucher, onView, onAddRuche, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all relative">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{rucher.name}</h3>
            <p className="text-sm text-slate-500">{rucher.location}</p>
          </div>
          <div className="relative">
            <button 
              className="p-1 hover:bg-slate-100 rounded"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>
            
            {/* Context Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                <button 
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => { onView(rucher); setMenuOpen(false); }}
                >
                  <Eye className="w-4 h-4" />
                  Voir détails
                </button>
                <button 
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => { onEdit(rucher); setMenuOpen(false); }}
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button 
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => { onDelete(rucher.id); setMenuOpen(false); }}
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
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
};

const AddRucherDialog = ({ open, onOpenChange, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    location: editData?.location || ''
  });

  React.useEffect(() => {
    if (editData) {
      setFormData({ name: editData.name, location: editData.location });
    } else {
      setFormData({ name: '', location: '' });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData, editData?.id);
    setFormData({ name: '', location: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editData ? 'Modifier le rucher' : 'Nouveau rucher'}</DialogTitle>
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
              {editData ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ViewRucherDialog = ({ open, onOpenChange, rucher }) => {
  const ruchesInRucher = mockRuches.filter(r => r.rucherId === rucher?.id);

  if (!rucher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            {rucher.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Emplacement</p>
              <p className="font-semibold text-slate-800">{rucher.location}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Nombre de ruches</p>
              <p className="font-semibold text-slate-800">{rucher.ruchesCount}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Statut</p>
              <p className={`font-semibold ${rucher.status === 'actif' ? 'text-emerald-600' : 'text-slate-400'}`}>
                {rucher.status === 'actif' ? 'Actif' : 'Inactif'}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Date de création</p>
              <p className="font-semibold text-slate-800">{rucher.dateCreation}</p>
            </div>
          </div>

          {ruchesInRucher.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Ruches dans ce rucher</h4>
              <div className="space-y-2">
                {ruchesInRucher.map(ruche => (
                  <div key={ruche.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Hexagon className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{ruche.numero}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ruche.etat === 'Fort' ? 'bg-emerald-100 text-emerald-700' :
                      ruche.etat === 'Moyen' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{ruche.etat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AddRucheToRucherDialog = ({ open, onOpenChange, rucher, onAdd }) => {
  const [formData, setFormData] = useState({
    numero: '',
    type: 'Dadant',
    etat: 'Moyen'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData, rucher.id);
    setFormData({ numero: '', type: 'Dadant', etat: 'Moyen' });
    onOpenChange(false);
  };

  if (!rucher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une ruche à {rucher.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Numéro de la ruche</Label>
            <Input
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              placeholder="Ex: R001"
              className="mt-1.5"
              required
            />
          </div>
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
  const [ruchers, setRuchers] = useState(initialRuchers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [addRucheDialogOpen, setAddRucheDialogOpen] = useState(false);
  const [selectedRucher, setSelectedRucher] = useState(null);
  const [editRucher, setEditRucher] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const handleAdd = (data, editId) => {
    if (editId) {
      // Edit existing
      setRuchers(ruchers.map(r => r.id === editId ? { ...r, ...data } : r));
    } else {
      // Add new
      const newRucher = {
        id: String(Date.now()),
        ...data,
        ruchesCount: 0,
        status: 'actif',
        dateCreation: new Date().toISOString().split('T')[0]
      };
      setRuchers([...ruchers, newRucher]);
    }
    setEditRucher(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rucher ?')) {
      setRuchers(ruchers.filter(r => r.id !== id));
    }
  };

  const handleView = (rucher) => {
    setSelectedRucher(rucher);
    setViewDialogOpen(true);
  };

  const handleEdit = (rucher) => {
    setEditRucher(rucher);
    setDialogOpen(true);
  };

  const handleAddRuche = (rucher) => {
    setSelectedRucher(rucher);
    setAddRucheDialogOpen(true);
  };

  const handleAddRucheSubmit = (data, rucherId) => {
    // Update rucher count
    setRuchers(ruchers.map(r => 
      r.id === rucherId ? { ...r, ruchesCount: r.ruchesCount + 1 } : r
    ));
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
          onClick={() => { setEditRucher(null); setDialogOpen(true); }}
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
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddRuche={handleAddRuche}
          />
        ))}
      </div>

      {ruchers.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Aucun rucher</h3>
          <p className="text-slate-400">Commencez par créer votre premier rucher</p>
        </div>
      )}

      <AddRucherDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAdd={handleAdd}
        editData={editRucher}
      />
      <ViewRucherDialog 
        open={viewDialogOpen} 
        onOpenChange={setViewDialogOpen} 
        rucher={selectedRucher}
      />
      <AddRucheToRucherDialog 
        open={addRucheDialogOpen} 
        onOpenChange={setAddRucheDialogOpen} 
        rucher={selectedRucher}
        onAdd={handleAddRucheSubmit}
      />
    </div>
  );
};

export default Ruchers;
