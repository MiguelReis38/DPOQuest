import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Flame, CalendarHeart, FileBadge2, Download } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { Badge } from '../types';

export const Profile = () => {
  const { user, badges, userBadges, progress, modules } = useAppContext();

  if (!user) return null;

  const completedModules = progress.filter(p => p.status === 'completed').length;
  const isFullyCompleted = completedModules === modules.length;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame': return Flame;
      case 'Shield': return Shield;
      case 'CalendarHeart': return CalendarHeart;
      case 'Award': return Award;
      default: return Award;
    }
  };

  const currentLevelXP = Math.pow(user.level - 1, 2) * 100;
  const nextLevelXP = Math.pow(user.level, 2) * 100;
  const xpIntoLevel = user.xp - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const p = Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForNext) * 100));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100 shrink-0">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-4 border-white shadow-sm">
            {user.level}
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{user.name}</h1>
          <p className="text-slate-500 font-medium mb-6">{user.department}</p>
          
          <div className="max-w-md">
             <div className="flex justify-between items-end mb-2">
               <span className="text-sm font-bold text-slate-700">Progresso do Nível</span>
               <span className="text-sm text-slate-500 font-medium">{user.xp} / {nextLevelXP} XP</span>
             </div>
             <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${p}%` }} />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Badges */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award className="text-amber-500" />
            Minhas Conquistas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {badges.map((b: Badge) => {
              const earned = userBadges.some(ub => ub.badgeId === b.id);
              const Icon = getIcon(b.iconName);
              
              return (
                <div 
                  key={b.id} 
                  className={`p-4 rounded-2xl border ${
                    earned ? 'bg-slate-50 border-slate-200' : 'bg-white border-dashed border-slate-200 opacity-60 grayscale'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    earned ? 'bg-white shadow-sm' : 'bg-slate-100'
                  }`}>
                    <Icon size={24} className={earned ? b.color : 'text-slate-400'} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FileBadge2 className="text-blue-500" />
            Certificados
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            {isFullyCompleted ? (
              <>
                <FileBadge2 size={64} className="text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Formação DPO Jovem</h3>
                <p className="text-slate-600 mb-6 text-sm max-w-xs">
                  Parabéns! Você concluiu a trilha básica e está apto a proteger dados como um mestre.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors">
                  <Download size={18} /> Baixar Certificado
                </button>
              </>
            ) : (
              <>
                <Shield size={48} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 mb-2">Certificado Bloqueado</h3>
                <p className="text-slate-500 text-sm max-w-xs mb-6">
                  Complete todas as trilhas ({completedModules}/{modules.length}) para emitir seu certificado oficial da DPONet.
                </p>
                <div className="w-full max-w-xs h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-blue-400" 
                     style={{ width: `${(completedModules / modules.length) * 100}%` }} 
                   />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
