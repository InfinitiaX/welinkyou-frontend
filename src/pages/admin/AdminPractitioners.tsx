import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Award, 
  Eye, 
  EyeOff, 
  Edit, 
  MoreHorizontal,
  Star,
  Check,
  X,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { toTitleCase } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/services/api";
import type { ApiPractitionerProfile, PaginatedResponse } from "@/types/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const AdminPractitioners = () => {
  useDocumentMeta({
    title: "Gestion des professionnels - Admin",
    description: "Gérez les profils des professionnels sur WeLinkYou. Vérification, visibilité et badges.",
  });

  const { toast } = useToast();
  const [practitioners, setPractitioners] = useState<ApiPractitionerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadPractitioners = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getAdminPractitioners({
        status: statusFilter,
        search: debouncedSearch || undefined,
        page: currentPage,
      });
      setPractitioners(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / 20)); // 20 par page
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      toast({
        title: "Erreur",
        description: "Impossible de charger les professionnels",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, debouncedSearch, currentPage, toast]);

  useEffect(() => {
    loadPractitioners();
  }, [loadPractitioners]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, debouncedSearch]);

  const toggleVerification = async (id: string) => {
    try {
      const result = await api.togglePractitionerVerified(id);
      toast({ title: "Succès", description: result.message });
      loadPractitioners();
    } catch {
      toast({ title: "Erreur", description: "Action impossible", variant: "destructive" });
    }
  };

  const toggleCertification = async (id: string) => {
    try {
      const result = await api.togglePractitionerCertified(id);
      toast({ title: "Succès", description: result.message });
      loadPractitioners();
    } catch {
      toast({ title: "Erreur", description: "Action impossible", variant: "destructive" });
    }
  };

  const toggleVisibility = async (id: string) => {
    try {
      const result = await api.togglePractitionerVisibility(id);
      toast({ title: "Succès", description: result.message });
      loadPractitioners();
    } catch {
      toast({ title: "Erreur", description: "Action impossible", variant: "destructive" });
    }
  };

  const changeStatus = async (id: string, status: string) => {
    try {
      const result = await api.changePractitionerStatus(id, status);
      toast({ title: "Succès", description: result.message });
      loadPractitioners();
    } catch {
      toast({ title: "Erreur", description: "Action impossible", variant: "destructive" });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Actif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-700">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Gestion des professionnels</h1>
        <p className="text-muted-foreground mt-1">Gérez les profils, badges et visibilité des professionnels</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, spécialité ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="suspended">Suspendus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Practitioners Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              Professionnels ({totalCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : practitioners.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun professionnel trouvé
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Professionnel</TableHead>
                      <TableHead>Spécialité</TableHead>
                      <TableHead className="text-center">Vues</TableHead>
                      <TableHead className="text-center">Clics</TableHead>
                      <TableHead className="text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-400" title="Bientôt disponible">
                          <Clock className="w-3 h-3" />
                          <span>Note</span>
                        </div>
                      </TableHead>
                      <TableHead className="text-center">Vérifié</TableHead>
                      <TableHead className="text-center">Badge</TableHead>
                      <TableHead className="text-center">Visible</TableHead>
                      <TableHead className="text-center">Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {practitioners.map((practitioner) => {
                      const fullName = `${toTitleCase(practitioner.user.first_name)} ${toTitleCase(practitioner.user.last_name)}`.trim() || practitioner.user.email;
                      const initials = fullName.split(" ").map(n => n[0]).join("").toUpperCase() || "?";
                      return (
                      <TableRow key={practitioner.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {(practitioner.photo_url || practitioner.photo) ? (
                              <img 
                                src={practitioner.photo_url || practitioner.photo || ""} 
                                alt={fullName}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-white font-medium text-sm ${(practitioner.photo_url || practitioner.photo) ? 'hidden' : ''}`}>
                              {initials}
                            </div>
                            <div>
                              <p className="font-medium text-primary">{fullName}</p>
                              <p className="text-xs text-muted-foreground">{practitioner.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{practitioner.specialite?.name || "-"}</TableCell>
                        <TableCell className="text-center font-medium">{(practitioner.profile_views || 0).toLocaleString()}</TableCell>
                        <TableCell className="text-center font-medium">{practitioner.profile_clicks || 0}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-300" title="Bientôt disponible">
                            <Star className="w-4 h-4" />
                            <span className="text-gray-400">-</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider delayDuration={150}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={practitioner.verified ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => toggleVerification(practitioner.id)}
                                  className={practitioner.verified
                                    ? "bg-green-500 hover:bg-green-600 border-green-500 text-white"
                                    : "text-muted-foreground hover:text-green-600 hover:border-green-400"}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                {practitioner.verified
                                  ? "Retirer la vérification"
                                  : "Vérifier le profil"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider delayDuration={150}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={practitioner.certified ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => toggleCertification(practitioner.id)}
                                  className={practitioner.certified
                                    ? "bg-green-500 hover:bg-green-600 border-green-500 text-white"
                                    : "text-muted-foreground hover:text-green-600 hover:border-green-400"}
                                >
                                  <Award className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                {practitioner.certified
                                  ? "Enlever la certification du profil"
                                  : "Certifier le profil"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant={practitioner.is_visible ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleVisibility(practitioner.id)}
                            className={practitioner.is_visible ? "bg-green-500 hover:bg-green-600" : ""}
                          >
                            {practitioner.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(practitioner.status || "pending")}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toggleVerification(practitioner.id)}>
                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                {practitioner.verified ? "Retirer la vérification" : "Vérifier le profil"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleCertification(practitioner.id)}>
                                <Award className="w-4 h-4 mr-2" />
                                {practitioner.certified ? "Retirer le badge" : "Attribuer le badge"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleVisibility(practitioner.id)}>
                                {practitioner.is_visible ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                {practitioner.is_visible ? "Masquer" : "Afficher"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => changeStatus(practitioner.id, 'active')}>
                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                Activer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => changeStatus(practitioner.id, 'suspended')}>
                                <X className="w-4 h-4 mr-2 text-red-500" />
                                Suspendre
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                    })}
                  </TableBody>
                </Table>

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
    </div>
  );
};
