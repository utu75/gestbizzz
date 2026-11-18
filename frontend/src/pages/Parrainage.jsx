import React from 'react';
import {
  Gift,
  Users,
  Heart,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Parrainage = () => {
  const referralCode = 'HKBEES-DEMO26';
  const referralLink = `${window.location.origin}/ref/${referralCode}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Parrainage</h1>
        <p className="text-slate-500">Partagez HKBEES et gagnez des avantages</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">0</p>
                <p className="text-sm text-slate-500">Filleuls</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">0 €</p>
                <p className="text-sm text-slate-500">Récompenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">1</p>
                <p className="text-sm text-slate-500">Mois offert</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Votre lien de parrainage</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-500 mb-1 block">Code parrain</label>
              <div className="flex gap-2">
                <Input value={referralCode} readOnly className="bg-slate-50" />
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(referralCode)}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copier
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500 mb-1 block">Lien de parrainage</label>
              <div className="flex gap-2">
                <Input value={referralLink} readOnly className="bg-slate-50 text-sm" />
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(referralLink)}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copier
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="gap-2 bg-blue-500 hover:bg-blue-600 text-white">
              <Share2 className="w-4 h-4" />
              Partager sur Facebook
            </Button>
            <Button className="gap-2 bg-sky-500 hover:bg-sky-600 text-white">
              <Share2 className="w-4 h-4" />
              Partager sur Twitter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Comment ça marche ?</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-1">Partagez</h3>
              <p className="text-sm text-slate-500">Envoyez votre lien à vos amis apiculteurs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-1">Inscription</h3>
              <p className="text-sm text-slate-500">Votre filleul s'inscrit avec votre code</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-1">Récompenses</h3>
              <p className="text-sm text-slate-500">Recevez 1 mois gratuit pour chaque parrainage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Parrainage;
