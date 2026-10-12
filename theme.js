(() => {
  const storageKey = 'rebound-recovery-theme';
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(storageKey);
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (systemDark ? 'dark' : 'light');

  const label = current => current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  const syncButtons = () => {
    const isDark = root.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', label(root.dataset.theme));
      button.innerHTML = `<span aria-hidden="true">${isDark ? '☀' : '◐'}</span><span class="theme-toggle-text">${isDark ? 'LIGHT' : 'DARK'}</span>`;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    syncButtons();
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        root.classList.add('theme-transition');
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(storageKey, root.dataset.theme);
        syncButtons();
        window.setTimeout(() => root.classList.remove('theme-transition'), 520);
      });
    });
  });
})();
