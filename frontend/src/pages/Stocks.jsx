import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  TrendingDown,
  ShoppingCart,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { mockStocks } from '../data/mock';

const categorieColors = {
  'Matériel': 'bg-blue-100 text-blue-700',
  'Consommable': 'bg-amber-100 text-amber-700',
  'Sanitaire': 'bg-purple-100 text-purple-700',
  'Conditionnement': 'bg-emerald-100 text-emerald-700',
  'Alimentation': 'bg-orange-100 text-orange-700',
  'Protection': 'bg-slate-100 text-slate-700'
};

const StockRow = ({ stock, onEdit, onDelete }) => {
  const pourcentage = Math.min((stock.quantite / (stock.seuil * 3)) * 100, 100);
  const isBas = stock.quantite <= stock.seuil;

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isBas ? 'bg-red-100' : 'bg-slate-100'}`}>
            <Package className={`w-5 h-5 ${isBas ? 'text-red-500' : 'text-slate-500'}`} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">{stock.nom}</p>
            <p className="text-sm text-slate-500">{stock.fournisseur}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge className={categorieColors[stock.categorie]}>{stock.categorie}</Badge>
      </td>
      <td className="px-6 py-4">
        <div className="w-32">
          <div className="flex items-center justify-between mb-1">
            <span className={`font-semibold ${isBas ? 'text-red-600' : 'text-slate-800'}`}>
              {stock.quantite} {stock.unite}
            </span>
            {isBas && <AlertTriangle className="w-4 h-4 text-red-500" />}
          </div>
          <Progress 
            value={pourcentage} 
            className={`h-2 ${isBas ? '[&>div]:bg-red-500' : '[&>div]:bg-emerald-500'}`}
          />
          <p className="text-xs text-slate-400 mt-1">Seuil: {stock.seuil} {stock.unite}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-medium text-slate-800">{stock.prix.toFixed(2)} €</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-slate-600">{(stock.quantite * stock.prix).toFixed(2)} €</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => onEdit(stock)}>
            <Edit className="w-4 h-4 text-slate-400 hover:text-amber-500" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" onClick={() => onDelete(stock.id)}>
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const AddStockDialog = ({ open, onOpenChange, onAdd }) => {
  const [formData, setFormData] = useState({
    nom: '',
    categorie: 'Matériel',
    quantite: '',
    unite: 'pcs',
    seuil: '',
    prix: '',
    fournisseur: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      quantite: parseInt(formData.quantite),
      seuil: parseInt(formData.seuil),
      prix: parseFloat(formData.prix)
    });
    setFormData({ nom: '', categorie: 'Matériel', quantite: '', unite: 'pcs', seuil: '', prix: '', fournisseur: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Ajouter un Article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Nom de l'article</Label>
            <Input
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Ex: Cadres Dadant"
              className="mt-1.5"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Catégorie</Label>
              <select 
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Matériel">Matériel</option>
                <option value="Consommable">Consommable</option>
                <option value="Sanitaire">Sanitaire</option>
                <option value="Conditionnement">Conditionnement</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Protection">Protection</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Fournisseur</Label>
              <Input
                value={formData.fournisseur}
                onChange={(e) => setFormData({ ...formData, fournisseur: e.target.value })}
                placeholder="Ex: Thomas Apiculture"
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Quantité</Label>
              <Input
                type="number"
                value={formData.quantite}
                onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                placeholder="Ex: 50"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Unité</Label>
              <select 
                value={formData.unite}
                onChange={(e) => setFormData({ ...formData, unite: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="pcs">Pièces</option>
                <option value="kg">Kg</option>
                <option value="L">Litres</option>
                <option value="paires">Paires</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Seuil alerte</Label>
              <Input
                type="number"
                value={formData.seuil}
                onChange={(e) => setFormData({ ...formData, seuil: e.target.value })}
                placeholder="Ex: 10"
                className="mt-1.5"
                required
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Prix unitaire (€)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.prix}
              onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
              placeholder="Ex: 3.50"
              className="mt-1.5"
              required
            />
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

const Stocks = () => {
  const [stocks, setStocks] = useState(mockStocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterCategorie, setFilterCategorie] = useState('all');

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stock.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategorie = filterCategorie === 'all' || stock.categorie === filterCategorie;
    return matchesSearch && matchesCategorie;
  });

  const handleAdd = (data) => {
    const newStock = {
      id: String(stocks.length + 1),
      ...data
    };
    setStocks([...stocks, newStock]);
  };

  const handleDelete = (id) => {
    setStocks(stocks.filter(s => s.id !== id));
  };

  const stocksBas = stocks.filter(s => s.quantite <= s.seuil);
  const valeurTotale = stocks.reduce((sum, s) => sum + (s.quantite * s.prix), 0);
  const categories = [...new Set(stocks.map(s => s.categorie))];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Gestion des Stocks</h1>
          <p className="text-slate-500 mt-1">Matériel et consommables apicoles</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvel Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Articles en stock</p>
              <p className="text-2xl font-bold text-slate-800">{stocks.length}</p>
            </div>
            <Package className="w-8 h-8 text-slate-300" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md border-l-4 border-l-red-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Stocks bas</p>
              <p className="text-2xl font-bold text-red-600">{stocksBas.length}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-200" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-700">Valeur totale</p>
              <p className="text-2xl font-bold text-emerald-800">{valeurTotale.toFixed(2)} €</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-emerald-300" />
          </CardContent>
        </Card>
      </div>

      {/* Alerte Stocks Bas */}
      {stocksBas.length > 0 && (
        <Card className="border-0 shadow-lg border-l-4 border-l-red-500 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <p className="font-semibold text-red-800">Attention: {stocksBas.length} article(s) en stock bas</p>
                <p className="text-sm text-red-600">
                  {stocksBas.map(s => s.nom).join(', ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un article..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterCategorie('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterCategorie === 'all'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategorie(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCategorie === cat
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Article</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Prix unit.</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Valeur</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStocks.map((stock) => (
                <StockRow key={stock.id} stock={stock} onEdit={() => {}} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
        {filteredStocks.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600">Aucun article trouvé</h3>
          </div>
        )}
      </Card>

      <AddStockDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Stocks;
