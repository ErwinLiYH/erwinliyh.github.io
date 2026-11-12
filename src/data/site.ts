export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export type PageName = 'about' | 'dev' | 'vibe-coding';

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const pathFor = (locale: Locale, page: PageName = 'about') =>
  `${base}/${locale}/${page === 'about' ? '' : `${page}/`}`;

export const secondaryEmails = ['erwinliyh@outlook.com', 'erwinli@qq.com'];

export const copy = {
  en: {
    name: 'Yuanhao Li',
    siteTagline: 'Research & Code',
    about: 'About',
    dev: 'Dev',
    'vibe-coding': 'Vibe Coding',
    skip: 'Skip to content',
    role: 'PhD student in Computer Science',
    university: 'University of Exeter',
    location: 'Exeter, United Kingdom',
    introLabel: 'A LITTLE ABOUT ME',
    introTitle: 'Learning. Reasoning. Building.',
    intro:
      'I’m Yuanhao, a PhD student in Computer Science at the University of Exeter, supervised by Haozhe Wang and Geyong Min. I study how intelligent agents can learn, adapt, and make decisions in complex environments.',
    introMore:
      'My research connects AI-native networks, reinforcement learning, and language model agents — from adaptive radio access network slicing to generalization in continuous control. Alongside research, I explore AI-assisted development and build tools through code.',
    research: 'Research interests',
    researchNote: 'Three connected threads in my research.',
    interests: [
      {
        title: 'AI-native networks',
        text: 'Learning-driven resource allocation and adaptive RAN slicing for next-generation networks.',
      },
      {
        title: 'Reinforcement learning',
        text: 'Multi-agent decision-making and structural generalization in continuous control.',
      },
      {
        title: 'Language model agents',
        text: 'Reflection, self-improvement, and language models for network control.',
      },
    ],
    papers: 'Publications & manuscripts',
    papersNote: 'Published work and research in progress.',
    paperLink: 'Read paper',
    education: 'Education',
    educationNote: 'A path through data, computing, and intelligent systems.',
    skills: 'Technical toolkit',
    skillsNote: 'Tools I work with, from experiments to implementation.',
    awards: 'Honors & awards',
    awardItems: [
      'China Scholarship Council (CSC) scholarship for doctoral study abroad',
      'Second-Class Scholarship during undergraduate studies',
    ],
    contact: 'Let’s connect.',
    secondaryEmails: 'Alternative emails',
    contactText:
      'For conversations about research, intelligent agents, or building things.',
    scroll: 'SCROLL TO EXPLORE',
    terminalHint: 'Scroll down to learn more.',
    footer: 'Research, code, and a little curiosity.',
    backTop: 'Back to top',
    elsewhere: 'FIND ME ELSEWHERE',
    devTitle: 'A considered toolkit.',
    devDescription:
      'Tools, workflows, and the small things that make building better.',
    vibeTitle: 'From a thought to a thing.',
    vibeDescription: 'A space for experiments and things built with AI.',
    emptyTitle: 'A little room for what’s next.',
    emptyText: 'Nothing here yet. This space is intentionally left open.',
    returnHome: 'Back to about',
    emptyStatus: '0 entries · room to grow',
    skillGroups: [
      'Programming & ML',
      'High-performance computing',
      'AI-assisted development',
    ],
  },
  zh: {
    name: '李元昊',
    siteTagline: '科研与代码',
    about: '关于',
    dev: 'Dev',
    'vibe-coding': 'Vibe Coding',
    skip: '跳到正文',
    role: '计算机科学博士生',
    university: '埃克塞特大学',
    location: '英国 · 埃克塞特',
    introLabel: '关于我',
    introTitle: '学习，推理，创造。',
    intro:
      '我是李元昊，目前在英国埃克塞特大学攻读计算机科学博士学位，导师为 Haozhe Wang 和 Geyong Min。我的研究关注智能体如何在复杂环境中学习、适应并做出决策。',
    introMore:
      '我的研究连接 AI 原生网络、强化学习与语言模型智能体，涉及自适应无线接入网切片，以及连续控制任务中的泛化问题。在科研之外，我也探索 AI 辅助开发，通过代码构建工具。',
    research: '研究方向',
    researchNote: '三条彼此交织的研究线索。',
    interests: [
      {
        title: 'AI 原生网络',
        text: '面向下一代网络，研究学习驱动的资源分配与自适应无线接入网切片。',
      },
      {
        title: '强化学习',
        text: '探索多智能体决策，以及连续控制任务中的结构泛化能力。',
      },
      {
        title: '语言模型智能体',
        text: '研究反思、自我改进与大语言模型在网络控制中的应用。',
      },
    ],
    papers: '论文与研究稿件',
    papersNote: '已发表的工作，以及正在进行的探索。',
    paperLink: '阅读论文',
    education: '教育经历',
    educationNote: '从数据与计算，走向智能系统。',
    skills: '技术工具箱',
    skillsNote: '从实验到实现，我使用的工具。',
    awards: '荣誉与奖励',
    awardItems: [
      '国家留学基金委（CSC）公派出国攻读博士学位奖学金',
      '本科阶段二等奖学金',
    ],
    contact: '保持联系。',
    secondaryEmails: '其他联系邮箱',
    contactText: '欢迎交流科研、智能体，以及把想法变成作品的过程。',
    scroll: '向下探索',
    terminalHint: '向下滚动，了解更多。',
    footer: '科研、代码，还有一点好奇心。',
    backTop: '回到顶部',
    elsewhere: '在这些地方找到我',
    devTitle: '让创造更顺手。',
    devDescription: '工具、工作流，以及让开发更从容的小细节。',
    vibeTitle: '从一个想法，到一件作品。',
    vibeDescription: '留给 AI 辅助开发、实验与作品的一片空间。',
    emptyTitle: '为下一个想法留白。',
    emptyText: '这里暂时没有内容，留待之后慢慢填入。',
    returnHome: '返回个人主页',
    emptyStatus: '0 条内容 · 静待生长',
    skillGroups: ['编程与机器学习', '高性能计算', 'AI 辅助开发'],
  },
} as const;

// Publication states are transcribed from the supplied CV, not independently verified.
export const papers = [
  {
    title:
      'A Flexible and Scalable Multi-Agent Learning Framework for Dynamic RAN Slicing in 6G Native-AI Networks',
    url: 'https://ieeexplore.ieee.org/document/11288040',
    venue: 'IEEE Transactions on Mobile Computing · Vol. 25, No. 5 · 2026',
    status: { en: 'Published', zh: '已发表' },
    kind: 'published',
    summary: {
      en: 'A scalable multi-agent reinforcement learning framework that adapts RAN slicing to changing demands without retraining, balancing service quality and reconfiguration overhead.',
      zh: '可扩展的多智能体强化学习框架，无需重新训练即可适应变化的 RAN 切片需求，在服务质量与重配置开销之间取得平衡。',
    },
  },
  {
    title:
      'Reflection-Driven Self-Improving Language Model Agents for Adaptive RAN Slicing',
    url: 'https://arxiv.org/abs/2603.10564',
    venue: 'arXiv',
    status: {
      en: 'Preprint · submitted to ICC 2027',
      zh: '预印本 · 已投稿 ICC 2027',
    },
    kind: 'preprint',
    summary: {
      en: 'An Actor–Reflector framework that combines online interaction, semantic reflection, and preference learning to improve network control without manually designed reward functions.',
      zh: '结合在线交互、语义反思与偏好学习的 Actor–Reflector 框架，无需人工设计奖励函数，逐步改善网络控制策略。',
    },
  },
  {
    title:
      'CrossMaze: Benchmarking Zero-Shot Structural Generalization in Offline Continuous Control',
    url: 'https://openreview.net/forum?id=b0IQVNYpMQ',
    venue: 'OpenReview',
    status: { en: 'Under review · ICLR 2027', zh: '审稿中 · ICLR 2027' },
    kind: 'review',
    summary: {
      en: 'A benchmark for generalization to unseen maze layouts, with a compact language-model-based policy that maps layouts, states, and goals to continuous actions.',
      zh: '评测离线连续控制在未见迷宫布局上的泛化能力，并以紧凑的语言模型策略，将布局、状态和目标映射为连续动作。',
    },
  },
];

export const education = [
  {
    period: '2023 — 2027',
    en: {
      school: 'University of Exeter',
      degree: 'PhD · Computer Science',
      detail: 'Expected September 2027 · UK',
    },
    zh: {
      school: '埃克塞特大学',
      degree: '博士 · 计算机科学',
      detail: '预计 2027 年 9 月毕业 · 英国',
    },
  },
  {
    period: '2022 — 2023',
    en: {
      school: 'University of Edinburgh',
      degree: 'MSc · High Performance Computing and Data Science',
      detail: 'EPCC · UK',
    },
    zh: {
      school: '爱丁堡大学',
      degree: '硕士 · 高性能计算与数据科学',
      detail: 'EPCC · 英国',
    },
  },
  {
    period: '2018 — 2022',
    en: {
      school: 'BNU–HKBU United International College',
      degree: 'BSc · Data Science',
      detail: 'Division of Science and Technology',
    },
    zh: {
      school: '北京师范大学–香港浸会大学联合国际学院',
      degree: '学士 · 数据科学',
      detail: '理工科技学部',
    },
  },
];

export const skills = [
  ['Python', 'R', 'PyTorch', 'Transformers', 'C++', 'ns-3', 'Linux', 'Docker'],
  [
    'MPI',
    'OpenMP',
    'CUDA',
    'Slurm',
    'DeepSpeed',
    'Multithreading / Multiprocessing',
  ],
  ['Claude Code', 'Pi', 'Codex'],
];
