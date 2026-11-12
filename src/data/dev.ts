import { pathFor, type Locale } from './site';

export const devSections = [
  'pi',
  'system-prompt',
  'skills',
  'custom-skills',
] as const;
export type DevSection = (typeof devSections)[number];
export const devPath = (locale: Locale, section: DevSection = 'pi') =>
  `${pathFor(locale, 'dev')}${section === 'pi' ? '' : `${section}/`}`;

export const devCopy = {
  zh: {
    directory: '开发工作流',
    menu: '导航目录',
    pages: {
      pi: 'Pi Agent 配置',
      'system-prompt': '我的系统提示词',
      skills: 'Skills',
      'custom-skills': 'Custom skills',
    },
    descriptions: {
      pi: '一个轻量的 Agent，加上适合自己的扩展。这是我使用的 Pi 开发配置。',
      'system-prompt':
        '我附加给 Pi 的工作约定：先确认边界，再开始执行，保持实现简单。',
      skills: '我使用的社区 Skills：从理清需求到科研写作，让工作流可以复用。',
      'custom-skills': '自己编写的 Skills，之后再慢慢整理。',
    },
    install: '安装 Pi',
    installNote:
      '来自 Pi 官网的 macOS / Linux 安装命令。安装后运行 pi，并使用 /login 连接模型服务。',
    website: '官网',
    repo: '源码仓库',
    package: 'npm 页面',
    installGroup: '安装这一组',
    safety:
      '以下命令会安装第三方扩展；运行前请先审阅各项目说明。部分扩展还需要模型服务或 API 配置，详见各自文档。',
    promptContext:
      '这些约定大多是个人偏好；对 subagent 自动调用的限制，则也有实证依据。',
    subagentRationale:
      '多 Agent 并不保证性能提升，协调方式与任务不匹配时反而可能显著退化。Towards a Science of Scaling Agent Systems 在固定计算预算下发现，所测试的多 Agent 架构在顺序规划任务上相对单 Agent 的表现下降约 39%–70%，但在部分可分解任务上也观察到了收益。因此，我默认由主 Agent 独立完成任务，只在明确授权时使用 subagent。',
    promptPath: '保存位置',
    promptUsage:
      '将下面的内容保存到该文件，作为 Pi 默认系统提示词的补充，而不是替换它。',
    skillsNote:
      '模型越强，Agent 对 Skills 的依赖越少；因此我尽量精简数量，只保留少量 Skills，并全部设为手动触发。',
    grillingIntro:
      'Matt Pocock 的需求澄清与领域建模 Skills。我使用下面四个配套技能，在实施前对齐目标、术语和关键决策。',
    natureIntro:
      '面向科研的社区技能库，涵盖文献检索、论文精读、学术写作与润色、科研绘图和汇报制作。',
    natureNote:
      '我主要把它用于从阅读文献到整理科研产出的工作流。这里链接原项目，具体技能与使用说明以仓库文档为准。',
    later: '待整理',
    laterText: '这里先留一个位置，下次再补充自定义 Skills。',
    copy: '复制',
    copied: '已复制',
    copyFailed: '请手动复制',
  },
  en: {
    directory: 'Development workflow',
    menu: 'Navigation',
    pages: {
      pi: 'Pi Agent setup',
      'system-prompt': 'My system prompt',
      skills: 'Skills',
      'custom-skills': 'Custom skills',
    },
    descriptions: {
      pi: 'A lightweight agent, extended to fit the way I work. This is my Pi development setup.',
      'system-prompt':
        'The working agreements I append to Pi: clarify boundaries, act deliberately, and keep things simple.',
      skills:
        'Community skills I use to make workflows repeatable, from clarifying requirements to research writing.',
      'custom-skills': 'A space for the skills I build myself. More to come.',
    },
    install: 'Install Pi',
    installNote:
      'The macOS / Linux install command from the Pi website. Once installed, run pi and use /login to connect a model provider.',
    website: 'Website',
    repo: 'Repository',
    package: 'npm page',
    installGroup: 'Install this group',
    safety:
      'These commands install third-party extensions; review each project before running them. Some extensions also need provider or API configuration—see their documentation.',
    promptContext:
      'Most of these rules are personal preferences; the restriction on automatic subagent use also has an empirical basis.',
    subagentRationale:
      'Multi-agent systems do not guarantee better performance, and coordination that does not fit the task can substantially degrade it. Under fixed computational budgets, Towards a Science of Scaling Agent Systems found that the tested multi-agent architectures performed about 39–70% worse than the single-agent baseline on sequential planning, while also finding gains on some decomposable tasks. I therefore default to a single main agent and require explicit authorization for subagents.',
    promptPath: 'File location',
    promptUsage:
      'Save the following text to this file to supplement, rather than replace, Pi’s default system prompt.',
    skillsNote:
      'As models grow more capable, agents rely less on skills; I therefore keep only a small set and require manual invocation for all of them.',
    grillingIntro:
      'Matt Pocock’s skills for clarifying requirements and modeling a domain. I use these four related skills to align goals, terminology, and key decisions before implementation.',
    natureIntro:
      'A community toolkit for research: literature search, paper reading, academic writing and polishing, scientific figures, and presentations.',
    natureNote:
      'I mainly use it for the workflow from reading papers to preparing research outputs. Follow the original repository for individual skills and usage instructions.',
    later: 'Coming later',
    laterText:
      'A placeholder for now. I’ll add my custom skills in a future update.',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy manually',
  },
};

export const pluginGroups = [
  {
    id: 'basic',
    title: 'Basic',
    description: {
      zh: '日常使用的基础能力：联网、旁支问答、界面整理与持续目标管理。',
      en: 'Everyday essentials: web access, side questions, a tidier transcript, and persistent goals.',
    },
    plugins: [
      {
        name: 'pi-web-access',
        package: 'pi-web-access',
        repo: 'https://github.com/nicobailon/pi-web-access',
        description: {
          zh: '为 Pi 提供联网搜索、网页抓取、PDF 提取及视频内容分析。',
          en: 'Web search, page fetching, PDF extraction, and video analysis for Pi.',
        },
      },
      {
        name: 'pi-btw',
        package: '@narumitw/pi-btw',
        repo: 'https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-btw',
        description: {
          zh: '使用 /btw 提出临时的旁支问题，不把问答加入主对话上下文。',
          en: 'Ask a side question with /btw without adding it to the main conversation context.',
        },
      },
      {
        name: 'pi-tidy',
        package: 'pi-tidy',
        repo: 'https://github.com/Andy8647/pi-tidy',
        description: {
          zh: '折叠工具调用，让对话更清爽，同时保留失败、修改差异和运行中任务的可见性。',
          en: 'Fold tool calls into a cleaner transcript while keeping failures, edit diffs, and running jobs visible.',
        },
      },
      {
        name: 'pi-goal-x',
        package: 'pi-goal-x',
        repo: 'https://github.com/tmonk/pi-goal-x',
        description: {
          zh: '通过 /goal 规划目标、持久化进度，并使用独立审计检查完成情况。',
          en: 'Plan goals with /goal, persist progress, and check completion with an independent auditor.',
        },
      },
    ],
  },
  {
    id: 'optional',
    title: 'Optional',
    description: {
      zh: '按需启用的协作与观测工具；子代理仅在我明确授权时使用。',
      en: 'Optional delegation and observability tools. I use subagents only when explicitly authorized.',
    },
    plugins: [
      {
        name: 'pi-subagents',
        package: 'pi-subagents',
        repo: 'https://github.com/nicobailon/pi-subagents',
        description: {
          zh: '将明确授权的任务交给专门的子代理，支持并行审查、后台任务及可复用工作流。',
          en: 'Delegate explicitly authorized tasks to focused child agents, with parallel reviews, background jobs, and reusable workflows.',
        },
      },
      {
        name: 'pi-stamp',
        package: '@narumitw/pi-stamp',
        repo: 'https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-stamp',
        description: {
          zh: '为对话增加时间戳，并可显示助手元数据、响应耗时和工具耗时。',
          en: 'Add transcript timestamps, with optional assistant metadata, response timing, and tool timing.',
        },
      },
    ],
  },
  {
    id: 'codex-related',
    title: 'Codex related',
    description: {
      zh: '我在 Codex 工作流中使用的账户、上下文压缩与用量工具；部分也支持其他服务。',
      en: 'Account, compaction, and usage tools I use in my Codex workflow. Some also support other providers.',
    },
    plugins: [
      {
        name: 'pi-accounts',
        package: '@narumitw/pi-accounts',
        repo: 'https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-accounts',
        description: {
          zh: '通过 /accounts 管理和切换命名的 OAuth 账户，包括 OpenAI Codex。',
          en: 'Manage and switch named OAuth accounts, including OpenAI Codex, with /accounts.',
        },
      },
      {
        name: 'pi-codex-compact',
        package: '@narumitw/pi-codex-compact',
        repo: 'https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-codex-compact',
        description: {
          zh: '为兼容的服务接入 Responses 上下文压缩协议，并在需要时回退到 Pi 原生压缩。',
          en: 'Use Responses compaction protocols with compatible providers, with a Pi-native fallback when needed.',
        },
      },
      {
        name: 'pi-usage',
        package: '@narumitw/pi-usage',
        repo: 'https://github.com/narumiruna/pi-extensions/tree/main/packages/pi-usage',
        description: {
          zh: '通过 /usage 查看服务用量、额度、重置时间及 API 余额。',
          en: 'Check provider usage, limits, reset times, and API balances with /usage.',
        },
      },
    ],
  },
];

// Keep each group as one shell line; pi install takes one package source at a time.
export const installCommand = (plugins: { package: string }[]) =>
  plugins.map((plugin) => `pi install npm:${plugin.package}`).join(' && ');

export const grillingSkills = [
  {
    name: 'grilling',
    category: 'productivity',
    description: {
      zh: '逐轮追问计划中的关键决策，理清依赖关系，直到双方形成共同理解。',
      en: 'Work through a plan’s decisions in rounds, resolving dependencies until there is a shared understanding.',
    },
  },
  {
    name: 'grill-me',
    category: 'productivity',
    description: {
      zh: '需求澄清的直接入口：围绕一个想法、计划或设计展开深入问答。',
      en: 'A direct entry point for an in-depth interview about an idea, plan, or design.',
    },
  },
  {
    name: 'grill-with-docs',
    category: 'engineering',
    description: {
      zh: '把需求追问与领域建模结合起来，同时记录术语和架构决策。',
      en: 'Combine the interview with domain modeling, documenting terminology and architectural decisions along the way.',
    },
  },
  {
    name: 'domain-modeling',
    category: 'engineering',
    description: {
      zh: '对照代码与具体场景完善领域模型，维护 GLOSSARY.md 和 ADR。',
      en: 'Refine the domain model against code and concrete scenarios, maintaining GLOSSARY.md and ADRs.',
    },
  },
];

export const systemPrompt = {
  zh: `# 用户偏好
1.文档规范：文档应简洁明了，默认使用中文；仅在用户明确要求时使用其他语言。md文档每句话一行。
2.执行边界：只有用户明确要求执行时，才开始修改或实施。对于“有办法解决……吗”“可不可以……”“为什么会……”“……你觉得怎么样”等咨询，仅回答问题、分析原因、探索可行性或规划方案；必要时可做只读检查，不得擅自修改文件、配置或执行其他会改变状态的操作。待用户明确要求开始后再执行。
3.sub-agents边界(如果未安装sub-agents系统则忽略)：默认由主 Agent 独立完成所有任务，即使任务非常复杂。未经用户明确授权，绝不调用、启动、恢复子代理，也不得将任务委派给子代理。不得将“继续”“修复这个问题”“审查代码”“实现这个功能”“提高效率”等表述视为使用子代理的授权。skill要求使用sub-agents时，询问用户是否使用。
4.代码：优先使用简单、可维护的实现。能用简单的方法解决一个问题就不要用复杂的方法。不要添加不必要的抽象。除非用户明确提出，不然永远不要考虑与改前版本的兼容问题，只需用最简洁的方式实现用户的要求。`,
  en: `# User preferences
1. Documentation: Keep documentation concise and clear. Use Chinese by default; use other languages only when the user explicitly requests them. Put each sentence on its own line in Markdown documents.
2. Execution boundaries: Start modifying or implementing only when the user explicitly asks you to act. For questions such as “Is there a way to solve…?”, “Can we…?”, “Why does…?”, or “What do you think of…?”, only answer the question, analyze causes, explore feasibility, or plan a solution. Read-only checks are allowed when necessary, but do not modify files or configuration, or perform any other state-changing operations without authorization. Wait until the user explicitly asks you to begin.
3. Subagent boundaries (ignore if no subagent system is installed): By default, the main agent must complete all tasks independently, even very complex ones. Without the user’s explicit authorization, never call, start, or resume subagents, or delegate tasks to them. Do not interpret phrases such as “continue”, “fix this issue”, “review the code”, “implement this feature”, or “improve efficiency” as authorization to use subagents. If a skill requires subagents, ask the user whether to use them.
4. Code: Prefer simple, maintainable implementations. Do not use a complicated approach when a simple one solves the problem. Do not add unnecessary abstractions. Unless the user explicitly requests it, never account for compatibility with the previous version; just implement the user’s requirements in the simplest way.`,
};
