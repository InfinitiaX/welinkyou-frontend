import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Clock, 
  Check, 
  X, 
  FileText, 
  Mail, 
  Phone,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Loader2,
  Globe,
  MapPin,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import type { 
  PendingRegistration, 
  RegistrationDetail, 
  RegistrationDocumentDetail,
  ApiDomaine,
  ApiSpecialite
} from "@/types/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const AdminRegistrations = () => {
  useDocumentMeta({
    title: "Inscriptions en attente - Admin",
    description: "Gérez les inscriptions des professionnels en attente de validation sur WeLinkYou.",
  });

  const { toast } = useToast();
  
  // Liste des inscriptions
  const [registrations, setRegistrations] = useState<PendingRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomaine, setSelectedDomaine] = useState<string>("");
  const [selectedSpecialite, setSelectedSpecialite] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  // Options des filtres
  const [domaines, setDomaines] = useState<ApiDomaine[]>([]);
  const [specialites, setSpecialites] = useState<ApiSpecialite[]>([]);

  // Dialogs
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationDetail | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  
  // Document rejection
  const [rejectDocumentId, setRejectDocumentId] = useState<string | null>(null);
  const [rejectDocumentReason, setRejectDocumentReason] = useState("");
  const [isRejectDocDialogOpen, setIsRejectDocDialogOpen] = useState(false);
  const [isProcessingDoc, setIsProcessingDoc] = useState(false);
  
  // Registration approval/rejection
  const [isApprovingRegistration, setIsApprovingRegistration] = useState(false);
  const [isRejectingRegistration, setIsRejectingRegistration] = useState(false);

  // PDF Viewer
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string>("");
  const [selectedDocumentName, setSelectedDocumentName] = useState<string>("");
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  // Charger les domaines et spécialités
  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const [domainesData, specialitesData] = await Promise.all([
          api.getDomaines(),
          api.getSpecialites()
        ]);
        setDomaines(domainesData);
        setSpecialites(specialitesData);
      } catch (error) {
        console.error("Erreur lors du chargement des filtres:", error);
      }
    };
    loadFiltersData();
  }, []);

  // Charger les inscriptions en attente
  const loadRegistrations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.getPendingRegistrations({
        search: searchTerm || undefined,
        domaine: selectedDomaine || undefined,
        specialite: selectedSpecialite || undefined,
        country: selectedCountry || undefined,
        page: currentPage,
        page_size: pageSize
      });
      setRegistrations(response.results);
      setTotalCount(response.count);
    } catch (error) {
      console.error("Erreur lors du chargement des inscriptions:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les inscriptions en attente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedDomaine, selectedSpecialite, selectedCountry, currentPage, toast]);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  // Débounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Charger les détails d'une inscription
  const loadRegistrationDetail = async (id: string) => {
    setIsLoadingDetail(true);
    setIsDetailDialogOpen(true);
    try {
      const detail = await api.getRegistrationDetail(id);
      setSelectedRegistration(detail);
    } catch (error) {
      console.error("Erreur lors du chargement des détails:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails de l'inscription.",
        variant: "destructive",
      });
      setIsDetailDialogOpen(false);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Valider un document
  const handleValidateDocument = async (documentId: string) => {
    if (!selectedRegistration) return;
    setIsProcessingDoc(true);
    try {
      await api.validateRegistrationDocument(selectedRegistration.id, documentId);
      // Recharger les détails pour avoir les données à jour
      const updatedDetail = await api.getRegistrationDetail(selectedRegistration.id);
      setSelectedRegistration(updatedDetail);
      toast({
        title: "Document validé",
        description: "Le document a été validé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de valider le document.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingDoc(false);
    }
  };

  // Rejeter un document
  const handleRejectDocument = async () => {
    if (!selectedRegistration || !rejectDocumentId || !rejectDocumentReason.trim()) return;
    setIsProcessingDoc(true);
    try {
      await api.rejectRegistrationDocument(
        selectedRegistration.id, 
        rejectDocumentId, 
        rejectDocumentReason.trim()
      );
      // Recharger les détails
      const updatedDetail = await api.getRegistrationDetail(selectedRegistration.id);
      setSelectedRegistration(updatedDetail);
      setIsRejectDocDialogOpen(false);
      setRejectDocumentId(null);
      setRejectDocumentReason("");
      toast({
        title: "Document rejeté",
        description: "Le document a été rejeté avec le motif indiqué.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Erreur lors du rejet:", error);
      toast({
        title: "Erreur",
        description: "Impossible de rejeter le document.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingDoc(false);
    }
  };

  // Approuver l'inscription
  const handleApproveRegistration = async () => {
    if (!selectedRegistration) return;
    setIsApprovingRegistration(true);
    try {
      await api.approveRegistration(selectedRegistration.id);
      toast({
        title: "Inscription approuvée",
        description: `${selectedRegistration.user.first_name} ${selectedRegistration.user.last_name} a reçu un email avec ses identifiants de connexion.`,
      });
      setIsDetailDialogOpen(false);
      setSelectedRegistration(null);
      loadRegistrations();
    } catch (error: any) {
      console.error("Erreur lors de l'approbation:", error);
      const message = error?.data?.error || "Impossible d'approuver l'inscription.";
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsApprovingRegistration(false);
    }
  };

  // Rejeter l'inscription
  const handleRejectRegistration = async () => {
    if (!selectedRegistration) return;
    setIsRejectingRegistration(true);
    try {
      await api.rejectRegistration(selectedRegistration.id);
      toast({
        title: "Inscription refusée",
        description: `${selectedRegistration.user.first_name} ${selectedRegistration.user.last_name} a reçu un email avec les raisons du refus.`,
        variant: "destructive",
      });
      setIsDetailDialogOpen(false);
      setSelectedRegistration(null);
      loadRegistrations();
    } catch (error: any) {
      console.error("Erreur lors du refus:", error);
      const message = error?.data?.error || "Impossible de refuser l'inscription.";
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsRejectingRegistration(false);
    }
  };

  // Ouvrir le visualiseur PDF
  const openPdfViewer = (doc: RegistrationDocumentDetail) => {
    setSelectedDocumentUrl(doc.file_url);
    setSelectedDocumentName(doc.doc_type_display || doc.original_filename);
    setIsPdfViewerOpen(true);
  };

  // Badges de statut
  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">En attente</Badge>;
      case 'validated':
        return <Badge className="bg-green-100 text-green-700">Validé</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700">Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Pagination
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Demandes d'inscription</h1>
        <p className="text-muted-foreground mt-1">Gérez les nouvelles demandes de professionnels depuis /inscription-pro</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-gradient-start">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gradient-vibrant">{totalCount}</p>
                  <p className="text-sm text-muted-foreground">Inscriptions en attente</p>
                </div>
                <Clock className="w-8 h-8 text-gradient-end" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {registrations.length > 0 
                      ? registrations.reduce((sum, r) => sum + r.documents_count, 0) 
                      : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Documents à vérifier</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher par email, nom..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Domaine */}
              <Select value={selectedDomaine} onValueChange={(value) => {
                setSelectedDomaine(value === "all" ? "" : value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Tous les domaines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les domaines</SelectItem>
                  {domaines.map((d) => (
                    <SelectItem key={d.id} value={d.slug}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Spécialité */}
              <Select value={selectedSpecialite} onValueChange={(value) => {
                setSelectedSpecialite(value === "all" ? "" : value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Toutes spécialités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes spécialités</SelectItem>
                  {specialites.map((s) => (
                    <SelectItem key={s.id} value={s.slug}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Pays */}
              <Select value={selectedCountry} onValueChange={(value) => {
                setSelectedCountry(value === "all" ? "" : value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-full lg:w-[150px]">
                  <SelectValue placeholder="Tous pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous pays</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Belgique">Belgique</SelectItem>
                  <SelectItem value="Suisse">Suisse</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Maroc">Maroc</SelectItem>
                  <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                  <SelectItem value="Sénégal">Sénégal</SelectItem>
                </SelectContent>
              </Select>

              {/* Refresh */}
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => loadRegistrations()}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des inscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gradient-end" />
              Inscriptions en attente
              {totalCount > 0 && (
                <Badge variant="secondary" className="ml-2">{totalCount}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucune inscription en attente</p>
                {(searchTerm || selectedDomaine || selectedSpecialite || selectedCountry) && (
                  <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full gradient-vibrant flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {registration.user.first_name[0]}{registration.user.last_name[0]}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-primary">
                          {registration.user.first_name} {registration.user.last_name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {registration.domaine && (
                            <Badge variant="outline" className="text-xs">
                              {registration.domaine.name}
                            </Badge>
                          )}
                          {registration.specialite && (
                            <Badge variant="secondary" className="text-xs">
                              {registration.specialite.name}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {registration.user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {registration.city}, {registration.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(registration.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        {/* Progress des documents */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Documents:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-green-600">
                              {registration.validated_documents_count} validés
                            </span>
                            {registration.rejected_documents_count > 0 && (
                              <>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-red-600">
                                  {registration.rejected_documents_count} rejetés
                                </span>
                              </>
                            )}
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-yellow-600">
                              {registration.documents_count - registration.validated_documents_count - registration.rejected_documents_count} en attente
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadRegistrationDetail(registration.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Examiner
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} sur {totalPages} ({totalCount} inscriptions)
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog de détail */}
      <Dialog open={isDetailDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setSelectedRegistration(null);
        }
        setIsDetailDialogOpen(open);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription</DialogTitle>
            <DialogDescription>
              Examinez les informations et validez chaque document
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingDetail ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : selectedRegistration ? (
            <div className="space-y-6 py-4">
              {/* En-tête profil */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 rounded-full gradient-vibrant flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {selectedRegistration.user.first_name[0]}{selectedRegistration.user.last_name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-primary">
                    {selectedRegistration.title || `${selectedRegistration.user.first_name} ${selectedRegistration.user.last_name}`}
                  </h3>
                  {selectedRegistration.headline && (
                    <p className="text-muted-foreground">{selectedRegistration.headline}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRegistration.domaine && (
                      <Badge variant="outline">{selectedRegistration.domaine.name}</Badge>
                    )}
                    {selectedRegistration.specialite && (
                      <Badge variant="secondary">{selectedRegistration.specialite.name}</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {selectedRegistration.user.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Téléphone</Label>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {selectedRegistration.phone_number || "Non renseigné"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">WhatsApp</Label>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {selectedRegistration.whatsapp_number || "Non renseigné"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Localisation</Label>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {selectedRegistration.city}, {selectedRegistration.country}
                  </p>
                </div>
                {selectedRegistration.website && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Site web</Label>
                    <a 
                      href={selectedRegistration.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      {selectedRegistration.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {selectedRegistration.linkedin_url && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">LinkedIn</Label>
                    <a 
                      href={selectedRegistration.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Voir le profil
                    </a>
                  </div>
                )}
              </div>

              {/* Bio */}
              {selectedRegistration.bio && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Bio / Description</Label>
                  <p className="text-foreground bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                    {selectedRegistration.bio}
                  </p>
                </div>
              )}

              {/* Langues */}
              {selectedRegistration.languages.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Langues parlées</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegistration.languages.map((lang) => (
                      <Badge key={lang.id} variant="outline">{lang.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground text-base font-semibold">
                    Documents à vérifier ({selectedRegistration.documents.length})
                  </Label>
                  <div className="flex items-center gap-2 text-sm">
                    {selectedRegistration.all_documents_validated && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Tous validés
                      </Badge>
                    )}
                    {selectedRegistration.has_rejected_documents && (
                      <Badge className="bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3 mr-1" />
                        Documents rejetés
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {selectedRegistration.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl shadow-sm gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-start/10 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-gradient-end" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-primary">
                            {doc.doc_type_display || doc.doc_type}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {doc.original_filename}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {getDocStatusBadge(doc.status)}
                            {doc.notes && doc.status === 'rejected' && (
                              <span className="text-xs text-red-600 italic">
                                Motif: {doc.notes}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openPdfViewer(doc)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        {/* Boutons toujours visibles pour permettre la modification du statut */}
                        <Button
                          size="sm"
                          className={doc.status === 'validated' 
                            ? "bg-green-500 hover:bg-green-600 opacity-70" 
                            : "bg-green-500 hover:bg-green-600"}
                          onClick={() => handleValidateDocument(doc.id)}
                          disabled={isProcessingDoc}
                          title={doc.status === 'validated' ? "Déjà validé" : "Valider ce document"}
                        >
                          {isProcessingDoc ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {doc.status === 'validated' ? 'Validé' : 'Valider'}
                            </>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className={doc.status === 'rejected' ? "opacity-70" : ""}
                          onClick={() => {
                            setRejectDocumentId(doc.id);
                            setIsRejectDocDialogOpen(true);
                          }}
                          disabled={isProcessingDoc}
                          title={doc.status === 'rejected' ? "Déjà rejeté" : "Rejeter ce document"}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          {doc.status === 'rejected' ? 'Rejeté' : 'Rejeter'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date de soumission */}
              <div className="space-y-1">
                <Label className="text-muted-foreground">Date d'inscription</Label>
                <p className="flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {new Date(selectedRegistration.created_at).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              {/* Avertissements */}
              {!selectedRegistration.all_documents_validated && !selectedRegistration.has_rejected_documents && (
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Documents en attente</p>
                    <p className="text-sm text-yellow-700">
                      Vous devez valider ou rejeter tous les documents avant de pouvoir approuver ou refuser l'inscription.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fermer
            </Button>
            {selectedRegistration && (
              <>
                <Button
                  variant="destructive"
                  onClick={handleRejectRegistration}
                  disabled={!selectedRegistration.has_rejected_documents || isRejectingRegistration || isApprovingRegistration}
                  title={!selectedRegistration.has_rejected_documents ? "Vous devez rejeter au moins un document pour refuser l'inscription" : undefined}
                >
                  {isRejectingRegistration ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <X className="w-4 h-4 mr-1" />
                  )}
                  Refuser l'inscription
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={handleApproveRegistration}
                  disabled={!selectedRegistration.all_documents_validated || isApprovingRegistration || isRejectingRegistration}
                  title={!selectedRegistration.all_documents_validated ? "Vous devez valider tous les documents pour approuver l'inscription" : undefined}
                >
                  {isApprovingRegistration ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-1" />
                  )}
                  Approuver l'inscription
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de rejet de document */}
      <Dialog open={isRejectDocDialogOpen} onOpenChange={setIsRejectDocDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter le document</DialogTitle>
            <DialogDescription>
              Indiquez la raison du rejet (obligatoire). Cette information sera communiquée au professionnel.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Ex: Document illisible, informations incomplètes, document expiré..."
              value={rejectDocumentReason}
              onChange={(e) => setRejectDocumentReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsRejectDocDialogOpen(false);
                setRejectDocumentId(null);
                setRejectDocumentReason("");
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectDocument}
              disabled={!rejectDocumentReason.trim() || isProcessingDoc}
            >
              {isProcessingDoc ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4 mr-1" />
              )}
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Dialog */}
      <Dialog open={isPdfViewerOpen} onOpenChange={setIsPdfViewerOpen}>
        <DialogContent className="max-w-5xl h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald" />
              {selectedDocumentName}
            </DialogTitle>
            <DialogDescription>
              Visualisez le document pour vérifier son authenticité et sa validité
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {selectedDocumentUrl && (
              <iframe
                src={selectedDocumentUrl}
                className="w-full h-full min-h-[500px]"
                title={selectedDocumentName}
              />
            )}
          </div>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsPdfViewerOpen(false)}>
              Fermer
            </Button>
            <a 
              href={selectedDocumentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-1" />
                Ouvrir dans un nouvel onglet
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
