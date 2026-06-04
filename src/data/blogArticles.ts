export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

// Utility function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove multiple hyphens
    .trim();
};

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "S'installer au Maroc : le guide complet pour la diaspora",
    slug: generateSlug("S'installer au Maroc : le guide complet pour la diaspora"),
    excerpt: "Découvrez les étapes clés pour réussir votre installation au Maroc, de l'administratif à l'immobilier.",
    content: `
## Préparer son installation au Maroc

L'installation au Maroc représente une étape importante dans la vie de nombreux membres de la diaspora. Que ce soit pour un retour définitif, un investissement immobilier ou le développement d'un projet professionnel, une bonne préparation est essentielle.

### Les démarches administratives

La première étape consiste à rassembler tous les documents nécessaires. Vous aurez besoin de :
- Un passeport valide
- Un acte de naissance traduit et légalisé
- Un certificat de résidence
- Des photos d'identité aux normes marocaines

### L'immobilier au Maroc

Le marché immobilier marocain offre de nombreuses opportunités. Les grandes villes comme Casablanca, Rabat et Marrakech proposent un large choix de biens, des appartements modernes aux riads traditionnels.

### Ouvrir un compte bancaire

L'ouverture d'un compte bancaire au Maroc est relativement simple pour les MRE (Marocains Résidant à l'Étranger). Les principales banques proposent des offres dédiées avec des avantages spécifiques.

### Conseils pratiques

- Faites appel à un notaire de confiance pour vos transactions immobilières
- Consultez un avocat spécialisé pour les questions de succession
- Prévoyez un budget pour les frais administratifs et de traduction
    `,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    category: "Guide",
    date: "15 Nov 2024",
    author: "Équipe WeLinkYou",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Fiscalité France-Maroc : ce qu'il faut savoir",
    slug: generateSlug("Fiscalité France-Maroc : ce qu'il faut savoir"),
    excerpt: "Les conventions fiscales expliquées simplement pour optimiser votre situation entre les deux pays.",
    content: `
## Comprendre la fiscalité franco-marocaine

La convention fiscale entre la France et le Maroc, signée en 1970 et révisée en 2006, régit les relations fiscales entre les deux pays. Elle vise à éviter la double imposition et à prévenir l'évasion fiscale.

### Résidence fiscale

La notion de résidence fiscale est fondamentale. Vous êtes considéré comme résident fiscal du pays où :
- Vous avez votre foyer permanent
- Vous séjournez plus de 183 jours par an
- Vous exercez votre activité professionnelle principale

### Imposition des revenus

#### Revenus du travail
Les salaires sont généralement imposés dans le pays où l'activité est exercée. Cependant, des exceptions existent pour les missions temporaires.

#### Revenus immobiliers
Les revenus locatifs sont imposés dans le pays où se situe le bien immobilier.

#### Pensions de retraite
Les pensions publiques sont imposées dans le pays d'origine, tandis que les pensions privées suivent des règles spécifiques.

### Conseils d'optimisation

- Tenez une comptabilité précise de vos revenus dans chaque pays
- Consultez un expert-comptable spécialisé en fiscalité internationale
- Déclarez tous vos comptes bancaires à l'étranger
    `,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop",
    category: "Finance",
    date: "10 Nov 2024",
    author: "Équipe WeLinkYou",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "Témoignage : Comment j'ai trouvé mon avocat idéal",
    slug: generateSlug("Témoignage : Comment j'ai trouvé mon avocat idéal"),
    excerpt: "Sarah nous raconte comment WeLinkYou l'a aidée à gérer sa succession transfrontalière.",
    content: `
## L'histoire de Sarah

Sarah, 45 ans, vit à Lyon depuis 20 ans. Suite au décès de son père au Maroc, elle s'est retrouvée face à une succession complexe impliquant des biens dans les deux pays.

### Le défi initial

"Je ne savais pas par où commencer. Mon père avait des propriétés à Casablanca et à Fès, plus des comptes bancaires et des investissements. J'avais besoin d'un avocat qui comprenne les deux systèmes juridiques."

### La découverte de WeLinkYou

"Une amie m'a parlé de WeLinkYou. J'ai été impressionnée par la facilité de recherche et la qualité des profils. J'ai trouvé trois avocats spécialisés en successions internationales en quelques minutes."

### Le processus de sélection

"Ce qui m'a convaincue, c'est la transparence des informations. Chaque profil indiquait clairement les compétences, les langues parlées et les domaines d'expertise. Le badge 'Profil vérifié' m'a rassurée."

### Le résultat

"Maître B. a géré ma succession avec professionnalisme. Il connaissait parfaitement les procédures marocaines et françaises. En six mois, tout était réglé, sans stress inutile."

### Conseils de Sarah

- Prenez le temps de comparer plusieurs profils
- N'hésitez pas à contacter plusieurs professionnels
- Vérifiez les avis et recommandations
    `,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
    category: "Témoignage",
    date: "5 Nov 2024",
    author: "Sarah M.",
    readTime: "5 min",
  },
  {
    id: 4,
    title: "Les étapes clés pour créer son entreprise au Maroc",
    slug: generateSlug("Les étapes clés pour créer son entreprise au Maroc"),
    excerpt: "Guide pratique pour les entrepreneurs de la diaspora souhaitant investir au Maroc.",
    content: `
## Créer son entreprise au Maroc

Le Maroc offre un environnement favorable à l'entrepreneuriat, avec des procédures simplifiées et des incitations fiscales attractives pour les investisseurs étrangers et les MRE.

### Choisir sa forme juridique

Les principales formes juridiques au Maroc :
- **SARL** : Société à Responsabilité Limitée, idéale pour les PME
- **SA** : Société Anonyme, pour les projets d'envergure
- **Auto-entrepreneur** : Statut simplifié pour les petites activités

### Les étapes de création

1. **Certificat négatif** : Réservation du nom de votre entreprise
2. **Rédaction des statuts** : Documents juridiques fondateurs
3. **Dépôt du capital** : Ouverture d'un compte bancaire professionnel
4. **Enregistrement** : Immatriculation au registre du commerce
5. **Identification fiscale** : Obtention du numéro d'identification fiscale

### Avantages pour les MRE

- Facilités de transfert de fonds
- Avantages fiscaux spécifiques
- Accompagnement dédié via les CRI (Centres Régionaux d'Investissement)

### Points de vigilance

- Bien choisir son expert-comptable
- Comprendre la fiscalité locale
- Respecter les obligations déclaratives
    `,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    category: "Entrepreneuriat",
    date: "28 Oct 2024",
    author: "Équipe WeLinkYou",
    readTime: "7 min",
  },
  {
    id: 5,
    title: "Santé au Maroc : comprendre le système médical",
    slug: generateSlug("Santé au Maroc : comprendre le système médical"),
    excerpt: "Tour d'horizon du système de santé marocain et conseils pour bien s'y retrouver.",
    content: `
## Le système de santé marocain

Le Maroc dispose d'un système de santé en constante amélioration, combinant secteur public et privé. Pour les membres de la diaspora, comprendre ce système est essentiel.

### Secteur public vs privé

#### Le secteur public
- Hôpitaux et centres de santé accessibles
- Tarifs réglementés
- Parfois des délais d'attente importants

#### Le secteur privé
- Cliniques modernes et bien équipées
- Médecins souvent formés à l'international
- Services plus rapides mais plus coûteux

### L'assurance maladie

Les MRE peuvent bénéficier de :
- La couverture de leur pays de résidence (avec accord bilatéral)
- Une assurance santé privée au Maroc
- L'AMO (Assurance Maladie Obligatoire) sous conditions

### Trouver un médecin de confiance

- Privilégiez les recommandations de proches
- Vérifiez les qualifications et l'inscription à l'Ordre des médecins
- Consultez les avis sur WeLinkYou

### Conseils pratiques

- Gardez toujours vos documents médicaux traduits
- Prévoyez une trousse de médicaments essentiels
- Notez les numéros d'urgence locaux
    `,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    category: "Santé",
    date: "20 Oct 2024",
    author: "Équipe WeLinkYou",
    readTime: "6 min",
  },
  {
    id: 6,
    title: "Immobilier : acheter un bien au Maroc depuis l'étranger",
    slug: generateSlug("Immobilier : acheter un bien au Maroc depuis l'étranger"),
    excerpt: "Procédures, financement et pièges à éviter pour un achat immobilier réussi.",
    content: `
## Acheter un bien immobilier au Maroc

L'investissement immobilier au Maroc reste une valeur sûre pour la diaspora. Voici tout ce qu'il faut savoir pour réussir votre acquisition.

### Les différents types de biens

- **Appartements** : Choix varié dans les grandes villes
- **Villas** : Idéales pour les familles
- **Riads** : Patrimoine traditionnel à rénover
- **Terrains** : Pour construire selon vos envies

### Le processus d'achat

1. **Recherche** : Définir vos critères et budget
2. **Visite** : Sur place ou via un mandataire de confiance
3. **Compromis** : Signature d'un acte préliminaire
4. **Vérifications** : Titre foncier, urbanisme, charges
5. **Acte définitif** : Signature chez le notaire

### Financement depuis l'étranger

Les banques marocaines proposent des crédits aux MRE :
- Jusqu'à 70% de financement
- Durées jusqu'à 25 ans
- Taux compétitifs

### Pièges à éviter

- Acheter sans vérifier le titre foncier
- Négliger les charges de copropriété
- Sous-estimer les frais de notaire (environ 6%)
- Faire confiance aveuglément aux intermédiaires
    `,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    category: "Immobilier",
    date: "15 Oct 2024",
    author: "Équipe WeLinkYou",
    readTime: "8 min",
  },
];

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find((article) => article.slug === slug);
};

export const getRelatedArticles = (currentArticle: BlogArticle, count: number = 3): BlogArticle[] => {
  return blogArticles
    .filter((article) => article.id !== currentArticle.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};
