import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const CGU = () => {
  useDocumentMeta({
    title: "Conditions Générales d'Utilisation du Site",
    description: "Consultez les conditions générales d'utilisation du site WeLinkYou. Règles d'accès, droits et obligations des utilisateurs de la plateforme.",
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
              CONDITIONS GÉNÉRALES D'UTILISATION DU SITE
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
            {/* 1. Objet du site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet du site</h2>
              <p className="text-justify mb-4">
                Le site WeLinkYou a pour objet de présenter la plateforme WeLinkYou, ses services et son fonctionnement, et de permettre aux utilisateurs de consulter des profils de professionnels et, le cas échéant, d'entrer en contact avec eux.
              </p>
              <p className="text-justify mb-4">
                WeLinkYou est une plateforme numérique de mise en relation permettant à des utilisateurs, situés en France ou à l'international, d'entrer en contact avec des professionnels disposant d'une expertise relative à un pays donné, afin de répondre à des besoins professionnels spécifiques liés à ce pays.
              </p>
              <p className="text-justify">
                WeLinkYou agit exclusivement en qualité d'intermédiaire technique et n'intervient en aucun cas dans la relation contractuelle, commerciale ou professionnelle susceptible d'être nouée entre les utilisateurs et les professionnels référencés sur la plateforme.
              </p>
            </section>

            {/* 2. Accès au site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Accès au site</h2>
              <p className="text-justify mb-4">
                L'accès au site WeLinkYou est libre et gratuit pour tout utilisateur disposant d'un accès à Internet.
              </p>
              <p className="text-justify">
                WeLinkYou s'efforce de maintenir le site accessible 24/24, 7j/7. Cependant, WeLinkYou se réserve le droit de suspendre, limiter ou interrompre l'accès au site, temporairement ou définitivement, notamment pour des raisons techniques, de maintenance ou de sécurité, sans que cela n'ouvre droit à une quelconque indemnisation.
              </p>
            </section>

            {/* 3. Utilisation du site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Utilisation du site</h2>
              <p className="text-justify mb-4">
                L'utilisateur s'engage à utiliser le site conformément à sa finalité, dans le respect des lois et réglementations en vigueur, et à ne pas porter atteinte au bon fonctionnement du site ou aux droits de WeLinkYou ou de tiers.
              </p>
              <p className="text-justify">
                Toute utilisation frauduleuse, abusive ou contraire aux présentes CGU pourra entraîner la suspension ou l'interdiction d'accès au site.
              </p>
            </section>

            {/* 4. Contenus du site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contenus du site</h2>
              <p className="text-justify mb-4">
                Les informations et contenus diffusés sur le site WeLinkYou sont fournis à titre informatif.
              </p>
              <p className="text-justify mb-4">
                WeLinkYou s'efforce d'assurer l'exactitude et la mise à jour des informations publiées, sans toutefois garantir leur exhaustivité ou leur actualité permanente.
              </p>
              <p className="text-justify">
                Les profils professionnels et informations associées sont communiqués sous la responsabilité exclusive des professionnels concernés.
              </p>
            </section>

            {/* 5. Limitation de responsabilité */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Limitation de responsabilité</h2>
              <p className="text-justify mb-4">
                WeLinkYou est tenue à une obligation de moyens dans le cadre de la mise à disposition du site.
              </p>
              <p className="text-justify mb-4">
                WeLinkYou ne garantit ni la disponibilité permanente du site, ni l'exactitude ou la qualité des informations fournies par les professionnels, ni la conclusion de relations contractuelles entre utilisateurs et professionnels.
              </p>
              <p className="text-justify">
                WeLinkYou ne saurait être tenue responsable des litiges, dommages, préjudices ou réclamations résultant des relations entre les utilisateurs et les professionnels.
              </p>
            </section>

            {/* 6. Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Propriété intellectuelle</h2>
              <p className="text-justify mb-4">
                L'ensemble des éléments composant le site WeLinkYou, notamment les textes, graphismes, logos, marques, éléments graphiques, structure, contenus, codes et designs, est protégé par le droit de la propriété intellectuelle et est la propriété exclusive de WeLinkYou.
              </p>
              <p className="text-justify">
                Toute reproduction, représentation, modification ou exploitation, totale ou partielle, de tout ou partie du site, par quelque procédé que ce soit, sans autorisation préalable et écrite de WeLinkYou, est strictement interdite.
              </p>
            </section>

            {/* 7. Données personnelles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Données personnelles</h2>
              <p className="text-justify">
                Les données personnelles collectées dans le cadre de l'utilisation du site sont traitées conformément à la{" "}
                <Link to="/politique-confidentialite" className="text-primary hover:underline font-medium">
                  Politique de confidentialité
                </Link>
                , accessible sur le site et faisant partie intégrante des présentes Conditions Générales d'Utilisation.
              </p>
            </section>

            {/* 8. Liens externes */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Liens externes</h2>
              <p className="text-justify mb-4">
                Le site peut contenir des liens vers des sites tiers.
              </p>
              <p className="text-justify">
                WeLinkYou n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques.
              </p>
            </section>

            {/* 9. Modification des CGU */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modification des CGU</h2>
              <p className="text-justify mb-4">
                Les présentes CGU peuvent être modifiées à tout moment afin de tenir compte des évolutions légales, réglementaires ou techniques.
              </p>
              <p className="text-justify">
                La version applicable est celle publiée en ligne. En cas de modification substantielle, les utilisateurs en seront informés par tout moyen approprié.
              </p>
            </section>

            {/* 10. Droit applicable */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Droit applicable</h2>
              <p className="text-justify mb-4">
                Les présentes Conditions Générales d'Utilisation du site sont régies par le droit français.
              </p>
              <p className="text-justify">
                Tout litige relatif à leur interprétation ou à leur exécution relèvera, à défaut de résolution amiable, de la compétence des tribunaux français.
              </p>
            </section>

            {/* 11. Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
              <p className="text-justify mb-4">
                Pour toute question relative aux présentes CGU, l'utilisateur peut contacter WeLinkYou à l'adresse suivante :{" "}
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
