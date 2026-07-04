import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Star, Heart, Users, CheckCircle } from "lucide-react";

interface CharterDialogProps {
  children: React.ReactNode;
}

export const CharterDialog = ({ children }: CharterDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Charte d'Engagement WeLinkYou
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] px-6 pb-6">
          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
            {/* Introduction */}
            <section>
              <p className="text-sm">
                En tant que professionnel inscrit sur la plateforme WeLinkYou, je m'engage à respecter les valeurs et les principes suivants, qui constituent le fondement de notre communauté de confiance.
              </p>
            </section>

            {/* Engagement 1 */}
            <section className="bg-primary/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">1. Excellence Professionnelle</h2>
                  <p className="text-sm">
                    Je m'engage à fournir des services de qualité, conformes aux standards de ma profession et aux attentes légitimes des utilisateurs. Je maintiens mes compétences à jour et m'efforce d'améliorer continuellement ma pratique.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 2 */}
            <section className="bg-primary/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">2. Transparence et Honnêteté</h2>
                  <p className="text-sm">
                    Je m'engage à communiquer de manière claire et transparente sur mes qualifications, mes tarifs et mes conditions d'intervention. Je ne fais aucune promesse que je ne pourrais pas tenir et je présente fidèlement mes compétences.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 3 */}
            <section className="bg-primary/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">3. Respect et Professionnalisme</h2>
                  <p className="text-sm">
                    Je traite chaque utilisateur avec respect, courtoisie et professionnalisme, sans discrimination. Je réponds aux sollicitations dans des délais raisonnables et je communique de manière constructive, même en cas de désaccord.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 4 */}
            <section className="bg-primary/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">4. Confidentialité</h2>
                  <p className="text-sm">
                    Je m'engage à respecter la confidentialité des informations qui me sont confiées par les utilisateurs. Je traite leurs données personnelles conformément à la réglementation en vigueur et ne les utilise que dans le cadre de mes prestations.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 5 */}
            <section className="bg-primary/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">5. Contribution à la Communauté</h2>
                  <p className="text-sm">
                    Je contribue positivement à la communauté WeLinkYou en maintenant mon profil à jour, en répondant aux avis de manière constructive et en signalant tout comportement inapproprié sur la plateforme.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 6 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Conformité Réglementaire</h2>
              <p className="text-sm">
                Je m'engage à exercer mon activité en conformité avec la législation applicable, notamment en ce qui concerne :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm mt-2">
                <li>Les autorisations et inscriptions professionnelles requises</li>
                <li>Les obligations fiscales et sociales</li>
                <li>Les règles déontologiques de ma profession</li>
                <li>La protection des consommateurs</li>
              </ul>
            </section>

            {/* Engagement 7 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Réactivité</h2>
              <p className="text-sm">
                Je m'engage à répondre aux demandes de contact dans un délai raisonnable (48h ouvrées maximum) et à informer les utilisateurs si je ne suis pas en mesure de répondre à leur besoin.
              </p>
            </section>

            {/* Engagement 8 */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Gestion des Litiges</h2>
              <p className="text-sm">
                En cas de différend avec un utilisateur, je m'engage à rechercher une solution amiable et à coopérer de bonne foi avec les équipes WeLinkYou pour résoudre le litige. Je prends en compte les retours des utilisateurs pour améliorer mes services.
              </p>
            </section>

            {/* Conclusion */}
            <section className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm font-medium text-foreground">
                En adhérant à cette charte, je contribue à faire de WeLinkYou une plateforme de confiance où les utilisateurs peuvent trouver des professionnels fiables et compétents pour les accompagner dans leurs projets.
              </p>
            </section>

            {/* Sanctions */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Non-respect de la Charte</h2>
              <p className="text-sm">
                Le non-respect de cette charte peut entraîner des mesures allant de l'avertissement à la suspension ou la résiliation du compte professionnel, selon la gravité et la récurrence des manquements constatés.
              </p>
            </section>

            {/* Date */}
            <section className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Dernière mise à jour : Avril 2026
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
