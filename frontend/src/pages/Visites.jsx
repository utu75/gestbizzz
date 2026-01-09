import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Eye,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const initialVisites = [
  { id: '1', titre: 'Visite R042', description: 'Contrôle de la colonie', dateCreation: '21/12/2025', echeance: '22/12/2025', priorite: 'Moyenne', status: 'done' },
  { id: '2', titre: 'Récolte 15kg', description: 'Récolte du miel de printemps', dateCreation: '20/12/2025', echeance: '20/12/2025', priorite: 'Haute', status: 'done' },
  { id: '3', titre: 'Nouveau rucher', description: 'Installation du rucher T2', dateCreation: '19/12/2025', echeance: '19/12/2025', priorite: 'Basse', status: 'done' }
];

const VisiteItem = ({ visite, onEdit, onDelete, onToggle, onView }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all">
      <button 
        onClick={() => onToggle(visite.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
          visite.status === 'done' 
            ? 'bg-emerald-500 border-emerald-500' 
            : 'border-slate-300 hover:border-amber-500'
        }`}
      >
        {visite.status === 'done' && <CheckCircle className="w-4 h-4 text-white" />}
      </button>
      
      <div className="flex-1">
        <h3 className={`font-medium ${visite.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
          {visite.titre}
        </h3>
        <p className="text-sm text-slate-500">{visite.description}</p>
        <p className="text-xs text-slate-400 mt-1">
          Créée le {visite.dateCreation} • Échéance: {visite.echeance}
        </p>
      </div>
      
      <span className={`text-xs px-2 py-1 rounded-full ${
        visite.priorite === 'Haute' ? 'bg-red-100 text-red-700' :
        visite.priorite === 'Moyenne' ? 'bg-amber-100 text-amber-700' :
        'bg-emerald-100 text-emerald-700'
      }`}>
        {visite.priorite}
      </span>

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
              onClick={() => { onView(visite); setMenuOpen(false); }}
            >
              <Eye className="w-4 h-4" />
              Voir
            </button>
            <button 
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => { onEdit(visite); setMenuOpen(false); }}
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
            <button 
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              onClick={() => { onDelete(visite.id); setMenuOpen(false); }}
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AddVisiteDialog = ({ open, onOpenChange, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    echeance: new Date().toISOString().split('T')[0],
    priorite: 'Moyenne'
  });

  React.useEffect(() => {
    if (editData) {
      setFormData({
        titre: editData.titre,
        description: editData.description,
        echeance: editData.echeance,
        priorite: editData.priorite
      });
    } else {
      setFormData({
        titre: '',
        description: '',
        echeance: new Date().toISOString().split('T')[0],
        priorite: 'Moyenne'
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData, editData?.id);
    setFormData({ titre: '', description: '', echeance: new Date().toISOString().split('T')[0], priorite: 'Moyenne' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editData ? 'Modifier la visite' : 'Nouvelle visite'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Titre</Label>
            <Input 
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              placeholder="Ex: Visite de contrôle" 
              className="mt-1.5" 
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description de la visite" 
              className="mt-1.5" 
            />
          </div>
          <div>
            <Label>Échéance</Label>
            <Input 
              type="date"
              value={formData.echeance}
              onChange={(e) => setFormData({ ...formData, echeance: e.target.value })}
              className="mt-1.5" 
              required
            />
          </div>
          <div>
            <Label>Priorité</Label>
            <div className="flex gap-2 mt-1.5">
              {['Basse', 'Moyenne', 'Haute'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priorite: p })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.priorite === p
                      ? p === 'Haute' ? 'bg-red-100 text-red-700' :
                        p === 'Moyenne' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
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

const ViewVisiteDialog = ({ open, onOpenChange, visite }) => {
  if (!visite) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            {visite.titre}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Description</p>
            <p className="font-medium text-slate-800">{visite.description || 'Aucune description'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Date de création</p>
              <p className="font-semibold text-slate-800">{visite.dateCreation}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Échéance</p>
              <p className="font-semibold text-slate-800">{visite.echeance}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Priorité</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                visite.priorite === 'Haute' ? 'bg-red-100 text-red-700' :
                visite.priorite === 'Moyenne' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {visite.priorite}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">Statut</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                visite.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                visite.status === 'progress' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {visite.status === 'done' ? 'Terminée' : visite.status === 'progress' ? 'En cours' : 'À faire'}
              </span>
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

const Visites = () => {
  const [visites, setVisites] = useState(initialVisites);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedVisite, setSelectedVisite] = useState(null);
  const [editVisite, setEditVisite] = useState(null);
  const [filter, setFilter] = useState('toutes');

  const filteredVisites = visites.filter(v => {
    if (filter === 'toutes') return true;
    if (filter === 'à faire') return v.status === 'todo';
    if (filter === 'en cours') return v.status === 'progress';
    if (filter === 'terminées') return v.status === 'done';
    return true;
  });

  const stats = {
    aFaire: visites.filter(v => v.status === 'todo').length,
    enCours: visites.filter(v => v.status === 'progress').length,
    terminees: visites.filter(v => v.status === 'done').length
  };

  const handleAdd = (data, editId) => {
    if (editId) {
      setVisites(visites.map(v => v.id === editId ? { ...v, ...data } : v));
    } else {
      const newVisite = {
        id: String(Date.now()),
        ...data,
        dateCreation: new Date().toLocaleDateString('fr-FR'),
        status: 'todo'
      };
      setVisites([newVisite, ...visites]);
    }
    setEditVisite(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette visite ?')) {
      setVisites(visites.filter(v => v.id !== id));
    }
  };

  const handleToggle = (id) => {
    setVisites(visites.map(v => 
      v.id === id 
        ? { ...v, status: v.status === 'done' ? 'todo' : 'done' }
        : v
    ));
  };

  const handleView = (visite) => {
    setSelectedVisite(visite);
    setViewDialogOpen(true);
  };

  const handleEdit = (visite) => {
    setEditVisite(visite);
    setDialogOpen(true);
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
          onClick={() => { setEditVisite(null); setDialogOpen(true); }}
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
        {filteredVisites.map((visite) => (
          <VisiteItem 
            key={visite.id} 
            visite={visite}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onView={handleView}
          />
        ))}
      </div>

      {filteredVisites.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Aucune visite</h3>
          <p className="text-slate-400">Commencez par créer votre première visite</p>
        </div>
      )}

      <AddVisiteDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAdd={handleAdd}
        editData={editVisite}
      />
      <ViewVisiteDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        visite={selectedVisite}
      />
    </div>
  );
};

export default Visites;
