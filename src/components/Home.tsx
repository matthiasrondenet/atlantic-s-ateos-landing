import React from 'react';
import { DOWNLOAD_URL } from '../constants.ts';
import { useI18n } from '../i18n.tsx';
import { Layout } from './Layout.tsx';
import { Logo } from './Logo.tsx';

// Drop PNG/JPG/WebP files in src/screenshots/ (sorted by file name) and they show up here.
const shots = import.meta.glob<string>('../screenshots/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});
const SCREENSHOTS = Object.entries(shots)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

export const Home: React.FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <main>
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__text">
              <p className="label muted">{t.tagline}</p>
              <h1>{t.heroTitle}</h1>
              <p>{t.heroText}</p>
              <a className="pill" href={DOWNLOAD_URL}>
                {t.downloadCta}
              </a>
              <p className="label muted">{t.downloadNote}</p>
            </div>
            <Logo className="hero__badge" label="ATEOS Alarm" />
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <aside className="warning" role="note">
              <svg
                className="warning__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3 2.5 20h19z" />
                <path d="M12 10v4.5M12 17.5v.01" />
              </svg>
              <div className="warning__body">
                <h2>{t.warningTitle}</h2>
                <p>{t.warningLead}</p>
                <ul>
                  {t.warningPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="warning__check">{t.warningCheck}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <h2 className="section__title">{t.featuresTitle}</h2>
            <div className="cards">
              {t.features.map((f) => (
                <article className="card" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>

            <div className="private-band">
              <h2>{t.closureTitle}</h2>
              <p>{t.closureText}</p>
            </div>

            <div className="private-band">
              <h2>{t.privacyTitle}</h2>
              <p>{t.privacyText}</p>
            </div>
          </div>
        </section>

        {SCREENSHOTS.length > 0 && (
          <section className="section" id="screenshots">
            <div className="container">
              <h2 className="section__title">{t.screenshotsTitle}</h2>
              <ul className="shots">
                {SCREENSHOTS.map((src, i) => (
                  <li key={src}>
                    <img src={src} alt={`${t.screenshotAlt} ${String(i + 1)}`} loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="section" id="download">
          <div className="container">
            <div className="download-card">
              <h2>{t.downloadTitle}</h2>
              <p className="muted">{t.downloadText}</p>
              <a className="pill" href={DOWNLOAD_URL}>
                {t.downloadCta}
              </a>
              <h3>{t.installTitle}</h3>
              <ol>
                {t.installSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};
