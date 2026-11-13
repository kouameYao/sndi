import type { Expertise } from "@/types/content";

const PRESTATIONS_BASE = "https://web.sndi.ci/nos-prestations";

/**
 * Prestations référencées par le site institutionnel (web.sndi.ci).
 * Les textes sont des synthèses fidèles des pages sources, à faire valider
 * (voir docs/content-audit.md). « Cloud et datacenter » regroupe deux
 * prestations officielles distinctes.
 */
export const EXPERTISES: readonly Expertise[] = [
  {
    slug: "etudes-et-conseils",
    title: "Études et conseils en informatique",
    officialTitle: "Études et conseils en informatique",
    summary:
      "Schéma directeur, audit informatique et assistance à maîtrise d’ouvrage.",
    intro:
      "La SNDI accompagne les décideurs publics dans la définition de leur stratégie, le pilotage de leurs projets et l’orientation de leurs investissements informatiques.",
    featured: true,
    depth: "detailed",
    services: [
      "Schéma directeur des systèmes d’information",
      "Audit informatique",
      "Assistance à maîtrise d’ouvrage",
    ],
    strengths: [
      "Une longue expérience du métier",
      "Une démarche transparente, complète et de qualité",
    ],
    references: ["COBIT", "RACINES"],
    sources: [
      {
        label: "Études et conseils en informatique, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/etudes-et-conseils-en-informatique/`,
      },
    ],
    detail: {
      presentation: [
        "La SNDI intervient auprès des gouvernants pour définir la stratégie, piloter les projets et mettre en œuvre des investissements adaptés à l’évolution du système d’information de l’État et de l’ensemble des structures.",
        "Ces missions précèdent les grands chantiers informatiques : elles fixent les priorités, les moyens et le calendrier.",
      ],
      domains: [
        {
          name: "Définition de la stratégie",
          description:
            "Fixer le cap du système d’information et hiérarchiser les chantiers d’informatisation.",
        },
        {
          name: "Pilotage des projets",
          description:
            "Accompagner la conduite des projets informatiques aux côtés de la structure qui les porte.",
        },
        {
          name: "Orientation des investissements",
          description:
            "Ajuster les investissements à l’évolution du système d’information.",
        },
      ],
      detailedServices: [
        {
          name: "Schéma directeur des systèmes d’information",
          description:
            "Le schéma directeur cadre l’évolution du système d’information. Il définit les priorités d’informatisation par domaine d’activité, puis établit les budgets et le planning de mise en œuvre.",
        },
        {
          name: "Audit informatique",
          description:
            "L’audit analyse le système d’information et sa gouvernance. Il s’appuie sur le référentiel COBIT.",
        },
        {
          name: "Assistance à maîtrise d’ouvrage",
          description:
            "La SNDI appuie la structure cliente dans la conduite de ses projets informatiques.",
        },
      ],
      frameworks: [
        {
          name: "COBIT",
          description:
            "Référentiel d’analyse des systèmes d’information et de gouvernance informatique.",
        },
        {
          name: "RACINES",
          description:
            "Rationalisation des choix informatiques : méthode de conception des schémas directeurs, qui fixe les priorités d’informatisation par domaine d’activité, les budgets et le planning.",
        },
      ],
      relatedWork: [
        {
          title: "Audit informatique",
          url: "https://web.sndi.ci/nos-realisations/projets/audit-informatique/",
          meta: "Réalisation",
        },
        {
          title: "Schéma directeur des systèmes d’information (SDSI)",
          url: "https://web.sndi.ci/nos-realisations/projets/schema-directeur-des-systemes-dinformations-sdsi/",
          meta: "Réalisation",
        },
        {
          title:
            "Lancement du schéma directeur du système d’information du ministère de la Communication, des Médias et de la Francophonie",
          url: "https://web.sndi.ci/lancement-du-schema-directeur-du-systeme-dinformation-du-ministere-de-la-communication-des-medias-et-de-la-francophonie/",
          meta: "Actualité du 26 mars 2021",
        },
      ],
      faq: [
        {
          question: "Quelles prestations recouvre cette expertise ?",
          answer:
            "Trois prestations : le schéma directeur des systèmes d’information, l’audit informatique et l’assistance à maîtrise d’ouvrage.",
        },
        {
          question: "À qui s’adresse-t-elle ?",
          answer:
            "Aux décideurs publics et, plus largement, à toute structure dont le système d’information évolue.",
        },
        {
          question: "Sur quels référentiels la SNDI s’appuie-t-elle ?",
          answer:
            "Sur COBIT pour l’analyse des systèmes d’information et la gouvernance informatique, et sur la méthode RACINES pour la conception des schémas directeurs.",
        },
        {
          question: "Peut-on consulter des réalisations ?",
          answer:
            "Oui. Un audit informatique et un schéma directeur des systèmes d’information sont présentés dans la rubrique Réalisations.",
        },
        {
          question: "Comment engager une mission ?",
          answer:
            "En contactant la SNDI par le formulaire de contact, par téléphone ou par le formulaire « Commander une prestation » de son site institutionnel.",
        },
      ],
    },
  },
  {
    slug: "developpement-et-integration",
    title: "Développement et intégration",
    officialTitle: "Développement d’applications et intégration de solutions",
    summary:
      "Applications sur mesure, intégration de solutions et automatisation des procédures de gestion.",
    intro:
      "La SNDI conçoit des solutions au plus près des métiers : automatisation des tâches, travail collaboratif, gestion documentaire et informatique décisionnelle.",
    featured: true,
    depth: "summary",
    services: [
      "Développement d’applications et de modules spécifiques",
      "Intégration de solutions : outils décisionnels, gestion électronique de documents",
      "Automatisation des procédures de gestion et réalisation d’interfaces homme-machine",
    ],
    strengths: [
      "Maîtrise des méthodologies et standards de programmation",
      "Accompagnement à la prise en main et transfert de compétences",
      "Support technique en ligne et intervention sur site",
    ],
    references: ["ITIL", "CMMI", "ISO", "PL/SQL", "Java", "PHP", "HTML"],
    sources: [
      {
        label:
          "Développement d’applications et intégration de solutions, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/developpement-dapplications-et-integration-de-solutions/`,
      },
    ],
  },
  {
    slug: "reseaux-et-telecommunications",
    title: "Réseaux et télécommunications",
    officialTitle: "Réseaux et télécommunications",
    summary:
      "Réseaux locaux et étendus, hub satellitaire et intranet de l’administration.",
    intro:
      "La SNDI déploie des infrastructures de télécommunication, de stockage et de partage de données. Elle a mis en place et gère, pour l’État, un hub satellitaire et le réseau intranet de l’administration.",
    featured: true,
    depth: "summary",
    services: [
      "Conception et mise en place de réseaux locaux, étendus et métropolitains (LAN, WAN, MAN)",
      "Configuration d’équipements actifs : routeurs, commutateurs",
      "Déploiement et administration d’un hub satellitaire",
      "Raccordement de sites distants par VSAT",
      "Accès à Internet via l’intranet de l’administration",
      "Audit et certification de réseaux",
    ],
    strengths: [
      "Couverture nationale",
      "Fluidité et sécurité des flux de données",
      "Assistance technique en ligne et intervention sur site",
    ],
    references: ["Cisco", "Juniper", "BLR", "Wi-Fi", "WiMAX", "DVB-S2"],
    sources: [
      {
        label: "Réseaux et télécommunications, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/reseaux-et-telecommunications/`,
      },
    ],
  },
  {
    slug: "cybersecurite",
    title: "Cybersécurité",
    officialTitle: "Cyber sécurité",
    summary:
      "Sécurisation des données, continuité d’activité et protection des systèmes d’information.",
    intro:
      "La SNDI définit les règles de sécurisation des données et de protection des systèmes d’information de ses clients.",
    featured: true,
    depth: "summary",
    services: [
      "Conception et pilotage de la sécurité : informations, communications, réseaux, postes de travail, applications, données",
      "Gestion de la continuité d’activité",
      "Architecture et ingénierie de la sécurité",
      "Gestion déléguée des services de sécurité",
    ],
    strengths: [
      "Expérience du domaine",
      "Connaissance de la sécurité des systèmes informatiques",
      "Assistance technique en ligne et intervention sur site",
    ],
    references: [],
    sources: [
      {
        label: "Cyber sécurité, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/cyber-securite/`,
      },
    ],
  },
  {
    slug: "cloud-et-datacenter",
    title: "Cloud et datacenter",
    officialTitle:
      "Service Cloud (cloud computing) · Administration de base de données et de datacenter",
    summary:
      "Datacenter de l’État, hébergement d’applications et services cloud.",
    intro:
      "La SNDI met en place et gère le datacenter de l’État. Elle héberge des sites et des applications, sur espace virtualisé ou serveur dédié, et propose des services cloud.",
    featured: true,
    depth: "summary",
    services: [
      "Installation, configuration et administration de bases de données, de serveurs d’application et de serveurs de fichiers",
      "Hébergement d’applications et de sites internet",
      "Optimisation, sauvegarde et sécurisation",
      "Messagerie électronique et contrôleur de domaine",
      "Services cloud : SaaS, PaaS et IaaS",
    ],
    strengths: [
      "Accessibilité et disponibilité du datacenter",
      "Surveillance continue de l’hébergement et des serveurs",
      "Support technique en ligne et intervention sur site",
    ],
    references: [
      "Oracle",
      "PostgreSQL",
      "MySQL",
      "Apache",
      "JBoss",
      "GlassFish",
      "Linux",
      "Windows",
    ],
    sources: [
      {
        label:
          "Administration de base de données et de datacenter, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/administration-de-base-de-donnees-et-de-datacenter/`,
      },
      {
        label: "Service Cloud, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/service-cloud-cloud-computing/`,
      },
    ],
  },
  {
    slug: "formation",
    title: "Formation continue",
    officialTitle: "Formation continue",
    summary:
      "Formations informatiques du Centre de Formation SNDI pour les agents et les organisations.",
    intro:
      "Le Centre de Formation SNDI propose des formations informatiques adaptées aux besoins des structures qui souhaitent renforcer les compétences de leur personnel, notamment les fonctionnaires et agents de l’État.",
    featured: true,
    depth: "summary",
    services: [
      "Initiation à l’informatique et bureautique",
      "Langages de programmation",
      "Conception et réalisation d’applications",
      "Développement web",
      "Administration de bases de données",
      "Systèmes d’exploitation",
      "Gestion de projets",
    ],
    strengths: [
      "Programmes adaptés aux besoins de chaque structure",
      "Salles de formation équipées",
      "Formateurs expérimentés",
    ],
    references: [],
    sources: [
      {
        label: "Formation continue, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/formations-continue-en-informatique/`,
      },
    ],
  },
  {
    slug: "archivage-numerique-et-ged",
    title: "Archivage numérique et GED",
    officialTitle: "Archivage numérique et GED",
    summary:
      "Classement, conservation et accès aux documents par la gestion électronique des documents.",
    intro:
      "La SNDI accompagne les organisations dans le classement, la conservation et l’accès à leurs documents au moyen d’une gestion électronique des documents (GED).",
    featured: false,
    depth: "summary",
    services: [
      "Mise en place d’une gestion électronique des documents",
      "Accompagnement à la gestion documentaire",
    ],
    strengths: [],
    references: [],
    sources: [
      {
        label: "Archivage numérique et GED, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/archivage-numerique-et-ged/`,
      },
    ],
  },
  {
    slug: "infogerance",
    title: "Infogérance",
    officialTitle: "Infogérance",
    summary: "Gestion, exploitation et sécurité du parc informatique.",
    intro:
      "L’infogérance réunit des services de gestion, d’exploitation et de sécurité informatique. Elle permet aux organisations de se concentrer sur leur cœur de métier.",
    featured: false,
    depth: "summary",
    services: [
      "Assistance et interventions sur site",
      "Hotline et télémaintenance",
      "Équipe dédiée au compte client",
      "Supervision du parc informatique",
      "Installation de nouveaux postes",
      "Conseil et suivi par des ingénieurs spécialisés",
    ],
    strengths: [],
    references: [],
    sources: [
      {
        label: "Infogérance, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/infogerance/`,
      },
    ],
  },
  {
    slug: "big-data",
    title: "Big Data",
    officialTitle: "Big Data",
    summary:
      "Traitement de grands ensembles de données, par des méthodes d’analyse adaptées.",
    intro:
      "Le Big Data désigne des ensembles de données dont le volume, la vitesse de production et la variété appellent des technologies et des méthodes d’analyse spécifiques, notamment des traitements parallélisés.",
    featured: false,
    depth: "definition",
    services: [],
    strengths: [],
    references: [],
    sources: [
      {
        label: "Big Data, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/big-data/`,
      },
    ],
  },
  {
    slug: "blockchain",
    title: "Technologie blockchain",
    officialTitle: "Technologie Blockchain",
    summary:
      "Enregistrement et transmission d’informations sans autorité centrale de contrôle.",
    intro:
      "La blockchain est une base de données distribuée : les enregistrements sont regroupés en blocs, chaînés entre eux et protégés par cryptographie. La SNDI y recourt pour enregistrer et transmettre des informations sans autorité centrale de contrôle.",
    featured: false,
    depth: "definition",
    services: [],
    strengths: [],
    references: [],
    sources: [
      {
        label: "Technologie Blockchain, web.sndi.ci",
        url: `${PRESTATIONS_BASE}/technologie-blockchain/`,
      },
    ],
  },
  {
    slug: "internet-des-objets",
    title: "Internet des objets",
    officialTitle: "Internet of Things (IoT)",
    summary:
      "Interconnexion d’objets, de lieux et d’environnements physiques avec Internet.",
    intro:
      "L’Internet des objets relie Internet à des objets, des lieux et des environnements physiques. Ces connexions rattachent les biens physiques à leur existence numérique et produisent de nouvelles données.",
    featured: false,
    depth: "definition",
    services: [],
    strengths: [],
    references: [],
    sources: [
      {
        label: "Internet of Things (IoT), web.sndi.ci",
        url: `${PRESTATIONS_BASE}/internet-of-things-iot/`,
      },
    ],
  },
];
