// Language links remain ordinary links when JavaScript or storage is unavailable.
const languageLink =
  document.querySelector<HTMLAnchorElement>('[data-language]');
if (languageLink) {
  const updateHash = () => {
    languageLink.hash = window.location.hash;
  };
  updateHash();
  window.addEventListener('hashchange', updateHash);
  languageLink.addEventListener('click', () => {
    try {
      localStorage.setItem(
        'preferred-language',
        languageLink.dataset.language!,
      );
    } catch {
      /* Storage is optional. */
    }
  });
}

const home = document.querySelector<HTMLElement>('.home');
const profile = document.querySelector<HTMLElement>('.profile');
const grid = document.querySelector<HTMLElement>('.home-grid');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia(
  '(min-width: 1100px) and (min-height: 760px)',
);

// Loop the footer hint only when it is actually visible, including shell opacity.
// Keep the complete HTML text as the no-JavaScript / reduced-motion fallback.
const terminalFooter = document.querySelector<HTMLElement>('.terminal-footer');
const terminalHint = document.querySelector<HTMLElement>(
  '[data-terminal-hint]',
);
let setTerminalShellVisible = (_visible: boolean) => {};
if (terminalFooter && terminalHint && 'IntersectionObserver' in window) {
  const fullText = terminalHint.textContent || '';
  const characters = Array.from(fullText);
  let inView = false;
  let shellVisible = true;
  let active = false;
  let timer: number | undefined;
  const stop = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };
  const update = () => {
    if (reducedMotion.matches) {
      stop();
      active = false;
      terminalHint.textContent = fullText;
      return;
    }
    const visible = inView && shellVisible && !document.hidden;
    if (visible === active) return;
    active = visible;
    stop();
    terminalHint.textContent = '';
    if (!visible) return;
    let index = 0;
    const type = () => {
      terminalHint.textContent = characters.slice(0, ++index).join('');
      timer = window.setTimeout(
        index < characters.length ? type : restart,
        index < characters.length ? 55 : 3000,
      );
    };
    const restart = () => {
      index = 0;
      terminalHint.textContent = '';
      timer = window.setTimeout(type, 250);
    };
    restart();
  };
  if (!reducedMotion.matches) terminalHint.textContent = '';
  setTerminalShellVisible = (visible) => {
    shellVisible = visible;
    update();
  };
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.intersectionRatio >= 0.25;
      update();
    },
    { threshold: 0.25 },
  ).observe(terminalFooter);
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  window.addEventListener('pagehide', () => {
    stop();
    active = false;
  });
  window.addEventListener('pageshow', update);
}

if (home && profile && grid) {
  const column = profile.closest<HTMLElement>('.profile-column')!;
  const elements = [...profile.querySelectorAll<HTMLElement>('[data-flight]')];
  const smooth = (value: number) => {
    const p = Math.min(1, Math.max(0, value));
    return p * p * (3 - 2 * p);
  };
  let scheduled = false;
  let duration = 1;
  let flights: { element: HTMLElement; x: number; y: number; scale: number }[] =
    [];
  const enabled = () => desktop.matches && !reducedMotion.matches;

  const render = () => {
    scheduled = false;
    if (!enabled()) return;
    const progress = Math.min(1, Math.max(0, window.scrollY / duration));
    for (const flight of flights) {
      // The portrait leaves first, making room before the text crosses to the left.
      const portrait = flight.element.dataset.flight === 'portrait';
      const remaining =
        1 - smooth(portrait ? progress / 0.56 : (progress - 0.14) / 0.86);
      flight.element.style.transform = `translate3d(${flight.x * remaining}px, ${flight.y * remaining}px, 0) scale(${1 + (flight.scale - 1) * remaining})`;
    }
    const shellFade = smooth(progress / 0.68);
    setTerminalShellVisible(1 - shellFade > 0.15);
    column.style.setProperty('--shell-opacity', String(1 - shellFade));
    column.style.setProperty('--shell-scale', String(1 - shellFade * 0.025));
    home.style.setProperty(
      '--hero-opacity',
      String(1 - smooth(progress / 0.5)),
    );
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  };
  const measure = () => {
    // Read both real layouts, then animate the same nodes from welcome to dock.
    // Local coordinates avoid scroll restoration and sticky-footer offsets.
    column.classList.remove('flight-layout');
    elements.forEach((element) => element.style.removeProperty('transform'));
    home.style.removeProperty('--hero-opacity');
    if (!enabled()) {
      flights = [];
      setTerminalShellVisible(true);
      return;
    }
    column.style.setProperty(
      '--welcome-x',
      `${(grid.clientWidth - profile.offsetWidth) / 2}px`,
    );
    column.style.setProperty(
      '--welcome-y',
      `${Math.max(0, (window.innerHeight - 76 - profile.offsetHeight) / 2 - 48)}px`,
    );
    const localRect = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const origin = column.getBoundingClientRect();
      return {
        x: rect.left - origin.left,
        y: rect.top - origin.top,
        width: rect.width,
        height: rect.height,
      };
    };
    const welcome = elements.map(localRect);
    const shell = localRect(profile);
    column.classList.add('flight-layout');
    // Measure visible text rather than block widths before calculating flight endpoints.
    // English uses the name; the shorter Chinese name uses the identity/research lines.
    const name = profile
      .querySelector<HTMLElement>('.profile-name')!
      .getBoundingClientRect();
    let portraitCenter = name.left + name.width / 2;
    if (document.documentElement.lang.startsWith('zh')) {
      const textRects = [
        ...profile.querySelectorAll('.profile-role, .profile-research li'),
      ].flatMap((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return [...range.getClientRects()].filter((rect) => rect.width > 0);
      });
      if (textRects.length) {
        portraitCenter =
          (Math.min(...textRects.map((rect) => rect.left)) +
            Math.max(...textRects.map((rect) => rect.right))) /
          2;
      }
    }
    const portrait = profile.querySelector<HTMLElement>('.portrait-frame')!;
    profile.style.setProperty(
      '--portrait-dock-x',
      `${portraitCenter - profile.getBoundingClientRect().left - portrait.offsetWidth / 2}px`,
    );
    column.style.setProperty('--shell-x', `${shell.x}px`);
    column.style.setProperty('--shell-y', `${shell.y}px`);
    column.style.setProperty('--shell-width', `${shell.width}px`);
    column.style.setProperty('--shell-height', `${shell.height}px`);
    flights = elements.map((element, i) => {
      const dock = localRect(element);
      return {
        element,
        x: welcome[i].x - dock.x,
        y: welcome[i].y - dock.y,
        scale:
          element.dataset.flight === 'portrait'
            ? welcome[i].width / dock.width
            : 1,
      };
    });
    duration = Math.min(560, window.innerHeight * 0.55);
    render();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('pageshow', measure);
  reducedMotion.addEventListener('change', measure);
  desktop.addEventListener('change', measure);
  new ResizeObserver(measure).observe(grid);
  document.fonts.ready.then(measure);
  measure();
}

// Enhance only when movement is welcome; content is always visible without JS.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.06 },
  );
  document
    .querySelectorAll<HTMLElement>(
      '.section:not(.intro-section), .contact-section',
    )
    .forEach((section) => {
      // Do not hide content already in view (including a restored scroll position).
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add('reveal');
        observer.observe(section);
      }
    });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      document
        .querySelectorAll('.reveal')
        .forEach((el) => el.classList.add('revealed'));
      observer.disconnect();
    }
  });
}
