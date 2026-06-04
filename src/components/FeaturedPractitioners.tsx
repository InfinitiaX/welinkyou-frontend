import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";
import { ProfessionalCard, ProfessionalCardSkeleton } from "@/components/ProfessionalCard";
import { Button } from "@/components/ui/button";
import { useFeaturedPractitioners } from "@/hooks/usePractitioners";
import type { ApiPractitionerProfile } from "@/types/api";

// Convertir un profil API vers le format Professional attendu par ProfessionalCard
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

export const FeaturedPractitioners = () => {
  const { practitioners, isLoading, error } = useFeaturedPractitioners({ limit: 8 });

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-primary font-medium text-sm uppercase tracking-wider mb-3 block"
          >
            Nos experts
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Professionnels <span className="text-gradient-primary">mis en avant</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos professionnels de confiance, vérifiés et reconnus pour leur expertise
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-muted-foreground mb-4">
              Impossible de charger les professionnels pour le moment.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ProfessionalCardSkeleton />
              </motion.div>
            ))}
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && !error && practitioners.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {practitioners.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="h-full transition-shadow duration-300 group-hover:shadow-xl rounded-2xl">
                  <ProfessionalCard professional={mapApiToProfessional(profile)} index={0} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && practitioners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun professionnel disponible pour le moment.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link to="/recherche">
            <Button
              size="lg"
              className="gradient-primary border-0 btn-ripple text-base font-semibold gap-2 px-8 py-6 rounded-xl"
            >
              Voir plus d'experts
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};