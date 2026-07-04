import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const MentionsLegales = () => {
  useDocumentMeta({
    title: "Mentions Légales",
    description: "Mentions légales de WeLinkYou : informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et les conditions d'utilisation du site.",
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
            <h1 className="text-3xl md:text-4xl font-bold text-background">
              Mentions Légales
            </h1>
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
            {/* 1. Éditeur du site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Éditeur du site</h2>
              <p className="mb-4">Le site WeLinkYou est édité par :</p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong className="font-semibold text-foreground">WeLinkYou</strong></p>
                <p className="mb-2">Entreprise individuelle</p>
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Nom et prénom :</strong> Hind Chenaoui</p>
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Siret :</strong> 994 828 903 00017</p>
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Adresse :</strong> 60, rue François 1er – 75008 Paris</p>
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Pays :</strong> France</p>
                <p><strong className="font-semibold text-foreground/50">Adresse e-mail :</strong > contact@welinkyou.co</p>
              </div>
            </section>

            {/* 2. Hébergement */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hébergement</h2>
              <p className="mb-4">Le site est hébergé par :</p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong className="font-semibold text-foreground">OVHcloud</strong></p>
                <p className="mb-2">SAS au capital de 10 174 560 €</p>
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Siège social :</strong> 2 rue Kellermann – 59100 Roubaix – France</p>
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Téléphone :</strong> +33 (0)9 72 10 10 07</p>
                <p><strong className="font-semibold text-foreground/50">Site web :</strong> <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light">www.ovhcloud.com</a></p>
              </div>
            </section>

            {/* 3. Objet du site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Objet du site</h2>
              <p className="mb-4">
                WeLinkYou est une plateforme numérique de mise en relation permettant à des utilisateurs, situés en France ou à l'international, d'entrer en contact avec des professionnels disposant d'une expertise relative à un pays donné, afin de répondre à des besoins professionnels spécifiques liés à ce pays.
              </p>
              <p>
                WeLinkYou agit exclusivement en qualité d'intermédiaire technique et n'intervient en aucun cas dans la relation contractuelle, commerciale ou professionnelle susceptible d'être nouée entre les utilisateurs et les professionnels référencés sur la plateforme.
              </p>
            </section>

            {/* 4. Accès au site */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Accès au site</h2>
              <p className="mb-4">
                L'accès au site est libre et gratuit.
              </p>
              <p>
                WeLinkYou s'efforce d'assurer l'accessibilité du site à tout moment, sans toutefois garantir une disponibilité continue ou exempte d'erreurs.
              </p>
            </section>

            {/* 5. Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble des éléments composant le site WeLinkYou, notamment les textes, graphismes, logos, marques, éléments graphiques, structure, contenus, codes et designs, est protégé par le droit de la propriété intellectuelle et est la propriété exclusive de WeLinkYou.
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation préalable et écrite de WeLinkYou, est strictement interdite.
              </p>
            </section>

            {/* 6. Données personnelles */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Données personnelles</h2>
              <p className="mb-4">
                Les données personnelles collectées dans le cadre de l'utilisation du site sont traitées conformément à la <a href="/politique-confidentialite" className="text-primary hover:text-primary-light">"Politique de confidentialité"</a>, accessible sur le site.
              </p>
              <p>
                Les professionnels disposent d'une politique spécifique relative au traitement de leurs données personnelles, accessible depuis la plateforme.
              </p>
            </section>

            {/* 7. Responsabilité */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Responsabilité</h2>
              <p className="mb-4">
                WeLinkYou agit exclusivement en qualité d'intermédiaire technique.
              </p>
              <p>
                WeLinkYou ne saurait être tenue responsable des prestations proposées ou réalisées par les professionnels référencés sur la plateforme, ni des litiges pouvant survenir entre les utilisateurs et les professionnels.
              </p>
            </section>

            {/* 8. Droit applicable */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Droit applicable</h2>
              <p className="mb-4">
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p>
                Tout litige relatif à leur interprétation ou à leur exécution relèvera, à défaut de résolution amiable, de la compétence des tribunaux français.
              </p>
            </section>

            {/* 9. Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact</h2>
              <p className="mb-4">Pour toute question relative au site ou aux présentes mentions légales, vous pouvez contacter WeLinkYou à l'adresse suivante :</p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="mb-2"><strong className="font-semibold text-foreground/50">Email :</strong> contact@welinkyou.co</p>
                <p><strong className="font-semibold text-foreground/50">Formulaire de contact :</strong> <a href="/contact" className="text-primary hover:text-primary-light">Cliquez ici</a></p>
              </div>
            </section>

            {/* Dernière mise à jour */}
            <div className="pt-8 border-t border-muted">
              <p className="text-sm text-foreground/60">
                {/* Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')} */}
                Dernière mise à jour : Avril 2026
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
