import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const PolitiqueCookies = () => {
  useDocumentMeta({
    title: "Politique de Cookies",
    description: "Découvrez comment WeLinkYou utilise les cookies et traceurs. Informations sur la gestion de votre consentement et vos droits.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-background">
              POLITIQUE DE COOKIES
            </h1>
            <p className="text-background/70">Version : Janvier 2026</p>
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
            {/* 1. Objet de la politique */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet de la politique</h2>
              <p className="text-justify">
                La présente politique de cookies a pour objet d'informer les visiteurs, utilisateurs et professionnels accédant au site et à la plateforme WeLinkYou des modalités d'utilisation des cookies et autres traceurs.
              </p>
            </section>

            {/* 2. Qu'est-ce qu'un cookie ? */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Qu'est-ce qu'un cookie ?</h2>
              <p className="text-justify mb-4">
                Un cookie est un petit fichier texte susceptible d'être déposé sur le terminal de l'utilisateur (ordinateur, tablette, smartphone) lors de la consultation d'un site internet.
              </p>
              <p className="text-justify">
                Il permet notamment de reconnaître un terminal, de faciliter la navigation et d'analyser l'utilisation du site.
              </p>
            </section>

            {/* 3. Cookies utilisés sur le site WeLinkYou */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies utilisés sur le site WeLinkYou</h2>
              <p className="text-justify mb-4">
                Le site WeLinkYou peut utiliser les catégories de cookies suivantes :
              </p>
              
              <div className="bg-muted/30 p-6 rounded-xl border border-border mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">a) Cookies strictement nécessaires</h3>
                <p className="text-justify mb-2">
                  Ces cookies sont indispensables au bon fonctionnement du site et ne peuvent pas être désactivés.
                </p>
                <p className="text-justify">
                  Ils permettent notamment d'assurer la sécurité du site, de gérer la navigation et de permettre l'accès aux fonctionnalités essentielles.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">b) Cookies de mesure d'audience</h3>
                <p className="text-justify mb-2">
                  Ces cookies permettent d'établir des statistiques anonymes de fréquentation et d'utilisation du site (pages consultées, durée de visite, etc.), afin d'améliorer son fonctionnement et ses performances.
                </p>
                <p className="text-justify">
                  Ces cookies sont déposés uniquement avec le consentement de l'utilisateur, lorsque la réglementation applicable l'exige.
                </p>
              </div>
            </section>

            {/* 4. Gestion du consentement */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Gestion du consentement</h2>
              <p className="text-justify mb-4">
                Lors de la première visite sur le site WeLinkYou, un bandeau d'information informe l'utilisateur de l'utilisation de cookies et lui permet d'accepter, de refuser tout ou partie des cookies, ou de paramétrer ses choix à tout moment.
              </p>
              <p className="text-justify">
                L'utilisateur peut modifier ses préférences relatives aux cookies via le bandeau prévu à cet effet ou via les paramètres de son navigateur.
              </p>
            </section>

            {/* 5. Durée de conservation */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Durée de conservation</h2>
              <p className="text-justify">
                Les cookies sont conservés pour une durée maximale de treize (13) mois, conformément à la réglementation applicable.
              </p>
            </section>

            {/* 6. Paramétrage du navigateur */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Paramétrage du navigateur</h2>
              <p className="text-justify mb-4">
                L'utilisateur peut configurer son navigateur afin de bloquer ou supprimer les cookies.
              </p>
              <p className="text-justify">
                Toutefois, le refus de certains cookies strictement nécessaires peut entraîner une dégradation de l'accès ou du fonctionnement du site.
              </p>
            </section>

            {/* 7. Données personnelles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Données personnelles</h2>
              <p className="text-justify">
                Les données collectées via les cookies sont traitées conformément à la{" "}
                <Link to="/politique-confidentialite" className="text-primary hover:underline font-medium">
                  Politique de confidentialité
                </Link>
                .
              </p>
            </section>

            {/* 8. Modification de la politique */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modification de la politique</h2>
              <p className="text-justify mb-4">
                La présente politique de cookies peut être modifiée à tout moment afin de tenir compte des évolutions légales, réglementaires ou techniques.
              </p>
              <p className="text-justify">
                La version applicable est celle publiée en ligne.
              </p>
            </section>

            {/* 9. Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact</h2>
              <p className="text-justify mb-4">
                Pour toute question relative à l'utilisation des cookies, vous pouvez contacter WeLinkYou à l'adresse suivante :{" "}
                <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                  contact@welinkyou.co
                </a>
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p>
                  <strong>Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
              </div>
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

export default PolitiqueCookies;
