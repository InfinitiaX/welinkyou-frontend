import { useState, useEffect, useCallback } from "react";
// ...existing imports...
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  User,
  FileText,
  CreditCard,
  Eye,
  Camera,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  Star,
  Shield,
  Clock,
  Languages,
  Award,
  Building,
  MessageCircle,
  Plus,
  Download,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PrivacyPolicyProDialog } from "@/components/PrivacyPolicyProDialog";
import { CGUProDialog } from "@/components/CGUProDialog";
import { CharterProDialog } from "@/components/CharterProDialog";
import { useLocations } from "@/hooks/useLocations";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { ApiDomaine, ApiSpecialite } from "@/types/api";

const steps = [
  { id: 1, title: "Informations", icon: User, description: "Vos coordonnées" },
  { id: 2, title: "Profil", icon: Briefcase, description: "Expertise & langues" },
  { id: 3, title: "Documents", icon: FileText, description: "Justificatifs" },
  { id: 4, title: "Abonnement", icon: CreditCard, description: "Votre formule" },
  { id: 5, title: "Aperçu", icon: Eye, description: "Vérification" },
];

const availableLanguages = [
  { id: "fr", name: "Français", flag: "🇫🇷", code: "FR" },
  { id: "ar", name: "Arabe", flag: "🇲🇦", code: "MA" },
  { id: "en", name: "Anglais", flag: "🇬🇧", code: "GB" },
  { id: "es", name: "Espagnol", flag: "🇪🇸", code: "ES" },
  { id: "de", name: "Allemand", flag: "🇩🇪", code: "DE" },
  { id: "it", name: "Italien", flag: "🇮🇹", code: "IT" },
];

const experienceOptions = [
  { value: "1-3", label: "1-3 ans" },
  { value: "4-7", label: "4-7 ans" },
  { value: "8-12", label: "8-12 ans" },
  { value: "12+", label: "Plus de 12 ans" },
];

const allDocuments = [
  { id: "identity", name: "Preuve d'identité", description: "Carte d'identité ou passeport en cours de validité.", icon: User, required: false, hidden: true },
  { id: "registration", name: "Justificatif du droit d’exercer", description: "Attestation d’inscription à un ordre ou registre professionnel, autorisation d’exercice ou document équivalent ", icon: FileText, required: true },
  // Champ désactivé sur demande du client : diplôme ou titre professionnel
  // { id: "diploma", name: "Diplôme ou titre professionnel", description: "Diplôme ou titre permettant l'accès à la profession, ou document équivalent déclaré.", icon: Award, required: false, recommended: true },
  { id: "kbis", name: "Justificatif de la structure d’exercice ", description: "Document attestant de l’exercice légal du cabinet, société ou structure d’exercice(ex : extrait d’immatriculation) ", icon: Building, required: false, conditional: true },
];

const STORAGE_KEY = "welinkyou_pro_registration";

// Helper to get saved data from localStorage
const getSavedFormData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Don't restore file objects, photo preview, or passwords
      return {
        ...parsed,
        photo: null,
        photoPreview: "",
        documents: {},
        password: "",
        passwordConfirm: "",
      };
    }
  } catch (e) {
    console.error("Error loading saved form data:", e);
  }
  return null;
};

const ProRegistration = () => {
  // Dynamic locations from API
  const { countries, getCitiesForCountry, isLoading: isLoadingLocations } = useLocations();
  const navigate = useNavigate();
  
  // Dynamic domaines and specialites from API
  const [domaines, setDomaines] = useState<ApiDomaine[]>([]);
  const [allSpecialites, setAllSpecialites] = useState<ApiSpecialite[]>([]);
  const [isLoadingDomaines, setIsLoadingDomaines] = useState(true);
  
  // Load domaines and specialites on mount
  useEffect(() => {
    const loadDomainesAndSpecialites = async () => {
      try {
        setIsLoadingDomaines(true);
        const [domainesData, specialitesData] = await Promise.all([
          api.getDomaines(),
          api.getSpecialites()
        ]);
        setDomaines(domainesData);
        setAllSpecialites(specialitesData);
      } catch (error) {
        console.error("Error loading domaines/specialites:", error);
      } finally {
        setIsLoadingDomaines(false);
      }
    };
    loadDomainesAndSpecialites();
  }, []);
  
  const savedData = getSavedFormData();
  
  const [currentStep, setCurrentStep] = useState(savedData?.currentStep || 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [draftId, setDraftId] = useState<string | null>(savedData?.draftId || null);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    firstName: savedData?.firstName || "",
    lastName: savedData?.lastName || "",
    email: savedData?.email || "",
    phone: savedData?.phone || "",
    whatsapp: savedData?.whatsapp || "",
    country: savedData?.country || "",
    city: savedData?.city || "",
    // Step 2 - Professional Profile
    professionType: (savedData?.professionType || "") as "" | "regulated" | "non-regulated",
    category: savedData?.category || "",
    subcategory: savedData?.subcategory || "",
    specialties: savedData?.specialties || [] as string[],
    description: savedData?.description || "",
    experience: savedData?.experience || "",
    languages: savedData?.languages || [] as string[],
    professionalLink: savedData?.professionalLink || "",
    // Photo
    photo: null as File | null,
    photoPreview: "",
    // Documents
    documents: {} as Record<string, { file: File | null; name: string; status: string }>,
    // Plan
    plan: savedData?.plan || "freemium",
    // Consents
    acceptCGU: savedData?.acceptCGU || false,
    acceptPrivacyPolicy: savedData?.acceptPrivacyPolicy || false,
    acceptCharter: savedData?.acceptCharter || false,
    // Password
    password: "",
    passwordConfirm: "",
  });

  // Autosave to localStorage
  const saveToStorage = useCallback(() => {
    try {
      const dataToSave = {
        ...formData,
        currentStep,
        // Don't save sensitive or file data
        photo: null,
        photoPreview: "",
        documents: {},
        password: "",
        passwordConfirm: "",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Error saving form data:", e);
    }
  }, [formData, currentStep]);

  // Save on every change
  useEffect(() => {
    saveToStorage();
  }, [saveToStorage]);

  // Clear storage on successful submission
  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  // Save draft to backend
  const saveDraftToBackend = async () => {
    try {
      const draftData = {
        id: draftId || undefined,
        email: formData.email,
        current_step: currentStep,
        form_data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || undefined,
          country: formData.country,
          city: formData.city,
          profession_type: formData.professionType,
          domaine_slug: formData.category,
          specialite_slug: formData.subcategory || undefined,
          specialties: formData.specialties,
          description: formData.description,
          experience: formData.experience,
          languages: formData.languages,
          professional_link: formData.professionalLink || undefined,
          plan: formData.plan,
        },
      };
      
      const response = await api.saveDraft(draftData);
      if (response.id && !draftId) {
        setDraftId(response.id);
        // Also save draftId to localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.draftId = response.id;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
      }
      return response;
    } catch (error) {
      console.error("Error saving draft to backend:", error);
      throw error;
    }
  };

  // Upload documents to backend
  const uploadDocumentsToBackend = async (currentDraftId: string) => {
    const uploadPromises = Object.entries(formData.documents).map(async ([docType, doc]) => {
      if (doc.file) {
        try {
          await api.uploadDocument({
            draft_id: currentDraftId,
            email: formData.email,
            doc_type: docType,
            file: doc.file,
          });
        } catch (error) {
          console.error(`Error uploading document ${docType}:`, error);
          throw error;
        }
      }
    });
    
    await Promise.all(uploadPromises);
  };

  // Upload photo to backend
  const uploadPhotoToBackend = async (currentDraftId: string) => {
    if (formData.photo) {
      try {
        await api.uploadProfilePhoto({
          draft_id: currentDraftId,
          email: formData.email,
          photo: formData.photo,
        });
      } catch (error) {
        console.error("Error uploading photo:", error);
        throw error;
      }
    }
  };

  // Handle final submission
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Step 1: Save/update draft to get draft_id
      console.log("[REGISTRATION] Saving draft to backend...");
      const draftResponse = await saveDraftToBackend();
      const currentDraftId = draftResponse.id;
      console.log("[REGISTRATION] Draft saved with ID:", currentDraftId);
      
      // Step 2: Upload photo if exists
      if (formData.photo) {
        console.log("[REGISTRATION] Uploading photo...");
        await uploadPhotoToBackend(currentDraftId);
        console.log("[REGISTRATION] Photo uploaded successfully");
      }
      
      // Step 3: Upload documents
      const hasDocuments = Object.keys(formData.documents).length > 0;
      if (hasDocuments) {
        console.log("[REGISTRATION] Uploading documents...");
        await uploadDocumentsToBackend(currentDraftId);
        console.log("[REGISTRATION] Documents uploaded successfully");
      }
      
      // Step 4: Finalize registration
      console.log("[REGISTRATION] Finalizing registration...");
      const result = await api.finalizeRegistration({
        draft_id: currentDraftId,
        password: formData.password,
        password_confirm: formData.passwordConfirm,
      });
      
      console.log("[REGISTRATION] Registration successful!", result);
      
      // Store tokens if returned
      if (result.tokens) {
        localStorage.setItem("access_token", result.tokens.access);
        localStorage.setItem("refresh_token", result.tokens.refresh);
      }
      
      // Clear saved data and show success
      clearSavedData();
      setIsSuccess(true);
      
    } catch (error: unknown) {
      console.error("[REGISTRATION] Error during registration:", error);
      
      let errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      
      // Handle ApiError from our API service
      if (error && typeof error === 'object' && 'data' in error) {
        const apiError = error as { data?: Record<string, unknown>; message?: string };
        console.error("[REGISTRATION] API Error data:", apiError.data);
        
        if (apiError.data) {
          // Check for specific error field
          if (typeof apiError.data.error === 'string') {
            errorMessage = apiError.data.error;
          } 
          // Check for email-specific error
          else if (apiError.data.email && Array.isArray(apiError.data.email)) {
            errorMessage = (apiError.data.email as string[])[0];
          }
          // Check for other field errors
          else {
            const firstError = Object.entries(apiError.data).find(([, v]) => Array.isArray(v) && v.length > 0);
            if (firstError) {
              errorMessage = `${firstError[0]}: ${(firstError[1] as string[])[0]}`;
            }
          }
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [newSpecialty, setNewSpecialty] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleDocumentUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [docId]: { file, name: file.name, status: "pending" },
        },
      });
    }
  };

  const removeDocument = (docId: string) => {
    const newDocs = { ...formData.documents };
    delete newDocs[docId];
    setFormData({ ...formData, documents: newDocs });
  };

  const toggleLanguage = (langId: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.includes(langId)
        ? formData.languages.filter((l) => l !== langId)
        : [...formData.languages, langId],
    });
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((s) => s !== specialty),
    });
  };

  // Find current domaine and its specialites from API data
  const currentCategory = domaines.find((d) => d.slug === formData.category);
  const currentCategorySpecialites = currentCategory?.specialites || allSpecialites.filter(s => {
    // Fallback: try to match by checking if the specialite belongs to this domaine
    return true; // If specialites are nested in domaine, use that
  });
  const availableCities = formData.country ? getCitiesForCountry(formData.country) : [];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.country &&
          formData.city
        );
      case 2:
        return formData.professionType && formData.category && formData.subcategory && formData.languages.length > 0 && formData.experience;
      case 3: {
        // Required documents: identity, registration, charter
        const requiredDocs = allDocuments.filter(d => d.required).map(d => d.id);
        return requiredDocs.every(docId => formData.documents[docId]);
      }
      case 4:
        return formData.plan;
      case 5:
        return formData.acceptCGU && formData.acceptPrivacyPolicy && formData.acceptCharter && 
               formData.password.length >= 8 && formData.password === formData.passwordConfirm;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background-soft to-primary/5">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Check className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Inscription réussie ! 🎉
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Votre demande d'inscription a été soumise avec succès. Notre équipe va examiner vos documents et valider votre profil dans les 24-48h ouvrées.
              </p>

              <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Prochaines étapes</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Vous recevrez un email de confirmation à <strong className="text-foreground">{formData.email || "votre adresse"}</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Notre équipe vérifiera vos documents sous 24-48h
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Une fois validé, votre profil sera visible sur notre plateforme
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="h-12 px-6 rounded-xl">
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link to="/recherche">
                  <Button className="h-12 px-6 rounded-full gradient-vibrant-horizontal border-0 hover:brightness-110 transition-all">
                    Découvrir les professionnels
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
          {/* Header */}
          <div className="max-w-5xl mx-auto mb-8">
            <Link
              to="/espace-professionnel"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'espace professionnel
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-vibrant-soft text-white text-sm font-medium mb-4">
                <Star className="w-4 h-4" />
                Rejoignez notre réseau de professionnels vérifiés
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Créez votre profil professionnel
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                En quelques minutes, rendez votre expertise accessible auprès d'une audience ciblée, réellement en recherche de vos compétences.
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Progress Steps - Horizontal Timeline */}
            <div className="mb-10 px-4">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden md:block" />
                <div
                  className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end transition-all duration-500 hidden md:block"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                <div className="flex flex-wrap justify-between relative">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "flex flex-col items-center w-1/5 min-w-[80px]",
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                        <div
                          className={cn(
                            "relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                            currentStep > step.id
                              ? "gradient-vibrant text-white shadow-lg shadow-gradient-start/30"
                              : currentStep === step.id
                              ? "bg-gradient-start/10 border-2 border-gradient-start"
                              : "bg-card border-2 border-border"
                          )}
                          onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                        >
                        {currentStep > step.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="mt-3 text-xs font-semibold hidden sm:block">{step.title}</span>
                      <span className="text-[10px] text-muted-foreground hidden lg:block">{step.description}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
              >
                {/* Step Header */}
                <div className="px-8 py-6 border-b border-border bg-gradient-to-r from-gradient-start/5 via-gradient-mid/5 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-vibrant flex items-center justify-center text-white">
                      {steps[currentStep - 1] && (() => { const StepIcon = steps[currentStep - 1].icon; return <StepIcon className="w-6 h-6" />; })()}
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-semibold text-foreground">
                        {steps[currentStep - 1]?.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Étape {currentStep} sur {steps.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      {/* Photo Upload - Centered */}
                      <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-emerald/20 p-1">
                            <div className="w-full h-full rounded-full bg-card overflow-hidden">
                              {formData.photoPreview ? (
                                <img
                                  src={formData.photoPreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                  <User className="w-12 h-12 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                          <label
                            htmlFor="photo"
                            className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                          >
                            <Camera className="w-5 h-5" />
                          </label>
                          <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Photo de profil professionnelle
                        </p>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Prénom <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Yasmine"
                            className="h-12 rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Nom <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="El Mansouri"
                            className="h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="y.elmansouri@cabinet.ma"
                            className="h-12 rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            Téléphone <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+212 6 12 34 56 78"
                            className="h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-green-500" />
                          WhatsApp (si différent)
                        </Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="+212 6 12 34 56 78"
                          className="h-12 rounded-xl"
                        />
                      </div>

                      {/* Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="country" className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            Pays <span className="text-destructive">*</span>
                          </Label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            disabled={isLoadingLocations}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                          >
                            <option value="">{isLoadingLocations ? "Chargement..." : "Sélectionnez un pays"}</option>
                            {countries.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            Ville <span className="text-destructive">*</span>
                          </Label>
                          <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!formData.country}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                          >
                            <option value="">Sélectionnez une ville</option>
                            {availableCities.filter(c => c.code !== "all").map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Professional Profile */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Profession Type Selection */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          Type de profession <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, professionType: "regulated" })}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                              formData.professionType === "regulated"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                              formData.professionType === "regulated"
                                ? "border-primary bg-primary"
                                : "border-emerald"
                            )}>
                              {formData.professionType === "regulated" && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Profession réglementée</span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Avocat, expert-comptable, notaire, etc.
                              </p>
                            </div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, professionType: "non-regulated" })}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                              formData.professionType === "non-regulated"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                              formData.professionType === "non-regulated"
                                ? "border-primary bg-primary"
                                : "border-emerald"
                            )}>
                              {formData.professionType === "non-regulated" && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Profession non réglementée</span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Consultant, formateur, etc.
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Category & Subcategory */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Domaine d'expertise <span className="text-destructive">*</span>
                          </Label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            disabled={isLoadingDomaines}
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                          >
                            <option value="">{isLoadingDomaines ? "Chargement..." : "Sélectionnez un domaine"}</option>
                            {domaines.map((d) => (
                              <option key={d.slug} value={d.slug}>
                                {d.icon} {d.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subcategory" className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Spécialité principale <span className="text-red-500">*</span>
                          </Label>
                          <select
                            id="subcategory"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleInputChange}
                            disabled={!formData.category || isLoadingDomaines}
                            required
                            className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                          >
                            <option value="">Sélectionnez une spécialité</option>
                            {currentCategorySpecialites.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Specialties Tags */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary" />
                          Spécialités additionnelles
                        </Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="px-3 py-1.5 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 cursor-pointer"
                              onClick={() => removeSpecialty(specialty)}
                            >
                              {specialty}
                              <X className="w-3 h-3 ml-2" />
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newSpecialty}
                            onChange={(e) => setNewSpecialty(e.target.value)}
                            placeholder="Ex: Droit des sociétés"
                            className="h-12 rounded-xl"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addSpecialty}
                            className="h-12 px-4 rounded-xl"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Années d'expérience <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {experienceOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, experience: option.value })}
                              className={cn(
                                "p-4 rounded-xl border-2 text-center transition-all",
                                formData.experience === option.value
                                  ? "border-primary bg-primary/10 text-primary font-medium"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-primary" />
                          Langues parlées <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableLanguages.map((lang) => (
                            <button
                              key={lang.id}
                              type="button"
                              onClick={() => toggleLanguage(lang.id)}
                              className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                formData.languages.includes(lang.id)
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <span className="text-2xl">{lang.flag}</span>
                              <span className={cn(
                                "font-medium",
                                formData.languages.includes(lang.id) ? "text-primary" : "text-foreground"
                              )}>
                                {lang.name}
                              </span>
                              {formData.languages.includes(lang.id) && (
                                <Check className="w-4 h-4 text-primary ml-auto" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          À propos de vous
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Présentez votre parcours, votre expertise et ce qui vous distingue..."
                          rows={5}
                          className="rounded-xl resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          Cette description apparaîtra sur votre profil public. Dites-en plus sur vous : un profil complet génère plus d'intérêt.
                        </p>
                      </div>

                      {/* Professional Link */}
                      <div className="space-y-2">
                        <Label htmlFor="professionalLink" className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          Lien professionnel
                        </Label>
                        <Input
                          id="professionalLink"
                          name="professionalLink"
                          type="url"
                          value={formData.professionalLink}
                          onChange={handleInputChange}
                          placeholder="https://www.linkedin.com/in/votre-profil ou votre site web"
                          className="h-12 rounded-xl"
                        />
                        <p className="text-xs text-muted-foreground">
                          Site web, page LinkedIn ou autre profil professionnel
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Documents */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="bg-primary/5 rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Mes documents – Profil vérifié</p>
                            <p className="text-sm text-muted-foreground">
                               La vérification de vos documents nous permet d’attribuer le badge « Profil vérifié »
                                et d’assurer la confiance des utilisateurs. Les justificatifs sont supprimés dès leur
                                vérification et au plus tard, dans un délai de 30 jours. 
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {allDocuments.filter((doc) => !doc.hidden).map((doc) => {
                          const isRequired = doc.required;
                          // const isRecommended = doc.recommended;
                          const isConditional = doc.conditional;
                          
                          return (
                            <div
                              key={doc.id}
                              className={cn(
                                "p-4 rounded-xl border-2 transition-all",
                                formData.documents[doc.id]
                                  ? "border-primary/50 bg-primary/5"
                                  : "border-dashed border-border hover:border-primary/30"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                  formData.documents[doc.id]
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                )}>
                                  <doc.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-medium text-foreground">{doc.name}</h4>
                                    {isRequired ? (
                                      <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded-full">
                                        Requis
                                      </span>
                                    // ) : isRecommended ? (
                                    //   <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                                    //     Optionnel – recommandé
                                    //   </span>
                                    ) : isConditional ? (
                                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                        Si applicable
                                      </span>
                                    ) : (
                                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                        Optionnel
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-0.5">{doc.description}</p>
                                  
                                  <div className="flex flex-wrap items-center gap-2 mt-2">
                                    {formData.documents[doc.id] ? (
                                      <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border">
                                          <FileText className="w-4 h-4 text-primary" />
                                          <span className="text-sm text-foreground truncate max-w-[180px]">
                                            {formData.documents[doc.id].name}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() => removeDocument(doc.id)}
                                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ) : (
                                      <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
                                        <Upload className="w-4 h-4" />
                                        <span className="text-sm font-medium">Choisir un fichier</span>
                                        <input
                                          type="file"
                                          accept=".pdf,.jpg,.jpeg,.png"
                                          onChange={(e) => handleDocumentUpload(doc.id, e)}
                                          className="hidden"
                                        />
                                      </label>
                                    )}
                                  </div>
                                </div>
                                {formData.documents[doc.id] && (
                                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex-shrink-0">
                                    <Clock className="w-3 h-3" />
                                    En attente
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        Formats acceptés : PDF, JPG, PNG • Max 10 MB par fichier
                      </p>
                    </div>
                  )}

                  {/* Step 4: Subscription */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      {/* Freemium Plan */}
                      <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2 font-medium">Offre Freemium</p>
                        <p className="text-4xl font-bold text-foreground mb-1">
                          Gratuit
                        </p>
                        <p className="text-sm text-muted-foreground">Accès gratuit pendant la phase de lancement de WeLinkYou</p>
                      </div>

                      <div className="bg-card border border-border rounded-2xl p-6">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          Inclus dans votre inscription
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Profil professionnel complet",
                            "Badge vérifié après validation",
                            "Visibilité dans les résultats",
                            "Statistiques de votre profil",
                            "Support dédié",
                            "Mises à jour illimitées",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Coming Soon Features */}
                      <div className="bg-muted/30 border border-border rounded-2xl p-6">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          Disponible prochainement
                        </h4>
                        <ul className="space-y-3">
                          {[
                            "Paiements sécurisés sur la plateforme",
                            "Consultations vidéo intégrées",
                            "Prise de rendez-vous en ligne",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                              </div>
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Preview */}
                  {currentStep === 5 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Main content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Hero card */}
                        <div className="card-premium p-6">
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Photo */}
                            <div className="relative flex-shrink-0">
                              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-muted overflow-hidden ring-4 ring-primary/20">
                                {formData.photoPreview ? (
                                  <img
                                    src={formData.photoPreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <User className="w-12 h-12 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              {/* Verified Badge */}
                              <div className="absolute -bottom-2 -right-2">
                                <div className="badge-verified">
                                  <Shield className="w-4 h-4" />
                                  Vérifié
                                </div>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-2">
                                {formData.firstName || "Prénom"} {formData.lastName || "Nom"}
                              </h3>
                              <p className="text-primary text-lg font-medium mb-4">
                                {currentCategory?.name || "Domaine"} - {
                                  currentCategorySpecialites.find(s => s.slug === formData.subcategory)?.name || "Spécialité"
                                }
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  <span>
                                    {formData.city
                                      ? availableCities.find((c) => c.code === formData.city)?.name
                                      : "Ville"}, {formData.country
                                      ? countries.find((c) => c.code === formData.country)?.name
                                      : "Pays"} {formData.country === "france" ? "🇫🇷" : formData.country === "maroc" ? "🇲🇦" : ""}
                                  </span>
                                </div>
                                {formData.experience && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{experienceOptions.find(e => e.value === formData.experience)?.label.replace(" ans", "")} ans d'expérience</span>
                                  </div>
                                )}
                              </div>

                             
                            </div>
                          </div>
                        </div>

                        {/* À propos */}
                        <div className="card-premium p-6">
                          <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" />
                            À propos
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {formData.description || "Aucune description ajoutée"}
                          </p>
                        </div>

                        {/* Spécialités */}
                        {formData.specialties.length > 0 && (
                          <div className="card-premium p-6">
                            <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-primary" />
                              Spécialités
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.specialties.map((specialty) => (
                                <span
                                  key={specialty}
                                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Langues parlées */}
                        {formData.languages.length > 0 && (
                          <div className="card-premium p-6">
                            <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                              <Globe className="w-5 h-5 text-primary" />
                              Langues parlées
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.languages.map((langId) => {
                                const lang = availableLanguages.find(l => l.id === langId);
                                return lang ? (
                                  <span
                                    key={langId}
                                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium"
                                  >
                                    {lang.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sidebar - Contact */}
                      <div className="lg:col-span-1">
                        <div className="card-premium p-6 sticky top-28">
                          <h4 className="text-lg font-semibold text-foreground mb-6">
                            Contacter {formData.firstName || "Prénom"}
                          </h4>

                          <div className="space-y-3">
                            {/* WhatsApp */}
                            <Button
                              size="lg"
                              className="w-full btn-ripple gap-2 bg-[#25D366] hover:bg-[#20BD5A] border-0"
                            >
                              <MessageCircle className="w-5 h-5" />
                              WhatsApp
                            </Button>

                            {/* Phone */}
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full gap-2"
                            >
                              <Phone className="w-5 h-5" />
                              Appeler
                            </Button>

                            {/* Email */}
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full gap-2"
                            >
                              <Mail className="w-5 h-5" />
                              Email
                            </Button>
                          </div>

                          <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground text-center">
                              <span className="flex items-center justify-center gap-2 mb-1">
                                <Phone className="w-4 h-4 text-primary" />
                                {formData.phone || "+212 6 XX XX XX XX"}
                              </span>
                              <span className="flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                {formData.email || "email@example.com"}
                              </span>
                            </p>
                          </div>

                          {/* Category badge */}
                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="text-center">
                              <span className="text-sm text-muted-foreground">Catégorie</span>
                              <p className="font-medium text-foreground">
                                {currentCategory?.icon} {currentCategory?.name || "Domaine"}
                              </p>
                              <p className="text-sm text-primary">
                                {currentCategorySpecialites.find(s => s.slug === formData.subcategory)?.name || "Spécialité"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Policy Checkbox - Only on Step 5 */}
                  {currentStep === 5 && (
                    <div className="mt-8 p-6 bg-muted/30 rounded-2xl border border-border space-y-6">
                      {/* Password fields */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          Créez votre mot de passe
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe <span className="text-red-500">*</span></Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Minimum 8 caractères"
                              className="h-12"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="passwordConfirm">Confirmer le mot de passe <span className="text-red-500">*</span></Label>
                            <Input
                              id="passwordConfirm"
                              name="passwordConfirm"
                              type="password"
                              value={formData.passwordConfirm}
                              onChange={handleInputChange}
                              placeholder="Confirmez votre mot de passe"
                              className="h-12"
                              required
                            />
                          </div>
                        </div>
                        {formData.password && formData.passwordConfirm && formData.password !== formData.passwordConfirm && (
                          <p className="text-sm text-red-500">Les mots de passe ne correspondent pas</p>
                        )}
                        {formData.password && formData.password.length < 8 && (
                          <p className="text-sm text-red-500">Le mot de passe doit contenir au moins 8 caractères</p>
                        )}
                        {!formData.password && formData.passwordConfirm && (
                          <p className="text-sm text-red-500">Veuillez saisir un mot de passe</p>
                        )}
                      </div>

                      <div className="border-t border-border pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Les informations que vous communiquez sont traitées conformément à notre Politique de protection des données.
                        </p>
                      
                        {/* CGU Checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input
                              type="checkbox"
                              checked={formData.acceptCGU}
                              onChange={(e) => setFormData({ ...formData, acceptCGU: e.target.checked })}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-border rounded transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50">
                              {formData.acceptCGU && (
                                <Check className="w-4 h-4 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-foreground">
                            J'ai lu et j'accepte les{" "}
                          <CGUProDialog>
                            <button
                              type="button"
                              className="text-primary hover:underline font-medium"
                            >
                              Conditions Générales Professionnels WeLinkYou
                            </button>
                          </CGUProDialog>
                        </span>
                      </label>

                      {/* Privacy Policy Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.acceptPrivacyPolicy}
                            onChange={(e) => setFormData({ ...formData, acceptPrivacyPolicy: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 border-2 border-border rounded transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50">
                            {formData.acceptPrivacyPolicy && (
                              <Check className="w-4 h-4 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-foreground">
                          J'ai pris connaissance de la{" "}
                          <PrivacyPolicyProDialog>
                            <button
                              type="button"
                              className="text-primary hover:underline font-medium"
                            >
                              Politique de Protection des données
                            </button>
                          </PrivacyPolicyProDialog>
                        </span>
                      </label>

                      {/* Charter Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.acceptCharter}
                            onChange={(e) => setFormData({ ...formData, acceptCharter: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 border-2 border-border rounded transition-colors peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50">
                            {formData.acceptCharter && (
                              <Check className="w-4 h-4 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-foreground">
                          Je m'engage à respecter la{" "}
                          <CharterProDialog>
                            <button
                              type="button"
                              className="text-primary hover:underline font-medium"
                            >
                              Charte WeLinkYou
                            </button>
                          </CharterProDialog>
                        </span>
                      </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentStep(currentStep - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      disabled={currentStep === 1}
                      className="h-12 px-6 rounded-xl"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>

                    {currentStep < 5 ? (
                      <Button
                        onClick={() => {
                          setCurrentStep(currentStep + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={!canProceed()}
                        className="h-12 px-8 rounded-xl btn-ripple gradient-primary border-0"
                      >
                        Continuer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleFinalSubmit}
                        disabled={
                          isSubmitting || 
                          !formData.acceptCGU || 
                          !formData.acceptPrivacyPolicy || 
                          !formData.acceptCharter ||
                          !formData.password ||
                          formData.password.length < 8 ||
                          formData.password !== formData.passwordConfirm
                        }
                        className="h-12 px-8 rounded-xl btn-ripple gradient-primary border-0"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Traitement...
                          </>
                        ) : (
                          <>
                            Finaliser mon inscription
                            <Check className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <p className="text-red-500 text-sm text-center">{submitError}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProRegistration;
