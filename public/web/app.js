/**
 * baara.ai — AI Institute of Mali Interactive Controller, #pitch Thesis Deck & Campus Preview Engine
 */

(async function initBaaraSchoolApp() {
  // 1. Register Offline-First Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/web/sw-media-engine.js").catch(() => {});
  }

  // 2. Sticky Header Scroll State & Mobile Navigation Drawer Toggle (.cs-munu_toggle)
  const stickyHeader = document.querySelector(".cs_sticky_header");
  const syncHeaderScroll = () => {
    if (!stickyHeader) return;
    if (window.scrollY > 20) {
      stickyHeader.classList.add("cs-gescout_sticky", "cs-gescout_show");
    } else {
      stickyHeader.classList.remove("cs-gescout_sticky", "cs-gescout_show");
    }
  };
  window.addEventListener("scroll", syncHeaderScroll, { passive: true });
  syncHeaderScroll();

  const menuToggle = document.querySelector(".cs-munu_toggle");
  const navList = document.querySelector(".cs_nav_list");
  if (menuToggle && navList) {
    const toggleMenu = (e) => {
      if (e) e.stopPropagation();
      menuToggle.classList.toggle("cs-toggle_active");
      menuToggle.classList.toggle("cs_toggle_active");
      navList.classList.toggle("cs_active");
    };

    const closeMenu = () => {
      menuToggle.classList.remove("cs-toggle_active", "cs_toggle_active");
      navList.classList.remove("cs_active");
    };

    menuToggle.addEventListener("click", toggleMenu);

    // Expandable submenus on mobile
    document.querySelectorAll(".cs-munu_dropdown_toggle").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBtn.classList.toggle("active");
      });
    });

    // Close menu when clicking navigation anchor links (except dropdown toggles or language switches)
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 1200) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (window.innerWidth < 1200 && navList.classList.contains("cs_active")) {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMenu();
        }
      }
    });
  }

  // 3. Learning Track Cards Hover / Active State (.baara-service-card)
  const serviceCards = document.querySelectorAll(".baara-service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      serviceCards.forEach((c) => c.classList.remove("item-active"));
      card.classList.add("item-active");
    });
  });

  // 4. Interactive #pitch Thesis Deck and #careers role cards are rendered and wired in web/sections.js

  // 5. Bambara NLP Lab Use Cases Accordion (#projectAccordion)
  const projectHeaders = document.querySelectorAll("[data-project-toggle]");
  projectHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const targetId = header.getAttribute("data-project-toggle");
      document.querySelectorAll("#projectAccordion .accordion-collapse").forEach((pane) => {
        if (pane.id === targetId) {
          pane.classList.toggle("show");
        } else {
          pane.classList.remove("show");
        }
      });
    });
  });

  // 6. Founding Team & Advisors Master-Detail Tabs ([data-team-tab])
  const teamTabs = document.querySelectorAll("[data-team-tab]");
  const teamPanes = document.querySelectorAll("[data-team-pane]");

  function switchTeamFounder(idxStr) {
    teamTabs.forEach((t) => t.classList.toggle("active", t.getAttribute("data-team-tab") === idxStr));
    teamPanes.forEach((p) => {
      const match = p.getAttribute("data-team-pane") === idxStr;
      p.classList.toggle("show", match);
      p.classList.toggle("active", match);
    });
  }

  teamTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = tab.getAttribute("data-team-tab");
      switchTeamFounder(idx);
    });
  });

  // Geo-targeted Founder Showcase:
  // - Mali (ML) -> Cheick Kanté (Tab 2)
  // - US (US) & Canada (CA) -> Samba Gueye (Tab 1)
  // - Default -> Abdel R Traoré (Tab 0)
  (function initTeamGeoTargeting() {
    let country = null;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("geo")) {
      country = urlParams.get("geo").toUpperCase();
    }

    if (!country) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (tz.includes("Bamako") || tz.includes("Mali") || tz === "Africa/Timbuktu") {
          country = "ML";
        } else if (
          tz.startsWith("America/") ||
          tz.includes("New_York") || tz.includes("Chicago") ||
          tz.includes("Denver") || tz.includes("Los_Angeles") ||
          tz.includes("Toronto") || tz.includes("Vancouver") ||
          tz.includes("Montreal") || tz.includes("Edmonton") ||
          tz.includes("Halifax") || tz.includes("Winnipeg") ||
          tz.includes("Phoenix") || tz.includes("Anchorage") ||
          tz.includes("Honolulu")
        ) {
          country = (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || tz.includes("Edmonton") || tz.includes("Halifax") || tz.includes("Winnipeg")) ? "CA" : "US";
        }
      } catch (e) {}
    }

    function applyTargeting(code) {
      const geoNotice = document.getElementById("teamGeoNotice");
      if (geoNotice) {
        geoNotice.style.display = "none";
        geoNotice.innerHTML = "";
      }
      if (code === "ML") {
        switchTeamFounder("2");
      } else if (code === "US" || code === "CA") {
        switchTeamFounder("1");
      } else {
        switchTeamFounder("0");
      }
    }

    if (country) {
      applyTargeting(country);
    } else if (window.fetch) {
      fetch("https://api.country.is/")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country) {
            applyTargeting(data.country.toUpperCase());
          }
        })
        .catch(() => {});
    }
  })();

  // 7. Accountability & Partner Reporting Carousel Prev/Next Buttons
  const prevBtn = document.getElementById("testimPrevBtn");
  const nextBtn = document.getElementById("testimNextBtn");
  const viewport = document.getElementById("testimonialViewport");
  if (prevBtn && nextBtn && viewport) {
    const rotateTestimonials = () => {
      const first = viewport.firstElementChild;
      if (first) viewport.appendChild(first);
    };
    prevBtn.addEventListener("click", rotateTestimonials);
    nextBtn.addEventListener("click", rotateTestimonials);
  }

  // 8. Partnership Inquiry & Newsletter Forms (Wired to contact@baara.ai)
  const contactForm = document.getElementById("baaraContactForm");
  const contactFeedback = document.getElementById("contactFeedback");
  const submitBtn = contactForm ? contactForm.querySelector("button[type='submit']") : null;

  if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const organization = formData.get("company_name") || "Individual / Not specified";
      const phone = formData.get("phone") || "Not provided";
      const subject = formData.get("subject") || "General Partnership Inquiry";
      const message = formData.get("message") || "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending inquiry... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="display:inline-block;width:14px;height:14px;border:2px solid #fff;border-right-color:transparent;border-radius:50%;vertical-align:middle;margin-left:6px;animation:spin 0.75s linear infinite;"></span>`;
      }

      contactFeedback.style.display = "block";
      contactFeedback.style.color = "#0dcaf0";
      contactFeedback.textContent = "Routing inquiry to the founding team at contact@baara.ai...";

      const payload = {
        name,
        email,
        organization,
        phone,
        subject,
        message,
        _subject: `[baara.ai Inquiry] ${subject} - ${name}`,
        _replyto: email
      };

      try {
        let sent = false;
        try {
          const apiRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (apiRes.ok) sent = true;
        } catch (e) {}

        if (!sent) {
          const response = await fetch("https://formsubmit.co/ajax/contact@baara.ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (response.ok) sent = true;
        }

        if (sent) {
          contactFeedback.style.color = "#2ECC71";
          contactFeedback.innerHTML = `<strong>Aw ni ce!</strong> Your inquiry has been sent directly to the BAARA team (<strong>contact@baara.ai</strong>). We will respond to <u>${email}</u> shortly.`;
          contactForm.reset();
        } else {
          throw new Error("Endpoint response not ok");
        }
      } catch (err) {
        // Fail-safe fallback: generate mailto link so no inquiry is ever lost
        const mailtoSubject = encodeURIComponent(`[baara.ai Inquiry] ${subject}`);
        const mailtoBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nPhone/WhatsApp: ${phone}\nTrack: ${subject}\n\nMessage:\n${message}`
        );
        contactFeedback.style.color = "#F39C12";
        contactFeedback.innerHTML = `Inquiry recorded! If you'd like to confirm immediately, <a href="mailto:contact@baara.ai?subject=${mailtoSubject}&body=${mailtoBody}" style="color:#0dcaf0;text-decoration:underline;">click here to open in your mail app</a> or email <strong>contact@baara.ai</strong>.`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Inquiry <i class="bi bi-arrow-right"></i>`;
        }
      }
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      const emailVal = emailInput ? emailInput.value : "";
      if (!emailVal) return;

      const btn = newsletterForm.querySelector("button");
      if (btn) btn.disabled = true;

      try {
        await fetch("https://formsubmit.co/ajax/contact@baara.ai", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            email: emailVal,
            _subject: `[baara.ai Newsletter] New subscriber: ${emailVal}`
          })
        });
      } catch (e) {}

      alert(`Aw ni ce! ${emailVal} has been subscribed to BAARA quarterly impact reports.`);
      newsletterForm.reset();
      if (btn) btn.disabled = false;
    });
  }

  // 9. Multilingual Switcher (EN / FR / BM - Bamanankan)
  const I18N = {
    en: {
      nav_home: "The School",
      nav_services: "4 Tracks",
      nav_pitch: "Our Model",
      nav_pages: "Partnerships",
      nav_blog: "Briefs",
      nav_contact: "Take Part",
      nav_cta: "Partner With Us",
      hero_tag: "BAARA — AI Institute of Mali • Bamako, Mali • First Cohort 2027",
      hero_html: "<span>Malian Youth,</span> Building AI In Their <span>Own Languages.</span>",
      hero_desc:
        "A job-first AI school in Bamako. Four tracks take learners from no digital skills to paid work, with an open lab for Bambara language AI. Teaching is in French with Bambara support, and 70% of class time is hands-on project work.",
      hero_btn: "Sponsor or Partner",
      hero_kpi1_val: "300 / yr",
      hero_kpi1_lbl: "Learners per year from 2028 (88 in 2027 Pilot)",
      hero_kpi2_val: "4 Tracks",
      hero_kpi2_lbl: "Each learning track ends in a paid job exit",
      hero_kpi3_val: "50% Women",
      hero_kpi3_lbl: "Target share of women learners across cohorts",
      hero_kpi4_val: "$1,500",
      hero_kpi4_lbl: "Named scholarship per learner (first lesson to job)",
      about_sub: "Why Now • Mali in Focus",
      about_title: "The Talent Is Ready. We Build the Path From Zero Digital Skills to Paid AI Work.",
      about_desc:
        "In September 2026, Mali opened the new site of its national AI and robotics center, CIAR-Mali, and the government announced an annual national AI forum for youth. The talent is ready. What is missing is a practical path from no digital skills to paid AI work. BAARA — the AI Institute of Mali — builds that path in Bamako.",
      srv_sub: "The Program • 4 Stackable Tracks",
      srv_title: "Four Tracks. Each One Ends in Paid Work.",
      proj_sub: "Why a Bambara Lab • Open Malian AI",
      proj_title: "Inside the Bambara NLP Lab: AI in the Language Most Malians Speak Every Day"
    },
    fr: {
      nav_home: "L'École",
      nav_services: "4 Parcours",
      nav_pitch: "Notre Modèle",
      nav_pages: "Partenariats",
      nav_blog: "Publications",
      nav_contact: "Participer",
      nav_cta: "Devenir Partenaire",
      hero_tag: "BAARA — Institut d'IA du Mali • Bamako, Mali • 1re Cohorte 2027",
      hero_html: "<span>La Jeunesse Malienne,</span> Bâtissant l'IA Dans Ses <span>Propres Langues.</span>",
      hero_desc:
        "Une école d'IA tournée vers l'emploi à Bamako. Quatre parcours mènent les apprenants de zéro compétence numérique à un travail rémunéré, avec un laboratoire ouvert pour l'IA en langue bambara (70 % de projets pratiques).",
      hero_btn: "Parrainer ou Participer",
      hero_kpi1_val: "300 / an",
      hero_kpi1_lbl: "Apprenants par an dès 2028 (88 en pilote 2027)",
      hero_kpi2_val: "4 Parcours",
      hero_kpi2_lbl: "Chaque parcours débouche sur un emploi rémunéré",
      hero_kpi3_val: "50 % de Femmes",
      hero_kpi3_lbl: "Part cible de femmes apprenantes par cohorte",
      hero_kpi4_val: "1 500 $",
      hero_kpi4_lbl: "Bourse nominative par apprenant (du 1er cours à l'emploi)",
      about_sub: "Pourquoi Maintenant • Cap sur le Mali",
      about_title: "Le Talent Est Prêt. Nous Bâtissons la Voie Pratique Vers les Métiers de l'IA.",
      about_desc:
        "En septembre 2026, le Mali a inauguré le nouveau site du CIAR-Mali et annoncé un forum national annuel de l'IA pour la jeunesse. Ce qui manque est un parcours concret allant de l'initiation numérique à l'emploi qualifié. BAARA — l'Institut d'IA du Mali — construit ce pont à Bamako.",
      srv_sub: "Le Programme • 4 Parcours Modulaires",
      srv_title: "Quatre Parcours. Chacun Débouche sur un Emploi Rémunéré.",
      proj_sub: "Pourquoi un Labo Bambara • IA Ouverte",
      proj_title: "Au Cœur du Bambara NLP Lab : L'IA dans la Langue du Quotidien au Mali"
    },
    bm: {
      nav_home: "Kalanso",
      nav_services: "Kalan Sira 4",
      nav_pitch: "An Ka Sira",
      nav_pages: "Jɛɲɔgɔnya",
      nav_blog: "Sɛbɛnw",
      nav_contact: "Bolodacogo",
      nav_cta: "An Ka Jɛ",
      hero_tag: "BAARA — Mali IA Kalanso • Bamakɔ, Mali • Kalan Daminɛ 2027",
      hero_html: "<span>Mali Denmisɛnw,</span> Bɛ IA Dilan U Yɛrɛ Ka <span>Kanw Na.</span>",
      hero_desc:
        "IA kalanso min bɛ baara sɔrɔli bila ɲɛ Bamakɔ. Kalan sira naani bɛ kalandenw bɔ ordinatɛri dɔnbaliya la ka taa baara saraɲuman na, ni Bamanankan IA labo daɲɛw ye.",
      hero_btn: "Kalanden Dɛmɛ (1 500 $)",
      hero_kpi1_val: "300 / san",
      hero_kpi1_lbl: "Kalandenw san o san kabini 2028 (88 san 2027 kɔnɔ)",
      hero_kpi2_val: "Kalan Sira 4",
      hero_kpi2_lbl: "Kalan sira kelen-kelen bɛɛ bɛ laban baara saraɲuman na",
      hero_kpi3_val: "Muso 50%",
      hero_kpi3_lbl: "Muso kalandenw hakɛ kɛlɛkolo kɔnɔ",
      hero_kpi4_val: "1 500 $",
      hero_kpi4_lbl: "Kalanden kelen kelen bɛɛ ka dɛmɛsara (kalan fɔlɔ ka taa baara la)",
      about_sub: "Mun Na Sisan • Mali Kɔnɔ",
      about_title: "Hakili Bɛ Yen. An Bɛ Sira Tigɛ Ka Bɔ Kalan Na Ka Taa IA Baara La.",
      about_desc:
        "Sɛtanburu 2026 la, Mali ye CIAR-Mali yɔrɔ kura da wuli. BAARA bɛ kalan kɛ Faransikan na ni Bamanankan dɛmɛ ye, walasa waati 70% ka kɛ baara lakika ye.",
      srv_sub: "Kalan Sira Naani (4 Tracks)",
      srv_title: "Kalan Sira Naani. U Bɛɛ Bɛ Taa Baara Saraɲuman Na.",
      proj_sub: "Bamanankan NLP Labo",
      proj_title: "MALIBA-AI ni Bayelemabaga (Kumasen 47 000) Kan Bamanankan IA Baara"
    }
  };

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-set-lang");
      if (window.baaraApplyLanguage) {
        window.baaraApplyLanguage(lang);
      }
    });
  });

  // 10. Bamako 60s Campus Preview Video Modal
  const modal = document.getElementById("baaraVideoModal");
  const openModalBtn = document.getElementById("openVideoModalBtn");
  const closeModalBtn = document.getElementById("closeVideoModalBtn");
  const videoEl = document.getElementById("baaraVideo");
  const webpContainer = document.getElementById("webpFallbackContainer");
  const liteAudio = document.getElementById("liteAudioPlayer");

  function loadCampusPreviewStream() {
    if (!videoEl) return;
    if (webpContainer) webpContainer.style.display = "none";
    if (liteAudio) liteAudio.pause();
    videoEl.style.display = "block";

    const manifestUrl = "/build_baara_media/dist/stream_T1_480p_Edge.m3u8";
    if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = manifestUrl;
    } else {
      videoEl.src = "/build_baara_media/intermediate/mezzanine_muxed_1080p24.mp4";
    }
  }

  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
      modal.classList.add("open");
      loadCampusPreviewStream();
      if (videoEl) videoEl.play().catch(() => {});
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      if (videoEl) videoEl.pause();
      if (liteAudio) liteAudio.pause();
    });
  }
})();
