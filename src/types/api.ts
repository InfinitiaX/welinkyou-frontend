// Types pour l'API WeLinkYou Backend

export interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ApiDomaine {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  specialites?: ApiSpecialite[];
}

export interface ApiSpecialite {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface ApiLanguage {
  id: string;
  code: string;
  name: string;
}

export interface ApiPractitionerProfile {
  id: string;
  user: ApiUser;
  title: string;
  headline: string;
  bio: string;
  photo: string | null;
  photo_url: string | null;
  domaine: ApiDomaine | null;
  specialite: ApiSpecialite | null;
  languages: ApiLanguage[];
  country: string;
  city: string;
  experience_years: number;
  phone_number: string;
  whatsapp_number: string;
  contact_email: string;
  website: string;
  linkedin_url: string;
  verified: boolean;
  certified: boolean;
  status: "pending" | "active" | "suspended";
  is_visible: boolean;
  rating: string;
  review_count: number;
  profile_views: number;
  profile_clicks: number;
  documents?: PractitionerDocument[];
  created_at: string;
  updated_at: string;
}

export interface PractitionerDocument {
  id: string;
  doc_type: string;
  doc_type_display: string;
  file_url: string | null;
  original_filename: string;
  status: "pending" | "validated" | "rejected";
  notes: string | null;
  created_at: string;
  reviewed_at: string | null;
}

// Pagination response
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ============================================================================
// TYPES POUR L'INSCRIPTION
// ============================================================================

export interface RegistrationFormData {
  // Step 1 - Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  city: string;
  // Step 2 - Professional Profile
  professionType: "" | "regulated" | "non-regulated";
  category: string;
  subcategory: string;
  specialties: string[];
  description: string;
  experience: string;
  languages: string[];
  professionalLink: string;
  // Plan
  plan: string;
}

export interface RegistrationDocument {
  id: string;
  doc_type: string;
  file: string;
  original_filename: string;
  created_at: string;
}

export interface RegistrationDraft {
  id: string;
  email: string;
  current_step: number;
  form_data: RegistrationFormData;
  status: "draft" | "completed" | "converted";
  documents: RegistrationDocument[];
  created_at: string;
  updated_at: string;
}

export interface CheckEmailResponse {
  email: string;
  available: boolean;
  has_draft: boolean;
  message: string | null;
}

export interface FinalizeRegistrationResponse {
  message: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  profile: {
    id: string;
    title: string;
    status: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

// ============================================================================
// PROFIL PROFESSIONNEL CONNECTÉ
// ============================================================================

export interface ProfileStatusInfo {
  label: string;
  message: string;
  color: "green" | "orange" | "red";
}

export interface ProfileCompleteness {
  percentage: number;
  missing_fields: string[];
}

export interface CurrentPractitionerProfile extends ApiPractitionerProfile {
  status_info: ProfileStatusInfo;
  is_profile_complete: ProfileCompleteness;
}

// ============================================================================
// MISE À JOUR DU PROFIL
// ============================================================================

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  language_ids?: string[];
  bio?: string;
  headline?: string;
  phone_number?: string;
  whatsapp_number?: string;
  website?: string;
  linkedin_url?: string;
  country?: string;
  city?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

// ============================================================================
// ADMIN - INSCRIPTIONS EN ATTENTE
// ============================================================================

export interface RegistrationDocumentDetail {
  id: string;
  doc_type: string;
  doc_type_display: string;
  file_url: string;
  original_filename: string;
  status: "pending" | "validated" | "rejected";
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PendingRegistration {
  id: string;
  user: ApiUser;
  domaine: ApiDomaine | null;
  specialite: ApiSpecialite | null;
  country: string;
  city: string;
  status: "pending" | "active" | "suspended";
  created_at: string;
  updated_at: string;
  documents_count: number;
  validated_documents_count: number;
  rejected_documents_count: number;
}

export interface RegistrationDetail {
  id: string;
  user: ApiUser;
  title: string;
  headline: string;
  bio: string;
  photo_url: string | null;
  domaine: ApiDomaine | null;
  specialite: ApiSpecialite | null;
  languages: ApiLanguage[];
  country: string;
  city: string;
  experience_years: number;
  phone_number: string;
  whatsapp_number: string;
  contact_email: string;
  website: string;
  linkedin_url: string;
  status: "pending" | "active" | "suspended";
  created_at: string;
  updated_at: string;
  documents: RegistrationDocumentDetail[];
  all_documents_validated: boolean;
  has_rejected_documents: boolean;
}
