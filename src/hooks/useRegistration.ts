import { useState, useCallback, useEffect } from "react";
import { api, ApiError } from "@/services/api";
import type { 
  RegistrationFormData,
  FinalizeRegistrationResponse 
} from "@/types/api";

const STORAGE_KEY = "welinkyou_registration_draft";

export interface LocalDraft {
  id?: string;
  email: string;
  currentStep: number;
  formData: Partial<RegistrationFormData>;
  lastSaved: string;
}

export interface UseRegistrationOptions {
  /**
   * Callback appelé après chaque auto-save réussi
   */
  onAutoSave?: () => void;
  /**
   * Callback appelé en cas d'erreur
   */
  onError?: (error: Error) => void;
}

export interface DocumentToUpload {
  docType: string;
  file: File;
}

export interface UseRegistrationReturn {
  // State
  localDraft: LocalDraft | null;
  isLoading: boolean;
  isSaving: boolean;
  isUploading: boolean;
  isFinalizing: boolean;
  error: string | null;
  lastSaved: Date | null;
  
  // Actions
  initLocalDraft: (email: string) => void;
  saveToLocal: (step: number, formData: Partial<RegistrationFormData>) => void;
  loadFromLocal: () => LocalDraft | null;
  clearLocalDraft: () => void;
  uploadDocument: (docType: string, file: File) => Promise<void>;
  finalizeRegistration: (
    formData: RegistrationFormData, 
    password: string, 
    passwordConfirm: string,
    documents?: DocumentToUpload[],
    photo?: File | null
  ) => Promise<FinalizeRegistrationResponse | null>;
  checkEmail: (email: string) => Promise<{ available: boolean }>;
  clearError: () => void;
}

export function useRegistration(options: UseRegistrationOptions = {}): UseRegistrationReturn {
  const { onAutoSave, onError } = options;

  const [localDraft, setLocalDraft] = useState<LocalDraft | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  /**
   * Charge le brouillon depuis localStorage
   */
  const loadFromLocal = useCallback((): LocalDraft | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as LocalDraft;
      }
    } catch (err) {
      console.error("Erreur lors du chargement du brouillon local:", err);
    }
    return null;
  }, []);

  // Charger le brouillon depuis localStorage au montage
  useEffect(() => {
    const saved = loadFromLocal();
    if (saved) {
      setLocalDraft(saved);
      setLastSaved(new Date(saved.lastSaved));
    }
  }, [loadFromLocal]);

  const handleError = useCallback((err: unknown) => {
    const message = err instanceof ApiError 
      ? Object.values(err.data).flat().join(", ") || err.message
      : err instanceof Error 
        ? err.message 
        : "Une erreur est survenue";
    
    setError(message);
    onError?.(err instanceof Error ? err : new Error(message));
  }, [onError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Initialise un nouveau brouillon local
   */
  const initLocalDraft = useCallback((email: string) => {
    const existing = loadFromLocal();
    
    // Si un brouillon existe avec le même email, le charger
    if (existing && existing.email === email) {
      setLocalDraft(existing);
      setLastSaved(new Date(existing.lastSaved));
      return;
    }
    
    // Sinon, créer un nouveau brouillon
    const newDraft: LocalDraft = {
      email,
      currentStep: 1,
      formData: { email },
      lastSaved: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));
    setLocalDraft(newDraft);
    setLastSaved(new Date());
  }, [loadFromLocal]);

  /**
   * Sauvegarde les données dans localStorage
   */
  const saveToLocal = useCallback((step: number, formData: Partial<RegistrationFormData>) => {
    setIsSaving(true);
    
    try {
      const existing = loadFromLocal();
      const updatedDraft: LocalDraft = {
        email: formData.email || existing?.email || "",
        currentStep: step,
        formData: {
          ...(existing?.formData || {}),
          ...formData,
        },
        lastSaved: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDraft));
      setLocalDraft(updatedDraft);
      setLastSaved(new Date());
      onAutoSave?.();
    } catch (err) {
      console.error("Erreur lors de la sauvegarde locale:", err);
    } finally {
      setIsSaving(false);
    }
  }, [loadFromLocal, onAutoSave]);

  /**
   * Supprime le brouillon local
   */
  const clearLocalDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLocalDraft(null);
    setLastSaved(null);
  }, []);

  /**
   * Vérifie la disponibilité d'un email (uniquement pour vérifier si un compte existe)
   */
  const checkEmail = useCallback(async (email: string) => {
    try {
      const result = await api.checkEmailAvailability(email);
      return {
        available: result.available,
      };
    } catch (err) {
      // En cas d'erreur API, on suppose que l'email est disponible
      console.error("Erreur lors de la vérification de l'email:", err);
      return { available: true };
    }
  }, []);

  /**
   * Upload un document (stocké temporairement, sera envoyé à la finalisation)
   */
  const uploadDocument = useCallback(async (_docType: string, _file: File) => {
    // Pour l'instant, on ne fait rien côté backend
    // Les documents seront uploadés lors de la finalisation
    setIsUploading(true);
    
    // Simuler un délai pour l'UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsUploading(false);
  }, []);

  /**
   * Finalise l'inscription et crée le compte professionnel
   */
  const finalizeRegistration = useCallback(async (
    formData: RegistrationFormData,
    password: string,
    passwordConfirm: string,
    documents?: { docType: string; file: File }[],
    photo?: File | null
  ): Promise<FinalizeRegistrationResponse | null> => {
    setIsFinalizing(true);
    setError(null);

    try {
      // 1. D'abord créer le brouillon sur le backend avec toutes les données
      const draftResponse = await api.saveDraft({
        email: formData.email,
        current_step: 5,
        form_data: formData,
      });

      // 2. Uploader la photo de profil si elle existe
      console.log("Photo parameter received:", photo ? `File: ${photo.name}, size: ${photo.size}` : "No photo");
      
      if (photo) {
        try {
          console.log("Uploading photo to draft:", draftResponse.id);
          const photoResult = await api.uploadProfilePhoto({
            draft_id: draftResponse.id,
            email: formData.email,
            photo: photo,
          });
          console.log("Photo uploaded successfully:", photoResult);
        } catch (photoErr) {
          console.error("Erreur lors de l'upload de la photo:", photoErr);
          // Ne pas bloquer l'inscription si la photo échoue
        }
      } else {
        console.log("No photo to upload");
      }

      // 3. Uploader les documents (PDF uniquement)
      if (documents && documents.length > 0) {
        setIsUploading(true);
        for (const doc of documents) {
          // Vérifier que c'est un PDF
          if (doc.file.type !== "application/pdf") {
            throw new Error(`Le document "${doc.file.name}" doit être au format PDF.`);
          }
          
          await api.uploadDocument({
            draft_id: draftResponse.id,
            email: formData.email,
            doc_type: doc.docType,
            file: doc.file,
          });
        }
        setIsUploading(false);
      }

      // 4. Finaliser l'inscription
      const result = await api.finalizeRegistration({
        draft_id: draftResponse.id,
        password,
        password_confirm: passwordConfirm,
      });

      // 5. Stocker les tokens dans le localStorage
      if (result.tokens) {
        localStorage.setItem("access_token", result.tokens.access);
        localStorage.setItem("refresh_token", result.tokens.refresh);
      }

      // 6. Supprimer le brouillon local
      clearLocalDraft();

      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setIsFinalizing(false);
      setIsUploading(false);
    }
  }, [clearLocalDraft, handleError]);

  return {
    // State
    localDraft,
    isLoading,
    isSaving,
    isUploading,
    isFinalizing,
    error,
    lastSaved,
    
    // Actions
    initLocalDraft,
    saveToLocal,
    loadFromLocal,
    clearLocalDraft,
    uploadDocument,
    finalizeRegistration,
    checkEmail,
    clearError,
  };
}

export default useRegistration;
