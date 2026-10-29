/**
 * baara.ai — Comprehensive Trilingual (French / English / Bambara) Translation Engine
 * Automatically detects French-speaking regions & provides 100% full-page translation
 * Supports instant, lossless switching between EN, FR, and BM.
 */

(function initBaaraI18n() {
  const FRENCH_COUNTRIES = [
    'ML', 'FR', 'SN', 'CI', 'BF', 'NE', 'BJ', 'TG', 'GN', 'CD', 'CG', 'GA',
    'CM', 'TD', 'MG', 'BE', 'CH', 'HT', 'RW', 'BI', 'DJ', 'KM', 'SC', 'VU', 'MC', 'LU'
  ];

  const FRANCOPHONE_TZS = [
    'Africa/Bamako', 'Africa/Dakar', 'Africa/Abidjan', 'Africa/Ouagadougou',
    'Africa/Niamey', 'Africa/Conakry', 'Africa/Lome', 'Africa/Porto-Novo',
    'Africa/Kinshasa', 'Africa/Brazzaville', 'Africa/Douala', 'Africa/Libreville',
    'Africa/Ndjamena', 'Africa/Bangui', 'Africa/Kigali', 'Africa/Bujumbura',
    'Africa/Djibouti', 'Africa/Antananarivo', 'Europe/Paris', 'Europe/Brussels',
    'Europe/Monaco', 'Europe/Luxembourg', 'Europe/Zurich', 'America/Montreal',
    'America/Port-au-Prince'
  ];

  // Explicit translations for data-i18n key attributes
  const I18N_KEYS_FR = {
    nav_home: "L'École",
    nav_services: "4 Parcours",
    nav_pitch: "Notre Modèle",
    nav_pages: "Partenariats",
    nav_blog: "Publications",
    nav_contact: "Participer",
    nav_cta: "Devenir Partenaire",
    hero_tag: "BAARA — Institut d'IA du Mali • Bamako, Mali • 1re Cohorte 2027",
    hero_desc: "Une école d'IA axée sur l'emploi à Bamako. Quatre parcours mènent les apprenants de zéro compétence numérique à un travail rémunéré, avec un laboratoire ouvert pour l'IA en langue bambara. L'enseignement est dispensé en français avec soutien en bambara, et 70 % du temps est dédié à des projets pratiques.",
    hero_btn: "Parrainer ou Devenir Partenaire",
    hero_kpi1_val: "300 / an",
    hero_kpi1_lbl: "Apprenants par an dès 2028 (88 en pilote 2027)",
    hero_kpi2_val: "4 Parcours",
    hero_kpi2_lbl: "Chaque parcours débouche sur un emploi rémunéré",
    hero_kpi3_val: "50 % de Femmes",
    hero_kpi3_lbl: "Part cible de femmes apprenantes par cohorte",
    hero_kpi4_val: "1 500 $",
    hero_kpi4_lbl: "Bourse nominative par apprenant (du 1er cours à l'emploi)",
    about_sub: "Pourquoi Maintenant • Cap sur le Mali",
    about_title: "Le Talent Est Prêt. Nous Bâtissons la Voie de Zéro Compétence à l'Emploi en IA.",
    about_desc: "En septembre 2026, le Mali a inauguré le nouveau site de son centre national d'IA et de robotique, le CIAR-Mali, et le gouvernement a annoncé un forum annuel de l'IA pour la jeunesse. Le talent est là. Ce qui manque, c'est une voie concrète allant de l'initiation informatique à un emploi rémunéré en IA. BAARA — l'Institut d'IA du Mali — construit ce pont à Bamako.",
    about_li1: "<strong>Commencez Où Vous Êtes :</strong> Les apprenants peuvent s'arrêter après chaque parcours avec un portfolio vérifié ou continuer au niveau supérieur.",
    about_li2: "<strong>70 % de Projets Pratiques :</strong> Enseigné en français avec soutien en bambara sur des jeux de données réels du marché, de la météo et des centres de santé maliens.",
    about_li3: "<strong>Cible de 50 % de Femmes Apprenantes :</strong> Soutenues par des bourses, des indemnités de transport et des ordinateurs portables solaires partagés.",
    about_btn: "Découvrir les 4 Parcours d'Apprentissage",
    srv_sub: "Le Programme • 4 Parcours Modulaires",
    srv_title: "Quatre Parcours. Chacun Débouche sur un Emploi Rémunéré.",
    proj_sub: "Pourquoi un Labo Bambara • IA Malienne Ouverte",
    proj_title: "Au Cœur du Bambara NLP Lab : L'IA dans la Langue Parlée par la Majorité des Maliens"
  };

  const I18N_KEYS_BM = {
    nav_home: "Kalanso",
    nav_services: "Kalan Sira 4",
    nav_pitch: "An Ka Sira",
    nav_pages: "Jɛɲɔgɔnya",
    nav_blog: "Kunnafoniw",
    nav_contact: "Bolodacogo",
    nav_cta: "An Ka Jɛ",
    hero_tag: "BAARA — Mali IA Kalanso • Bamakɔ, Mali • Kalan Daminɛ 2027",
    hero_desc: "IA kalanso min bɛ baara sɔrɔli bila ɲɛ Bamakɔ. Kalan sira naani bɛ kalandenw bɔ ordinatɛri dɔnbaliya la ka taa baara saraɲuman na, ni Bamanankan IA labo kɛnɛkan ye. Kalan bɛ kɛ Faransikan na ni Bamanankan dɛmɛ ye, waati 70% bɛ kɛ baara lakika ye.",
    hero_btn: "Kalanden Dɛmɛ (1 500 $)",
    hero_kpi1_val: "300 / san",
    hero_kpi1_lbl: "Kalandenw san o san kabini 2028 (88 san 2027 kɔnɔ)",
    hero_kpi2_val: "Kalan Sira 4",
    hero_kpi2_lbl: "Kalan sira kelen-kelen bɛɛ bɛ laban baara saraɲuman na",
    hero_kpi3_val: "Muso 50%",
    hero_kpi3_lbl: "Muso kalandenw hakɛ kɛlɛkolo bɛɛ kɔnɔ",
    hero_kpi4_val: "1 500 $",
    hero_kpi4_lbl: "Kalanden kelen kelen bɛɛ ka dɛmɛsara (kalan fɔlɔ ka taa baara la)",
    about_sub: "Mun Na Sisan • Mali Kɔnɔ",
    about_title: "Hakili Bɛ Yen. An Bɛ Sira Tigɛ Ka Bɔ Kalan Na Ka Taa IA Baara La.",
    about_desc: "Sɛtanburu 2026 la, Mali ye CIAR-Mali yɔrɔ kura da wuli. Hakilitigiw bɛ yen. Min man kan, o ye sira ye kabini ordinatɛri dɔnbaliya fo baara saraɲuman sɔrɔli. BAARA — Mali IA Kalanso — bɛ o sira de dabɔ Bamakɔ.",
    about_li1: "<strong>Daminɛ I Bɛ Yɔrɔ Min :</strong> Kalandenw bɛ se ka tila kalan sira o sira kɔfɛ ni baara dɔnko ye, walima k'u sɔrɔ ka taa ɲɛ.",
    about_li2: "<strong>Waati 70% Baara Lakika :</strong> Kalan bɛ kɛ Faransikan na ni Bamanankan dɛmɛ ye Mali sugu sɔngɔw, sanji, ni kɛnɛyaso kunnafoniw kan.",
    about_li3: "<strong>Muso 50% Kalandenw Hakɛ :</strong> Dɛmɛsara, taa-ni-kɔ sara, ni tle-fanga ordinatɛriw bɛ di u ma.",
    about_btn: "Kalan Sira Naani Kɔrɔsi",
    srv_sub: "Kalan Sira Naani (4 Tracks)",
    srv_title: "Kalan Sira Naani. U Bɛɛ Bɛ Taa Baara Saraɲuman Na.",
    proj_sub: "Mun Na Bamanankan Labo • Mali IA Lakika",
    proj_title: "Bamanankan NLP Labo Kɔnɔna: IA Kan Na Min Mali Mɔgɔ Caaman Bɛ Fɔ Don O Don"
  };
  const DICT_FR = {
  "BAARA - Institut d'IA du Mali is in formation. Donations are not tax-deductible at this time.": "BAARA - Institut d'IA du Mali est en cours de constitution. Les dons ne sont pas déductibles des impôts pour le moment.",
  "The School": "L'École",
  "Mission & Overview": "Mission & Vue d'Ensemble",
  "Why Now: Mali in Focus": "Pourquoi Maintenant : Cap sur le Mali",
  "Built for Mali (Solar & Offline)": "Conçu pour le Mali (Solaire & Hors-Ligne)",
  "4 Tracks": "4 Parcours",
  "Track 1–4 Job-First Curriculum": "Curriculum Professionnalisant 1–4",
  "Graduate Careers & Mercor Jobs": "Carrières Diplômés & Postes Mercor",
  "Bambara NLP Lab (MALIBA-AI)": "Bambara NLP Lab (MALIBA-AI)",
  "2027–2028 Cohort Roadmap": "Feuille de Route Cohortes 2027–2028",
  "Our Model": "Notre Modèle",
  "5-Step Thesis & Evidence": "Thèse en 5 Étapes & Résultats",
  "Sahel Resilience Engineering": "Ingénierie de Résilience Sahélienne",
  "Open Malian AI": "IA Malienne Ouverte",
  "MALIBA-AI & 47,000 Sentence Pairs": "MALIBA-AI & 47 000 Paires de Phrases",
  "3 Malian Use Cases": "3 Cas d'Usage Maliens",
  "Partnerships": "Partenariats",
  "Ecosystem & Research Pillars": "Écosystème & Piliers de Recherche",
  "Scholarships & Ways to Partner": "Bourses & Modalités de Partenariat",
  "Sponsor a Malian Learner (,500)": "Parrainer un Apprenant Malien (1 500 $)",
  "Founding Team & Advisors": "Équipe Fondatrice & Conseillers",
  "Malian Research & University Partners": "Chercheurs & Partenaires Universitaires",
  "Accountability & Open Releases": "Redevabilité & Ressources Ouvertes",
  "Impact & Open Access": "Impact & Libre Accès",
  "Briefs": "Publications",
  "BAARA Briefs — Issue 01": "Publications BAARA — Numéro 01",
  "Institutional Overview 2027–2028": "Présentation Institutionnelle 2027–2028",
  "Bambara NLP Lab Research Brief": "Note de Recherche Bambara NLP Lab",
  "Resilience Engineering in Bamako": "Ingénierie de Résilience à Bamako",
  "Take Part": "Participer",
  "Partner With Us": "Devenir Partenaire",
  "Connect With Our Team": "Contacter Notre Équipe",
  "Watch Campus Preview": "Voir l'Aperçu du Campus",
  "Campus Preview": "Aperçu du Campus",
  "▶ Watch 60s Campus Preview": "▶ Voir l'Aperçu du Campus (60s)",
  "Explore Our Model": "Découvrir Notre Modèle",
  "View 4 Learning Tracks": "Voir les 4 Parcours",
  "BAARA — AI Institute of Mali • Bamako, Mali • First Cohort 2027": "BAARA — Institut d'IA du Mali • Bamako, Mali • 1re Cohorte 2027",
  "Malian Youth, Building AI In Their Own Languages.": "La Jeunesse Malienne, Bâtissant l'IA Dans Ses Propres Langues.",
  "A job-first AI school in Bamako. Four tracks take learners from no digital skills to paid work, with an open lab for Bambara language AI. Teaching is in French with Bambara support, and 70% of class time is hands-on project work.": "Une école d'IA axée sur l'emploi à Bamako. Quatre parcours mènent les apprenants de zéro compétence numérique à un travail rémunéré, avec un laboratoire ouvert pour l'IA en langue bambara. L'enseignement est dispensé en français avec soutien en bambara, et 70 % du temps est dédié à des projets pratiques.",
  "Sponsor or Partner": "Parrainer ou Devenir Partenaire",
  "Watch 60s Preview": "Voir l'Aperçu 60s",
  "300 / yr": "300 / an",
  "Learners per year from 2028 (88 in 2027 Pilot)": "Apprenants par an dès 2028 (88 en pilote 2027)",
  "Each learning track ends in a paid job exit": "Chaque parcours débouche sur un emploi rémunéré",
  "50% Women": "50 % de Femmes",
  "Target share of women learners across cohorts": "Part cible de femmes apprenantes par cohorte",
  "$1,500": "1 500 $",
  "Named scholarship per learner (first lesson to job)": "Bourse nominative par apprenant (du 1er cours à l'emploi)",
  "250 Learners / Year from 2028 (88 in 2027 Pilot)": "250 Apprenants / An dès 2028 (88 en Pilote 2027)",
  "4 Stackable Tracks": "4 Parcours Modulaires",
  "Each track ends in a paid job exit": "Chaque parcours débouche sur un emploi rémunéré",
  "Target for women learners across cohorts": "Objectif de femmes apprenantes par cohorte",
  "100% Open Access": "100 % Accès Ouvert",
  "All datasets & weights freely released": "Tous les jeux de données & modèles en accès libre",
  "Why Now • Mali in Focus": "Pourquoi Maintenant • Cap sur le Mali",
  "The Talent Is Ready. We Build the Path From Zero Digital Skills to Paid AI Work.": "Le Talent Est Prêt. Nous Bâtissons la Voie de Zéro Compétence à l'Emploi en IA.",
  "In September 2026, Mali opened the new site of its national AI and robotics center, CIAR-Mali, and the government announced an annual national AI forum for youth. The talent is ready. What is missing is a practical path from no digital skills to paid AI work. BAARA — the AI Institute of Mali — builds that path in Bamako.": "En septembre 2026, le Mali a inauguré le nouveau site de son centre national d'IA et de robotique, le CIAR-Mali, et le gouvernement a annoncé un forum annuel de l'IA pour la jeunesse. Le talent est là. Ce qui manque, c'est une voie concrète allant de l'initiation informatique à un emploi rémunéré en IA. BAARA — l'Institut d'IA du Mali — construit ce pont à Bamako.",
  "70% Hands-On, Practical Learning": "70 % d'Apprentissage Pratique par Projets",
  "Teaching in French with Bambara support using real Malian market datasets.": "Enseignement en français avec appui en bambara sur des jeux de données réels du marché malien.",
  "Dedicated Support for Women Learners": "Soutien Dédié aux Femmes Apprenantes",
  "Scholarships, transport allowances, and shared solar-backed laptops.": "Bourses d'études, indemnités de transport et ordinateurs portables solaires partagés.",
  "Explore the 4 Learning Tracks": "Découvrir les 4 Parcours d'Apprentissage",
  "Explore the 4 Tracks": "Découvrir les 4 Parcours",
  "The Program • 4 Stackable Tracks": "Le Programme • 4 Parcours Modulaires",
  "Four Tracks. Each One Ends in Paid Work.": "Quatre Parcours. Chacun Débouche sur un Emploi Rémunéré.",
  "Learners exit into paid employment after any track with a verified portfolio, or pass an assessment to stack into the next level.": "Les apprenants accèdent à un emploi rémunéré après chaque parcours grâce à un portfolio vérifié, ou passent une évaluation pour accéder au niveau supérieur.",
  "Digital & Data Foundations": "Fondations Numériques & Données",
  "Weeks 1–6 • Typing, Spreadsheets, AI Literacy": "Semaines 1–6 • Dactylographie, Tableurs, Culture IA",
  "Build keyboard fluency, spreadsheet literacy, computer operation, and basic AI prompting from zero prior computer experience.": "Acquérir la maîtrise du clavier, des tableurs, du système informatique et des bases du prompting IA, sans aucun prérequis.",
  "Exit: Data Entry, Office Assistant": "Débouché : Saisie de Données, Assistant Bureautique",
  "Applied AI for Work": "IA Appliquée au Travail",
  "Weeks 7–16 • Audio, Text Annotation & RLHF": "Semaines 7–16 • Audio, Annotation de Texte & RLHF",
  "Annotate audio in Bambara and French, structure datasets, verify model outputs, and assist local business data entry.": "Annoter des enregistrements audio en bambara et français, structurer des corpus, évaluer des modèles et assister la gestion de données locales.",
  "Exit: Data Specialist, RLHF Annotator": "Débouché : Spécialiste Données, Annotateur RLHF",
  "Python & Machine Learning": "Python & Machine Learning",
  "Weeks 17–32 • Programming, ML & Local Models": "Semaines 17–32 • Programmation, ML & Modèles Locaux",
  "Write clean Python, fine-tune open-source models, deploy offline LLMs, and build local software solutions.": "Programmer en Python, ajuster des modèles open-source, déployer des LLM hors-ligne et créer des solutions logicielles locales.",
  "Exit: Junior AI Developer, ML Associate": "Débouché : Développeur IA Junior, Associé ML",
  "Bambara NLP Lab": "Laboratoire NLP Bambara",
  "24-Week Paid Fellowship • Research & Studio": "Fellowship Rémunéré de 24 Semaines • Recherche & Studio",
  "Join our research team curating Bambara language datasets, building local voice models, and delivering client prototypes.": "Intégrer notre équipe de recherche pour créer des corpus en bambara, entraîner des modèles vocaux et livrer des prototypes clients.",
  "Exit: Research Fellow, Applied AI Engineer": "Débouché : Chercheur Associé, Ingénieur IA Appliquée",
  "Global Opportunities • Remote Technical Work": "Opportunités Mondiales • Emplois Techniques à Distance",
  "Prominent Remote & Global AI Jobs Our Graduates Can Perform": "Emplois IA Mondiaux et à Distance Accessibles à nos Diplômés",
  "Through premier AI hiring networks such as": "À travers les grands réseaux de recrutement en IA tels que",
  ", leading global technology enterprises recruit technical talent. Here are prominent roles our Track 1–4 graduates are prepared to compete for:": ", les leaders technologiques mondiaux recrutent des talents techniques. Voici les principaux métiers auxquels nos diplômés des Parcours 1 à 4 sont préparés :",
  "AI Safety & LLM Evaluation Specialist": "Spécialiste Sécurité IA & Évaluation LLM",
  "Global Frontier AI Networks": "Réseaux Mondiaux d'IA Frontière",
  " –  / hr": "35 $ – 65 $ / h",
  "Audit, score, and red-team frontier LLM outputs for safety, factuality, and hallucination reduction. Annotate complex reinforcement learning from human feedback (RLHF) datasets.": "Auditer, évaluer et tester la robustesse des sorties de LLM de pointe contre les hallucinations et failles. Annoter des jeux de données d'alignement RLHF.",
  "Tracks 2 & 3 • Prompt Engineering • RLHF Auditing • Data Annotation": "Parcours 2 & 3 • Ingénierie de Prompts • Audit RLHF • Annotation",
  "African Language AI & Speech Annotator": "Annotateur Vocal & Linguistique Africaine",
  "Remote Data & Speech Labs": "Laboratoires Audio & Données à Distance",
  "Curate, align, and transcribe West African language speech and text datasets. Benchmark acoustic models in Bambara and French for global frontier foundation models and voice systems.": "Collecter, aligner et transcrire des corpus oraux et écrits en langues ouest-africaines. Évaluer les modèles acoustiques en bambara et français pour les grands systèmes vocaux mondiaux.",
  "Tracks 2 & 4 • Bambara/French Bilingual • Speech Alignment • Multilingual Evaluation": "Parcours 2 & 4 • Bilingue Bambara/Français • Alignement Audio • Évaluation",
  "Python & Open-Source AI Integration Engineer": "Ingénieur Intégration Python & IA Open-Source",
  "Global AI Engineering Platforms": "Plateformes Mondiales d'Ingénierie IA",
  "Build end-to-end data pipelines, fine-tune open-source models (Hugging Face / PyTorch), and integrate offline-first inference APIs for enterprise workflows.": "Développer des pipelines de données, affiner des modèles open-source (Hugging Face / PyTorch) et intégrer des API d'inférence hors-ligne pour les entreprises.",
  "Tracks 3 & 4 • Python / PyTorch • Hugging Face • Local Inference Deployment": "Parcours 3 & 4 • Python / PyTorch • Hugging Face • Déploiement Local",
  "Applied AI Capstone & Workflow Builder": "Concepteur de Workflows & Solutions IA Appliquée",
  "Enterprise Remote Studios": "Studios d'Entreprise à Distance",
  "Design, test, and deploy customized AI automation pipelines, multilingual customer support agents, and edge-deployable voice tools for international and African clients.": "Concevoir, tester et déployer des workflows d'automatisation IA sur mesure, des agents de support multilingues et des outils vocaux pour clients internationaux.",
  "Tracks 3 & 4 • LangChain • Local LLMs • Full-Stack AI Prototypes": "Parcours 3 & 4 • LangChain • LLM Locaux • Prototypes IA Complets",
  "Explore Remote Roles on Mercor": "Explorer les Postes à Distance sur Mercor",
  "Opens official referral portal in a new tab": "Ouvre le portail officiel de recommandation dans un nouvel onglet",
  "Apply / Explore on Mercor": "Postuler / Explorer sur Mercor",
  "Our Model • Five-Step Thesis": "Notre Modèle • Thèse en Cinq Étapes",
  "From a 2027 Pilot Cohort to 300 Learners a Year in 2028: Our Model Explained.": "D'une Cohorte Pilote en 2027 à 300 Apprenants par An en 2028 : Notre Modèle Expliqué.",
  "01 Ground in Reality": "01 Ancrage dans le Réel",
  "02 Job-First Ladder": "02 Escalier vers l'Emploi",
  "03 African Language AI": "03 IA en Langues Africaines",
  "04 Resilient Infrastructure": "04 Infrastructure Résiliente",
  "05 Open Governance": "05 Gouvernance Ouverte",
  "01 Why Now: Mali in Focus": "01 Pourquoi Maintenant : Cap sur le Mali",
  "02 The 4-Track School Model": "02 Le Modèle de l'École en 4 Parcours",
  "03 Solar & Offline Campus": "03 Campus Solaire & Hors-Ligne",
  "04 2027–2028 Cohort Roadmap": "04 Feuille de Route Cohortes 2027–2028",
  "Start with real jobs and real Malian datasets, not imported hype.": "Partir des emplois réels et des données maliennes, loin des promesses hors-sol.",
  "Every track ends in a verified portfolio and a paid job exit.": "Chaque parcours débouche sur un portfolio certifié et un emploi rémunéré.",
  "Building Bambara speech and NLP models that serve the 80%+ who speak it.": "Développer des modèles vocaux et NLP en bambara pour les 80 %+ qui le parlent.",
  "Solar-powered, offline-capable campus built for Bamako's conditions.": "Un campus solaire et autonome conçu pour les réalités concrètes de Bamako.",
  "Open datasets, transparent milestones, and accountable reporting.": "Corpus ouverts, jalons transparents et rapports de gouvernance publics.",
  "Why a Bambara Lab • Open Malian AI": "Pourquoi un Labo Bambara • IA Malienne Ouverte",
  "Inside the Bambara NLP Lab: AI in the Language Most Malians Speak Every Day": "Au Cœur du Bambara NLP Lab : L'IA dans la Langue Parlée par la Majorité des Maliens",
  "01 Maternal Health Voice AI": "01 IA Vocale de Santé Maternelle",
  "02 Agricultural Voice Advisory": "02 Conseils Agricoles Vocaux",
  "03 Administrative Form Reader": "03 Lecteur Vocale de Formulaires Administratifs",
  "Maternal Healthcare Voice Assistant in Bambara": "Assistant Vocal de Santé Maternelle en Bambara",
  "Voice Farm Advisory for Rural Mali": "Conseils Agricoles Vocaux pour le Mali Rural",
  "Reading Public Administrative Forms Aloud": "Lecture Vocale de Documents Administratifs Publics",
  "Spoken prenatal and infant care advice in Bambara for mothers who may not read French.": "Conseils prénataux et pédiatriques oraux en bambara pour les mères ne lisant pas le français.",
  "Spoken crop, weather, and market advice delivered over basic mobile phones.": "Recommandations sur les cultures, la météo et les prix diffusées sur téléphones mobiles standards.",
  "Reading official notices, certificates, and forms aloud in Bambara.": "Lecture à voix haute en bambara des actes administratifs, formulaires et avis publics.",
  "Fund This Lab Track": "Financer ce Parcours de Recherche",
  "Partner on Open Datasets": "Collaborer sur les Jeux de Données Ouverts",
  "Explore Fellowship": "Découvrir les Fellowships",
  "Resilient Campus Engineering": "Ingénierie de Campus Résiliente",
  "Solar-First. Offline-Ready. Engineered for Uninterrupted Learning in Bamako.": "100 % Solaire. Prêt pour le Hors-Ligne. Conçu pour un Apprentissage Ininterrompu à Bamako.",
  "Uninterrupted Power: Solar-First Classroom": "Énergie Continue : Salles de Classe 100 % Solaires",
  "Offline-First Local Server Infrastructure": "Infrastructure Serveur Locale Hors-Ligne",
  "Hands-On Lab With Shared Solar Laptops": "Laboratoire Pratique avec Ordinateurs Portables Solaires",
  "Solar panels and battery storage keep classrooms powered through grid outages.": "Des panneaux solaires et un stockage par batteries garantissent une énergie continue lors des coupures de réseau.",
  "Local server caches store all course materials, datasets, and documentation offline.": "Des serveurs locaux hébergent tous les cours, corpus et documentations en local sans dépendre d'Internet.",
  "Laptops shared among learners, maintained on-site with solar charging carts.": "Des ordinateurs portables partagés entre apprenants, entretenus sur place avec des stations de recharge solaire.",
  "Open Research & Ecosystem Pillars": "Recherche Ouverte & Piliers de l'Écosystème",
  "Built With Malian Researchers, Universities, and Local Employers.": "Bâti Avec les Chercheurs Maliens, les Universités et les Employeurs Locaux.",
  "Open Malian AI Datasets": "Jeux de Données IA Maliens Ouverts",
  "Bambara–French sentence pairs and community speech corpora released openly for research.": "Paires de phrases bambara–français et enregistrements audio communautaires publiés en accès libre.",
  "Academic Mentorship & University Linkages": "Mentorat Académique & Liens Universitaires",
  "Joint curriculum review, research ethics oversight, and university faculty advisory.": "Révision conjointe des programmes, supervision éthique et conseil par des enseignants-chercheurs.",
  "Pan-African NLP Network": "Réseau Panafricain de NLP",
  "Collaborating with open-source African NLP communities across West Africa.": "Collaboration active avec les communautés open-source de traitement du langage à travers l'Afrique de l'Ouest.",
  "Local Employer Studio Alliances": "Alliances Studio avec les Entreprises Locales",
  "Direct pipeline for supervised learner internships and technical project delivery.": "Passerelle directe pour les stages encadrés et la livraison de projets technologiques locaux.",
  "Execution Roadmap 2027–2028": "Feuille de Route d'Exécution 2027–2028",
  "Four Quality Milestones From Curriculum Alignment to Full Scale.": "Quatre Jalons Qualité de l'Alignement du Curriculum au Plein Régime.",
  "Phase 1: Curriculum & Partner Alignment": "Phase 1 : Alignement du Curriculum & Partenariats",
  "Phase 2: Facility & Solar Setup": "Phase 2 : Aménagement du Campus & Énergie Solaire",
  "Phase 3: Pilot Cohort (88 Learners)": "Phase 3 : Cohorte Pilote (88 Apprenants)",
  "Phase 4: Full Scale (250–300 Learners/Year)": "Phase 4 : Plein Régime (250–300 Apprenants/An)",
  "Impact & Open Access Charter": "Charte d'Impact & Libre Accès",
  "Quarterly Reporting on 6 Clear Indicators & Open Public Releases": "Rapports Trimestriels sur 6 Indicateurs Clairs & Ressources Publiques Ouvertes",
  "Scholarships, Lab Fellowships & Employer Partnerships": "Bourses d'Études, Fellowships & Alliances Entreprises",
  "Sponsor a Scholar, Support the Bambara NLP Lab, or Partner on Applied AI.": "Parrainez un Apprenant, Soutenez le Labo NLP Bambara ou Devenez Entreprise Partenaire.",
  "Named Learner Scholarship": "Bourse Nominative d'Apprenant",
  ",500": "1 500 $",
  "Full path from first laptop lesson to paid work": "Parcours complet du premier clic au premier emploi rémunéré",
  "1 Named Malian Scholar (50% Women Target)": "1 Apprenant Malien Parrainé (Cible 50 % de Femmes)",
  "Covers Tuition Across Foundational & Applied Tracks": "Prend en charge la scolarité sur l'ensemble des parcours",
  "Includes Learner Stipend & Bamako Transport": "Inclut l'indemnité de vie et de transport à Bamako",
  "Shared Solar-Backed Laptop & Offline Server Access": "Accès aux PC portables solaires et serveurs hors-ligne",
  "Mentor Code Reviews & Employer Job Placement": "Revues de code par des mentors & placement en entreprise",
  "Quarterly 6-Indicator Impact Report to Sponsor": "Rapport d'impact trimestriel à 6 indicateurs pour le parrain",
  "Sponsor a Learner": "Parrainer un Apprenant",
  "Bambara NLP Lab & Campus Partner": "Partenaire Campus & Labo Bambara NLP",
  "Lab & Tech": "Labo & Technologie",
  "Fellowships, open datasets & resilient campus equipment": "Bourses de recherche, corpus ouverts & équipements résilients",
  "Sponsor 24-Week Bambara NLP Lab Research Fellows": "Financer des bourses de recherche de 24 semaines au Bambara NLP Lab",
  "Support Community Speech & Translation Data Collection": "Soutenir la collecte de données audio et textuelles communautaires",
  "Contribute Laptops, Local Offline Servers, or GPU Credits": "Fournir des ordinateurs, serveurs locaux ou crédits GPU",
  "Support Solar-First Classroom Power & Connectivity": "Soutenir l'infrastructure solaire et la connectivité du campus",
  "100% Open-Source Releases With Contributor Attribution": "100 % des livrables en open-source avec attribution aux contributeurs",
  "Quarterly Impact & Open-Access Benchmark Reports": "Rapports d'impact trimestriels et benchmarks en libre accès",
  "Partner With the Lab": "Soutenir le Laboratoire",
  "Employer & Applied AI Studio": "Employeur & Studio d'IA Appliquée",
  "Hire & Build": "Recruter & Développer",
  "Internships, graduate hiring & custom French/Bambara AI": "Stages, recrutement de diplômés & solutions IA français/bambara",
  "Hire Track 1–4 Graduates for Data, AI & ML Roles": "Recruter des diplômés des Parcours 1 à 4 pour vos besoins en données et IA",
  "Host Supervised Learner Internships in Bamako": "Accueillir des stagiaires encadrés dans vos équipes à Bamako",
  "Commission Applied AI Studio Projects for Your Organization": "Commander des projets sur mesure à notre studio d'IA appliquée",
  "Custom French & Bambara Voice/Text Workflow Prototypes": "Prototypes de flux vocaux/textuels sur mesure en français et bambara",
  "Co-Design Real-World Capstone Datasets With Faculty": "Co-concevoir des jeux de données de projets de fin d'études avec l'équipe",
  "Direct Access to Annual Cohort Demo Days": "Accès direct et prioritaire aux Demo Days annuels de chaque promotion",
  "Partner as an Employer": "Devenir Entreprise Partenaire",
  "The Founding Team & Advisors": "L'Équipe Fondatrice & les Conseillers",
  "Malian Leadership Building Bamako's Job-First AI Institute.": "Un Leadership Malien Bâtissant l'Institut d'IA de Référence à Bamako.",
  "Abdel R Traoré": "Abdel R Traoré",
  "Co-founder, Senior Systems Engineer": "Co-fondateur, Ingénieur Systèmes Senior",
  "Leads institutional strategy, milestone governance, campus infrastructure engineering, and international partnerships for BAARA — the AI Institute of Mali — connecting global technology and scholarship partners with Malian youth and employers.": "Dirige la stratégie institutionnelle, la gouvernance, l'ingénierie des infrastructures du campus et les partenariats internationaux de BAARA — l'Institut d'IA du Mali — reliant les partenaires technologiques mondiaux et les mécènes à la jeunesse et aux entreprises maliennes.",
  "Systems Engineering & Resilient Infrastructure": "Ingénierie Systèmes & Infrastructures Résilientes",
  "Institutional Strategy & Partner Governance": "Stratégie Institutionnelle & Gouvernance Partenaires",
  "First Cohort Launch": "Lancement de la 1re Cohorte",
  "Samba Gueye": "Samba Gueye",
  "Co-founder, MBA, Senior Manager": "Co-fondateur, MBA, Directeur Senior",
  "Architects the four job-first learning tracks (from Digital Foundations to Python/ML and the 24-week Bambara NLP Lab) and designs the offline-first campus server caches so learners code and train models without interruption.": "Supervise l'architecture des quatre parcours professionnalisants (des Fondations Numériques au Python/ML et au Labo Bambara NLP de 24 semaines) et conçoit les caches de serveurs hors-ligne pour un apprentissage ininterrompu.",
  "Applied AI, Python/ML & Curriculum Design": "IA Appliquée, Python/ML & Ingénierie Pédagogique",
  "Offline Server & Local LLM/ASR Deployment": "Serveurs Hors-Ligne & Déploiement Local LLM/ASR",
  "70% Hands-On Projects": "70 % de Projets Pratiques",
  "Cheick Kanté": "Cheick Kanté",
  "Co-Founder, Health Care Program Director": "Co-fondateur, Directeur de Programmes Santé",
  "Directs healthcare AI programs and clinical partnerships in Mali — spearheading maternal health voice AI, local medical dataset curation, and hospital/clinic collaborations across Bamako and regional health centers.": "Dirige les programmes d'IA en santé et les partenariats cliniques au Mali — pilotant les assistants vocaux de santé maternelle, la constitution de jeux de données médicaux locaux et les collaborations avec hôpitaux et centres de santé.",
  "Healthcare AI Programs & Clinical Pilots": "Programmes d'IA Santé & Pilotes Cliniques",
  "Medical Dataset Alliances & Hospital Partnerships": "Alliances Données Médicales & Partenariats Hospitaliers",
  "Clinical AI": "IA Clinique",
  "Health Care Program Direction": "Direction de Programmes Santé",
  "Sira Koné": "Sira Koné",
  "Program Advisor in Mali": "Conseillère de Programme au Mali",
  "Leads relationships with Malian employers, NGOs, universities, and community organizations in Bamako — ensuring 50% women learner participation and connecting graduates directly to internships, studio contracts, and paid jobs.": "Développe les relations avec les employeurs, ONG, universités et acteurs communautaires à Bamako — garantissant 50 % de participation féminine et orientant les diplômés vers des stages, contrats studio et emplois rémunérés.",
  "Employer Placement & Mali Ecosystem Alliances": "Placement Professionnel & Écosystème Malien",
  "Youth & Women Outreach (50% Target)": "Sensibilisation Jeunesse & Femmes (Cible 50 %)",
  "Women Learners Target": "Objectif Femmes Apprenantes",
  "Take Part in the 2027 Cohort": "Participez à la Cohorte 2027",
  "Whether you want to sponsor a learner (,500), support the Bambara NLP Lab, contribute hardware/cloud credits, hire graduates, or apply as a learner, send an inquiry below.": "Que vous souhaitiez parrainer un apprenant (1 500 $), soutenir le Bambara NLP Lab, fournir du matériel informatique ou des crédits cloud, recruter nos diplômés ou postuler, écrivez-nous ci-dessous.",
  "Send Inquiry": "Envoyer la Demande",
  "Institutional Briefs & Bambara NLP Lab Publications": "Publications Institutionnelles & Travaux du Labo Bambara NLP",
  "From Zero Digital Skills to Paid AI Work: Inside Our 4-Track Model": "De Zéro Compétence à l'Emploi en IA : Au Cœur de Notre Modèle en 4 Parcours",
  "From Zero Digital Skills to Paid AI Work: Inside Our 4-Track Job-First Model in Bamako.": "De Zéro Compétence à l'Emploi en IA : Au Cœur de Notre Modèle Professionnalisant en 4 Parcours à Bamako.",
  "Bambara NLP Lab: 47,000 Sentence Pairs & Speech Benchmarks for Mali": "Bambara NLP Lab : 47 000 Paires de Phrases & Benchmarks Vocaux pour le Mali",
  "Building on MALIBA-AI & Bayelemabaga: Open Bambara Voice AI for Health & Farming.": "Bâtir sur MALIBA-AI & Bayelemabaga : IA Vocale Bambara Ouverte pour la Santé & l'Agriculture.",
  "Sahel Resilience Engineering: Solar-First Power & Offline Servers in Bamako": "Ingénierie de Résilience Sahélienne : Alimentation Solaire & Serveurs Hors-Ligne à Bamako",
  "Engineered for Bamako: How Solar-First Power and Local Server Caches Keep Class Running.": "Conçu pour Bamako : Comment le Solaire et les Caches Serveurs Hors-Ligne Assurent la Continuité des Cours.",
  "Stay Updated on Cohort 1 & Bambara NLP Releases": "Restez Informé de la Cohorte 1 & des Publications Bambara",
  "Subscribe for quarterly milestone reports, open dataset releases, and demo day invitations.": "Abonnez-vous pour recevoir nos rapports trimestriels, les sorties de jeux de données et les invitations aux Demo Days.",
  "Subscribe": "S'abonner",
  "BAARA — AI Institute of Mali": "BAARA — Institut d'IA du Mali",
  "Job-first AI education and an open Bambara NLP Lab in Bamako, engineered with solar-first power and resilient offline servers.": "Formation IA axée sur l'emploi et laboratoire ouvert NLP Bambara à Bamako, avec alimentation solaire et serveurs hors-ligne résilients.",
  "All rights reserved.": "Tous droits réservés.",
  "Privacy & Governance": "Confidentialité & Gouvernance",
  "See Campus Architecture": "Découvrir l'Architecture du Campus",
  "Our Model & Impact": "Notre Modèle & Impact",
  "Track 1: Digital & Data (8 wks)": "Parcours 1 : Numérique & Données (8 sem)",
  "Track 2: Applied AI for Work (6 wks)": "Parcours 2 : IA Appliquée au Travail (6 sem)",
  "Track 3: Python & ML (16 wks)": "Parcours 3 : Python & ML (16 sem)",
  "Track 4: Bambara NLP Lab (24 wks)": "Parcours 4 : Labo Bambara NLP (24 sem)",
  "Sponsor a Scholar (,500)": "Parrainer un Apprenant (1 500 $)",
  "Ways to Partner & Sponsor": "Modalités de Partenariat & Parrainage",
  "Malian Youth,": "La Jeunesse Malienne,",
  "Building AI In Their": "Bâtissant l'IA Dans Ses",
  "Own Languages.": "Propres Langues.",
  "✦ Interagir (Tap)": "✦ Interagir (Cliquer)",
  "BAMBARA": "BAMBARA",
  "FRANÇAIS": "FRANÇAIS",
  "ENGLISH": "ENGLISH",
  "Learners start where they are. They can exit into employment after any track with a verified portfolio, or pass the exit gate to advance to the next track.": "Les apprenants commencent là où ils en sont. Ils peuvent s'insérer dans l'emploi après chaque parcours avec un portfolio vérifié, ou franchir le cap de validation pour passer au parcours suivant.",
  "Track 1 • 8 Weeks • Start Here": "Parcours 1 • 8 Semaines • Point de Départ",
  "Use a laptop, spreadsheets, and real local data: market prices, rainfall, and clinic visits. Builds foundational digital fluency from zero prior computer experience.": "Utilisation de l'ordinateur portable, des tableurs et de données locales réelles : cours des marchés, pluviométrie et consultations de santé. Développe l'autonomie numérique fondamentale à partir de zéro.",
  "↳ Exit to: Data Entry, Office Assistant": "↳ Débouché : Saisie de Données, Assistant Bureautique",
  "Track 2 • 6 Weeks • Then": "Parcours 2 • 6 Semaines • Étape Suivante",
  "Write structured prompts, audit AI output for errors and hallucinations, and use AI workflows for business reports, French/Bambara translation, and customer messages.": "Rédiger des prompts structurés, auditer les résultats des modèles pour détecter erreurs et hallucinations, et exploiter les flux d'IA pour les rapports d'activité, la traduction français/bambara et le support client.",
  "↳ Exit to: AI-Assisted Admin, Content, Support": "↳ Débouché : Administration Assistée par IA, Contenu, Support",
  "Track 3 • 16 Weeks • Go Deeper": "Parcours 3 • 16 Semaines • Approfondissement",
  "Master Python, data analysis, Git, and machine learning engineering — culminating in a supervised capstone model built and evaluated on a real Malian dataset.": "Maîtriser Python, l'analyse de données, Git et l'ingénierie du Machine Learning — avec pour projet de synthèse un modèle supervisé entraîné et évalué sur un jeu de données malien réel.",
  "↳ Exit to: Junior Data Analyst, Junior ML Developer": "↳ Débouché : Analyste de Données Junior, Développeur ML Junior",
  "Track 4 • 24-Week Fellowship": "Parcours 4 • Bourse de Recherche de 24 Semaines",
  "Collect Bambara speech and text, train speech recognition (ASR) and translation models, and publish open datasets and weights under public licenses with contributor credit.": "Collecter des corpus oraux et écrits en bambara, entraîner des modèles de reconnaissance vocale (ASR) et de traduction, et publier des jeux de données et poids ouverts sous licences publiques avec attribution des contributeurs.",
  "↳ Exit to: NLP Engineer, Research Assistant": "↳ Débouché : Ingénieur NLP, Assistant de Recherche",
  "Most AI tools do not work well in Bambara. Our 24-week fellowship builds on open work by Malian researchers: the": "La plupart des outils d'IA fonctionnent mal en bambara. Notre programme de 24 semaines s'appuie sur les travaux pionniers de chercheurs maliens : le",
  "speech benchmark and the": "benchmark vocal et le",
  "dataset of": "jeu de données de",
  "47,000 Bambara–French sentence pairs": "47 000 paires de phrases bambara–français",
  ". Every dataset and model is released openly under public licenses, with credit to each Malian contributor.": ". Chaque jeu de données et modèle est publié en libre accès sous licence publique, avec mention de chaque contributeur malien.",
  "First Use Case 01 — Public & Community Health:": "Cas d'Usage 01 — Santé Publique & Communautaire :",
  "Verified public health information in spoken Bambara": "Informations de santé publique vérifiées en bambara parlé",
  "Fellows work with health partners to train speech and translation models. Families and community health workers can then hear verified guidance on prevention, screening, and maternal care in Bambara.": "Avec des partenaires de santé, les chercheurs entraînent des modèles de reconnaissance vocale et de traduction. Les familles et les agents de santé communautaires peuvent ainsi écouter, en bambara, des conseils vérifiés sur la prévention, le dépistage et la santé maternelle.",
  "First Use Case 02 — Voice Farm Advice:": "Cas d'Usage 02 — Conseil Agricole Vocal :",
  "Spoken Bambara weather, soil & market price advisory for rural farmers": "Conseils météo, sols & cours des marchés en bambara parlé pour les agriculteurs ruraux",
  "Built on MALIBA-AI and Bayelemabaga (47,000 Bambara–French sentence pairs), delivering voice-first agricultural advice, rainfall alerts, and local market prices over low-bandwidth mobile links.": "Fondé sur MALIBA-AI et Bayelemabaga (47 000 paires de phrases bambara–français), diffusant conseils agricoles vocaux, alertes pluviométriques et prix des marchés locaux via des liaisons mobiles à faible débit.",
  "First Use Case 03 — Civic Access by Voice:": "Cas d'Usage 03 — Accès Citoyen par la Voix :",
  "Government & administrative forms read aloud in Bambara": "Lecture vocale en bambara des formulaires gouvernementaux & administratifs",
  "Bridging the literacy divide by reading official French administrative forms aloud in natural Bambara and helping citizens complete essential public records accurately.": "Combler la fracture de l'alphabétisation en lisant les formulaires administratifs officiels en bambara naturel et en aidant les citoyens à renseigner leurs démarches d'état civil avec exactitude.",
  "AI Institute of Mali": "Institut d'IA du Mali",
  "300 Learners / Year": "300 Apprenants / An",
  "47,000 Sentence Pairs": "47 000 Paires de Phrases",
  "50% Women Target": "Cible de 50 % de Femmes",
  "Solar-First Campus": "Campus 100 % Solaire",
  "Offline Server Caches": "Serveurs Locaux Hors-Ligne",
  "4 Job-Ready Tracks": "4 Parcours Professionnalisants",
  "French & Bambara Instruction": "Enseignement en Français & Bambara",
  "Of class time is hands-on project work!": "Du temps de cours est consacré à des projets pratiques !",
  "HOW WE OPERATE • CAMPUS INFRASTRUCTURE": "NOTRE FONCTIONNEMENT • INFRASTRUCTURE DU CAMPUS",
  "Engineered for Bamako. Designed for Uninterrupted Learning.": "Conçu pour Bamako. Taillé pour un Apprentissage Ininterrompu.",
  "Reliable power and fast local access to datasets, coding tools, and AI models are essential for daily hands-on engineering. Our Bamako campus is engineered from the ground up to keep classes, coding labs, and model training running smoothly every day.": "Une alimentation électrique fiable et un accès local rapide aux données, aux outils de code et aux modèles d'IA sont indispensables à la pratique quotidienne. Notre campus de Bamako est conçu de A à Z pour maintenir les cours, les laboratoires de code et l'entraînement de modèles opérationnels chaque jour sans interruption.",
  "Learners / Year from 2028 (88 in 2027 Pilot)": "Apprenants / An dès 2028 (88 en Pilote 2027)",
  "1. Solar-First Campus Power": "1. Énergie Solaire Prioritaire",
  "Solar panels and battery banks serve as our primary campus power source, keeping classrooms, servers, and shared laptops running continuously.": "Panneaux solaires et parcs de batteries constituent notre source d'énergie principale, assurant le fonctionnement continu des salles de classe, des serveurs et des ordinateurs partagés.",
  "2. Offline-Ready Local Servers & Regional Sync": "2. Serveurs Locaux Hors-Ligne & Synchronisation Régionale",
  "On-campus servers cache video courses, Python libraries, documentation, and compact AI models for instant local access, backed by regional cloud synchronization.": "Des serveurs sur site hébergent en cache cours vidéo, bibliothèques Python, documentations et modèles d'IA compacts pour un accès local instantané, complété par une synchronisation cloud régionale.",
  "3. Shared Solar-Backed Laptops": "3. Ordinateurs Portables Partagés Alimentés par le Solaire",
  "Students use campus-maintained laptops configured for low power consumption, offline coding environments, and verified open-source AI tooling.": "Les étudiants travaillent sur des ordinateurs portables configurés pour une faible consommation, des environnements de code hors-ligne et des outils d'IA open-source vérifiés.",
  "4. Open Technical Documentation & Public Licenses": "4. Documentation Technique Ouverte & Licences Publiques",
  "All curriculum materials, student project guides, and local dataset tools are documented openly and released under public licenses for Mali and the Sahel.": "Tous les supports de cours, guides de projets étudiants et outils de données locales sont documentés ouvertement et publiés sous licences publiques pour le Mali et le Sahel.",
  "Taught in French with Bambara support • Every phase verified by transparent impact indicators": "Enseigné en français avec appui en bambara • Chaque étape vérifiée par des indicateurs d'impact transparents",
  "ECOSYSTEM & COLLABORATION PILLARS": "ÉCOSYSTÈME & PILIERS DE COLLABORATION",
  "Built With Malian Researchers, Universities, and Local Employers": "Bâti Avec les Chercheurs, Universités et Employeurs Maliens",
  "We collaborate across five ecosystem pillars to connect open Bambara language research, practical classroom training, and paid technical employment in Mali.": "Nous collaborons autour de cinq piliers clés pour lier la recherche ouverte en langue bambara, la formation pratique et l'accès à des emplois techniques rémunérés au Mali.",
  "· Building on 47,000 open Bambara–French sentence pairs and community speech benchmarks": "· S'appuyant sur 47 000 paires de phrases bambara–français en libre accès et des benchmarks vocaux communautaires",
  "Academic Links": "Liens Académiques",
  "Universities & Faculty": "Universités & Corps Enseignant",
  "· Curriculum mentorship, research ethics review, and joint student capstone supervision": "· Mentorat pédagogique, comité d'éthique de recherche et co-encadrement des projets de fin d'études",
  "African NLP Network": "Réseau Africain de TALN (NLP)",
  "West African Research": "Recherche en Afrique de l'Ouest",
  "· Open-source datasets, speech recognition benchmarks, and public-license model releases": "· Jeux de données open-source, benchmarks de reconnaissance vocale et modèles sous licences publiques",
  "Campus Infrastructure": "Infrastructure du Campus",
  "Compute & Hardware": "Puissance de Calcul & Matériel",
  "· Shared laptops, offline local servers, solar power arrays, and GPU training credits": "· Ordinateurs partagés, serveurs locaux hors-ligne, installations solaires et crédits de calcul GPU",
  "Bamako Employers": "Employeurs de Bamako",
  "Hiring & Studio Partners": "Partenaires Recrutement & Studio",
  "· Agro-industry, clinics, NGOs, and businesses hosting internships and hiring graduates": "· Entreprises agro-industrielles, cliniques, ONG et sociétés accueillant nos stagiaires et diplômés",
  "2027–2028 COHORT ROADMAP • BAMAKO": "FEUILLE DE ROUTE COHORTES 2027–2028 • BAMAKO",
  "Every phase of our rollout is guided by verified learning outcomes, employer alignment, and open quarterly reporting.": "Chaque étape de notre déploiement est guidée par des acquis d'apprentissage vérifiés, l'adéquation aux besoins des employeurs et des bilans trimestriels publics.",
  "Phase 1: Align": "Phase 1 : Cadrage & Alignement",
  "Jan–Mar 2027 • Employer needs, curriculum & learner outreach": "Jan–Mar 2027 • Besoins employeurs, curriculum & mobilisation des apprenants",
  "Phase 2 (Apr–Aug 2027): Campus setup, faculty & solar/offline lab": "Phase 2 (Avr–Août 2027) : Aménagement du campus, équipe pédagogique & labo solaire/hors-ligne",
  "Phase 3:": "Phase 3 :",
  "Pilot Cohort": "Cohorte Pilote",
  "Sep 2027 – Mar 2028: 88 learners across all 4 tracks in Bamako": "Sep 2027 – Mar 2028 : 88 apprenants répartis sur les 4 parcours à Bamako",
  "Verified 6-Indicator Review": "Bilan Vérifié sur 6 Indicateurs",
  "Phase 4: Full Launch": "Phase 4 : Plein Déploiement",
  "Apr–Dec 2028 • 300 learners/yr, growing each year": "Avr–Déc 2028 • 300 apprenants/an, en expansion continue",
  "Every partner receives a concise quarterly report on six indicators: (1) Enrolment, (2) Completion, (3) Share of women learners, (4) Graduates in paid work, (5) Open datasets released, and (6) Applied AI studio projects delivered.": "Chaque partenaire reçoit un rapport trimestriel concis sur six indicateurs : (1) Inscriptions, (2) Taux de complétion, (3) Part de femmes apprenantes, (4) Diplômés en emploi rémunéré, (5) Jeux de données ouverts publiés, et (6) Projets livrés par le studio d'IA appliquée.",
  "Quarterly Impact Commitment": "Engagement d'Impact Trimestriel",
  "6 Verified Impact Indicators • Transparent Governance": "6 Indicateurs d'Impact Vérifiés • Gouvernance Transparente",
  "Building on MALIBA-AI and the Bayelemabaga dataset of 47,000 Bambara–French sentence pairs, every dataset and speech model trained in our Bambara NLP Lab is released under open public licenses with credit to each Malian contributor.": "En continuité avec MALIBA-AI et le corpus Bayelemabaga de 47 000 paires de phrases bambara–français, chaque jeu de données et modèle vocal entraîné au sein de notre Bambara NLP Lab est publié sous licence publique ouverte avec attribution à chaque contributeur malien.",
  "Bambara NLP Open-Access Charter": "Charte de Libre Accès au NLP Bambara",
  "Public Licenses & Contributor Attribution in Mali": "Licences Publiques & Attribution des Contributeurs au Mali",
  "Four Ways to Take Part": "Quatre Façons de Participer",
  "Help Us Open the First Cohort in 2027.": "Aidez-Nous à Ouvrir la Première Cohorte en 2027.",
  "Sponsor a Learner ($1,500)": "Parrainer un Apprenant (1 500 $)",
  "A named scholarship gives one young Malian the full path from first laptop lesson to first paid work.": "Une bourse nominative offre à un jeune Malien le parcours complet, de la première initiation sur ordinateur au premier emploi rémunéré.",
  "Support the Bambara Lab": "Soutenir le Laboratoire Bambara",
  "Support fellowships, data collection, and open AI models in Malian languages, released for everyone to use.": "Financer des bourses de recherche, la collecte de données et des modèles d'IA ouverts dans les langues maliennes, mis à la disposition de tous.",
  "Give Technology (In-Kind)": "Donner du Matériel (En Nature)",
  "Cloud credits, laptops, GPU time, software, and course content keep learning running on and offline.": "Crédits cloud, ordinateurs portables, temps GPU, logiciels et contenus pédagogiques permettent d'étudier en ligne comme hors-ligne.",
  "Hire & Partner (Employers)": "Recruter & Devenir Partenaire (Employeurs)",
  "Bring client projects to our applied AI studio, offer internships, and hire our job-ready graduates.": "Confiez vos projets à notre studio d'IA appliquée, proposez des stages et recrutez nos diplômés opérationnels.",
  "Open Research & Tech": "Recherche & Technologies Ouvertes",
  "Whether you want to sponsor a learner ($1,500), support the Bambara NLP Lab, contribute hardware/cloud credits, hire graduates, or apply as a learner, send an inquiry below.": "Que vous souhaitiez parrainer un apprenant (1 500 $), soutenir le Bambara NLP Lab, contribuer en matériel ou crédits cloud, recruter des diplômés ou postuler comme apprenant, écrivez-nous ci-dessous.",
  "01 — Sponsor a Learner ($1,500 Named Scholarship)": "01 — Parrainer un Apprenant (Bourse Nominative de 1 500 $)",
  "02 — Support the Bambara NLP Lab & Fellowships": "02 — Soutenir le Bambara NLP Lab & les Bourses de Recherche",
  "03 — Give Technology (In-Kind Laptops / Cloud / GPU)": "03 — Don Technologique (PC Portables / Cloud / GPU)",
  "04 — Hire Graduates & Applied AI Studio Partner": "04 — Recruter nos Diplômés & Partenaire Studio d'IA",
  "05 — Prospective Learner / Bamako 2027 Cohort Inquiry": "05 — Candidat Apprenant / Demande Cohorte Bamako 2027",
  "Malian Youth, Building AI in Their Own Languages.": "La Jeunesse Malienne, Bâtissant l'IA dans Ses Propres Langues.",
  "Every phase of our work is guided by a quarterly 6-indicator report covering enrolment, completion, share of women learners, graduates in paid work, open Bambara datasets released, and applied studio projects delivered.": "Chaque étape de notre action est encadrée par un rapport trimestriel sur 6 indicateurs : inscriptions, complétion, parité des apprenantes, diplômés en emploi rémunéré, jeux de données bambara ouverts et projets livrés par le studio.",
  "Campus Location": "Emplacement du Campus",
  "Founding Team & Partnerships": "Équipe Fondatrice & Partenariats",
  "BAARA Briefs • Founding Issue": "Publications BAARA • Numéro Inaugural",
  "Institutional Briefs & Bambara NLP Lab Publications.": "Publications Institutionnelles & Recherches du Bambara NLP Lab.",
  "By": "Par",
  "Founding Team": "L'Équipe Fondatrice",
  "School Model (2027–2028)": "Modèle Pédagogique (2027–2028)",
  "Explore Lab Cases": "Explorer les Cas du Lab",
  "Systems Architecture": "Architecture Systèmes",
  "Solar & Offline-First": "Solaire & Hors-Ligne d'Abord",
  "Help Us Open Cohort 1 in 2027": "Aidez-Nous à Ouvrir la Cohorte 1 en 2027",
  "Receive Quarterly Impact Reports & Open Bambara Lab Releases!": "Recevez nos Bilans d'Impact Trimestriels & les Publications du Labo Bambara !",
  "88 Pilot Learners (2027) → 300 Learners / Year (2028)": "88 Apprenants Pilotes (2027) → 300 Apprenants / An (2028)",
  "JOIN UPDATES": "REJOINDRE LA LISTE",
  "I agree to receive quarterly baara.ai school and open dataset updates.": "J'accepte de recevoir les actualités trimestrielles de l'école baara.ai et des données ouvertes.",
  "BAARA - Institut d'IA du Mali (baara.ai) has three aims: job-first AI training for Malian youth, an open lab for AI in Bambara, and support for public health, agriculture, and entrepreneurship initiatives in Mali.": "BAARA - Institut d'IA du Mali (baara.ai) poursuit trois objectifs : former les jeunes Maliens à l'IA pour l'emploi, développer un laboratoire ouvert d'IA en bambara, et soutenir des initiatives en santé publique, en agriculture et en entrepreneuriat au Mali.",
  "School Navigation": "Navigation de l'École",
  "Solar & Offline Campus": "Campus Solaire & Hors-Ligne",
  "The 4 Learning Tracks": "Les 4 Parcours d'Apprentissage",
  "Sponsor a Scholar ($1,500)": "Parrainer un Apprenant (1 500 $)",
  "Bamako Campus": "Campus de Bamako",
  "6 Quarterly Impact Indicators • 100% Open Bambara Releases": "6 Indicateurs d'Impact Trimestriels • 100 % Ressources Bambara Libres",
  ". All rights reserved.": ". Tous droits réservés.",
  "BAARA — AI Institute of Mali • 60s Campus & Bambara Lab Preview": "BAARA — Institut d'IA du Mali • Aperçu de 60s du Campus & du Labo Bambara",
  "● Campus Preview: French & Bambara Instruction": "● Aperçu du Campus : Enseignement en Français & Bambara",
  "Bamako, Mali • First Cohort 2027": "Bamako, Mali • Première Cohorte 2027",
  "Language selector": "Sélecteur de langue",
  "Key school indicators": "Indicateurs clés de l'école",
  "decorative shape": "élément décoratif",
  "Malian youth learning applied AI and Bambara NLP in Bamako": "Jeunesse malienne apprenant l'IA appliquée et le NLP bambara à Bamako",
  "Learners collaborating in Bamako classroom": "Apprenants collaborant dans une salle de cours à Bamako",
  "Hands-on data and AI project training": "Formation pratique sur projets de données et d'IA",
  "Track 1 icon": "Icône Parcours 1",
  "Track 2 icon": "Icône Parcours 2",
  "Track 3 icon": "Icône Parcours 3",
  "Track 4 icon": "Icône Parcours 4",
  "Maternal health voice AI in Bambara": "IA vocale de santé maternelle en bambara",
  "Voice farm advice in Bambara": "Conseils agricoles vocaux en bambara",
  "Public forms read aloud in Bambara": "Formulaires publics lus à haute voix en bambara",
  "Solar-powered offline-ready AI campus in Bamako": "Campus d'IA solaire et opérationnel hors-ligne à Bamako",
  "Solar first icon": "Icône énergie solaire",
  "BAARA - Institut d'IA du Mali logo": "Logo de BAARA - Institut d'IA du Mali",
  "Écouter le signal audio": "Écouter le signal audio",
  "Fermer le message": "Fermer le message",
  "Cliquez ou survolez pour interagir avec le robot BAARA": "Cliquez ou survolez pour interagir avec le robot BAARA",
  "Interagir avec le robot": "Interagir avec le robot"
};
  const DICT_BM = {
  "BAARA - Institut d'IA du Mali is in formation. Donations are not tax-deductible at this time.": "BAARA - Institut d'IA du Mali est en cours de constitution. Les dons ne sont pas déductibles des impôts pour le moment.",
  "The School": "Kalanso",
  "Mission & Overview": "Kununko & Kunnafoni",
  "Why Now: Mali in Focus": "Mun Na Sisan: Mali Kɔnɔ",
  "Built for Mali (Solar & Offline)": "Dilanbaara Mali Ye (Tle-fanga & Kunuŋɔ-kɔkan)",
  "4 Tracks": "Kalan Sira 4",
  "Track 1–4 Job-First Curriculum": "Kalan Sira 1–4 Baara-Daminɛ Sira",
  "Graduate Careers & Mercor Jobs": "Kalandenw Ka Baara & Mercor Sira",
  "Bambara NLP Lab (MALIBA-AI)": "Bamanankan NLP Labo (MALIBA-AI)",
  "2027–2028 Cohort Roadmap": "San 2027–2028 Kalandenw Ka Taabolo",
  "Our Model": "An Ka Sira",
  "5-Step Thesis & Evidence": "Dalilu Duuru & Kalan Sira",
  "Sahel Resilience Engineering": "Sahel Sabatili Inzeniyɛri",
  "Open Malian AI": "Mali IA Lakika",
  "MALIBA-AI & 47,000 Sentence Pairs": "MALIBA-AI & Kumasen 47 000",
  "3 Malian Use Cases": "Mali Baara Sira 3",
  "Partnerships": "Jɛɲɔgɔnya",
  "Ecosystem & Research Pillars": "Jɛkulu & Ɲinini Saraw",
  "Scholarships & Ways to Partner": "Dɛmɛsaraw & Jɛɲɔgɔnya Siraw",
  "Sponsor a Malian Learner (,500)": "Mali Kalanden Dɛmɛ (1 500 $)",
  "Founding Team & Advisors": "Kalandaso Dabɔbagaw & Ladilikɛlaw",
  "Malian Research & University Partners": "Mali Ɲinikɛlaw & Iniwɛrisite Jɛɲɔgɔnw",
  "Accountability & Open Releases": "Kunnafoni Lakika & Kɛnɛkan Labow",
  "Impact & Open Access": "Kalan Nafa & Duniya Kɛnɛkan",
  "Briefs": "Kunnafoniw",
  "BAARA Briefs — Issue 01": "BAARA Kunnafoniw — Sɛbɛn 01",
  "Institutional Overview 2027–2028": "Jamana Kunnafoni 2027–2028",
  "Bambara NLP Lab Research Brief": "Bamanankan NLP Labo Ɲinini Kunnafoni",
  "Resilience Engineering in Bamako": "Bamakɔ Sabatili Inzeniyɛri",
  "Take Part": "Bolodacogo",
  "Partner With Us": "An Ka Jɛ",
  "Connect With Our Team": "An Ka Kulu Kuman",
  "Watch Campus Preview": "Kalanso Filɛ",
  "Campus Preview": "Kalanso Filɛli",
  "▶ Watch 60s Campus Preview": "▶ Kalanso Filɛ (Sekon 60)",
  "Explore Our Model": "An Ka Sira Kɔrɔsi",
  "View 4 Learning Tracks": "Kalan Sira Naani Ye",
  "BAARA — AI Institute of Mali • Bamako, Mali • First Cohort 2027": "BAARA — Mali IA Kalanso • Bamakɔ, Mali • Kalan Daminɛ 2027",
  "Malian Youth, Building AI In Their Own Languages.": "Mali Denmisɛnw, Bɛ IA Dilan U Yɛrɛ Ka Kanw Na.",
  "A job-first AI school in Bamako. Four tracks take learners from no digital skills to paid work, with an open lab for Bambara language AI. Teaching is in French with Bambara support, and 70% of class time is hands-on project work.": "IA kalanso min bɛ baara sɔrɔli bila ɲɛ Bamakɔ. Kalan sira naani bɛ kalandenw bɔ ordinatɛri dɔnbaliya la ka taa baara saraɲuman na, ni Bamanankan IA labo kɛnɛkan ye. Kalan bɛ kɛ Faransikan na ni Bamanankan dɛmɛ ye, waati 70% bɛ kɛ baara lakika ye.",
  "Sponsor or Partner": "Kalanden Dɛmɛ Walima Jɛ",
  "Watch 60s Preview": "Sekon 60 Filɛ",
  "300 / yr": "300 / san",
  "Learners per year from 2028 (88 in 2027 Pilot)": "Kalandenw san o san kabini 2028 (88 san 2027 kɔnɔ)",
  "Each learning track ends in a paid job exit": "Kalan sira kelen-kelen bɛɛ bɛ laban baara saraɲuman na",
  "50% Women": "Muso 50%",
  "Target share of women learners across cohorts": "Muso kalandenw hakɛ kɛlɛkolo bɛɛ kɔnɔ",
  "$1,500": "1 500 $",
  "Named scholarship per learner (first lesson to job)": "Kalanden kelen kelen bɛɛ ka dɛmɛsara (kalan fɔlɔ ka taa baara la)",
  "250 Learners / Year from 2028 (88 in 2027 Pilot)": "Kalanden 250 / San kabini 2028 (88 san 2027 kɔnɔ)",
  "4 Stackable Tracks": "Kalan Sira Naani",
  "Each track ends in a paid job exit": "Kalan sira bɛɛ bɛ laban baara saraɲuman na",
  "Target for women learners across cohorts": "Muso kalandenw hakɛ kɛlɛkolo bɛɛ kɔnɔ",
  "100% Open Access": "100% Duniya Kɛnɛkan",
  "All datasets & weights freely released": "Kunnafoniw ni modɛliw bɛ di gbansan",
  "Why Now • Mali in Focus": "Mun Na Sisan • Mali Kɔnɔ",
  "The Talent Is Ready. We Build the Path From Zero Digital Skills to Paid AI Work.": "Hakili Bɛ Yen. An Bɛ Sira Tigɛ Ka Bɔ Kalan Na Ka Taa IA Baara La.",
  "In September 2026, Mali opened the new site of its national AI and robotics center, CIAR-Mali, and the government announced an annual national AI forum for youth. The talent is ready. What is missing is a practical path from no digital skills to paid AI work. BAARA — the AI Institute of Mali — builds that path in Bamako.": "Sɛtanburu 2026 la, Mali ye CIAR-Mali yɔrɔ kura da wuli. Hakilitigiw bɛ yen. Min man kan, o ye sira ye kabini ordinatɛri dɔnbaliya fo baara saraɲuman sɔrɔli. BAARA — Mali IA Kalanso — bɛ o sira de dabɔ Bamakɔ.",
  "70% Hands-On, Practical Learning": "Waati 70% Baara Lakika",
  "Teaching in French with Bambara support using real Malian market datasets.": "Kalan bɛ kɛ Faransikan na ni Bamanankan dɛmɛ ye Mali sugu sɔngɔw kunnafoni kan.",
  "Dedicated Support for Women Learners": "Dɛmɛ Muso Kalandenw Ye",
  "Scholarships, transport allowances, and shared solar-backed laptops.": "Dɛmɛsaraw, taa-ni-kɔ saraw, ni tle-fanga ordinatɛriw.",
  "Explore the 4 Learning Tracks": "Kalan Sira Naani Kɔrɔsi",
  "Explore the 4 Tracks": "Kalan Sira 4 Kɔrɔsi",
  "The Program • 4 Stackable Tracks": "Kalan Sira Naani (4 Tracks)",
  "Four Tracks. Each One Ends in Paid Work.": "Kalan Sira Naani. U Bɛɛ Bɛ Taa Baara Saraɲuman Na.",
  "Learners exit into paid employment after any track with a verified portfolio, or pass an assessment to stack into the next level.": "Kalandenw bɛ se ka tila kalan sira o sira kɔfɛ ni baara dɔnko ye, walima k'u kɔrɔsi ka taa kalan sira nata la.",
  "Digital & Data Foundations": "Kunuŋɔ & Kalanden Kunnafoni Dabɔli",
  "Weeks 1–6 • Typing, Spreadsheets, AI Literacy": "Dɔgɔkun 1–6 • Sɛbɛnnikɛ, Kalandew, IA Dabɔli",
  "Build keyboard fluency, spreadsheet literacy, computer operation, and basic AI prompting from zero prior computer experience.": "Klawiye dɔn, kalandew kalan, ordinatɛri baara, ni IA kumasen fɔlɔw kalan kabini dɔnbaliya fɔlɔ.",
  "Exit: Data Entry, Office Assistant": "Bilasira: Kunnafoni Sɛbɛnbaga, Biro Dɛmɛbaga",
  "Applied AI for Work": "IA Waleyali Baara Kɔnɔ",
  "Weeks 7–16 • Audio, Text Annotation & RLHF": "Dɔgɔkun 7–16 • Kankan, Sɛbɛn Labɛn & RLHF",
  "Annotate audio in Bambara and French, structure datasets, verify model outputs, and assist local business data entry.": "Kankan labɛn Bamanankan ni Faransikan na, kunnafoniw maracogo kalan, filiw ban, ka jago baarasow dɛmɛ.",
  "Exit: Data Specialist, RLHF Annotator": "Bilasira: Kunnafoni Dɔnbaga, RLHF Sɛbɛnbaga",
  "Python & Machine Learning": "Python & Masiri-Kalan (Machine Learning)",
  "Weeks 17–32 • Programming, ML & Local Models": "Dɔgɔkun 17–32 • Kodi Sɛbɛn, ML & So Modɛliw",
  "Write clean Python, fine-tune open-source models, deploy offline LLMs, and build local software solutions.": "Python sɛbɛn kɛnɛma, IA modɛliw ladon, LLM bila so kɔnɔ, ka porogaramuw dilan Mali ye.",
  "Exit: Junior AI Developer, ML Associate": "Bilasira: IA Dilanbaga Kura, ML Baarakɛla",
  "Bambara NLP Lab": "Bamanankan NLP Labo",
  "24-Week Paid Fellowship • Research & Studio": "Dɔgɔkun 24 Bolodali ni Sara Ye • Ɲinini & Studio",
  "Join our research team curating Bambara language datasets, building local voice models, and delivering client prototypes.": "An ka ɲinini kulu don ka Bamanankan kunnafoniw labɛn, kankan modɛliw dilan, ka minɛnw di jagokɛlaw ma.",
  "Exit: Research Fellow, Applied AI Engineer": "Bilasira: Ɲinini Bolodala, IA Inzeniyɛri",
  "Global Opportunities • Remote Technical Work": "Duniya Nafa • Yɔrɔ-Jan Baaraw",
  "Prominent Remote & Global AI Jobs Our Graduates Can Perform": "Duniya Ni Yɔrɔ-Jana IA Baara Minnu Kalandenw Bɛ Se Ka Kɛ",
  "Through premier AI hiring networks such as": "Duniya IA baara ɲinini kulu baaw fɛ i n'a fɔ",
  ", leading global technology enterprises recruit technical talent. Here are prominent roles our Track 1–4 graduates are prepared to compete for:": ", duniya teknolɔki baaratigiw bɛ baarakɛla ɲumanw ɲini. Yan ye baara dɔw ye an ka kalandenw labɛnnen bɛ minnu kama:",
  "AI Safety & LLM Evaluation Specialist": "IA Lakana & LLM Kɔrɔsibaga",
  "Global Frontier AI Networks": "Duniya IA Sira Kuntigiw",
  " –  / hr": "20 $ – 35 $ / lɛrɛ",
  "Audit, score, and red-team frontier LLM outputs for safety, factuality, and hallucination reduction. Annotate complex reinforcement learning from human feedback (RLHF) datasets.": "IA kumasenw kɔrɔsi, nɛmɛnɛmɛ, ka filiw ban lakana ni tilennenya kama. RLHF kunnafoni gɛlɛnw labɛn hadamadenw ka ladili fɛ.",
  "Tracks 2 & 3 • Prompt Engineering • RLHF Auditing • Data Annotation": "Kalan Sira 2 & 3 • Prompt Engineering • RLHF Kɔrɔsili • Kunnafoni Sɛbɛnli",
  "African Language AI & Speech Annotator": "Farafinna Kanw IA & Kankan Sɛbɛnbaga",
  "Remote Data & Speech Labs": "Yɔrɔ-Jan Kunnafoni & Kankan Labow",
  "Curate, align, and transcribe West African language speech and text datasets. Benchmark acoustic models in Bambara and French for global frontier foundation models and voice systems.": "Tlebi-Farafinna kanw kankan ni sɛbɛn kumasenw labɛn ka kɛ kelen ye. Bamanankan ni Faransikan kankan modɛliw kɔrɔsi duniya IA kuntigiw ye.",
  "Tracks 2 & 4 • Bambara/French Bilingual • Speech Alignment • Multilingual Evaluation": "Kalan Sira 2 & 4 • Bamanankan/Faransikan • Kankan Kɛrɛfɛli • Kan Caaman Kɔrɔsili",
  "Python & Open-Source AI Integration Engineer": "Python & IA Kɛnɛkan Inzeniyɛri",
  "Global AI Engineering Platforms": "Duniya IA Inzeniyɛri Sira",
  "Build end-to-end data pipelines, fine-tune open-source models (Hugging Face / PyTorch), and integrate offline-first inference APIs for enterprise workflows.": "Kunnafoni sira bɛɛ dilan, IA modɛliw ladon (Hugging Face / PyTorch), ka kɔnpitɛri minɛnw don baarasow kɔnɔ.",
  "Tracks 3 & 4 • Python / PyTorch • Hugging Face • Local Inference Deployment": "Kalan Sira 3 & 4 • Python / PyTorch • Hugging Face • So Kɔnɔ Modɛli Kɛli",
  "Applied AI Capstone & Workflow Builder": "IA Waleyali & Baarakɛcogo Dilanbaga",
  "Enterprise Remote Studios": "Duniya Baaraso Yɔrɔ-Janw",
  "Design, test, and deploy customized AI automation pipelines, multilingual customer support agents, and edge-deployable voice tools for international and African clients.": "IA baara-yɛrɛ-kɛlaw dilan, jamana wɛrɛw dɛmɛkɛlaw kan caaman na, ni kankan minɛnw Farafinna ni duniya jagokɛlaw ye.",
  "Tracks 3 & 4 • LangChain • Local LLMs • Full-Stack AI Prototypes": "Kalan Sira 3 & 4 • LangChain • So Kɔnɔ IA • Modɛli Lakika Dilanli",
  "Explore Remote Roles on Mercor": "Mercor Kan Yɔrɔ-Jan Baaraw Ye",
  "Opens official referral portal in a new tab": "A bɛ bolodalan kura dayɛlɛ tab kura kɔnɔ",
  "Apply / Explore on Mercor": "Mercor Kan Baara Ɲini",
  "Our Model • Five-Step Thesis": "An Ka Sira • Sira Duuru Dalilu",
  "From a 2027 Pilot Cohort to 300 Learners a Year in 2028: Our Model Explained.": "Kabini Kalan Fɔlɔ 2027 Fo Kalanden 300 San O San 2028: An Ka Sira Kɔrɔfɔlen.",
  "01 Ground in Reality": "01 Kɛ Yan Fɛɛnw Na",
  "02 Job-First Ladder": "02 Baara Sira Kuntigi",
  "03 African Language AI": "03 Farafinna Kanw IA",
  "04 Resilient Infrastructure": "04 Minɛn Sabatilenw",
  "05 Open Governance": "05 Kuntigiya Lakika",
  "01 Why Now: Mali in Focus": "01 Mun Na Sisan: Mali Kɔnɔ",
  "02 The 4-Track School Model": "02 Kalan Sira Naani Kalanso",
  "03 Solar & Offline Campus": "03 Tle-Fanga & Kunuŋɔ Kalanso",
  "04 2027–2028 Cohort Roadmap": "04 San 2027–2028 Taabolo",
  "Start with real jobs and real Malian datasets, not imported hype.": "Daminɛ ni baara lakika ni Mali kunnafoniw ye, janfa tɛ.",
  "Every track ends in a verified portfolio and a paid job exit.": "Kalan sira kelen-kelen bɛɛ bɛ laban portfolio sɛbɛnnen ni baara saraɲuman na.",
  "Building Bambara speech and NLP models that serve the 80%+ who speak it.": "Bamanankan kankan ni NLP modɛliw dilan min bɛ mɔgɔ 80%+ minɛ.",
  "Solar-powered, offline-capable campus built for Bamako's conditions.": "Tle-fanga ni kunuŋɔ-kɔkan kalanso dilannen Bamakɔ cogoya ye.",
  "Open datasets, transparent milestones, and accountable reporting.": "Kunnafoni lakikaw, taabolo gbɛlɛnw, ni kunnafoni marali bɛɛ ɲɛna.",
  "Why a Bambara Lab • Open Malian AI": "Mun Na Bamanankan Labo • Mali IA Lakika",
  "Inside the Bambara NLP Lab: AI in the Language Most Malians Speak Every Day": "Bamanankan NLP Labo Kɔnɔna: IA Kan Na Min Mali Mɔgɔ Caaman Bɛ Fɔ Don O Don",
  "01 Maternal Health Voice AI": "01 Musow Kɛnɛya Kankan IA",
  "02 Agricultural Voice Advisory": "02 Sɛnɛkɛ Kankan Ladili",
  "03 Administrative Form Reader": "03 Sɛbɛnw Kalan Kankan",
  "Maternal Healthcare Voice Assistant in Bambara": "Musow Kɛnɛya Kankan Dɛmɛbaga Bamanankan Na",
  "Voice Farm Advisory for Rural Mali": "Sɛnɛkɛ Kankan Ladili Mali Dugumɔgɔw Ye",
  "Reading Public Administrative Forms Aloud": "Jamana Sɛbɛnw Kalan Kankan Bamanankan Na",
  "Spoken prenatal and infant care advice in Bambara for mothers who may not read French.": "Musow kɛnɛya ni denmisɛnw ladili kankan Bamanankan na musow ye minnu tɛ Faransikan kalan.",
  "Spoken crop, weather, and market advice delivered over basic mobile phones.": "Sɛnɛfɛnw, sanji, ni sugu sɔngɔ ladili kankan tilalen telefɔni dɔɔninw kan.",
  "Reading official notices, certificates, and forms aloud in Bambara.": "Kibaru sɛbɛnw, wolosɛbɛnw, ni sɛbɛn gɛlɛnw kalan kankan Bamanankan na.",
  "Fund This Lab Track": "Nin Labo Sira Dɛmɛ",
  "Partner on Open Datasets": "Kunnafoni Kɛnɛkanw Kan Jɛ",
  "Explore Fellowship": "Bolodali Kɔrɔsi",
  "Resilient Campus Engineering": "Kalanso Minɛn Sabatilenw",
  "Solar-First. Offline-Ready. Engineered for Uninterrupted Learning in Bamako.": "Tle-Fanga Fɔlɔ. Kunuŋɔ-Kɔkan. Dilanbaara Bamakɔ Kalan Bato Balo Ye.",
  "Uninterrupted Power: Solar-First Classroom": "Kuran Tila Tɛ: Tle-Fanga Kalanso",
  "Offline-First Local Server Infrastructure": "Kunuŋɔ-Kɔkan So Sɛrwɛri Minɛnw",
  "Hands-On Lab With Shared Solar Laptops": "Baarakɛ Kalanso ni Tle-Fanga Ordinatɛriw Ye",
  "Solar panels and battery storage keep classrooms powered through grid outages.": "Tle-fanga panow ni batri storage bɛ kalanso mara kɛnɛ ma kuran bɔ tuman bɛɛ.",
  "Local server caches store all course materials, datasets, and documentation offline.": "So sɛrwɛri bɛ kalan sɛbɛnw, kunnafoniw, ni sɛbɛnbaw mara kunuŋɔ kɔkan.",
  "Laptops shared among learners, maintained on-site with solar charging carts.": "Ordinatɛriw tlapalen bɛ kalandenw cɛ, ka labɛn so kɔnɔ tle-fanga fɛ.",
  "Open Research & Ecosystem Pillars": "Ɲinini Lakika & Jɛkulu Saraw",
  "Built With Malian Researchers, Universities, and Local Employers.": "Mali Ɲinikɛlaw, Iniwɛrisitew ni Baaratigiw Ye Jɛ Ka Dilan.",
  "Open Malian AI Datasets": "Mali IA Kunnafoni Kɛnɛkanw",
  "Bambara–French sentence pairs and community speech corpora released openly for research.": "Bamanankan–Faransikan kumasenw ni kankan kunnafoniw dilen bɛ duniya ma ɲinini kama.",
  "Academic Mentorship & University Linkages": "Kalan Ladili & Iniwɛrisite Jɛɲɔgɔnya",
  "Joint curriculum review, research ethics oversight, and university faculty advisory.": "Kalan sira kɔrɔsili jɛ fɛ, sariya kɔrɔsi, ni iniwɛrisite karamɔgɔw ka ladili.",
  "Pan-African NLP Network": "Farafinna NLP Kulu",
  "Collaborating with open-source African NLP communities across West Africa.": "Baara kɛli ni Farafinna NLP kuluw ye Tlebi-Farafinna bɛɛ kɔnɔ.",
  "Local Employer Studio Alliances": "Mali Baaratigi Studio Jɛkulu",
  "Direct pipeline for supervised learner internships and technical project delivery.": "Sira kelenpe kalandenw ka stazi ni teknolɔki baara waleyali kama.",
  "Execution Roadmap 2027–2028": "Baara Taabolo 2027–2028",
  "Four Quality Milestones From Curriculum Alignment to Full Scale.": "Kalan Taabolo Naani Kabini Daminɛ Fo Baara Baa.",
  "Phase 1: Curriculum & Partner Alignment": "Kɛlɛkolo 1: Kalan Sira & Jɛɲɔgɔn Labɛn",
  "Phase 2: Facility & Solar Setup": "Kɛlɛkolo 2: Kalanso & Tle-Fanga Sigili",
  "Phase 3: Pilot Cohort (88 Learners)": "Kɛlɛkolo 3: Kalan Fɔlɔ (Kalanden 88)",
  "Phase 4: Full Scale (250–300 Learners/Year)": "Kalan 4: Kalanso Baa (Kalanden 250–300/San)",
  "Impact & Open Access Charter": "Nafa & Kɛnɛkan Sariya",
  "Quarterly Reporting on 6 Clear Indicators & Open Public Releases": "Kalo Saba O Saba Kunnafoni Sɛbɛn 6 & Duniya Kɛnɛkan Labow",
  "Scholarships, Lab Fellowships & Employer Partnerships": "Dɛmɛsaraw, Labo Bolodaw & Baaratigi Jɛɲɔgɔnya",
  "Sponsor a Scholar, Support the Bambara NLP Lab, or Partner on Applied AI.": "Kalanden Dɛmɛ, Bamanankan NLP Labo Sinsin, Walima Kalandenw Bila Baara La.",
  "Named Learner Scholarship": "Kalanden Dɛmɛsara Tɔgɔlan",
  ",500": "1 500 $",
  "Full path from first laptop lesson to paid work": "Sira bɛɛ kabini ordinatɛri kalan fɔlɔ fo baara saraɲuman",
  "1 Named Malian Scholar (50% Women Target)": "Mali Kalanden 1 Tɔgɔlan (Muso 50% Kuntigi)",
  "Covers Tuition Across Foundational & Applied Tracks": "Kalan Sara Bɛɛ Bɛ Sɔrɔ Kalan Sira Bɛɛ Kɔnɔ",
  "Includes Learner Stipend & Bamako Transport": "Kalanden Dɛmɛsara & Bamakɔ Taa-ni-Kɔ Sara Sen B'a La",
  "Shared Solar-Backed Laptop & Offline Server Access": "Tle-Fanga Ordinatɛri & Kunuŋɔ-Kɔkan Sɛrwɛri Di",
  "Mentor Code Reviews & Employer Job Placement": "Karamɔgɔ ka Kodi Kɔrɔsili & Baara Sɔrɔli",
  "Quarterly 6-Indicator Impact Report to Sponsor": "Kalo Saba O Saba Kunnafoni Sɛbɛn 6 Dɛmɛbaga Ye",
  "Sponsor a Learner": "Kalanden Dɛmɛ",
  "Bambara NLP Lab & Campus Partner": "Bamanankan NLP Labo & Kalanso Jɛɲɔgɔn",
  "Lab & Tech": "Labo & Teknolɔki",
  "Fellowships, open datasets & resilient campus equipment": "Bolodaw, kunnafoni kɛnɛkanw & kalanso minɛnw",
  "Sponsor 24-Week Bambara NLP Lab Research Fellows": "Dɔgɔkun 24 Bamanankan NLP Labo Ɲinikɛlaw Dɛmɛ",
  "Support Community Speech & Translation Data Collection": "Kankan & Bayelema Kunnafoni Labɛnli Dɛmɛ",
  "Contribute Laptops, Local Offline Servers, or GPU Credits": "Ordinatɛriw, Kunuŋɔ Sɛrwɛriw, walima GPU Fanga Di",
  "Support Solar-First Classroom Power & Connectivity": "Tle-Fanga Kalanso Kuran & Kunuŋɔ Dɛmɛ",
  "100% Open-Source Releases With Contributor Attribution": "100% Porogaramu Kɛnɛkanw Dilen ni Tɔgɔ Sɛbɛnni Ye",
  "Quarterly Impact & Open-Access Benchmark Reports": "Kalo Saba O Saba Nafa & Kɔrɔsili Sɛbɛnw",
  "Partner With the Lab": "Labo Fɛ Jɛ",
  "Employer & Applied AI Studio": "Baaratigi & IA Studio",
  "Hire & Build": "Bila Baara La & Dilan",
  "Internships, graduate hiring & custom French/Bambara AI": "Staziw, kalandenw bilasira baara la & IA Bamanankan/Faransikan",
  "Hire Track 1–4 Graduates for Data, AI & ML Roles": "Kalan Sira 1–4 Kalandenw Bila Kunnafoni, IA & ML Baaraw La",
  "Host Supervised Learner Internships in Bamako": "Kalandenw Ka Staziw Ladon Bamakɔ",
  "Commission Applied AI Studio Projects for Your Organization": "IA Baara Waleyalenw Dilan I Ka Baaraso Ye",
  "Custom French & Bambara Voice/Text Workflow Prototypes": "Faransikan & Bamanankan Kankan/Sɛbɛn Minɛnw Dilan",
  "Co-Design Real-World Capstone Datasets With Faculty": "Kunnafoni Lakikaw Labɛn Karamɔgɔw Fɛ",
  "Direct Access to Annual Cohort Demo Days": "San O San Kalandenw Ka Baara Jirali Donw Kɔrɔsi",
  "Partner as an Employer": "Kɛ Baaratigi Jɛɲɔgɔn Ye",
  "The Founding Team & Advisors": "Kalandaso Dabɔbagaw & Ladilikɛlaw",
  "Malian Leadership Building Bamako's Job-First AI Institute.": "Mali Kuntigiw Bɛ Bamakɔ IA Kalanso Sinsin Baara Saraɲuman Kan.",
  "Abdel R Traoré": "Abdel R Traoré",
  "Co-founder, Senior Systems Engineer": "Dabɔbaga, Masiri Inzeniyɛri Kuntigi",
  "Leads institutional strategy, milestone governance, campus infrastructure engineering, and international partnerships for BAARA — the AI Institute of Mali — connecting global technology and scholarship partners with Malian youth and employers.": "A bɛ BAARA kuntigiya, kalanso sabatili inzeniyɛri, ni duniya jɛɲɔgɔnya ɲɛminɛ — ka duniya teknolɔki jɛɲɔgɔnw ni dɛmɛsaraw ladi Mali denmisɛnw ni baaratigiw ma.",
  "Systems Engineering & Resilient Infrastructure": "Masiri Inzeniyɛri & Minɛn Sabatilenw",
  "Institutional Strategy & Partner Governance": "Kuntigiya Sira & Jɛɲɔgɔnya Sariya",
  "First Cohort Launch": "Kalan Fɔlɔ Wulili",
  "Samba Gueye": "Samba Gueye",
  "Co-founder, MBA, Senior Manager": "Dabɔbaga, MBA, Ɲɛminɛbaga Kuntigi",
  "Architects the four job-first learning tracks (from Digital Foundations to Python/ML and the 24-week Bambara NLP Lab) and designs the offline-first campus server caches so learners code and train models without interruption.": "A ye kalan sira naani dabɔ (kabini Kunuŋɔ Dabɔli fo Python/ML ni dɔgɔkun 24 Bamanankan NLP Labo) ka kalanso sɛrwɛriw dilan walasa kalandenw ka kodi bila tila t'a la.",
  "Applied AI, Python/ML & Curriculum Design": "IA Waleyali, Python/ML & Kalan Sira Dilanli",
  "Offline Server & Local LLM/ASR Deployment": "Kunuŋɔ Sɛrwɛri & LLM/ASR So Kɔnɔ Sigili",
  "70% Hands-On Projects": "Waati 70% Baara Lakika",
  "Cheick Kanté": "Cheick Kanté",
  "Co-Founder, Health Care Program Director": "Dabɔbaga, Kɛnɛya Kalan Kuntigi",
  "Directs healthcare AI programs and clinical partnerships in Mali — spearheading maternal health voice AI, local medical dataset curation, and hospital/clinic collaborations across Bamako and regional health centers.": "A bɛ kɛnɛya IA porogaramuw ni dɔgɔtɔrɔso jɛkuluw ɲɛminɛ Mali kɔnɔ — musow kɛnɛya kankan IA, Mali dɔgɔtɔrɔso kunnafoniw labɛn, ni Bamakɔ kɛnɛyasow jɛɲɔgɔnya.",
  "Healthcare AI Programs & Clinical Pilots": "Kɛnɛya IA Porogaramuw & Dɔgɔtɔrɔso Baaraw",
  "Medical Dataset Alliances & Hospital Partnerships": "Kɛnɛya Kunnafoni Jɛkulu & Dɔgɔtɔrɔso Jɛɲɔgɔnya",
  "Clinical AI": "Dɔgɔtɔrɔso IA",
  "Health Care Program Direction": "Kɛnɛya Porogaramu Ɲɛminɛbaga",
  "Sira Koné": "Sira Koné",
  "Program Advisor in Mali": "Mali Kalan Ladilikɛla",
  "Leads relationships with Malian employers, NGOs, universities, and community organizations in Bamako — ensuring 50% women learner participation and connecting graduates directly to internships, studio contracts, and paid jobs.": "A bɛ Mali baaratigiw, NGO-w, iniwɛrisitew, ni Bamakɔ somɔgɔ kuluw jɛɲɔgɔnya ɲɛminɛ — ka muso 50% hakɛ sabati ka kalandenw bila stazi, studio, ni baara saraɲuman na.",
  "Employer Placement & Mali Ecosystem Alliances": "Baara Sɔrɔli & Mali Jɛkulu Jɛɲɔgɔnya",
  "Youth & Women Outreach (50% Target)": "Denmisɛnw & Musow Sɔrɔli (Muso 50% Kuntigi)",
  "Women Learners Target": "Muso Kalandenw Hakɛ",
  "Take Part in the 2027 Cohort": "Boloda Kɛ Kalan Kura 2027 Kɔnɔ",
  "Whether you want to sponsor a learner (,500), support the Bambara NLP Lab, contribute hardware/cloud credits, hire graduates, or apply as a learner, send an inquiry below.": "Ni i b'a fɛ ka kalanden dɛmɛ (1 500 $), Bamanankan NLP Labo dɛmɛ, ordinatɛri di, kalandenw bila baara la, walima ka kɛ kalanden ye, i ka ɲiningali ci duguma.",
  "Send Inquiry": "Ɲiningali Ci",
  "Institutional Briefs & Bambara NLP Lab Publications": "Jamana Kunnafoni Sɛbɛnw & Bamanankan NLP Labo Labow",
  "From Zero Digital Skills to Paid AI Work: Inside Our 4-Track Model": "Kabini Dɔnbaliya Fo IA Baara Saraɲuman: An Ka Kalan Sira Naani Kɔnɔna",
  "From Zero Digital Skills to Paid AI Work: Inside Our 4-Track Job-First Model in Bamako.": "Kabini Dɔnbaliya Fo IA Baara Saraɲuman: An Ka Kalan Sira Naani Bamakɔ.",
  "Bambara NLP Lab: 47,000 Sentence Pairs & Speech Benchmarks for Mali": "Bamanankan NLP Labo: Kumasen 47 000 & Mali Kankan Sɛbɛnba",
  "Building on MALIBA-AI & Bayelemabaga: Open Bambara Voice AI for Health & Farming.": "MALIBA-AI & Bayelemabaga Sinsinli: Bamanankan Kankan IA Kɛnɛya & Sɛnɛkɛ Ye.",
  "Sahel Resilience Engineering: Solar-First Power & Offline Servers in Bamako": "Sahel Sabatili Inzeniyɛri: Tle-Fanga & Kunuŋɔ Sɛrwɛriw Bamakɔ",
  "Engineered for Bamako: How Solar-First Power and Local Server Caches Keep Class Running.": "Dilanbaara Bamakɔ Ye: Tle-Fanga ni Kunuŋɔ Sɛrwɛriw bɛ Kalan Mara Cogoya Min.",
  "Stay Updated on Cohort 1 & Bambara NLP Releases": "Kalan 1 & Bamanankan NLP Labo Kibaru Sɔrɔ",
  "Subscribe for quarterly milestone reports, open dataset releases, and demo day invitations.": "I tɔgɔ sɛbɛn kalo saba kunnafoni sɛbɛnw, kunnafoni kura, ni demo day weleli sɔrɔli ye.",
  "Subscribe": "Tɔgɔ Sɛbɛn",
  "BAARA — AI Institute of Mali": "BAARA — Mali IA Kalanso",
  "Job-first AI education and an open Bambara NLP Lab in Bamako, engineered with solar-first power and resilient offline servers.": "Baara-daminɛ IA kalan ni Bamanankan NLP Labo kɛnɛkan Bamakɔ, dilanbaara tle-fanga ni kunuŋɔ sɛrwɛri sabatilenw ye.",
  "All rights reserved.": "Hakɛ bɛɛ mara bɛ yen.",
  "Privacy & Governance": "Gundolakan & Kuntigiya",
  "See Campus Architecture": "Kalanso Cogoya Filɛ",
  "Our Model & Impact": "An Ka Sira & Nafa",
  "Track 1: Digital & Data (8 wks)": "Kalan Sira 1: Kunuŋɔ & Donew (Dɔgɔkun 8)",
  "Track 2: Applied AI for Work (6 wks)": "Kalan Sira 2: IA Waleyali Baara Kɔnɔ (Dɔgɔkun 6)",
  "Track 3: Python & ML (16 wks)": "Kalan Sira 3: Python & ML (Dɔgɔkun 16)",
  "Track 4: Bambara NLP Lab (24 wks)": "Kalan Sira 4: Bamanankan NLP Labo (Dɔgɔkun 24)",
  "Sponsor a Scholar (,500)": "Kalanden Dɛmɛ (1 500 $)",
  "Ways to Partner & Sponsor": "Jɛɲɔgɔnya & Dɛmɛ Siraw",
  "Malian Youth,": "Mali Denmisɛnw,",
  "Building AI In Their": "Bɛ IA Dilan U Yɛrɛ Ka",
  "Own Languages.": "Kanw Na.",
  "✦ Interagir (Tap)": "✦ Kuma (Tap)",
  "BAMBARA": "BAMANANKAN",
  "FRANÇAIS": "FRANÇAIS",
  "ENGLISH": "ENGLISH",
  "Learners start where they are. They can exit into employment after any track with a verified portfolio, or pass the exit gate to advance to the next track.": "Kalandenw bɛ daminɛ u bɛ yɔrɔ min. U bɛ se ka tila kalan sira o sira kɔfɛ ni baara dɔnko ye, walima k'u kɔrɔsi ka taa kalan sira nata la.",
  "Track 1 • 8 Weeks • Start Here": "Kalan Sira 1 • Dɔgɔkun 8 • Daminɛ Yan",
  "Use a laptop, spreadsheets, and real local data: market prices, rainfall, and clinic visits. Builds foundational digital fluency from zero prior computer experience.": "Ordinatɛri, kalandew, ni Mali sugu sɔngɔw, sanji, ni kɛnɛyaso donew kalan. Dɔnko minɛnw, klabu, ni kunnafoni maracogo dɔn.",
  "↳ Exit to: Data Entry, Office Assistant": "↳ Bilasira: Kunnafoni Sɛbɛnbaga, Biro Dɛmɛbaga",
  "Track 2 • 6 Weeks • Then": "Kalan Sira 2 • Dɔgɔkun 6 • O Kɔfɛ",
  "Write structured prompts, audit AI output for errors and hallucinations, and use AI workflows for business reports, French/Bambara translation, and customer messages.": "Kumasen dɔnlenw sɛbɛn, IA filiw kɔrɔsi, ka jago baara waleya: rapɔri, Bamanankan/Faransikan bayelema, ni jagokɛla batakiw.",
  "↳ Exit to: AI-Assisted Admin, Content, Support": "↳ Bilasira: IA Biro Baarakɛla, Kunnafoni Sɛbɛnbaga, Dɛmɛbaga",
  "Track 3 • 16 Weeks • Go Deeper": "Kalan Sira 3 • Dɔgɔkun 16 • Taa Ɲɛ",
  "Master Python, data analysis, Git, and machine learning engineering — culminating in a supervised capstone model built and evaluated on a real Malian dataset.": "Python, kunnafoni kɔrɔsili, Git, ni masiri-kalan baara kɛ — ka laban capstone modɛli kɔrɔsilen na Mali kunnafoni lakika kan.",
  "↳ Exit to: Junior Data Analyst, Junior ML Developer": "↳ Bilasira: Kunnafoni Kɔrɔsibaga Kura, ML Dilanbaga Kura",
  "Track 4 • 24-Week Fellowship": "Kalan Sira 4 • Dɔgɔkun 24 Bolodali",
  "Collect Bambara speech and text, train speech recognition (ASR) and translation models, and publish open datasets and weights under public licenses with contributor credit.": "Bamanankan kankan ni sɛbɛn kumasenw labɛn, kankan dɔnni (ASR) ni bayelema modɛliw kalan, ka kunnafoniw di duniya ma gbansan ni tɔgɔ sɛbɛnni ye.",
  "↳ Exit to: NLP Engineer, Research Assistant": "↳ Bilasira: NLP Inzeniyɛri, Ɲinini Dɛmɛbaga",
  "Most AI tools do not work well in Bambara. Our 24-week fellowship builds on open work by Malian researchers: the": "IA minɛn caaman tɛ baara ɲuman kɛ Bamanankan na. An ka dɔgɔkun 24 bolodali bɛ sinsin Mali ɲinikɛlaw ka baara kɛnɛkan kan:",
  "speech benchmark and the": "kankan sɛbɛnba ni",
  "dataset of": "kunnafoni",
  "47,000 Bambara–French sentence pairs": "Bamanankan–Faransikan kumasen 47 000",
  ". Every dataset and model is released openly under public licenses, with credit to each Malian contributor.": ". Kunnafoni ni modɛli bɛɛ bɛ di duniya ma gbansan, ni tɔgɔ sɛbɛnni ye Mali baarakɛla bɛɛ ye.",
  "First Use Case 01 — Public & Community Health:": "Baara Fɔlɔ 01 — Jama & Sigida Kɛnɛya:",
  "Verified public health information in spoken Bambara": "Jama kɛnɛya kunnafoni lakanalenw Bamanankan kumasenw na",
  "Fellows work with health partners to train speech and translation models. Families and community health workers can then hear verified guidance on prevention, screening, and maternal care in Bambara.": "Bolodalaw bɛ baara kɛ ni kɛnɛya jɛɲɔgɔnw ye ka kankan dɔnni ni bayelema modɛliw kalan. O kɔfɛ, denbayaw ni sigida kɛnɛya baarakɛlaw bɛ se ka ladili lakanalenw mɛn Bamanankan na: bana kunbɛnni, bana sɛgɛsɛgɛli ani musow kɛnɛya.",
  "First Use Case 02 — Voice Farm Advice:": "Baara Filanan 02 — Sɛnɛkɛ Kankan Ladili:",
  "Spoken Bambara weather, soil & market price advisory for rural farmers": "Bamanankan kankan na sanji, dugukolo & sugu sɔngɔ ladili sɛnɛkɛlaw ye",
  "Built on MALIBA-AI and Bayelemabaga (47,000 Bambara–French sentence pairs), delivering voice-first agricultural advice, rainfall alerts, and local market prices over low-bandwidth mobile links.": "Sinsinnen MALIBA-AI ni Bayelemabaga kan (kumasen 47 000), ka sɛnɛkɛ ladili, sanji kibaru, ni sugu sɔngɔw di kankan fɛ telefɔni dɔɔninw kan.",
  "First Use Case 03 — Civic Access by Voice:": "Baara Sabanan 03 — Jamana Sɛbɛnw Kankan:",
  "Government & administrative forms read aloud in Bambara": "Jamana & faaba sɛbɛnw kalan kankan Bamanankan na",
  "Bridging the literacy divide by reading official French administrative forms aloud in natural Bambara and helping citizens complete essential public records accurately.": "Kalan dɔnbaliya ban ka jamana Faransikan sɛbɛnw kalan kankan Bamanankan kɛnɛma na walasa dugumɔgɔw ka u ka sɛbɛnbaw dafa tilennenya la.",
  "AI Institute of Mali": "Mali IA Kalanso",
  "300 Learners / Year": "Kalanden 300 / San",
  "47,000 Sentence Pairs": "Kumasen 47 000",
  "50% Women Target": "Muso 50% Kuntigi",
  "Solar-First Campus": "Tle-Fanga Kalanso",
  "Offline Server Caches": "Kunuŋɔ Sɛrwɛriw",
  "4 Job-Ready Tracks": "Kalan Sira 4 Baara Ye",
  "French & Bambara Instruction": "Faransikan & Bamanankan Kalan",
  "Of class time is hands-on project work!": "Kalan waati bɛ kɛ baara lakika ye!",
  "HOW WE OPERATE • CAMPUS INFRASTRUCTURE": "AN KA BAARAKƐCOGO • KALANSO MINƐNW",
  "Engineered for Bamako. Designed for Uninterrupted Learning.": "Dilanbaara Bamakɔ Ye. Kalan Bɛ Tila Tɛ.",
  "Reliable power and fast local access to datasets, coding tools, and AI models are essential for daily hands-on engineering. Our Bamako campus is engineered from the ground up to keep classes, coding labs, and model training running smoothly every day.": "Kuran sabatilen ni kunnafoniw, kodi minɛnw, ni IA modɛliw sɔrɔli so kɔnɔ, o de bɛ baara lakika to a kɛnɛ ma don o don. An ka Bamakɔ kalanso dilannen bɛ kabini a daminɛ walasa kalan, kodi labow, ni modɛli kalan ka tila tɛ.",
  "Learners / Year from 2028 (88 in 2027 Pilot)": "Kalandenw / San kabini 2028 (88 san 2027 kɔnɔ)",
  "1. Solar-First Campus Power": "1. Tle-Fanga Kalanso Kuran",
  "Solar panels and battery banks serve as our primary campus power source, keeping classrooms, servers, and shared laptops running continuously.": "Tle-fanga panow ni batri storage bɛ kalanso mara kɛnɛ ma, ka kalansow, sɛrwɛriw, ni ordinatɛriw to baara la tuma bɛɛ.",
  "2. Offline-Ready Local Servers & Regional Sync": "2. Kunuŋɔ-Kɔkan Sɛrwɛriw & Jɛli",
  "On-campus servers cache video courses, Python libraries, documentation, and compact AI models for instant local access, backed by regional cloud synchronization.": "So sɛrwɛriw bɛ kalan wideyow, Python minɛnw, sɛbɛnw, ni IA modɛliw mara so kɔnɔ teliya la, ka jɛ ni klabu ye.",
  "3. Shared Solar-Backed Laptops": "3. Tle-Fanga Ordinatɛri Tlapalenw",
  "Students use campus-maintained laptops configured for low power consumption, offline coding environments, and verified open-source AI tooling.": "Kalandenw bɛ kalanso ordinatɛriw baara minnu tɛ kuran caaman don, kodi kɛ kunuŋɔ kɔkan, ni IA minɛn kɛnɛkanw ye.",
  "4. Open Technical Documentation & Public Licenses": "4. Kalan Sɛbɛnw & Kɛnɛkan Yamaruya",
  "All curriculum materials, student project guides, and local dataset tools are documented openly and released under public licenses for Mali and the Sahel.": "Kalan sɛbɛn bɛɛ, kalanden ka baara ɲɛmabilasiraw, ni kunnafoni minɛnw sɛbɛnnen bɛ kɛnɛkan Mali ni Sahel bɛɛ ye.",
  "Taught in French with Bambara support • Every phase verified by transparent impact indicators": "Kalan bɛ kɛ Faransikan na ni Bamanankan dɛmɛ ye • Kɛlɛkolo bɛɛ kɔrɔsilen bɛ nafa sɛbɛnw fɛ",
  "ECOSYSTEM & COLLABORATION PILLARS": "JƐKULU & JƐƝƆGƆNYA SARA KUNTIGI",
  "Built With Malian Researchers, Universities, and Local Employers": "Mali Ɲinikɛlaw, Iniwɛrisitew ni Baaratigiw Ye Jɛ Ka Dilan",
  "We collaborate across five ecosystem pillars to connect open Bambara language research, practical classroom training, and paid technical employment in Mali.": "An bɛ baara kɛ jɛkulu sara duuru kan walasa Bamanankan ɲinini, kalanso baara lakika, ni baara saraɲuman ka jɛ Mali kɔnɔ.",
  "· Building on 47,000 open Bambara–French sentence pairs and community speech benchmarks": "· Sinsinnen Bamanankan–Faransikan kumasen 47 000 & kankan sɛbɛnbaw kan",
  "Academic Links": "Iniwɛrisite Jɛɲɔgɔnya",
  "Universities & Faculty": "Iniwɛrisitew & Karamɔgɔw",
  "· Curriculum mentorship, research ethics review, and joint student capstone supervision": "· Kalan ladili, ɲinini sariya kɔrɔsi, ni kalandenw ka capstone baara jɛlenw",
  "African NLP Network": "Farafinna NLP Kulu",
  "West African Research": "Tlebi-Farafinna Ɲinini",
  "· Open-source datasets, speech recognition benchmarks, and public-license model releases": "· Kunnafoni kɛnɛkanw, kankan dɔnni kɔrɔsiw, ni modɛli dilenw duniya ma",
  "Campus Infrastructure": "Kalanso Minɛnw",
  "Compute & Hardware": "Kɔnpitɛri Fanga & Minɛnw",
  "· Shared laptops, offline local servers, solar power arrays, and GPU training credits": "· Ordinatɛri tlapalenw, kunuŋɔ sɛrwɛriw, tle-fanga panow, ni GPU fanga dɛmɛ",
  "Bamako Employers": "Bamakɔ Baaratigiw",
  "Hiring & Studio Partners": "Baara Sɔrɔ & Studio Jɛɲɔgɔnw",
  "· Agro-industry, clinics, NGOs, and businesses hosting internships and hiring graduates": "· Sɛnɛkɛ jago, dɔgɔtɔrsow, NGO-w, ni baarasow bɛ staziw di ka kalandenw bila baara la",
  "2027–2028 COHORT ROADMAP • BAMAKO": "SAN 2027–2028 KALANDENW KA TAABOLO • BAMAKƆ",
  "Every phase of our rollout is guided by verified learning outcomes, employer alignment, and open quarterly reporting.": "An ka taabolo kɛlɛkolo bɛɛ bɛ ɲɛminɛ kalan nafa lakika, baaratigiw ka haaju, ni kalo saba rapɔri kɛnɛkan fɛ.",
  "Phase 1: Align": "Kɛlɛkolo 1: Labɛn",
  "Jan–Mar 2027 • Employer needs, curriculum & learner outreach": "Zanwuye–Marsi 2027 • Baaratigiw haaju, kalan sira & kalandenw wele",
  "Phase 2 (Apr–Aug 2027): Campus setup, faculty & solar/offline lab": "Kɛlɛkolo 2 (Awirili–Ut 2027): Kalanso, karamɔgɔw & tle-fanga/kunuŋɔ labo",
  "Phase 3:": "Kɛlɛkolo 3:",
  "Pilot Cohort": "Kalan Fɔlɔ",
  "Sep 2027 – Mar 2028: 88 learners across all 4 tracks in Bamako": "Sɛtanburu 2027 – Marsi 2028: Kalanden 88 kalan sira 4 bɛɛ la Bamakɔ",
  "Verified 6-Indicator Review": "Nafa Kunnafoni 6 Kɔrɔsilen",
  "Phase 4: Full Launch": "Kɛlɛkolo 4: Kalanso Baa",
  "Apr–Dec 2028 • 300 learners/yr, growing each year": "Awirili–Desanburu 2028 • Kalanden 300/san, ka yiriwa san o san",
  "Every partner receives a concise quarterly report on six indicators: (1) Enrolment, (2) Completion, (3) Share of women learners, (4) Graduates in paid work, (5) Open datasets released, and (6) Applied AI studio projects delivered.": "Jɛɲɔgɔn bɛɛ bɛ kalo saba rapɔri sɔrɔ nafa kunnafoni 6 kan: (1) Kalanden donlenw, (2) Kalan banbagaw, (3) Muso kalandenw hakɛ, (4) Kalanden minnu bɛ baara saraɲuman na, (5) Kunnafoni kɛnɛkanw labolen, ni (6) IA studio baara waleyalenw.",
  "Quarterly Impact Commitment": "Kalo Saba Nafa Kuntigiya",
  "6 Verified Impact Indicators • Transparent Governance": "Nafa Kunnafoni 6 Kɔrɔsilen • Kuntigiya Lakika",
  "Building on MALIBA-AI and the Bayelemabaga dataset of 47,000 Bambara–French sentence pairs, every dataset and speech model trained in our Bambara NLP Lab is released under open public licenses with credit to each Malian contributor.": "Sinsinnen MALIBA-AI ni Bayelemabaga kumasen 47 000 kan, kunnafoni ni kankan modɛli bɛɛ min kalan Bamanankan NLP Labo kɔnɔ, bɛ di duniya ma gbansan ni tɔgɔ sɛbɛnni ye Mali baarakɛla bɛɛ ye.",
  "Bambara NLP Open-Access Charter": "Bamanankan NLP Duniya Kɛnɛkan Sariya",
  "Public Licenses & Contributor Attribution in Mali": "Duniya Yamaruya & Tɔgɔ Sɛbɛnni Mali Kɔnɔ",
  "Four Ways to Take Part": "Sira Naani Ka Boloda Kɛ",
  "Help Us Open the First Cohort in 2027.": "An Dɛmɛ Ka Kalan Fɔlɔ Daminɛ San 2027 Kɔnɔ.",
  "Sponsor a Learner ($1,500)": "Kalanden Dɛmɛ (1 500 $)",
  "A named scholarship gives one young Malian the full path from first laptop lesson to first paid work.": "Dɛmɛsara kelen bɛ Mali denmisɛn dɔ bila sira kan kabini ordinatɛri kalan fɔlɔ fo baara saraɲuman.",
  "Support the Bambara Lab": "Bamanankan Labo Dɛmɛ",
  "Support fellowships, data collection, and open AI models in Malian languages, released for everyone to use.": "Bolodaw, kunnafoni labɛnli, ni Mali kanw IA modɛliw dɛmɛ minnu bɛ di duniya ma gbansan.",
  "Give Technology (In-Kind)": "Teknolɔki Minɛnw Di (Minɛn Lakika)",
  "Cloud credits, laptops, GPU time, software, and course content keep learning running on and offline.": "Klabu fanga, ordinatɛriw, GPU waati, porogaramuw, ni kalan sɛbɛnw bɛ kalan to kɛnɛ ma kunuŋɔ la walima kɔkan.",
  "Hire & Partner (Employers)": "Bila Baara La & Jɛ (Baaratigiw)",
  "Bring client projects to our applied AI studio, offer internships, and hire our job-ready graduates.": "Baaraw ladi an ka IA studio ma, staziw di, ka an ka kalanden labɛnnenw bila baara la.",
  "Open Research & Tech": "Ɲinini Lakika & Teknolɔki",
  "Whether you want to sponsor a learner ($1,500), support the Bambara NLP Lab, contribute hardware/cloud credits, hire graduates, or apply as a learner, send an inquiry below.": "Ni i b'a fɛ ka kalanden dɛmɛ (1 500 $), Bamanankan NLP Labo dɛmɛ, ordinatɛri di, kalandenw bila baara la, walima ka kɛ kalanden ye, i ka ɲiningali ci duguma.",
  "01 — Sponsor a Learner ($1,500 Named Scholarship)": "01 — Kalanden Dɛmɛ (1 500 $ Dɛmɛsara Tɔgɔlan)",
  "02 — Support the Bambara NLP Lab & Fellowships": "02 — Bamanankan NLP Labo & Bolodaw Dɛmɛ",
  "03 — Give Technology (In-Kind Laptops / Cloud / GPU)": "03 — Teknolɔki Minɛnw Di (Ordinatɛri / Klabu / GPU)",
  "04 — Hire Graduates & Applied AI Studio Partner": "04 — Kalandenw Bila Baara La & IA Studio Jɛɲɔgɔn",
  "05 — Prospective Learner / Bamako 2027 Cohort Inquiry": "05 — Kalanden Ɲinini / Bamakɔ 2027 Kalan Kura",
  "Malian Youth, Building AI in Their Own Languages.": "Mali Denmisɛnw, Bɛ IA Dilan U Yɛrɛ Ka Kanw Na.",
  "Every phase of our work is guided by a quarterly 6-indicator report covering enrolment, completion, share of women learners, graduates in paid work, open Bambara datasets released, and applied studio projects delivered.": "An ka baara kɛlɛkolo bɛɛ bɛ ɲɛminɛ kalo saba rapɔri nafa kunnafoni 6 kan: kalanden donlenw, banbagaw, musow hakɛ, baara sɔrɔbagaw, Bamanankan kunnafoni labolenw, ni IA studio baaraw.",
  "Campus Location": "Kalanso Yɔrɔ",
  "Founding Team & Partnerships": "Dabɔbagaw & Jɛɲɔgɔnyaw",
  "BAARA Briefs • Founding Issue": "BAARA Kunnafoniw • Daminɛ Sɛbɛn",
  "Institutional Briefs & Bambara NLP Lab Publications.": "Jamana Kunnafoni Sɛbɛnw & Bamanankan NLP Labo Labow.",
  "By": "Bolo",
  "Founding Team": "Dabɔbagaw",
  "School Model (2027–2028)": "Kalanso Sira (2027–2028)",
  "Explore Lab Cases": "Labo Baaraw Kɔrɔsi",
  "Systems Architecture": "Masiri Cogoya",
  "Solar & Offline-First": "Tle-Fanga & Kunuŋɔ-Kɔkan",
  "Help Us Open Cohort 1 in 2027": "An Dɛmɛ Ka Kalan 1 Wuli San 2027 Kɔnɔ",
  "Receive Quarterly Impact Reports & Open Bambara Lab Releases!": "Kalo Saba O Saba Nafa Rapɔriw & Bamanankan Labo Labow Sɔrɔ!",
  "88 Pilot Learners (2027) → 300 Learners / Year (2028)": "Kalanden 88 Daminɛ (2027) → Kalanden 300 / San (2028)",
  "JOIN UPDATES": "KUNNAFONI SƆRƆ",
  "I agree to receive quarterly baara.ai school and open dataset updates.": "N sɔnna ka baara.ai kalanso ni kunnafoni kura kibaru sɔrɔ kalo saba o saba.",
  "BAARA - Institut d'IA du Mali (baara.ai) has three aims: job-first AI training for Malian youth, an open lab for AI in Bambara, and support for public health, agriculture, and entrepreneurship initiatives in Mali.": "BAARA - Institut d'IA du Mali (baara.ai) ka laɲini ye fɛn saba ye: ka Mali denmisɛnw kalan IA la walasa u ka baara sɔrɔ, ka Bamanankan IA labo kɛnɛkan dilan, ani ka jama kɛnɛya, sɛnɛ ani jago baarakɛyɔrɔ dilanni dɛmɛ Mali kɔnɔ.",
  "School Navigation": "Kalanso Sira Teliya",
  "Solar & Offline Campus": "Tle-Fanga & Kunuŋɔ Kalanso",
  "The 4 Learning Tracks": "Kalan Sira Naani",
  "Sponsor a Scholar ($1,500)": "Kalanden Dɛmɛ (1 500 $)",
  "Bamako Campus": "Bamakɔ Kalanso",
  "6 Quarterly Impact Indicators • 100% Open Bambara Releases": "Kalo Saba Nafa Kunnafoni 6 • 100% Bamanankan Labow Gbansan",
  ". All rights reserved.": ". Hakɛ bɛɛ mara bɛ yen.",
  "BAARA — AI Institute of Mali • 60s Campus & Bambara Lab Preview": "BAARA — Mali IA Kalanso • Sekon 60 Kalanso & Bamanankan Labo Filɛli",
  "● Campus Preview: French & Bambara Instruction": "● Kalanso Filɛli: Faransikan & Bamanankan Kalan",
  "Bamako, Mali • First Cohort 2027": "Bamakɔ, Mali • Kalan Daminɛ 2027",
  "Language selector": "Kan sugandilan",
  "Key school indicators": "Kalanso kunnafoni kuntigiw",
  "decorative shape": "masiri fɛɛn",
  "Malian youth learning applied AI and Bambara NLP in Bamako": "Mali denmisɛnw bɛ IA waleyali ni Bamanankan NLP kalan Bamakɔ",
  "Learners collaborating in Bamako classroom": "Kalandenw bɛ baara kɛ ɲɔgɔn fɛ Bamakɔ kalanso kɔnɔ",
  "Hands-on data and AI project training": "Kunnafoni ni IA baara lakika kalan",
  "Track 1 icon": "Kalan Sira 1 tɔgɔmasere",
  "Track 2 icon": "Kalan Sira 2 tɔgɔmasere",
  "Track 3 icon": "Kalan Sira 3 tɔgɔmasere",
  "Track 4 icon": "Kalan Sira 4 tɔgɔmasere",
  "Maternal health voice AI in Bambara": "Musow kɛnɛya kankan IA Bamanankan na",
  "Voice farm advice in Bambara": "Sɛnɛkɛ kankan ladili Bamanankan na",
  "Public forms read aloud in Bambara": "Jamana sɛbɛnw kalan kankan Bamanankan na",
  "Solar-powered offline-ready AI campus in Bamako": "Tle-fanga ni kunuŋɔ-kɔkan IA kalanso Bamakɔ",
  "Solar first icon": "Tle-fanga fɔlɔ tɔgɔmasere",
  "BAARA - Institut d'IA du Mali logo": "BAARA - Institut d'IA du Mali Tɔgɔmasere",
  "Écouter le signal audio": "Kankan mɛn",
  "Fermer le message": "Bataki datugu",
  "Cliquez ou survolez pour interagir avec le robot BAARA": "Dimi walima masiri ka kuma BAARA robot fɛ",
  "Interagir avec le robot": "Kuma robot fɛ"
};

  const PLACEHOLDERS_FR = {
    "Your Full Name": "Votre Nom Complet",
    "Email Address": "Adresse Email",
    "Organization / University (Optional)": "Organisation / Université (Optionnel)",
    "Phone / WhatsApp (+223 / Intl)": "Téléphone / WhatsApp (+223 / Intl)",
    "Tell us how you would like to partner, sponsor, or learn with baara.ai...": "Dites-nous comment vous souhaitez collaborer, parrainer ou vous former avec baara.ai...",
    "Enter your email": "Entrez votre email",
    "Search...": "Rechercher...",
    "Your Name": "Votre Nom",
    "Your Email": "Votre Email",
    "Your Message": "Votre Message",
    "Search articles, releases, research...": "Rechercher des articles, publications, recherches...",
    "name@organization.com": "nom@organisation.com"
  };

  const PLACEHOLDERS_BM = {
    "Your Full Name": "I Tɔgɔ Bɛɛ",
    "Email Address": "Imɛli Adɛrɛsi",
    "Organization / University (Optional)": "Baaraso / Iniwɛrisite (N'i b'a fɛ)",
    "Phone / WhatsApp (+223 / Intl)": "Telefɔni / WhatsApp (+223 / Jamana wɛrɛ)",
    "Tell us how you would like to partner, sponsor, or learn with baara.ai...": "Fɔ an ye i b'a fɛ ka jɛ, ka kalanden dɛmɛ, walima ka kalan kɛ baara.ai fɛ cogo min...",
    "Enter your email": "I ka imɛli sɛbɛn",
    "Search...": "Ɲini...",
    "Your Name": "I Tɔgɔ",
    "Your Email": "I Ka Imɛli",
    "Your Message": "I Ka Kuma",
    "Search articles, releases, research...": "Sɛbɛnw, labow, ɲinini ɲini...",
    "name@organization.com": "togo@baaraso.com"
  };

  const SELECT_OPTIONS_FR = {
    "01 — Sponsor a Learner ($1,500 Named Scholarship)": "01 — Parrainer un Apprenant (Bourse Nominative de 1 500 $)",
    "02 — Support the Bambara NLP Lab & Fellowships": "02 — Soutenir le Bambara NLP Lab & les Bourses de Recherche",
    "03 — Give Technology (In-Kind Laptops / Cloud / GPU)": "03 — Don Technologique (PC Portables / Cloud / GPU)",
    "04 — Hire Graduates & Applied AI Studio Partner": "04 — Recruter nos Diplômés & Partenaire Studio d'IA",
    "05 — Prospective Learner / Bamako 2027 Cohort Inquiry": "05 — Candidat Apprenant / Demande Cohorte Bamako 2027",
    "How would you like to take part?": "Comment souhaitez-vous participer ?",
    "Sponsor a Malian Learner (,500)": "Parrainer un Apprenant Malien (1 500 $)",
    "Support the Bambara NLP Lab": "Soutenir le Laboratoire NLP Bambara",
    "Employer Partnership / Hire Graduates": "Partenariat Recrutement / Embauche",
    "Contribute Hardware or GPU Credits": "Fournir du Matériel ou Crédits GPU",
    "Apply as a Learner (Cohort 2027)": "Postuler comme Apprenant (Cohorte 2027)",
    "General Partnership / Advisory Inquiry": "Partenariat Général / Conseil"
  };

  const SELECT_OPTIONS_BM = {
    "01 — Sponsor a Learner ($1,500 Named Scholarship)": "01 — Kalanden Dɛmɛ (1 500 $ Dɛmɛsara Tɔgɔlan)",
    "02 — Support the Bambara NLP Lab & Fellowships": "02 — Bamanankan NLP Labo & Bolodaw Dɛmɛ",
    "03 — Give Technology (In-Kind Laptops / Cloud / GPU)": "03 — Teknolɔki Minɛnw Di (Ordinatɛri / Klabu / GPU)",
    "04 — Hire Graduates & Applied AI Studio Partner": "04 — Kalandenw Bila Baara La & IA Studio Jɛɲɔgɔn",
    "05 — Prospective Learner / Bamako 2027 Cohort Inquiry": "05 — Kalanden Ɲinini / Bamakɔ 2027 Kalan Kura",
    "How would you like to take part?": "I b'a fɛ ka boloda kɛ cogo di?",
    "Sponsor a Malian Learner (,500)": "Mali Kalanden Dɛmɛ (1 500 $)",
    "Support the Bambara NLP Lab": "Bamanankan NLP Labo Dɛmɛ",
    "Employer Partnership / Hire Graduates": "Baaratigi Jɛɲɔgɔnya / Kalandenw Bilasira Baara La",
    "Contribute Hardware or GPU Credits": "Ordinatɛri walima GPU Fanga Di",
    "Apply as a Learner (Cohort 2027)": "Kalan Ɲini Kalanden Ye (Kalan Kura 2027)",
    "General Partnership / Advisory Inquiry": "Jɛɲɔgɔnya Kɛnɛma / Ladili Ɲinini"
  };

  // Reverse lookups for English restoration
  const DICT_EN = {};
  for (const [k, v] of Object.entries(DICT_FR)) {
    DICT_EN[v] = k;
  }
  for (const [k, v] of Object.entries(DICT_BM)) {
    DICT_EN[v] = k;
  }

  const PLACEHOLDERS_EN = {};
  for (const [k, v] of Object.entries(PLACEHOLDERS_FR)) {
    PLACEHOLDERS_EN[v] = k;
  }
  for (const [k, v] of Object.entries(PLACEHOLDERS_BM)) {
    PLACEHOLDERS_EN[v] = k;
  }

  const SELECT_OPTIONS_EN = {};
  for (const [k, v] of Object.entries(SELECT_OPTIONS_FR)) {
    SELECT_OPTIONS_EN[v] = k;
  }
  for (const [k, v] of Object.entries(SELECT_OPTIONS_BM)) {
    SELECT_OPTIONS_EN[v] = k;
  }

  function detectInitialLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    if (paramLang === 'fr' || paramLang === 'en' || paramLang === 'bm') {
      return paramLang;
    }

    const saved = localStorage.getItem('baara_lang');
    if (saved === 'fr' || saved === 'en' || saved === 'bm') {
      return saved;
    }

    const geoParam = (urlParams.get('geo') || '').toUpperCase();
    if (FRENCH_COUNTRIES.includes(geoParam)) {
      return 'fr';
    }

    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('fr')) {
      return 'fr';
    }

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (FRANCOPHONE_TZS.includes(tz)) {
        return 'fr';
      }
    } catch (e) {}

    return 'en';
  }

  // Set early document language immediately
  try {
    const earlyLang = detectInitialLang();
    if (earlyLang) {
      document.documentElement.lang = earlyLang;
    }
  } catch (e) {}

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('baara_lang', lang);

    // Update active state on language switcher buttons
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
    });

    // 1. Reset DOM to English baseline first so dictionary lookups always match reliably
    restoreDOMToEnglish();

    // 2. Explicitly translate #heroHeading with <span> preserving
    const heroH1 = document.getElementById('heroHeading');
    if (heroH1) {
      if (!heroH1.hasAttribute('data-baara-orig-html')) {
        heroH1.setAttribute('data-baara-orig-html', heroH1.innerHTML);
      }
      if (lang === 'fr') {
        heroH1.innerHTML = "<span>La Jeunesse Malienne,</span> Bâtissant l'IA Dans Ses <span>Propres Langues.</span>";
      } else if (lang === 'bm') {
        heroH1.innerHTML = "<span>Mali Denmisɛnw,</span> Bɛ IA Dilan U Yɛrɛ Ka <span>Kanw Na.</span>";
      } else {
        heroH1.innerHTML = heroH1.getAttribute('data-baara-orig-html');
      }
    }

    // 3. Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!el.hasAttribute('data-baara-orig-html')) {
        el.setAttribute('data-baara-orig-html', el.innerHTML);
      }
      if (lang === 'fr') {
        if (I18N_KEYS_FR[key]) {
          el.innerHTML = I18N_KEYS_FR[key];
        }
      } else if (lang === 'bm') {
        if (I18N_KEYS_BM[key]) {
          el.innerHTML = I18N_KEYS_BM[key];
        }
      } else {
        el.innerHTML = el.getAttribute('data-baara-orig-html');
      }
    });

    // 4. Apply target translation
    if (lang === 'fr') {
      translateDOMToFrench();
    } else if (lang === 'bm') {
      translateDOMToBambara();
    }

    try {
      window.dispatchEvent(new CustomEvent('baara:lang-change', { detail: { lang } }));
    } catch (e) {}

    alignHeroRobot(lang);
  }

  function alignHeroRobot(lang) {
    // Note: Hero robot positioning is strictly and cleanly handled via responsive CSS in index.html
    // Preserving function as safe no-op to maintain API contract without breaking layouts.
  }

  function translateDOMToFrench() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest && parent.closest('#spline-island-root, #hero-spline-robot-root, [data-i18n], #heroHeading')) {
            return NodeFilter.FILTER_REJECT;
          }
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.nodeValue.trim().length === 0) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToTranslate = [];
    while (walker.nextNode()) {
      nodesToTranslate.push(walker.currentNode);
    }

    nodesToTranslate.forEach((node) => {
      const text = node.nodeValue.trim();
      if (DICT_FR[text]) {
        if (!node.parentElement.hasAttribute('data-baara-orig-en')) {
          node.parentElement.setAttribute('data-baara-orig-en', text);
        }
        node.nodeValue = node.nodeValue.replace(text, DICT_FR[text]);
      }
    });

    // Translate Inputs / Textareas Placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((el) => {
      const pl = el.getAttribute('placeholder');
      if (PLACEHOLDERS_FR[pl]) {
        if (!el.hasAttribute('data-baara-orig-pl')) {
          el.setAttribute('data-baara-orig-pl', pl);
        }
        el.setAttribute('placeholder', PLACEHOLDERS_FR[pl]);
      }
    });

    // Translate Select Options
    document.querySelectorAll('select option').forEach((opt) => {
      const txt = opt.textContent.trim();
      if (SELECT_OPTIONS_FR[txt]) {
        if (!opt.hasAttribute('data-baara-orig-opt')) {
          opt.setAttribute('data-baara-orig-opt', txt);
        }
        opt.textContent = SELECT_OPTIONS_FR[txt];
      }
    });

    // Translate aria-label, title, and img alt attributes
    document.querySelectorAll('[aria-label], [title], img[alt]').forEach((el) => {
      ['aria-label', 'title', 'alt'].forEach((attr) => {
        if (el.hasAttribute(attr)) {
          const val = el.getAttribute(attr).trim();
          if (DICT_FR[val]) {
            if (!el.hasAttribute(`data-baara-orig-${attr}`)) {
              el.setAttribute(`data-baara-orig-${attr}`, val);
            }
            el.setAttribute(attr, DICT_FR[val]);
          }
        }
      });
    });
  }

  function translateDOMToBambara() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest && parent.closest('#spline-island-root, #hero-spline-robot-root, [data-i18n], #heroHeading')) {
            return NodeFilter.FILTER_REJECT;
          }
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.nodeValue.trim().length === 0) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToTranslate = [];
    while (walker.nextNode()) {
      nodesToTranslate.push(walker.currentNode);
    }

    nodesToTranslate.forEach((node) => {
      const text = node.nodeValue.trim();
      if (DICT_BM[text]) {
        if (!node.parentElement.hasAttribute('data-baara-orig-en')) {
          node.parentElement.setAttribute('data-baara-orig-en', text);
        }
        node.nodeValue = node.nodeValue.replace(text, DICT_BM[text]);
      }
    });

    // Translate Inputs / Textareas Placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((el) => {
      const pl = el.getAttribute('placeholder');
      if (PLACEHOLDERS_BM[pl]) {
        if (!el.hasAttribute('data-baara-orig-pl')) {
          el.setAttribute('data-baara-orig-pl', pl);
        }
        el.setAttribute('placeholder', PLACEHOLDERS_BM[pl]);
      }
    });

    // Translate Select Options
    document.querySelectorAll('select option').forEach((opt) => {
      const txt = opt.textContent.trim();
      if (SELECT_OPTIONS_BM[txt]) {
        if (!opt.hasAttribute('data-baara-orig-opt')) {
          opt.setAttribute('data-baara-orig-opt', txt);
        }
        opt.textContent = SELECT_OPTIONS_BM[txt];
      }
    });

    // Translate aria-label, title, and img alt attributes
    document.querySelectorAll('[aria-label], [title], img[alt]').forEach((el) => {
      ['aria-label', 'title', 'alt'].forEach((attr) => {
        if (el.hasAttribute(attr)) {
          const val = el.getAttribute(attr).trim();
          if (DICT_BM[val]) {
            if (!el.hasAttribute(`data-baara-orig-${attr}`)) {
              el.setAttribute(`data-baara-orig-${attr}`, val);
            }
            el.setAttribute(attr, DICT_BM[val]);
          }
        }
      });
    });
  }

  function restoreDOMToEnglish() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest && parent.closest('#spline-island-root, #hero-spline-robot-root, [data-i18n], #heroHeading')) {
            return NodeFilter.FILTER_REJECT;
          }
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.nodeValue.trim().length === 0) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (parent && parent.hasAttribute('data-baara-orig-en')) {
        const orig = parent.getAttribute('data-baara-orig-en');
        const currentTrim = node.nodeValue.trim();
        if ((DICT_FR[orig] && currentTrim === DICT_FR[orig]) || (DICT_BM[orig] && currentTrim === DICT_BM[orig])) {
          node.nodeValue = node.nodeValue.replace(currentTrim, orig);
        }
      } else {
        const text = node.nodeValue.trim();
        if (DICT_EN[text]) {
          node.nodeValue = node.nodeValue.replace(text, DICT_EN[text]);
        }
      }
    });

    // Restore Placeholders
    document.querySelectorAll('input[data-baara-orig-pl], textarea[data-baara-orig-pl]').forEach((el) => {
      el.setAttribute('placeholder', el.getAttribute('data-baara-orig-pl'));
    });

    // Restore Select Options
    document.querySelectorAll('select option[data-baara-orig-opt]').forEach((opt) => {
      opt.textContent = opt.getAttribute('data-baara-orig-opt');
    });

    // Restore aria-label, title, alt
    document.querySelectorAll('[data-baara-orig-aria-label], [data-baara-orig-title], [data-baara-orig-alt]').forEach((el) => {
      ['aria-label', 'title', 'alt'].forEach((attr) => {
        const origKey = `data-baara-orig-${attr}`;
        if (el.hasAttribute(origKey)) {
          el.setAttribute(attr, el.getAttribute(origKey));
        }
      });
    });
  }

  function setupEventListeners() {
    // Global delegated click listener in capture phase - guarantees clicks are never blocked
    document.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest && e.target.closest('[data-set-lang]');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const chosen = btn.getAttribute('data-set-lang');
        if (chosen) {
          applyLanguage(chosen);
        }
      }
    }, true);

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const chosen = btn.getAttribute('data-set-lang');
        if (chosen) {
          applyLanguage(chosen);
        }
      });
    });

    // Auto-detect and apply on load
    const initial = detectInitialLang();
    if (initial === 'fr' || initial === 'bm') {
      applyLanguage(initial);
    } else {
      applyLanguage('en');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
  } else {
    setupEventListeners();
  }

  window.baaraApplyLanguage = applyLanguage;
  window.baaraDetectInitialLang = detectInitialLang;
  window.baaraDictBm = DICT_BM;
  window.baaraDictFr = DICT_FR;
  window.baaraDictEn = DICT_EN;
})();
