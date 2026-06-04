import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  BadgeCheck,
  Zap,
  MessageCircle,
  FileCheck,
  Send,
  UserCheck,
  Megaphone,
  ClipboardList,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PricingSection } from "@/components/PricingSection";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const benefits = [
  {
    icon: Megaphone,
    title: "Accédez à une audience en recherche active de votre expertise",
    description:
      "Votre profil est présenté à une audience ciblée, engagée et en recherche active de votre type d'expertise.",
    highlight: "Résultat : plus de sollicitations pertinentes, directement liées à votre expertise.",
    gradient: "from-gradient-start to-gradient-mid",
  },
  {
    icon: BadgeCheck,
    title: 'Valorisez votre profil avec le badge "Profil vérifié"',
    description: "Un signe distinctif qui valorise votre engagement et votre professionnalisme.",
    highlight: "Il rassure immédiatement les utilisateurs et augmente votre taux de contact.",
    gradient: "from-gradient-mid to-gradient-end",
  },
  {
    icon: Users,
    title: "Intégrez un réseau de confiance",
    description: "Une communauté de professionnels engagés, reconnue pour sa transparence et son sérieux.",
    highlight: "Un environnement sécurisant qui met en valeur votre expertise et attire des clients confiants.",
    gradient: "from-gradient-end to-gradient-start",
  },
  {
    icon: MessageCircle,
    title: "Recevez des contacts directs, sans intermédiaire",
    description: "Aucune commission prélevée sur les mises en relation. Les échanges se font librement entre vous et vos clients.",
    highlight: "100% de votre activité, 100% de vos revenus.",
    gradient: "from-gradient-start to-gradient-end",
  },
];

const steps = [
  { icon: ClipboardList, text: "Vous complétez un court formulaire en ligne" },
  { icon: Send, text: "Vous envoyez vos documents" },
  { icon: FileCheck, text: "Nous vérifions" },
  { icon: UserCheck, text: "Votre profil est publié et mis en avant" },
  { icon: Star, text: "Les clients vous contactent directement" },
];

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
];

const ProfessionalSpace = () => {
  useDocumentMeta({
    title: "Espace Professionnel",
    description: "Rejoignez WeLinkYou et accédez à une clientèle ciblée de la diaspora franco-marocaine. Profil vérifié, contact direct et aucune commission.",
  });

  const [activeTab, setActiveTab] = useState<"login" | "discover">("discover");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Similar to WhyWeLinkYou */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d18]/95 via-[#0d0d18]/90 to-[#0d0d18]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gradient-start/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gradient-end/15 via-transparent to-transparent" />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full bg-gradient-start/20 blur-xl"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-[15%] w-32 h-32 rounded-full bg-gradient-end/20 blur-xl"
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Espace Professionnel
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
              >
                Vous êtes un{" "}
                <span className="relative">
                  <span className="relative z-10 text-gradient-vibrant">professionnel</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 h-3 bg-gradient-start/30 -z-0"
                  />
                </span>{" "}
                ?
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10"
              >
                Rejoignez WeLinkYou et soyez contactés directement par des clients en recherche{" "}
                <strong>active de votre expertise spécifique</strong>.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/inscription-pro">
                  <Button
                    size="lg"
                    className="gradient-vibrant-horizontal text-white gap-2 text-base px-8 shadow-lg rounded-full hover:brightness-110 hover:scale-[1.02] transition-all"
                  >
                    Rejoindre WeLinkYou
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/connexion">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2 text-base px-8"
                  >
                    Se connecter
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full">
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-background"
              />
            </svg>
          </div>
        </section>

        {/* Tab navigation */}
        <div className="bg-background border-b border-border sticky top-16 z-40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex">
              <button
                onClick={() => setActiveTab("discover")}
                className={cn(
                  "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "discover"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                Pourquoi rejoindre WeLinkYou ?
              </button>
              <Link
                to="/connexion"
                className="px-6 py-4 text-sm font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
              >
                Identification
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "discover" ? (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Benefits Section */}
              <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="max-w-6xl mx-auto"
                  >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Vos avantages
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        Pourquoi rejoindre <span className="text-gradient-vibrant">WeLinkYou</span> ?
                      </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          variants={fadeInUp}
                          whileHover={{ y: -8, transition: { duration: 0.3 } }}
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                          <div className="relative bg-card border border-border/50 rounded-3xl p-8 h-full shadow-soft hover:shadow-lg transition-all duration-500">
                            <div className="flex items-start gap-6">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                              >
                                <benefit.icon className="w-8 h-8 text-white" />
                              </motion.div>
                              <div className="flex-1">
                                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                                  {benefit.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-3">{benefit.description}</p>
                                <p className="text-sm text-primary font-medium">{benefit.highlight}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Pricing Section */}
              <PricingSection showHeader={true} className="bg-background-soft" />

              {/* How it works Section */}
              <section className="py-24 bg-background-soft">
                <div className="container mx-auto px-4 lg:px-8">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto"
                  >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                      <span className="inline-block px-4 py-1.5 rounded-full gradient-vibrant-soft text-white text-sm font-medium mb-4">
                        Simple et rapide
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                        Comment ça marche ?
                      </h2>
                    </motion.div>

                    <div className="relative">
                      {/* Connection line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end hidden md:block" />

                      <div className="space-y-8">
                        {steps.map((step, index) => (
                          <motion.div
                            key={step.text}
                            variants={fadeInUp}
                            className={`flex items-center gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                          >
                            <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                              <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-soft inline-block">
                                <p className="text-foreground font-medium">{step.text}</p>
                              </div>
                            </div>
                            <div className="relative z-10 w-14 h-14 rounded-full gradient-vibrant flex items-center justify-center shadow-lg flex-shrink-0">
                              <step.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 hidden md:block" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* CTA Section - Premium Dark with Vibrant Gradient */}
              <section className="py-24 bg-[#0d0d18] relative overflow-hidden">
                {/* Background gradient effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/10 via-transparent to-gradient-end/10" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-start/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-end/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                      Envie d'attirer plus de clients ciblés ?
                    </h2>
                    <p className="text-white/70 text-lg mb-10 leading-relaxed">
                      Rejoignez WeLinkYou dès maintenant et connectez-vous à des clients en recherche active de votre expertise.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/inscription-pro">
                        <Button
                          size="lg"
                          className="btn-ripple gradient-vibrant-horizontal border-0 gap-2 text-base px-10 py-4 rounded-full hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl shadow-gradient-start/25"
                        >
                          Créer mon profil professionnel
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                      <Link to="/connexion">
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2 text-base px-10 py-4 rounded-full transition-all"
                        >
                          Se connecter
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[70vh]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
                {/* Left side - Login form */}
                <div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-background">
                  <div className="max-w-md w-full mx-auto lg:mx-0">
                    <h2 className="text-3xl font-display font-bold text-foreground mb-2">Identifiez-vous</h2>
                    <p className="text-muted-foreground mb-8">
                      Ou{" "}
                      <Link to="/inscription-pro" className="text-primary hover:underline font-medium">
                        créez votre compte gratuitement
                      </Link>
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
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
                          className="h-14 text-base border-2 border-border focus:border-primary transition-colors"
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
                            className="h-14 text-base pr-12 border-2 border-border focus:border-primary transition-colors"
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
                        className="w-full h-14 text-base font-semibold uppercase tracking-wide btn-ripple gradient-primary border-0"
                      >
                        Continuer
                      </Button>

                      <a href="#" className="block text-center text-sm text-primary hover:underline font-medium">
                        Un problème pour vous connecter ?
                      </a>
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
                        className="w-full h-14 text-base font-semibold border-2 hover:bg-primary/5"
                      >
                        Créer un compte professionnel
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right side - Promotional content */}
                <div className="hidden lg:flex flex-col justify-center bg-primary text-white px-12 xl:px-20 py-16 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-dark/50 to-transparent" />

                  <div className="relative z-10 max-w-lg">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-3xl xl:text-4xl font-display font-bold mb-6 leading-tight">
                        Développez votre activité avec WeLinkYou
                      </h3>
                      <p className="text-lg text-white/90 mb-8 font-medium">
                        Découvrez les avantages de notre plateforme
                      </p>

                      <ul className="space-y-4 mb-10">
                        <li className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-emerald mt-0.5 flex-shrink-0" />
                          <span className="text-white/95">Visibilité auprès d'une clientèle ciblée</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-emerald mt-0.5 flex-shrink-0" />
                          <span className="text-white/95">Badge « Profil vérifié » pour attirer et rassurer vos clients</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-emerald mt-0.5 flex-shrink-0" />
                          <span className="text-white/95">Contact direct sans intermédiaire ni commission</span>
                        </li>
                      </ul>

                      <Link to="/inscription-pro">
                        <Button
                          size="lg"
                          className="bg-emerald hover:bg-emerald-light text-white font-semibold h-12 px-8"
                        >
                          Rejoindre WeLinkYou
                        </Button>
                      </Link>
                    </motion.div>

                    {/* News section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-12 pt-8 border-t border-white/20"
                    >
                      <h4 className="text-lg font-semibold mb-4">Actualités WeLinkYou Pro</h4>
                      <div className="space-y-4">
                        {news.map((item, index) => (
                          <div key={index} className="border-l-2 border-emerald pl-4">
                            <span className="text-xs text-white/60">{item.date}</span>
                            <h5 className="font-medium text-white mb-0.5">{item.title}</h5>
                            <p className="text-sm text-white/70">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Footer links */}
              <div className="bg-background-soft border-t border-border py-6">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-colors">
                      CGU Professionnels
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Charte de qualité
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Protection des données
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors">
                      Support Pro
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default ProfessionalSpace;
