import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, Shield, Users, Mail, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const benefits = [
  {
    icon: Users,
    text: "Accès simplifié à une clientèle ciblée",
  },
  {
    icon: Shield,
    text: 'Badge « Profil vérifié » pour attirer et rassurer vos clients',
  },
  {
    icon: CheckCircle,
    text: "Contact direct sans intermédiaire ni commission",
  },
];

const ForgotPassword = () => {
  useDocumentMeta({
    title: "Mot de passe oublié",
    description: "Réinitialisez votre mot de passe WeLinkYou. Entrez votre adresse email pour recevoir un lien de réinitialisation.",
  });

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.requestPasswordReset(email);
      setIsSubmitted(true);
      toast({
        title: "Email envoyé",
        description: "Si cette adresse existe, vous recevrez un lien de réinitialisation.",
      });
    } catch (error) {
      // On affiche toujours un succès pour éviter l'énumération des comptes
      setIsSubmitted(true);
      toast({
        title: "Email envoyé",
        description: "Si cette adresse existe, vous recevrez un lien de réinitialisation.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left side - Promotional content */}
          <div className="hidden lg:flex flex-col justify-between px-12 xl:px-20 py-16 relative overflow-hidden">
            {/* Background gradient with secondary color */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-emerald/80" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-dark/50 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-lg">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-3xl xl:text-4xl font-display font-bold mb-6 leading-tight text-white">
                  Développez votre activité avec WeLinkYou
                </h2>
                <p className="text-lg text-white/90 mb-8 font-medium">Découvrez les avantages de notre plateforme</p>

                <ul className="space-y-5 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white/95 text-lg pt-2">{benefit.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link to="/inscription-pro">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 gap-2 rounded-xl font-semibold shadow-lg"
                  >
                    Rejoindre WeLinkYou
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right side - Forgot Password form */}
          <div className="flex flex-col justify-center px-6 py-12 pt-24 lg:px-16 xl:px-24 bg-background">
            <div className="max-w-md w-full mx-auto lg:mx-0">
              {/* Back link */}
              <Link
                to="/connexion"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la connexion
              </Link>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Mot de passe oublié ?
                </h1>
                <p className="text-muted-foreground mb-8">
                  Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Adresse e-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 text-base border-2 border-border focus:border-primary transition-colors rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="w-full h-14 text-base font-semibold uppercase tracking-wide btn-ripple gradient-primary border-0 rounded-xl text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer le lien"
                      )}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Email envoyé !</h3>
                    <p className="text-muted-foreground mb-6">
                      Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un lien de
                      réinitialisation.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="border-2 border-border hover:border-primary"
                    >
                      Essayer une autre adresse
                    </Button>
                  </motion.div>
                )}

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">ou</span>
                  </div>
                </div>

                <Link to="/inscription-pro">
                  <Button
                    variant="outline"
                    className="w-full h-14 text-base font-semibold border-2 border-emerald text-emerald hover:bg-emerald hover:text-white rounded-xl transition-all duration-300"
                  >
                    Créer un compte professionnel
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
