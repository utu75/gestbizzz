import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, Check, ChevronRight, Cloud, Droplets,
  Fingerprint, Hexagon, Mic, QrCode, ShieldCheck, Smartphone,
  Sparkles, WifiOff,
} from "lucide-react";

const capabilities = [
  [QrCode, "Une identité pour chaque ruche", "QR imprimable, fiche colonie, reine, historique et interventions accessibles sur le terrain."],
  [Mic, "Visites vocales mains libres", "Dictez vos observations pendant la visite et transformez-les en registre structuré."],
  [Droplets, "Traçabilité du rucher au lot", "Récoltes, maturateurs, analyses, conditionnement et lots réunis dans une chaîne lisible."],
  [WifiOff, "Pensé pour le hors connexion", "Continuez la tournée sans réseau et synchronisez les données dès que la connexion revient."],
  [BarChart3, "Pilotage de l’exploitation", "Alertes, calendrier, coûts, rendement et rapports pour décider sans tableurs dispersés."],
  [Cloud, "Capteurs et équipements", "Une base prête pour les balances, stations météo, caméras et alertes connectées."],
];

const Landing = () => (
  <main className="min-h-screen overflow-hidden bg-[#f4f6f2] text-[#13231b]">
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#102219]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e5ae3c] text-[#102219]"><Hexagon className="h-5 w-5" /></span>
          <span><b className="block tracking-tight">HKBEES</b><span className="block text-[9px] uppercase tracking-[.18em] text-[#8da096]">Gestion apicole</span></span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-[#c5d0ca] md:flex">
          <a href="#solution" className="hover:text-white">Solution</a>
          <a href="#metier" className="hover:text-white">Métiers</a>
          <a href="#offres" className="hover:text-white">Offres</a>
          <Link to="/login" className="hover:text-white">Connexion</Link>
        </div>
        <Link to="/inscription" className="flex items-center gap-2 rounded-lg bg-[#e5ae3c] px-4 py-2 text-sm font-black text-[#102219]">Créer mon espace <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </nav>

    <section className="relative bg-[#102219] pb-20 pt-28 text-white lg:pb-28 lg:pt-36">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_75%_25%,#e5ae3c_0,transparent_28%),radial-gradient(circle_at_10%_80%,#4d8c69_0,transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5ae3c]/30 bg-[#e5ae3c]/10 px-3 py-1.5 text-xs font-bold text-[#f0c66f]"><Sparkles className="h-3.5 w-3.5" /> Le système d’exploitation de votre rucher</div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-.035em] sm:text-6xl">Chaque colonie suivie.<br /><span className="text-[#e5ae3c]">Chaque récolte traçable.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#bbcbc2]">HKBEES réunit registre apicole, travail terrain, santé des colonies et miellerie dans un logiciel clair, mobile et prêt pour les exploitations professionnelles.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/inscription" className="flex items-center gap-2 rounded-xl bg-[#e5ae3c] px-5 py-3.5 font-black text-[#102219]">Démarrer avec HKBEES <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/login" className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-bold">Voir la démonstration <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9eb0a6]">{["Aucune carte requise", "Données isolées", "Compatible mobile"].map(x => <span key={x} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e5ae3c]" />{x}</span>)}</div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[2rem] border border-[#e5ae3c]/15" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#f7f8f6] p-4 text-[#17231d] shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /><span className="text-xs font-bold">Exploitation synchronisée</span></div><span className="text-[10px] text-slate-400">Aujourd’hui · 08:42</span></div>
            <div className="grid grid-cols-3 gap-2">{[["48", "Colonies"], ["3", "Ruchers"], ["2", "Alertes"]].map(([v,l],i)=><div key={l} className={`rounded-xl p-3 ${i===2?'bg-red-50':'bg-white'}`}><b className="text-2xl">{v}</b><p className="text-[10px] text-slate-500">{l}</p></div>)}</div>
            <div className="mt-3 rounded-xl bg-[#173426] p-4 text-white"><p className="text-[10px] font-bold uppercase tracking-widest text-[#efc66e]">Prochaine tournée</p><div className="mt-3 flex items-center justify-between"><div><b>Rucher des Hauts</b><p className="text-xs text-[#aec0b6]">12 ruches · 3 actions</p></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e5ae3c] text-[#173426]"><Mic className="h-4 w-4" /></span></div></div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-xs font-bold">LOT-2026-018</p><p className="mt-1 text-[10px] text-slate-400">62 kg · Toutes fleurs</p></div><div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-xs font-bold">Ruche H2-014</p><p className="mt-1 text-[10px] text-amber-700">Contrôle réserves</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <section id="solution" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.2em] text-[#98680d]">Une plateforme, tout le cycle</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Du premier contrôle de printemps jusqu’au pot étiqueté.</h2><p className="mt-4 leading-7 text-slate-600">Une donnée saisie une fois, réutilisée dans le registre, les alertes, les rapports et la traçabilité.</p></div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(([Icon,title,text])=><article key={title} className="rounded-2xl border border-[#dfe5df] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf0ec] text-[#214c36]"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></article>)}</div>
    </section>

    <section id="metier" className="bg-[#e9eee9] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div><p className="text-xs font-black uppercase tracking-[.2em] text-[#98680d]">Conçu pour le métier</p><h2 className="mt-3 text-3xl font-black tracking-tight">Un registre vivant, pas une archive à remplir le soir.</h2><p className="mt-4 leading-7 text-slate-600">Chaque opération alimente automatiquement l’historique de la ruche, le registre sanitaire et le suivi de production.</p></div>
        <div className="grid gap-3">{["Ruchers, emplacements et transhumances", "Colonies, reines, divisions, greffages et MiniPlus", "Traitements, ordonnances et délais avant récolte", "Récoltes, extraction, maturation et conditionnement", "Stocks, équipements, coûts et maintenance", "Exports réglementaires et rapports d’exploitation"].map((x,i)=><div key={x} className="flex items-center gap-4 rounded-xl bg-white px-4 py-3.5 shadow-sm"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#173426] text-xs font-black text-[#e5ae3c]">{i+1}</span><span className="text-sm font-bold">{x}</span></div>)}</div>
      </div>
    </section>

    <section id="offres" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="rounded-3xl bg-[#173426] p-7 text-white sm:p-10 lg:flex lg:items-center lg:justify-between"><div className="max-w-2xl"><div className="flex items-center gap-2 text-[#efc66e]"><Fingerprint className="h-5 w-5" /><span className="text-xs font-black uppercase tracking-widest">Votre exploitation, vos données</span></div><h2 className="mt-4 text-3xl font-black">Commencez simplement. Équipez-vous à votre rythme.</h2><p className="mt-3 text-sm leading-6 text-[#b9cbc1]">Des offres adaptées au nombre de ruches, avec migration progressive vers les capteurs et l’intelligence artificielle.</p></div><Link to="/inscription" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#e5ae3c] px-5 py-3.5 font-black text-[#102219] lg:mt-0">Choisir mon offre <ArrowRight className="h-4 w-4" /></Link></div>
    </section>

    <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 font-black text-[#173426]"><Hexagon className="h-5 w-5 text-[#c68b1d]" /> HKBEES</div><p>Logiciel autonome de gestion apicole · Un projet développé par HK Group</p><div className="flex gap-4"><ShieldCheck className="h-4 w-4" /><Smartphone className="h-4 w-4" /></div></div></footer>
  </main>
);

export default Landing;
