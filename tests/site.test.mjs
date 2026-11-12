import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const read = (file) => readFile(`dist/${file}`, 'utf8');
const localizedPages = [
  '',
  'dev/',
  'dev/system-prompt/',
  'dev/skills/',
  'dev/custom-skills/',
  'vibe-coding/',
];

test('all localized pages are emitted with language and corresponding switch links', async () => {
  for (const locale of ['en', 'zh']) {
    for (const page of localizedPages) {
      const html = await read(`${locale}/${page}index.html`);
      assert.ok(html.includes(`lang="${locale === 'zh' ? 'zh-CN' : 'en'}"`));
      assert.ok(
        html.includes(
          `href="${base}/${locale === 'en' ? 'zh' : 'en'}/${page}"`,
        ),
      );
      assert.ok(html.includes('rel="canonical"'));
      assert.ok(html.includes('hreflang="x-default"'));
      assert.ok(html.includes('aria-current="page"'));
    }
  }
});

test('Chinese and English pages use their respective names and metadata', async () => {
  for (const locale of ['en', 'zh']) {
    const name = locale === 'zh' ? '李元昊' : 'Yuanhao Li';
    for (const page of localizedPages) {
      const html = await read(`${locale}/${page}index.html`);
      assert.ok(html.includes(`class="brand-name">${name}</span>`));
      assert.ok(html.match(/<title>(.*?)<\/title>/)?.[1].includes(name));
      assert.ok(
        html.match(/property="og:title" content="([^"]+)"/)?.[1].includes(name),
      );
      if (locale === 'zh') assert.ok(!html.includes('Yuanhao Li'));
      if (!page) {
        assert.ok(html.includes(`class="profile-name">${name}</span>`));
        assert.ok(html.includes(`alt="${name}"`));
        if (locale === 'zh') assert.ok(html.includes('我是李元昊'));
      }
    }
  }
});

test('root includes readable English fallback and a language-aware redirect', async () => {
  const html = await read('index.html');
  assert.ok(html.includes('location.replace'));
  assert.ok(html.includes('preferred-language'));
  assert.ok(html.includes('Learning. Reasoning. Building.'));
});

test('profile respects CV privacy and separates publication states', async () => {
  const html = await read('en/index.html');
  assert.ok(!html.includes('3 January 2001'));
  assert.ok(!html.includes('resume_en.pdf'));
  assert.ok(html.includes('Under review'));
  assert.ok(html.includes('Preprint'));
  assert.ok(html.includes('Published'));
  assert.ok(html.includes('yl1118@exeter.ac.uk'));
});

test('homepages expose the primary and both alternative email links', async () => {
  for (const file of ['index.html', 'en/index.html', 'zh/index.html']) {
    const html = await read(file);
    for (const email of [
      'yl1118@exeter.ac.uk',
      'erwinliyh@outlook.com',
      'erwinli@qq.com',
    ]) {
      assert.ok(
        html.includes(`href="mailto:${email}"`),
        `${file}: missing ${email}`,
      );
    }
    assert.ok(
      html.includes(
        file.startsWith('zh/') ? '其他联系邮箱' : 'Alternative emails',
      ),
    );
  }
});

test('education precedes research and the welcome terminal uses one shared profile', async () => {
  for (const locale of ['en', 'zh']) {
    const html = await read(`${locale}/index.html`);
    const sections = [
      'content',
      'education',
      'research',
      'publications',
      'toolkit',
    ];
    const positions = sections.map((id) => html.indexOf(`id="${id}"`));
    assert.ok(
      positions.every(
        (position, i) =>
          position >= 0 && (i === 0 || position > positions[i - 1]),
      ),
    );
    assert.equal((html.match(/id="profile"/g) || []).length, 1);
    assert.equal((html.match(/class="profile-name"/g) || []).length, 1);
    assert.equal((html.match(/data-flight(?:=|\s|>)/g) || []).length, 6);
    assert.ok(html.includes('yhintro'));
    assert.ok(html.includes('data-terminal-hint'));
    assert.ok(
      html.includes(
        locale === 'zh' ? '向下滚动，了解更多。' : 'Scroll down to learn more.',
      ),
    );
    assert.ok(!html.includes('neofetch'));
    assert.ok(html.includes('terminal-shell'));
    assert.ok(!html.includes('mini-terminal'));
  }
});

test('Vibe Coding remains intentionally empty', async () => {
  for (const locale of ['en', 'zh']) {
    const html = await read(`${locale}/vibe-coding/index.html`);
    assert.ok(html.includes(locale === 'en' ? '0 entries' : '0 条内容'));
    assert.ok(html.includes('empty-state'));
    assert.ok(!html.includes('class="paper"'));
  }
});

test('Dev pages share a collapsible directory and keep the active page localized', async () => {
  for (const locale of ['en', 'zh']) {
    for (const page of localizedPages.filter((page) =>
      page.startsWith('dev/'),
    )) {
      const html = await read(`${locale}/${page}index.html`);
      assert.ok(html.includes('aria-controls="dev-navigation"'));
      assert.ok(html.includes('aria-expanded="false"'));
      assert.ok(html.includes('id="dev-navigation"'));
      assert.ok(
        html.includes(`href="${base}/${locale}/${page}" aria-current="page"`),
      );
      assert.ok(!html.includes('/Users/'));
    }
  }
});

test('Pi setup includes the official installer and three complete one-line plugin groups', async () => {
  const groups = {
    basic: ['pi-web-access', '@narumitw/pi-btw', 'pi-tidy', 'pi-goal-x'],
    optional: ['pi-subagents', '@narumitw/pi-stamp'],
    'codex-related': [
      '@narumitw/pi-accounts',
      '@narumitw/pi-codex-compact',
      '@narumitw/pi-usage',
    ],
  };
  for (const locale of ['en', 'zh']) {
    const html = await read(`${locale}/dev/index.html`);
    assert.ok(html.includes('curl -fsSL https://pi.dev/install.sh | sh'));
    for (const [group, packages] of Object.entries(groups)) {
      const section = html.match(
        new RegExp(`<section[^>]*id="${group}"[^>]*>([\\s\\S]*?)</section>`),
      )?.[1];
      assert.ok(section, `missing ${group}`);
      const command = packages
        .map((name) => `pi install npm:${name}`)
        .join(' &amp;&amp; ');
      assert.ok(section.includes(`<code>${command}</code>`));
      for (const name of packages)
        assert.ok(section.includes(`https://www.npmjs.com/package/${name}`));
    }
  }
});

test('Dev prompt, community skills, and custom placeholder contain the requested content', async () => {
  const zh = await read('zh/dev/system-prompt/index.html');
  const en = await read('en/dev/system-prompt/index.html');
  assert.ok(zh.includes('1.文档规范：'));
  assert.ok(zh.includes('4.代码：'));
  assert.ok(en.includes('1. Documentation:'));
  assert.ok(en.includes('Use Chinese by default'));
  assert.ok(en.includes('4. Code:'));
  for (const html of [zh, en]) {
    assert.ok(html.includes('~/.pi/agent/APPEND_SYSTEM.md'));
    assert.ok(html.includes('https://arxiv.org/abs/2512.08296v3'));
    assert.ok(html.includes('Towards a Science of Scaling Agent Systems'));
    assert.ok(!html.includes('auth.json'));
  }
  for (const locale of ['en', 'zh']) {
    const skills = await read(`${locale}/dev/skills/index.html`);
    for (const name of [
      'grilling',
      'grill-me',
      'grill-with-docs',
      'domain-modeling',
    ])
      assert.ok(skills.includes(name));
    assert.ok(skills.includes('https://github.com/mattpocock/skills'));
    assert.ok(skills.includes('https://github.com/yuan1z0825/nature-skills'));
    const custom = await read(`${locale}/dev/custom-skills/index.html`);
    assert.ok(custom.includes('dev-placeholder'));
    assert.ok(!custom.includes('dev-resource-list'));
  }
});

test('local assets, page links, and same-page anchors resolve including base paths', async () => {
  for (const file of [
    'index.html',
    '404.html',
    ...['en', 'zh'].flatMap((locale) =>
      localizedPages.map((page) => `${locale}/${page}index.html`),
    ),
  ]) {
    const html = await read(file);
    for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (raw.startsWith('#')) {
        assert.ok(
          html.includes(`id="${raw.slice(1)}"`),
          `${file}: missing anchor ${raw}`,
        );
        continue;
      }
      if (!raw.startsWith('/')) continue;
      assert.ok(
        !base || raw.startsWith(`${base}/`),
        `${raw} must include ${base}`,
      );
      let local = raw.slice(base.length).replace(/^\//, '').split('#')[0];
      if (!path.extname(local))
        local = `${local.replace(/\/$/, '')}/index.html`;
      await access(`dist/${local}`);
    }
  }
});
