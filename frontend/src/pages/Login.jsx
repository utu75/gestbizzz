import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Eye, EyeOff, Hexagon, Lock, Mail, ShieldCheck, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, enterPreview } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setLoading(true); setError('');
    const result = await login(email, password);
    setLoading(false);
    if (result.success) navigate('/dashboard'); else setError(result.error);
  };

  const openPreview = async () => {
    setLoading(true); await enterPreview(); navigate('/dashboard');
  };

  return (
    <main className="min-h-screen bg-[#f3f5f3] text-[#16231d] lg:grid lg:grid-cols-[1.08fr_.92fr]">
      <section className="relative hidden overflow-hidden bg-[#11261c] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 top-28 h-80 w-80 rounded-full border border-[#e6b34a]/20" />
        <div className="absolute -right-8 top-44 h-52 w-52 rounded-full border border-[#e6b34a]/20" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e5ae3c] text-[#12241b]"><Hexagon /></div>
          <div><p className="text-xl font-black tracking-tight">HKBEES</p><p className="text-xs text-[#94a69d]">Un projet développé par HK Group</p></div>
        </div>
        <div className="relative max-w-xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-[#e5ae3c]">Bee farm operating system</p>
          <h1 className="text-5xl font-black leading-[1.08] tracking-tight">Pilotez vos colonies, du rucher au pot de miel.</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#bfd0c7]">Registre terrain, visites vocales, traçabilité, équipes et équipements connectés dans une plateforme conçue pour travailler même hors réseau.</p>
          <div className="mt-8 grid gap-3 text-sm text-[#dce5e0] sm:grid-cols-2">
            {['Application hors connexion','QR par ruche','Traçabilité des lots','Sécurité et 2FA'].map(item=><div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#e5ae3c]"/>{item}</div>)}
          </div>
        </div>
        <p className="relative text-xs text-[#768c80]">Conçu pour les apiculteurs indépendants et les exploitations professionnelles</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#173426] text-[#e5ae3c]"><Hexagon className="h-5 w-5"/></div><div><p className="font-black">HKBEES</p><p className="text-xs text-slate-500">Un projet développé par HK Group</p></div></div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a6a0a]">Espace sécurisé</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Accéder à votre exploitation</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">Connectez-vous pour retrouver vos ruchers, tâches et alertes terrain.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block"><span className="mb-2 block text-sm font-bold">Adresse email</span><div className="relative"><Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400"/><input aria-label="Adresse email" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 outline-none focus:border-[#b57a12] focus:ring-2 focus:ring-[#e8bc64]/30" placeholder="vous@exploitation.com" required/></div></label>
            <label className="block"><span className="mb-2 block text-sm font-bold">Mot de passe</span><div className="relative"><Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400"/><input aria-label="Mot de passe" type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 outline-none focus:border-[#b57a12] focus:ring-2 focus:ring-[#e8bc64]/30" placeholder="Votre mot de passe" required/><button type="button" aria-label="Afficher le mot de passe" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400">{showPassword?<EyeOff className="h-5 w-5"/>:<Eye className="h-5 w-5"/>}</button></div></label>
            <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-slate-600"><input type="checkbox"/> Se souvenir de moi</label><button type="button" className="font-bold text-[#8d610d]">Mot de passe oublié ?</button></div>
            {error&&<p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}
            <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#173426] font-bold text-white transition hover:bg-[#214b37]">Se connecter <ArrowRight className="h-4 w-4"/></button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200"/>PRÉVISUALISATION<span className="h-px flex-1 bg-slate-200"/></div>
          <button onClick={openPreview} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#173426] bg-white font-bold text-[#173426] transition hover:bg-[#edf3ef]"><Smartphone className="h-4 w-4"/>Explorer la démonstration HKBEES</button>
          <p className="mt-5 text-center text-sm text-slate-500">Nouvelle exploitation ? <button onClick={()=>navigate('/inscription')} className="font-black text-[#8d610d]">Créer un compte</button></p>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-white p-4 text-xs leading-relaxed text-slate-500 shadow-sm"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"/><p>La connexion réelle et la 2FA seront reliées à l’API sécurisée. La démonstration ne contient aucun identifiant ou mot de passe public.</p></div>
        </div>
      </section>
    </main>
  );
};

export default Login;
