import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Star, CheckCircle, Phone, Mail, MessageCircle,
  Clock, Globe, Award, Briefcase, AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/services/api";
import { toTitleCase } from "@/lib/utils";
import type { ApiPractitionerProfile } from "@/types/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const ProfessionalDetail = () => {
  const { id } = useParams();
  const [practitioner, setPractitioner] = useState<ApiPractitionerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ref pour éviter double tracking
  const hasTrackedClick = useRef(false);

  // Titre dynamique basé sur le profil chargé
  useDocumentMeta({
    title: practitioner 
      ? `${practitioner.user.first_name} ${practitioner.user.last_name} - ${practitioner.title}`
      : "Profil professionnel",
    description: practitioner 
      ? `Découvrez le profil de ${practitioner.user.first_name} ${practitioner.user.last_name}, ${practitioner.title} à ${practitioner.city}. ${practitioner.bio?.slice(0, 120) || 'Contactez ce professionnel vérifié sur WeLinkYou.'}`
      : "Consultez le profil détaillé de ce professionnel vérifié sur WeLinkYou.",
  });

  useEffect(() => {
    if (!id) return;
    
    const loadPractitioner = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getPractitionerById(id);
        setPractitioner(data);
        
        // Tracker le clic (visite de la page détail) - une seule fois par visite
        if (!hasTrackedClick.current) {
          hasTrackedClick.current = true;
          api.trackProfileClick(id).catch(err => {
            console.warn("Erreur tracking clic:", err);
          });
        }
      } catch (err) {
        console.error("Erreur chargement profil:", err);
        setError("Professionnel non trouvé");
      } finally {
        setIsLoading(false);
      }
    };
    loadPractitioner();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background-soft">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-6"><Skeleton className="h-6 w-40" /></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="card-premium p-8">
                  <div className="flex gap-6">
                    <Skeleton className="w-40 h-40 rounded-2xl" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-64" />
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
                <div className="card-premium p-8">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="card-premium p-6">
                  <Skeleton className="h-6 w-40 mb-6" />
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error or not found
  if (error || !practitioner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-foreground mb-4">
              {error || "Professionnel non trouvé"}
            </h1>
            <Link to="/recherche">
              <Button>Retour à la recherche</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const p = practitioner;
  const fullName = toTitleCase(p.user.first_name) + " " + toTitleCase(p.user.last_name);
  const cityDisplay = p.city.charAt(0).toUpperCase() + p.city.slice(1);
  const countryDisplay = p.country.charAt(0).toUpperCase() + p.country.slice(1);
  const countryFlag = p.country.toLowerCase() === "france" ? "🇫🇷" : p.country.toLowerCase() === "maroc" ? "🇲🇦" : "";
  const whatsappNumber = p.whatsapp_number?.replace(/\s+/g, "").replace(/^\+/, "") || "";
  const photoUrl = p.photo_url || p.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName) + "&background=0D47A1&color=fff&size=400";

  return (
    <div className="min-h-screen flex flex-col bg-background-soft">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link to="/recherche" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour aux résultats
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
              {/* Hero card */}
              <div className="card-premium p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-shrink-0">
                    <img src={photoUrl} alt={fullName} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-primary/20" />
                    {p.verified && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="absolute -bottom-2 -right-2">
                        <div className="badge-verified">
                          <CheckCircle className="w-4 h-4" />
                          Vérifié
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">{fullName}</h1>
                    <p className="text-primary text-lg font-medium mb-4">{p.title}</p>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{cityDisplay}, {countryDisplay} {countryFlag}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{p.experience_years} ans d'expérience</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 fill-gold text-gold" />
                        <span className="font-semibold text-foreground text-lg">{p.rating}</span>
                        <span className="text-muted-foreground">({p.review_count} avis)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="card-premium p-6 md:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  À propos
                </h2>
                <p className="text-muted-foreground leading-relaxed">{p.bio || p.headline || "Aucune description disponible."}</p>
              </div>

              {/* Specialties */}
              {(p.domaine || p.specialite) && (
                <div className="card-premium p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Spécialités
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {p.domaine && <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">{p.domaine.name}</span>}
                    {p.specialite && <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">{p.specialite.name}</span>}
                  </div>
                </div>
              )}

              {/* Languages */}
              {p.languages && p.languages.length > 0 && (
                <div className="card-premium p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Langues parlées
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {p.languages.map(lang => (
                      <span key={lang.id} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">{lang.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar - Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
              <div className="card-premium p-6 sticky top-28">
                <h3 className="text-lg font-semibold text-foreground mb-6">Contacter {toTitleCase(p.user.first_name)}</h3>
                <div className="space-y-3">
                  {whatsappNumber && (
                    <a href={"https://wa.me/" + whatsappNumber} target="_blank" rel="noopener noreferrer" className="block">
                      <Button size="lg" className="w-full btn-ripple gap-2 bg-[#25D366] hover:bg-[#20BD5A] border-0">
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                      </Button>
                    </a>
                  )}
                  {p.phone_number && (
                    <a href={"tel:" + p.phone_number} className="block">
                      <Button variant="outline" size="lg" className="w-full gap-2">
                        <Phone className="w-5 h-5" />
                        Appeler
                      </Button>
                    </a>
                  )}
                  {(p.contact_email || p.user.email) && (
                    <a href={"mailto:" + (p.contact_email || p.user.email)} className="block">
                      <Button variant="outline" size="lg" className="w-full gap-2">
                        <Mail className="w-5 h-5" />
                        Email
                      </Button>
                    </a>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    {p.phone_number && <>📞 {p.phone_number}<br /></>}
                    ✉️ {p.contact_email || p.user.email}
                  </p>
                </div>
                {p.domaine && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">Domaine</span>
                      <p className="font-medium text-foreground">{p.domaine.name}</p>
                      {p.specialite && <p className="text-sm text-primary">{p.specialite.name}</p>}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalDetail;
