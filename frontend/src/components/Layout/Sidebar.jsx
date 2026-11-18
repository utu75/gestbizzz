import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, ChevronRight, Droplets, Hexagon, LayoutDashboard, LogOut, MapPin, Package, Settings, Sparkles, Warehouse } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const groups = [
  ['Pilotage', [[LayoutDashboard,'Vue d’ensemble','/dashboard'],[CalendarDays,'Visites & tâches','/visites']]],
  ['Cheptel', [[MapPin,'Ruchers','/ruchers'],[Hexagon,'Ruches & colonies','/ruches']]],
  ['Production', [[Droplets,'Miellerie & lots','/miellerie'],[Package,'Matériel','/inventaire'],[Warehouse,'Atelier','/atelier']]],
  ['Administration', [[Sparkles,'Rapports','/rapports'],[Settings,'Paramètres','/parametres']]],
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  return <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-[#102219] text-white lg:flex">
    <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5"><div className="grid h-9 w-9 place-items-center rounded-lg bg-[#e4ad3e] text-[#102219]"><Hexagon className="h-5 w-5"/></div><div><p className="font-black tracking-tight">HKBEES</p><p className="text-[10px] text-[#8ca095]">BY HK GROUP</p></div></div>
    <div className="border-b border-white/10 px-5 py-5"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#789083]">Exploitation active</p><p className="mt-2 truncate text-sm font-bold">{user?.exploitation}</p><div className="mt-3 flex items-center justify-between"><span className="rounded bg-[#e4ad3e]/15 px-2 py-1 text-[10px] font-bold uppercase text-[#efc66e]">Offre {user?.plan}</span><ChevronRight className="h-4 w-4 text-[#6f8478]"/></div></div>
    <nav className="flex-1 overflow-y-auto px-3 py-5">{groups.map(([label,items])=><div key={label} className="mb-5"><p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.18em] text-[#667d70]">{label}</p>{items.map(([Icon,name,path])=><NavLink key={path} to={path} className={({isActive})=>`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${isActive?'bg-white/10 font-bold text-white':'text-[#b5c2bb] hover:bg-white/5 hover:text-white'}`}><Icon className="h-4 w-4 text-[#d9a43d]"/>{name}</NavLink>)}</div>)}</nav>
    <div className="border-t border-white/10 p-4"><button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#aab9b1] hover:bg-red-500/10 hover:text-red-200"><LogOut className="h-4 w-4"/>Déconnexion</button><p className="mt-3 px-3 text-[9px] text-[#53685d]">Pilote 0.2 · HK Group</p></div>
  </aside>;
};
export default Sidebar;
