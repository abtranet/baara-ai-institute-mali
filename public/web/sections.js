/**
 * baara.ai — Data-driven renderers for two homepage sections:
 *   1. #careers  Graduate career outcomes (role cards + role filter + Mercor callout)
 *   2. #pitch    Interactive school-model deck (tabs, autoplay, animated bars & counters)
 *
 * Content lives in the CAREERS / DECK objects below as { en, fr } pairs, so both sections
 * are fully bilingual (Bambara falls back to English, like the rest of the site).
 * Re-renders automatically whenever <html lang> changes (see i18n.js → applyLanguage).
 */
(function initBaaraSections() {
  "use strict";

  const SUPPORTED = ["en", "fr", "bm"];
  const REDUCED_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Trilingual string helper (with fallback). */
  const T = (en, fr, bm) => ({ en, fr, bm: bm || fr || en });

  /* ------------------------------------------------------------------ *
   * CONTENT — #careers
   * ------------------------------------------------------------------ */
  const CAREERS = {
    sub: T("Graduate Career Outcomes • Global AI Employment", "Débouchés des Diplômés • Emploi Mondial en IA", "Kalandenw Ka Baara • Duniya IA Baara Sira"),
    title: T("Prominent Remote & Global AI Jobs Our Graduates Can Perform", "Emplois IA Mondiaux et à Distance Accessibles à nos Diplômés", "Duniya Ni Yɔrɔ-Jan IA Baara Minnu Kalandenw Bɛ Se Ka Kɛ"),
    desc: T("BAARA's 70% project-based curriculum equips Malian youth not only for domestic industry, but directly for high-paying remote roles on premier global AI talent networks such as <strong>Mercor</strong>, where leading AI labs and global enterprises recruit technical talent.", "Le curriculum de BAARA, fondé à 70 % sur des projets, prépare la jeunesse malienne non seulement à l'industrie locale, mais aussi à des postes à distance très bien rémunérés sur les grands réseaux mondiaux de talents en IA comme <strong>Mercor</strong>, où les laboratoires d'IA et les entreprises internationales recrutent des profils techniques.", "BAARA ka kalan waati 70% bɛ kɛ baara lakika ye min bɛ Mali denmisɛnw labɛn Mali dɔrɔn tɛ, nka ka baara saraɲuman sɔrɔ yɔrɔ-jan duniya IA kuluw la i n'a fɔ <strong>Mercor</strong>, yɔrɔ min duniya labobaaw bɛ baarakɛlaw ɲini."),
    filterLabel: T("Filter roles by learning track", "Filtrer les métiers par parcours", "Baaraw sugandi kalan sira fɛ"),
    filters: [
      { key: "all", label: T("All roles", "Tous les métiers", "Baara bɛɛ") },
      { key: "t12", label: T("Track 1–2", "Parcours 1–2", "Kalan sira 1–2") },
      { key: "t3", label: T("Track 3", "Parcours 3", "Kalan sira 3") },
      { key: "t4", label: T("Track 4", "Parcours 4", "Kalan sira 4") }
    ],
    count: (shown, total, lang) => {
      if (lang === "fr") return `${shown} métier${shown > 1 ? "s" : ""} sur ${total}`;
      if (lang === "bm") return `Baara ${shown} / ${total} jira`;
      return `Showing ${shown} of ${total} roles`;
    },
    perHour: T("/hr", "/h", "/lɛrɛ"),
    payScaleMax: 90,
    keySkills: T("Key Skills", "Compétences Clés", "Dɔnko Kuntigiw"),
    roles: [
      {
        track: "t12",
        accent: "purple",
        badge: T("Track 1 & 2 Exit", "Sortie Parcours 1 & 2", "Kalan Sira 1 & 2 Bilasira"),
        pay: [25, 45],
        title: T("AI Model Evaluator & RLHF Specialist", "Évaluateur de Modèles IA & Spécialiste RLHF", "IA Modɛli Kɔrɔsibaga & RLHF Dɔnbaga"),
        desc: T("Audit frontier LLM outputs for safety, factuality, and hallucination. Score reasoning rubrics and create gold-standard reinforcement learning from human feedback (RLHF) datasets.", "Auditez les réponses des LLM de pointe : sécurité, factualité, hallucinations. Notez selon des grilles de raisonnement et créez des jeux de données de référence pour l'apprentissage par renforcement à partir de retours humains (RLHF).", "IA kumasenw kɔrɔsi lakana, tilennenya, ni filiw ban kama. Rubrik kɔrɔsi ka RLHF kunnafoni sɛbɛnbaw labɛn hadamadenw ka ladili fɛ."),
        skills: [
          T("Prompt Engineering", "Ingénierie de Prompts", "Kumasen Dilan"),
          T("RLHF Auditing", "Audit RLHF", "RLHF Kɔrɔsili"),
          T("Data Annotation", "Annotation de Données", "Kunnafoni Sɛbɛnli")
        ]
      },
      {
        track: "t3",
        accent: "orange",
        badge: T("Track 3 Exit", "Sortie Parcours 3", "Kalan Sira 3 Bilasira"),
        pay: [45, 85],
        title: T("Python & ML Solutions Engineer", "Ingénieur Solutions Python & ML"),
        desc: T(
          "Build custom machine learning pipelines, fine-tune open-source models (Hugging Face / PyTorch), and integrate AI APIs into production web, clinic, and agro-advisory applications.",
          "Construisez des pipelines d'apprentissage automatique sur mesure, affinez des modèles open source (Hugging Face / PyTorch) et intégrez des API d'IA dans des applications web, cliniques et agro-conseil en production."
        ),
        skills: [
          T("Python", "Python"),
          T("Git", "Git"),
          T("PyTorch", "PyTorch"),
          T("REST APIs", "API REST"),
          T("Model Fine-Tuning", "Affinage de Modèles")
        ]
      },
      {
        track: "t4",
        accent: "red",
        badge: T("Track 4 Fellowship", "Fellowship Parcours 4", "Kalan Sira 4 Bolodali"),
        pay: [35, 65],
        title: T("Bilingual NLP & Speech AI Specialist", "Spécialiste NLP Bilingue & IA Vocale"),
        desc: T(
          "Curate African language speech and text datasets. Benchmark multilingual models in Bambara and French for global frontier foundation models and voice AI assistants.",
          "Constituez des jeux de données vocaux et textuels en langues africaines. Évaluez des modèles multilingues en bambara et en français pour les modèles de fondation de pointe et les assistants vocaux."
        ),
        skills: [
          T("Bambara Speech NLP", "NLP Vocal Bambara"),
          T("ASR Alignment", "Alignement ASR"),
          T("Multilingual Evaluation", "Évaluation Multilingue")
        ]
      },
      {
        track: "t4",
        accent: "red",
        badge: T("Track 4 Systems", "Systèmes Parcours 4"),
        pay: [35, 70],
        title: T("Edge AI & Local Server Specialist", "Spécialiste IA Embarquée & Serveurs Locaux"),
        desc: T(
          "Deploy and manage offline-ready AI inference servers (Ollama, vLLM, Linux) paired with solar-powered microgrids for resilient regional and remote operations across the Sahel.",
          "Déployez et gérez des serveurs d'inférence IA utilisables hors-ligne (Ollama, vLLM, Linux), associés à des micro-réseaux solaires, pour des opérations régionales et isolées résilientes à travers le Sahel."
        ),
        skills: [
          T("Linux", "Linux"),
          T("Edge LLMs", "LLM Embarqués"),
          T("Solar Power Load Balancing", "Équilibrage de Charge Solaire"),
          T("Docker", "Docker")
        ]
      }
    ],
    mercor: {
      chip: T("Global Remote Talent Platform", "Plateforme Mondiale de Talents à Distance"),
      title: T("Explore Prominent Remote AI Roles on Mercor", "Explorez des Postes IA à Distance sur Mercor"),
      desc: T(
        "Mercor pairs pre-vetted international AI developers, annotators, and researchers with global technology companies. See active openings, salary benchmarks, and apply directly through our partner portal:",
        "Mercor met en relation des développeurs, annotateurs et chercheurs en IA présélectionnés avec des entreprises technologiques mondiales. Consultez les offres actives, les repères salariaux et postulez directement via notre portail partenaire :"
      ),
      cta: T("Apply / Explore on Mercor", "Postuler / Explorer sur Mercor"),
      href: "https://t.mercor.com/S0VZG"
    }
  };

  /* ------------------------------------------------------------------ *
   * CONTENT — #pitch deck
   * ------------------------------------------------------------------ */
  const DECK = {
    sub: T("Our Model & Impact • Institutional Overview", "Notre Modèle & Impact • Présentation Institutionnelle", "An Ka Sira & Nafa • Jamana Kunnafoni"),
    title: T("From a 2027 Pilot Cohort to 300 Learners a Year in Bamako.", "D'une Cohorte Pilote en 2027 à 300 Apprenants par An à Bamako.", "Kabini Kalan Fɔlɔ 2027 Fo Kalanden 300 San O San Bamakɔ."),
    desc: T("Explore the four pillars of BAARA — the AI Institute of Mali: Why Now, the 4-Track School Model, Solar & Offline Campus Engineering, and the 2027–2028 Cohort Roadmap.", "Découvrez les quatre piliers de BAARA — l'Institut d'IA du Mali : Pourquoi Maintenant, le Modèle d'École en 4 Parcours, l'Ingénierie d'un Campus Solaire & Hors-Ligne et la Feuille de Route des Cohortes 2027–2028.", "BAARA saraw naani kɔrɔsi: Mun Na Sisan, Kalan Sira Naani Kalanso, Tle-Fanga & Kunuŋɔ Kalanso Minɛnw, ni San 2027–2028 Taabolo."),
    tablistLabel: T("School thesis sections", "Sections de la thèse de l'école", "Kalanso sira tilaw"),
    prev: T("Previous thesis section", "Section précédente", "Sira tɛmɛnen"),
    next: T("Next thesis section", "Section suivante", "Sira nata"),
    pause: T("Pause auto-play", "Mettre en pause le défilement automatique", "A to a cogo la dɔɔnin"),
    play: T("Resume auto-play", "Reprendre le défilement automatique", "A wuli kɔkura"),
    panels: [
      {
        tab: T("01 Why Now: Mali in Focus", "01 Pourquoi Maintenant : Cap sur le Mali", "01 Mun Na Sisan: Mali Kɔnɔ"),
        tag: T("01 / Why Now • Mali in Focus", "01 / Pourquoi Maintenant • Cap sur le Mali", "01 / Mun Na Sisan • Mali Kɔnɔ"),
        title: T("Talent is everywhere in Mali. A practical path to paid AI work is what's missing.", "Le talent est partout au Mali. Ce qui manque, c'est une voie concrète vers un emploi rémunéré en IA.", "Hakili bɛ yen Mali yɔrɔ bɛɛ. Min man kan, o ye sira ye ka taa baara saraɲuman na."),
        text: T("In September 2026, Mali opened the new site of its national AI and robotics center, CIAR-Mali, and announced an annual national AI forum for youth. Young Malians are eager to build, yet traditional degrees rarely bridge the gap from zero digital access to paid technical work, and mainstream AI fails in Bambara.", "En septembre 2026, le Mali a inauguré le nouveau site de son centre national d'IA et de robotique, le CIAR-Mali, et annoncé un forum national annuel de l'IA pour la jeunesse. Les jeunes Maliens ont envie de construire, mais les diplômes classiques comblent rarement l'écart entre l'absence d'accès au numérique et un emploi technique rémunéré, et l'IA grand public échoue en bambara.", "Sɛtanburu 2026 la, Mali ye CIAR-Mali yɔrɔ kura da wuli. Mali denmisɛnw b'a fɛ ka dɔ dilan, nka kalan kɔrɔw tɛ se ka dɔnbaliya tigɛ ka taa baara saraɲuman na, wa IA tɛ baara ɲuman kɛ Bamanankan na."),
        bullets: [
          T("Map Bamako employer demand across agro-industry, clinics, NGOs, and digital services", "Cartographier la demande des employeurs de Bamako : agro-industrie, cliniques, ONG et services numériques", "Bamakɔ baaratigiw haaju dɔn sɛnɛkɛ, dɔgɔtɔrɔsow, NGO-w, ni kunuŋɔ baarasow la"),
          T("Recruit youth and women learners (50% target) with transport & meal stipends", "Recruter des jeunes et des femmes (objectif de 50 %) avec indemnités de transport et de repas", "Denmisɛnw ni musow wele (muso 50% kuntigi) ni taa-ni-kɔ ni dumuni saraw ye"),
          T("Teach in French with Bambara support so language is a bridge, never a barrier", "Enseigner en français avec un appui en bambara : la langue est un pont, jamais une barrière", "Kalan bɛ kɛ Faransikan na ni Bamanankan dɛmɛ ye: kan ye pont ye, gɛlɛya tɛ")
        ],
        dataTitle: T("Pedagogical Time & Inclusion Split", "Répartition du Temps Pédagogique & Inclusion", "Kalan Waati & Jɛɲɔgɔnya Tlapali"),
        dataSub: T("Designed around hands-on building and gender parity", "Conçu autour de la pratique et de la parité femmes-hommes", "Dilannen baara lakika ni cɛw-musow kɛlɛkolo kelen kan"),
        chip: T("2027–2028 Plan", "Plan 2027–2028", "2027–2028 Taabolo"),
        bars: [
          { label: T("Hands-on project & studio work", "Projets pratiques & travail en atelier", "Baara lakika & studio baara"), value: "70%", pct: 70 },
          { label: T("Target share of women learners", "Part cible d'apprenantes", "Muso kalandenw hakɛ kuntigi"), value: "50%", pct: 50 },
          { label: T("Guided instruction & mentor code reviews", "Cours guidés & revues de code par des mentors", "Karamɔgɔ kalan & kodi kɔrɔsili"), value: "30%", pct: 30 }
        ],
        metrics: [
          { v: "88", l: T("Pilot learners (Sep 2027)", "Apprenants pilotes (sept. 2027)", "Kalanden fɔlɔw (Sɛt. 2027)") },
          { v: "300/yr", l: T("Full scale from Apr 2028", "Plein régime dès avr. 2028", "Kalanso baa kabini Awir. 2028") },
          { v: "4", l: T("Job-exit learning tracks", "Parcours menant à l'emploi", "Kalan siraw baara ye") }
        ]
      },
      {
        tab: T("02 The 4-Track School Model", "02 Le Modèle de l'École en 4 Parcours", "02 Kalan Sira Naani Kalanso"),
        tag: T("02 / Learn. Build. Exit to Paid Work.", "02 / Apprendre. Construire. Accéder à l'Emploi."),
        title: T(
          "Four modular tracks where every stage ends in a real job profile.",
          "Quatre parcours modulaires où chaque étape débouche sur un vrai profil métier."
        ),
        text: T(
          "Learners start where they are. They can exit after any track into paid work or pass the competency gate to continue. Advanced fellows join the Bambara NLP Lab, building open speech and translation models on top of MALIBA-AI and the 47,000-pair Bayelemabaga dataset.",
          "Les apprenants démarrent là où ils en sont. Ils peuvent sortir après n'importe quel parcours vers un emploi rémunéré ou franchir l'examen de compétences pour continuer. Les fellows avancés rejoignent le Bambara NLP Lab et construisent des modèles ouverts de parole et de traduction à partir de MALIBA-AI et du jeu de données Bayelemabaga (47 000 paires)."
        ),
        bullets: [
          T(
            "Track 1 (8 wks) & Track 2 (6 wks): Digital Foundations & Applied AI for Work",
            "Parcours 1 (8 sem.) & Parcours 2 (6 sem.) : Bases du Numérique & IA Appliquée au Travail"
          ),
          T(
            "Track 3 (16 wks): Python, Git, Data Analysis & ML Capstone on Malian data",
            "Parcours 3 (16 sem.) : Python, Git, Analyse de Données & Projet ML sur des données maliennes"
          ),
          T(
            "Track 4 (24-wk Fellowship): Bambara NLP Lab for health, farming & public forms",
            "Parcours 4 (Fellowship de 24 sem.) : Bambara NLP Lab pour la santé, l'agriculture & les formulaires publics"
          )
        ],
        dataTitle: T("54-Week Full Stackable Curriculum", "Curriculum Modulaire Complet de 54 Semaines"),
        dataSub: T(
          "Weeks per track from foundations to NLP fellowship",
          "Semaines par parcours, des bases au fellowship NLP"
        ),
        chip: T("4 Exit Gates", "4 Portes de Sortie"),
        bars: [
          { label: T("Track 1: Digital & Data Foundations", "Parcours 1 : Bases du Numérique & des Données"), value: T("8 wks", "8 sem."), pct: 33 },
          { label: T("Track 2: Applied AI for Work", "Parcours 2 : IA Appliquée au Travail"), value: T("6 wks", "6 sem."), pct: 25 },
          { label: T("Track 3: Python & Machine Learning", "Parcours 3 : Python & Machine Learning", "Kalan Sira 3: Python & Masiri-Kalan"), value: T("16 wks", "16 sem."), pct: 67 },
          { label: T("Track 4: Bambara NLP Lab Fellowship", "Parcours 4 : Fellowship Bambara NLP Lab"), value: T("24 wks", "24 sem."), pct: 100 }
        ],
        metrics: [
          { v: "47,000", l: T("Bayelemabaga sentence pairs", "Paires de phrases Bayelemabaga") },
          { v: "100%", l: T("Open-licensed lab releases", "Publications du labo sous licence ouverte") },
          { v: "6", l: T("Quarterly impact indicators", "Indicateurs d'impact trimestriels", "Kalo saba nafa kunnafoniw") }
        ]
      },
      {
        tab: T("03 Solar & Offline Campus", "03 Campus Solaire & Hors-Ligne", "03 Tle-Fanga & Kunuŋɔ Kalanso"),
        tag: T("03 / Built for Uninterrupted Learning", "03 / Conçu pour un Apprentissage Ininterrompu"),
        title: T(
          "Solar-first campus power, offline local servers, and regional cloud sync.",
          "Énergie solaire en priorité, serveurs locaux hors-ligne et synchronisation cloud régionale."
        ),
        text: T(
          "Reliable power and high-speed local access to datasets, documentation, and development tools are essential for daily hands-on engineering in Bamako. Our campus infrastructure is purpose-built to keep classes and coding labs running without interruption.",
          "Une alimentation fiable et un accès local rapide aux jeux de données, à la documentation et aux outils de développement sont essentiels à la pratique quotidienne de l'ingénierie à Bamako. Notre campus est conçu pour que les cours et les labs de code tournent sans interruption."
        ),
        bullets: [
          T(
            "<strong>Solar-First Power:</strong> Dedicated solar arrays and battery banks power classrooms and laptops continuously",
            "<strong>Énergie Solaire d'Abord :</strong> Des panneaux solaires et des batteries dédiés alimentent en continu les salles et les ordinateurs portables"
          ),
          T(
            "<strong>Offline-Ready Local Servers:</strong> On-campus servers cache video courses, Python libraries, and compact AI models",
            "<strong>Serveurs Locaux Hors-Ligne :</strong> Les serveurs du campus mettent en cache cours vidéo, bibliothèques Python et modèles d'IA compacts"
          ),
          T(
            "<strong>Malian-Led + Regional Cloud Sync:</strong> Led in Bamako with West African academic and cloud collaboration",
            "<strong>Pilotage Malien + Synchronisation Cloud Régionale :</strong> Dirigé depuis Bamako, avec une collaboration académique et cloud ouest-africaine"
          )
        ],
        dataTitle: T("Campus Technical Architecture", "Architecture Technique du Campus"),
        dataSub: T(
          "Engineered for zero-downtime hands-on AI training",
          "Conçue pour une formation pratique à l'IA sans interruption"
        ),
        chip: T("Resilient Campus", "Campus Résilient"),
        bars: [
          { label: T("Solar array & battery autonomy during classroom hours", "Autonomie solaire & batteries pendant les heures de cours"), value: "100%", pct: 100 },
          { label: T("Curriculum, Python packages & datasets cached on LAN", "Curriculum, paquets Python & jeux de données en cache sur le réseau local"), value: "100%", pct: 100 },
          { label: T("Hands-on lab time on shared solar-backed workstations", "Temps de lab pratique sur postes partagés alimentés au solaire"), value: "70%", pct: 70 }
        ],
        metrics: [
          { v: T("Solar", "Solaire"), l: T("Primary campus power", "Énergie principale du campus") },
          { v: T("Offline", "Hors-Ligne"), l: T("Local server & model cache", "Serveur local & cache de modèles") },
          { v: T("Open", "Ouvert"), l: T("Public Bambara releases", "Publications publiques en bambara") }
        ]
      },
      {
        tab: T("04 2027–2028 Cohort Roadmap", "04 Feuille de Route Cohortes 2027–2028", "04 San 2027–2028 Taabolo"),
        tag: T("04 / 2027–2028 Cohort Roadmap & Ways to Partner", "04 / Feuille de Route 2027–2028 & Façons de S'associer"),
        title: T(
          "Four quality milestones from Jan 2027 to Dec 2028. Evidence at every step.",
          "Quatre jalons qualité de janv. 2027 à déc. 2028. Des preuves à chaque étape."
        ),
        text: T(
          "Every stage of the institute's rollout is measured against six transparent impact indicators — from Phase 1 (Employer & Curriculum Alignment) and Phase 2 (Solar Campus Setup) to Phase 3 (88-learner Pilot Cohort) and Phase 4 (300 learners/year Full Launch).",
          "Chaque étape du déploiement de l'institut est mesurée par six indicateurs d'impact transparents — de la Phase 1 (alignement employeurs & curriculum) et la Phase 2 (installation du campus solaire) à la Phase 3 (cohorte pilote de 88 apprenants) et la Phase 4 (lancement complet à 300 apprenants/an)."
        ),
        bullets: [
          T(
            "<strong>Sponsor a Learner ($1,500):</strong> Full scholarship + transport stipend from lesson 1 to job",
            "<strong>Parrainer un Apprenant (1 500 $) :</strong> Bourse complète + indemnité de transport, du premier cours à l'emploi"
          ),
          T(
            "<strong>Support the Bambara Lab:</strong> Fellowships, community voice collection & open models",
            "<strong>Soutenir le Labo Bambara :</strong> Fellowships, collecte de voix communautaires & modèles ouverts"
          ),
          T(
            "<strong>Give Tech (In-Kind) or Hire Graduates:</strong> Laptops, GPU credits, studio projects & jobs",
            "<strong>Donner du Matériel (en Nature) ou Recruter des Diplômés :</strong> Ordinateurs, crédits GPU, projets d'atelier & emplois"
          )
        ],
        dataTitle: T("6 Quarterly Impact Indicators", "6 Indicateurs d'Impact Trimestriels"),
        dataSub: T(
          "Published openly to all scholarship and lab partners",
          "Publiés ouvertement pour tous les partenaires de bourses et du labo"
        ),
        chip: T("Verified Outcomes", "Résultats Vérifiés"),
        bars: [
          { label: T("01 & 02: Learner Enrolment & Track Completion Rate", "01 & 02 : Inscriptions & Taux d'Achèvement des Parcours"), value: T("Tracked Quarterly", "Suivi Trimestriel"), pct: 90 },
          { label: T("03: Share of Women Learners Across All Tracks", "03 : Part d'Apprenantes dans Tous les Parcours"), value: T("50% Target", "Objectif 50 %"), pct: 50 },
          { label: T("04: Graduates Placed in Paid Work or Internships", "04 : Diplômés Placés en Emploi Rémunéré ou en Stage"), value: T("Job-First Exit", "Sortie vers l'Emploi"), pct: 85 },
          { label: T("05 & 06: Open Bambara Datasets Released & Studio Projects", "05 & 06 : Jeux de Données Bambara Ouverts & Projets d'Atelier"), value: T("100% Open", "100 % Ouvert"), pct: 100 }
        ],
        metrics: [
          { v: T("$1,500", "1 500 $"), l: T("Named learner scholarship", "Bourse nominative par apprenant") },
          { v: T("6 KPIs", "6 KPI"), l: T("Quarterly partner report", "Rapport trimestriel aux partenaires") },
          { v: T("4 Phases", "4 Phases"), l: T("Evidence-based rollout", "Déploiement fondé sur les preuves") }
        ]
      }
    ]
  };

  /* ------------------------------------------------------------------ *
   * CONTENT — #process (2027–2028 Cohort Roadmap)
   * ------------------------------------------------------------------ */
  const ROADMAP = {
    sub: T(
      "2027–2028 COHORT ROADMAP • BAMAKO",
      "FEUILLE DE ROUTE DE LA PROMOTION 2027–2028 • BAMAKO",
      "2027–2028 KALAN KULU SIRA • BAMAKƆ"
    ),
    title: T(
      "Four Quality Milestones From Curriculum Alignment to Full Scale.",
      "Quatre Jalons de Qualité : Du Cadrage au Plein Déploiement.",
      "Kulu 4 Senfɛ : Kalan Labɛn Ka Se Baara Dayɛlɛlen Ma."
    ),
    desc: T(
      "Every phase of our rollout is guided by verified learning outcomes, employer alignment, and open quarterly reporting.",
      "Chaque phase de notre déploiement est guidée par des résultats d'apprentissage vérifiés, l'adéquation aux besoins des employeurs et une gouvernance transparente.",
      "An ka baara hakɛ bɛɛ sinsinnen bɛ degebaga dɔnniya sɛbɛ, baarakɛlaw magow n'an ka fanga lankolon kan."
    ),
    activeBadge: T("Active Phase", "Jalon Actif", "Kulu Tɛmɛnen"),
    keyDeliverables: T("Key Deliverables & Action Items", "Livrables Clés & Actions Concrètes", "Kow Minnu Labɛnnen Bɛ"),
    targetMetrics: T("Target Metrics", "Indicateurs Cibles", "Taamasiyɛn Ciyɛn"),
    qualityGate: T("Quality Gate Criteria", "Critère de Validation du Jalon", "Sɛgɛsɛgɛli Siraw"),
    ctaLabel: T("Partner With BAARA", "S'engager avec BAARA", "Farikolo Don BAARA La"),
    controls: {
      prev: T("Previous Phase", "Phase Précédente", "Kulu Kɔfɛ"),
      next: T("Next Phase", "Phase Suivante", "Kulu Nata"),
      play: T("Start Autoplay", "Activer la lecture auto", "Daminɛ yɛrɛma"),
      pause: T("Pause Autoplay", "Mettre en pause", "Lɔ yɛrɛma")
    },
    transitionReview: T(
      "Verified 6-Indicator Review",
      "Bilan Vérifié sur 6 Indicateurs",
      "Kolosili Taamasiyɛn 6 Sɛgɛsɛgɛli"
    ),
    phases: [
      {
        index: 0,
        id: "phase-1",
        shortTab: T("Phase 1: Align", "Phase 1 : Cadrage", "Kulu 1 : Ladilan"),
        quarter: T("Q1 2027", "T1 2027", "T1 2027"),
        tag: T("Q1 2027 • Foundation Milestone", "T1 2027 • Jalon de Cadrage", "T1 2027 • Jalon Fɔlɔ"),
        timeframe: T("January – March 2027", "Janvier – Mars 2027", "Zanwuye – Marsi 2027"),
        title: T(
          "Phase 1: Align & Scaffold",
          "Phase 1 : Cadrage & Alignement",
          "Kulu 1 : Ladilan & Kolosili"
        ),
        subtitle: T(
          "Jan–Mar 2027 • Employer needs, curriculum & learner outreach",
          "Jan–Mar 2027 • Besoins employeurs, curriculum & mobilisation des apprenants",
          "Zan–Mar 2027 • Baarakɛlaw magow, kalan porogaramu & degebagaw weleli"
        ),
        headline: T(
          "Curriculum Validation, Employer Partnerships & Talent Outreach",
          "Validation du Curriculum, Partenariats Employeurs & Mobilisation des Talents",
          "Kalan Porogaramu Sɛbɛya, Baarakɛlaw Ntolon & Talenw Weleli"
        ),
        description: T(
          "Establishing the operational and pedagogical foundation in Bamako. Engaging local employers across healthcare, agriculture, and digital services to tailor learning outcomes directly to hiring demand, while launching open talent recruitment focused on high-potential youth and women.",
          "Établissement des fondations opérationnelles et pédagogiques à Bamako. Concertation avec les employeurs locaux (santé, agriculture, services numériques) pour caler les compétences sur les besoins réels, et lancement du recrutement de jeunes talents avec priorité à la parité.",
          "Baara fɔlɔw daminɛli Bamakɔ. Kalan kɛra kɛnɛya, sɛnɛ n'enkɛti baarakɛlaw fɛ walasa ka dɔnniya labɛn i n'a fɔ u magow bɛ cogo min, k'a sɔrɔ musow n'a degebagaw weleli kɛra ɲɔgɔn fɛ."
        ),
        deliverables: [
          T("Comprehensive skills audit across 25+ Malian tech & enterprise employers", "Audit approfondi des compétences auprès de 25+ entreprises et structures maliennes", "Dɔnniya sɛgɛsɛgɛli baarakɛla 25+ fɛ Mali kɔnɔ"),
          T("Bilingual syllabus (FR/BM) and offline teaching repositories finalized", "Syllabus bilingue (FR/BM) et référentiels d'apprentissage hors-ligne finalisés", "Kalan porogaramu kan fla (FR/BM) n'a kɔnɔkow intɛrinɛti tɛ min na labɛnnen"),
          T("Over 500 candidate applications screened with 50% target female cohort", "Plus de 500 candidatures reçues avec objectif de 50 % de jeunes femmes", "Cɛmancɛ 500+ sɛgɛsɛgɛra ni muso 50% jateye ye")
        ],
        metrics: [
          { v: "25+", l: T("Employer Audits", "Employeurs Audités", "Baarakɛlaw Audités") },
          { v: "4", l: T("Validated Tracks", "Parcours Validés", "Siraw Validés") },
          { v: "50%", l: T("Women Target", "Cible Apprenantes", "Muso Hakɛ") }
        ],
        gate: T(
          "<strong>Gate 1 Quality Review:</strong> Independent pedagogical advisory approval and verified 100% employer match on core competencies before campus mobilization.",
          "<strong>Revue Qualité Jalon 1 :</strong> Validation par le comité pédagogique et adéquation vérifiée à 100 % avec les besoins employeurs avant l'aménagement du campus.",
          "<strong>Sɛgɛsɛgɛli Jalon 1 :</strong> Kalanbalaw kulu ka kɔrɔsi kɛlen kɔnɔna bɛɛ bɛ bɛn baarakɛlaw magow ma 100% campus sɔrɔli ɲɛ."
        )
      },
      {
        index: 1,
        id: "phase-2",
        shortTab: T("Phase 2: Campus", "Phase 2 : Campus", "Kulu 2 : Kalan Yɔrɔ"),
        quarter: T("Q2–Q3 2027", "T2–T3 2027", "T2–T3 2027"),
        tag: T("Q2–Q3 2027 • Infrastructure Milestone", "T2–T3 2027 • Jalon d'Infrastructure", "T2–T3 2027 • Fanga Jalon"),
        timeframe: T("April – August 2027", "Avril – Août 2027", "Awirili – Août 2027"),
        title: T(
          "Phase 2: Campus Setup & Offline Lab",
          "Phase 2 : Aménagement du Campus & Labo Solaire",
          "Kulu 2 : Kalan Yɔrɔ Labɛn & Tile Fanga Labo"
        ),
        subtitle: T(
          "Phase 2 (Apr–Aug 2027): Campus setup, faculty & solar/offline lab",
          "Phase 2 (Avr–Août 2027) : Aménagement du campus, équipe pédagogique & labo solaire/hors-ligne",
          "Kulu 2 (Awirili–Ut 2027) : Kalan yɔrɔ labɛn, kalanbalaw kulu & tile fanga labo"
        ),
        headline: T(
          "Solar Micro-Grid, Offline AI Workstations & Faculty Certification",
          "Micro-Réseau Solaire, Postes IA Hors-Ligne & Formation des Mentors",
          "Tile Fanga Sira, Ɔdinatɛriw Intɛrinɛti Tɛ Min na & Kalanbalaw Kalanli"
        ),
        description: T(
          "Building Bamako's premier resilient AI learning environment. Equipping dedicated classrooms with uninterrupted solar battery banks, local low-latency cache servers for AI datasets and documentation, and onboarding expert mentors from Mali and the diaspora.",
          "Création du premier environnement d'apprentissage IA résilient à Bamako. Équipement des salles avec énergie solaire ininterrompue sur batteries, serveurs locaux haute vitesse pour les données et la documentation hors-ligne, et formation intensive des instructeurs locaux.",
          "Mali kɔnɔ IA kalan yɔrɔ sabatilen fɔlɔ dilanni Bamakɔ. Kalan salasuw labɛnna ni tile fanga batiriw ye minnu tɛ tike, sèrwɛri minnu bɛ baara kɛ intɛrinɛti ntanya kɔnɔ, n'an ka kalanbalaw kulu degebaga cɛw."
        ),
        deliverables: [
          T("100% solar micro-grid installed with zero-downtime battery backup", "Micro-réseau 100 % solaire avec batteries de secours sans coupure", "Tile fanga 100% batiriw labɛnna kuran tike ntanya"),
          T("Local high-speed cache servers storing 500GB+ of open datasets & docs", "Serveurs locaux haute vitesse hébergeant 500 Go+ de données et cours hors-ligne", "Sèrwɛri lakow minnu bɛ baara kɛ ni 500 Go+ dɔnniyaw ye"),
          T("12 faculty instructors & mentors certified on project-based AI pedagogy", "12 formateurs et mentors certifiés sur la pédagogie par projets concrets", "Kalanbalaw 12 degebaga sɛbɛya sɔrɔla porojɛw kan")
        ],
        metrics: [
          { v: "100%", l: T("Solar Autonomy", "Autonomie Solaire", "Tile Fanga Bɛɛ") },
          { v: "88", l: T("Lab Workstations", "Postes Dédiés", "Baara Yɔrɔw") },
          { v: "12", l: T("Certified Mentors", "Mentors Certifiés", "Mentors Sɛbɛyaw") }
        ],
        gate: T(
          "<strong>Gate 2 Infrastructure Review:</strong> Full 72-hour stress test of solar autonomy, offline model inference latency, and campus safety audits before student arrival.",
          "<strong>Revue Jalon 2 Infrastructure :</strong> Test de charge complet de 72h de l'autonomie solaire, de l'inférence locale et audit de sécurité du campus avant l'arrivée des étudiants.",
          "<strong>Sɛgɛsɛgɛli Jalon 2 :</strong> Tile fanga n'infɛransi sɛgɛsɛgɛli kɛra dɔgɔkun 72 kɔnɔ degebagaw nali ɲɛ."
        )
      },
      {
        index: 2,
        id: "phase-3",
        shortTab: T("Phase 3: Pilot", "Phase 3 : Pilote", "Kulu 3 : Kalan Fɔlɔ"),
        quarter: T("Q4 27–Q1 28", "T4 27–T1 28", "T4 27–T1 28"),
        tag: T("Q4 2027 – Q1 2028 • Flagship Cohort", "T4 2027 – T1 2028 • Cohorte Pilote", "T4 2027 – T1 2028 • Kalan Fɔlɔ"),
        timeframe: T("September 2027 – March 2028", "Septembre 2027 – Mars 2028", "Sɛtanburu 2027 – Marsi 2028"),
        title: T(
          "Phase 3: Pilot Cohort",
          "Phase 3 : Cohorte Pilote",
          "Kulu 3 : Kalan Kulu Fɔlɔ"
        ),
        subtitle: T(
          "Sep 2027 – Mar 2028: 88 learners across all 4 tracks in Bamako",
          "Sep 2027 – Mar 2028 : 88 apprenants répartis sur les 4 parcours à Bamako",
          "Sɛtanburu 2027 – Marsi 2028 : 88 degebagaw kalan siraw 4 kan Bamakɔ"
        ),
        headline: T(
          "88 Learners Across 4 Tracks Building Real Malian AI Applications",
          "88 Apprenants sur 4 Parcours Développant des Applications Réelles au Mali",
          "Degebaga 88 Kalan Siraw 4 Kan Ka Baara Kɛ Mali Porojɛ Sɛbɛw Kan"
        ),
        description: T(
          "The inaugural intensive 6-month cohort in Bamako. Learners build hands-on applications in clinic triage, agro-meteorological advisory, Bambara speech datasets, and local business automation, supported by daily mentor code reviews and monthly stipends.",
          "La première promotion intensive de 6 mois à Bamako. 88 apprenants réalisent des projets appliqués : triage clinique, conseil agro-météorologique, corpus vocal bambara et automatisation pour entreprises locales, avec encadrement quotidien et bourses de vie.",
          "Kalan fɔlɔ kalo 6 kɔnɔ Bamakɔ. Degebaga 88 bɛ baara kɛ porojɛ sɛbɛw kan : dɔgɔtɔrɔso triage, sɛnɛ n'sanji lasebaga, bamanankan kuma baarakɛlaw, ni dɛmɛ kalo o kalo."
        ),
        deliverables: [
          T("88 learners completing hands-on tracks with 70% project-based building", "88 apprenants formés à 70 % par des projets pratiques et études de cas", "Degebaga 88 bɛ kalan kɛ 70% porojɛw sɛbɛ kan"),
          T("First release of the Bambara WhatsApp Voice Assistant beta prototype", "Sortie du premier prototype beta de l'Assistant Vocal Bambara sur WhatsApp", "Bamanankan kuma dɛmɛbaga fɔlɔ bɔra WhatsApp kan"),
          T("Four open AI datasets released under attribution licenses for Malian youth", "Publication de 4 jeux de données IA sous licence ouverte avec attribution", "IA dɔnniya kulu 4 labilala bɛɛ ye gansan ni sɛbɛya ye")
        ],
        metrics: [
          { v: "88", l: T("Learners Enrolled", "Apprenants en Formation", "Degebagaw Hakɛ") },
          { v: "50%", l: T("Women Ratio", "Taux de Féminisation", "Musow Hakɛ") },
          { v: "4", l: T("Live Capstones", "Projets Déployés", "Porojɛ Labɛnnenw") }
        ],
        gate: T(
          "<strong>Gate 3 Verified Review:</strong> Rigorous evaluation across 6 indicators (Enrolment, Completion, Gender Parity, Placement, Open Datasets & Applied Studio Projects) before scaling.",
          "<strong>Revue Jalon 3 Vérifiée :</strong> Évaluation indépendante sur les 6 indicateurs clés (Inscription, Complétion, Parité, Insertion, Jeux de données ouverts & Projets réels) avant l'extension.",
          "<strong>Sɛgɛsɛgɛli Jalon 3 :</strong> Bilan vérifié sur 6 indicateurs (kalan don, laban, musow hakɛ, baara sɔrɔ, dɔnniya dayɛlɛlen & porojɛw) plei déploiement ɲɛ."
        )
      },
      {
        index: 3,
        id: "phase-4",
        shortTab: T("Phase 4: Full Scale", "Phase 4 : Déploiement", "Kulu 4 : Baara Bɛɛ"),
        quarter: T("Q2–Q4 2028", "T2–T4 2028", "T2–T4 2028"),
        tag: T("Q2–Q4 2028 • Sustainable Scale", "T2–T4 2028 • Déploiement Pérenne", "T2–T4 2028 • Sabatili Jalon"),
        timeframe: T("April – December 2028", "Avril – Décembre 2028", "Awirili – Desanburu 2028"),
        title: T(
          "Phase 4: Full Launch & Scale",
          "Phase 4 : Plein Déploiement",
          "Kulu 4 : Baara Dayɛlɛlen"
        ),
        subtitle: T(
          "Apr–Dec 2028 • 300 learners/yr, growing each year",
          "Avr–Déc 2028 • 300 apprenants/an, en expansion continue",
          "Awirili–Desanburu 2028 • 300 degebagaw/san, yirawali kɛra"
        ),
        headline: T(
          "Annual Capacity of 300 Learners and Regional AI Innovation Hub",
          "Capacité Annuelle de 300 Apprenants et Pôle Régional d'Innovation IA",
          "San o San Degebaga 300 Kalanbaara n'IA Yirawali Yɔrɔ"
        ),
        description: T(
          "Scaling to continuous rolling cohorts with 300 certified graduates per year. Deepening remote global job placement on networks like Mercor, expanding the open Bambara NLP Lab, and commercializing AI studio services for sustainable institute self-financing.",
          "Passage à un rythme de croisière continu formant 300 diplômés par an. Accélération de l'insertion internationale en télétravail (ex. Mercor), expansion du Bambara NLP Lab et montée en puissance du studio IA pour l'autofinancement de l'institut.",
          "Degebaga 300 san o san diplôme sɔrɔbaga. Baara sɔrɔli dugu kɔnɔ n'intɛrinasyɔnali (i n'a fɔ Mercor), Bamanankan NLP Lab yirawali, n'an ka IA Studio baara k'an yɛrɛ labara."
        ),
        deliverables: [
          T("300 graduates trained annually across digital foundations, ML, and NLP", "300 diplômés formés par an sur les compétences numériques, ML et NLP", "Diplômé 300 kalanbaara san o san numérique, ML n'NLP kan"),
          T("Over 80% placement rate into paid local or remote technical roles", "Taux d'insertion supérieur à 80 % dans des emplois techniques rémunérés", "80%+ baara sɔrɔbaga dugu kɔnɔ walima jamana kɔkan"),
          T("Self-sustaining revenue from AI Studio services and enterprise contracts", "Autonomie financière renforcée grâce aux prestations du Studio d'IA", "Fanga n'wari sabatili AI Studio baarakɛlaw fɛ")
        ],
        metrics: [
          { v: "300/yr", l: T("Graduates / Year", "Diplômés / An", "Diplôméw / San") },
          { v: "85%", l: T("Placement Target", "Insertion Visée", "Baara Sɔrɔli") },
          { v: "10+", l: T("Open AI Releases", "Modèles & Datasets", "Modɛliw & Datasets") }
        ],
        gate: T(
          "<strong>Gate 4 Institutional Sustainability:</strong> Annual financial audit, partner accountability publication, and expansion roadmap for regional secondary hubs.",
          "<strong>Revue Jalon 4 Pérennité :</strong> Audit financier annuel, publication du rapport d'impact public et schéma d'expansion vers les antennes régionales.",
          "<strong>Sɛgɛsɛgɛli Jalon 4 :</strong> Wari sɛgɛsɛgɛli kɛra san o san, kunnafoni lankolon bɔra jamana ye, n'an ka siraw yirawali mara wɛrɛw la."
        )
      }
    ]
  };

  /* ------------------------------------------------------------------ *
   * Helpers
   * ------------------------------------------------------------------ */
  let currentLang = "en";

  /** Resolve a { en, fr } pair (or plain string) for the active language; Bambara falls back to English. */
  const tx = (v) => {
    if (!v) return v;
    if (typeof v === "string") {
      if (currentLang === "bm" && window.baaraDictBm && window.baaraDictBm[v]) return window.baaraDictBm[v];
      if (currentLang === "fr" && window.baaraDictFr && window.baaraDictFr[v]) return window.baaraDictFr[v];
      return v;
    }
    if (typeof v === "object") {
      if (v[currentLang]) return v[currentLang];
      if (currentLang === "bm") {
        if (window.baaraDictBm && window.baaraDictBm[v.en]) return window.baaraDictBm[v.en];
        return v.fr || v.en;
      }
      if (currentLang === "fr") {
        if (v.fr) return v.fr;
        if (window.baaraDictFr && window.baaraDictFr[v.en]) return window.baaraDictFr[v.en];
        return v.en;
      }
      return v.en || v.fr || "";
    }
    return v;
  };

  const detectLang = () => {
    const attr = document.documentElement.lang;
    if (SUPPORTED.includes(attr) && attr !== "en") return attr;
    if (typeof window.baaraDetectInitialLang === "function") return window.baaraDetectInitialLang();
    return SUPPORTED.includes(attr) ? attr : "en";
  };

  /** Fire `cb` once `el` is at least ~15% visible; calls immediately if IntersectionObserver is missing. */
  function whenVisible(el, cb, threshold = 0.15) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) return cb();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          cb();
        }
      },
      { threshold }
    );
    io.observe(el);
  }

  /** Animate the leading integer of strings such as "88", "300/yr", "47,000", "$1,500". */
  function countUp(el) {
    const raw = el.getAttribute("data-final");
    // Digits with optional thousands separators: "47,000" (EN) or "1 500" (FR, incl. nbsp / narrow nbsp)
    const m = raw && raw.match(/^(\D*?)(\d+(?:[,\u00a0\u202f ]\d{3})*)(.*)$/);
    if (!m || REDUCED_MOTION) {
      el.textContent = raw;
      return;
    }
    const prefix = m[1];
    const digits = m[2];
    const suffix = m[3];
    const target = parseInt(digits.replace(/\D/g, ""), 10);
    const sepMatch = digits.match(/[,\u00a0\u202f ]/);
    const sep = sepMatch ? sepMatch[0] : "";
    const fmt = (n) => (sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n));
    const dur = 900;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------ *
   * #careers
   * ------------------------------------------------------------------ */
  const careersRoot = document.getElementById("careersMount");
  let careersFilter = "all";
  const careersRevealed = new Set(); // indexes of role cards already scrolled into view (kept across language re-renders)

  function renderCareers() {
    if (!careersRoot) return;
    const c = CAREERS;
    const total = c.roles.length;

    const filters = c.filters
      .map(
        (f) =>
          `<button type="button" class="baara-filter-btn" data-filter="${f.key}" aria-pressed="${f.key === careersFilter}">${tx(f.label)}</button>`
      )
      .join("");

    const cards = c.roles
      .map((r, i) => {
        const left = (r.pay[0] / c.payScaleMax) * 100;
        const width = ((r.pay[1] - r.pay[0]) / c.payScaleMax) * 100;
        const skills = r.skills.map((s) => `<li>${tx(s)}</li>`).join("");
        return `
          <div class="col-xl-3 col-md-6">
            <article class="baara-role-card accent-${r.accent}${careersRevealed.has(i) ? " is-in" : ""}" data-track="${r.track}" data-idx="${i}" style="--i:${i}">
              <div class="baara-role-top">
                <span class="baara-role-badge">${tx(r.badge)}</span>
                <span class="baara-role-pay">$${r.pay[0]}–$${r.pay[1]}<small>${tx(c.perHour)}</small></span>
              </div>
              <div class="baara-role-range" aria-hidden="true"><span style="--l:${left.toFixed(1)}%;--w:${width.toFixed(1)}%"></span></div>
              <h4>${tx(r.title)}</h4>
              <p>${tx(r.desc)}</p>
              <div class="baara-role-skills">
                <span class="baara-role-skills-label">${tx(c.keySkills)}</span>
                <ul>${skills}</ul>
              </div>
            </article>
          </div>`;
      })
      .join("");

    const m = c.mercor;
    careersRoot.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-xl-9 col-lg-10">
          <div class="section-title text-center mb-40">
            <span class="sub-title">${tx(c.sub)}</span>
            <h2 class="text-anm" id="careers-heading">${tx(c.title)}</h2>
            <p class="baara-section-lead">${tx(c.desc)}</p>
          </div>
        </div>
      </div>
      <div class="baara-filter-bar">
        <div class="baara-filter-group" role="group" aria-label="${tx(c.filterLabel)}">${filters}</div>
        <span class="baara-filter-count" id="careersCount" role="status" aria-live="polite"></span>
      </div>
      <div class="row g-4 baara-role-grid" id="careersGrid">${cards}</div>
      <div class="baara-mercor-card">
        <div class="baara-mercor-copy">
          <span class="baara-mercor-chip">${tx(m.chip)}</span>
          <h3>${tx(m.title)}</h3>
          <p>${tx(m.desc)}</p>
        </div>
        <a class="theme-btn gradient-btn baara-mercor-cta" href="${m.href}" target="_blank" rel="noopener noreferrer">
          ${tx(m.cta)} <i class="bi bi-arrow-up-right"></i>
        </a>
      </div>`;

    applyCareersFilter();
    revealCareersOnScroll();
  }

  function applyCareersFilter() {
    if (!careersRoot) return;
    const cards = careersRoot.querySelectorAll(".baara-role-card");
    let shown = 0;
    cards.forEach((card) => {
      const match = careersFilter === "all" || card.dataset.track === careersFilter;
      card.classList.toggle("is-dim", !match);
      card.setAttribute("aria-hidden", String(!match));
      if (match) shown += 1;
    });
    careersRoot.querySelectorAll(".baara-filter-btn").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.filter === careersFilter));
    });
    const counter = careersRoot.querySelector("#careersCount");
    if (counter) counter.textContent = CAREERS.count(shown, cards.length, currentLang);
  }

  /** Reveal each card as it scrolls into view (per card, so tall single-column mobile layouts still work). */
  function revealCareersOnScroll() {
    const pending = Array.from(careersRoot.querySelectorAll(".baara-role-card:not(.is-in)"));
    const show = (card) => {
      careersRevealed.add(Number(card.dataset.idx));
      card.classList.add("is-in");
    };
    if (!("IntersectionObserver" in window)) return pending.forEach(show);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          show(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    pending.forEach((card) => io.observe(card));
  }

  if (careersRoot) {
    careersRoot.addEventListener("click", (e) => {
      const btn = e.target.closest(".baara-filter-btn");
      if (!btn) return;
      careersFilter = btn.dataset.filter;
      applyCareersFilter();
    });
    // Pointer-follow spotlight on role cards (pure CSS custom properties; no layout cost)
    careersRoot.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".baara-role-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  /* ------------------------------------------------------------------ *
   * #pitch deck
   * ------------------------------------------------------------------ */
  const deckRoot = document.getElementById("pitchMount");
  const AUTOPLAY_MS = 9000;
  const deck = {
    index: 0,
    visible: false, // section scrolled into view at least once → bars/counters may animate
    inView: false, // currently on screen
    autoplay: !REDUCED_MOTION, // false once the user pauses or interacts
    hovered: false,
    elapsed: 0,
    raf: 0,
    last: 0
  };

  function renderDeck() {
    if (!deckRoot) return;
    const d = DECK;

    const tabs = d.panels
      .map(
        (p, i) =>
          `<button class="baara-deck-tab" role="tab" id="pitch-tab-${i}" aria-selected="${i === deck.index}" aria-controls="pitch-panel-${i}" tabindex="${i === deck.index ? 0 : -1}" data-pitch-tab="${i}" type="button">${tx(p.tab)}</button>`
      )
      .join("");

    const panels = d.panels
      .map((p, i) => {
        const bullets = p.bullets.map((b) => `<li><i class="bi bi-check-lg" aria-hidden="true"></i><span>${tx(b)}</span></li>`).join("");
        const bars = p.bars
          .map(
            (b) => `
              <div class="baara-bar-row">
                <div class="baara-bar-label"><span>${tx(b.label)}</span><b>${tx(b.value)}</b></div>
                <div class="baara-bar-track"><div class="baara-bar-fill" style="--w:${b.pct}%"></div></div>
              </div>`
          )
          .join("");
        const metrics = p.metrics
          .map((m) => `<div class="baara-metric-box"><strong data-final="${tx(m.v)}">${tx(m.v)}</strong><span>${tx(m.l)}</span></div>`)
          .join("");
        const active = i === deck.index;
        return `
          <div class="baara-deck-panel${active ? " is-active" : ""}" id="pitch-panel-${i}" role="tabpanel" aria-labelledby="pitch-tab-${i}" data-pitch-panel="${i}"${active ? "" : " hidden"}>
            <div class="baara-deck-panel-grid">
              <article class="baara-panel-story">
                <p class="panel-tag">${tx(p.tag)}</p>
                <h3>${tx(p.title)}</h3>
                <p class="panel-text">${tx(p.text)}</p>
                <ul class="baara-deliverables">${bullets}</ul>
              </article>
              <div class="baara-panel-data">
                <div class="baara-data-head">
                  <div><h4>${tx(p.dataTitle)}</h4><p>${tx(p.dataSub)}</p></div>
                  <span class="baara-data-chip">${tx(p.chip)}</span>
                </div>
                ${bars}
                <div class="baara-metrics-row">${metrics}</div>
              </div>
            </div>
          </div>`;
      })
      .join("");

    deckRoot.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-xl-9 col-lg-10">
          <div class="section-title text-center mb-50">
            <span class="sub-title">${tx(d.sub)}</span>
            <h2 class="text-anm" id="pitch-heading">${tx(d.title)}</h2>
            <p class="baara-section-lead">${tx(d.desc)}</p>
          </div>
        </div>
      </div>
      <div class="baara-deck-shell${deck.visible ? " is-visible" : ""}" id="pitchShell">
        <div class="baara-deck-topbar">
          <div class="baara-deck-tablist" role="tablist" aria-label="${tx(d.tablistLabel)}">${tabs}</div>
          <div class="baara-deck-controls">
            <span id="pitchDeckCounter" class="baara-deck-counter"></span>
            <button type="button" class="baara-deck-navbtn" id="pitchPrevBtn" aria-label="${tx(d.prev)}"><i class="bi bi-arrow-left"></i></button>
            <button type="button" class="baara-deck-navbtn" id="pitchNextBtn" aria-label="${tx(d.next)}"><i class="bi bi-arrow-right"></i></button>
            <button type="button" class="baara-deck-navbtn" id="pitchPlayBtn"></button>
          </div>
        </div>
        <div class="baara-deck-progress" aria-hidden="true"><span id="pitchProgress"></span></div>
        <div id="pitchDeckPanels">${panels}</div>
      </div>`;

    syncDeckChrome();
    if (deck.visible) runPanelCounters();
    observeDeck();
  }

  /** Update counter text, play/pause button and progress bar without re-rendering. */
  function syncDeckChrome() {
    if (!deckRoot) return;
    const total = DECK.panels.length;
    const counter = deckRoot.querySelector("#pitchDeckCounter");
    if (counter) counter.textContent = `0${deck.index + 1} / 0${total}`;

    const playBtn = deckRoot.querySelector("#pitchPlayBtn");
    if (playBtn) {
      const label = tx(deck.autoplay ? DECK.pause : DECK.play);
      playBtn.setAttribute("aria-label", label);
      playBtn.setAttribute("title", label);
      playBtn.innerHTML = `<i class="bi ${deck.autoplay ? "bi-pause-fill" : "bi-play-fill"}"></i>`;
      playBtn.hidden = REDUCED_MOTION;
    }
    const shell = deckRoot.querySelector("#pitchShell");
    if (shell) shell.classList.toggle("is-autoplay", deck.autoplay);
    setProgress();
  }

  function setProgress() {
    const bar = deckRoot && deckRoot.querySelector("#pitchProgress");
    if (bar) bar.style.transform = `scaleX(${deck.autoplay ? Math.min(1, deck.elapsed / AUTOPLAY_MS) : 0})`;
  }

  function runPanelCounters() {
    const panel = deckRoot.querySelector(".baara-deck-panel.is-active");
    if (panel) panel.querySelectorAll("[data-final]").forEach(countUp);
  }

  function selectPanel(index, { moveFocus = false, manual = false } = {}) {
    const tabs = Array.from(deckRoot.querySelectorAll("[data-pitch-tab]"));
    const panels = Array.from(deckRoot.querySelectorAll("[data-pitch-panel]"));
    if (!tabs.length) return;

    deck.index = (index + tabs.length) % tabs.length;
    deck.elapsed = 0;
    if (manual) deck.autoplay = false;

    tabs.forEach((tab, i) => {
      const selected = i === deck.index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        if (moveFocus) tab.focus();
        // Keep the selected tab visible in the horizontally scrollable tab strip (mobile)
        const list = tab.parentElement;
        if (list && list.scrollWidth > list.clientWidth) {
          list.scrollTo({ left: tab.offsetLeft - 16, behavior: REDUCED_MOTION ? "auto" : "smooth" });
        }
      }
    });

    panels.forEach((panel) => {
      panel.classList.remove("is-active");
      panel.hidden = true;
    });
    const next = panels[deck.index];
    next.hidden = false;
    void next.offsetWidth; // flush styles so bar-fill / entrance transitions replay from zero
    next.classList.add("is-active");

    syncDeckChrome();
    if (deck.visible) runPanelCounters();
  }

  function observeDeck() {
    const shell = deckRoot.querySelector("#pitchShell");
    if (!shell || !("IntersectionObserver" in window)) {
      deck.visible = true;
      deck.inView = true;
      if (shell) shell.classList.add("is-visible");
      runPanelCounters();
      return;
    }
    if (deck.io) deck.io.disconnect();
    deck.io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        deck.inView = e.isIntersecting;
        if (e.isIntersecting && !deck.visible) {
          deck.visible = true;
          shell.classList.add("is-visible");
          runPanelCounters();
        }
        if (e.isIntersecting) startLoop();
      },
      { threshold: 0.35 }
    );
    deck.io.observe(shell);
  }

  /** Auto-advance loop; only ticks while the deck is on screen, un-hovered, un-focused and the tab is visible. */
  function startLoop() {
    if (deck.raf || REDUCED_MOTION) return;
    deck.last = performance.now();
    const tick = (now) => {
      const dt = Math.min(100, now - deck.last);
      deck.last = now;
      const focusInside = deckRoot.contains(document.activeElement) && document.activeElement.matches(".baara-deck-tab, .baara-deck-navbtn");
      if (deck.autoplay && deck.inView && !deck.hovered && !focusInside && !document.hidden) {
        deck.elapsed += dt;
        if (deck.elapsed >= AUTOPLAY_MS) selectPanel(deck.index + 1);
        else setProgress();
      }
      if (deck.inView) deck.raf = requestAnimationFrame(tick);
      else deck.raf = 0;
    };
    deck.raf = requestAnimationFrame(tick);
  }

  if (deckRoot) {
    deckRoot.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-pitch-tab]");
      if (tab) return selectPanel(Number(tab.dataset.pitchTab), { manual: true });
      if (e.target.closest("#pitchPrevBtn")) return selectPanel(deck.index - 1, { manual: true });
      if (e.target.closest("#pitchNextBtn")) return selectPanel(deck.index + 1, { manual: true });
      if (e.target.closest("#pitchPlayBtn")) {
        deck.autoplay = !deck.autoplay;
        deck.elapsed = 0;
        syncDeckChrome();
        if (deck.autoplay) startLoop();
      }
    });
    deckRoot.addEventListener("keydown", (e) => {
      const tab = e.target.closest("[data-pitch-tab]");
      if (!tab || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const last = DECK.panels.length - 1;
      const next = e.key === "Home" ? 0 : e.key === "End" ? last : deck.index + (e.key === "ArrowRight" ? 1 : -1);
      selectPanel(next, { moveFocus: true, manual: true });
    });
    deckRoot.addEventListener("pointerenter", () => (deck.hovered = true));
    deckRoot.addEventListener("pointerleave", () => (deck.hovered = false));
  }

  /* ------------------------------------------------------------------ *
   * #process (Interactive 2027–2028 Cohort Roadmap)
   * ------------------------------------------------------------------ */
  const processRoot = document.getElementById("processMount");

  const roadmapState = {
    index: 0,
    autoplay: false,
    elapsed: 0,
    last: 0,
    raf: 0,
    inView: false,
    hovered: false,
    io: null
  };

  const ROADMAP_AUTOPLAY_MS = 6500;

  function playMilestoneChime(phaseIndex) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window._baaraAudioCtx) {
        window._baaraAudioCtx = new AudioCtx();
      }
      const ctx = window._baaraAudioCtx;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqs = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
      const f = freqs[phaseIndex % freqs.length] || 523.25;

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 1.5, now + 0.16);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.43);
    } catch (_) {}
  }

  function updateRobotHandReaction(phaseIndex) {
    const hand = document.getElementById("processRobotHand");
    if (!hand) return;
    const rotations = [0, -2.5, 2, -4];
    const glows = [
      "drop-shadow(0 0 15px rgba(0, 212, 232, 0.4))",
      "drop-shadow(0 0 18px rgba(30, 91, 224, 0.45))",
      "drop-shadow(0 0 22px rgba(232, 24, 106, 0.5))",
      "drop-shadow(0 0 25px rgba(106, 44, 224, 0.55))"
    ];
    hand.style.transform = `translateY(${phaseIndex * -4}px) rotate(${rotations[phaseIndex % 4]}deg)`;
    hand.style.filter = glows[phaseIndex % 4];
  }

  function selectPhase(idx, opts = {}) {
    if (!processRoot) return;
    const len = ROADMAP.phases.length;
    const next = ((idx % len) + len) % len;
    roadmapState.index = next;
    roadmapState.elapsed = 0;

    if (opts.manual) {
      roadmapState.autoplay = false;
      playMilestoneChime(next);
    }

    updateRobotHandReaction(next);
    syncRoadmapUI(opts.gateHighlight);
  }

  function syncRoadmapUI(highlightGate = false) {
    if (!processRoot) return;
    const curIdx = roadmapState.index;
    const phase = ROADMAP.phases[curIdx];

    // 1. Sync Stepper Pills
    processRoot.querySelectorAll(".baara-step-pill").forEach((pill) => {
      const pIdx = Number(pill.dataset.phaseIndex);
      const active = pIdx === curIdx;
      pill.classList.toggle("is-active", active);
      pill.setAttribute("aria-selected", String(active));
    });

    // 2. Sync Counter
    const counter = processRoot.querySelector("#roadmapCounter");
    if (counter) {
      counter.textContent = `0${curIdx + 1} / 0${ROADMAP.phases.length}`;
    }

    // 3. Sync Play/Pause button
    const playBtn = processRoot.querySelector("#roadmapPlayBtn");
    if (playBtn) {
      playBtn.setAttribute("aria-label", roadmapState.autoplay ? tx(ROADMAP.controls.pause) : tx(ROADMAP.controls.play));
      playBtn.innerHTML = `<i class="bi ${roadmapState.autoplay ? "bi-pause-fill" : "bi-play-fill"}"></i>`;
    }

    // 4. Sync Interactive Nodes in Diagram
    processRoot.querySelectorAll(".baara-interactive-node").forEach((node) => {
      const nIdx = Number(node.dataset.phaseIndex);
      const isGate = node.dataset.gateTarget === "true";
      let active = false;

      if (isGate) {
        active = (curIdx === 2 && highlightGate);
      } else {
        active = (nIdx === curIdx);
      }

      node.classList.toggle("is-active", active);

      // Manage active beacon
      const existingBeacon = node.querySelector(".baara-node-beacon");
      if (active && !isGate) {
        if (!existingBeacon) {
          const beacon = document.createElement("span");
          beacon.className = "baara-node-beacon";
          beacon.innerHTML = `<i class="bi bi-circle-fill" style="font-size:6px;"></i> ${tx(ROADMAP.activeBadge)}`;
          node.prepend(beacon);
        }
      } else if (existingBeacon) {
        existingBeacon.remove();
      }
    });

    // 5. Update Drawer Content
    const drawer = processRoot.querySelector("#roadmapDrawer");
    if (drawer) {
      const tagEl = drawer.querySelector(".baara-drawer-quarter-badge");
      if (tagEl) tagEl.textContent = tx(phase.tag);

      const timeEl = drawer.querySelector(".baara-drawer-timeframe");
      if (timeEl) timeEl.innerHTML = `<i class="bi bi-calendar3"></i> ${tx(phase.timeframe)}`;

      const titleEl = drawer.querySelector(".baara-drawer-title");
      if (titleEl) titleEl.textContent = tx(phase.headline);

      const descEl = drawer.querySelector(".baara-drawer-desc");
      if (descEl) descEl.textContent = tx(phase.description);

      const delivEl = drawer.querySelector(".baara-drawer-deliverables");
      if (delivEl) {
        delivEl.innerHTML = phase.deliverables
          .map((d) => `<li><i class="bi bi-check-circle-fill"></i><span>${tx(d)}</span></li>`)
          .join("");
      }

      const statsEl = drawer.querySelector(".baara-drawer-stats-grid");
      if (statsEl) {
        statsEl.innerHTML = phase.metrics
          .map(
            (m) => `
            <div class="baara-drawer-stat-card">
              <strong data-final="${tx(m.v)}">${tx(m.v)}</strong>
              <span>${tx(m.l)}</span>
            </div>
          `
          )
          .join("");
        statsEl.querySelectorAll(".baara-drawer-stat-card strong").forEach(countUp);
      }

      const gateBox = drawer.querySelector(".baara-drawer-gate-box");
      if (gateBox) {
        gateBox.innerHTML = `<p><i class="bi bi-shield-check" style="color:#00D4E8;margin-right:6px;"></i> ${tx(phase.gate)}</p>`;
        if (highlightGate) {
          gateBox.classList.remove("is-highlighted");
          void gateBox.offsetWidth; // re-trigger animation
          gateBox.classList.add("is-highlighted");
        } else {
          gateBox.classList.remove("is-highlighted");
        }
      }
    }
  }

  function renderRoadmap() {
    if (!processRoot) return;

    // Pills
    const pills = ROADMAP.phases
      .map(
        (p, i) => `
        <button
          type="button"
          class="baara-step-pill${i === roadmapState.index ? " is-active" : ""}"
          role="tab"
          id="roadmap-pill-${i}"
          aria-selected="${i === roadmapState.index}"
          data-phase-index="${i}"
        >
          <span class="baara-step-pill-num">0${i + 1}</span>
          <span>${tx(p.shortTab)}</span>
          <small style="opacity:0.75;font-weight:normal;font-size:12px;">(${tx(p.quarter)})</small>
        </button>
      `
      )
      .join("");

    const curPhase = ROADMAP.phases[roadmapState.index];

    processRoot.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="section-title text-center mb-45">
            <span class="sub-title" data-aos="fade-down" data-aos-duration="1000">${tx(ROADMAP.sub)}</span>
            <h2 class="text-anm" id="process-heading">${tx(ROADMAP.title)}</h2>
            <p data-aos="fade-up" data-aos-duration="1200">${tx(ROADMAP.desc)}</p>
          </div>
        </div>
      </div>

      <!-- Interactive Stepper Bar -->
      <div class="baara-roadmap-stepper" role="tablist" aria-label="Roadmap phase navigation">
        <div class="baara-stepper-pills">
          ${pills}
        </div>
        <div class="baara-stepper-controls">
          <button type="button" class="baara-roadmap-navbtn" id="roadmapPrevBtn" aria-label="${tx(ROADMAP.controls.prev)}">
            <i class="bi bi-chevron-left"></i>
          </button>
          <span class="baara-roadmap-counter" id="roadmapCounter">0${roadmapState.index + 1} / 0${ROADMAP.phases.length}</span>
          <button type="button" class="baara-roadmap-navbtn" id="roadmapNextBtn" aria-label="${tx(ROADMAP.controls.next)}">
            <i class="bi bi-chevron-right"></i>
          </button>
          <button type="button" class="baara-roadmap-navbtn" id="roadmapPlayBtn" aria-label="${roadmapState.autoplay ? tx(ROADMAP.controls.pause) : tx(ROADMAP.controls.play)}">
            <i class="bi ${roadmapState.autoplay ? "bi-pause-fill" : "bi-play-fill"}"></i>
          </button>
        </div>
      </div>

      <!-- Visual Diagram matching original screenshot -->
      <div class="row">
        <div class="col-lg-12">
          <div class="process-wrapper">
            <!-- Phase 1 -->
            <div class="baara-process-box baara-interactive-node${roadmapState.index === 0 ? " is-active" : ""}" data-phase-index="0" role="button" tabindex="0" aria-label="${tx(ROADMAP.phases[0].title)}">
              ${roadmapState.index === 0 ? `<span class="baara-node-beacon"><i class="bi bi-circle-fill" style="font-size:6px;"></i> ${tx(ROADMAP.activeBadge)}</span>` : ""}
              <div class="content">
                <img alt="Phase 1 shape" src="/assets/images/home-one/gallery/process-sh1.png" loading="lazy" />
                <h4 class="title">${tx(ROADMAP.phases[0].title)}<br /><small style="font-size:13px;opacity:0.85;">${tx(ROADMAP.phases[0].subtitle)}</small></h4>
              </div>
            </div>

            <!-- Arrow 1 (Phase 2) -->
            <div class="baara-proces-arrow-box baara-interactive-node${roadmapState.index === 1 ? " is-active" : ""}" data-phase-index="1" role="button" tabindex="0" aria-label="${tx(ROADMAP.phases[1].title)}">
              ${roadmapState.index === 1 ? `<span class="baara-node-beacon"><i class="bi bi-circle-fill" style="font-size:6px;"></i> ${tx(ROADMAP.activeBadge)}</span>` : ""}
              <div class="content">
                <img alt="Phase transition arrow" src="/assets/images/home-one/gallery/process-arrow.png" loading="lazy" />
                <p>${tx(ROADMAP.phases[1].subtitle)}</p>
              </div>
            </div>

            <!-- Phase 3 Dashed Wrap -->
            <div class="baara-process-box-wrap baara-interactive-node${roadmapState.index === 2 ? " is-active" : ""}" data-phase-index="2" role="button" tabindex="0" aria-label="${tx(ROADMAP.phases[2].title)}">
              ${roadmapState.index === 2 ? `<span class="baara-node-beacon"><i class="bi bi-circle-fill" style="font-size:6px;"></i> ${tx(ROADMAP.activeBadge)}</span>` : ""}
              <div class="baara-process-circle-box bg_one">
                <div class="content">
                  <img alt="Phase 3 Pilot shape" src="/assets/images/home-one/gallery/process-sh2.png" loading="lazy" />
                  <h4 class="title">${currentLang === "fr" ? "Phase 3 : <br /> Cohorte Pilote" : currentLang === "bm" ? "Kulu 3 : <br /> Kalan Fɔlɔ" : "Phase 3: <br /> Pilot Cohort"}</h4>
                </div>
              </div>
              <div class="baara-process-circle-box bg_two">
                <div class="content">
                  <p>${tx(ROADMAP.phases[2].subtitle)}</p>
                </div>
              </div>
            </div>

            <!-- Arrow 2 (Transition 6-Indicator Review) -->
            <div class="baara-proces-arrow-box baara-interactive-node" data-phase-index="2" data-gate-target="true" role="button" tabindex="0" aria-label="${tx(ROADMAP.transitionReview)}">
              <div class="content">
                <img alt="Phase transition arrow" src="/assets/images/home-one/gallery/process-arrow.png" loading="lazy" />
                <p>${tx(ROADMAP.transitionReview)}</p>
              </div>
            </div>

            <!-- Phase 4 -->
            <div class="baara-process-box baara-interactive-node${roadmapState.index === 3 ? " is-active" : ""}" data-phase-index="3" role="button" tabindex="0" aria-label="${tx(ROADMAP.phases[3].title)}">
              ${roadmapState.index === 3 ? `<span class="baara-node-beacon"><i class="bi bi-circle-fill" style="font-size:6px;"></i> ${tx(ROADMAP.activeBadge)}</span>` : ""}
              <div class="content">
                <img alt="Phase 4 Full Launch shape" src="/assets/images/home-one/gallery/process-sh3.png" loading="lazy" />
                <h4 class="title">${tx(ROADMAP.phases[3].title)}<br /><small style="font-size:13px;opacity:0.85;">${tx(ROADMAP.phases[3].subtitle)}</small></h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Deep-Dive Detail Drawer -->
      <div class="baara-roadmap-drawer" id="roadmapDrawer" role="region" aria-live="polite">
        <div class="baara-drawer-grid">
          <div class="baara-drawer-left">
            <div class="baara-drawer-tag-row">
              <span class="baara-drawer-quarter-badge">${tx(curPhase.tag)}</span>
              <span class="baara-drawer-timeframe"><i class="bi bi-calendar3"></i> ${tx(curPhase.timeframe)}</span>
            </div>
            <h3 class="baara-drawer-title">${tx(curPhase.headline)}</h3>
            <p class="baara-drawer-desc">${tx(curPhase.description)}</p>
            <ul class="baara-drawer-deliverables">
              ${curPhase.deliverables.map((d) => `<li><i class="bi bi-check-circle-fill"></i><span>${tx(d)}</span></li>`).join("")}
            </ul>
          </div>
          <div class="baara-drawer-right">
            <div class="baara-drawer-stats-grid">
              ${curPhase.metrics
                .map(
                  (m) => `
                <div class="baara-drawer-stat-card">
                  <strong data-final="${tx(m.v)}">${tx(m.v)}</strong>
                  <span>${tx(m.l)}</span>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="baara-drawer-gate-box">
              <p><i class="bi bi-shield-check" style="color:#00D4E8;margin-right:6px;"></i> ${tx(curPhase.gate)}</p>
            </div>
            <div class="baara-drawer-cta-wrap">
              <a class="theme-btn gradient-btn" href="#contact">
                <span>${tx(ROADMAP.ctaLabel)}</span>
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    setupRoadmapObserver();
  }

  function startRoadmapLoop() {
    if (roadmapState.raf || REDUCED_MOTION) return;
    roadmapState.last = performance.now();
    const tick = (now) => {
      const dt = Math.min(100, now - roadmapState.last);
      roadmapState.last = now;
      const focusInside = processRoot && processRoot.contains(document.activeElement) && document.activeElement.matches(".baara-step-pill, .baara-interactive-node, .baara-roadmap-navbtn");
      if (roadmapState.autoplay && roadmapState.inView && !roadmapState.hovered && !focusInside && !document.hidden) {
        roadmapState.elapsed += dt;
        if (roadmapState.elapsed >= ROADMAP_AUTOPLAY_MS) {
          selectPhase(roadmapState.index + 1);
        }
      }
      if (roadmapState.inView && roadmapState.autoplay) {
        roadmapState.raf = requestAnimationFrame(tick);
      } else {
        roadmapState.raf = 0;
      }
    };
    roadmapState.raf = requestAnimationFrame(tick);
  }

  function setupRoadmapObserver() {
    if (!processRoot || !("IntersectionObserver" in window)) return;
    if (roadmapState.io) roadmapState.io.disconnect();
    roadmapState.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          roadmapState.inView = e.isIntersecting;
          if (e.isIntersecting && roadmapState.autoplay) {
            startRoadmapLoop();
          }
        });
      },
      { threshold: 0.25 }
    );
    roadmapState.io.observe(processRoot);
  }

  function attachRoadmapEvents() {
    if (!processRoot) return;

    processRoot.addEventListener("click", (e) => {
      // Stepper pill click
      const pill = e.target.closest(".baara-step-pill");
      if (pill) {
        return selectPhase(Number(pill.dataset.phaseIndex), { manual: true });
      }

      // Diagram node click
      const node = e.target.closest(".baara-interactive-node");
      if (node) {
        const isGate = node.dataset.gateTarget === "true";
        const idx = Number(node.dataset.phaseIndex);
        return selectPhase(idx, { manual: true, gateHighlight: isGate });
      }

      // Prev / Next / Play buttons
      if (e.target.closest("#roadmapPrevBtn")) {
        return selectPhase(roadmapState.index - 1, { manual: true });
      }
      if (e.target.closest("#roadmapNextBtn")) {
        return selectPhase(roadmapState.index + 1, { manual: true });
      }
      if (e.target.closest("#roadmapPlayBtn")) {
        roadmapState.autoplay = !roadmapState.autoplay;
        roadmapState.elapsed = 0;
        syncRoadmapUI();
        if (roadmapState.autoplay) startRoadmapLoop();
      }
    });

    processRoot.addEventListener("keydown", (e) => {
      const target = e.target.closest(".baara-step-pill, .baara-interactive-node");
      if (!target || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const last = ROADMAP.phases.length - 1;
      const next = e.key === "Home" ? 0 : e.key === "End" ? last : roadmapState.index + (e.key === "ArrowRight" ? 1 : -1);
      selectPhase(next, { manual: true });
      const nextPill = processRoot.querySelector(`.baara-step-pill[data-phase-index="${next}"]`);
      if (nextPill) nextPill.focus();
    });

    processRoot.addEventListener("pointerenter", () => (roadmapState.hovered = true));
    processRoot.addEventListener("pointerleave", () => (roadmapState.hovered = false));
  }

  if (processRoot) {
    attachRoadmapEvents();
  }

  /* ------------------------------------------------------------------ *
   * Boot + language sync
   * ------------------------------------------------------------------ */
  function renderAll() {
    currentLang = detectLang();
    renderCareers();
    renderDeck();
    renderRoadmap();
  }

  function boot() {
    renderAll();
    // i18n.js flips <html lang> inside applyLanguage(); re-render once its DOM pass has finished.
    new MutationObserver(() => {
      const next = detectLang();
      if (next !== currentLang) {
        currentLang = next;
        renderCareers();
        renderDeck();
        renderRoadmap();
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
