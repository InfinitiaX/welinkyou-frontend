import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Trash2,
  Calendar,
  User,
  Search,
  Filter,
  AlertTriangle,
  Eye,
  Check,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api, type AdminDocument } from "@/services/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

// Mapping des types de documents vers des noms lisibles
const getDocTypeName = (docType: string): string => {
  const mapping: Record<string, string> = {
    diploma: "Diplôme",
    identity: "Pièce d'identité",
    registration: "Inscription professionnelle",
    kbis: "KBIS",
    insurance: "Assurance professionnelle",
    charter: "Charte WeLinkYou",
    other: "Autre",
  };
  return mapping[docType] || docType;
};

export const AdminDocuments = () => {
  useDocumentMeta({
    title: "Documents - Admin",
    description: "Gérez les documents justificatifs des professionnels sur WeLinkYou.",
  });

  const { toast } = useToast();
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<AdminDocument | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getAdminDocuments({
        status: statusFilter,
        search: debouncedSearch || undefined,
        page: currentPage,
      });
      setDocuments(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / 20));
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, debouncedSearch, currentPage, toast]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, debouncedSearch]);

  const handleValidateDocument = async (doc: AdminDocument) => {
    try {
      await api.validateDocument(doc.id);
      toast({ title: "Succès", description: "Document validé" });
      loadDocuments();
    } catch {
      toast({ title: "Erreur", description: "Action impossible", variant: "destructive" });
    }
  };

  const handleRejectDocument = async (doc: AdminDocument) => {
    try {
      await api.rejectDocument(doc.id);
      toast({ title: "Succès", description: "Document rejeté" });
      loadDocuments();
    } catch {
      toast({ title: "Erreur", description: "Action impossible", variant: "destructive" });
    }
  };

  const handleDeleteDocument = async () => {
    if (selectedDocument) {
      try {
        await api.adminDeleteDocument(selectedDocument.id);
        toast({
          title: "Document supprimé",
          description: `Le document "${getDocTypeName(selectedDocument.doc_type)}" a été supprimé.`,
          variant: "destructive",
        });
        setIsDeleteDialogOpen(false);
        setSelectedDocument(null);
        loadDocuments();
      } catch {
        toast({ title: "Erreur", description: "Suppression impossible", variant: "destructive" });
      }
    }
  };

  const getStatusBadge = (status: string) => {
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

  // Stats calculées
  const statsTotal = totalCount;
  const statsValidated = documents.filter(d => d.status === 'validated').length;
  const statsPending = documents.filter(d => d.status === 'pending').length;
  const statsRejected = documents.filter(d => d.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Documents</h1>
        <p className="text-muted-foreground mt-1">Gérez tous les documents soumis par les professionnels</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{statsTotal}</p>
                  <p className="text-sm text-muted-foreground">Total documents</p>
                </div>
                <FileText className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{statsValidated}</p>
                  <p className="text-sm text-muted-foreground">Validés</p>
                </div>
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{statsPending}</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{statsRejected}</p>
                  <p className="text-sm text-muted-foreground">Rejetés</p>
                </div>
                <X className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom de document ou professionnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="validated">Validés</SelectItem>
            <SelectItem value="rejected">Rejetés</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Liste des documents ({totalCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Aucun document trouvé</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{getDocTypeName(doc.doc_type)}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            {doc.practitioner && (
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {doc.practitioner.name}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            {getStatusBadge(doc.status)}
                            <Badge variant="outline">{getDocTypeName(doc.doc_type)}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setIsPdfViewerOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        {/* Boutons toujours visibles pour permettre la modification du statut */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={doc.status === 'validated' 
                            ? "text-green-600 border-green-300 bg-green-50" 
                            : "text-green-600 border-green-300 hover:bg-green-50"}
                          onClick={() => handleValidateDocument(doc)}
                          title={doc.status === 'validated' ? "Déjà validé - Cliquer pour re-valider" : "Valider ce document"}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {doc.status === 'validated' ? 'Validé' : 'Valider'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={doc.status === 'rejected' 
                            ? "text-red-600 border-red-300 bg-red-50" 
                            : "text-red-600 border-red-300 hover:bg-red-50"}
                          onClick={() => handleRejectDocument(doc)}
                          title={doc.status === 'rejected' ? "Déjà rejeté - Cliquer pour modifier le motif" : "Rejeter ce document"}
                        >
                          <X className="w-4 h-4 mr-1" />
                          {doc.status === 'rejected' ? 'Rejeté' : 'Rejeter'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Page {currentPage} sur {totalPages} ({totalCount} résultats)
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Précédent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* PDF Viewer Dialog */}
      <Dialog open={isPdfViewerOpen} onOpenChange={setIsPdfViewerOpen}>
        <DialogContent className="max-w-5xl h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              {selectedDocument ? getDocTypeName(selectedDocument.doc_type) : "Document"}
            </DialogTitle>
            <DialogDescription>
              Document de {selectedDocument?.practitioner?.name || "professionnel"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {selectedDocument && (
              <iframe
                src={selectedDocument.file_url || selectedDocument.file}
                className="w-full h-full min-h-[500px]"
                title={getDocTypeName(selectedDocument.doc_type)}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPdfViewerOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Supprimer définitivement ce document
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer définitivement le document "{selectedDocument ? getDocTypeName(selectedDocument.doc_type) : ""}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDocument}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
