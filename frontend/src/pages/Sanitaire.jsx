import React, { useState } from 'react';
import {
  HeartPulse,
  Plus,
  Search,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Syringe,
  ClipboardCheck,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { mockSanitaire, mockRuches } from '../data/mock';

const typeIcons = {
  'Traitement': Syringe,
  'Inspection': ClipboardCheck,
  'Vaccination': Shield
};

const resultatColors = {
  'Succès': 'bg-emerald-100 text-emerald-700',
  'En cours': 'bg-amber-100 text-amber-700',
  'RAS': 'bg-blue-100 text-blue-700',
  'Échec': 'bg-red-100 text-red-700'
};

const SanitaireCard = ({ record }) => {
  const Icon = typeIcons[record.type] || HeartPulse;
  
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              record.type === 'Traitement' ? 'bg-purple-100' :
              record.type === 'Inspection' ? 'bg-blue-100' : 'bg-emerald-100'
            }`}>
              <Icon className={`w-6 h-6 ${
                record.type === 'Traitement' ? 'text-purple-600' :
                record.type === 'Inspection' ? 'text-blue-600' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{record.type}</h3>
              <p className="text-sm text-slate-500">Ruche {record.rucheNumero}</p>
            </div>
          </div>
          <Badge className={resultatColors[record.resultat]}>{record.resultat}</Badge>
        </div>

        <p className="text-slate-600 text-sm mb-4">{record.description}</p>

        {record.produit !== '-' && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-slate-50 rounded-lg">
            <Syringe className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">Produit: <strong>{record.produit}</strong></span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>{new Date(record.date).toLocaleDateString('fr-FR')}</span>
          </div>
          {record.prochainRdv && (
            <div className="flex items-center gap-2 text-amber-600">
              <Clock className="w-4 h-4" />
              <span>Prochain: {new Date(record.prochainRdv).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AddSanitaireDialog = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rucheId: '',
    type: 'Traitement',
    description: '',
    produit: '',
    resultat: 'En cours',
    prochainRdv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ruche = mockRuches.find(r => r.id === formData.rucheId);
    onAdd({
      ...formData,
      rucheNumero: ruche?.numero || '',
      produit: formData.produit || '-'
    });
    setFormData({ date: new Date().toISOString().split('T')[0], rucheId: '', type: 'Traitement', description: '', produit: '', resultat: 'En cours', prochainRdv: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Ajouter un Enregistrement Sanitaire</DialogTitle>
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
              <Label className="text-sm font-medium text-slate-700">Ruche</Label>
              <select 
                value={formData.rucheId}
                onChange={(e) => setFormData({ ...formData, rucheId: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              >
                <option value="">Sélectionner...</option>
                {mockRuches.map(r => (
                  <option key={r.id} value={r.id}>{r.numero} - {r.rucherName}</option>
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
                <option value="Traitement">Traitement</option>
                <option value="Inspection">Inspection</option>
                <option value="Vaccination">Vaccination</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Résultat</Label>
              <select 
                value={formData.resultat}
                onChange={(e) => setFormData({ ...formData, resultat: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="En cours">En cours</option>
                <option value="Succès">Succès</option>
                <option value="RAS">RAS</option>
                <option value="Échec">Échec</option>
              </select>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Description</Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description de l'intervention..."
              className="mt-1.5"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Produit utilisé</Label>
              <Input
                value={formData.produit}
                onChange={(e) => setFormData({ ...formData, produit: e.target.value })}
                placeholder="Ex: Apivar, Acide oxalique..."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Prochain RDV</Label>
              <Input
                type="date"
                value={formData.prochainRdv}
                onChange={(e) => setFormData({ ...formData, prochainRdv: e.target.value })}
                className="mt-1.5"
              />
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

const Sanitaire = () => {
  const [records, setRecords] = useState(mockSanitaire);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.rucheNumero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAdd = (data) => {
    const newRecord = {
      id: String(records.length + 1),
      ...data
    };
    setRecords([newRecord, ...records]);
  };

  const stats = {
    traitements: records.filter(r => r.type === 'Traitement').length,
    inspections: records.filter(r => r.type === 'Inspection').length,
    enCours: records.filter(r => r.resultat === 'En cours').length
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Registre Sanitaire</h1>
          <p className="text-slate-500 mt-1">Suivi des traitements et inspections</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvel Enregistrement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-md border-l-4 border-l-purple-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Traitements</p>
              <p className="text-2xl font-bold text-purple-600">{stats.traitements}</p>
            </div>
            <Syringe className="w-8 h-8 text-purple-200" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inspections</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inspections}</p>
            </div>
            <ClipboardCheck className="w-8 h-8 text-blue-200" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">En cours</p>
              <p className="text-2xl font-bold text-amber-600">{stats.enCours}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-200" />
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
                placeholder="Rechercher..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'Traitement', 'Inspection', 'Vaccination'].map((type) => (
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
        {filteredRecords.map((record) => (
          <SanitaireCard key={record.id} record={record} />
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <HeartPulse className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Aucun enregistrement trouvé</h3>
        </div>
      )}

      <AddSanitaireDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Sanitaire;
