import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, Target, Zap, Medal } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

export const Dashboard = () => {
  const { user, modules, progress, dailyMissions, navigate } = useAppContext();

  if (!user) return null;

  // Next available module
  const availableModuleProgress = progress.find(p => p.status === 'available');
  const nextModule = availableModuleProgress ? modules.find(m => m.id === availableModuleProgress.moduleId) : null;
  
  // Stats
  const completedCount = progress.filter(p => p.status === 'completed').length;
  const totalXP = user.xp;
  
  // Current Level Progress
  const currentLevelXP = Math.pow(user.level - 1, 2) * 100;
  const nextLevelXP = Math.pow(user.level, 2) * 100;
  const xpIntoLevel = totalXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const levelProgressPercent = Math.min(100, Math.max(0, (xpIntoLevel / xpNeededForNext) * 100));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap size={160} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Olá, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-blue-100 max-w-lg text-lg">Pronto para dominar as práticas de privacidade de dados hoje? Continue sua jornada na DPONet.</p>
          
          <div className="mt-8 flex flex-wrap gap-4 items-center">
             <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center gap-4">
                <div className="bg-amber-400 p-3 rounded-full text-amber-900">
                  <Medal size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-100 font-medium">Nível {user.level}</p>
                  <p className="text-2xl font-bold">{totalXP} XP</p>
                </div>
             </div>
             <div className="flex-1 min-w-[200px] max-w-sm">
                <div className="flex justify-between text-xs text-blue-200 mb-2 font-medium">
                  <span>Nível {user.level}</span>
                  <span>Nível {user.level + 1}</span>
                </div>
                <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
                <p className="text-xs text-blue-200 mt-2 text-right">Faltam {nextLevelXP - totalXP} XP</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Col (Next classes) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Continue de onde parou</h2>
          
          {nextModule ? (
             <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden relative flex-shrink-0">
                  <img src={nextModule.videoUrl} alt={nextModule.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                     <PlayCircle size={48} className="text-white opacity-80" />
                  </div>
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-md uppercase tracking-wider">Trilha Ativa</span>
                     <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{nextModule.duration} • {nextModule.xpReward} XP</span>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">{nextModule.title}</h3>
                   <p className="text-sm text-slate-600 line-clamp-2 mb-4">{nextModule.description}</p>
                   <button 
                     onClick={() => navigate('module', nextModule.id)}
                     className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                   >
                     Iniciar Módulo
                   </button>
                </div>
             </div>
          ) : (
             <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
               <div className="inline-flex bg-emerald-100 p-4 rounded-full text-emerald-600 mb-4">
                 <Medal size={32} />
               </div>
               <h3 className="text-lg font-bold text-emerald-900 mb-2">Você completou todas as trilhas!</h3>
               <p className="text-emerald-700 text-sm">Aguarde novos conteúdos ou revise o que já aprendeu.</p>
               <button 
                 onClick={() => navigate('courses')}
                 className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
               >
                 Ver Catálogo
               </button>
             </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-medium mb-1">Módulos Concluídos</p>
              <p className="text-3xl font-bold text-slate-800">{completedCount} <span className="text-base font-normal text-slate-400">/ {modules.length}</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-medium mb-1">Taxa de Acerto (Quiz)</p>
              <p className="text-3xl font-bold text-slate-800">92%</p>
            </div>
          </div>
        </div>

        {/* Sidebar Col (Missions) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Missões Diárias</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm space-y-2">
            {dailyMissions.map(m => (
              <div key={m.id} className="p-4 rounded-xl flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  m.progress >= m.total ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  <Zap size={20} />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${m.progress >= m.total ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {m.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 gap-3">
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100">
                       <div 
                         className={`h-full rounded-full ${m.progress >= m.total ? 'bg-emerald-500' : 'bg-orange-500'}`}
                         style={{ width: `${(m.progress / m.total) * 100}%` }}
                       />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{m.progress}/{m.total}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">+{m.xpReward} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
