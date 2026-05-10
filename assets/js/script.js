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

const translateTemplate = (template, values) =>
  Object.entries(values).reduce((copy, [key, value]) => copy.replace(`{${key}}`, value), template);

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
  "assets/images/app-screenshots/voting-group-interface.png",
  "assets/images/app-screenshots/polling-for-alignment.png"
];

roundScreenshots.forEach((src) => {
  const image = new Image();
  image.src = src;
});

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

  const styles = getComputedStyle(document.documentElement);
  const colors = {
    bg: styles.getPropertyValue("--paper").trim() || "#fffdf7",
    ink: styles.getPropertyValue("--ink").trim() || "#111411",
    muted: styles.getPropertyValue("--muted").trim() || "#5d675f",
    line: styles.getPropertyValue("--line").trim() || "#d6dcd4",
    red: styles.getPropertyValue("--red").trim() || "#e21b2d",
    green: styles.getPropertyValue("--green").trim() || "#19b98e",
    blue: styles.getPropertyValue("--blue").trim() || "#315f7d"
  };

  const getOpinionCopy = () => getLanguageData().opinion || getEnglishData().opinion || {};
  const clusters = [
    { copyIndex: 0, color: colors.red, baseX: 0.32, baseY: 0.34 },
    { copyIndex: 1, color: colors.green, baseX: 0.64, baseY: 0.42 },
    { copyIndex: 2, color: colors.blue, baseX: 0.48, baseY: 0.68 }
  ];

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

const getDeliberationTopics = () => getLanguageData().topics || getEnglishData().topics || {};
const getDeliberationLenses = () => getLanguageData().lenses || getEnglishData().lenses || {};

let deliberationSelection = { topic: "skills", lens: "proposal" };

const getSignalLabel = (value) => {
  const signals = getLanguageData().signals || getEnglishData().signals || {};
  if (value >= 0.74) return signals.high || "High signal";
  if (value >= 0.52) return signals.visible || "Visible signal";
  return signals.emerging || "Emerging signal";
};

const getSelectedHeatBase = (topic, lens) => {
  const cell = document.querySelector(`.heat-cell[data-topic="${topic}"][data-lens="${lens}"]`);
  return Number(cell?.dataset.base) || 0.5;
};

const getDeliberationInsight = (topic, lens) => {
  const topics = getDeliberationTopics();
  const lenses = getDeliberationLenses();
  const topicData = topics[topic] || topics.skills || getEnglishData().topics?.skills;
  const lensData = lenses[lens] || lenses.proposal || getEnglishData().lenses?.proposal;
  const base = getSelectedHeatBase(topic, lens);
  const ui = getLanguageData().ui || getEnglishData().ui || {};

  return {
    kicker: lensData.title,
    title: translateTemplate(ui.insightTitle || "{topic} {lens}", {
      topic: topicData.label,
      lens: lensData.label
    }),
    copy: topicData[lens] || topicData.proposal,
    volume: getSignalLabel(base),
    round: lensData.round
  };
};

const setDeliberationSelection = (topic, lens) => {
  if (deliberationSelection.topic === topic && deliberationSelection.lens === lens) return;
  deliberationSelection = { topic, lens };
  document.dispatchEvent(new CustomEvent("deliberation-select", { detail: deliberationSelection }));
};

const initArgumentConstellation = () => {
  const canvas = document.querySelector(".argument-constellation");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const styles = getComputedStyle(document.documentElement);
  const colors = {
    ink: styles.getPropertyValue("--ink").trim() || "#111411",
    muted: styles.getPropertyValue("--muted").trim() || "#5d675f",
    line: styles.getPropertyValue("--line").trim() || "#d6dcd4",
    red: styles.getPropertyValue("--red").trim() || "#e21b2d",
    green: styles.getPropertyValue("--green").trim() || "#19b98e",
    blue: styles.getPropertyValue("--blue").trim() || "#315f7d"
  };
  const lensKeys = ["concern", "proposal", "agreement"];
  const palette = [colors.red, colors.green, colors.blue];
  const anchors = [
    { x: 0.28, y: 0.36, lens: "concern", color: colors.red },
    { x: 0.66, y: 0.32, lens: "proposal", color: colors.green },
    { x: 0.5, y: 0.72, lens: "agreement", color: colors.blue }
  ];
  const nodes = [];
  let width = 0;
  let height = 0;
  let hoverNode = null;
  let lastNode = 0;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rgba = (color, alpha) => {
    if (!color.startsWith("#") || color.length !== 7) return color;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const toX = (value) => 28 + value * Math.max(1, width - 56);
  const toY = (value) => 28 + value * Math.max(1, height - 56);

  const addNode = (theme = Math.floor(Math.random() * anchors.length), x, y, forcedTopic) => {
    const anchor = anchors[theme];
    const topics = getDeliberationTopics();
    const lenses = getDeliberationLenses();
    const topicKeys = Object.keys(topics);
    const topic = forcedTopic || topicKeys[Math.floor(Math.random() * topicKeys.length)];
    const targetX = typeof x === "number" ? x : clamp(anchor.x + (Math.random() - 0.5) * 0.34, 0.08, 0.92);
    const targetY = typeof y === "number" ? y : clamp(anchor.y + (Math.random() - 0.5) * 0.34, 0.08, 0.92);
    nodes.push({
      theme,
      topic,
      label: `${topics[topic].label} ${lenses[anchor.lens].title.toLowerCase()}`,
      x: clamp(targetX + (Math.random() - 0.5) * 0.1, 0.06, 0.94),
      y: clamp(targetY + (Math.random() - 0.5) * 0.1, 0.06, 0.94),
      tx: targetX,
      ty: targetY,
      phase: Math.random() * Math.PI * 2,
      age: 0
    });

    if (nodes.length > 38) {
      nodes.splice(0, nodes.length - 38);
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(300, Math.floor(rect.width));
    height = Math.max(260, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const seed = () => {
    const topicKeys = Object.keys(getDeliberationTopics());
    topicKeys.forEach((topic, topicIndex) => {
      anchors.forEach((_, themeIndex) => {
        addNode(themeIndex, undefined, undefined, topic);
        nodes[nodes.length - 1].age = 1;
        if ((topicIndex + themeIndex) % 2 === 0) {
          addNode(themeIndex, undefined, undefined, topic);
          nodes[nodes.length - 1].age = 1;
        }
      });
    });
    for (let i = 0; i < 8; i += 1) {
      addNode(i % anchors.length);
      nodes[nodes.length - 1].age = 1;
    }
  };

  const drawConnections = () => {
    ctx.lineWidth = 2;
    nodes.forEach((source, sourceIndex) => {
      nodes.slice(sourceIndex + 1).forEach((target) => {
        if (source.theme !== target.theme) return;
        const dx = source.x - target.x;
        const dy = source.y - target.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0.26) return;

        const sourceLens = lensKeys[source.theme];
        const targetLens = lensKeys[target.theme];
        const isSelectedPair =
          source.topic === deliberationSelection.topic &&
          target.topic === deliberationSelection.topic &&
          sourceLens === deliberationSelection.lens &&
          targetLens === deliberationSelection.lens;

        ctx.globalAlpha = isSelectedPair ? 0.92 : clamp(0.32 - distance, 0.04, 0.2);
        ctx.lineWidth = isSelectedPair ? 4 : 2;
        ctx.strokeStyle = palette[source.theme];
        ctx.beginPath();
        ctx.moveTo(toX(source.x), toY(source.y));
        ctx.lineTo(toX(target.x), toY(target.y));
        ctx.stroke();
      });
    });
    ctx.globalAlpha = 1;
  };

  const drawAnchors = () => {
    anchors.forEach((anchor) => {
      const x = toX(anchor.x);
      const y = toY(anchor.y);
      const isSelectedLens = anchor.lens === deliberationSelection.lens;
      const label = getDeliberationLenses()[anchor.lens]?.title || anchor.lens;
      ctx.fillStyle = rgba(anchor.color, 0.1);
      ctx.beginPath();
      ctx.arc(x, y, isSelectedLens ? (width < 430 ? 42 : 56) : (width < 430 ? 34 : 46), 0, Math.PI * 2);
      ctx.fill();
      if (isSelectedLens) {
        ctx.strokeStyle = anchor.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(x, y, width < 430 ? 42 : 56, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = colors.ink;
      ctx.font = `${width < 430 ? "800 11px" : "800 13px"} Helvetica Neue, Arial, sans-serif`;
      ctx.fillText(label, clamp(x - 34, 18, width - 94), clamp(y - 48, 22, height - 20));
    });
  };

  const drawNodes = () => {
    nodes.forEach((node) => {
      const x = toX(node.x);
      const y = toY(node.y);
      const isHover = node === hoverNode;
      const nodeLens = lensKeys[node.theme];
      const isSelected = node.topic === deliberationSelection.topic && nodeLens === deliberationSelection.lens;
      const isRelated = isSelected || node.topic === deliberationSelection.topic || nodeLens === deliberationSelection.lens;
      const radius = isSelected ? 10 : isHover ? 8 : 5;
      const color = palette[node.theme];

      ctx.globalAlpha = isSelected ? 1 : isRelated ? 0.82 : 0.2;
      ctx.fillStyle = color;
      ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius);

      if (isSelected || isHover || node.age < 0.16) {
        ctx.globalAlpha = isSelected || isHover ? 1 : 0.5;
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = isSelected || isHover ? 3 : 2;
        ctx.strokeRect(x - 11, y - 11, 22, 22);
      }

      if (isHover || (isSelected && node.age < 0.28)) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.ink;
        ctx.font = "800 12px Helvetica Neue, Arial, sans-serif";
        ctx.fillText(node.label, clamp(x + 12, 14, width - 90), clamp(y + 4, 20, height - 16));
      }
    });
    ctx.globalAlpha = 1;
  };

  const update = (time) => {
    nodes.forEach((node) => {
      const anchor = anchors[node.theme];
      node.tx += (anchor.x - node.tx) * 0.004;
      node.ty += (anchor.y - node.ty) * 0.004;
      node.x += (node.tx + Math.sin(time / 900 + node.phase) * 0.012 - node.x) * 0.032;
      node.y += (node.ty + Math.cos(time / 1100 + node.phase) * 0.012 - node.y) * 0.032;
      node.age = Math.min(1, node.age + 0.025);
    });
  };

  const draw = (time = 0) => {
    ctx.clearRect(0, 0, width, height);
    drawAnchors();
    drawConnections();
    drawNodes();

    if (!prefersReducedMotion) {
      update(time);
      if (time - lastNode > 1600) {
        const selectedTheme = Math.max(0, lensKeys.indexOf(deliberationSelection.lens));
        const shouldReflectSelection = Math.random() > 0.45;
        addNode(
          shouldReflectSelection ? selectedTheme : Math.floor(Math.random() * anchors.length),
          undefined,
          undefined,
          shouldReflectSelection ? deliberationSelection.topic : undefined
        );
        lastNode = time;
      }
      window.requestAnimationFrame(draw);
    }
  };

  const updateHover = (event) => {
    const rect = canvas.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    let nearest = null;
    let nearestDistance = 24;

    nodes.forEach((node) => {
      const distance = Math.hypot(toX(node.x) - pointerX, toY(node.y) - pointerY);
      if (distance < nearestDistance) {
        nearest = node;
        nearestDistance = distance;
      }
    });

    hoverNode = nearest;
  };

  canvas.addEventListener("pointermove", updateHover);
  canvas.addEventListener("pointerleave", () => {
    hoverNode = null;
  });
  canvas.addEventListener("pointerdown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left - 28) / Math.max(1, width - 56), 0.06, 0.94);
    const y = clamp((event.clientY - rect.top - 28) / Math.max(1, height - 56), 0.06, 0.94);
    const nearestAnchor = anchors
      .map((anchor, index) => ({ index, distance: Math.hypot(anchor.x - x, anchor.y - y) }))
      .sort((a, b) => a.distance - b.distance)[0];
    addNode(nearestAnchor.index, x, y, deliberationSelection.topic);
  });

  document.addEventListener("deliberation-select", () => {
    const selectedTheme = Math.max(0, lensKeys.indexOf(deliberationSelection.lens));
    addNode(selectedTheme, undefined, undefined, deliberationSelection.topic);
    if (prefersReducedMotion) draw();
  });

  document.addEventListener("language-change", () => {
    const topics = getDeliberationTopics();
    const lenses = getDeliberationLenses();
    nodes.forEach((node) => {
      const lens = lensKeys[node.theme];
      node.label = `${topics[node.topic]?.label || node.topic} ${lenses[lens]?.title.toLowerCase() || lens}`;
    });
    if (prefersReducedMotion) draw();
  });

  resize();
  seed();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw();
    });
    resizeObserver.observe(canvas);
  } else {
    window.addEventListener("resize", () => {
      resize();
      if (prefersReducedMotion) draw();
    });
  }

  draw();
};

initArgumentConstellation();

const initThemeHeatmap = () => {
  const cells = document.querySelectorAll(".heat-cell");
  if (!cells.length) return;
  const insightKicker = document.getElementById("insight-kicker");
  const insightTitle = document.getElementById("insight-title");
  const insightCopy = document.getElementById("insight-copy");
  const insightVolume = document.getElementById("insight-volume");
  const insightRound = document.getElementById("insight-round");

  const styles = getComputedStyle(document.documentElement);
  const colors = {
    red: styles.getPropertyValue("--red").trim() || "#e21b2d",
    green: styles.getPropertyValue("--green").trim() || "#19b98e",
    blue: styles.getPropertyValue("--blue").trim() || "#315f7d"
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rgba = (color, alpha) => {
    if (!color.startsWith("#") || color.length !== 7) return color;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const updateHeat = () => {
    const time = Date.now() / 1000;
    cells.forEach((cell, index) => {
      const base = Number(cell.dataset.base) || 0.5;
      const tone = colors[cell.dataset.tone] || colors.green;
      const heat = prefersReducedMotion ? base : clamp(base + Math.sin(time * 1.4 + index * 0.9) * 0.16, 0.18, 0.96);
      cell.style.backgroundColor = rgba(tone, 0.18 + heat * 0.76);
      cell.style.transform = `scaleY(${0.46 + heat * 0.54})`;
    });
  };

  const updateSelectionDisplay = () => {
    const { topic, lens } = deliberationSelection;
    const insight = getDeliberationInsight(topic, lens);
    const languageData = getLanguageData();
    const ui = languageData.ui || getEnglishData().ui || {};
    const topics = getDeliberationTopics();
    const lenses = getDeliberationLenses();

    cells.forEach((cell) => {
      const isSelected = cell.dataset.topic === topic && cell.dataset.lens === lens;
      const isRelated = cell.dataset.topic === topic || cell.dataset.lens === lens;
      cell.classList.toggle("is-selected", isSelected);
      cell.classList.toggle("is-muted", !isSelected && !isRelated);
      cell.setAttribute("aria-pressed", isSelected ? "true" : "false");
      const ariaTemplate = ui.heatAria || "Show {topic} {lens}";
      cell.setAttribute(
        "aria-label",
        translateTemplate(ariaTemplate, {
          topic: topics[cell.dataset.topic]?.label || cell.dataset.topic,
          lens: lenses[cell.dataset.lens]?.label || cell.dataset.lens
        })
      );
    });

    if (insightKicker) insightKicker.textContent = `${ui.selectedPrefix || "Selected"} ${insight.kicker}`;
    if (insightTitle) insightTitle.textContent = insight.title;
    if (insightCopy) insightCopy.textContent = insight.copy;
    if (insightVolume) insightVolume.textContent = insight.volume;
    if (insightRound) insightRound.textContent = insight.round;
    const insightMeta = document.querySelectorAll(".analysis-insight li span");
    if (insightMeta[0]) insightMeta[0].textContent = ui.visibility || "Visibility in the group discussion";
    if (insightMeta[1]) insightMeta[1].textContent = ui.likelyReturn || "Likely to return for review";
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      setDeliberationSelection(cell.dataset.topic, cell.dataset.lens);
    });
    cell.addEventListener("focus", () => {
      setDeliberationSelection(cell.dataset.topic, cell.dataset.lens);
    });
  });

  document.addEventListener("deliberation-select", updateSelectionDisplay);
  document.addEventListener("language-change", updateSelectionDisplay);
  updateHeat();
  updateSelectionDisplay();
  if (!prefersReducedMotion) {
    window.setInterval(updateHeat, 720);
  }
};

initThemeHeatmap();

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

document.addEventListener("language-change", () => {
  setRound(activeRound);
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
