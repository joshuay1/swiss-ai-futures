(() => {
  "use strict";

  const documents = {
    en: {
      source: "chapter4-en.md",
      filename: "chapter4-en.md",
      storageKey: "swiss-ai-futures-chapter4-en-draft-v1",
      labels: {
        published: "Published source",
        draft: "Local draft",
        edit: "Edit Markdown",
        close: "Close editor",
        richCopied: "English chapter copied for Google Docs. Paste it, then add each downloaded image at its named placeholder.",
        copied: "English Markdown copied.",
        downloaded: "English Markdown downloaded.",
        reset: "Discard the English draft saved in this browser?"
      }
    },
    de: {
      source: "chapter4-de.md",
      filename: "chapter4-de.md",
      storageKey: "swiss-ai-futures-chapter4-de-draft-v1",
      labels: {
        published: "Veröffentlichte Quelle",
        draft: "Lokaler Entwurf",
        edit: "Markdown bearbeiten",
        close: "Editor schliessen",
        richCopied: "Das deutsche Kapitel wurde für Google Docs kopiert. Danach jedes heruntergeladene Bild am benannten Platzhalter einfügen.",
        copied: "Deutsches Markdown kopiert.",
        downloaded: "Deutsches Markdown heruntergeladen.",
        reset: "Den in diesem Browser gespeicherten deutschen Entwurf verwerfen?"
      }
    }
  };

  const state = {
    view: "compare",
    editing: { en: false, de: false },
    published: { en: "", de: "" },
    current: { en: "", de: "" },
    timers: { en: null, de: null }
  };

  const workspaceGrid = document.querySelector(".workspace-grid");
  const toast = document.getElementById("toast");
  let toastTimer = null;

  marked.setOptions({
    gfm: true,
    breaks: false
  });

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2800);
  }

  function safeLocalGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function safeLocalSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (_) {
      return false;
    }
  }

  function safeLocalRemove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (_) {
      // The preview still works when browser storage is unavailable.
    }
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70);
  }

  function render(language) {
    const preview = document.getElementById(`preview-${language}`);
    preview.innerHTML = marked.parse(state.current[language]);

    const usedIds = new Set();
    preview.querySelectorAll("h1, h2, h3, h4").forEach((heading, index) => {
      const base = `${language}-${slugify(heading.textContent) || `section-${index + 1}`}`;
      let id = base;
      let duplicate = 2;
      while (usedIds.has(id)) {
        id = `${base}-${duplicate}`;
        duplicate += 1;
      }
      usedIds.add(id);
      heading.id = id;
    });

    preview.querySelectorAll("a[href^='http']").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    preview.querySelectorAll("img").forEach((image) => {
      image.loading = "lazy";
      image.decoding = "async";

      const source = image.getAttribute("src");
      if (!source || image.closest(".image-handoff")) return;

      const filename = decodeURIComponent(source.split("/").pop() || `chapter4-image-${language}`);
      const wrapper = document.createElement("span");
      wrapper.className = "image-handoff";
      image.replaceWith(wrapper);
      wrapper.appendChild(image);

      const download = document.createElement("a");
      download.className = "figure-download";
      download.href = source;
      download.download = filename;
      download.target = "_blank";
      download.rel = "noopener noreferrer";
      download.textContent = language === "de"
        ? `Bild in voller Auflösung herunterladen · ${filename}`
        : `Download full-size image · ${filename}`;
      download.setAttribute(
        "aria-label",
        language === "de"
          ? `${filename} in voller Auflösung herunterladen und direkt über der folgenden Bildlegende einfügen`
          : `Download ${filename} at full resolution and insert it directly above the caption that follows`
      );
      wrapper.appendChild(download);
    });

    updateStatus(language);
    updateConsistency();
  }

  function updateStatus(language) {
    const status = document.querySelector(`[data-status='${language}']`);
    const hasDraft = state.current[language] !== state.published[language];
    status.textContent = hasDraft ? documents[language].labels.draft : documents[language].labels.published;
    status.classList.toggle("is-draft", hasDraft);
  }

  function analyse(markdown) {
    const headingMatches = [...markdown.matchAll(/^(#{1,6})\s+(.+)$/gm)];
    const headings = headingMatches.map((match) => ({
      level: match[1].length,
      number: (match[2].match(/^([0-9]+(?:\.[0-9]+)*)/) || [null, ""])[1]
    }));
    const figures = (markdown.match(/<img\s/gi) || []).length + (markdown.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length;
    const tableHeaders = (markdown.match(/^\|(?:[^\n]*\|)+\n\|\s*:?-+/gm) || []).length;
    const words = markdown
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*_>|`\[\]()]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return { headings, figures, tables: tableHeaders, words };
  }

  function updateConsistency() {
    if (!state.current.en || !state.current.de) return;

    const en = analyse(state.current.en);
    const de = analyse(state.current.de);
    const enStructure = en.headings.map((item) => `${item.level}:${item.number}`).join("|");
    const deStructure = de.headings.map((item) => `${item.level}:${item.number}`).join("|");
    const aligned = enStructure === deStructure && en.figures === de.figures && en.tables === de.tables;

    document.getElementById("structure-status").textContent = aligned ? "Aligned" : "Review needed";
    document.getElementById("heading-count").textContent = `${en.headings.length} / ${de.headings.length}`;
    document.getElementById("figure-count").textContent = `${en.figures} / ${de.figures}`;
    document.getElementById("table-count").textContent = `${en.tables} / ${de.tables}`;
    document.getElementById("consistency-detail").textContent = aligned
      ? `Section numbers, heading levels, figures and tables match. Approx. ${en.words.toLocaleString()} English words and ${de.words.toLocaleString()} German words.`
      : "The two versions differ in section numbering, heading levels, figure count or table count. Compare the highlighted totals before publishing.";
    document.getElementById("consistency-panel").style.borderLeftColor = aligned ? "var(--green)" : "var(--accent)";
  }

  async function loadDocument(language, forcePublished = false) {
    const response = await fetch(`${documents[language].source}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load ${documents[language].source}`);
    const published = await response.text();
    const localDraft = forcePublished ? null : safeLocalGet(documents[language].storageKey);

    state.published[language] = published;
    state.current[language] = localDraft === null ? published : localDraft;
    document.getElementById(`editor-${language}`).value = state.current[language];
    render(language);
  }

  function setView(view) {
    state.view = view;
    workspaceGrid.dataset.view = view;
    document.querySelectorAll("[data-view]").forEach((button) => {
      if (button.closest(".segmented-control")) {
        button.setAttribute("aria-pressed", String(button.dataset.view === view));
      }
    });
  }

  function toggleEditor(language) {
    state.editing[language] = !state.editing[language];
    const isEditing = state.editing[language];
    const pane = document.querySelector(`[data-editor-pane='${language}']`);
    const surface = document.querySelector(`[data-surface='${language}']`);
    const button = document.querySelector(`[data-language-action='${language}']`);
    const help = document.querySelector(`[data-help='${language}']`);

    pane.hidden = !isEditing;
    help.hidden = !isEditing;
    surface.classList.toggle("is-editing", isEditing);
    button.textContent = isEditing ? documents[language].labels.close : documents[language].labels.edit;
    button.setAttribute("aria-pressed", String(isEditing));

    if (isEditing) {
      document.getElementById(`editor-${language}`).focus({ preventScroll: true });
    }
  }

  function updateFromEditor(language) {
    state.current[language] = document.getElementById(`editor-${language}`).value;
    safeLocalSet(documents[language].storageKey, state.current[language]);
    document.querySelector(`[data-saved='${language}']`).textContent = language === "de"
      ? `Lokal gespeichert · ${new Date().toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}`
      : `Saved locally · ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
    render(language);
  }

  function scheduleEditorUpdate(language) {
    window.clearTimeout(state.timers[language]);
    state.timers[language] = window.setTimeout(() => updateFromEditor(language), 180);
  }

  async function copyMarkdown(language) {
    try {
      await navigator.clipboard.writeText(state.current[language]);
      showToast(documents[language].labels.copied);
    } catch (_) {
      const textarea = document.getElementById(`editor-${language}`);
      textarea.focus();
      textarea.select();
      showToast(language === "de" ? "Markdown ist zum Kopieren markiert." : "Markdown selected for copying.");
    }
  }

  async function copyForGoogleDocs(language) {
    const preview = document.getElementById(`preview-${language}`);
    const copy = preview.cloneNode(true);

    copy.querySelectorAll("style, .figure-download").forEach((element) => element.remove());
    copy.querySelectorAll(".image-handoff").forEach((wrapper) => {
      const image = wrapper.querySelector("img");
      const source = image ? image.getAttribute("src") : "";
      const filename = decodeURIComponent((source || "chapter4-image").split("/").pop());
      const placeholder = document.createElement("p");
      placeholder.innerHTML = language === "de"
        ? `<strong>[Bild hier einfügen: ${filename}]</strong>`
        : `<strong>[Insert image here: ${filename}]</strong>`;
      wrapper.replaceWith(placeholder);
    });

    const html = `<meta charset="utf-8">${copy.innerHTML}`;
    const plainText = copy.innerText;

    try {
      if (navigator.clipboard.write && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" })
          })
        ]);
      } else {
        await navigator.clipboard.writeText(plainText);
      }
      showToast(documents[language].labels.richCopied);
    } catch (_) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(preview);
      selection.removeAllRanges();
      selection.addRange(range);
      showToast(language === "de"
        ? "Das Kapitel ist markiert. Kopieren Sie es und fügen Sie es in Google Docs ein."
        : "The chapter is selected. Copy it and paste it into Google Docs.");
    }
  }

  function downloadMarkdown(language) {
    const blob = new Blob([state.current[language]], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = documents[language].filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(documents[language].labels.downloaded);
  }

  function resetDraft(language) {
    if (!window.confirm(documents[language].labels.reset)) return;
    safeLocalRemove(documents[language].storageKey);
    state.current[language] = state.published[language];
    document.getElementById(`editor-${language}`).value = state.current[language];
    render(language);
    showToast(language === "de" ? "Lokaler Entwurf verworfen." : "Local draft discarded.");
  }

  function changeFontSize(direction) {
    const sizes = ["compact", "comfortable", "large"];
    const current = sizes.indexOf(document.documentElement.dataset.fontSize || "comfortable");
    const next = Math.max(0, Math.min(sizes.length - 1, current + direction));
    document.documentElement.dataset.fontSize = sizes[next];
    try {
      window.localStorage.setItem("swiss-ai-futures-chapter4-font-size", sizes[next]);
    } catch (_) {
      // Font preference is optional.
    }
  }

  document.querySelectorAll(".segmented-control [data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-language-action]").forEach((button) => {
    button.addEventListener("click", () => toggleEditor(button.dataset.languageAction));
  });

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyMarkdown(button.dataset.copy));
  });

  document.querySelectorAll("[data-copy-rich]").forEach((button) => {
    button.addEventListener("click", () => copyForGoogleDocs(button.dataset.copyRich));
  });

  document.querySelectorAll("[data-download]").forEach((button) => {
    button.addEventListener("click", () => downloadMarkdown(button.dataset.download));
  });

  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => resetDraft(button.dataset.reset));
  });

  ["en", "de"].forEach((language) => {
    document.getElementById(`editor-${language}`).addEventListener("input", () => scheduleEditorUpdate(language));
    document.getElementById(`editor-${language}`).addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        updateFromEditor(language);
        showToast(language === "de" ? "Entwurf lokal gespeichert." : "Draft saved locally.");
      }
    });
  });

  document.getElementById("refresh-sources").addEventListener("click", async () => {
    const hasDrafts = ["en", "de"].some((language) => state.current[language] !== state.published[language]);
    if (hasDrafts && !window.confirm("Refresh the published files and discard both local drafts?")) return;
    ["en", "de"].forEach((language) => safeLocalRemove(documents[language].storageKey));
    await Promise.all([loadDocument("en", true), loadDocument("de", true)]);
    showToast("Published English and German files refreshed.");
  });

  document.getElementById("compare-structure").addEventListener("click", () => {
    updateConsistency();
    document.getElementById("consistency-panel").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.getElementById("smaller-text").addEventListener("click", () => changeFontSize(-1));
  document.getElementById("larger-text").addEventListener("click", () => changeFontSize(1));
  document.getElementById("print-page").addEventListener("click", () => window.print());

  const savedFontSize = safeLocalGet("swiss-ai-futures-chapter4-font-size");
  if (["compact", "comfortable", "large"].includes(savedFontSize)) {
    document.documentElement.dataset.fontSize = savedFontSize;
  }

  Promise.all([loadDocument("en"), loadDocument("de")]).catch((error) => {
    console.error(error);
    showToast("The Markdown files could not be loaded. Please refresh the page.");
  });
})();
