import React from 'react';
import { BASE, DEVELOPER, SOURCE_URL } from '../constants.ts';
import { useI18n } from '../i18n.tsx';
import { Logo } from './Logo.tsx';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, toggle } = useI18n();

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand" href={BASE}>
            <Logo className="brand__badge" />
            <span>ATEOS Alarm</span>
          </a>
          <nav className="nav" aria-label={t.navLabel}>
            <button type="button" className="lang" onClick={toggle} aria-label={t.switchLabel}>
              {t.switchTo}
            </button>
          </nav>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="muted">
            © {new Date().getFullYear()} {DEVELOPER} · {t.unofficial}
          </p>
          <nav className="site-footer__links" aria-label="Footer">
            <a href={SOURCE_URL}>{t.sourceCode}</a>
          </nav>
        </div>
      </footer>
    </>
  );
};
