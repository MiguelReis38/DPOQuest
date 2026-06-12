import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, PlayCircle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { db } from '../data/db';

export const ModuleView = () => {
  const { activeModuleId, modules, navigate, user, refreshDb } = useAppContext();
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz' | 'result'>('content');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const module = modules.find(m => m.id === activeModuleId);

  if (!module || !user) return null;

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setQuizScore(0);
  };

  const handleAnswer = (optionIndex: number) => {
    if (isAnswering) return;
    
    setSelectedOption(optionIndex);
    setIsAnswering(true);
    
    const question = module.questions[currentQuestionIndex];
    const isCorrect = optionIndex === question.correctOptionIndex;
    
    if (isCorrect) setQuizScore(prev => prev + 1);

    // Save to simulated DB
    db.saveResponse({
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      moduleId: module.id,
      questionId: question.id,
      selectedOptionIndex: optionIndex,
      isCorrect,
      timestamp: new Date().toISOString()
    });

    // Update Missions
    if (isCorrect) db.updateMissionProgress('dm2', 1); // "Acerte 2 perguntas seguidas"
    db.updateMissionProgress('dm1', 1); // "Assista a 1 lição" / participar

    setTimeout(() => {
      setSelectedOption(null);
      setIsAnswering(false);
      
      if (currentQuestionIndex < module.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Finish module
        const finalScore = isCorrect ? quizScore + 1 : quizScore;
        const passed = finalScore === module.questions.length;
        
        db.updateProgress(user.id, module.id, 'completed', finalScore);
        db.updateUserXP(user.id, module.xpReward);
        
        // Award badge based on conditions
        if (module.id === 'm1') db.awardBadge(user.id, 'b1');
        if (passed) db.awardBadge(user.id, 'b2');

        refreshDb(); // Update global state
        setCurrentStep('result');
      }
    }, 2500); // Wait 2.5s to show explanation before moving on
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6 pb-20">
      <button 
        onClick={() => navigate('courses')}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium mb-4"
      >
        <ArrowLeft size={20} /> Voltar para Trilhas
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
        
        {/* Step: Content */}
        {currentStep === 'content' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-full aspect-video bg-slate-900 relative">
               <img src={module.videoUrl} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={80} className="text-white hover:text-blue-400 transition-colors cursor-pointer" />
               </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs rounded-full inline-block">+{module.xpReward} XP</span>
                <span className="text-sm font-medium text-slate-500">Duração: {module.duration}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{module.title}</h1>
              <div className="prose prose-slate prose-lg max-w-none mb-10">
                <p className="text-slate-600 leading-relaxed text-lg">{module.content}</p>
              </div>

              <div className="flex justify-end pt-6 border-t border-slate-100">
                <button 
                  onClick={handleStartQuiz}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all flex items-center gap-3"
                >
                  Fazer o Quiz para Concluir <ArrowLeft size={20} className="rotate-180" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step: Quiz */}
        {currentStep === 'quiz' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 md:p-12 min-h-[500px] flex flex-col">
            <div className="mb-8">
               <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
                 Pergunta {currentQuestionIndex + 1} de {module.questions.length}
               </p>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-blue-600 transition-all duration-300" 
                   style={{ width: `${((currentQuestionIndex) / module.questions.length) * 100}%` }}
                 />
               </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-8">{module.questions[currentQuestionIndex].text}</h2>

            <div className="space-y-4 flex-1">
               {module.questions[currentQuestionIndex].options.map((opt, idx) => {
                 const isSelected = selectedOption === idx;
                 const isCorrectAnswer = idx === module.questions[currentQuestionIndex].correctOptionIndex;
                 
                 let btnClass = "border-slate-200 hover:bg-slate-50 hover:border-blue-300 text-slate-700";
                 if (isAnswering) {
                   if (isCorrectAnswer) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 font-medium";
                   else if (isSelected && !isCorrectAnswer) btnClass = "bg-red-50 border-red-500 text-red-800";
                   else btnClass = "border-slate-100 text-slate-400 opacity-50";
                 }

                 return (
                   <button
                     key={idx}
                     disabled={isAnswering}
                     onClick={() => handleAnswer(idx)}
                     className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${btnClass} flex items-center justify-between group`}
                   >
                     <span className="text-lg">{opt}</span>
                     {isAnswering && isCorrectAnswer && <CheckCircle className="text-emerald-500" />}
                   </button>
                 );
               })}
            </div>

            <AnimatePresence>
               {isAnswering && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className={`p-6 mt-8 rounded-2xl ${
                     selectedOption === module.questions[currentQuestionIndex].correctOptionIndex 
                     ? 'bg-emerald-100/50 text-emerald-800' 
                     : 'bg-orange-100/50 text-orange-800'
                   }`}
                 >
                   <p className="font-bold flex items-center gap-2 mb-2">
                     {selectedOption === module.questions[currentQuestionIndex].correctOptionIndex ? '🎉 Mandou bem!' : 'Ops, quase lá!'}
                   </p>
                   <p>{module.questions[currentQuestionIndex].explanation}</p>
                 </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Step: Result */}
        {currentStep === 'result' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
             <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} />
             </div>
             <h2 className="text-3xl font-bold text-slate-900 mb-2">Módulo Concluído!</h2>
             <p className="text-slate-600 text-lg mb-8">Você acertou {quizScore} de {module.questions.length} perguntas.</p>
             
             <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl w-full max-w-sm mb-8 relative overflow-hidden">
                <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-widest">Recompensa</p>
                <p className="text-4xl font-black text-amber-500">+{module.xpReward} XP</p>
             </div>

             <button 
               onClick={() => navigate('courses')}
               className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
             >
               Voltar para o Catálogo
             </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
