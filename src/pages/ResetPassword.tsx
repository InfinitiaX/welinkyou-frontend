import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Shield, Users, Eye, EyeOff, Loader2, AlertCircle, ArrowRight, XCircle } from "lucide-react";
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

const ResetPassword = () => {
  useDocumentMeta({
    title: "Réinitialiser le mot de passe",
    description: "Créez un nouveau mot de passe pour votre compte WeLinkYou. Sécurisez votre accès à l'espace professionnel.",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Valider le token au chargement
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setTokenError("Lien de réinitialisation invalide");
        return;
      }
      
      try {
        const result = await api.validateResetToken(token);
        if (result.valid) {
          setIsValidToken(true);
          setUserEmail(result.email || "");
        } else {
          setTokenError(result.error || "Ce lien a expiré ou est invalide");
        }
      } catch {
        setTokenError("Une erreur s'est produite lors de la validation du lien");
      } finally {
        setIsValidating(false);
      }
    };
    
    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await api.resetPassword({
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      
      setIsSuccess(true);
      toast({
        title: "Mot de passe réinitialisé",
        description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      });
      
      // Rediriger vers la connexion après 3 secondes
      setTimeout(() => {
        navigate("/connexion");
      }, 3000);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

          {/* Right side - Reset Password form */}
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
                
                {/* État: Validation en cours */}
                {isValidating && (
                  <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Vérification du lien...</p>
                  </div>
                )}

                {/* État: Token invalide ou expiré */}
                {!isValidating && !isValidToken && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-foreground mb-3">
                      Lien invalide ou expiré
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      {tokenError || "Ce lien de réinitialisation n'est plus valide."}
                    </p>
                    <Link to="/mot-de-passe-oublie">
                      <Button className="gradient-primary border-0 text-white">
                        Demander un nouveau lien
                      </Button>
                    </Link>
                  </div>
                )}

                {/* État: Succès */}
                {isSuccess && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-foreground mb-3">
                      Mot de passe réinitialisé !
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion...
                    </p>
                    <Link to="/connexion">
                      <Button className="gradient-primary border-0 text-white">
                        Se connecter maintenant
                      </Button>
                    </Link>
                  </div>
                )}

                {/* État: Formulaire de réinitialisation */}
                {!isValidating && isValidToken && !isSuccess && (
                  <>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                      Nouveau mot de passe
                    </h1>
                    <p className="text-muted-foreground mb-8">
                      Créez un nouveau mot de passe pour votre compte{" "}
                      {userEmail && <strong>{userEmail}</strong>}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-foreground font-medium">
                          Nouveau mot de passe
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimum 8 caractères"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={8}
                            className="h-14 text-base border-2 border-border focus:border-primary transition-colors rounded-xl pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                          Confirmer le mot de passe
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Retapez votre mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="h-14 text-base border-2 border-border focus:border-primary transition-colors rounded-xl pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Indicateurs de validation */}
                      <div className="space-y-2 text-sm">
                        <div className={`flex items-center gap-2 ${newPassword.length >= 8 ? "text-green-600" : "text-muted-foreground"}`}>
                          {newPassword.length >= 8 ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          <span>Au moins 8 caractères</span>
                        </div>
                        <div className={`flex items-center gap-2 ${newPassword && newPassword === confirmPassword ? "text-green-600" : "text-muted-foreground"}`}>
                          {newPassword && newPassword === confirmPassword ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          <span>Les mots de passe correspondent</span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || newPassword.length < 8 || newPassword !== confirmPassword}
                        className="w-full h-14 text-base font-semibold uppercase tracking-wide btn-ripple gradient-primary border-0 rounded-xl text-white"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Réinitialisation...
                          </>
                        ) : (
                          "Réinitialiser mon mot de passe"
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
