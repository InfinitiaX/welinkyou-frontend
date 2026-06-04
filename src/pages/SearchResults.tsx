import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, List, ChevronLeft, ChevronRight, AlertCircle, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfessionalCard, ProfessionalCardSkeleton } from "@/components/ProfessionalCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FilterBlock } from "@/components/FilterBlock";
import { api } from "@/services/api";
import type { ApiPractitionerProfile, ApiDomaine } from "@/types/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const ITEMS_PER_PAGE = 20;

const mapApiToProfessional = (profile: ApiPractitionerProfile) => ({
  id: String(profile.id),
  firstName: profile.user.first_name,
  lastName: profile.user.last_name,
  title: profile.title,
  photo: profile.photo_url || profile.photo || `https://ui-avatars.com/api/?name=${profile.user.first_name}+${profile.user.last_name}&background=0D47A1&color=fff&size=400`,
  category: profile.domaine?.slug || "",
  subcategory: profile.specialite?.slug || "",
  country: profile.country.toLowerCase(),
  city: profile.city.toLowerCase(),
  description: profile.bio || profile.headline || `${profile.title} basé(e) à ${profile.city}, ${profile.country}`,
  experience: profile.experience_years,
  languages: profile.languages.map((l) => l.name),
  specialties: [profile.specialite?.name, profile.domaine?.name].filter(Boolean) as string[],
  phone: profile.phone_number,
  whatsapp: profile.whatsapp_number?.replace(/\s+/g, "").replace(/^\+/, "") || "",
  email: profile.contact_email || profile.user.email,
  verified: profile.verified,
  rating: parseFloat(profile.rating) || 0,
  reviewCount: profile.review_count,
});

const SearchResults = () => {
  useDocumentMeta({
    title: "Recherche de professionnels",
    description: "Trouvez des professionnels vérifiés pour la diaspora franco-marocaine. Filtrez par domaine, ville et pays pour trouver l'expert qui correspond à vos besoins.",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [practitioners, setPractitioners] = useState<ApiPractitionerProfile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [domaines, setDomaines] = useState<ApiDomaine[]>([]);
  
  // Ref pour tracker les profils déjà trackés (éviter doubles appels)
  const trackedProfilesRef = useRef<Set<string>>(new Set());

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const countryParam = searchParams.get("country") || "";
  const cityParam = searchParams.get("city") || "";
  const domaineParam = searchParams.get("domaine") || "";
  const specialiteParam = searchParams.get("specialite") || "";

  useEffect(() => {
    api.getDomaines().then(setDomaines).catch(console.error);
  }, []);

  const loadPractitioners = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getPractitioners({
        country: countryParam || undefined,
        city: cityParam && cityParam !== "all" ? cityParam : undefined,
        domaine: domaineParam || undefined,
        specialite: specialiteParam || undefined,
        page: currentPage,
      });
      setPractitioners(response.results);
      setTotalCount(response.count);
      
      // Tracker les vues des profils affichés dans les résultats
      if (response.results.length > 0) {
        const profileIds = response.results.map(p => String(p.id));
        // Filtrer les profils déjà trackés
        const newProfileIds = profileIds.filter(id => !trackedProfilesRef.current.has(id));
        
        if (newProfileIds.length > 0) {
          // Ajouter à la liste des profils trackés
          newProfileIds.forEach(id => trackedProfilesRef.current.add(id));
          
          // Appeler l'API de tracking (en arrière-plan, sans bloquer)
          api.trackProfileViews(newProfileIds).catch(err => {
            console.warn("Erreur tracking vues:", err);
          });
        }
      }
    } catch (err) {
      setError("Impossible de charger les résultats.");
    } finally {
      setIsLoading(false);
    }
  }, [countryParam, cityParam, domaineParam, specialiteParam, currentPage]);

  useEffect(() => { loadPractitioners(); }, [loadPractitioners]);

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const professionals = practitioners.map(mapApiToProfessional);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-soft">
      <Navbar />
      <main className="flex-1 pt-28 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              {isLoading ? "Recherche..." : `${totalCount} professionnel${totalCount !== 1 ? "s" : ""} trouvé${totalCount !== 1 ? "s" : ""}`}
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <FilterBlock />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="gap-2">
                <Grid className="w-4 h-4" /><span className="hidden sm:inline">Grille</span>
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="gap-2">
                <List className="w-4 h-4" /><span className="hidden sm:inline">Liste</span>
              </Button>
            </div>
            {!isLoading && totalCount > 0 && <span className="text-sm text-gray-500">Page {currentPage} / {totalPages}</span>}
          </motion.div>

          {error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={loadPractitioners} variant="outline">Réessayer</Button>
            </div>
          )}

          {isLoading && !error && (
            <div className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
              {Array.from({ length: 8 }).map((_, i) => <ProfessionalCardSkeleton key={i} />)}
            </div>
          )}

          {!isLoading && !error && professionals.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div key={`${viewMode}-${currentPage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
                {professionals.map((pro, idx) => (
                  <motion.div key={pro.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                    <ProfessionalCard professional={pro} index={idx} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && !error && professionals.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat</h3>
              <p className="text-gray-600">Modifiez vos filtres pour trouver des professionnels.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {getPageNumbers().map((page, idx) => page === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
              ) : (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => goToPage(page as number)} className="min-w-[40px]">{page}</Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
