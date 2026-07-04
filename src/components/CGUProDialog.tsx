import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface CGUProDialogProps {
  children: React.ReactNode;
}

export const CGUProDialog = ({ children }: CGUProDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            CONDITIONS GÉNÉRALES D'UTILISATION — PROFESSIONNELS
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Version : Avril 2026</p>
        </DialogHeader>
        <ScrollArea className="h-[70vh] px-6 pb-6">
          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
            {/* Introduction */}
            <section className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="text-sm">
                Les présentes Conditions Générales d'Utilisation (ci-après les « CG ») ont pour objet de définir les modalités d'accès et d'utilisation de la plateforme WeLinkYou par les professionnels (ci-après le « Professionnel »).
              </p>
              <p className="text-sm font-medium mt-3">
                La création d'un compte professionnel sur la plateforme emporte acceptation pleine et entière des présentes CG.
              </p>
            </section>

            {/* Article 1 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Objet de la plateforme</h2>
              <p className="text-sm mb-3">
                WeLinkYou est une plateforme numérique de mise en relation permettant à des utilisateurs, situés en France ou à l'international, d'entrer en contact avec des professionnels disposant d'une expertise relative à un pays donné, notamment pour répondre à des besoins professionnels spécifiques.
              </p>
              <p className="text-sm">
                WeLinkYou agit exclusivement en qualité d'intermédiaire technique. À ce titre, WeLinkYou n'est ni partie ni représentant à la relation contractuelle, commerciale ou professionnelle susceptible d'être nouée entre le Professionnel et les utilisateurs, et n'intervient à aucun moment dans la fourniture des prestations réalisées par le Professionnel.
              </p>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Création et utilisation du compte professionnel</h2>
              <p className="text-sm mb-3">
                L'accès à la plateforme est réservé aux professionnels exerçant une activité déclarée et disposant de la capacité juridique nécessaire à l'exercice de leur activité.
              </p>
              <p className="text-sm">
                Le Professionnel s'engage à fournir des informations exactes, complètes et à jour lors de la création et de l'utilisation de son compte, et à utiliser la plateforme conformément à sa finalité. WeLinkYou se réserve le droit, sans préavis ni indemnité, de suspendre ou de supprimer tout compte professionnel en cas d'informations inexactes, trompeuses ou en cas de manquement aux présentes Conditions Générales.
              </p>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Vérification du profil – Badge « Profil vérifié »</h2>
              <p className="text-sm mb-3">
                Dans le cadre de l'inscription, le Professionnel est invité à transmettre des documents justificatifs afin de permettre une vérification administrative et documentaire de son profil.
              </p>
              <p className="text-sm mb-3">
                Cette vérification repose sur les informations et documents transmis par le Professionnel, lesquels demeurent sous sa seule responsabilité.
              </p>
              <p className="text-sm mb-3">
                Le badge « Profil vérifié » atteste que le Professionnel a suivi ce processus de vérification et a adhéré à la charte WeLinkYou. Il ne constitue ni une certification, ni une validation officielle, ni une garantie des compétences de la qualification ou de la qualité des prestations proposées par le Professionnel.
              </p>
              <p className="text-sm">
                Ce dispositif vise à contribuer au sérieux et à la fiabilité de la plateforme, ainsi qu'à renforcer la confiance entre les utilisateurs et les professionnels, dans l'intérêt de l'ensemble des parties.
              </p>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Obligations et responsabilité du Professionnel</h2>
              <p className="text-sm mb-2">Le Professionnel est seul responsable :</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>des informations communiquées sur son profil ;</li>
                <li>de l'exactitude et de l'authenticité des documents transmis ;</li>
                <li>des prestations proposées et réalisées auprès des utilisateurs ;</li>
                <li>du respect des lois, règlements et obligations professionnelles applicables à son activité.</li>
              </ul>
              <p className="text-sm mt-3">
                Toute transmission de document falsifié, inexact ou trompeur engage la responsabilité du Professionnel et peut entraîner la suspension ou la suppression de son compte, conformément aux présentes Conditions Générales.
              </p>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Conditions financières</h2>
              <p className="text-sm mb-3">
                L'accès à la plateforme WeLinkYou est accordé au Professionnel à titre gratuit pendant une période initiale de six (6) mois à compter de la création du compte.
              </p>
              <p className="text-sm mb-3">
                À l'issue de cette période, l'accès à certains services pourra être subordonné à la souscription d'un abonnement payant, selon des modalités (tarifs, durée, services inclus) qui seront communiquées au Professionnel avant toute facturation.
              </p>
              <p className="text-sm">
                Le Professionnel restera libre d'accepter ou de refuser la souscription à cet abonnement.
              </p>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Limitation de responsabilité de WeLinkYou</h2>
              <p className="text-sm mb-3">
                WeLinkYou est tenue à une obligation de moyens dans le cadre de la mise à disposition de la plateforme. WeLinkYou ne garantit ni le volume de mises en relation, ni la conclusion de contrats, ni la qualité, la conformité ou la licéité des prestations proposées ou réalisées par les Professionnels.
              </p>
              <p className="text-sm">
                WeLinkYou ne saurait être tenue responsable des litiges, dommages, préjudices ou réclamations, de quelque nature que ce soit, résultant des relations contractuelles, commerciales ou professionnelles entre les utilisateurs et les Professionnels.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Données personnelles</h2>
              <p className="text-sm">
                Les données personnelles du Professionnel sont traitées conformément à la « Politique de protection des données personnelles — Professionnels » WeLinkYou, accessible sur la plateforme.
              </p>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Suspension et suppression du compte</h2>
              <p className="text-sm mb-3">
                WeLinkYou se réserve le droit de suspendre ou de supprimer tout compte professionnel en cas de manquement aux présentes Conditions Générales, de comportement illicite ou frauduleux, ou d'atteinte au bon fonctionnement ou à la réputation de la plateforme.
              </p>
              <p className="text-sm">
                Le Professionnel peut demander la suppression de son compte à tout moment, sous réserve des obligations légales de conservation applicables.
              </p>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Portée internationale – Maroc / International</h2>
              <p className="text-sm mb-3">
                La plateforme WeLinkYou est accessible depuis plusieurs pays et peut référencer des professionnels établis hors de France, notamment au Maroc.
              </p>
              <p className="text-sm">
                Le Professionnel reconnaît que l'utilisation de la plateforme peut impliquer des mises en relation à caractère transfrontalier et s'engage, dans ce cadre, à respecter les lois et réglementations applicables dans son pays d'établissement ainsi que celles applicables aux prestations qu'il propose ou réalise.
              </p>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Droit applicable et juridiction compétente</h2>
              <p className="text-sm mb-3">
                Les présentes Conditions Générales sont régies par le droit français.
              </p>
              <p className="text-sm">
                Tout litige relatif à leur interprétation ou à leur exécution relèvera, à défaut de résolution amiable, de la compétence des tribunaux français.
              </p>
            </section>

            {/* Article 11 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Contact</h2>
              <p className="text-sm mb-3">
                Pour toute question relative aux présentes CG, le Professionnel peut contacter WeLinkYou à l'adresse suivante :{" "}
                <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline font-medium">
                  contact@welinkyou.co
                </a>
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Formulaire de contact :</strong>{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    Cliquez ici
                  </Link>
                </p>
              </div>
            </section>

            {/* Date */}
            <section className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Version : Avril 2026
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
