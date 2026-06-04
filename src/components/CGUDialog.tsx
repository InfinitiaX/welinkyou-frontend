import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CGUDialogProps {
  children: React.ReactNode;
}

export const CGUDialog = ({ children }: CGUDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">Conditions Générales Professionnels WeLinkYou</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] px-6 pb-6">
          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
            {/* Introduction */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Préambule</h2>
              <p className="text-sm">
                Les présentes Conditions Générales d'Utilisation Professionnels (ci-après « CGU Pro ») régissent l'accès et l'utilisation de la plateforme WeLinkYou par les professionnels inscrits. L'inscription en tant que professionnel implique l'acceptation pleine et entière des présentes conditions.
              </p>
            </section>

            {/* Article 1 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 1 – Définitions</h2>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li><strong>Plateforme :</strong> Le site internet et l'application WeLinkYou</li>
                <li><strong>Professionnel :</strong> Toute personne physique ou morale inscrite sur la Plateforme en qualité de prestataire de services</li>
                <li><strong>Utilisateur :</strong> Toute personne utilisant la Plateforme pour rechercher un professionnel</li>
                <li><strong>Profil :</strong> L'espace personnel du Professionnel sur la Plateforme</li>
                <li><strong>Badge Vérifié :</strong> Certification attribuée après vérification des documents fournis</li>
              </ul>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 2 – Objet de la Plateforme</h2>
              <p className="text-sm">
                WeLinkYou est une plateforme de mise en relation entre les professionnels et les particuliers de la diaspora franco-marocaine. La Plateforme permet aux Professionnels de présenter leur activité, leurs compétences et leurs coordonnées afin d'être mis en contact avec des Utilisateurs recherchant leurs services.
              </p>
              <p className="text-sm mt-2">
                WeLinkYou n'intervient pas dans la relation commerciale entre le Professionnel et l'Utilisateur et ne peut être tenu responsable des engagements pris entre ces parties.
              </p>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 3 – Inscription et Création du Profil</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground/90 mb-2">3.1 Conditions d'inscription</h3>
                  <p className="text-sm">Pour s'inscrire, le Professionnel doit :</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                    <li>Être une personne physique majeure ou une personne morale valablement constituée</li>
                    <li>Exercer légalement une activité professionnelle</li>
                    <li>Fournir des informations exactes et à jour</li>
                    <li>Accepter les présentes CGU Pro et la Charte WeLinkYou</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground/90 mb-2">3.2 Documents justificatifs</h3>
                  <p className="text-sm">Le Professionnel s'engage à fournir :</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                    <li>Une pièce d'identité en cours de validité</li>
                    <li>Un justificatif d'inscription professionnelle (ordre, registre, etc.)</li>
                    <li>Tout document complémentaire requis selon la profession exercée</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground/90 mb-2">3.3 Vérification et Badge</h3>
                  <p className="text-sm">
                    WeLinkYou procède à une vérification des documents fournis. Le Badge Vérifié est attribué après validation et peut être retiré en cas de non-conformité.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 4 – Obligations du Professionnel</h2>
              <p className="text-sm mb-2">Le Professionnel s'engage à :</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Fournir des informations véridiques et actualisées</li>
                <li>Respecter la législation applicable à son activité professionnelle</li>
                <li>Répondre aux sollicitations des Utilisateurs de manière professionnelle</li>
                <li>Ne pas utiliser la Plateforme à des fins illicites ou contraires aux bonnes mœurs</li>
                <li>Respecter la Charte WeLinkYou</li>
                <li>Maintenir ses documents à jour et informer WeLinkYou de tout changement</li>
              </ul>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 5 – Responsabilité</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground/90 mb-2">5.1 Responsabilité de WeLinkYou</h3>
                  <p className="text-sm">
                    WeLinkYou s'engage à mettre en œuvre les moyens nécessaires pour assurer le bon fonctionnement de la Plateforme. Toutefois, WeLinkYou ne peut garantir une disponibilité continue et ne saurait être tenu responsable des interruptions de service.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground/90 mb-2">5.2 Responsabilité du Professionnel</h3>
                  <p className="text-sm">
                    Le Professionnel est seul responsable des services qu'il propose et de leur conformité à la réglementation. WeLinkYou ne peut être tenu responsable des actes du Professionnel ou des litiges entre le Professionnel et les Utilisateurs.
                  </p>
                </div>
              </div>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 6 – Tarification et Abonnement</h2>
              <p className="text-sm">
                L'accès à la Plateforme est actuellement gratuit pendant la phase de lancement. WeLinkYou se réserve le droit de proposer des fonctionnalités premium ou des abonnements payants, dont les conditions seront communiquées aux Professionnels.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 7 – Propriété Intellectuelle</h2>
              <p className="text-sm">
                Le contenu publié par le Professionnel sur son Profil reste sa propriété. En publiant sur WeLinkYou, le Professionnel accorde à WeLinkYou une licence non-exclusive pour utiliser, reproduire et diffuser ce contenu dans le cadre de la Plateforme.
              </p>
              <p className="text-sm mt-2">
                Les éléments de la Plateforme (logo, design, textes) sont la propriété de WeLinkYou et ne peuvent être reproduits sans autorisation.
              </p>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 8 – Suspension et Résiliation</h2>
              <p className="text-sm">
                WeLinkYou se réserve le droit de suspendre ou résilier le compte d'un Professionnel en cas de non-respect des présentes CGU Pro, de la Charte WeLinkYou, ou en cas de comportement préjudiciable à l'image de la Plateforme ou aux Utilisateurs.
              </p>
              <p className="text-sm mt-2">
                Le Professionnel peut à tout moment demander la suppression de son compte en contactant le support WeLinkYou.
              </p>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 9 – Protection des Données Personnelles</h2>
              <p className="text-sm">
                WeLinkYou traite les données personnelles conformément à sa Politique de Protection des Données et à la réglementation applicable (RGPD). Le Professionnel dispose d'un droit d'accès, de rectification et de suppression de ses données.
              </p>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 10 – Modification des CGU Pro</h2>
              <p className="text-sm">
                WeLinkYou se réserve le droit de modifier les présentes CGU Pro. Les Professionnels seront informés des modifications par email ou notification sur la Plateforme. La poursuite de l'utilisation vaut acceptation des nouvelles conditions.
              </p>
            </section>

            {/* Article 11 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Article 11 – Droit Applicable et Juridiction</h2>
              <p className="text-sm">
                Les présentes CGU Pro sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents de Paris, sauf disposition légale contraire.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
              <p className="text-sm">
                Pour toute question concernant les présentes CGU Pro, contactez-nous à : <a href="mailto:contact@welinkyou.co" className="text-primary hover:underline">contact@welinkyou.co</a>
              </p>
            </section>

            {/* Date */}
            <section className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Dernière mise à jour : Janvier 2025
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
