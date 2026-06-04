import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ArrowLeft, CheckCircle, Shield, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/services/api";
import { useAuth, getDashboardUrl } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const news = [
  {
    title: "Nouveau : Statistiques avancées",
    date: "3 Dec 2024",
    description: "Suivez en temps réel les vues et contacts de votre profil.",
  },
  {
    title: "Webinaire : Développer sa clientèle",
    date: "28 Nov 2024",
    description: "Inscrivez-vous à notre prochain webinaire gratuit.",
  },
  {
    title: "Mise à jour : Nouveau tableau de bord",
    date: "15 Nov 2024",
    description: "Une interface repensée pour gérer votre activité.",
  },
  {
    title: "Astuce : Optimisez votre profil",
    date: "10 Nov 2024",
    description: "Nos conseils pour attirer plus de clients.",
  },
];

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

const Login = () => {
  useDocumentMeta({
    title: "Connexion Espace Professionnel",
    description: "Connectez-vous à votre espace professionnel WeLinkYou. Gérez votre profil, suivez vos statistiques et développez votre clientèle auprès de la diaspora.",
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardUrl(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Auto-rotate news carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 3500); // Time between transitions
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    
    try {
      const loggedUser = await login(email, password);
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${loggedUser.first_name} !`,
      });

      // Rediriger vers le dashboard approprié selon le rôle
      navigate(getDashboardUrl(loggedUser.role), { replace: true });
    } catch (err) {
      console.error("Erreur de connexion:", err);
      
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Email ou mot de passe incorrect");
        } else if (err.data?.detail) {
          setError(String(err.data.detail));
        } else {
          setError("Une erreur est survenue. Veuillez réessayer.");
        }
      } else {
        setError("Impossible de se connecter au serveur");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left side - Promotional content */}
          <div className="hidden lg:flex flex-col justify-between px-12 xl:px-20 py-16 relative overflow-hidden">
            {/* Background gradient with secondary color */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d18] via-[#0d0d18]/95 to-gradient-start/30" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-start/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-end/30 rounded-full blur-3xl" />

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
                    className="gradient-vibrant-horizontal text-white hover:brightness-110 gap-2 rounded-full font-semibold shadow-lg"
                  >
                    Rejoindre WeLinkYou
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* News Section - Vertical Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 mt-12"
            >
              <h3 className="text-xl font-display font-semibold mb-4 text-white">Actualités WeLinkYou Pro</h3>
              <div className="relative h-[100px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNewsIndex}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute w-full"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <p className="text-xs text-gradient-end mb-1 font-medium">{news[currentNewsIndex].date}</p>
                      <h4 className="font-semibold text-white mb-1">{news[currentNewsIndex].title}</h4>
                      <p className="text-sm text-white/80">{news[currentNewsIndex].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentNewsIndex ? "bg-white w-4" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Login form */}
          <div className="flex flex-col items-center justify-center px-6 py-12 pt-24 lg:px-16 xl:px-24 bg-background">
            <div className="max-w-md w-full mx-auto lg:mx-0">
              {/* Back link */}
              <Link
                to="/espace-professionnel"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'espace professionnel
              </Link>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Identifiez-vous</h1>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6 mt-6">
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
                      className="h-14 text-base border-2 border-border focus:border-primary transition-colors rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 text-base pr-12 border-2 border-border focus:border-primary transition-colors rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full h-14 text-base font-semibold uppercase tracking-wide btn-ripple gradient-vibrant-horizontal border-0 rounded-full text-white disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      "Continuer"
                    )}
                  </Button>

                  <Link
                    to="/mot-de-passe-oublie"
                    className="block text-center text-sm text-primary hover:text-primary-dark hover:underline font-medium transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </form>

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
                    className="w-full h-14 text-base font-semibold border-2 border-gradient-start text-gradient-start hover:gradient-vibrant hover:text-white hover:border-transparent rounded-full transition-all duration-300"
                  >
                    Créer un compte professionnel
                  </Button>
                </Link>
              </motion.div>

              {/* Footer links */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">
                    Politique de protection des données
                  </Link>
                  <span className="text-border">|</span>
                  <Link to="/politique-cookies" className="hover:text-primary transition-colors">
                    Politique de cookies
                  </Link>
                  <span className="text-border">|</span>
                  <Link to="/cgu" className="hover:text-primary transition-colors">
                    CGU
                  </Link>
                  <span className="text-border">|</span>
                  <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                    Mentions légales
                  </Link>
                  <span className="text-border">|</span>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
