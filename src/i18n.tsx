import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'fr' | 'en';

const STORAGE_KEY = 'ateos-landing-lang';

interface Feature {
  title: string;
  text: string;
}

export interface Copy {
  documentTitle: string;
  description: string;
  navLabel: string;
  switchTo: string;
  switchLabel: string;
  tagline: string;
  heroTitle: string;
  heroText: string;
  warningTitle: string;
  warningLead: string;
  warningPoints: string[];
  warningCheck: string;
  closureTitle: string;
  closureText: string;
  downloadCta: string;
  downloadNote: string;
  featuresTitle: string;
  features: Feature[];
  screenshotsTitle: string;
  screenshotAlt: string;
  downloadTitle: string;
  downloadText: string;
  installTitle: string;
  installSteps: string[];
  unofficial: string;
  sourceCode: string;
  privacyTitle: string;
  privacyText: string;
}

const fr: Copy = {
  documentTitle: 'ATEOS Alarm — Commande d’alarme par SMS pour Android',
  description:
    'ATEOS Alarm est une application Android non officielle pour armer et désarmer un transmetteur d’alarme piloté par SMS. Sans serveur, sans compte.',
  navLabel: 'Principal',
  switchTo: 'English',
  switchLabel: 'Switch to English',
  tagline: 'Commande d’alarme par SMS',
  heroTitle: 'Votre alarme, par SMS, depuis votre poche.',
  heroText:
    'ATEOS Alarm envoie à votre transmetteur les commandes pour armer, armer en périmétrique, désarmer et interroger l’état de l’alarme. Tout reste sur votre téléphone.',
  warningTitle: 'Fin du réseau 2G : cette application risque de ne plus fonctionner',
  warningLead:
    'ATEOS Alarm commande un transmetteur par SMS. Or de nombreux transmetteurs d’alarme utilisent encore un module 2G (GSM), et les opérateurs français arrêtent ce réseau. Quand le transmetteur n’a plus de réseau, il ne reçoit plus vos SMS : l’application, et sa fonction SMS, deviennent inutiles.',
  warningPoints: [
    'Les commandes (armer, désarmer, état) sont envoyées par SMS au transmetteur : sans réseau côté transmetteur, rien n’arrive.',
    'Le projet n’est plus maintenu et ne sera pas publié sur Google Play. Cette version est mise à disposition telle quelle.',
  ],
  warningCheck:
    'Avant d’installer : vérifiez auprès de votre installateur ou du fabricant si votre transmetteur fonctionne en 2G uniquement ou s’il prend en charge la 4G.',
  closureTitle: 'Pourquoi cette application ?',
  closureText:
    'L’application officielle d’Atlantic (ATEOS) n’est plus disponible : la société a cessé son activité. ATEOS Alarm est une alternative indépendante qui permet de continuer à piloter son transmetteur par SMS.',
  downloadCta: 'Télécharger l’APK',
  downloadNote: 'Android uniquement · installation hors Play Store',
  featuresTitle: 'Ce que fait l’application',
  features: [
    {
      title: 'Armer, désarmer',
      text: 'Armement total, périmétrique, désarmement et demande d’état, avec confirmation avant chaque envoi de SMS.',
    },
    {
      title: 'Verrouillage local',
      text: 'Code PIN et biométrie pour protéger l’accès, avec verrouillage automatique en arrière-plan.',
    },
    {
      title: 'Zones et journal',
      text: 'Suivi des zones et historique des événements, conservés sur l’appareil.',
    },
    {
      title: 'État automatique',
      text: 'En option, l’application lit le SMS d’état du transmetteur pour mettre à jour l’écran d’accueil.',
    },
    {
      title: 'Sauvegarde locale',
      text: 'Export et import de vos réglages et de votre historique dans un fichier JSON.',
    },
    {
      title: 'Français et anglais',
      text: 'Interface bilingue, qui suit la langue de votre téléphone.',
    },
  ],
  screenshotsTitle: 'Aperçu',
  screenshotAlt: 'Capture d’écran de l’application, vue',
  downloadTitle: 'Télécharger ATEOS Alarm',
  downloadText:
    'Version 1.0.0 pour Android, distribuée en APK. Elle n’est pas disponible sur Google Play.',
  installTitle: 'Installation',
  installSteps: [
    'Téléchargez le fichier APK depuis la page de téléchargement.',
    'Ouvrez-le sur votre téléphone et autorisez l’installation depuis cette source si Android le demande.',
    'Au premier lancement, indiquez le numéro de la carte SIM du transmetteur.',
  ],
  unofficial: 'Application non officielle, sans lien avec ATEOS ni ses fabricants.',
  sourceCode: 'Code source',
  privacyTitle: 'Aucune donnée collectée',
  privacyText:
    'Pas de compte, pas de publicité, pas de serveur : vos réglages, votre code et votre historique restent sur votre téléphone. Les SMS sont facturés par votre opérateur.',
};

const en: Copy = {
  documentTitle: 'ATEOS Alarm — SMS alarm control for Android',
  description:
    'ATEOS Alarm is an unofficial Android app to arm and disarm an SMS-controlled alarm transmitter. No server, no account.',
  navLabel: 'Main',
  switchTo: 'Français',
  switchLabel: 'Passer en français',
  tagline: 'SMS alarm control',
  heroTitle: 'Your alarm, by SMS, from your pocket.',
  heroText:
    'ATEOS Alarm sends your transmitter the commands to arm, arm the perimeter, disarm and query the alarm status. Everything stays on your phone.',
  warningTitle: '2G is being shut down: this app may stop working',
  warningLead:
    'ATEOS Alarm controls a transmitter by SMS. Many alarm transmitters still use a 2G (GSM) module, and French mobile operators are switching that network off. Once the transmitter has no network, it no longer receives your SMS: the app, and its SMS function, become useless.',
  warningPoints: [
    'Commands (arm, disarm, status) are sent to the transmitter by SMS: with no network on the transmitter side, nothing arrives.',
    'The project is no longer maintained and will not be published on Google Play. This version is provided as is.',
  ],
  warningCheck:
    'Before installing: ask your installer or the manufacturer whether your transmitter is 2G-only or supports 4G.',
  closureTitle: 'Why this app?',
  closureText:
    'The official Atlantic (ATEOS) app is no longer available: the company has closed. ATEOS Alarm is an independent alternative that lets you keep controlling your transmitter by SMS.',
  downloadCta: 'Download the APK',
  downloadNote: 'Android only · installed outside the Play Store',
  featuresTitle: 'What it does',
  features: [
    {
      title: 'Arm, disarm',
      text: 'Arm away, arm perimeter, disarm and status query, with a confirmation before each SMS is sent.',
    },
    {
      title: 'Local lock',
      text: 'PIN and biometric unlock protect access, with automatic locking when the app goes to the background.',
    },
    {
      title: 'Zones and journal',
      text: 'Zone tracking and an event history, both stored on the device.',
    },
    {
      title: 'Automatic status',
      text: 'Optionally, the app reads the transmitter’s status SMS to update the home screen.',
    },
    {
      title: 'Local backup',
      text: 'Export and import your settings and history as a JSON file.',
    },
    {
      title: 'French and English',
      text: 'Bilingual interface that follows your phone’s language.',
    },
  ],
  screenshotsTitle: 'Screenshots',
  screenshotAlt: 'App screenshot, view',
  downloadTitle: 'Download ATEOS Alarm',
  downloadText: 'Version 1.0.0 for Android, distributed as an APK. It is not on Google Play.',
  installTitle: 'Installing',
  installSteps: [
    'Download the APK file from the download page.',
    'Open it on your phone and allow installs from that source if Android asks.',
    'On first launch, enter the number of the SIM card in the transmitter.',
  ],
  unofficial: 'Unofficial app, not affiliated with ATEOS or its manufacturers.',
  sourceCode: 'Source code',
  privacyTitle: 'No data collected',
  privacyText:
    'No account, no ads, no server: your settings, code and history stay on your phone. SMS are billed by your carrier.',
};

const COPY: Record<Lang, Copy> = { fr, en };

// French for any French browser language, English for everything else.
const detectLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // Storage can be blocked; fall through to the browser language.
  }
  const languages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  return languages.some((l) => l.toLowerCase().startsWith('fr')) ? 'fr' : 'en';
};

interface I18n {
  lang: Lang;
  t: Copy;
  toggle: () => void;
}

const Context = createContext<I18n | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(detectLang);
  const t = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.documentTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description);
  }, [lang, t]);

  const toggle = useCallback(() => {
    const next: Lang = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, t, toggle }), [lang, t, toggle]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = (): I18n => {
  const value = useContext(Context);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
};
