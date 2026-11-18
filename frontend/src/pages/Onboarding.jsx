import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Hexagon,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const options = [
  ["beginner", "Débutant", "1 à 10 ruches"],
  ["pro", "Pro", "11 à 399 ruches"],
  ["farm", "Exploitation", "400 à 999 ruches"],
  ["enterprise", "Entreprise", "1 000+ ruches"],
];
export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("pro");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("PF");
  const { enterPreview } = useAuth();
  const navigate = useNavigate();
  const finish = async () => {
    await enterPreview();
    navigate("/dashboard");
  };
  return (
    <main className="min-h-screen bg-[#f4f6f4] text-[#18251f]">
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Connexion
        </button>
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#173426] text-[#e4ad3e]">
            <Hexagon className="h-4 w-4" />
          </div>
          <span className="font-black">HKBEES</span>
        </div>
        <span className="text-xs text-slate-400">Étape {step} / 3</span>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-[#d9a43d] transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        {step === 1 && (
          <section>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#9a6a0a]">
              Votre exploitation
            </p>
            <h1 className="mt-2 text-3xl font-black">
              Créons votre espace HKBEES
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Ces informations pourront être modifiées plus tard.
            </p>
            <div className="mt-8 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-bold">
                  Nom de l’exploitation
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3"
                  placeholder="Ex. Miellerie des Îles"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-bold">
                  Pays ou territoire
                </span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3"
                >
                  <option value="PF">Polynésie française</option>
                  <option value="FR">France</option>
                  <option value="HT">Haïti</option>
                  <option value="OTHER">Autre</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm font-bold">Langue</span>
                <select className="h-11 w-full rounded-lg border border-slate-300 px-3">
                  <option>Français</option>
                  <option>English</option>
                </select>
              </label>
            </div>
          </section>
        )}
        {step === 2 && (
          <section>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#9a6a0a]">
              Dimensionnement
            </p>
            <h1 className="mt-2 text-3xl font-black">
              Combien de ruches gérez-vous ?
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Nous préparons les fonctions et quotas adaptés à votre activité.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {options.map(([id, label, range]) => (
                <button
                  key={id}
                  onClick={() => setPlan(id)}
                  className={`flex items-center justify-between rounded-xl border bg-white p-5 text-left ${plan === id ? "border-[#c68c20] ring-2 ring-[#e8bd67]/30" : "border-slate-200"}`}
                >
                  <div>
                    <p className="font-black">{label}</p>
                    <p className="mt-1 text-xs text-slate-400">{range}</p>
                  </div>
                  {plan === id && (
                    <Check className="h-5 w-5 text-emerald-700" />
                  )}
                </button>
              ))}
            </div>
          </section>
        )}
        {step === 3 && (
          <section>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#9a6a0a]">
              Sécurité et démarrage
            </p>
            <h1 className="mt-2 text-3xl font-black">
              Votre espace est prêt à être configuré
            </h1>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#edf3ef] text-[#24513a]">
                  <MapPin />
                </div>
                <div>
                  <p className="font-black">
                    {name || "Nouvelle exploitation"}
                  </p>
                  <p className="text-sm text-slate-400">
                    Offre {options.find((o) => o[0] === plan)?.[1]} · {country}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  <p className="mt-2 text-sm font-black">
                    2FA proposée au premier accès
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Passkey ou application d’authentification.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <Hexagon className="h-5 w-5 text-[#a26e0e]" />
                  <p className="mt-2 text-sm font-black">
                    Assistant de prise en main
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Importez ou créez votre premier rucher.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="mt-8 flex justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold disabled:opacity-30"
          >
            Retour
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-lg bg-[#173426] px-5 py-2.5 text-sm font-black text-white"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              className="flex items-center gap-2 rounded-lg bg-[#173426] px-5 py-2.5 text-sm font-black text-white"
            >
              Ouvrir HKBEES
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
