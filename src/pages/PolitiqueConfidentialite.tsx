import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const PolitiqueConfidentialite = () => {
  useDocumentMeta({
    title: "Politique de Confidentialité",
    description: "Découvrez comment WeLinkYou protège vos données personnelles. Collecte, utilisation, droits RGPD et sécurité de vos informations.",
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
              Politique de confidentialité
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
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-justify mb-4">
                Le respect de la vie privée et la protection des données à caractère personnel constituent des principes essentiels pour WeLinkYou.
              </p>
              <p className="text-justify">
                La présente politique a pour objet d'informer les visiteurs du site WeLinkYou sur les modalités de collecte, d'utilisation et de protection de leurs données personnelles, conformément au Règlement (UE) 2016/679 (RGPD).
              </p>
            </section>

            {/* 2. Champ d'application */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Champ d'application</h2>
              <p className="text-justify">
                La présente politique s'applique à toute personne visitant le site internet WeLinkYou, qu'elle dispose ou non d'un compte sur la plateforme.
              </p>
            </section>

            {/* 3. Responsable du traitement */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Responsable du traitement</h2>
              <p className="text-justify mb-4">Le responsable du traitement est :</p>
              <p className="text-justify mb-4">
                <strong>WeLinkYou</strong>, plateforme exploitée par Hind Chenaoui, entrepreneur individuel, établie en France.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong>Point de contact pour la protection des données :</strong></p>
                <p className="mb-2">
                  <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                    contact@welinkyou.co
                  </a>
                </p>
                <p>
                  <strong>Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
              </div>
            </section>

            {/* 4. Données collectées */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Données collectées</h2>
              <p className="text-justify mb-4">
                Lors de la navigation sur le site WeLinkYou, les données suivantes peuvent être collectées :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Données de navigation et de connexion (adresse IP, type de navigateur, système d'exploitation, pages consultées, temps d'accès et durée de visite)</li>
                <li>Données techniques (journaux de connexion, identifiants de cookies et traceurs similaires)</li>
                <li>Données de contact (nom, prénom, adresse électronique, message transmis via les formulaires)</li>
              </ul>
              <p className="text-justify">
                Aucune donnée sensible n'est collectée via le site.
              </p>
            </section>

            {/* 5. Finalités et bases légales */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Finalités et bases légales</h2>
              <p className="text-justify mb-4">
                Les données personnelles sont traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fonctionnement et navigation du site (intérêt légitime)</li>
                <li>Sécurité du site et prévention des abus (intérêt légitime)</li>
                <li>Réponse aux demandes de contact (intérêt légitime ou mesures précontractuelles)</li>
                <li>Gestion des cookies et traceurs (consentement, lorsque requis)</li>
              </ul>
            </section>

            {/* 6. Destinataires des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Destinataires des données</h2>
              <p className="text-justify">
                Les données personnelles sont accessibles uniquement aux équipes internes habilitées de WeLinkYou et à ses prestataires techniques agissant en qualité de sous-traitants, notamment pour l'hébergement et la maintenance du site.
              </p>
            </section>

            {/* 7. Transferts de données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Transferts de données</h2>
              <p className="text-justify">
                Les données personnelles collectées via le site WeLinkYou sont hébergées au sein de l'Union européenne. En cas de recours à des prestataires techniques situés en dehors de l'Union européenne, des garanties appropriées sont mises en place conformément au RGPD.
              </p>
            </section>

            {/* 8. Durées de conservation */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Durées de conservation</h2>
              <p className="text-justify mb-4">
                Les données sont conservées pour des durées proportionnées aux finalités poursuivies :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Données de navigation et journaux techniques : 6 à 12 mois maximum</li>
                <li>Données issues des formulaires de contact : durée nécessaire au traitement de la demande</li>
                <li>Cookies : selon leur nature et conformément à la politique cookies</li>
              </ul>
            </section>

            {/* 9. Droits des visiteurs */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Droits des visiteurs</h2>
              <p className="text-justify mb-4">
                Les visiteurs disposent des droits d'accès, de rectification, d'opposition, d'effacement et de limitation du traitement de leurs données personnelles.
              </p>
              <p className="text-justify mb-4">
                Ils peuvent exercer ces droits en contactant{" "}
                <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                  contact@welinkyou.co
                </a>
              </p>
              <div className="bg-muted/50 p-6 rounded-lg mb-4">
                <p>
                  <strong>Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
              </div>
              <p className="text-justify">
                Ils disposent également du droit d'introduire une réclamation auprès de l'autorité de contrôle compétente, notamment la CNIL.
              </p>
            </section>

            {/* 10. Sécurité des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Sécurité des données</h2>
              <p className="text-justify">
                WeLinkYou met en œuvre des mesures techniques et organisationnelles appropriées afin de garantir la sécurité, l'intégrité et la confidentialité des données personnelles.
              </p>
            </section>

            {/* 11. Modification de la politique */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modification de la politique</h2>
              <p className="text-justify">
                La présente politique peut être modifiée à tout moment afin de tenir compte des évolutions légales, réglementaires ou techniques. La version applicable est celle publiée en ligne.
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
