(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const sessionKey = params.get("city")?.toLowerCase() === "lausanne" ? "lausanne" : "zurich";
  const supportedLanguages = sessionKey === "lausanne" ? ["en", "fr"] : ["en", "de"];
  const requestedLanguage = params.get("lang")?.toLowerCase();
  const language = supportedLanguages.includes(requestedLanguage) ? requestedLanguage : "en";
  document.documentElement.lang = language;

  const sourceUrls = {
    en: "../docs/intro-slide.md?v=20260810-16",
    de: "../docs/intro-slide-de.md?v=20260810-16",
    fr: "../docs/intro-slide-fr.md?v=20260810-16"
  };

  const SOURCE_URL = sourceUrls[language];

  const sessions = {
    zurich: {
      en: {
        city: "Zürich",
        date: "Tuesday, August 11",
        time: "5:30–7:30 pm",
        location: "ETH Zürich HG, room F 26.3."
      },
      de: {
        city: "Zürich",
        date: "Dienstag, 11. August",
        time: "17:30–19:30 Uhr",
        location: "ETH Zürich HG, Raum F 26.3."
      }
    },
    lausanne: {
      en: {
        city: "Lausanne",
        date: "Wednesday, August 12",
        time: "5:30–7:30 pm",
        location: "Université de Lausanne, Internef building, room 231."
      },
      fr: {
        city: "Lausanne",
        date: "mercredi 12 août",
        time: "17 h 30–19 h 30",
        location: "Université de Lausanne, bâtiment Internef, salle 231."
      }
    }
  };

  const session = sessions[sessionKey][language];
  const topicRotationBySession = {
    zurich: {
      de: ["work", "education"],
      en: ["education", "work"]
    },
    lausanne: {
      fr: ["work", "education"],
      en: ["education", "work"]
    }
  };
  const [firstRoundPhase, secondRoundPhase] = topicRotationBySession[sessionKey][language];

  const slideMeta = {
    1: { phase: "intro", mode: "context", layout: "hero", timer: 1 },
    2: { phase: "intro", mode: "context", layout: "closing", timer: 3, fragments: "sections" },
    3: { phase: "intro", mode: "process", layout: "closing", timer: 2, fragments: "sections" },
    4: { phase: "intro", mode: "documents", layout: "logistics", timer: 4, fragments: "sections" },
    5: { phase: "intro", mode: "schedule", layout: "schedule", timer: 2, fragments: "sections" },
    6: { phase: "intro", mode: "impact", layout: "closing", timer: 2, fragments: "sections" },
    7: { phase: "intro", mode: "privacy", layout: "closing", timer: 2, fragments: "sections" },
    8: { phase: "intro", mode: "murmi", layout: "murmi-intro", timer: 2 },
    9: { phase: "intro", mode: "process", layout: "method", timer: 2 },
    10: { phase: firstRoundPhase, mode: "evidence", layout: "focus", timer: 3, fragments: "sections" },
    11: { phase: firstRoundPhase, mode: "topic", layout: "topic", timer: 27, fragments: "sections" },
    12: { phase: firstRoundPhase, mode: "survey", layout: "survey", timer: 10 },
    13: { phase: secondRoundPhase, mode: "evidence", layout: "focus", timer: 3, fragments: "sections" },
    14: { phase: secondRoundPhase, mode: "topic", layout: "topic", timer: 27, fragments: "sections", murmiLink: true },
    15: { phase: secondRoundPhase, mode: "survey", layout: "survey", timer: 10 },
    16: { phase: "future", mode: "topic", layout: "topic", timer: 10, fragments: "sections", murmiLink: true },
    17: { phase: "future", mode: "report", layout: "closing", timer: 5, fragments: "sections" },
    18: { phase: "future", mode: "impact", layout: "closing", timer: 5, fragments: "sections" }
  };

  const phaseLabelsByLanguage = {
    en: {
      intro: "Welcome and process",
      work: "Round 2 · AI at work",
      education: "Round 1 · AI in education",
      future: "Principles and next steps"
    },
    de: {
      intro: "Willkommen und Ablauf",
      work: "Runde 1 · KI bei der Arbeit",
      education: "Runde 2 · KI in der Bildung",
      future: "Grundsätze und nächste Schritte"
    },
    fr: {
      intro: "Accueil et déroulement",
      work: "Tour 1 · L’IA au travail",
      education: "Tour 2 · L’IA dans l’éducation",
      future: "Principes et prochaines étapes"
    }
  };

  const modeLabelsByLanguage = {
    en: {
      context: "Project context",
      evidence: "Previous insights",
      process: "How today works",
      documents: "Before we begin",
      schedule: "Today’s plan",
      topic: "Discussion topic",
      murmi: "How Murmi works",
      privacy: "How your words are used",
      survey: "Survey & break",
      impact: "What happens next",
      report: "Today’s result"
    },
    de: {
      context: "Projektkontext",
      evidence: "Bisherige Erkenntnisse",
      process: "So läuft der Workshop",
      documents: "Vor dem Start",
      schedule: "Heutiger Ablauf",
      topic: "Diskussionsthema",
      murmi: "So funktioniert Murmi",
      privacy: "Wie Ihre Worte verwendet werden",
      survey: "Fragebogen & Pause",
      impact: "Wie es weitergeht",
      report: "Heutiges Ergebnis"
    },
    fr: {
      context: "Contexte du projet",
      evidence: "Résultats précédents",
      process: "Déroulement de l’atelier",
      documents: "Avant de commencer",
      schedule: "Programme du jour",
      topic: "Sujet de discussion",
      murmi: "Fonctionnement de Murmi",
      privacy: "Comment vos paroles sont utilisées",
      survey: "Questionnaire & pause",
      impact: "Et ensuite",
      report: "Résultat du jour"
    }
  };

  const uiStrings = {
    en: {
      preparing: "Preparing workshop",
      timer: "Timer",
      back: "Back",
      overview: "Overview",
      notes: "Notes",
      fullscreen: "Full screen",
      next: "Next",
      presenterView: "Presenter view",
      slideNotes: "Slide notes",
      close: "Close",
      timing: "Timing",
      startTimer: "Start timer",
      pause: "Pause",
      reset: "Reset",
      workshopOverview: "Workshop overview",
      chooseSlide: "Choose a slide",
      keyboardShortcuts: "Keyboard shortcuts",
      shortcutLead: "Run the room without looking down",
      nextPrevious: "Next / previous",
      nextPreviousKeys: "→ ← or Space",
      presenterNotes: "Presenter notes",
      blackScreen: "Black screen",
      help: "Help",
      closeOverview: "Close slide overview",
      closeNotes: "Close presenter notes",
      closeHelp: "Close keyboard shortcuts",
      presentationProgress: "Presentation progress",
      presentationControls: "Presentation controls",
      showShortcuts: "Show keyboard shortcuts",
      participantActivity: "Participant activity",
      paperSurvey: "Paper survey",
      murmiArtworkAlt: "Illustrated alpine scene with marmots in conversation",
      murmiDirectAccess: "Anyone can start a session directly for free.",
      murmiLinkLabel: "Open murmi.org in a new tab",
      openMurmi: "Open Murmi",
      moderatorGuide: "Moderator guide",
      openModeratorGuide: "Open the moderator guide in a new tab",
      minutes: "minutes",
      loadError: "Presentation source could not be loaded",
      loadHelp: "Open this page through the local site server.",
      languageLabel: "Presentation language",
      locationLabel: "Workshop location"
    },
    de: {
      preparing: "Workshop wird vorbereitet",
      timer: "Timer",
      back: "Zurück",
      overview: "Übersicht",
      notes: "Notizen",
      fullscreen: "Vollbild",
      next: "Weiter",
      presenterView: "Moderationsansicht",
      slideNotes: "Foliennotizen",
      close: "Schliessen",
      timing: "Zeit",
      startTimer: "Timer starten",
      pause: "Pause",
      reset: "Zurücksetzen",
      workshopOverview: "Workshop-Übersicht",
      chooseSlide: "Folie auswählen",
      keyboardShortcuts: "Tastenkürzel",
      shortcutLead: "Den Raum führen, ohne nach unten zu schauen",
      nextPrevious: "Weiter / zurück",
      nextPreviousKeys: "→ ← oder Leertaste",
      presenterNotes: "Moderationsnotizen",
      blackScreen: "Schwarzer Bildschirm",
      help: "Hilfe",
      closeOverview: "Folienübersicht schliessen",
      closeNotes: "Moderationsnotizen schliessen",
      closeHelp: "Tastenkürzel schliessen",
      presentationProgress: "Präsentationsfortschritt",
      presentationControls: "Präsentationssteuerung",
      showShortcuts: "Tastenkürzel anzeigen",
      participantActivity: "Aktivität",
      paperSurvey: "Papierfragebogen",
      murmiArtworkAlt: "Illustrierte Alpenszene mit Murmeltieren im Gespräch",
      murmiDirectAccess: "Alle können direkt kostenlos eine Sitzung starten.",
      murmiLinkLabel: "murmi.org in einem neuen Tab öffnen",
      openMurmi: "Murmi öffnen",
      moderatorGuide: "Moderationsleitfaden",
      openModeratorGuide: "Moderationsleitfaden in einem neuen Tab öffnen",
      minutes: "Minuten",
      loadError: "Die Präsentationsquelle konnte nicht geladen werden",
      loadHelp: "Öffnen Sie diese Seite über den lokalen Webserver.",
      languageLabel: "Präsentationssprache",
      locationLabel: "Workshop-Ort"
    },
    fr: {
      preparing: "Préparation de l’atelier",
      timer: "Minuteur",
      back: "Retour",
      overview: "Aperçu",
      notes: "Notes",
      fullscreen: "Plein écran",
      next: "Suivant",
      presenterView: "Vue de facilitation",
      slideNotes: "Notes de la diapositive",
      close: "Fermer",
      timing: "Durée",
      startTimer: "Démarrer",
      pause: "Pause",
      reset: "Réinitialiser",
      workshopOverview: "Aperçu de l’atelier",
      chooseSlide: "Choisir une diapositive",
      keyboardShortcuts: "Raccourcis clavier",
      shortcutLead: "Faciliter sans baisser les yeux",
      nextPrevious: "Suivant / précédent",
      nextPreviousKeys: "→ ← ou Espace",
      presenterNotes: "Notes de facilitation",
      blackScreen: "Écran noir",
      help: "Aide",
      closeOverview: "Fermer l’aperçu des diapositives",
      closeNotes: "Fermer les notes de facilitation",
      closeHelp: "Fermer les raccourcis clavier",
      presentationProgress: "Progression de la présentation",
      presentationControls: "Commandes de la présentation",
      showShortcuts: "Afficher les raccourcis clavier",
      participantActivity: "Activité des participants",
      paperSurvey: "Questionnaire papier",
      murmiArtworkAlt: "Scène alpine illustrée avec des marmottes en conversation",
      murmiDirectAccess: "Tout le monde peut lancer directement une session gratuitement.",
      murmiLinkLabel: "Ouvrir murmi.org dans un nouvel onglet",
      openMurmi: "Ouvrir Murmi",
      moderatorGuide: "Guide de facilitation",
      openModeratorGuide: "Ouvrir le guide de facilitation dans un nouvel onglet",
      minutes: "minutes",
      loadError: "La source de la présentation n’a pas pu être chargée",
      loadHelp: "Ouvrez cette page depuis le serveur local.",
      languageLabel: "Langue de la présentation",
      locationLabel: "Lieu de l’atelier"
    }
  };

  const languageNamesByLanguage = {
    en: { en: "English", de: "German", fr: "French" },
    de: { en: "Englisch", de: "Deutsch" },
    fr: { en: "Anglais", fr: "Français" }
  };

  const locationNamesByLanguage = {
    en: { zurich: "Zürich", lausanne: "Lausanne" },
    de: { zurich: "Zürich", lausanne: "Lausanne" },
    fr: { zurich: "Zurich", lausanne: "Lausanne" }
  };

  const phaseLabels = phaseLabelsByLanguage[language];
  const modeLabels = modeLabelsByLanguage[language];
  const ui = uiStrings[language];
  const languageNames = languageNamesByLanguage[language];
  const locationNames = locationNamesByLanguage[language];

  const methodFlowLabelsByLanguage = {
    en: {
      loopOne: "Loop 1",
      loopOneGoal: "Build and test ideas",
      loopTwo: "Loop 2",
      loopTwoGoal: "Build the shared summary",
      repeat: "Review and refine as needed",
      humanSkip: "Human: dot votes · Murmi: 5-point scale",
      final: "Room check",
      flow: "Two loops turn discussion into a checked room summary"
    },
    de: {
      loopOne: "Schleife 1",
      loopOneGoal: "Ideen bilden und prüfen",
      loopTwo: "Schleife 2",
      loopTwoGoal: "Gemeinsame Zusammenfassung",
      repeat: "Bei Bedarf prüfen und verfeinern",
      humanSkip: "Menschlich: Klebepunkte · Murmi: 5-Punkte-Skala",
      final: "Prüfung im Raum",
      flow: "Zwei Schleifen führen von der Diskussion zur geprüften Zusammenfassung"
    },
    fr: {
      loopOne: "Boucle 1",
      loopOneGoal: "Formuler et tester les idées",
      loopTwo: "Boucle 2",
      loopTwoGoal: "Construire la synthèse",
      repeat: "Vérifier et affiner si nécessaire",
      humanSkip: "Humain : gommettes · Murmi : échelle à 5 points",
      final: "Vérification en salle",
      flow: "Deux boucles transforment la discussion en synthèse vérifiée"
    }
  };

  const methodFlowLabels = methodFlowLabelsByLanguage[language];

  const themeColors = {
    intro: "#f3efe6",
    work: "#14213d",
    education: "#e9ddff",
    future: "#dff4df"
  };

  const state = {
    slides: [],
    index: 0,
    timerDuration: 0,
    timerRemaining: 0,
    timerInterval: null,
    timerRunning: false,
    overviewOpen: false,
    notesOpen: false,
    helpOpen: false,
    controlsTimeout: null,
    pointerStartX: null,
    pointerStartY: null
  };

  const elements = {
    root: document.documentElement,
    body: document.body,
    deck: document.getElementById("deck"),
    viewport: document.getElementById("slide-viewport"),
    track: document.getElementById("slide-track"),
    loading: document.getElementById("loading-state"),
    phaseLabel: document.getElementById("phase-label"),
    sessionLabel: document.getElementById("session-label"),
    locationSwitcher: document.getElementById("location-switcher"),
    languageSwitcher: document.getElementById("language-switcher"),
    moderatorGuideLink: document.getElementById("moderator-guide-link"),
    progressFill: document.getElementById("progress-fill"),
    currentSlide: document.getElementById("current-slide"),
    totalSlides: document.getElementById("total-slides"),
    presenterPanel: document.getElementById("presenter-panel"),
    presenterTitle: document.getElementById("presenter-title"),
    presenterTiming: document.getElementById("presenter-timing"),
    presenterNotes: document.getElementById("presenter-notes"),
    overview: document.getElementById("overview"),
    overviewGrid: document.getElementById("overview-grid"),
    helpPanel: document.getElementById("help-panel"),
    blackScreen: document.getElementById("black-screen"),
    timerDisplay: document.getElementById("timer-display"),
    timerLabel: document.getElementById("timer-label"),
    timerValue: document.getElementById("timer-value"),
    themeColor: document.querySelector('meta[name="theme-color"]')
  };

  const escapeHtml = (value) =>
    value.replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    })[character]);

  const renderInline = (value) => {
    let html = escapeHtml(value);
    html = html.replace(
      /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/`(.+?)`/g, "<code>$1</code>");
    return html;
  };

  const localizeInterface = () => {
    elements.root.lang = language;
    document.querySelectorAll("[data-ui]").forEach((node) => {
      const value = ui[node.dataset.ui];
      if (value) node.textContent = value;
    });

    elements.locationSwitcher.setAttribute("aria-label", ui.locationLabel);
    elements.languageSwitcher.setAttribute("aria-label", ui.languageLabel);
    elements.moderatorGuideLink.setAttribute("aria-label", ui.openModeratorGuide);
    document.querySelectorAll('[data-action="previous"]').forEach((node) => node.setAttribute("aria-label", ui.back));
    document.querySelectorAll('[data-action="next"]').forEach((node) => node.setAttribute("aria-label", ui.next));
    document.querySelector('.control-actions [data-action="overview"]').setAttribute("aria-label", ui.overview);
    document.querySelector('.overview-header [data-action="overview"]').setAttribute("aria-label", ui.closeOverview);
    document.querySelector('.control-actions [data-action="notes"]').setAttribute("aria-label", ui.presenterNotes);
    document.querySelector('.presenter-heading [data-action="notes"]').setAttribute("aria-label", ui.closeNotes);
    document.querySelector('[data-action="fullscreen"]').setAttribute("aria-label", ui.fullscreen);
    document.querySelector('.help-trigger').setAttribute("aria-label", ui.showShortcuts);
    document.querySelector('.help-panel [data-action="help"]').setAttribute("aria-label", ui.closeHelp);
    document.querySelector('.progress-wrap').setAttribute("aria-label", ui.presentationProgress);
    document.querySelector('.control-actions').setAttribute("aria-label", ui.presentationControls);
    elements.presenterPanel.setAttribute("aria-label", ui.presenterView);
    elements.overview.setAttribute("aria-label", ui.workshopOverview);
    elements.helpPanel.setAttribute("aria-label", ui.keyboardShortcuts);

    document.querySelector('.control-actions [data-action="overview"]').setAttribute("aria-expanded", "false");
    document.querySelector('.control-actions [data-action="notes"]').setAttribute("aria-expanded", "false");
    document.querySelector('.help-trigger').setAttribute("aria-expanded", "false");
  };

  const renderLanguageSwitcher = () => {
    elements.languageSwitcher.innerHTML = supportedLanguages
      .map((code) => `
        <button
          type="button"
          data-language="${code}"
          lang="${code}"
          aria-pressed="${code === language ? "true" : "false"}"
          aria-label="${escapeHtml(languageNames[code])}"
          title="${escapeHtml(languageNames[code])}"
        >${code.toUpperCase()}</button>
      `)
      .join("");
  };

  const renderLocationSwitcher = () => {
    elements.locationSwitcher.innerHTML = ["zurich", "lausanne"]
      .map((code) => `
        <button
          type="button"
          data-session="${code}"
          aria-pressed="${code === sessionKey ? "true" : "false"}"
          aria-label="${escapeHtml(locationNames[code])}"
          title="${escapeHtml(locationNames[code])}"
        ><span class="location-full">${escapeHtml(locationNames[code])}</span><span class="location-short" aria-hidden="true">${code === "zurich" ? "ZH" : "LS"}</span></button>
      `)
      .join("");
  };

  const configureModeratorGuideLink = () => {
    const guideUrl = new URL("moderator-guide.html", window.location.href);
    guideUrl.searchParams.set("city", sessionKey);
    guideUrl.searchParams.set("lang", language);
    elements.moderatorGuideLink.href = guideUrl.toString();
  };

  const switchLanguage = (nextLanguage) => {
    if (!supportedLanguages.includes(nextLanguage) || nextLanguage === language) return;
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", nextLanguage);
    window.location.assign(nextUrl.toString());
  };

  const switchSession = (nextSessionKey) => {
    if (!sessions[nextSessionKey] || nextSessionKey === sessionKey) return;
    const nextLanguage = language === "en" ? "en" : nextSessionKey === "zurich" ? "de" : "fr";
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("city", nextSessionKey);
    nextUrl.searchParams.set("lang", nextLanguage);
    window.location.assign(nextUrl.toString());
  };

  const replaceSessionTokens = (value) =>
    value
      .replaceAll("[Date]", session.date)
      .replaceAll("[Time]", session.time)
      .replaceAll("[Location]", session.location)
      .replaceAll("[Datum]", session.date)
      .replaceAll("[Zeit]", session.time)
      .replaceAll("[Ort]", session.location)
      .replaceAll("[Heure]", session.time)
      .replaceAll("[Lieu]", session.location)
      .replaceAll("[Zurich / Lausanne]", session.city);

  const parseBlocks = (source) => {
    const lines = replaceSessionTokens(source).replace(/\r/g, "").split("\n");
    const blocks = [];
    let paragraph = [];
    let list = null;
    let quote = [];

    const flushParagraph = () => {
      if (!paragraph.length) return;
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    };

    const flushList = () => {
      if (!list) return;
      blocks.push(list);
      list = null;
    };

    const flushQuote = () => {
      if (!quote.length) return;
      blocks.push({ type: "quote", text: quote.join(" ").trim() });
      quote = [];
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushQuote();
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        flushAll();
        return;
      }

      if (line === "[QR code]") {
        flushAll();
        blocks.push({ type: "qr" });
        return;
      }

      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        flushAll();
        blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
        return;
      }

      const unordered = line.match(/^\*\s+(.+)$/);
      const ordered = line.match(/^\d+\.\s+(.+)$/);
      if (unordered || ordered) {
        flushParagraph();
        flushQuote();
        const orderedList = Boolean(ordered);
        if (!list || list.ordered !== orderedList) {
          flushList();
          list = { type: "list", ordered: orderedList, items: [] };
        }
        list.items.push((unordered || ordered)[1]);
        return;
      }

      if (line.startsWith(">")) {
        flushParagraph();
        flushList();
        quote.push(line.replace(/^>\s?/, ""));
        return;
      }

      flushList();
      flushQuote();
      paragraph.push(line);
    });

    flushAll();
    return blocks;
  };

  const renderBlock = (block, options = {}) => {
    const fragment = options.fragment ? " data-fragment" : "";
    if (block.type === "paragraph") return `<p${fragment}>${renderInline(block.text)}</p>`;
    if (block.type === "heading") {
      if (block.level === 1) return `<h1 class="slide-finale"${fragment}>${renderInline(block.text)}</h1>`;
      return `<h${block.level}${fragment}>${renderInline(block.text)}</h${block.level}>`;
    }
    if (block.type === "quote") return `<blockquote${fragment}>${renderInline(block.text)}</blockquote>`;
    if (block.type === "list") {
      const tag = block.ordered ? "ol" : "ul";
      const items = block.items
        .map((item) => `<li${options.fragmentItems ? " data-fragment" : ""}>${renderInline(item)}</li>`)
        .join("");
      return `<${tag}${fragment}>${items}</${tag}>`;
    }
    return "";
  };

  const renderBlocks = (blocks, options = {}) => blocks.map((block) => renderBlock(block, options)).join("");

  const renderMethodStage = (item, number, options = {}) => `
    <div class="method-stage${options.milestone ? " method-stage-milestone" : ""}" role="listitem">
      <span class="method-stage-number" aria-hidden="true">${number}</span>
      <div class="method-stage-copy">
        ${options.eyebrow ? `<span class="method-stage-eyebrow">${escapeHtml(options.eyebrow)}</span>` : ""}
        <strong>${renderInline(item)}</strong>
      </div>
    </div>
  `;

  const renderMethodFlowSection = (section, fragmentSections) => {
    const sequence = section.blocks.find((block) => block.type === "list" && block.ordered);
    if (!sequence || sequence.items.length !== 6) {
      return `
        <section class="slide-section"${fragmentSections ? " data-fragment" : ""}>
          <h2>${renderInline(section.title)}</h2>
          ${renderBlocks(section.blocks)}
        </section>
      `;
    }

    const [groupDiscussion, representativeShares, everyoneVotes, checkConsensus, revise, acceptConsensus] = sequence.items;
    return `
      <section class="slide-section method-flow-section"${fragmentSections ? " data-fragment" : ""}>
        <p class="method-flow-intro">${renderInline(section.title)}</p>
        <div class="method-flow" role="group" aria-label="${escapeHtml(methodFlowLabels.flow)}">
          <div class="method-loop method-loop-one" role="list">
            <div class="method-loop-heading">
              <span>${escapeHtml(methodFlowLabels.loopOne)}</span>
              <strong>${escapeHtml(methodFlowLabels.loopOneGoal)}</strong>
            </div>
            <div class="method-track">
              ${renderMethodStage(groupDiscussion, 1)}
              <div class="method-stage-arrow" aria-hidden="true">→</div>
              ${renderMethodStage(representativeShares, 2)}
              <div class="method-stage-arrow" aria-hidden="true">→</div>
              ${renderMethodStage(everyoneVotes, 3, { milestone: true })}
            </div>
            <div class="method-loop-footer">
              <span class="method-loop-return"><span aria-hidden="true">↺</span>${escapeHtml(methodFlowLabels.repeat)}</span>
              <span class="method-format-note">${escapeHtml(methodFlowLabels.humanSkip)}</span>
            </div>
          </div>
          <div class="method-loop method-loop-two" role="list">
            <div class="method-loop-heading">
              <span>${escapeHtml(methodFlowLabels.loopTwo)}</span>
              <strong>${escapeHtml(methodFlowLabels.loopTwoGoal)}</strong>
            </div>
            <div class="method-track">
              ${renderMethodStage(checkConsensus, 4)}
              <div class="method-stage-arrow" aria-hidden="true">→</div>
              ${renderMethodStage(revise, 5)}
              <div class="method-stage-arrow" aria-hidden="true">→</div>
              ${renderMethodStage(acceptConsensus, 6, { milestone: true, eyebrow: methodFlowLabels.final })}
            </div>
            <div class="method-loop-footer">
              <span class="method-loop-return"><span aria-hidden="true">↺</span>${escapeHtml(methodFlowLabels.repeat)}</span>
            </div>
          </div>
        </div>
      </section>
    `;
  };

  const extractSection = (block, heading) => {
    const marker = `## ${heading}`;
    const start = block.indexOf(marker);
    if (start < 0) return "";
    const contentStart = start + marker.length;
    const rest = block.slice(contentStart);
    const next = rest.search(/\n## (?:On-screen copy|Presenter notes|Visual direction|Timing)\b/);
    return (next < 0 ? rest : rest.slice(0, next))
      .replace(/\n---[\s\S]*$/, "")
      .trim();
  };

  const parseSlides = (source) => {
    const matches = Array.from(source.matchAll(/^# Slide (\d+)\.\s*(.+)$/gm));
    return matches.map((match, index) => {
      const number = Number(match[1]);
      const blockStart = match.index;
      const blockEnd = index + 1 < matches.length ? matches[index + 1].index : source.length;
      const block = source.slice(blockStart, blockEnd);
      const onScreen = extractSection(block, "On-screen copy");
      const notes = extractSection(block, "Presenter notes");
      const timing = extractSection(block, "Timing");
      const visual = extractSection(block, "Visual direction");
      const blocks = parseBlocks(onScreen);
      const firstTitle = blocks.find((item) => item.type === "heading" && item.level === 1);
      return {
        number,
        sourceTitle: match[2].trim(),
        title: firstTitle?.text || match[2].trim(),
        blocks,
        notes,
        timing,
        visual,
        ...slideMeta[number]
      };
    });
  };

  const structureSlide = (slide) => {
    const blocks = [...slide.blocks];
    const titleIndex = blocks.findIndex((block) => block.type === "heading" && block.level === 1);
    const title = titleIndex >= 0 ? blocks.splice(titleIndex, 1)[0].text : slide.title;
    const lead = [];
    const sections = [];
    let activeSection = null;
    let hasQr = false;

    blocks.forEach((block) => {
      if (block.type === "qr") {
        hasQr = true;
        return;
      }
      if (block.type === "heading" && block.level === 2) {
        activeSection = { title: block.text, blocks: [] };
        sections.push(activeSection);
        return;
      }
      if (activeSection) activeSection.blocks.push(block);
      else lead.push(block);
    });

    return { title, lead, sections, hasQr };
  };

  const renderSlide = (slide) => {
    const structured = structureSlide(slide);
    const fragmentSections = slide.fragments === "sections";
    const fragmentItems = slide.fragments === "list";
    const leadHtml = renderBlocks(structured.lead, { fragmentItems });
    const sectionsHtml = structured.sections
      .map((section, sectionIndex) => {
        if (slide.layout === "method" && sectionIndex === 0) {
          return renderMethodFlowSection(section, fragmentSections);
        }
        return `
          <section class="slide-section"${fragmentSections ? " data-fragment" : ""}>
            <h2>${renderInline(section.title)}</h2>
            ${renderBlocks(section.blocks, { fragmentItems })}
          </section>
        `;
      })
      .join("");
    const processFlow = slide.layout === "synthesis"
      ? `<div class="process-flow" aria-label="Synthesis process">
          <span data-fragment>Table discussions</span>
          <span data-fragment>Submissions</span>
          <span data-fragment>Draft</span>
          <span data-fragment>Correction</span>
          <span data-fragment>Final outcome</span>
        </div>`
      : "";
    const qr = structured.hasQr
      ? `<div class="qr-placeholder"${slide.layout === "closing" ? " data-fragment" : ""} role="img" aria-label="Survey QR code placeholder"><span>Survey QR<br>appears here</span></div>`
      : "";
    const murmiLiveLink = slide.murmiLink
      ? `<a class="murmi-live-link" href="https://www.murmi.org/" target="_blank" rel="noopener" aria-label="${escapeHtml(ui.murmiLinkLabel)}">
          <span>
            <strong>${escapeHtml(ui.openMurmi)}</strong>
            <small>murmi.org</small>
          </span>
          <span aria-hidden="true">↗</span>
        </a>`
      : "";

    if (slide.layout === "murmi-intro") {
      return `
        <article class="slide layout-murmi-intro" data-slide="${slide.number}" data-phase="${slide.phase}" data-mode="${slide.mode}" aria-hidden="true">
          <div class="slide-stage-mark" aria-hidden="true">${String(slide.number).padStart(2, "0")}</div>
          <div class="slide-shell">
            <div class="murmi-intro-copy">
              <header class="slide-heading">
                <div>
                  <p class="slide-kicker">
                    <strong class="slide-theme-label">${escapeHtml(modeLabels[slide.mode])}</strong>
                    <span class="slide-context-label">${escapeHtml(phaseLabels[slide.phase])} · ${String(slide.number).padStart(2, "0")}</span>
                  </p>
                  <h1 class="slide-title">${renderInline(structured.title)}</h1>
                </div>
              </header>
              <div class="slide-body">
                <div class="slide-lead">${leadHtml}</div>
                <div class="slide-sections">${sectionsHtml}</div>
              </div>
            </div>
            <figure class="murmi-intro-media">
              <img src="../assets/images/murmi/hero-gathering.webp" alt="${escapeHtml(ui.murmiArtworkAlt)}" width="1536" height="1024">
              <a class="murmi-intro-link" href="https://www.murmi.org/" target="_blank" rel="noopener" aria-label="${escapeHtml(ui.murmiLinkLabel)}">
                <span>
                  <strong>murmi.org</strong>
                  <small>${escapeHtml(ui.murmiDirectAccess)}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </figure>
          </div>
        </article>
      `;
    }

    return `
      <article class="slide layout-${slide.layout}" data-slide="${slide.number}" data-phase="${slide.phase}" data-mode="${slide.mode}" aria-hidden="true">
        <div class="slide-stage-mark" aria-hidden="true">${String(slide.number).padStart(2, "0")}</div>
        <div class="slide-shell">
          <header class="slide-heading${slide.murmiLink ? " slide-heading-with-action" : ""}">
            <div>
              <p class="slide-kicker">
                <strong class="slide-theme-label">${escapeHtml(modeLabels[slide.mode])}</strong>
                <span class="slide-context-label">${escapeHtml(phaseLabels[slide.phase])} · ${String(slide.number).padStart(2, "0")}</span>
              </p>
              <h1 class="slide-title">${renderInline(structured.title)}</h1>
            </div>
            ${murmiLiveLink}
          </header>
          <div class="slide-body">
            <div class="slide-lead">${leadHtml}</div>
            <div class="slide-sections">${sectionsHtml}</div>
            ${processFlow}
            ${qr}
          </div>
        </div>
      </article>
    `;
  };

  const renderOverview = () => {
    elements.overviewGrid.innerHTML = state.slides
      .map((slide, index) => `
        <button class="overview-card" type="button" data-slide-target="${index}" data-phase="${slide.phase}">
          <span>${String(slide.number).padStart(2, "0")} · ${modeLabels[slide.mode]}</span>
          <strong>${renderInline(slide.title)}</strong>
        </button>
      `)
      .join("");
  };

  const renderNotes = (slide) => {
    const noteBlocks = parseBlocks(slide.notes);
    const visualBlocks = slide.visual ? parseBlocks(`### Visual cue\n${slide.visual}`) : [];
    elements.presenterTitle.textContent = `${String(slide.number).padStart(2, "0")} · ${slide.title}`;
    elements.presenterTiming.textContent = slide.timing || `${slide.timer} ${ui.minutes}`;
    elements.presenterNotes.innerHTML = renderBlocks([...noteBlocks, ...visualBlocks]);
  };

  const getFragmentNodes = () => {
    const currentNumber = state.slides[state.index]?.number;
    return Array.from(elements.track.querySelector(`.slide[data-slide="${currentNumber}"]`)?.querySelectorAll("[data-fragment]") || []);
  };

  const revealNextFragment = () => {
    const hiddenFragment = getFragmentNodes().find((fragment) => !fragment.classList.contains("is-revealed"));
    if (!hiddenFragment) return false;
    hiddenFragment.classList.add("is-revealed");
    return true;
  };

  const hidePreviousFragment = () => {
    const revealed = getFragmentNodes().filter((fragment) => fragment.classList.contains("is-revealed"));
    if (!revealed.length) return false;
    revealed[revealed.length - 1].classList.remove("is-revealed");
    return true;
  };

  const updateNavigationState = () => {
    const fragments = getFragmentNodes();
    const hasRevealedFragment = fragments.some((fragment) => fragment.classList.contains("is-revealed"));
    const hasHiddenFragment = fragments.some((fragment) => !fragment.classList.contains("is-revealed"));
    const previousDisabled = state.index === 0 && !hasRevealedFragment;
    const nextDisabled = state.index === state.slides.length - 1 && !hasHiddenFragment;

    document.querySelectorAll('[data-action="previous"]').forEach((button) => {
      button.disabled = previousDisabled;
    });
    document.querySelectorAll('[data-action="next"]').forEach((button) => {
      button.disabled = nextDisabled;
    });
  };

  const updateSlide = (nextIndex, options = {}) => {
    if (!state.slides.length) return;
    state.index = Math.max(0, Math.min(nextIndex, state.slides.length - 1));
    const slide = state.slides[state.index];
    const slideNodes = Array.from(elements.track.querySelectorAll(".slide"));

    slideNodes.forEach((node, index) => {
      const active = index === state.index;
      node.classList.toggle("is-active", active);
      node.classList.toggle("is-before", index < state.index);
      node.classList.toggle("is-after", index > state.index);
      node.setAttribute("aria-hidden", active ? "false" : "true");
    });

    const activeSlide = slideNodes[state.index];
    if (activeSlide) activeSlide.scrollTop = 0;

    elements.root.dataset.phase = slide.phase;
    elements.phaseLabel.textContent = `${modeLabels[slide.mode]} · ${phaseLabels[slide.phase]}`;
    elements.currentSlide.textContent = String(slide.number).padStart(2, "0");
    elements.totalSlides.textContent = String(state.slides.length).padStart(2, "0");
    elements.progressFill.style.transform = `scaleX(${(state.index + 1) / state.slides.length})`;
    elements.themeColor.setAttribute("content", themeColors[slide.phase]);
    document.title = `${String(slide.number).padStart(2, "0")} · ${slide.title} — Swiss AI Futures`;
    renderNotes(slide);
    resetTimerForSlide(slide);
    updateOverviewCurrent();
    updateNavigationState();

    if (!options.fromHash) {
      history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/${slide.number}`);
    }
    resetControlsTimeout();
  };

  const next = () => {
    if (revealNextFragment()) {
      updateNavigationState();
      return;
    }
    updateSlide(state.index + 1);
  };

  const previous = () => {
    if (hidePreviousFragment()) {
      updateNavigationState();
      return;
    }
    updateSlide(state.index - 1);
  };

  const updateOverviewCurrent = () => {
    elements.overviewGrid.querySelectorAll(".overview-card").forEach((card, index) => {
      card.setAttribute("aria-current", index === state.index ? "true" : "false");
    });
  };

  const toggleOverview = (force) => {
    const wasOpen = state.overviewOpen;
    state.overviewOpen = typeof force === "boolean" ? force : !state.overviewOpen;
    elements.overview.classList.toggle("is-open", state.overviewOpen);
    elements.overview.setAttribute("aria-hidden", state.overviewOpen ? "false" : "true");
    document.querySelector('.control-actions [data-action="overview"]').setAttribute("aria-expanded", String(state.overviewOpen));
    if (state.overviewOpen) {
      toggleHelp(false);
      window.setTimeout(() => elements.overviewGrid.querySelector('[aria-current="true"]')?.focus(), 0);
    } else if (wasOpen) {
      window.setTimeout(() => document.querySelector('.control-actions [data-action="overview"]')?.focus(), 0);
    }
    resetControlsTimeout();
  };

  const toggleNotes = (force) => {
    const wasOpen = state.notesOpen;
    state.notesOpen = typeof force === "boolean" ? force : !state.notesOpen;
    elements.body.classList.toggle("notes-open", state.notesOpen);
    elements.presenterPanel.setAttribute("aria-hidden", state.notesOpen ? "false" : "true");
    document.querySelector('.control-actions [data-action="notes"]').setAttribute("aria-expanded", String(state.notesOpen));
    if (state.notesOpen) {
      toggleOverview(false);
      window.setTimeout(() => document.querySelector('.presenter-heading [data-action="notes"]')?.focus(), 0);
    } else if (wasOpen) {
      window.setTimeout(() => document.querySelector('.control-actions [data-action="notes"]')?.focus(), 0);
    }
    resetControlsTimeout();
  };

  const toggleHelp = (force) => {
    const wasOpen = state.helpOpen;
    state.helpOpen = typeof force === "boolean" ? force : !state.helpOpen;
    elements.helpPanel.classList.toggle("is-open", state.helpOpen);
    elements.helpPanel.setAttribute("aria-hidden", state.helpOpen ? "false" : "true");
    document.querySelector('.help-trigger').setAttribute("aria-expanded", String(state.helpOpen));
    if (state.helpOpen) {
      toggleOverview(false);
      window.setTimeout(() => document.querySelector('.help-panel [data-action="help"]')?.focus(), 0);
    } else if (wasOpen) {
      window.setTimeout(() => document.querySelector('.help-trigger')?.focus(), 0);
    }
    resetControlsTimeout();
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (_) {
      // Fullscreen can be blocked by browser policy; the deck remains usable.
    }
  };

  const toggleBlackScreen = (force) => {
    const show = typeof force === "boolean" ? force : elements.blackScreen.hidden;
    elements.blackScreen.hidden = !show;
  };

  const formatTime = (seconds) => {
    const safe = Math.max(0, seconds);
    const minutes = Math.floor(safe / 60);
    const remainder = safe % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  const updateTimerDisplay = () => {
    elements.timerValue.textContent = formatTime(state.timerRemaining);
    elements.timerDisplay.classList.toggle("is-urgent", state.timerRemaining > 0 && state.timerRemaining <= 60);
  };

  const stopTimerInterval = () => {
    if (state.timerInterval) window.clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.timerRunning = false;
  };

  const resetTimerForSlide = (slide) => {
    stopTimerInterval();
    state.timerDuration = (slide.timer || 2) * 60;
    state.timerRemaining = state.timerDuration;
    elements.timerLabel.textContent = slide.layout === "activity"
      ? ui.participantActivity
      : slide.layout === "survey"
        ? ui.paperSurvey
        : phaseLabels[slide.phase];
    elements.timerDisplay.hidden = true;
    elements.body.classList.remove("timer-visible");
    elements.timerDisplay.classList.remove("is-urgent");
    updateTimerDisplay();
  };

  const startTimer = () => {
    if (state.timerRunning) return;
    if (state.timerRemaining <= 0) state.timerRemaining = state.timerDuration;
    elements.timerDisplay.hidden = false;
    elements.body.classList.add("timer-visible");
    state.timerRunning = true;
    state.timerInterval = window.setInterval(() => {
      state.timerRemaining -= 1;
      updateTimerDisplay();
      if (state.timerRemaining <= 0) stopTimerInterval();
    }, 1000);
    updateTimerDisplay();
    resetControlsTimeout();
  };

  const pauseTimer = () => {
    stopTimerInterval();
    resetControlsTimeout();
  };

  const resetTimer = () => {
    stopTimerInterval();
    state.timerRemaining = state.timerDuration;
    elements.timerDisplay.hidden = false;
    elements.body.classList.add("timer-visible");
    elements.timerDisplay.classList.remove("is-urgent");
    updateTimerDisplay();
    resetControlsTimeout();
  };

  const toggleTimer = () => {
    if (state.timerRunning) pauseTimer();
    else startTimer();
  };

  const performAction = (action) => {
    const actions = {
      previous,
      next,
      overview: () => toggleOverview(),
      notes: () => toggleNotes(),
      fullscreen: toggleFullscreen,
      help: () => toggleHelp(),
      "timer-start": startTimer,
      "timer-pause": pauseTimer,
      "timer-reset": resetTimer
    };
    actions[action]?.();
  };

  const handleKeydown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key.toLowerCase();

    if (key === "escape") {
      toggleOverview(false);
      toggleHelp(false);
      toggleBlackScreen(false);
      return;
    }

    if (state.helpOpen || state.overviewOpen) {
      if (key === "o") toggleOverview();
      if (key === "?") toggleHelp();
      return;
    }

    if (["arrowright", "pagedown", " "].includes(key)) {
      event.preventDefault();
      next();
    } else if (["arrowleft", "pageup"].includes(key)) {
      event.preventDefault();
      previous();
    } else if (key === "home") {
      event.preventDefault();
      updateSlide(0);
    } else if (key === "end") {
      event.preventDefault();
      updateSlide(state.slides.length - 1);
    } else if (key === "o") {
      toggleOverview();
    } else if (key === "n") {
      toggleNotes();
    } else if (key === "f") {
      toggleFullscreen();
    } else if (key === "b") {
      toggleBlackScreen();
    } else if (key === "t") {
      toggleTimer();
    } else if (key === "?" || key === "/") {
      toggleHelp();
    }
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    elements.body.classList.remove("controls-hidden");
    if (state.controlsTimeout) window.clearTimeout(state.controlsTimeout);
    if (state.notesOpen || state.overviewOpen || state.helpOpen) return;
    state.controlsTimeout = window.setTimeout(() => {
      elements.body.classList.add("controls-hidden");
    }, 4200);
  };

  const handlePointerMove = (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;
    document.documentElement.style.setProperty("--pointer-x", `${x}px`);
    document.documentElement.style.setProperty("--pointer-y", `${y}px`);
    resetControlsTimeout();
  };

  const handleHash = () => {
    const match = window.location.hash.match(/#\/?(\d+)/);
    if (!match) return;
    const requested = Number(match[1]) - 1;
    if (requested !== state.index) updateSlide(requested, { fromHash: true });
  };

  const bindEvents = () => {
    document.addEventListener("click", (event) => {
      const sessionNode = event.target.closest("[data-session]");
      if (sessionNode) switchSession(sessionNode.dataset.session);

      const languageNode = event.target.closest("[data-language]");
      if (languageNode) switchLanguage(languageNode.dataset.language);

      const actionNode = event.target.closest("[data-action]");
      if (actionNode) performAction(actionNode.dataset.action);

      const slideTarget = event.target.closest("[data-slide-target]");
      if (slideTarget) {
        toggleOverview(false);
        updateSlide(Number(slideTarget.dataset.slideTarget));
      }
    });

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("touchstart", resetControlsTimeout, { passive: true });
    window.addEventListener("hashchange", handleHash);

    elements.viewport.addEventListener("pointerdown", (event) => {
      state.pointerStartX = event.clientX;
      state.pointerStartY = event.clientY;
    });

    elements.viewport.addEventListener("pointerup", (event) => {
      if (state.pointerStartX === null || state.pointerStartY === null) return;
      const distanceX = event.clientX - state.pointerStartX;
      const distanceY = event.clientY - state.pointerStartY;
      state.pointerStartX = null;
      state.pointerStartY = null;
      if (Math.abs(distanceX) < 70 || Math.abs(distanceX) <= Math.abs(distanceY) * 1.15) return;
      if (distanceX < 0) next();
      else previous();
    });

    elements.viewport.addEventListener("pointercancel", () => {
      state.pointerStartX = null;
      state.pointerStartY = null;
    });
  };

  const showLoadError = () => {
    elements.loading.innerHTML = `
      <span>${escapeHtml(ui.loadError)}</span>
      <strong>${escapeHtml(ui.loadHelp)}</strong>
    `;
  };

  const init = async () => {
    localizeInterface();
    renderLocationSwitcher();
    renderLanguageSwitcher();
    configureModeratorGuideLink();
    elements.sessionLabel.textContent = `${session.date} · ${session.time} · ${session.location}`;
    try {
      const response = await fetch(SOURCE_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Source request failed: ${response.status}`);
      const source = await response.text();
      state.slides = parseSlides(source);
      if (state.slides.length !== 18) throw new Error(`Expected 18 slides, found ${state.slides.length}`);

      elements.track.innerHTML = state.slides.map(renderSlide).join("");
      renderOverview();
      bindEvents();

      const hashMatch = window.location.hash.match(/#\/?(\d+)/);
      const startIndex = hashMatch ? Number(hashMatch[1]) - 1 : 0;
      updateSlide(startIndex, { fromHash: Boolean(hashMatch) });
      elements.loading.classList.add("is-hidden");
      window.setTimeout(() => elements.loading.remove(), 350);

      if (params.get("presenter") === "1") toggleNotes(true);
      resetControlsTimeout();
    } catch (error) {
      console.error(error);
      showLoadError();
    }
  };

  init();
})();
