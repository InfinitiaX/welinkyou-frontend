export interface Practitioner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  description: string;
  languages: string[];
  zones: string[];
  experience: number;
  rating: number;
  reviewsCount: number;
  profileViews: number;
  profileClicks: number;
  isCertified: boolean;
  isVisible: boolean;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  avatarUrl?: string;
}

export interface Document {
  name: string;
  url: string;
  status: 'pending' | 'validated' | 'rejected';
}

export interface RegistrationRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  description: string;
  documents: Document[];
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const mockPractitioners: Practitioner[] = [
  {
    id: '1',
    firstName: 'Karim',
    lastName: 'Benali',
    email: 'karim.benali@email.com',
    phone: '+33 6 12 34 56 78',
    specialty: 'Avocat - Droit des affaires',
    description: 'Spécialisé dans le droit commercial Franco-Marocain avec 15 ans d\'expérience.',
    languages: ['Français', 'Arabe', 'Anglais'],
    zones: ['Paris', 'Casablanca'],
    experience: 15,
    rating: 4.8,
    reviewsCount: 47,
    profileViews: 1250,
    profileClicks: 342,
    isCertified: true,
    isVisible: true,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'El Amrani',
    email: 'fatima.elamrani@email.com',
    phone: '+33 6 98 76 54 32',
    specialty: 'Expert-comptable',
    description: 'Expertise en fiscalité internationale et comptabilité bilatérale.',
    languages: ['Français', 'Arabe'],
    zones: ['Lyon', 'Rabat'],
    experience: 10,
    rating: 4.9,
    reviewsCount: 32,
    profileViews: 890,
    profileClicks: 215,
    isCertified: true,
    isVisible: true,
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    firstName: 'Youssef',
    lastName: 'Tazi',
    email: 'youssef.tazi@email.com',
    phone: '+212 6 11 22 33 44',
    specialty: 'Notaire',
    description: 'Accompagnement pour transactions immobilières entre France et Maroc.',
    languages: ['Français', 'Arabe', 'Espagnol'],
    zones: ['Marseille', 'Tanger'],
    experience: 8,
    rating: 4.6,
    reviewsCount: 28,
    profileViews: 650,
    profileClicks: 180,
    isCertified: false,
    isVisible: true,
    status: 'active',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    firstName: 'Nadia',
    lastName: 'Chraibi',
    email: 'nadia.chraibi@email.com',
    phone: '+33 6 55 44 33 22',
    specialty: 'Conseiller en immigration',
    description: 'Spécialiste des démarches administratives et visas.',
    languages: ['Français', 'Arabe', 'Anglais'],
    zones: ['Paris', 'Marrakech'],
    experience: 12,
    rating: 4.7,
    reviewsCount: 56,
    profileViews: 1100,
    profileClicks: 298,
    isCertified: false,
    isVisible: false,
    status: 'suspended',
    createdAt: '2024-01-05',
  },
  {
    id: '5',
    firstName: 'Hassan',
    lastName: 'Benjelloun',
    email: 'hassan.benjelloun@email.com',
    phone: '+212 6 77 88 99 00',
    specialty: 'Traducteur assermenté',
    description: 'Traductions officielles français-arabe pour documents légaux.',
    languages: ['Français', 'Arabe'],
    zones: ['Bordeaux', 'Fès'],
    experience: 6,
    rating: 4.5,
    reviewsCount: 19,
    profileViews: 420,
    profileClicks: 95,
    isCertified: true,
    isVisible: true,
    status: 'active',
    createdAt: '2024-04-01',
  },
];

export const mockRegistrationRequests: RegistrationRequest[] = [
  {
    id: 'req-1',
    firstName: 'Mehdi',
    lastName: 'Alaoui',
    email: 'mehdi.alaoui@email.com',
    phone: '+33 6 11 22 33 44',
    specialty: 'Agent immobilier',
    description: 'Expert en investissement immobilier au Maroc pour la diaspora française.',
    documents: [
      { name: 'Carte professionnelle', url: '/documents/sample-document.pdf', status: 'pending' },
      { name: 'Diplôme', url: '/documents/sample-document.pdf', status: 'pending' }
    ],
    submittedAt: '2024-11-28',
    status: 'pending',
  },
  {
    id: 'req-2',
    firstName: 'Samira',
    lastName: 'Ouazzani',
    email: 'samira.ouazzani@email.com',
    phone: '+212 6 55 66 77 88',
    specialty: 'Avocat - Droit de la famille',
    description: 'Spécialisée dans les affaires familiales transfrontalières.',
    documents: [
      { name: 'Attestation du barreau', url: '/documents/sample-document.pdf', status: 'pending' },
      { name: 'CV', url: '/documents/sample-document.pdf', status: 'pending' },
      { name: 'Assurance professionnelle', url: '/documents/sample-document.pdf', status: 'pending' }
    ],
    submittedAt: '2024-11-30',
    status: 'pending',
  },
  {
    id: 'req-3',
    firstName: 'Omar',
    lastName: 'Fassi',
    email: 'omar.fassi@email.com',
    phone: '+33 6 99 88 77 66',
    specialty: 'Conseiller fiscal',
    description: 'Optimisation fiscale pour entrepreneurs binationaux.',
    documents: [
      { name: 'Diplôme', url: '/documents/sample-document.pdf', status: 'pending' }
    ],
    submittedAt: '2024-11-25',
    status: 'pending',
  },
];

export const mockPlatformStats = {
  totalPractitioners: 156,
  activePractitioners: 142,
  pendingRequests: 12,
  totalProfileViews: 45230,
  totalProfileClicks: 12450,
  certifiedPractitioners: 89,
  newThisMonth: 8,
  averageRating: 4.7,
};
