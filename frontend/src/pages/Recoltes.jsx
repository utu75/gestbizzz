import React, { useState } from 'react';
import {
  Wheat,
  Plus,
  Search,
  Calendar,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { mockRecoltes, mockRuchers } from '../data/mock';

const typeColors = {
  'Miel': 'bg-amber-100 text-amber-700',
  'Pollen': 'bg-yellow-100 text-yellow-700',
  'Propolis': 'bg-purple-100 text-purple-700',
  'Cire': 'bg-orange-100 text-orange-700'
};

const qualiteColors = {
  'Premium': 'bg-emerald-100 text-emerald-700',
  'Standard': 'bg-blue-100 text-blue-700',
  'Bio': 'bg-green-100 text-green-700'
};

const RecolteCard = ({ recolte }) => (
  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
            <Wheat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-800">{recolte.variete}</h3>
            <p className="text-sm text-slate-500">{recolte.rucherName}</p>
          </div>
        </div>
        <Badge className={typeColors[recolte.type]}>{recolte.type}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-sm text-slate-500 mb-1">Quantité</p>
          <p className="text-2xl font-bold text-amber-600">{recolte.quantite} <span className="text-sm text-slate-500">{recolte.unite}</span></p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-sm text-slate-500 mb-1">Date</p>
          <p className="text-sm font-semibold text-slate-800">{new Date(recolte.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Badge className={qualiteColors[recolte.qualite]}>{recolte.qualite}</Badge>
        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-600">
          Détails
        </Button>
      </div>
    </CardContent>
  </Card>
);

const AddRecolteDialog = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rucherId: '',
    type: 'Miel',
    variete: '',
    quantite: '',
    qualite: 'Standard'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const rucher = mockRuchers.find(r => r.id === formData.rucherId);
    onAdd({
      ...formData,
      rucherName: rucher?.name || '',
      quantite: parseFloat(formData.quantite),
      unite: 'kg'
    });
    setFormData({ date: new Date().toISOString().split('T')[0], rucherId: '', type: 'Miel', variete: '', quantite: '', qualite: 'Standard' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Enregistrer une Récolte</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                <option value="Miel">Miel</option>
                <option value="Pollen">Pollen</option>
                <option value="Propolis">Propolis</option>
                <option value="Cire">Cire</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Variété</Label>
              <Input
                value={formData.variete}
                onChange={(e) => setFormData({ ...formData, variete: e.target.value })}
                placeholder="Ex: Acacia, Toutes fleurs..."
                className="mt-1.5"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Quantité (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.quantite}
                onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                placeholder="Ex: 25"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Qualité</Label>
              <select 
                value={formData.qualite}
                onChange={(e) => setFormData({ ...formData, qualite: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Bio">Bio</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Recoltes = () => {
  const [recoltes, setRecoltes] = useState(mockRecoltes);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filteredRecoltes = recoltes.filter(recolte => {
    const matchesSearch = recolte.variete.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recolte.rucherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || recolte.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAdd = (data) => {
    const newRecolte = {
      id: String(recoltes.length + 1),
      ...data
    };
    setRecoltes([newRecolte, ...recoltes]);
  };

  const totalMiel = recoltes.filter(r => r.type === 'Miel').reduce((sum, r) => sum + r.quantite, 0);
  const totalPollen = recoltes.filter(r => r.type === 'Pollen').reduce((sum, r) => sum + r.quantite, 0);
  const totalPropolis = recoltes.filter(r => r.type === 'Propolis').reduce((sum, r) => sum + r.quantite, 0);
  const totalCire = recoltes.filter(r => r.type === 'Cire').reduce((sum, r) => sum + r.quantite, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Récoltes</h1>
          <p className="text-slate-500 mt-1">Suivi de votre production apicole</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-200">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/30"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle Récolte
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4">
            <p className="text-sm text-amber-700 font-medium">Miel</p>
            <p className="text-2xl font-bold text-amber-800">{totalMiel} kg</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-700 font-medium">Pollen</p>
            <p className="text-2xl font-bold text-yellow-800">{totalPollen} kg</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <p className="text-sm text-purple-700 font-medium">Propolis</p>
            <p className="text-2xl font-bold text-purple-800">{totalPropolis} kg</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <p className="text-sm text-orange-700 font-medium">Cire</p>
            <p className="text-2xl font-bold text-orange-800">{totalCire} kg</p>
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
                placeholder="Rechercher une récolte..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'Miel', 'Pollen', 'Propolis', 'Cire'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterType === type
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'all' ? 'Tous' : type}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecoltes.map((recolte) => (
          <RecolteCard key={recolte.id} recolte={recolte} />
        ))}
      </div>

      {filteredRecoltes.length === 0 && (
        <div className="text-center py-12">
          <Wheat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Aucune récolte trouvée</h3>
        </div>
      )}

      <AddRecolteDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Recoltes;
