import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Languages,
  Briefcase,
  FileText,
  Save,
  Eye,
  Camera,
  X,
  CheckCircle,
  File,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { api, ApiError } from "@/services/api";
import type { CurrentPractitionerProfile, ApiLanguage } from "@/types/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

// Liste des pays
const countries = [
  { code: "FR", name: "France" },
  { code: "MA", name: "Maroc" },
  { code: "TN", name: "Tunisie" },
  { code: "DZ", name: "Algérie" },
  { code: "BE", name: "Belgique" },
  { code: "CH", name: "Suisse" },
  { code: "CA", name: "Canada" },
];

export const PractitionerProfile = () => {
  useDocumentMeta({
    title: "Mon Profil - Espace Professionnel",
    description: "Modifiez votre profil professionnel WeLinkYou. Mettez à jour vos informations, compétences et documents.",
  });

  // États de chargement
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Données du profil
  const [profile, setProfile] = useState<CurrentPractitionerProfile | null>(null);
  const [availableLanguages, setAvailableLanguages] = useState<ApiLanguage[]>([]);

  // États des formulaires
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    whatsapp_number: "",
    bio: "",
    headline: "",
    website: "",
    linkedin_url: "",
    country: "",
    city: "",
  });

  const [selectedLanguageIds, setSelectedLanguageIds] = useState<string[]>([]);
  
  // Upload de photo
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charger les données au montage
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [profileData, languagesData] = await Promise.all([
        api.getCurrentPractitionerProfile(),
        api.getLanguages(),
      ]);

      setProfile(profileData);
      setAvailableLanguages(languagesData);

      // Initialiser les formulaires avec les données
      setFormData({
        first_name: profileData.user.first_name || "",
        last_name: profileData.user.last_name || "",
        phone_number: profileData.phone_number || "",
        whatsapp_number: profileData.whatsapp_number || "",
        bio: profileData.bio || "",
        headline: profileData.headline || "",
        website: profileData.website || "",
        linkedin_url: profileData.linkedin_url || "",
        country: profileData.country || "",
        city: profileData.city || "",
      });

      // Initialiser les langues sélectionnées
      setSelectedLanguageIds(profileData.languages.map((l) => l.id));
    } catch (err) {
      console.error("Erreur lors du chargement du profil:", err);
      setError("Impossible de charger les données du profil");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addLanguage = (langId: string) => {
    if (!selectedLanguageIds.includes(langId)) {
      setSelectedLanguageIds([...selectedLanguageIds, langId]);
    }
  };

  const removeLanguage = (langId: string) => {
    setSelectedLanguageIds(selectedLanguageIds.filter((id) => id !== langId));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updateData = {
        ...formData,
        language_ids: selectedLanguageIds,
      };

      console.log("Sending update data:", JSON.stringify(updateData, null, 2));

      const updatedProfile = await api.updatePractitionerProfile(updateData);
      setProfile(updatedProfile);

      toast.success("Profil mis à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      if (err instanceof ApiError) {
        console.error("API Error details:", JSON.stringify(err.data, null, 2));
        const errorMessages = Object.entries(err.data)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        toast.error(`Erreur: ${errorMessages || err.message}`);
      } else {
        toast.error("Erreur lors de la mise à jour du profil");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Valider le type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format non supporté. Utilisez JPG, PNG ou WebP.");
      return;
    }

    // Valider la taille (5 Mo max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Photo trop volumineuse. Taille max : 5 Mo.");
      return;
    }

    try {
      setUploadingPhoto(true);
      const result = await api.uploadPractitionerPhoto(file);
      
      // Mettre à jour le profil avec la nouvelle photo
      if (profile) {
        setProfile({
          ...profile,
          photo_url: result.photo_url,
        });
      }
      
      toast.success("Photo de profil mise à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de l'upload de la photo:", err);
      if (err instanceof ApiError && err.data?.error) {
        toast.error(err.data.error as string);
      } else {
        toast.error("Erreur lors de la mise à jour de la photo");
      }
    } finally {
      setUploadingPhoto(false);
      // Réinitialiser l'input pour permettre de re-sélectionner le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getInitials = () => {
    if (profile) {
      return `${profile.user.first_name.charAt(0)}${profile.user.last_name.charAt(0)}`.toUpperCase();
    }
    return "?";
  };

  const getLanguageById = (id: string): ApiLanguage | undefined => {
    return availableLanguages.find((l) => l.id === id);
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-green-100 text-green-700">Validé</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rejeté</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-muted-foreground">{error || "Profil non trouvé"}</p>
        <Button onClick={loadProfileData}>Réessayer</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon Profil</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos informations professionnelles
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" asChild>
            <a href={`/professionnel/${profile.id}`} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" />
              Prévisualiser
            </a>
          </Button>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90 text-white"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </motion.div>

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-sm bg-gradient-to-r from-gold/10 to-gold/5 border-l-4 border-l-gold">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-medium text-foreground">
                    Profil complété à {profile.is_profile_complete.percentage}%
                  </p>
                  {profile.is_profile_complete.missing_fields.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Champs manquants : {profile.is_profile_complete.missing_fields.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <Badge className="bg-gold text-white">{profile.is_profile_complete.percentage}%</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border shadow-sm p-1 h-auto flex-wrap">
          <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <User className="w-4 h-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="specialty" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Briefcase className="w-4 h-4" />
            Spécialité
          </TabsTrigger>
          <TabsTrigger value="languages" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Languages className="w-4 h-4" />
            Langues & Zones
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <File className="w-4 h-4" />
            Mes Documents
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-primary/20">
                      <AvatarImage src={profile.photo_url || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-white"
                      onClick={handlePhotoClick}
                      disabled={uploadingPhoto}
                      title="Modifier la photo de profil"
                    >
                      {uploadingPhoto ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium">Photo de profil</h3>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG ou WebP. Max 5 Mo.
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input 
                      id="firstName" 
                      value={formData.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input 
                      id="lastName" 
                      value={formData.last_name}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.user.email}
                      disabled
                      className="bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">
                      L'email ne peut pas être modifié
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input 
                      id="whatsapp" 
                      value={formData.whatsapp_number}
                      onChange={(e) => handleInputChange("whatsapp_number", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input 
                      id="website" 
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="resize-none"
                    placeholder="Présentez-vous et décrivez votre parcours professionnel..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Cette description apparaîtra sur votre profil public
                  </p>
                </div>

                {/* Bouton Enregistrer en bas du formulaire */}
                <div className="flex justify-end pt-4 border-t">
                  <Button 
                    className="gap-2 bg-primary hover:bg-primary/90 text-white"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Specialty Tab */}
        <TabsContent value="specialty">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Spécialité et expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium mb-2">Domaine</h4>
                  <p className="text-foreground">
                    {profile.domaine?.name || "Non défini"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium mb-2">Spécialité</h4>
                  <p className="text-foreground">
                    {profile.specialite?.name || "Non définie"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium mb-2">Années d'expérience</h4>
                  <p className="text-foreground">
                    {profile.experience_years || 0} ans
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-amber-800 text-sm">
                    Pour modifier votre domaine ou spécialité, veuillez contacter le support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Languages & Zones Tab */}
        <TabsContent value="languages">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Languages className="w-5 h-5 text-gold" />
                  Langues parlées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedLanguageIds.map((langId) => {
                    const lang = getLanguageById(langId);
                    return (
                      <Badge
                        key={langId}
                        variant="secondary"
                        className="bg-primary/10 text-primary gap-1 pr-1"
                      >
                        {lang?.name || langId}
                        <button
                          onClick={() => removeLanguage(langId)}
                          className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })}
                  {selectedLanguageIds.length === 0 && (
                    <p className="text-muted-foreground text-sm">Aucune langue sélectionnée</p>
                  )}
                </div>
                <Select onValueChange={addLanguage}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Ajouter une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages
                      .filter((l) => !selectedLanguageIds.includes(l.id))
                      .map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Zone géographique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => handleInputChange("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input 
                      id="city" 
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Votre ville"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bouton Enregistrer en bas de l'onglet Langues & Zones */}
            <div className="flex justify-end">
              <Button 
                className="gap-2 bg-primary hover:bg-primary/90 text-white"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Documents Tab - Read Only */}
        <TabsContent value="documents">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <File className="w-5 h-5 text-gold" />
                  Documents soumis lors de l'inscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                  <p className="text-blue-800 text-sm">
                    Les documents ne peuvent pas être modifiés. Pour soumettre de nouveaux documents, 
                    veuillez contacter le support.
                  </p>
                </div>

                {profile.documents && profile.documents.length > 0 ? (
                  profile.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              {doc.doc_type_display || doc.doc_type}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {doc.original_filename}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Soumis le {new Date(doc.created_at).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getDocumentStatusBadge(doc.status)}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-primary"
                            asChild
                          >
                            <a href={doc.file_url} download target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                      {doc.notes && (
                        <p className="mt-2 text-sm text-muted-foreground bg-white p-2 rounded">
                          Note: {doc.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <File className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Aucun document soumis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
