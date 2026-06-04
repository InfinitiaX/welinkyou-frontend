import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const CharteWeLinkYou = () => {
  useDocumentMeta({
    title: "Charte WeLinkYou",
    description: "Découvrez la charte WeLinkYou : les principes et engagements auxquels adhèrent les professionnels référencés sur la plateforme.",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-background">
              Charte WeLinkYou
            </h1>
            <p className="text-xl text-primary-light font-medium">
              S'engager ensemble pour une plateforme de confiance
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >

          <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
            {/* Préambule */}
            <section className="bg-muted/30 p-6 rounded-xl border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Préambule – Engagement des professionnels</h2>
              <p className="text-justify mb-4">
                WeLinkYou est une plateforme numérique de mise en relation permettant à des utilisateurs, situés en France ou à l'international, d'entrer en contact avec des professionnels disposant d'une expertise relative à un pays donné, afin de répondre à des besoins professionnels spécifiques liés à ce pays.
              </p>
              <p className="text-justify">
                La présente Charte définit les principes et engagements auxquels adhèrent les professionnels référencés sur la plateforme. Elle vise à instaurer un cadre clair et structuré encadrant leur présence sur WeLinkYou, afin de contribuer à la lisibilité du fonctionnement de la plateforme et de préserver un environnement sérieux et respectueux pour l'ensemble des utilisateurs.
              </p>
            </section>

            {/* 1. Informations exactes et transparentes */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informations exactes et transparentes</h2>
              <p className="text-justify">
                Les professionnels référencés s'engagent à fournir des informations exactes, sincères et à jour concernant leur identité, leur statut professionnel, leurs qualifications et leurs domaines d'expertise.
              </p>
            </section>

            {/* 2. Exercice professionnel conforme */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Exercice professionnel conforme</h2>
              <p className="text-justify">
                Les professionnels s'engagent à exercer leur activité dans le respect des lois, réglementations et règles professionnelles applicables dans leur pays d'exercice.
              </p>
            </section>

            {/* 3. Qualité des échanges */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Qualité des échanges</h2>
              <p className="text-justify">
                Les échanges entre professionnels et utilisateurs s'inscrivent dans une communication professionnelle, respectueuse et loyale.
              </p>
            </section>

            {/* 4. Utilisation loyale de la plateforme */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Utilisation loyale de la plateforme</h2>
              <p className="text-justify">
                La plateforme doit être utilisée exclusivement dans le cadre de mises en relation professionnelles légitimes.
              </p>
            </section>

            {/* 5. Protection des données et confidentialité */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Protection des données et confidentialité</h2>
              <p className="text-justify">
                Les données personnelles échangées via WeLinkYou sont traitées dans le respect des réglementations applicables et uniquement dans le cadre de la relation professionnelle concernée.
              </p>
            </section>

            {/* 6. Processus de référencement sur WeLinkYou */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Processus de référencement sur WeLinkYou</h2>
              <p className="text-justify">
                WeLinkYou met en œuvre un processus de référencement fondé sur les informations et documents communiqués par les professionnels, afin de renforcer la transparence du réseau. Ce processus ne constitue ni une certification, ni une validation officielle de l'activité ou des compétences professionnelles.
              </p>
            </section>

            {/* 7. Indépendance de l'exercice professionnel */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Indépendance de l'exercice professionnel</h2>
              <p className="text-justify">
                Chaque professionnel exerce son activité en toute indépendance et demeure responsable des prestations proposées et réalisées. WeLinkYou intervient exclusivement en qualité d'intermédiaire de mise en relation.
              </p>
            </section>

            {/* 8. Préservation de la qualité du réseau */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Préservation de la qualité du réseau</h2>
              <p className="text-justify">
                Tout manquement à la Charte peut entraîner des mesures destinées à préserver la qualité, la sécurité et la confiance au sein de la plateforme.
              </p>
            </section>

            {/* Dernière mise à jour */}
            <div className="pt-8 border-t border-muted">
              <p className="text-sm text-foreground/60">
                Version : Janvier 2026
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default CharteWeLinkYou;
