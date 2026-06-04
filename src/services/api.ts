// Service API pour WeLinkYou Backend

import type { 
  ApiPractitionerProfile, 
  ApiDomaine, 
  ApiSpecialite,
  ApiLanguage,
  PaginatedResponse,
  RegistrationDraft,
  RegistrationDocument,
  CheckEmailResponse,
  FinalizeRegistrationResponse,
  RegistrationFormData,
  CurrentPractitionerProfile,
  PendingRegistration,
  RegistrationDetail,
  ProfileUpdateData,
  ChangePasswordData
} from "@/types/api";


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/api";

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return undefined as T;
    }

    return response.json();
  }

  private async fetchFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    return response.json();
  }

  // ============================================================================
  // GENERIC HTTP METHODS
  // ============================================================================

  /**
   * Méthode GET générique pour les endpoints API
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint);
  }

  // ============================================================================
  // PRACTITIONERS
  // ============================================================================

  async getFeaturedPractitioners(limit = 8): Promise<ApiPractitionerProfile[]> {
    return this.fetch<ApiPractitionerProfile[]>(
      `/practitioners/profiles/featured/?limit=${limit}`
    );
  }t

  async getPractitioners(params?: {
    country?: string;
    city?: string;
    domaine?: string;
    specialite?: string;
    language?: string;
    page?: number;
  }): Promise<PaginatedResponse<ApiPractitionerProfile>> {
    const searchParams = new URLSearchParams();
    if (params?.country) searchParams.append("country", params.country);
    if (params?.city) searchParams.append("city", params.city);
    if (params?.domaine) searchParams.append("domaine", params.domaine);
    if (params?.specialite) searchParams.append("specialite", params.specialite);
    if (params?.language) searchParams.append("language", params.language);
    if (params?.page) searchParams.append("page", params.page.toString());

    const query = searchParams.toString();
    return this.fetch<PaginatedResponse<ApiPractitionerProfile>>(
      `/practitioners/profiles/${query ? `?${query}` : ""}`
    );
  }

  async getPractitionerById(id: string): Promise<ApiPractitionerProfile> {
    return this.fetch<ApiPractitionerProfile>(`/practitioners/profiles/${id}/`);
  }

  // ============================================================================
  // TRACKING - VUES ET CLICS
  // ============================================================================

  /**
   * Enregistre les vues de profils (quand ils apparaissent dans les résultats de recherche)
   */
  async trackProfileViews(profileIds: string[]): Promise<{ recorded: number; total_profiles: number }> {
    return this.fetch<{ recorded: number; total_profiles: number }>(
      "/practitioners/tracking/views/",
      {
        method: "POST",
        body: JSON.stringify({ profile_ids: profileIds }),
      }
    );
  }

  /**
   * Enregistre un clic sur un profil (visite de la page détail)
   */
  async trackProfileClick(profileId: string): Promise<{ recorded: boolean }> {
    return this.fetch<{ recorded: boolean }>(
      `/practitioners/tracking/click/${profileId}/`,
      {
        method: "POST",
      }
    );
  }

  // ============================================================================
  // DOMAINES & SPECIALITES
  // ============================================================================

  async getDomaines(): Promise<ApiDomaine[]> {
    const response = await this.fetch<PaginatedResponse<ApiDomaine> | ApiDomaine[]>(
      "/practitioners/domaines/"
    );
    // Handle both paginated and non-paginated responses
    return Array.isArray(response) ? response : response.results;
  }

  async getSpecialites(): Promise<ApiSpecialite[]> {
    const response = await this.fetch<PaginatedResponse<ApiSpecialite> | ApiSpecialite[]>(
      "/practitioners/specialites/"
    );
    return Array.isArray(response) ? response : response.results;
  }

  // ============================================================================
  // LANGUES
  // ============================================================================

  async getLanguages(): Promise<ApiLanguage[]> {
    const response = await this.fetch<PaginatedResponse<ApiLanguage> | ApiLanguage[]>(
      "/practitioners/languages/"
    );
    return Array.isArray(response) ? response : response.results;
  }

  // ============================================================================
  // PROFIL PROFESSIONNEL CONNECTÉ
  // ============================================================================

  /**
   * Récupère le profil du professionnel actuellement connecté
   */
  async getCurrentPractitionerProfile(): Promise<CurrentPractitionerProfile> {
    const token = localStorage.getItem("access_token");
    return this.fetch<CurrentPractitionerProfile>("/practitioners/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Récupère les statistiques de trafic hebdomadaire du professionnel connecté
   */
  async getPractitionerWeeklyTraffic(): Promise<WeeklyTrafficResponse> {
    const token = localStorage.getItem("access_token");
    return this.fetch<WeeklyTrafficResponse>("/practitioners/me/weekly-traffic/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Met à jour le profil du professionnel connecté
   */
  async updatePractitionerProfile(data: ProfileUpdateData): Promise<CurrentPractitionerProfile> {
    const token = localStorage.getItem("access_token");
    return this.fetch<CurrentPractitionerProfile>("/practitioners/me/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Upload ou met à jour la photo de profil du professionnel connecté
   */
  async uploadPractitionerPhoto(file: File): Promise<{ message: string; photo_url: string }> {
    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("photo", file);

    const url = `${this.baseUrl}/practitioners/me/photo/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    return response.json();
  }

  /**
   * Supprime la photo de profil du professionnel connecté
   */
  async deletePractitionerPhoto(): Promise<{ message: string }> {
    const token = localStorage.getItem("access_token");
    const url = `${this.baseUrl}/practitioners/me/photo/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    return response.json();
  }

  /**
   * Change le mot de passe de l'utilisateur connecté
   */
  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ message: string }>("/auth/change-password/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  // ============================================================================
  // RÉINITIALISATION DE MOT DE PASSE (mot de passe oublié)
  // ============================================================================

  /**
   * Demande un email de réinitialisation de mot de passe
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return this.fetch<{ message: string }>("/auth/password-reset/request/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Valide un token de réinitialisation
   */
  async validateResetToken(token: string): Promise<{ valid: boolean; email?: string; error?: string }> {
    return this.fetch<{ valid: boolean; email?: string; error?: string }>(
      `/auth/password-reset/validate/?token=${encodeURIComponent(token)}`
    );
  }

  /**
   * Réinitialise le mot de passe avec un token
   */
  async resetPassword(data: {
    token: string;
    new_password: string;
    confirm_password: string;
  }): Promise<{ message: string }> {
    return this.fetch<{ message: string }>("/auth/password-reset/reset/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ============================================================================
  // DEMANDE DE SUPPRESSION DE COMPTE
  // ============================================================================

  /**
   * Vérifie si une demande de suppression est en cours
   */
  async getDeletionRequestStatus(): Promise<{
    has_pending_request: boolean;
    request?: {
      id: string;
      reason: string;
      status: string;
      status_display: string;
      created_at: string;
    };
  }> {
    const token = localStorage.getItem("access_token");
    return this.fetch("/practitioners/me/deletion-request/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Crée une demande de suppression de compte
   */
  async createDeletionRequest(reason?: string): Promise<{
    message: string;
    request_id: string;
  }> {
    const token = localStorage.getItem("access_token");
    return this.fetch("/practitioners/me/deletion-request/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason: reason || "" }),
    });
  }

  /**
   * Annule une demande de suppression en attente
   */
  async cancelDeletionRequest(): Promise<{ message: string }> {
    const token = localStorage.getItem("access_token");
    const url = `${this.baseUrl}/practitioners/me/deletion-request/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    return response.json();
  }

  // ============================================================================
  // INSCRIPTION PROFESSIONNEL
  // ============================================================================

  /**
   * Vérifie si un email est disponible pour l'inscription
   */
  async checkEmailAvailability(email: string): Promise<CheckEmailResponse> {
    return this.fetch<CheckEmailResponse>(
      `/practitioners/registration/check-email/?email=${encodeURIComponent(email)}`
    );
  }

  /**
   * Récupère un brouillon existant par email
   */
  async getDraft(email: string): Promise<RegistrationDraft> {
    return this.fetch<RegistrationDraft>(
      `/practitioners/registration/draft/?email=${encodeURIComponent(email)}`
    );
  }

  /**
   * Crée ou met à jour un brouillon d'inscription (auto-save)
   */
  async saveDraft(data: {
    id?: string;
    email: string;
    current_step: number;
    form_data: Partial<RegistrationFormData>;
  }): Promise<RegistrationDraft> {
    const method = data.id ? "PUT" : "POST";
    return this.fetch<RegistrationDraft>("/practitioners/registration/draft/", {
      method,
      body: JSON.stringify(data),
    });
  }

  /**
   * Upload un document pour l'inscription
   */
  async uploadDocument(data: {
    draft_id?: string;
    email: string;
    doc_type: string;
    file: File;
  }): Promise<RegistrationDocument> {
    const formData = new FormData();
    if (data.draft_id) formData.append("draft_id", data.draft_id);
    formData.append("email", data.email);
    formData.append("doc_type", data.doc_type);
    formData.append("file", data.file);

    return this.fetchFormData<RegistrationDocument>(
      "/practitioners/registration/documents/",
      formData
    );
  }

  /**
   * Supprime un document
   */
  async deleteDocument(data: {
    document_id: string;
    draft_id?: string;
    email: string;
  }): Promise<void> {
    const url = `${this.baseUrl}/practitioners/registration/documents/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }
  }

  /**
   * Upload une photo de profil pour l'inscription
   */
  async uploadProfilePhoto(data: {
    draft_id?: string;
    email: string;
    photo: File;
  }): Promise<{ message: string; photo_url: string }> {
    const formData = new FormData();
    if (data.draft_id) formData.append("draft_id", data.draft_id);
    formData.append("email", data.email);
    formData.append("photo", data.photo);

    return this.fetchFormData<{ message: string; photo_url: string }>(
      "/practitioners/registration/photo/",
      formData
    );
  }

  /**
   * Supprime la photo de profil du brouillon
   */
  async deleteProfilePhoto(data: {
    draft_id?: string;
    email: string;
  }): Promise<void> {
    const url = `${this.baseUrl}/practitioners/registration/photo/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }
  }

  /**
   * Finalise l'inscription et crée le compte professionnel
   */
  async finalizeRegistration(data: {
    draft_id: string;
    password: string;
    password_confirm: string;
  }): Promise<FinalizeRegistrationResponse> {
    return this.fetch<FinalizeRegistrationResponse>(
      "/practitioners/registration/finalize/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  // ============================================================================
  // AUTHENTIFICATION
  // ============================================================================

  /**
   * Connexion utilisateur - obtient les tokens JWT
   */
  async login(email: string, password: string): Promise<{ access: string; refresh: string }> {
    const response = await this.fetch<{ access: string; refresh: string }>(
      "/auth/token/",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    
    // Stocker les tokens
    localStorage.setItem("access_token", response.access);
    localStorage.setItem("refresh_token", response.refresh);
    
    return response;
  }

  /**
   * Rafraîchir le token d'accès
   */
  async refreshToken(): Promise<{ access: string }> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    
    const response = await this.fetch<{ access: string }>(
      "/auth/token/refresh/",
      {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );
    
    localStorage.setItem("access_token", response.access);
    return response;
  }

  /**
   * Déconnexion - supprime les tokens
   */
  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  }

  /**
   * Récupère l'utilisateur actuellement connecté
   */
  async getCurrentUser(): Promise<{ 
    id: number; 
    email: string; 
    first_name: string; 
    last_name: string; 
    role: "super_admin" | "practitioner" | "client"; 
    is_profile_completed: boolean 
  }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ 
      id: number; 
      email: string; 
      first_name: string; 
      last_name: string; 
      role: "super_admin" | "practitioner" | "client"; 
      is_profile_completed: boolean 
    }>(
      "/auth/me/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // ============================================================================
  // ADMIN API
  // ============================================================================

  /**
   * Récupère les statistiques globales pour le dashboard admin
   */
  async getAdminStats(): Promise<AdminStats> {
    const token = localStorage.getItem("access_token");
    return this.fetch<AdminStats>("/practitioners/admin/stats/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Récupère les statistiques de trafic hebdomadaire pour le graphique
   */
  async getAdminWeeklyTraffic(): Promise<WeeklyTrafficResponse> {
    const token = localStorage.getItem("access_token");
    return this.fetch<WeeklyTrafficResponse>("/practitioners/admin/weekly-traffic/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Récupère les analytics détaillées (vues et clics)
   */
  async getAdminAnalytics(params?: {
    practitioner_id?: string;
    type?: "views" | "clicks" | "all";
    days?: number;
    page?: number;
    page_size?: number;
  }): Promise<AdminAnalyticsResponse> {
    const token = localStorage.getItem("access_token");
    const searchParams = new URLSearchParams();
    
    if (params?.practitioner_id) searchParams.append("practitioner_id", params.practitioner_id);
    if (params?.type) searchParams.append("type", params.type);
    if (params?.days) searchParams.append("days", params.days.toString());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.page_size) searchParams.append("page_size", params.page_size.toString());
    
    const query = searchParams.toString();
    return this.fetch<AdminAnalyticsResponse>(
      `/practitioners/admin/analytics/${query ? `?${query}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Récupère la liste des professionnels pour l'admin
   */
  async getAdminPractitioners(params?: {
    status?: string;
    search?: string;
    certified?: boolean;
    page?: number;
  }): Promise<PaginatedResponse<ApiPractitionerProfile>> {
    const token = localStorage.getItem("access_token");
    const searchParams = new URLSearchParams();
    
    if (params?.status && params.status !== "all") searchParams.append("status", params.status);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.certified !== undefined) searchParams.append("certified", String(params.certified));
    if (params?.page) searchParams.append("page", params.page.toString());
    
    const query = searchParams.toString();
    return this.fetch<PaginatedResponse<ApiPractitionerProfile>>(
      `/practitioners/admin/practitioners/${query ? `?${query}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Bascule le statut certifié d'un professionnel
   */
  async togglePractitionerCertified(id: string): Promise<{ id: string; certified: boolean; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; certified: boolean; message: string }>(
      `/practitioners/admin/practitioners/${id}/toggle-certified/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Bascule le statut vérifié d'un professionnel
   */
  async togglePractitionerVerified(id: string): Promise<{ id: string; verified: boolean; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; verified: boolean; message: string }>(
      `/practitioners/admin/practitioners/${id}/toggle-verified/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Bascule la visibilité d'un professionnel
   */
  async togglePractitionerVisibility(id: string): Promise<{ id: string; is_visible: boolean; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; is_visible: boolean; message: string }>(
      `/practitioners/admin/practitioners/${id}/toggle-visibility/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Change le statut d'un professionnel
   */
  async changePractitionerStatus(id: string, status: string): Promise<{ id: string; status: string; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; message: string }>(
      `/practitioners/admin/practitioners/${id}/change-status/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
  }

  /**
   * Récupère la liste des documents pour l'admin
   */
  async getAdminDocuments(params?: {
    status?: string;
    search?: string;
    type?: string;
    page?: number;
  }): Promise<PaginatedResponse<AdminDocument>> {
    const token = localStorage.getItem("access_token");
    const searchParams = new URLSearchParams();
    
    if (params?.status && params.status !== "all") searchParams.append("status", params.status);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.type) searchParams.append("type", params.type);
    if (params?.page) searchParams.append("page", params.page.toString());
    
    const query = searchParams.toString();
    return this.fetch<PaginatedResponse<AdminDocument>>(
      `/practitioners/admin/documents/${query ? `?${query}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Valide un document
   */
  async validateDocument(id: string): Promise<{ id: string; status: string; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; message: string }>(
      `/practitioners/admin/documents/${id}/validate/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Rejette un document
   */
  async rejectDocument(id: string): Promise<{ id: string; status: string; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; message: string }>(
      `/practitioners/admin/documents/${id}/reject/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Supprime un document (admin)
   */
  async adminDeleteDocument(id: string): Promise<void> {
    const token = localStorage.getItem("access_token");
    await this.fetch<void>(
      `/practitioners/admin/documents/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // ============================================================================
  // ADMIN PENDING REGISTRATIONS
  // ============================================================================

  /**
   * Récupère les inscriptions en attente de validation
   */
  async getPendingRegistrations(params?: {
    search?: string;
    domaine?: string;
    specialite?: string;
    country?: string;
    page?: number;
    page_size?: number;
  }): Promise<PaginatedResponse<PendingRegistration>> {
    const token = localStorage.getItem("access_token");
    const searchParams = new URLSearchParams();
    
    if (params?.search) searchParams.append("search", params.search);
    if (params?.domaine) searchParams.append("domaine", params.domaine);
    if (params?.specialite) searchParams.append("specialite", params.specialite);
    if (params?.country) searchParams.append("country", params.country);
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.page_size) searchParams.append("page_size", params.page_size.toString());
    
    const query = searchParams.toString();
    return this.fetch<PaginatedResponse<PendingRegistration>>(
      `/practitioners/admin/registrations/${query ? `?${query}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Récupère le détail d'une inscription en attente
   */
  async getRegistrationDetail(id: string): Promise<RegistrationDetail> {
    const token = localStorage.getItem("access_token");
    return this.fetch<RegistrationDetail>(
      `/practitioners/admin/registrations/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Valide un document d'une inscription
   */
  async validateRegistrationDocument(
    registrationId: string,
    documentId: string
  ): Promise<{ id: string; status: string; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; message: string }>(
      `/practitioners/admin/registrations/${registrationId}/documents/${documentId}/validate/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Rejette un document d'une inscription avec motif
   */
  async rejectRegistrationDocument(
    registrationId: string,
    documentId: string,
    reason: string
  ): Promise<{ id: string; status: string; notes: string; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; notes: string; message: string }>(
      `/practitioners/admin/registrations/${registrationId}/documents/${documentId}/reject/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      }
    );
  }

  /**
   * Approuve une inscription (tous les documents doivent être validés)
   */
  async approveRegistration(id: string): Promise<{ id: string; status: string; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; message: string }>(
      `/practitioners/admin/registrations/${id}/approve/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Rejette une inscription (au moins un document doit être rejeté)
   */
  async rejectRegistration(id: string): Promise<{ id: string; status: string; rejected_documents_count: number; message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ id: string; status: string; rejected_documents_count: number; message: string }>(
      `/practitioners/admin/registrations/${id}/reject/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // ============================================================================
  // CONTACT FORM
  // ============================================================================

  /**
   * Envoie un message de contact
   */
  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ id: string; message: string }> {
    return this.fetch<{ id: string; message: string }>(
      "/content/contact-messages/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  /**
   * Récupère les soumissions de contact (admin)
   */
  async getAdminContacts(params?: {
    status?: string;
    search?: string;
    page?: number;
  }): Promise<PaginatedResponse<ContactSubmission>> {
    const token = localStorage.getItem("access_token");
    const searchParams = new URLSearchParams();
    
    if (params?.status && params.status !== "all") searchParams.append("status", params.status);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.page) searchParams.append("page", params.page.toString());
    
    const query = searchParams.toString();
    return this.fetch<PaginatedResponse<ContactSubmission>>(
      `/content/admin/contacts/${query ? `?${query}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Marque une soumission comme lue
   */
  async markContactAsRead(id: string): Promise<{ status: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ status: string }>(
      `/content/admin/contacts/${id}/mark_read/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  /**
   * Supprime une soumission de contact
   */
  async deleteContact(id: string): Promise<void> {
    const token = localStorage.getItem("access_token");
    await this.fetch<void>(
      `/content/admin/contacts/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // ============================================================================
  // SUPERADMIN MANAGEMENT API
  // ============================================================================

  /**
   * Récupère la liste des superadmins
   */
  async getSuperAdmins(): Promise<SuperAdmin[]> {
    const token = localStorage.getItem("access_token");
    return this.fetch<SuperAdmin[]>("/practitioners/admin/superadmins/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Crée un nouveau superadmin
   */
  async createSuperAdmin(data: CreateSuperAdminData): Promise<SuperAdmin> {
    const token = localStorage.getItem("access_token");
    return this.fetch<SuperAdmin>("/practitioners/admin/superadmins/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Met à jour un superadmin
   */
  async updateSuperAdmin(id: number, data: UpdateSuperAdminData): Promise<SuperAdmin> {
    const token = localStorage.getItem("access_token");
    return this.fetch<SuperAdmin>(`/practitioners/admin/superadmins/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Supprime un superadmin
   */
  async deleteSuperAdmin(id: number): Promise<{ message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ message: string }>(`/practitioners/admin/superadmins/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Récupère le profil du superadmin connecté
   */
  async getSuperAdminProfile(): Promise<SuperAdmin> {
    const token = localStorage.getItem("access_token");
    return this.fetch<SuperAdmin>("/practitioners/admin/superadmins/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Met à jour le profil du superadmin connecté
   */
  async updateSuperAdminProfile(data: UpdateSuperAdminData): Promise<SuperAdmin> {
    const token = localStorage.getItem("access_token");
    return this.fetch<SuperAdmin>("/practitioners/admin/superadmins/me/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Change le mot de passe du superadmin connecté
   */
  async changeSuperAdminPassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const token = localStorage.getItem("access_token");
    return this.fetch<{ message: string }>("/practitioners/admin/superadmins/me/password/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  }
}

// Types pour l'admin
export interface AdminStats {
  active_practitioners: number;
  certified_practitioners: number;
  total_views: number;
  total_clicks: number;
}

export interface WeeklyTrafficDay {
  day: string;  // "Lun", "Mar", etc.
  date: string; // "2026-01-12"
  views: number;
  clicks: number;
}

export interface WeeklyTrafficResponse {
  weekly_traffic: WeeklyTrafficDay[];
  total_views_week: number;
  total_clicks_week: number;
}

export interface AnalyticsEvent {
  id: string;
  type: "view" | "click";
  practitioner: {
    id: string;
    name: string;
    email: string;
  };
  visitor: {
    ip_address: string;
    user_agent: string;
    referer?: string;
    user_email: string | null;
    user_name: string | null;
  };
  created_at: string;
}

export interface AdminAnalyticsResponse {
  events: AnalyticsEvent[];
  total_count: number;
  page: number;
  page_size: number;
  practitioner_stats: {
    total_views: number;
    total_clicks: number;
    views_today: number;
    clicks_today: number;
    views_period: number;
    clicks_period: number;
  } | null;
}

export interface AdminDocument {
  id: string;
  doc_type: string;
  file: string;
  file_url: string;
  status: "pending" | "validated" | "rejected";
  notes: string;
  created_at: string;
  reviewed_at: string | null;
  practitioner: {
    id: string;
    name: string;
    email: string;
    speciality: string | null;
    status: string;
  };
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

// Types pour la gestion des superadmins
export interface SuperAdmin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
}

export interface CreateSuperAdminData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

export interface UpdateSuperAdminData {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  is_active?: boolean;
}

/**
 * Classe d'erreur personnalisée pour les erreurs API
 */
export class ApiError extends Error {
  status: number;
  statusText: string;
  data: Record<string, unknown>;

  constructor(status: number, statusText: string, data: Record<string, unknown>) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

export const api = new ApiService(API_BASE_URL);
export default api;
