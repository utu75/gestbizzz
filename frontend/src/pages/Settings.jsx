import React from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const SettingSection = ({ icon: Icon, title, description, children }) => (
  <Card className="border-0 shadow-lg">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800">{title}</CardTitle>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const SettingRow = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
    <div>
      <p className="font-medium text-slate-800">{label}</p>
      {description && <p className="text-sm text-slate-500">{description}</p>}
    </div>
    {children}
  </div>
);

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Paramètres</h1>
        <p className="text-slate-500 mt-1">Gérez les paramètres de votre compte</p>
      </div>

      <div className="grid gap-6">
        {/* Profile */}
        <SettingSection icon={User} title="Profil" description="Informations de votre compte">
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl font-bold text-white">
                {user?.avatar || 'U'}
              </div>
              <div>
                <p className="font-semibold text-lg text-slate-800">{user?.name}</p>
                <p className="text-slate-500">{user?.email}</p>
              </div>
              <Button variant="outline" className="ml-auto">
                Modifier la photo
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Nom complet</Label>
                <Input defaultValue={user?.name} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Email</Label>
                <Input defaultValue={user?.email} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Exploitation</Label>
                <Input defaultValue={user?.exploitation} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">N° NAPI</Label>
                <Input defaultValue={user?.napi} className="mt-1.5" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white">
                Enregistrer
              </Button>
            </div>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection icon={Bell} title="Notifications" description="Gérez vos préférences de notification">
          <div>
            <SettingRow label="Notifications email" description="Recevoir les alertes par email">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Alertes stock bas" description="Notification quand le stock est bas">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Rappels de tâches" description="Rappel des tâches planifiées">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Rapports hebdomadaires" description="Recevoir un résumé chaque semaine">
              <Switch />
            </SettingRow>
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection icon={Shield} title="Sécurité" description="Paramètres de sécurité du compte">
          <div>
            <SettingRow label="Mot de passe" description="Dernière modification il y a 30 jours">
              <Button variant="outline">Modifier</Button>
            </SettingRow>
            <SettingRow label="Authentification à deux facteurs" description="Ajouter une couche de sécurité">
              <Switch />
            </SettingRow>
            <SettingRow label="Sessions actives" description="Gérer les appareils connectés">
              <Button variant="ghost" className="text-amber-600">
                Voir <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </SettingRow>
          </div>
        </SettingSection>

        {/* Appearance */}
        <SettingSection icon={Palette} title="Apparence" description="Personnalisez l'interface">
          <div>
            <SettingRow label="Thème" description="Choisir le mode d'affichage">
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-amber-100 text-amber-600">
                  <Sun className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:bg-slate-200">
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </SettingRow>
            <SettingRow label="Langue" description="Langue de l'interface">
              <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </SettingRow>
          </div>
        </SettingSection>

        {/* Data */}
        <SettingSection icon={Database} title="Données" description="Gestion de vos données">
          <div>
            <SettingRow label="Exporter les données" description="Télécharger toutes vos données">
              <Button variant="outline">Exporter</Button>
            </SettingRow>
            <SettingRow label="Importer des données" description="Importer depuis un fichier CSV">
              <Button variant="outline">Importer</Button>
            </SettingRow>
            <SettingRow label="Supprimer le compte" description="Supprimer définitivement votre compte">
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                Supprimer
              </Button>
            </SettingRow>
          </div>
        </SettingSection>

        {/* Help */}
        <SettingSection icon={HelpCircle} title="Aide & Support" description="Besoin d'aide ?">
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left">
              <Globe className="w-6 h-6 text-amber-500 mb-2" />
              <p className="font-medium text-slate-800">Documentation</p>
              <p className="text-sm text-slate-500">Guide d'utilisation</p>
            </button>
            <button className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left">
              <HelpCircle className="w-6 h-6 text-amber-500 mb-2" />
              <p className="font-medium text-slate-800">FAQ</p>
              <p className="text-sm text-slate-500">Questions fréquentes</p>
            </button>
            <button className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left">
              <Bell className="w-6 h-6 text-amber-500 mb-2" />
              <p className="font-medium text-slate-800">Contact</p>
              <p className="text-sm text-slate-500">Contacter le support</p>
            </button>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

export default Settings;
