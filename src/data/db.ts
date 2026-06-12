import { User, Module, Progress, ResponseRecord, Badge, UserBadge, DailyMission } from '../types';

const INITIAL_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Módulo 1: O Que é a LGPD?',
    description: 'Entenda os conceitos básicos da Lei Geral de Proteção de Dados e por que ela é tão importante.',
    duration: '10 min',
    xpReward: 100,
    videoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    content: 'A LGPD (Lei Geral de Proteção de Dados) veio para dar a todos nós mais controle sobre nossas informações pessoais. Lembra quando você preenchia um cadastro e nem sabia para onde seus dados iam? Isso mudou! Agora, empresas como a DPONet precisam cuidar dessas informações com todo o carinho e segurança.',
    questions: [
      {
        id: 'q1-1',
        text: 'Qual o principal objetivo da LGPD?',
        options: [
          'Aumentar os lucros vendendo dados.',
          'Proteger os direitos fundamentais de liberdade e privacidade.',
          'Proibir transações na internet.',
          'Nenhuma das anteriores.'
        ],
        correctOptionIndex: 1,
        explanation: 'A LGPD visa proteger os direitos fundamentais de liberdade e privacidade de nós, os titulares dos dados.'
      },
      {
        id: 'q1-2',
        text: 'O que é considerado um Dado Pessoal?',
        options: [
          'Qualquer informação relacionada a uma pessoa identificada ou identificável.',
          'Apenas o número do CPF.',
          'Somente dados financeiros de empresas.',
          'Informações sobre animais de estimação.'
        ],
        correctOptionIndex: 0,
        explanation: 'Exatamente! Nome, CPF, e-mail, e até dados que em conjunto possam te identificar, são dados pessoais.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Módulo 2: Os Donos dos Dados',
    description: 'Nós somos os titulares dos nossos dados. Descubra os nossos direitos e como exercê-los.',
    duration: '15 min',
    xpReward: 150,
    videoUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    content: 'Os donos dos dados têm direitos incríveis! Podemos confirmar se a DPONet trata nossos dados, pedir para corrigir algo errado ou até deletar informações que não precisam mais estar lá. E quando um cliente pede isso, precisamos estar prontos para atender rapidinho!',
    questions: [
      {
        id: 'q2-1',
        text: 'Se um cliente pedir para ver quais dados temos dele, o que fazemos?',
        options: [
          'Fingimos que não vimos e ignoramos.',
          'Fornecemos a informação, pois é um direito dele ter acesso aos dados.',
          'Ligamos para a polícia.',
          'Pedimos para ele pagar uma taxa para ver as informações.'
        ],
        correctOptionIndex: 1,
        explanation: 'O titular tem o direito de Acesso. Temos que mostrar direitinho o que temos!'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Módulo 3: O Guardião dos Dados (DPO)',
    description: 'Conheça o Encarregado pelo Tratamento de Dados e o papel fundamental que ele desempenha.',
    duration: '12 min',
    xpReward: 120,
    videoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    content: 'O DPO (Data Protection Officer), ou Encarregado, é como um super-herói guardião dos dados na empresa. Ele é o ponto de contato entre a DPONet, os clientes e até a Autoridade Nacional de Proteção de Dados (ANPD). Se você ficar com dúvida se pode compartilhar um dado, o DPO é a pessoa que você deve chamar!',
    questions: [
      {
        id: 'q3-1',
        text: 'Qual o papel do DPO?',
        options: [
          'Ser o guarda que fica na porta da empresa.',
          'Consertar os computadores quando quebram.',
          'Ser o canal de comunicação entre a empresa, os titulares dos dados e a ANPD.',
          'Vender dados para parceiros.'
        ],
        correctOptionIndex: 2,
        explanation: 'Ele é a ponte! O comunicador oficial em assuntos de LGPD.'
      }
    ]
  },
  {
    id: 'm4',
    title: 'Módulo 4: Ops, vazou! E agora?',
    description: 'Aprenda o que é um incidente de segurança e os passos emergenciais a tomar.',
    duration: '20 min',
    xpReward: 200,
    videoUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80',
    content: 'Aconteceu o pior? Um email com dados confidenciais foi para a pessoa errada, ou um pendrive foi perdido? Isso é um Incidente de Segurança! Em caso de suspeita, nunca finja que nada aconteceu. Notifique o time de Segurança da Informação e o DPO imediatamente!',
    questions: [
      {
        id: 'q4-1',
        text: 'Se você perceber que houve um vazamento de dados na sua área, como você age?',
        options: [
          'Apaga todas as provas e foge.',
          'Tenta resolver sozinho sem falar com ninguém.',
          'Avisa imediatamente o DPO ou a área de Segurança da Informação.',
          'Posta nas redes sociais para alertar os clientes.'
        ],
        correctOptionIndex: 2,
        explanation: 'Isso! Transparência e agilidade são fundamentais para conter o problema.'
      }
    ]
  },
  {
    id: 'm5',
    title: 'Módulo 5: LGPD no Dia a Dia',
    description: 'Como aplicar a LGPD nas tarefas cotidianas e manter o ambiente seguro.',
    duration: '15 min',
    xpReward: 150,
    videoUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    content: 'Na prática, LGPD é sobre evitar vacilos. Não deixar senhas anotadas em postits colados no monitor, não enviar planilhas cheias de CPFs no WhatsApp e até bloquear a tela do computador quando for buscar um café. Com pequenas ações, você ajuda a DPONet a ser gigante na proteção de dados!',
    questions: [
      {
        id: 'q5-1',
        text: 'Se você precisa ir tomar um café, qual a atitude correta com o seu computador?',
        options: [
          'Deixar a tela ligada para os colegas verem que você está trabalhando.',
          'Pressionar a combinação de teclas para bloquear a tela (Win+L / Cmd+Ctrl+Q).',
          'Aumentar o volume da música e sair.',
          'Pedir pro colega do lado cuidar.'
        ],
        correctOptionIndex: 1,
        explanation: 'Boa! O "Clear Desk / Clear Screen" é uma regra de ouro.'
      }
    ]
  }
];

const INITIAL_BADGES: Badge[] = [
  { id: 'b1', title: 'Primeiros Passos', description: 'Concluiu o primeiro módulo.', iconName: 'Flame', color: 'text-orange-500' },
  { id: 'b2', title: 'Ninja da Privacidade', description: 'Acertou tudo de primeira.', iconName: 'Shield', color: 'text-blue-500' },
  { id: 'b3', title: 'Curioso', description: 'Realizou atividades 3 dias seguidos.', iconName: 'CalendarHeart', color: 'text-purple-500' },
  { id: 'b4', title: 'DPO Júnior', description: 'Terminou todas as trilhas disponíveis.', iconName: 'Award', color: 'text-amber-400' }
];

export class SimulatedSQLDB {
  private get<T>(key: string): T | null {
    const data = localStorage.getItem(`dpoquest_${key}`);
    return data ? JSON.parse(data) : null;
  }

  private set<T>(key: string, data: T): void {
    localStorage.setItem(`dpoquest_${key}`, JSON.stringify(data));
  }

  init() {
    console.log('[SimulatedSQLDB] Inicializando banco de dados SQL simulado...');
    if (!this.get('users')) {
      this.set('users', [{ id: 'u1', name: 'Funcionario DPONet', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Func', level: 1, xp: 0, department: 'Operações' }]);
    }
    if (!this.get('modules')) this.set('modules', INITIAL_MODULES);
    if (!this.get('progress')) {
      const initialProgress: Progress[] = INITIAL_MODULES.map((m, i) => ({
        userId: 'u1',
        moduleId: m.id,
        status: i === 0 ? 'available' : 'locked' // First module available, rest locked
      }));
      this.set('progress', initialProgress);
    }
    if (!this.get('responses')) this.set('responses', []);
    if (!this.get('badges')) this.set('badges', INITIAL_BADGES);
    if (!this.get('user_badges')) this.set('user_badges', []);
    if (!this.get('daily_missions')) {
       this.set('daily_missions', [
         { id: 'dm1', title: 'Assista a 1 lição', xpReward: 50, progress: 0, total: 1 },
         { id: 'dm2', title: 'Acerte 2 perguntas seguidas', xpReward: 80, progress: 0, total: 2 },
       ]);
    }
  }

  // --- Users ---
  getUser(userId: string): User | undefined {
    return this.get<User[]>('users')?.find(u => u.id === userId);
  }

  updateUserXP(userId: string, addedXP: number) {
    const users = this.get<User[]>('users') || [];
    const index = users.findIndex(u => u.id === userId);
    if (index > -1) {
      users[index].xp += addedXP;
      // XP Thresholds for levels: Lvl 1: 0, Lvl 2: 150, Lvl 3: 400, Lvl 4: 800...
      const newLevel = Math.floor(Math.sqrt(users[index].xp / 100)) + 1;
      users[index].level = newLevel;
      this.set('users', users);
    }
  }

  // --- Modules ---
  getModules(): Module[] {
    return this.get<Module[]>('modules') || [];
  }

  getModule(moduleId: string): Module | undefined {
    return this.getModules().find(m => m.id === moduleId);
  }

  // --- Progress ---
  getUserProgress(userId: string): Progress[] {
    return (this.get<Progress[]>('progress') || []).filter(p => p.userId === userId);
  }

  updateProgress(userId: string, moduleId: string, status: Progress['status'], score?: number) {
    const progressList = this.get<Progress[]>('progress') || [];
    const idx = progressList.findIndex(p => p.userId === userId && p.moduleId === moduleId);
    if (idx > -1) {
      progressList[idx].status = status;
      if (score !== undefined) progressList[idx].score = score;
    } else {
      progressList.push({ userId, moduleId, status, score });
    }
    this.set('progress', progressList);

    // SQL Tigger Simulation: Unlock next module if completed
    if (status === 'completed') {
       this.unlockNextModule(userId, moduleId);
    }
  }

  private unlockNextModule(userId: string, completedModuleId: string) {
    const modules = this.getModules();
    const idx = modules.findIndex(m => m.id === completedModuleId);
    if (idx !== -1 && idx + 1 < modules.length) {
      const nextModId = modules[idx + 1].id;
      const progressList = this.get<Progress[]>('progress') || [];
      const nextIdx = progressList.findIndex(p => p.userId === userId && p.moduleId === nextModId);
      if (nextIdx > -1 && progressList[nextIdx].status === 'locked') {
         progressList[nextIdx].status = 'available';
         this.set('progress', progressList);
      }
    }
  }

  // --- Responses (SQL Sim: INSERT INTO responses) ---
  saveResponse(response: ResponseRecord) {
    const responses = this.get<ResponseRecord[]>('responses') || [];
    responses.push(response);
    this.set('responses', responses);
  }

  // --- Badges ---
  getBadges(): Badge[] {
    return this.get<Badge[]>('badges') || [];
  }

  getUserBadges(userId: string): UserBadge[] {
    return (this.get<UserBadge[]>('user_badges') || []).filter(ub => ub.userId === userId);
  }

  awardBadge(userId: string, badgeId: string) {
    const uBadges = this.get<UserBadge[]>('user_badges') || [];
    if (!uBadges.some(ub => ub.userId === userId && ub.badgeId === badgeId)) {
       uBadges.push({ userId, badgeId, earnedAt: new Date().toISOString() });
       this.set('user_badges', uBadges);
       console.log(`INSERT INTO user_badges VALUES (${userId}, ${badgeId}, ...)`);
    }
  }

  // --- Daily Missions ---
  getDailyMissions(): DailyMission[] {
    return this.get<DailyMission[]>('daily_missions') || [];
  }

  updateMissionProgress(missionId: string, progressInc: number) {
     const missions = this.get<DailyMission[]>('daily_missions') || [];
     const idx = missions.findIndex(m => m.id === missionId);
     if (idx > -1 && missions[idx].progress < missions[idx].total) {
        missions[idx].progress += progressInc;
        if (missions[idx].progress >= missions[idx].total) {
            missions[idx].progress = missions[idx].total;
            this.updateUserXP('u1', missions[idx].xpReward); // Award XP
        }
        this.set('daily_missions', missions);
     }
  }
}

export const db = new SimulatedSQLDB();
