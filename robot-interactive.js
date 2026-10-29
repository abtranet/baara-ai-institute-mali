/**
 * baara.ai — Hybrid Progressive Hero Robot Controller
 * 1. 2.5D Parallax Physics & Cursor / Touch Tilt (Immediate paint, 0 extra bandwidth)
 * 2. Multilingual Interactive Speech Bubble (Bambara, French, English)
 * 3. Web Audio API synthesized futuristic robotic harmonic chime
 * 4. Responsive Mobile Optimization (<1200px touch interaction)
 * 5. Progressive Enhancement Bridge for Desktop 3D Spline Island
 */

(function initHeroRobotInteractive() {
  "use strict";

  const container = document.getElementById("heroRobotContainer");
  if (!container) return;

  const wrap25d = document.getElementById("robot25dWrap");
  const glow = container.querySelector(".baara-robot-glow");
  const speechBubble = document.getElementById("robotSpeechBubble");
  const speechText = document.getElementById("robotSpeechText");
  const speechLangPill = document.getElementById("robotLangPill");
  const speechClose = document.getElementById("robotSpeechClose");
  const chirpBtn = document.getElementById("robotChirpBtn");
  const modeBtn = document.getElementById("robotModeToggle");
  const splineMount = document.getElementById("hero-spline-robot-root");

  // Multilingual robot phrases
  const ROBOT_PHRASES = {
    bm: [
      {
        lang: "BAMBARA",
        text: "I ni ce! Aw dansɛ BAARA la — an ka ɲɛsigi dɔnko dɔn 🇲🇱",
        btn: "Kalan sira wili",
        link: "#services"
      },
      {
        lang: "BAMBARA",
        text: "Mali ka denmisɛnw bɛ AI bila u ka kan na! (MALIBA-AI • Bayelemabaga)",
        btn: "Labo kɔnɔna",
        link: "#projects"
      },
      {
        lang: "BAMBARA",
        text: "Kalan sira 4 bɛɛ bɛ laban baara saraɲuman na Bamako.",
        btn: "Baara sira wili",
        link: "#careers"
      }
    ],
    fr: [
      {
        lang: "FRANÇAIS",
        text: "I ni ce ! Bienvenue à BAARA — l'Institut d'IA du Mali à Bamako 🇲🇱",
        btn: "Explorer les 4 parcours",
        link: "#services"
      },
      {
        lang: "FRANÇAIS",
        text: "Des compétences informatiques de base au premier emploi tech rémunéré mondial ou local.",
        btn: "Voir les débouchés",
        link: "#careers"
      },
      {
        lang: "FRANÇAIS",
        text: "Laboratoire NLP Bamanankan : 47 000 paires de phrases en accès libre !",
        btn: "Découvrir le Lab",
        link: "#projects"
      }
    ],
    en: [
      {
        lang: "ENGLISH",
        text: "I ni ce! Welcome to BAARA — the AI Institute of Mali in Bamako 🇲🇱",
        btn: "Explore 4 Tracks",
        link: "#services"
      },
      {
        lang: "ENGLISH",
        text: "Malian youth, building applied AI in their own languages.",
        btn: "Explore Outcomes",
        link: "#careers"
      },
      {
        lang: "ENGLISH",
        text: "Open Bambara NLP Lab: 47k sentence pairs published openly.",
        btn: "Inside the Lab",
        link: "#projects"
      }
    ]
  };

  let phraseIndex = 0;
  let audioCtx = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Web Audio API synthesized robotic harmonic chime (zero download, instantaneous)
  function playRobotChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const now = audioCtx.currentTime;

      // Tone 1: High crisp chirp
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Tone 2: Warm undertone
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(293.66, now); // D4
      osc2.frequency.exponentialRampToValueAtTime(440, now + 0.15); // A4

      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now);
      osc2.stop(now + 0.4);
    } catch (e) {
      // Audio context policy fallback
    }
  }

  // Update speech bubble content based on active language
  function updateSpeechContent(increment = false) {
    const docLang = (document.documentElement.lang || "en").toLowerCase();
    const activeLang = docLang.startsWith("fr") ? "fr" : docLang.startsWith("bm") ? "bm" : "en";
    const phrases = ROBOT_PHRASES[activeLang] || ROBOT_PHRASES.en;

    if (increment) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    } else {
      phraseIndex = phraseIndex % phrases.length;
    }

    const current = phrases[phraseIndex];
    if (speechText) speechText.textContent = current.text;
    if (speechLangPill) speechLangPill.textContent = current.lang;

    const actionBtn = document.getElementById("robotActionBtn");
    if (actionBtn) {
      actionBtn.textContent = current.btn;
      actionBtn.setAttribute("href", current.link);
    }
  }

  // Show / Toggle speech bubble
  function showSpeechBubble(playChime = true) {
    if (!speechBubble) return;
    updateSpeechContent(false);
    speechBubble.classList.add("baara-bubble-visible");
    if (playChime) playRobotChime();
  }

  function hideSpeechBubble() {
    if (!speechBubble) return;
    speechBubble.classList.remove("baara-bubble-visible");
  }

  function toggleSpeechBubble() {
    if (!speechBubble) return;
    if (speechBubble.classList.contains("baara-bubble-visible")) {
      updateSpeechContent(true);
      playRobotChime();
    } else {
      showSpeechBubble(true);
    }
  }

  // 2.5D Parallax Mouse & Touch Physics
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let isHovering = false;
  let animFrameId = null;

  function updatePhysicsLoop() {
    if (isReducedMotion) return;

    // Smooth spring interpolation
    const ease = 0.12;
    currentRotateX += (targetRotateX - currentRotateX) * ease;
    currentRotateY += (targetRotateY - currentRotateY) * ease;

    if (wrap25d && !container.hasAttribute("data-spline-active")) {
      wrap25d.style.transform = `perspective(900px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translateZ(${isHovering ? "18px" : "0px"})`;
    }

    // Stop animation loop when settling back to 0
    const delta = Math.abs(targetRotateX - currentRotateX) + Math.abs(targetRotateY - currentRotateY);
    if (delta > 0.01 || isHovering) {
      animFrameId = requestAnimationFrame(updatePhysicsLoop);
    } else {
      animFrameId = null;
    }
  }

  function triggerPhysics() {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updatePhysicsLoop);
    }
  }

  // Mouse move over hero section
  const heroSection = document.getElementById("hero") || container;
  heroSection.addEventListener("mousemove", (e) => {
    if (isReducedMotion || container.hasAttribute("data-spline-active")) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) / (window.innerWidth / 2);
    const dy = (e.clientY - centerY) / (window.innerHeight / 2);

    // Limit maximum tilt to 14 degrees for smooth natural feel
    targetRotateY = Math.max(-14, Math.min(14, dx * 14));
    targetRotateX = Math.max(-12, Math.min(12, -dy * 12));

    // Visor glow reflection coordinate
    if (glow) {
      const px = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const py = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      glow.style.setProperty("--glow-x", `${px}%`);
      glow.style.setProperty("--glow-y", `${py}%`);
      glow.style.opacity = "0.75";
    }

    triggerPhysics();
  }, { passive: true });

  heroSection.addEventListener("mouseenter", () => {
    isHovering = true;
    triggerPhysics();
  }, { passive: true });

  heroSection.addEventListener("mouseleave", () => {
    isHovering = false;
    targetRotateX = 0;
    targetRotateY = 0;
    if (glow) glow.style.opacity = "0";
    triggerPhysics();
  }, { passive: true });

  // Mobile Touch Tilt / Drag Interaction
  wrap25d.addEventListener("touchmove", (e) => {
    if (isReducedMotion || !e.touches[0] || container.hasAttribute("data-spline-active")) return;
    const touch = e.touches[0];
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    targetRotateY = Math.max(-14, Math.min(14, ((touch.clientX - centerX) / (rect.width / 2)) * 14));
    targetRotateX = Math.max(-12, Math.min(12, -((touch.clientY - centerY) / (rect.height / 2)) * 12));
    isHovering = true;
    triggerPhysics();
  }, { passive: true });

  wrap25d.addEventListener("touchend", () => {
    isHovering = false;
    targetRotateX = 0;
    targetRotateY = 0;
    triggerPhysics();
  }, { passive: true });

  const heroRobotImg = document.getElementById("heroRobotImg");
  const ROBOT_DEFAULT_SRC = "/assets/images/home-one/hero/hero-robot-black.png";
  const ROBOT_ALT_SRC = "/assets/images/home-one/hero/hero-img1.png";

  const ROBOT_ACTION_LABELS = {
    en: "Change robot",
    fr: "Changer de robot",
    bm: "Robot yɛlɛma"
  };

  function getActiveRobotMode() {
    try {
      const saved = localStorage.getItem("baara_robot_choice");
      if (saved === "spline" || saved === "black" || saved === "malian") return saved;
    } catch (e) {}
    return "spline"; // Default to 3D version
  }

  function updateModeLabel() {
    if (!modeBtn) return;
    const lang = document.documentElement.lang?.toLowerCase() || "en";
    modeBtn.setAttribute("aria-label", ROBOT_ACTION_LABELS[lang] || ROBOT_ACTION_LABELS.en);
  }

  function applyRobotMode(mode, save = true) {
    if (save) {
      try {
        localStorage.setItem("baara_robot_choice", mode);
      } catch (e) {}
    }
    if (mode === "spline") {
      container.setAttribute("data-spline-active", "true");
      if (splineMount) splineMount.style.display = "block";
    } else {
      container.setAttribute("data-spline-active", "false");
      const eyesOverlay = document.getElementById("robotEyesOverlay");
      if (eyesOverlay) {
        eyesOverlay.className = mode === "malian" ? "baara-robot-eyes mode-malian" : "baara-robot-eyes mode-black";
      }
      if (heroRobotImg) {
        const targetSrc = mode === "malian" ? ROBOT_ALT_SRC : ROBOT_DEFAULT_SRC;
        if (heroRobotImg.getAttribute("src") !== targetSrc) {
          heroRobotImg.style.transition = "opacity 0.2s ease, transform 0.2s ease";
          heroRobotImg.style.opacity = "0.4";
          heroRobotImg.style.transform = "scale(0.97)";
          setTimeout(() => {
            heroRobotImg.src = targetSrc;
            heroRobotImg.style.opacity = "1";
            heroRobotImg.style.transform = "scale(1)";
          }, 120);
        }
      }
    }
    updateModeLabel(mode);
  }

  function toggleRobot() {
    const current = getActiveRobotMode();
    let next = "spline";
    if (current === "spline") {
      next = "black";
    } else if (current === "black") {
      next = "malian";
    } else {
      next = "spline";
    }
    applyRobotMode(next, true);
    playRobotChime();
  }

  // Set initial robot based on saved preference or default to 3D Spline
  const initialMode = getActiveRobotMode();
  applyRobotMode(initialMode, false);

  // Click on robot or toggle button switches robot and plays chime
  wrap25d.addEventListener("click", () => {
    toggleRobot();
  });

  if (modeBtn) {
    modeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleRobot();
    });
  }

  if (speechClose) {
    speechClose.addEventListener("click", (e) => {
      e.stopPropagation();
      hideSpeechBubble();
    });
  }

  if (chirpBtn) {
    chirpBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      playRobotChime();
    });
  }

  // Listen for Spline 3D Ready event from spline-island
  window.addEventListener("baara:hero-spline-ready", () => {
    container.setAttribute("data-spline-ready", "true");
    const mode = getActiveRobotMode();
    if (mode === "spline") {
      container.setAttribute("data-spline-active", "true");
      updateModeLabel("spline");
    }
    if (speechBubble) speechBubble.style.zIndex = "30";
  });

  // Automatically show welcome bubble after 2.8s on initial visit (if present)
  if (speechBubble) {
    setTimeout(() => {
      if (!speechBubble.classList.contains("baara-bubble-visible")) {
        showSpeechBubble(false);
      }
    }, 2800);
  }

  // Sync robot labels if user toggles site language (EN / FR / BM)
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        updateModeLabel();
        updateSpeechContent(false);
      }, 50);
    });
  });

  // Also listen for html[lang] attribute changes via MutationObserver
  const langObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        updateModeLabel();
        updateSpeechContent(false);
      }
    });
  });
  langObserver.observe(document.documentElement, { attributes: true });
})();
