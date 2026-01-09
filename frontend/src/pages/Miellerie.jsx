import React, { useState } from 'react';
import {
  Droplet,
  Plus,
  Package,
  Calendar,
  Search
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';

const mockRecoltes = [
  { id: '1', date: '2025-07-15', rucher: 'H2', type: 'Miel Toutes fleurs', quantite: 15, lot: 'LOT-2025-001' },
  { id: '2', date: '2025-08-20', rucher: 'H1', type: 'Miel Acacia', quantite: 22, lot: 'LOT-2025-002' },
];

const Miellerie = () => {
  const [recoltes, setRecoltes] = useState(mockRecoltes);
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalProduction = recoltes.reduce((sum, r) => sum + r.quantite, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Miellerie</h1>
          <p className="text-slate-500">Cahier de récoltes, traçabilité et conditionnement</p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvelle récolte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Droplet className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalProduction} kg</p>
                <p className="text-sm text-slate-500">Production totale</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{recoltes.length}</p>
                <p className="text-sm text-slate-500">Lots enregistrés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">2025</p>
                <p className="text-sm text-slate-500">Saison active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Droplet className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">0 kg</p>
                <p className="text-sm text-slate-500">En stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input placeholder="Rechercher une récolte..." className="pl-10" />
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rucher</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Quantité</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">N° Lot</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recoltes.map((recolte) => (
              <tr key={recolte.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-600">{recolte.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">{recolte.rucher}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                    {recolte.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">{recolte.quantite} kg</td>
                <td className="px-6 py-4 text-sm text-slate-500">{recolte.lot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle récolte</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Rucher</Label>
              <select className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg">
                <option>H1</option>
                <option>H2</option>
                <option>House</option>
              </select>
            </div>
            <div>
              <Label>Type de miel</Label>
              <Input placeholder="Ex: Miel Toutes fleurs" className="mt-1.5" />
            </div>
            <div>
              <Label>Quantité (kg)</Label>
              <Input type="number" placeholder="Ex: 15" className="mt-1.5" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Miellerie;
