import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { mockTaches, mockRuchers } from '../data/mock';

const prioriteColors = {
  'Haute': 'bg-red-100 text-red-700 border-red-200',
  'Moyenne': 'bg-amber-100 text-amber-700 border-amber-200',
  'Basse': 'bg-emerald-100 text-emerald-700 border-emerald-200'
};

const statutColors = {
  'Planifié': 'bg-blue-100 text-blue-700',
  'En cours': 'bg-amber-100 text-amber-700',
  'Terminé': 'bg-emerald-100 text-emerald-700'
};

const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const TacheCard = ({ tache, onToggle }) => (
  <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-100">
    <button 
      onClick={() => onToggle(tache.id)}
      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
        tache.statut === 'Terminé' 
          ? 'bg-emerald-500 border-emerald-500' 
          : 'border-slate-300 hover:border-amber-500'
      }`}
    >
      {tache.statut === 'Terminé' && <CheckCircle2 className="w-full h-full text-white" />}
    </button>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <h4 className={`font-medium ${tache.statut === 'Terminé' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
          {tache.titre}
        </h4>
        <Badge className={`${prioriteColors[tache.priorite]} border text-xs`}>
          {tache.priorite}
        </Badge>
      </div>
      <p className="text-sm text-slate-500 mt-1">{tache.description}</p>
      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-3 h-3" />
          <span>{new Date(tache.date).toLocaleDateString('fr-FR')}</span>
        </div>
        {tache.rucher !== '-' && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{tache.rucher}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AddTacheDialog = ({ open, onOpenChange, onAdd, selectedDate }) => {
  const [formData, setFormData] = useState({
    titre: '',
    date: selectedDate || new Date().toISOString().split('T')[0],
    rucher: 'Tous',
    priorite: 'Moyenne',
    description: ''
  });

  React.useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      statut: 'Planifié'
    });
    setFormData({ titre: '', date: new Date().toISOString().split('T')[0], rucher: 'Tous', priorite: 'Moyenne', description: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Nouvelle Tâche</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">Titre</Label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              placeholder="Ex: Visite de contrôle"
              className="mt-1.5"
              required
            />
          </div>
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
                value={formData.rucher}
                onChange={(e) => setFormData({ ...formData, rucher: e.target.value })}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="Tous">Tous les ruchers</option>
                <option value="-">Aucun (administratif)</option>
                {mockRuchers.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Priorité</Label>
            <div className="flex gap-2 mt-1.5">
              {['Basse', 'Moyenne', 'Haute'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priorite: p })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.priorite === p
                      ? prioriteColors[p]
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">Description</Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Détails de la tâche..."
              className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 min-h-[80px] resize-none"
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

const Calendrier = () => {
  const [taches, setTaches] = useState(mockTaches);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTachesForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return taches.filter(t => t.date === dateStr);
  };

  const handleDayClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setDialogOpen(true);
  };

  const handleAdd = (data) => {
    const newTache = {
      id: String(taches.length + 1),
      ...data
    };
    setTaches([...taches, newTache]);
  };

  const handleToggle = (id) => {
    setTaches(taches.map(t => 
      t.id === id 
        ? { ...t, statut: t.statut === 'Terminé' ? 'Planifié' : 'Terminé' }
        : t
    ));
  };

  const today = new Date();
  const isToday = (day) => 
    today.getDate() === day && 
    today.getMonth() === month && 
    today.getFullYear() === year;

  const upcomingTaches = taches
    .filter(t => new Date(t.date) >= new Date() && t.statut !== 'Terminé')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Calendrier Apicole</h1>
          <p className="text-slate-500 mt-1">Planification et suivi des tâches</p>
        </div>
        <Button 
          onClick={() => { setSelectedDate(null); setDialogOpen(true); }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Tâche
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h2 className="text-xl font-semibold text-slate-800">
                {MOIS[month]} {year}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {JOURS.map(jour => (
                <div key={jour} className="text-center text-sm font-medium text-slate-500 py-2">
                  {jour}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayTaches = getTachesForDate(day);
                const hasHighPriority = dayTaches.some(t => t.priorite === 'Haute');
                
                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square p-1 rounded-lg transition-all hover:bg-amber-50 relative ${
                      isToday(day) ? 'bg-amber-500 text-white hover:bg-amber-600' : 'hover:bg-slate-100'
                    }`}
                  >
                    <span className={`text-sm font-medium ${isToday(day) ? '' : 'text-slate-700'}`}>
                      {day}
                    </span>
                    {dayTaches.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayTaches.slice(0, 3).map((t, idx) => (
                          <div 
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              t.priorite === 'Haute' ? 'bg-red-500' :
                              t.priorite === 'Moyenne' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Tâches à venir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTaches.length > 0 ? (
              upcomingTaches.map(tache => (
                <TacheCard key={tache.id} tache={tache} onToggle={handleToggle} />
              ))
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Aucune tâche à venir</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddTacheDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAdd={handleAdd}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendrier;
