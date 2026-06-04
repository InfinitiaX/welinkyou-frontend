import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Target, Scale, MessageCircle, Lock, Eye, UserCheck, Award } from "lucide-react";

interface CharterProDialogProps {
  children: React.ReactNode;
}

export const CharterProDialog = ({ children }: CharterProDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Charte WeLinkYou – Engagement des professionnels
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Version : Janvier 2026</p>
        </DialogHeader>
        <ScrollArea className="h-[70vh] px-6 pb-6">
          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
            {/* Introduction */}
            <section className="bg-primary/5 rounded-xl p-5 border border-primary/20">
              <h2 className="text-lg font-semibold text-foreground mb-3">Pourquoi cette Charte est importante pour vous ?</h2>
              <p className="text-sm">
                La Charte WeLinkYou est un marqueur de confiance bénéfique à l'ensemble de la communauté. En vous engageant à la respecter, vous affirmez votre expertise et clarifiez votre positionnement professionnel. Vous facilitez ainsi des mises en relation pertinentes avec des personnes ou organisations confrontées à des besoins professionnels liés à un pays donné.
              </p>
              <p className="text-sm mt-3 font-medium text-primary">
                Cet engagement constitue l'un des piliers de la qualité du réseau WeLinkYou et contribue à sa différenciation.
              </p>
            </section>

            {/* Engagement 1 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">1. Des informations claires pour valoriser votre profil</h2>
                  <p className="text-sm mb-2">
                    La qualité et l'exactitude des informations communiquées sont essentielles.
                  </p>
                  <p className="text-sm mb-2">
                    Les professionnels s'engagent à fournir des informations sincères, exactes et régulièrement mises à jour concernant leur activité.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Un profil fiable et bien renseigné favorise la confiance des utilisateurs et des mises en relation pertinentes.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 2 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">2. Un cadre professionnel sécurisé</h2>
                  <p className="text-sm mb-2">
                    L'exercice de l'activité s'inscrit dans le respect des règles applicables à la profession et au pays d'exercice concerné.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Ce cadre contribue à protéger la pratique professionnelle et le positionnement du professionnel au sein du réseau.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 3 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">3. Des échanges de qualité</h2>
                  <p className="text-sm mb-2">
                    Les échanges avec les utilisateurs reposent sur une communication professionnelle, respectueuse et loyale.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Des échanges clairs et appropriés contribuent à une expérience de qualité pour l'ensemble des parties.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 4 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">4. Une utilisation responsable de WeLinkYou</h2>
                  <p className="text-sm">
                    La plateforme est destinée exclusivement à des mises en relation professionnelles légitimes, dans le respect de son objet et de ses valeurs.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 5 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">5. Données personnelles et confidentialité</h2>
                  <p className="text-sm">
                    Les données personnelles transmises via WeLinkYou sont traitées uniquement dans le cadre de la relation professionnelle concernée et conformément aux réglementations applicables en matière de protection des données.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 6 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">6. Transparence du réseau</h2>
                  <p className="text-sm mb-2">
                    Un processus peut être mis en œuvre afin de renforcer la transparence et la confiance au sein du réseau.
                  </p>
                  <p className="text-sm">
                    Ce processus vise à assurer la cohérence des informations professionnelles communiquées et à établir un cadre de mise en relation structuré, distinguant ainsi les professionnels référencés sur WeLinkYou de ceux exerçant en dehors de la plateforme.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 7 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">7. Responsabilité et indépendance</h2>
                  <p className="text-sm mb-2">
                    Chaque professionnel exerce son activité en toute indépendance et reste seul responsable des prestations proposées et réalisées.
                  </p>
                  <p className="text-sm">
                    WeLinkYou intervient exclusivement en qualité d'intermédiaire de mise en relation et n'intervient pas dans la relation contractuelle.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement 8 */}
            <section className="bg-muted/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">8. Qualité du réseau</h2>
                  <p className="text-sm">
                    Le respect de la présente Charte participe au maintien d'un environnement de confiance et à la qualité du réseau WeLinkYou et ce au bénéfice de l'ensemble des professionnels référencés.
                  </p>
                </div>
              </div>
            </section>

            {/* Engagement */}
            <section className="bg-primary/10 rounded-xl p-5 border border-primary/30">
              <h2 className="text-lg font-semibold text-foreground mb-3">Engagement</h2>
              <p className="text-sm font-medium">
                L'adhésion à la Charte WeLinkYou est requise pour finaliser l'inscription et rejoindre le réseau.
              </p>
            </section>

            {/* Date */}
            <section className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Version : Janvier 2026
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
