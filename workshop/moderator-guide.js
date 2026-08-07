(() => {
  "use strict";

  const SOURCE_URL = "../docs/moderator-protocol-run-of-show.md";
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city")?.toLowerCase() === "lausanne" ? "lausanne" : "zurich";
  const supportedLanguages = city === "lausanne" ? ["en", "fr"] : ["en", "de"];
  const requestedLanguage = params.get("lang")?.toLowerCase();
  const language = supportedLanguages.includes(requestedLanguage) ? requestedLanguage : "en";

  const sessionDetails = {
    zurich: ["Zurich workshop", "11 August 2026", language === "de" ? "German room" : "English room"],
    lausanne: ["Lausanne workshop", "12 August 2026", language === "fr" ? "French room" : "English room"]
  };

  const materialFiles = {
    en: {
      consent: "../docs/Workshop_Consent_EN_One_Page.pdf",
      questionnaire: "../docs/Workshop_Questionnaire_EN_Simple_Draft.pdf"
    },
    de: {
      consent: "../docs/Workshop_Consent_DE_One_Page.pdf",
      questionnaire: "../docs/Workshop_Questionnaire_DE_Simple_Draft.pdf"
    },
    fr: {
      consent: "../docs/Workshop_Consent_FR_One_Page.pdf",
      questionnaire: "../docs/Workshop_Questionnaire_FR_Simple_Draft.pdf"
    }
  };

  const allMaterialsFile = "../docs/Swiss_AI_Futures_All_Print_Materials.zip";

  const materialStrings = {
    en: {
      kicker: "Print materials",
      title: "Downloads for this room",
      copy: "The English consent form and questionnaire are ready to download and print.",
      consent: "Consent form",
      consentMeta: "PDF · 1 A4 page",
      questionnaire: "Workshop questionnaire",
      questionnaireMeta: "PDF · 5 A4 pages",
      allDocuments: "All languages · both forms",
      allDocumentsMeta: "ZIP · 6 PDFs · EN / DE / FR",
      action: "Download PDF",
      zipAction: "Download ZIP"
    },
    de: {
      kicker: "Druckunterlagen",
      title: "Downloads für diesen Raum",
      copy: "Einwilligungsformular und Fragebogen auf Deutsch herunterladen und ausdrucken.",
      consent: "Einwilligungsformular",
      consentMeta: "PDF · 1 A4-Seite",
      questionnaire: "Workshop-Fragebogen",
      questionnaireMeta: "PDF · 5 A4-Seiten",
      allDocuments: "Alle Sprachen · beide Formulare",
      allDocumentsMeta: "ZIP · 6 PDFs · EN / DE / FR",
      action: "PDF herunterladen",
      zipAction: "ZIP herunterladen"
    },
    fr: {
      kicker: "Documents à imprimer",
      title: "Téléchargements pour cette salle",
      copy: "Téléchargez et imprimez le formulaire de consentement et le questionnaire en français.",
      consent: "Formulaire de consentement",
      consentMeta: "PDF · 1 page A4",
      questionnaire: "Questionnaire de l’atelier",
      questionnaireMeta: "PDF · 5 pages A4",
      allDocuments: "Toutes les langues · deux formulaires",
      allDocumentsMeta: "ZIP · 6 PDF · EN / DE / FR",
      action: "Télécharger le PDF",
      zipAction: "Télécharger le ZIP"
    }
  };

  const content = document.getElementById("guide-content");
  const title = document.getElementById("guide-title");
  const tableOfContents = document.getElementById("table-of-contents");
  const sessionContext = document.getElementById("session-context");
  const materialsKicker = document.getElementById("print-materials-kicker");
  const materialsTitle = document.getElementById("print-materials-title");
  const materialsCopy = document.getElementById("print-materials-copy");
  const materialDownloads = document.getElementById("material-downloads");
  const locationSwitcher = document.getElementById("guide-location-switcher");
  const languageSwitcher = document.getElementById("guide-language-switcher");
  const backLinks = [document.getElementById("back-to-workshop"), document.getElementById("footer-workshop-link")];
  const progressBar = document.getElementById("reading-progress-bar");

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
    html = html.replace(/`(.+?)`/g, "<code>$1</code>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return html;
  };

  const slugify = (value, usedSlugs) => {
    const base = value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
    let slug = base;
    let suffix = 2;
    while (usedSlugs.has(slug)) {
      slug = `${base}-${suffix}`;
      suffix += 1;
    }
    usedSlugs.add(slug);
    return slug;
  };

  const splitTableRow = (line) =>
    line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());

  const isTableDivider = (line) => {
    const cells = splitTableRow(line);
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  };

  const isBlockStart = (lines, index) => {
    const line = lines[index] || "";
    const nextLine = lines[index + 1] || "";
    return /^#{1,4}\s+/.test(line)
      || /^>\s?/.test(line)
      || /^\s*[-*]\s+/.test(line)
      || /^\s*\d+\.\s+/.test(line)
      || (line.trim().startsWith("|") && nextLine.trim().startsWith("|") && isTableDivider(nextLine));
  };

  const parseMarkdown = (source) => {
    const lines = source.replace(/\r/g, "").split("\n");
    const html = [];
    const headings = [];
    const usedSlugs = new Set();
    let documentTitle = "Moderator guide";
    let checklistIndex = 0;

    for (let index = 0; index < lines.length;) {
      const line = lines[index];

      if (!line.trim()) {
        index += 1;
        continue;
      }

      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = slugify(text.replace(/\*\*/g, ""), usedSlugs);
        if (level === 1) documentTitle = text;
        if (level === 2) headings.push({ id, text });
        html.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
        index += 1;
        continue;
      }

      if (line.trim().startsWith("|") && lines[index + 1]?.trim().startsWith("|") && isTableDivider(lines[index + 1])) {
        const headers = splitTableRow(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].trim().startsWith("|")) {
          rows.push(splitTableRow(lines[index]));
          index += 1;
        }
        html.push(`
          <div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable table">
            <table>
              <thead><tr>${headers.map((cell) => `<th scope="col">${renderInline(cell)}</th>`).join("")}</tr></thead>
              <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
            </table>
          </div>
        `);
        continue;
      }

      if (/^>\s?/.test(line)) {
        const quoteLines = [];
        while (index < lines.length && /^>\s?/.test(lines[index])) {
          quoteLines.push(lines[index].replace(/^>\s?/, "").trim());
          index += 1;
        }
        html.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
        continue;
      }

      const checklistMatch = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
      if (checklistMatch) {
        const items = [];
        while (index < lines.length) {
          const match = lines[index].match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
          if (!match) break;
          const id = `moderator-check-${checklistIndex}`;
          items.push(`<li><label for="${id}"><input id="${id}" type="checkbox" data-check-index="${checklistIndex}"${match[1].toLowerCase() === "x" ? " checked" : ""}><span>${renderInline(match[2])}</span></label></li>`);
          checklistIndex += 1;
          index += 1;
        }
        html.push(`<ul class="checklist">${items.join("")}</ul>`);
        continue;
      }

      if (/^\s*[-*]\s+/.test(line)) {
        const items = [];
        while (index < lines.length) {
          const match = lines[index].match(/^\s*[-*]\s+(.+)$/);
          if (!match || /^\[[ xX]\]\s+/.test(match[1])) break;
          items.push(`<li>${renderInline(match[1])}</li>`);
          index += 1;
        }
        html.push(`<ul>${items.join("")}</ul>`);
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (index < lines.length) {
          const match = lines[index].match(/^\s*\d+\.\s+(.+)$/);
          if (!match) break;
          items.push(`<li>${renderInline(match[1])}</li>`);
          index += 1;
        }
        html.push(`<ol>${items.join("")}</ol>`);
        continue;
      }

      const paragraph = [];
      while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) {
        paragraph.push(lines[index].trim());
        index += 1;
      }
      if (paragraph.length) {
        html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      } else {
        index += 1;
      }
    }

    return { html: html.join("\n"), headings, title: documentTitle };
  };

  const configureSession = () => {
    sessionContext.innerHTML = sessionDetails[city].map((detail) => `<span>${escapeHtml(detail)}</span>`).join("");
    const workshopUrl = new URL("./", window.location.href);
    workshopUrl.searchParams.set("city", city);
    workshopUrl.searchParams.set("lang", language);
    backLinks.forEach((link) => {
      link.href = workshopUrl.toString();
    });
  };

  const renderPrintMaterials = () => {
    const strings = materialStrings[language];
    const files = materialFiles[language];
    materialsKicker.textContent = strings.kicker;
    materialsTitle.textContent = strings.title;
    materialsCopy.textContent = strings.copy;
    materialDownloads.innerHTML = [
      {
        label: strings.consent,
        meta: strings.consentMeta,
        type: language.toUpperCase(),
        href: files.consent,
        filename: `Swiss_AI_Futures_Consent_Form_${language.toUpperCase()}.pdf`,
        action: strings.action
      },
      {
        label: strings.questionnaire,
        meta: strings.questionnaireMeta,
        type: language.toUpperCase(),
        href: files.questionnaire,
        filename: `Swiss_AI_Futures_Workshop_Questionnaire_${language.toUpperCase()}.pdf`,
        action: strings.action
      },
      {
        label: strings.allDocuments,
        meta: strings.allDocumentsMeta,
        type: "ALL",
        href: allMaterialsFile,
        filename: "Swiss_AI_Futures_All_Print_Materials.zip",
        action: strings.zipAction
      }
    ].map((item) => `
      <a class="material-download" href="${item.href}" download="${item.filename}">
        <span class="material-download-type">${item.type}</span>
        <span class="material-download-copy">
          <strong>${item.label}</strong>
          <small>${item.meta}</small>
        </span>
        <span class="material-download-action">${item.action}<span aria-hidden="true">↓</span></span>
      </a>
    `).join("");
  };

  const renderSessionSwitchers = () => {
    locationSwitcher.innerHTML = ["zurich", "lausanne"]
      .map((code) => `
        <button type="button" data-guide-city="${code}" aria-pressed="${code === city ? "true" : "false"}" aria-label="${code === "zurich" ? "Zürich" : "Lausanne"}">
          <span class="guide-location-full">${code === "zurich" ? "Zürich" : "Lausanne"}</span>
          <span class="guide-location-short" aria-hidden="true">${code === "zurich" ? "ZH" : "LS"}</span>
        </button>
      `)
      .join("");

    languageSwitcher.innerHTML = supportedLanguages
      .map((code) => `
        <button type="button" data-guide-language="${code}" aria-pressed="${code === language ? "true" : "false"}">
          ${code.toUpperCase()}
        </button>
      `)
      .join("");
  };

  const switchCity = (nextCity) => {
    if (!sessionDetails[nextCity] || nextCity === city) return;
    const nextLanguage = language === "en" ? "en" : nextCity === "zurich" ? "de" : "fr";
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("city", nextCity);
    nextUrl.searchParams.set("lang", nextLanguage);
    window.location.assign(nextUrl.toString());
  };

  const switchLanguage = (nextLanguage) => {
    if (!supportedLanguages.includes(nextLanguage) || nextLanguage === language) return;
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", nextLanguage);
    window.location.assign(nextUrl.toString());
  };

  const bindSessionSwitchers = () => {
    document.addEventListener("click", (event) => {
      const cityButton = event.target.closest("[data-guide-city]");
      if (cityButton) switchCity(cityButton.dataset.guideCity);

      const languageButton = event.target.closest("[data-guide-language]");
      if (languageButton) switchLanguage(languageButton.dataset.guideLanguage);
    });
  };

  const renderTableOfContents = (headings) => {
    tableOfContents.innerHTML = headings
      .map(({ id, text }) => `<a href="#${id}">${renderInline(text)}</a>`)
      .join("");
  };

  const restoreChecklist = () => {
    const storageKey = "swiss-ai-futures-moderator-checklist";
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      saved = {};
    }

    content.querySelectorAll("[data-check-index]").forEach((checkbox) => {
      if (Object.prototype.hasOwnProperty.call(saved, checkbox.dataset.checkIndex)) {
        checkbox.checked = Boolean(saved[checkbox.dataset.checkIndex]);
      }
      checkbox.addEventListener("change", () => {
        saved[checkbox.dataset.checkIndex] = checkbox.checked;
        try {
          localStorage.setItem(storageKey, JSON.stringify(saved));
        } catch (error) {
          // The guide still works when browser storage is unavailable.
        }
      });
    });
  };

  const bindReadingProgress = () => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressBar.style.width = `${progress * 100}%`;
    };

    const sections = Array.from(content.querySelectorAll("h2"));
    const tocLinks = Array.from(tableOfContents.querySelectorAll("a"));
    const updateCurrentSection = () => {
      let currentId = sections[0]?.id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) currentId = section.id;
      });
      tocLinks.forEach((link) => link.setAttribute("aria-current", String(link.hash === `#${currentId}`)));
    };

    const update = () => {
      updateProgress();
      updateCurrentSection();
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  };

  const bindAmbientPointer = () => {
    window.addEventListener("pointermove", (event) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 18;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 18;
      document.documentElement.style.setProperty("--pointer-x", `${x}px`);
      document.documentElement.style.setProperty("--pointer-y", `${y}px`);
    }, { passive: true });
  };

  const init = async () => {
    configureSession();
    renderPrintMaterials();
    renderSessionSwitchers();
    bindSessionSwitchers();
    bindAmbientPointer();
    document.getElementById("print-guide").addEventListener("click", () => window.print());

    try {
      const response = await fetch(SOURCE_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Source request failed: ${response.status}`);
      const parsed = parseMarkdown(await response.text());
      content.innerHTML = parsed.html;
      title.textContent = parsed.title.replace(/^Swiss AI Futures\s*/i, "") || "Moderator guide";
      document.title = `${parsed.title.replace(/^Swiss AI Futures\s*/i, "")} · Swiss AI Futures`;
      renderTableOfContents(parsed.headings);
      restoreChecklist();
      bindReadingProgress();
    } catch (error) {
      console.error(error);
      content.innerHTML = `
        <div class="load-error">
          <h2>Guide unavailable</h2>
          <p>The Markdown source could not be loaded. Open this page through the workshop website or a local site server.</p>
        </div>
      `;
    }
  };

  init();
})();
