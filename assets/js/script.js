const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const translations = window.SWISS_AI_I18N || {};
const supportedLanguages = ["en", "de", "fr", "it"];
const baseTextNodes = new WeakMap();
const baseAttrValues = new WeakMap();

const normaliseText = (value) => value.replace(/\s+/g, " ").trim();

const getInitialLanguage = () => {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang")?.toLowerCase();
  const saved = window.localStorage.getItem("swiss-ai-language");
  if (supportedLanguages.includes(requested)) return requested;
  if (supportedLanguages.includes(saved)) return saved;
  return "en";
};

let currentLanguage = getInitialLanguage();

const getLanguageData = () => translations[currentLanguage] || translations.en || {};
const getEnglishData = () => translations.en || {};
const translateText = (key) => getLanguageData().text?.[key] || key;

const supportedThemes = ["dark", "light"];
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeLogos = document.querySelectorAll("[data-logo-dark][data-logo-light]");
const getInitialTheme = () => {
  const saved = window.localStorage.getItem("swiss-ai-theme");
  const documentTheme = document.documentElement.dataset.theme;
  if (supportedThemes.includes(saved)) return saved;
  if (supportedThemes.includes(documentTheme)) return documentTheme;
  return "dark";
};

let currentTheme = getInitialTheme();

const updateThemeToggle = () => {
  if (!themeToggle) return;
  const label = currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const translatedLabel = translateText(label);
  themeToggle.setAttribute("aria-label", translatedLabel);
  themeToggle.setAttribute("title", translatedLabel);
};

const updateThemeLogos = () => {
  themeLogos.forEach((image) => {
    const nextSource = currentTheme === "dark" ? image.dataset.logoDark : image.dataset.logoLight;
    if (nextSource && image.getAttribute("src") !== nextSource) {
      image.setAttribute("src", nextSource);
    }
  });
};

const applyTheme = (theme, shouldPersist = true) => {
  if (!supportedThemes.includes(theme)) return;
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  updateThemeLogos();
  updateThemeToggle();
  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#11100e" : "#f7f6f0");
  }
  if (shouldPersist) {
    window.localStorage.setItem("swiss-ai-theme", theme);
  }
  document.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
};

applyTheme(currentTheme, false);

themeToggle?.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

document.addEventListener("language-change", updateThemeToggle);

const updateLanguageButtons = () => {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

const syncLanguageUrl = (language) => {
  if (!window.history?.replaceState) return;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
};

const translateTextNodes = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!normaliseText(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      const parentTag = node.parentElement?.tagName;
      if (parentTag === "SCRIPT" || parentTag === "STYLE") return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!baseTextNodes.has(node)) {
      baseTextNodes.set(node, normaliseText(node.nodeValue));
    }
    const original = baseTextNodes.get(node);
    const translated = translateText(original);
    const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
    const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${leading}${translated}${trailing}`;
  }
};

const translateAttributes = () => {
  document.querySelectorAll("[aria-label], img[alt]").forEach((element) => {
    if (element.hasAttribute("data-dynamic-label")) return;
    ["aria-label", "alt"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!baseAttrValues.has(element)) {
        baseAttrValues.set(element, {});
      }
      const stored = baseAttrValues.get(element);
      if (!(attribute in stored)) {
        stored[attribute] = element.getAttribute(attribute);
      }
      const original = stored[attribute];
      element.setAttribute(attribute, translateText(original));
    });
  });
};

const applyLanguage = (language, shouldPersist = true) => {
  if (!supportedLanguages.includes(language)) return;
  currentLanguage = language;
  const languageData = getLanguageData();

  document.documentElement.lang = languageData.htmlLang || language;
  document.title = languageData.title || getEnglishData().title || document.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && languageData.description) {
    metaDescription.setAttribute("content", languageData.description);
  }

  translateTextNodes();
  translateAttributes();
  updateLanguageButtons();
  if (shouldPersist) {
    window.localStorage.setItem("swiss-ai-language", language);
    syncLanguageUrl(language);
  }

  document.dispatchEvent(new CustomEvent("language-change", { detail: { language } }));
};

const revealItems = document.querySelectorAll("[data-reveal]");

const revealIfInView = (item) => {
  const rect = item.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
    item.classList.add("is-visible");
    return true;
  }
  return false;
};

revealItems.forEach(revealIfInView);
document.body.classList.add("reveal-enabled");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      revealObserver.observe(item);
    }
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const refreshVisibleReveals = () => {
  revealItems.forEach(revealIfInView);
};

window.addEventListener("load", () => {
  window.setTimeout(refreshVisibleReveals, 80);
});
window.addEventListener("hashchange", () => {
  window.setTimeout(refreshVisibleReveals, 180);
});

const getRoundContent = () => getLanguageData().rounds || getEnglishData().rounds || [];

const roundButtons = document.querySelectorAll(".round-button");
const appLabel = document.getElementById("app-label");
const appTitle = document.getElementById("app-title");
const appCopy = document.getElementById("app-copy");
const appPreview = document.querySelector(".app-preview");
const appShot = document.getElementById("app-shot");
const flowStages = document.querySelectorAll(".flow-stage");
const roundScreenshots = [
  "assets/images/app-screenshots/providing-context-in-education-app.png",
  "assets/images/app-screenshots/likert-style-poll-in-module.png",
  "assets/images/instructions/04-answer-questionnaire-prompts.png",
  "assets/images/app-screenshots/polling-for-alignment.png"
];

if (roundButtons.length || appPreview) {
  roundScreenshots.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}

let activeRound = 0;

const setRound = (roundIndex) => {
  const content = getRoundContent()[roundIndex];
  if (!content || !appPreview || !appLabel || !appTitle || !appCopy) return;

  activeRound = roundIndex;
  roundButtons.forEach((item) => {
    item.classList.toggle("is-active", Number(item.dataset.round) === roundIndex);
  });
  flowStages.forEach((item) => {
    item.classList.toggle("is-active", Number(item.dataset.flowRound) === roundIndex);
  });

  appPreview.classList.add("is-switching");
  window.setTimeout(() => {
    appLabel.textContent = content.label;
    appTitle.textContent = content.title;
    appCopy.textContent = content.copy;
    if (appShot && roundScreenshots[roundIndex]) {
      appShot.src = roundScreenshots[roundIndex];
      appShot.alt = content.shotAlt || getEnglishData().rounds?.[roundIndex]?.shotAlt || "";
    }
    appPreview.classList.remove("is-switching");
  }, 160);
};

roundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setRound(Number(button.dataset.round));
  });
});

const opinionCanvas = document.querySelector(".opinion-map");
const opinionCount = document.getElementById("opinion-count");

const initOpinionMap = () => {
  if (!opinionCanvas) return;

  const ctx = opinionCanvas.getContext("2d");
  if (!ctx) return;

  const readColors = () => {
    const styles = getComputedStyle(document.documentElement);
    return {
      bg: styles.getPropertyValue("--paper").trim() || "#171512",
      ink: styles.getPropertyValue("--ink").trim() || "#f4efe7",
      muted: styles.getPropertyValue("--muted").trim() || "#beb6aa",
      line: styles.getPropertyValue("--line").trim() || "#34302a",
      red: styles.getPropertyValue("--red").trim() || "#ff6672",
      green: styles.getPropertyValue("--green").trim() || "#ffb23e",
      blue: styles.getPropertyValue("--blue").trim() || "#b9b0a4"
    };
  };

  let colors = readColors();
  const getOpinionCopy = () => getLanguageData().opinion || getEnglishData().opinion || {};
  const clusters = [
    { copyIndex: 0, colorKey: "red", color: colors.red, baseX: 0.32, baseY: 0.34 },
    { copyIndex: 1, colorKey: "green", color: colors.green, baseX: 0.64, baseY: 0.42 },
    { copyIndex: 2, colorKey: "blue", color: colors.blue, baseX: 0.48, baseY: 0.68 }
  ];

  const refreshColors = () => {
    colors = readColors();
    clusters.forEach((cluster) => {
      cluster.color = colors[cluster.colorKey] || cluster.color;
    });
  };

  const points = [];
  const margin = { top: 44, right: 50, bottom: 44, left: 50 };
  let width = 0;
  let height = 0;
  let hoverPoint = null;
  let lastAutoAdd = 0;
  let lastClusterShift = 0;
  let responseCount = 42;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const randomAround = (center, spread = 0.1) => clamp(center + (Math.random() - 0.5) * spread, 0.08, 0.92);
  const plot = () => ({
    x: margin.left,
    y: margin.top,
    w: Math.max(1, width - margin.left - margin.right),
    h: Math.max(1, height - margin.top - margin.bottom)
  });
  const toCanvasX = (value) => plot().x + value * plot().w;
  const toCanvasY = (value) => plot().y + value * plot().h;
  const fromCanvasX = (value) => clamp((value - plot().x) / plot().w, 0.04, 0.96);
  const fromCanvasY = (value) => clamp((value - plot().y) / plot().h, 0.04, 0.96);

  const setResponseCount = () => {
    if (opinionCount) {
      opinionCount.textContent = `${responseCount} ${getOpinionCopy().responses || "responses"}`;
    }
  };

  const addPoint = (clusterIndex = Math.floor(Math.random() * clusters.length), sourceX, sourceY) => {
    const cluster = clusters[clusterIndex];
    const targetX = typeof sourceX === "number" ? sourceX : randomAround(cluster.baseX, 0.22);
    const targetY = typeof sourceY === "number" ? sourceY : randomAround(cluster.baseY, 0.22);
    points.push({
      clusterIndex,
      x: typeof sourceX === "number" ? sourceX : randomAround(0.5, 0.75),
      y: typeof sourceY === "number" ? sourceY : randomAround(0.5, 0.75),
      tx: targetX,
      ty: targetY,
      age: 0
    });

    if (points.length > 88) {
      points.splice(0, points.length - 88);
    }

    responseCount += 1;
    setResponseCount();
  };

  const seedPoints = () => {
    for (let i = 0; i < 42; i += 1) {
      addPoint(i % clusters.length);
      points[i].x = points[i].tx + (Math.random() - 0.5) * 0.05;
      points[i].y = points[i].ty + (Math.random() - 0.5) * 0.05;
      points[i].age = 1;
    }
    responseCount = 42;
    setResponseCount();
  };

  const resize = () => {
    const rect = opinionCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(260, Math.floor(rect.height));
    opinionCanvas.width = Math.floor(width * dpr);
    opinionCanvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const centroidFor = (clusterIndex) => {
    const items = points.filter((point) => point.clusterIndex === clusterIndex);
    if (!items.length) {
      const fallback = clusters[clusterIndex];
      return { x: fallback.baseX, y: fallback.baseY, rx: 0.11, ry: 0.1 };
    }

    const meanX = items.reduce((sum, point) => sum + point.x, 0) / items.length;
    const meanY = items.reduce((sum, point) => sum + point.y, 0) / items.length;
    const spreadX =
      Math.sqrt(items.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0) / items.length) || 0.08;
    const spreadY =
      Math.sqrt(items.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0) / items.length) || 0.08;

    return {
      x: meanX,
      y: meanY,
      rx: clamp(spreadX * 2.8, 0.1, 0.24),
      ry: clamp(spreadY * 2.8, 0.1, 0.22)
    };
  };

  const drawAxes = () => {
    const area = plot();
    ctx.lineCap = "square";
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(area.x, area.y + area.h * 0.5);
    ctx.lineTo(area.x + area.w, area.y + area.h * 0.5);
    ctx.moveTo(area.x + area.w * 0.5, area.y);
    ctx.lineTo(area.x + area.w * 0.5, area.y + area.h);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 2;
    [0.25, 0.75].forEach((tick) => {
      ctx.beginPath();
      ctx.moveTo(area.x + area.w * tick, area.y + area.h * 0.5 - 7);
      ctx.lineTo(area.x + area.w * tick, area.y + area.h * 0.5 + 7);
      ctx.moveTo(area.x + area.w * 0.5 - 7, area.y + area.h * tick);
      ctx.lineTo(area.x + area.w * 0.5 + 7, area.y + area.h * tick);
      ctx.stroke();
    });
  };

  const drawCluster = (cluster, index) => {
    const center = centroidFor(index);
    const cx = toCanvasX(center.x);
    const cy = toCanvasY(center.y);
    const rx = center.rx * plot().w;
    const ry = center.ry * plot().h;

    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = cluster.color;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.92;
    ctx.strokeStyle = cluster.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    const compact = width < 430;
    const clusterCopy = getOpinionCopy().clusters?.[index] || getEnglishData().opinion?.clusters?.[index] || {};
    const label = compact ? clusterCopy.shortLabel : clusterCopy.label;
    const labelPositions = compact
      ? [
          { x: cx - 34, y: cy - ry - 10 },
          { x: cx + 6, y: cy - ry - 10 },
          { x: cx + 12, y: cy + ry + 18 }
        ]
      : [{ x: cx + 10, y: cy - ry - 10 }];
    const labelPosition = labelPositions[index] || labelPositions[0];

    ctx.fillStyle = colors.ink;
    ctx.font = `${compact ? "800 11px" : "800 13px"} Helvetica Neue, Arial, sans-serif`;
    ctx.fillText(
      label,
      clamp(labelPosition.x, 54, width - (compact ? 72 : 130)),
      clamp(labelPosition.y, 26, height - 26)
    );

    ctx.fillStyle = cluster.color;
    ctx.fillRect(cx - 5, cy - 5, 10, 10);
  };

  const drawPoints = () => {
    points.forEach((point) => {
      const cluster = clusters[point.clusterIndex];
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      const isHover = point === hoverPoint;
      const pop = 1 + Math.max(0, 1 - point.age) * 1.8;

      ctx.fillStyle = cluster.color;
      ctx.globalAlpha = isHover ? 1 : 0.78;
      ctx.beginPath();
      ctx.arc(x, y, (isHover ? 6.5 : 4.5) * pop, 0, Math.PI * 2);
      ctx.fill();

      if (isHover || point.age < 0.18) {
        ctx.globalAlpha = isHover ? 0.95 : 0.42;
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = isHover ? 3 : 2;
        ctx.beginPath();
        ctx.arc(x, y, (isHover ? 11 : 13) * pop, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  };

  const updateTargets = (time) => {
    clusters.forEach((cluster, index) => {
      cluster.baseX = clamp(cluster.baseX + Math.sin(time / 2300 + index) * 0.0009, 0.22, 0.78);
      cluster.baseY = clamp(cluster.baseY + Math.cos(time / 2600 + index * 1.4) * 0.0009, 0.22, 0.78);
    });

    points.forEach((point) => {
      const cluster = clusters[point.clusterIndex];
      point.tx += (cluster.baseX - point.tx) * 0.006;
      point.ty += (cluster.baseY - point.ty) * 0.006;
      point.x += (point.tx - point.x) * 0.035;
      point.y += (point.ty - point.y) * 0.035;
      point.age = Math.min(1, point.age + 0.025);
    });
  };

  const draw = (time = 0) => {
    ctx.clearRect(0, 0, width, height);
    drawAxes();
    clusters.forEach(drawCluster);
    drawPoints();

    if (!prefersReducedMotion) {
      updateTargets(time);
      if (time - lastAutoAdd > 1200) {
        addPoint(Math.floor(Math.random() * clusters.length));
        lastAutoAdd = time;
      }
      if (time - lastClusterShift > 4200) {
        const movingPoint = points[Math.floor(Math.random() * points.length)];
        if (movingPoint) {
          movingPoint.clusterIndex = (movingPoint.clusterIndex + 1 + Math.floor(Math.random() * 2)) % clusters.length;
          movingPoint.tx = randomAround(clusters[movingPoint.clusterIndex].baseX, 0.2);
          movingPoint.ty = randomAround(clusters[movingPoint.clusterIndex].baseY, 0.2);
        }
        lastClusterShift = time;
      }
      window.requestAnimationFrame(draw);
    }
  };

  const updateHoverPoint = (event) => {
    const rect = opinionCanvas.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    let nearest = null;
    let nearestDistance = 26;

    points.forEach((point) => {
      const dx = toCanvasX(point.x) - pointerX;
      const dy = toCanvasY(point.y) - pointerY;
      const distance = Math.hypot(dx, dy);
      if (distance < nearestDistance) {
        nearest = point;
        nearestDistance = distance;
      }
    });

    hoverPoint = nearest;
  };

  opinionCanvas.addEventListener("pointermove", updateHoverPoint);
  opinionCanvas.addEventListener("pointerleave", () => {
    hoverPoint = null;
  });
  opinionCanvas.addEventListener("pointerdown", (event) => {
    const rect = opinionCanvas.getBoundingClientRect();
    const x = fromCanvasX(event.clientX - rect.left);
    const y = fromCanvasY(event.clientY - rect.top);
    const nearestCluster = clusters
      .map((cluster, index) => ({
        index,
        distance: Math.hypot(cluster.baseX - x, cluster.baseY - y)
      }))
      .sort((a, b) => a.distance - b.distance)[0];
    addPoint(nearestCluster.index, x, y);
  });

  document.addEventListener("language-change", () => {
    setResponseCount();
    if (prefersReducedMotion) {
      draw();
    }
  });
  document.addEventListener("theme-change", () => {
    refreshColors();
    if (prefersReducedMotion) {
      draw();
    }
  });

  resize();
  seedPoints();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) {
        draw();
      }
    });
    resizeObserver.observe(opinionCanvas);
  } else {
    window.addEventListener("resize", () => {
      resize();
      if (prefersReducedMotion) {
        draw();
      }
    });
  }

  draw();
};

initOpinionMap();

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

const flyerPreview = document.querySelector("[data-flyer-preview]");
const updateFlyerPreview = () => {
  if (!flyerPreview) return;
  const source =
    flyerPreview.dataset[`flyer${currentLanguage.charAt(0).toUpperCase()}${currentLanguage.slice(1)}`] ||
    flyerPreview.dataset.flyerEn;
  if (source && flyerPreview.getAttribute("src") !== source) {
    flyerPreview.setAttribute("src", source);
  }
};

const instructionSteppers = document.querySelectorAll("[data-instruction-stepper]");
instructionSteppers.forEach((stepper) => {
  const buttons = Array.from(stepper.querySelectorAll("[data-instruction-step]"));
  const panels = Array.from(stepper.querySelectorAll("[role='tabpanel']"));

  const setInstructionStep = (nextIndex) => {
    buttons.forEach((button, index) => {
      const isActive = index === nextIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((panel, index) => {
      const isActive = index === nextIndex;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => setInstructionStep(index));
    button.addEventListener("keydown", (event) => {
      const currentIndex = buttons.indexOf(document.activeElement);
      const keyActions = {
        ArrowDown: () => (currentIndex + 1) % buttons.length,
        ArrowRight: () => (currentIndex + 1) % buttons.length,
        ArrowUp: () => (currentIndex - 1 + buttons.length) % buttons.length,
        ArrowLeft: () => (currentIndex - 1 + buttons.length) % buttons.length,
        Home: () => 0,
        End: () => buttons.length - 1
      };
      const getNextIndex = keyActions[event.key];
      if (!getNextIndex) return;
      event.preventDefault();
      const nextIndex = getNextIndex();
      setInstructionStep(nextIndex);
      buttons[nextIndex]?.focus();
    });
  });

  setInstructionStep(0);
});

document.addEventListener("language-change", () => {
  setRound(activeRound);
  updateFlyerPreview();
});

const downloadStatus = document.getElementById("download-status");
const storeButtons = document.querySelectorAll(".store-button[data-url]");
const downloadTriggers = document.querySelectorAll(".js-download");

const getDevicePreference = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "web";
};

const params = new URLSearchParams(window.location.search);
const source = params.get("source");
const campaign = params.get("campaign");

const decorateUrl = (url) => {
  if (!url) return url;
  const decorated = new URL(url, window.location.href);
  if (source) decorated.searchParams.set("source", source);
  if (campaign) decorated.searchParams.set("campaign", campaign);
  return decorated.toString();
};

storeButtons.forEach((button) => {
  const baseUrl = button.dataset.url;
  const finalUrl = decorateUrl(baseUrl);

  if (finalUrl) {
    button.href = finalUrl;
    button.removeAttribute("aria-disabled");
  }
});

downloadTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const device = getDevicePreference();
    const preferred = document.querySelector(`.store-button[data-store="${device}"]`);
    const preferredUrl = preferred?.dataset.url;

    if (preferred && preferredUrl) {
      event.preventDefault();
      window.location.href = decorateUrl(preferredUrl);
      return;
    }

    downloadStatus.textContent =
      getLanguageData().ui?.chooseStore ||
      "Choose the App Store or Google Play button below, or scan the matching QR code for your phone.";
  });
});

const copyTemplateButtons = document.querySelectorAll("[data-copy-template]");
const copyResetTimers = new WeakMap();

const normaliseCopyText = (value) =>
  value
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const getTemplateCopyText = (source) => {
  if (!source) return "";
  const chunks = [];

  Array.from(source.children).forEach((child) => {
    const tagName = child.tagName;

    if (tagName === "OL" || tagName === "UL") {
      const listItems = Array.from(child.children)
        .filter((item) => item.tagName === "LI")
        .map((item, index) => {
          const marker = tagName === "OL" ? `${index + 1}.` : "-";
          return normaliseCopyText(`${marker} ${item.innerText}`);
        })
        .filter(Boolean);

      if (listItems.length) {
        chunks.push(listItems.join("\n"));
      }
      return;
    }

    const text = normaliseCopyText(child.innerText || child.textContent || "");
    if (text) {
      chunks.push(text);
    }
  });

  return chunks.join("\n\n");
};

const writeClipboardText = async (text) => {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.inset = "0 auto auto 0";
  textArea.style.width = "1px";
  textArea.style.height = "1px";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
};

const resetCopyTemplateButton = (button) => {
  const timer = copyResetTimers.get(button);
  if (timer) {
    window.clearTimeout(timer);
    copyResetTimers.delete(button);
  }
  button.disabled = false;
  button.textContent = translateText("Copy text");
};

copyTemplateButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".share-copy-card");
    const source = card?.querySelector("[data-copy-source]");
    const status = card?.querySelector("[data-copy-status]");
    const copyText = getTemplateCopyText(source);

    if (!copyText) return;

    resetCopyTemplateButton(button);
    button.disabled = true;

    try {
      await writeClipboardText(copyText);
      button.textContent = translateText("Copied");
      if (status) status.textContent = translateText("Copied to clipboard");
    } catch (error) {
      button.textContent = translateText("Copy text");
      if (status) status.textContent = translateText("Copy failed");
    } finally {
      button.disabled = false;
      copyResetTimers.set(
        button,
        window.setTimeout(() => {
          resetCopyTemplateButton(button);
          if (status) status.textContent = "";
        }, 1800)
      );
    }
  });
});

document.addEventListener("language-change", () => {
  copyTemplateButtons.forEach((button) => {
    resetCopyTemplateButton(button);
    const status = button.closest(".share-copy-card")?.querySelector("[data-copy-status]");
    if (status) status.textContent = "";
  });
});

const scrollProgress = document.querySelector(".scroll-progress");
const parallaxItems = document.querySelectorAll("[data-parallax]");
let scrollTicking = false;

const updateScrollEffects = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  }

  if (!prefersReducedMotion) {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax) || 0;
      const offset = (window.scrollY - item.offsetTop) * speed;
      item.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }

  scrollTicking = false;
};

const requestScrollEffects = () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollEffects);
    scrollTicking = true;
  }
};

window.addEventListener("scroll", requestScrollEffects, { passive: true });
window.addEventListener("resize", requestScrollEffects);
updateScrollEffects();
applyLanguage(currentLanguage, false);
