import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const PolitiqueConfidentialite = () => {
  useDocumentMeta({
    title: "Politique de protection des données personnelles – Professionnels",
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
              Politique de protection des données personnelles – Professionnels
            </h1>
            <p className="text-background/70">Version : Avril 2026</p>
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
                Le respect de la vie privée et la protection des données personnelles constituent des principes essentiels pour WeLinkYou. WeLinkYou s’engage à traiter les données personnelles des professionnels dans le respect du RGPD et de la loi Informatique et Libertés et, le cas échéant, en tenant compte des principes applicables en matière de protection des données dans les juridictions concernées, notamment au Maroc.
              </p>
            </section>

            {/* 2. Champ d'application */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Champ d'application</h2>
              <p className="text-justify">
                La présente politique s’applique aux professionnels disposant d’un compte, référencés ou en relation avec la plateforme WeLinkYou.
              </p>
            </section>

            {/* 3. Responsable du traitement */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Responsable du traitement</h2>
              <p className="text-justify" >Le responsable du traitement est :</p>
              <p className="text-justify mb-4">
                <strong className="bold text-foreground">WeLinkYou</strong>, plateforme exploitée par Hind Chenaoui, entrepreneur individuel, établie en France.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg ">
                <p className="mb-2"><strong className="bold text-foreground/50">Point de contact pour la protection des données :</strong></p>
                <p className="mb-2">
                  <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                    contact@welinkyou.co
                  </a>
                </p>
                <p>
                  <strong className="bold text-foreground/50">Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
                <p className="text-justify text-foreground/50 bold mb-4">
                </p>
              </div>
                  <p>Déclaration déposée auprès de la CNDP — récépissé en cours d'instruction</p>
            </section>

            {/* 4. Données collectées */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Données collectées</h2>
              <p className="text-justify mb-4">
                Lors de la navigation sur le site WeLinkYou, les données suivantes peuvent être collectées :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong className="bold text-foreground" > Données d'identification et de contact</strong> (nom, prénom, adresse professionnelle, adresse électronique, numéro de téléphone, photo de profil et autres informations de contact communiquées par le professionnel).</li>
                <li><strong className="bold text-foreground" > Données professionnelles</strong> (profession, spécialité, expérience professionnelle, langue(s) parlée(s), ainsi que les justificatifs d'inscription à un ordre ou registre professionnel, d'autorisation d'exercice ou, le cas échéant, d'existence légale de la structure d'exercice, lorsque ces justificatifs sont nécessaires à la vérification du profil).</li>
                <li><strong className="bold text-foreground" > Données de connexion et d’usage</strong> (adresse IP, journaux de connexion, données techniques relatives à l'accès et à la sécurité de la plateforme, ainsi que les données collectées via les cookies lorsque ceux-ci sont utilisés).</li>
                <li><strong className="bold text-foreground" > Données administratives et contractuelles</strong> (informations relatives au compte professionnel, à la relation contractuelle, à la facturation, aux paiements le cas échéant, ainsi qu'aux obligations légales associées).</li>
              </ul>
            </section>

            {/* 5. Finalités et bases légales */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Finalités et bases légales</h2>
              <p className="text-justify mb-4">
                Le tableau ci-dessous présente une synthèse des principaux traitements de données personnelles mis en œuvre par WeLinkYou à destination des professionnels.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-muted/50 text-sm">
                  <thead className="bg-muted/80">
                    <tr>
                      <th className="border border-muted/50 px-4 py-3 font-semibold text-black/80 border-radius">Finalité du traitement</th>
                      <th className="border border-muted/50 px-4 py-3 font-semibold text-black/80">Données concernées</th>
                      <th className="border border-muted/50 px-4 py-3 font-semibold text-black/80">Base légale</th>
                      <th className="border border-muted/50 px-4 py-3 font-semibold text-black/80">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-foreground/5">
                      <td className="border border-muted/50 px-4 py-3">Création et gestion du compte professionnel</td>
                      <td className="border border-muted/50 px-4 py-3">Identité, coordonnées, informations professionnelles</td>
                      <td className="border border-muted/50 px-4 py-3">Exécution du contrat / mesures précontractuelles</td>
                      <td className="border border-muted/50 px-4 py-3">Durée du compte puis suppression sous 30 jours, sauf obligation légale</td>
                    </tr>
                    <tr>
                      <td className="border border-muted/50 px-4 py-3">Assurer la fiabilité des informations professionnelles publiées sur la plateforme</td>
                      <td className="border border-muted/50 px-4 py-3">Informations relatives à l'exercice de l'activité professionnelle</td>
                      <td className="border border-muted/50 px-4 py-3">Intérêt légitime (fiabilité et confiance de la plateforme)</td>
                      <td className="border border-muted/50 px-4 py-3">Les justificatifs permettant de vérifier ces informations professionnelles sont conservés pendant la durée strictement nécessaire à la vérification puis supprimés dès que celle-ci est effectuée et, au plus tard, dans un délai de 30 jours. Seuls des éléments de traçabilité sont conservés.</td>
                    </tr>
                    <tr className="bg-foreground/5">
                      <td className="border border-muted/50 px-4 py-3">Mise en relation avec les utilisateurs</td>
                      <td className="border border-muted/50 px-4 py-3">Données du profil professionnel rendues accessibles aux utilisateurs</td>
                      <td className="border border-muted/50 px-4 py-3">Exécution du contrat</td>
                      <td className="border border-muted/50 px-4 py-3">Durée du compte professionnel puis suppression sous 30 jours, sauf obligation légale applicable</td>
                    </tr>
                    <tr>
                      <td className="border border-muted/50 px-4 py-3">Gestion administrative et contractuelle</td>
                      <td className="border border-muted/50 px-4 py-3">Informations relatives au compte professionnel, à la relation contractuelle et, le cas échéant, à la facturation</td>
                      <td className="border border-muted/50 px-4 py-3">Obligation légale / exécution du contrat</td>
                      <td className="border border-muted/50 px-4 py-3">Pendant la relation contractuelle puis archivage pendant 5 ans, lorsque cet archivage est applicable.</td>
                    </tr>
                    <tr className="bg-foreground/5">
                      <td className="border border-muted/50 px-4 py-3">Gestion comptable et fiscale</td>
                      <td className="border border-muted/50 px-4 py-3">Données de facturation et informations comptables, le cas échéant</td>
                      <td className="border border-muted/50 px-4 py-3">Obligation légale</td>
                      <td className="border border-muted/50 px-4 py-3">Jusqu’à 10 ans conformément aux obligations légales applicables</td>
                    </tr>
                    <tr>
                      <td className="border border-muted/50 px-4 py-3">Sécurité et prévention des abus</td>
                      <td className="border border-muted/50 px-4 py-3">Données de connexion et d’usage</td>
                      <td className="border border-muted/50 px-4 py-3">Intérêt légitime</td>
                      <td className="border border-muted/50 px-4 py-3">6 à 12 mois, selon la nature des données et les besoins de sécurité de la plateforme.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6. Destinataires des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Destinataires des données</h2>
              <p className="text-justify mb-4">
                Les données personnelles sont accessibles aux personnes habilitées intervenant dans la gestion de la plateforme WeLinkYou ainsi qu'aux prestataires techniques agissant en qualité de sous-traitants.
              </p>
              <p > 
                Les informations figurant sur les profils professionnels sont également accessibles aux utilisateurs de la plateforme dans le cadre de la recherche et de la mise en relation avec des professionnels.
              </p>
            </section>

            {/* 7. Transferts de données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Transferts de données hors Union Européenne</h2>
              <p className="text-justify">
                Les données personnelles sont hébergées en France. Lorsque des données sont collectées auprès de personnes situées au Maroc, leur transfert vers la France et leur hébergement sont réalisés conformément à la réglementation applicable. Si des transferts hors de l'Union européenne devaient être réalisés, ils seraient encadrés par les garanties appropriées prévues par la réglementation applicable.
              </p>
            </section>

            {/* 8. Durées de conservation
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
            </section> */}

            {/* 8. Droits des visiteurs */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Droits des professionnels</h2>
              <p className="text-justify mb-4">
                Conformément au RGPD, vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg ">
                <p className="mb-2"><strong className="bold text-foreground/50">Vous pouvez exercer ces droits en contactant WeLinkYou à l’adresse suivante :</strong></p>
                <p className="mb-2">
                  <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                    contact@welinkyou.co
                  </a>
                </p>
                <p> 
                  <strong className="bold text-foreground/50">Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
              </div>
              <p className="text-justify">
                Vous pouvez également introduire une réclamation auprès de la <strong className="bold text-foreground"> CNIL</strong> ( <a href="https://www.cnil.fr/fr/plaintes" className="text-primary hover:underline font-medium">www.cnil.fr</a> ) ou, le cas échéant, de la <strong className="bold text-foreground"> CNDP</strong>
              </p>
            </section>

            {/* 9. Suppressin du compte */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Suppressin du compte</h2>
              <p className="text-justify">
                Vous pouvez demander la suppression de votre compte à tout moment. Cette suppression entraîne la suppression du profil et des données associées dans un délai maximal de 30 jours, sous réserve des obligations légales de conservation applicables.
              </p>
            </section>

            {/* 10. Sécurité des données */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Sécurité des données</h2>
              <p className="text-justify">
                WeLinkYou met en œuvre des mesures techniques et organisationnelles appropriées afin de garantir la sécurité des données, notamment la gestion des droits d'accès, l'authentification des utilisateurs habilités, le chiffrement des communications via HTTPS/TLS, la journalisation des événements techniques et le recours à un hébergeur sécurisé.
              </p>
            </section>
            {/* 11. Modification de la politique */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Modification de la politique</h2>
              <p className="text-justify">
                La présente politique peut être modifiée afin de tenir compte des évolutions légales, réglementaires ou techniques. La version applicable est celle publiée en ligne.
              </p>
            </section>

             {/* Dernière mise à jour
            <div className="pt-8 border-t border-muted">
              <p className="text-sm text-foreground/60">
                Version : Avril 2026
              </p>
            </div> */}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
