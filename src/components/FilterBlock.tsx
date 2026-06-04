import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MapPin, Briefcase, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocations } from "@/hooks/useLocations";
import { api } from "@/services/api";
import { cn } from "@/lib/utils";
import type { ApiDomaine } from "@/types/api";

export const FilterBlock = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Use dynamic locations from API
  const { countries, getCitiesForCountry, isLoading: isLoadingLocations } = useLocations();
  
  const [domaines, setDomaines] = useState<ApiDomaine[]>([]);
  const [isLoadingDomaines, setIsLoadingDomaines] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [selectedDomaine, setSelectedDomaine] = useState(searchParams.get("domaine") || "");
  const [selectedSpecialite, setSelectedSpecialite] = useState(searchParams.get("specialite") || "");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    api.getDomaines().then(data => {
      setDomaines(data);
      setIsLoadingDomaines(false);
    }).catch(() => setIsLoadingDomaines(false));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCountry) params.set("country", selectedCountry);
    if (selectedCity && selectedCity !== "all") params.set("city", selectedCity);
    if (selectedDomaine) params.set("domaine", selectedDomaine);
    if (selectedSpecialite) params.set("specialite", selectedSpecialite);
    navigate("/recherche?" + params.toString());
  };

  const currentDomaine = domaines.find(d => d.slug === selectedDomaine);
  const availableCities = selectedCountry ? getCitiesForCountry(selectedCountry) : [];
  const availableSpecialites = currentDomaine?.specialites || [];

  const hasActiveFilters = selectedCountry || selectedCity || selectedDomaine || selectedSpecialite;

  const handleResetFilters = () => {
    setSelectedCountry("");
    setSelectedCity("");
    setSelectedDomaine("");
    setSelectedSpecialite("");
    setOpenDropdown(null);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <>
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setOpenDropdown(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full max-w-6xl mx-auto relative z-50"
      >
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] border-2 border-gold">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1.3fr_auto] gap-4">
            
            {/* Country */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
                disabled={isLoadingLocations}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all",
                  isLoadingLocations && "opacity-50 cursor-not-allowed",
                  openDropdown === "country" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50 bg-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className={cn("text-sm font-medium whitespace-nowrap", selectedCountry ? "text-black" : "text-gray-500")}>
                    {isLoadingLocations ? "Chargement..." : selectedCountry ? countries.find(c => c.code === selectedCountry)?.name : "Pays du professionnel"}
                  </span>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", openDropdown === "country" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openDropdown === "country" && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden">
                    <button onClick={() => { setSelectedCountry(""); setSelectedCity(""); setOpenDropdown(null); }}
                      className={cn("w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                        !selectedCountry ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-gray-500")}>
                      <span className="text-sm font-medium">Pays du professionnel</span>
                    </button>
                    {countries.map(country => (
                      <button key={country.code} onClick={() => { setSelectedCountry(country.code); setSelectedCity(""); setOpenDropdown(null); }}
                        className={cn("w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                          selectedCountry === country.code ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-black")}>
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm font-medium">{country.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* City */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "city" ? null : "city")}
                disabled={!selectedCountry}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all",
                  !selectedCountry && "opacity-50 cursor-not-allowed",
                  openDropdown === "city" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50 bg-white"
                )}
              >
                <span className={cn("text-sm font-medium truncate", selectedCity ? "text-black" : "text-gray-500")}>
                  {selectedCity ? availableCities.find(c => c.code === selectedCity)?.name : "Ville"}
                </span>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", openDropdown === "city" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openDropdown === "city" && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                    {availableCities.map(city => (
                      <button key={city.code} onClick={() => { setSelectedCity(city.code); setOpenDropdown(null); }}
                        className={cn("w-full px-4 py-3.5 text-left text-sm font-medium transition-colors truncate",
                          selectedCity === city.code ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-black")}>
                        {city.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Domaine */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "domaine" ? null : "domaine")}
                disabled={isLoadingDomaines}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all",
                  isLoadingDomaines && "opacity-50 cursor-not-allowed",
                  openDropdown === "domaine" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50 bg-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className={cn("text-sm font-medium truncate", selectedDomaine ? "text-black" : "text-gray-500")}>
                    {isLoadingDomaines ? "Chargement..." : selectedDomaine ? domaines.find(d => d.slug === selectedDomaine)?.name : "Domaine"}
                  </span>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0", openDropdown === "domaine" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openDropdown === "domaine" && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
                    <button onClick={() => { setSelectedDomaine(""); setSelectedSpecialite(""); setOpenDropdown(null); }}
                      className={cn("w-full px-4 py-3.5 text-left text-sm font-medium transition-colors",
                        !selectedDomaine ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-gray-500")}>
                      Tous les domaines
                    </button>
                    {domaines.map(domaine => (
                      <button key={domaine.id} onClick={() => { setSelectedDomaine(domaine.slug); setSelectedSpecialite(""); setOpenDropdown(null); }}
                        className={cn("w-full px-4 py-3.5 text-left text-sm font-medium transition-colors",
                          selectedDomaine === domaine.slug ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-black")}>
                        {domaine.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Specialite */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "specialite" ? null : "specialite")}
                disabled={!selectedDomaine || availableSpecialites.length === 0}
                className={cn(
                  "w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all",
                  (!selectedDomaine || availableSpecialites.length === 0) && "opacity-50 cursor-not-allowed",
                  openDropdown === "specialite" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50 bg-white"
                )}
              >
                <span className={cn("text-sm font-medium truncate", selectedSpecialite ? "text-black" : "text-gray-500")}>
                  {selectedSpecialite ? availableSpecialites.find(s => s.slug === selectedSpecialite)?.name : "Spécialité"}
                </span>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0", openDropdown === "specialite" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openDropdown === "specialite" && availableSpecialites.length > 0 && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute z-[100] top-full mt-2 w-full bg-white border-2 border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                    <button onClick={() => { setSelectedSpecialite(""); setOpenDropdown(null); }}
                      className={cn("w-full px-4 py-3.5 text-left text-sm font-medium transition-colors truncate",
                        !selectedSpecialite ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-gray-500")}>
                      Toutes les spécialités
                    </button>
                    {availableSpecialites.map(specialite => (
                      <button key={specialite.id} onClick={() => { setSelectedSpecialite(specialite.slug); setOpenDropdown(null); }}
                        className={cn("w-full px-4 py-3.5 text-left text-sm font-medium transition-colors",
                          selectedSpecialite === specialite.slug ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-black")}>
                        {specialite.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button 
                  onClick={handleResetFilters} 
                  variant="outline" 
                  size="lg" 
                  className="h-[52px] px-4 rounded-xl border-2 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                  title="Réinitialiser les filtres"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              )}
              <Button onClick={handleSearch} size="lg" className="btn-ripple gradient-primary border-0 h-[52px] text-base font-semibold gap-2 rounded-xl">
                <Search className="w-5 h-5" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
