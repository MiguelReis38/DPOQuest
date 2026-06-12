import React from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { Module } from '../types';

export const Courses = () => {
  const { modules, progress, navigate } = useAppContext();

  const getStatus = (moduleId: string) => {
    return progress.find(p => p.moduleId === moduleId)?.status || 'locked';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Trilha de Aprendizado</h1>
        <p className="text-slate-600">Siga a jornada para se tornar um Ninja da Privacidade na DPONet.</p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-6 space-y-12 pb-12">
        {modules.map((m: Module, i: number) => {
          const status = getStatus(m.id);
          const isCompleted = status === 'completed';
          const isAvailable = status === 'available';
          const isLocked = status === 'locked';

          return (
            <div key={m.id} className="relative pl-8">
              {/* Timeline Marker */}
              <div className={`absolute -left-[17px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-slate-50 flex items-center justify-center
                ${isCompleted ? 'bg-emerald-500' : isAvailable ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'}`}>
                {isCompleted && <CheckCircle size={14} className="text-white" />}
                {isAvailable && <Play size={12} className="text-white" fill="currentColor" />}
                {isLocked && <Lock size={12} className="text-white" />}
              </div>

              {/* Course Card */}
              <motion.div 
                whileHover={isAvailable || isCompleted ? { scale: 1.02 } : {}}
                onClick={() => (isAvailable || isCompleted) && navigate('module', m.id)}
                className={`bg-white rounded-2xl p-6 border shadow-sm transition-all
                  ${isAvailable ? 'border-blue-200 shadow-blue-100/50 cursor-pointer ring-1 ring-blue-100' : 'border-slate-200'}
                  ${isCompleted ? 'cursor-pointer hover:border-emerald-200' : ''}
                  ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : ''}
                  flex flex-col md:flex-row gap-6
                `}
              >
                <div className="w-full md:w-56 h-36 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                  <img src={m.videoUrl} alt={m.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/20" />
                  {isLocked && (
                    <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/40 flex items-center justify-center">
                      <Lock className="text-white" size={32} />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Módulo {i + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">+{m.xpReward} XP</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-600' : 'text-slate-900'}`}>{m.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{m.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">{m.duration} de conteúdo</span>
                    
                    {isCompleted && (
                      <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <CheckCircle size={16} /> Concluído
                      </span>
                    )}
                    {isAvailable && (
                      <button className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                        Começar <Play size={16} fill="currentColor" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
