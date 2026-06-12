import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Flame } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { User } from '../types';

// Mocking other user data for the leaderboard to make it look full
const MOCK_LEADERBOARD_USERS: User[] = [
  { id: 'm1', name: 'Ana Silva', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', level: 5, xp: 2150, department: 'Marketing' },
  { id: 'm2', name: 'Carlos Santos', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', level: 4, xp: 1800, department: 'TI' },
  { id: 'm3', name: 'Juliana Costa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana', level: 4, xp: 1720, department: 'RH' },
  { id: 'm4', name: 'Pedro Alves', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', level: 3, xp: 1200, department: 'Vendas' },
];

export const Leaderboard = () => {
  const { user } = useAppContext();

  // Combine real user with mock users, then sort
  const allUsers = [...MOCK_LEADERBOARD_USERS];
  if (user && !allUsers.find(u => u.id === user.id)) {
    allUsers.push(user);
  }
  
  const sortedUsers = allUsers.sort((a, b) => b.xp - a.xp);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 text-amber-600 rounded-full mb-2">
          <Trophy size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">Ranking Geral</h1>
        <p className="text-lg text-slate-600">Veja quem são os maiores defensores da privacidade na DPONet.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_120px_100px] border-b border-slate-100 p-4 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="text-center">Posição</div>
          <div>Colaborador</div>
          <div className="text-center">Nível</div>
          <div className="text-right pr-4">XP Total</div>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedUsers.map((u, i) => {
            const isCurrentUser = user?.id === u.id;
            
            let posColor = "text-slate-400 font-medium";
            let PosIcon = null;
            if (i === 0) { posColor = "text-amber-500 font-bold"; PosIcon = Trophy; }
            else if (i === 1) { posColor = "text-slate-400 font-bold"; PosIcon = Medal; }
            else if (i === 2) { posColor = "text-orange-400 font-bold"; PosIcon = Medal; }

            return (
              <motion.div 
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`grid grid-cols-[80px_1fr_120px_100px] items-center p-4 transition-colors ${
                  isCurrentUser ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className={`text-center text-lg ${posColor} flex justify-center items-center gap-1`}>
                  {PosIcon ? <PosIcon size={20} /> : `#${i + 1}`}
                </div>
                
                <div className="flex items-center gap-4">
                  <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full border-2 border-slate-100 bg-white" />
                  <div>
                    <h3 className={`font-bold ${isCurrentUser ? 'text-blue-700' : 'text-slate-800'}`}>
                      {u.name} {isCurrentUser && '(Você)'}
                    </h3>
                    <p className="text-xs text-slate-500">{u.department}</p>
                  </div>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">
                    Lvl {u.level}
                  </span>
                </div>

                <div className="text-right pr-4">
                  <p className="font-bold text-slate-900">{u.xp}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
