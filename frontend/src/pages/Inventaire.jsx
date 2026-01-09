import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';

const mockInventaire = [
  { id: '1', nom: 'Cadres Dadant', categorie: 'Matériel', quantite: 150, seuil: 50, prix: 3.50 },
  { id: '2', nom: 'Cire gaufrée', categorie: 'Consommable', quantite: 25, seuil: 10, prix: 18.00 },
  { id: '3', nom: 'Pots 500g', categorie: 'Conditionnement', quantite: 500, seuil: 100, prix: 0.45 },
  { id: '4', nom: 'Gants cuir', categorie: 'Protection', quantite: 5, seuil: 2, prix: 25.00 },
  { id: '5', nom: 'Enfumoir', categorie: 'Matériel', quantite: 3, seuil: 1, prix: 45.00 },
];

const Inventaire = () => {
  const [items, setItems] = useState(mockInventaire);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stocksBas = items.filter(i => i.quantite <= i.seuil).length;
  const valeurTotale = items.reduce((sum, i) => sum + (i.quantite * i.prix), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventaire</h1>
          <p className="text-slate-500">Matériel et équipement</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvel article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{items.length}</p>
                <p className="text-sm text-slate-500">Articles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm border-l-4 border-l-red-500">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stocksBas}</p>
                <p className="text-sm text-slate-500">Stocks bas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-5">
            <div>
              <p className="text-2xl font-bold text-emerald-800">{valeurTotale.toFixed(2)} €</p>
              <p className="text-sm text-emerald-600">Valeur totale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input 
          placeholder="Rechercher un article..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Article</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Prix unit.</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Valeur</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => {
              const isBas = item.quantite <= item.seuil;
              const pourcentage = Math.min((item.quantite / (item.seuil * 3)) * 100, 100);
              return (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isBas ? 'bg-red-100' : 'bg-slate-100'}`}>
                        <Package className={`w-4 h-4 ${isBas ? 'text-red-500' : 'text-slate-500'}`} />
                      </div>
                      <span className="font-medium text-slate-800">{item.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.categorie}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${isBas ? 'text-red-600' : 'text-slate-800'}`}>
                          {item.quantite}
                        </span>
                        {isBas && <AlertTriangle className="w-3 h-3 text-red-500" />}
                      </div>
                      <Progress 
                        value={pourcentage} 
                        className={`h-1.5 ${isBas ? '[&>div]:bg-red-500' : '[&>div]:bg-emerald-500'}`}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.prix.toFixed(2)} €</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {(item.quantite * item.prix).toFixed(2)} €
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-slate-100 rounded">
                        <Edit className="w-4 h-4 text-slate-400" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvel article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Nom</Label>
              <Input placeholder="Ex: Cadres Dadant" className="mt-1.5" />
            </div>
            <div>
              <Label>Catégorie</Label>
              <select className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg">
                <option>Matériel</option>
                <option>Consommable</option>
                <option>Conditionnement</option>
                <option>Protection</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Quantité</Label>
                <Input type="number" placeholder="Ex: 50" className="mt-1.5" />
              </div>
              <div>
                <Label>Prix unitaire (€)</Label>
                <Input type="number" step="0.01" placeholder="Ex: 3.50" className="mt-1.5" />
              </div>
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

export default Inventaire;
