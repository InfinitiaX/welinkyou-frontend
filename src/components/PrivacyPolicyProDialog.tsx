import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface PrivacyPolicyProDialogProps {
  children: React.ReactNode;
}

export const PrivacyPolicyProDialog = ({ children }: PrivacyPolicyProDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            Politique de protection des données personnelles – Professionnels
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Version : Avril 2026</p>
        </DialogHeader>
        <ScrollArea className="h-[70vh] px-6 pb-6">
          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
              <p className="text-sm">
                Le respect de la vie privée et la protection des données personnelles constituent des principes essentiels pour WeLinkYou. WeLinkYou s&apos;engage à traiter les données personnelles des professionnels dans le respect du RGPD et de la loi Informatique et Libertés et, le cas échéant, en tenant compte des principes applicables en matière de protection des données dans les juridictions concernées, notamment au Maroc.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Champ d&apos;application</h2>
              <p className="text-sm">
                La présente politique s&apos;applique aux professionnels disposant d&apos;un compte, référencés ou en relation avec la plateforme WeLinkYou.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Responsable du traitement</h2>
              <p className="text-sm mb-3">Le responsable du traitement est :</p>
              <p className="text-sm mb-3">
                <strong>WeLinkYou</strong>, plateforme exploitée par Hind Chenaoui, entrepreneur individuel, établie en France.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm mb-2">
                  <strong>Point de contact pour la protection des données :</strong>
                </p>
                <p className="text-sm mb-2">
                  <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                    contact@welinkyou.co
                  </a>
                </p>
                <p className="text-sm">
                  <strong>Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Données collectées</h2>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Données d&apos;identification et de contact</li>
                <li>Données professionnelles</li>
                <li>
                  Données de connexion et d&apos;usage (journaux de connexion, données techniques liées à l&apos;accès et à la sécurité de la plateforme)
                </li>
                <li>Données administratives et contractuelles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Finalités, bases légales et durées de conservation</h2>
              <p className="text-sm mb-4">
                Le tableau ci-dessous présente une synthèse des principaux traitements de données personnelles mis en œuvre par WeLinkYou à destination des professionnels.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-2 text-left font-semibold">Finalité du traitement</th>
                      <th className="border border-border p-2 text-left font-semibold">Données concernées</th>
                      <th className="border border-border p-2 text-left font-semibold">Base légale</th>
                      <th className="border border-border p-2 text-left font-semibold">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">Création et gestion du compte professionnel</td>
                      <td className="border border-border p-2">Identité, coordonnées, informations professionnelles</td>
                      <td className="border border-border p-2">Exécution du contrat / mesures précontractuelles</td>
                      <td className="border border-border p-2">Durée de la relation contractuelle</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Vérification du profil professionnel</td>
                      <td className="border border-border p-2">
                        Diplômes, attestation, carte professionnelle, certifications, expérience professionnelle, documents d&apos;identité transmis à des fins de vérification
                      </td>
                      <td className="border border-border p-2">Intérêt légitime (fiabilité et confiance de la plateforme)</td>
                      <td className="border border-border p-2 text-[10px] leading-relaxed">
                        Documents justificatifs d&apos;identité (tels que carte nationale d&apos;identité ou passeport) sont collectés exclusivement à des fins de vérification du profil professionnel. Ils sont conservés pour la durée strictement nécessaire à la vérification, puis supprimés automatiquement dans un délai maximal de 30 jours. Aucun numéro de document d&apos;identité n&apos;est conservé. Seul le statut « profil vérifié » est maintenu.
                        <br />
                        <br />
                        Diplôme/certification/attestation/carte professionnelle et/ou autre document justifiant les compétences/expériences professionnelle : sont collectés exclusivement à des fins de vérification du profil professionnel. Ils sont conservés pour la durée strictement nécessaire à la vérification, puis supprimés automatiquement dans un délai maximal de 30 jours. Seuls des éléments de traçabilité sont conservés (type de document, date de vérification, statut).
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Mise en relation avec les utilisateurs</td>
                      <td className="border border-border p-2">Données de profil, messages échangés via la plateforme</td>
                      <td className="border border-border p-2">Exécution du contrat</td>
                      <td className="border border-border p-2">Durée de la relation contractuelle</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Gestion administrative et contractuelle</td>
                      <td className="border border-border p-2">Contrat, facturation, données d&apos;identification professionnelle</td>
                      <td className="border border-border p-2">Obligation légale / exécution du contrat</td>
                      <td className="border border-border p-2">Archivage 5 ans à des fins probatoires</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Gestion comptable et fiscale</td>
                      <td className="border border-border p-2">Factures, écritures comptables</td>
                      <td className="border border-border p-2">Obligation légale</td>
                      <td className="border border-border p-2">Jusqu&apos;à 10 ans conformément aux obligations légales</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Sécurité et prévention des abus</td>
                      <td className="border border-border p-2">Logs, adresses IP, données techniques</td>
                      <td className="border border-border p-2">Intérêt légitime</td>
                      <td className="border border-border p-2">6 à 12 mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Destinataires des données</h2>
              <p className="text-sm">
                Les données personnelles sont accessibles aux équipes internes habilitées de WeLinkYou et à ses prestataires techniques agissant en qualité de sous-traitants.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Transferts hors Union européenne</h2>
              <p className="text-sm">
                Lorsque cela est nécessaire, les transferts de données hors Union européenne sont encadrés par des garanties appropriées conformément au RGPD, telles que des décisions d&apos;adéquation, des clauses contractuelles types ou tout autre mécanisme reconnu par la réglementation applicable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Droits des professionnels</h2>
              <p className="text-sm mb-3">
                Conformément au RGPD, vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité.
              </p>
              <p className="text-sm mb-3">
                Vous pouvez exercer ces droits en contactant WeLinkYou à l&apos;adresse suivante :{" "}
                <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                  contact@welinkyou.co
                </a>
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm mb-2">
                  <strong>Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
                <p className="text-sm">
                  Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr) ou, le cas échéant, de la CNDP.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Suppression du compte</h2>
              <p className="text-sm">
                Vous pouvez demander la suppression de votre compte à tout moment. Cette suppression entraîne la désactivation du profil, sous réserve des obligations légales de conservation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Sécurité des données</h2>
              <p className="text-sm">
                WeLinkYou met en œuvre des mesures techniques et organisationnelles appropriées afin de garantir la sécurité et la confidentialité des données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Modification de la politique</h2>
              <p className="text-sm">
                La présente politique peut être modifiée afin de tenir compte des évolutions légales, réglementaires ou techniques. La version applicable est celle publiée en ligne.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">Version : Avril 2026</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
