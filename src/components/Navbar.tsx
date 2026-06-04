import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth, getDashboardUrl } from "@/contexts/AuthContext";

const logo = "/welinkyou-logo.png";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/pourquoi-welinkyou", label: "Pourquoi WeLinkYou?" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Nous contacter" },
];

// Pages avec un fond clair (sans hero sombre) - navbar doit être sombre dès le départ
const lightBackgroundPages = [
  "/recherche",
  "/blog",
  "/professionnel",
  "/dashboard",
  "/connexion",
  "/mot-de-passe-oublie",
  "/reinitialiser-mot-de-passe",
  "/inscription-pro",
  "/professionnel-espace",
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // Détermine si la page actuelle a un fond clair
  const isLightPage = lightBackgroundPages.some((page) => location.pathname.startsWith(page));

  // Si page claire, on force le style "scrolled" même en haut
  const useDarkNavbar = isScrolled || isLightPage;

  // URL du dashboard selon le rôle
  const dashboardUrl = user ? getDashboardUrl(user.role) : "/espace-professionnel";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          useDarkNavbar ? "navbar-solid" : "navbar-transparent",
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.img src={logo} alt="WeLinkYou" whileHover={{ scale: 1.02 }} className="h-28 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200",
                    useDarkNavbar
                      ? location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                      : location.pathname === link.href
                        ? "text-white bg-emerald"
                        : "text-white hover:text-white hover:bg-white/10",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoading ? (
                <div className="w-32 h-9 bg-muted/50 rounded-lg animate-pulse" />
              ) : isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <Link to={dashboardUrl}>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "font-bold transition-all duration-300 bg-transparent border-gradient-start relative overflow-hidden group",
                        "hover:bg-gradient-start hover:text-white hover:border-gradient-start hover:scale-105 hover:shadow-[0_0_20px_hsl(280_85%_55%/0.5)]",
                        useDarkNavbar ? "text-gradient-start" : "text-white",
                      )}
                    >
                      <User className="w-4 h-4 mr-2" />
                      <span className="relative z-10">{user.first_name}</span>
                      <span className="absolute inset-0 gradient-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className={cn(
                      "font-medium transition-all duration-200",
                      useDarkNavbar ? "text-foreground/70 hover:text-foreground hover:bg-muted" : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                    title="Déconnexion"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/espace-professionnel">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "font-bold transition-all duration-300 bg-transparent border-gradient-start relative overflow-hidden group",
                      "hover:bg-gradient-start hover:text-white hover:border-gradient-start hover:scale-105 hover:shadow-[0_0_20px_hsl(280_85%_55%/0.5)]",
                      useDarkNavbar ? "text-gradient-start" : "text-white",
                    )}
                  >
                    <span className="relative z-10">Espace Professionnel</span>
                    <span className="absolute inset-0 gradient-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              )}
              <Link to="/recherche">
                <Button
                  size="sm"
                  className="font-medium gradient-vibrant-horizontal border-0 relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:brightness-110 rounded-full shadow-lg"
                >
                  <span className="relative z-10">Trouver un expert</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                useDarkNavbar ? "hover:bg-muted text-foreground" : "hover:bg-white/10 text-white",
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-40 bg-background lg:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "block px-4 py-3 text-lg font-bold rounded-lg transition-all duration-200",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  {isAuthenticated && user ? (
                    <>
                      <Link to={dashboardUrl}>
                        <Button variant="outline" className="w-full font-bold border-gradient-start text-gradient-start hover:gradient-vibrant hover:text-white hover:border-transparent">
                          <User className="w-4 h-4 mr-2" />
                          Mon espace ({user.first_name})
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full font-medium"
                        onClick={logout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <Link to="/espace-professionnel">
                      <Button
                        variant="outline"
                        className="w-full font-bold border-gradient-start text-gradient-start hover:gradient-vibrant hover:text-white hover:border-transparent"
                      >
                        Espace Professionnel
                      </Button>
                    </Link>
                  )}
                  <Link to="/recherche">
                    <Button className="w-full btn-ripple gradient-vibrant-horizontal border-0 rounded-full">
                      Trouver un expert
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
