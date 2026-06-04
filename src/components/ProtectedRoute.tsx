import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Clock, XCircle, Shield, Home, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type ProfileStatus = "pending" | "active" | "suspended" | "rejected";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "super_admin" | "practitioner";
  /**
   * Si true, vérifie aussi que le profil du practitioner est validé (status: active)
   */
  requireActiveProfile?: boolean;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requireActiveProfile = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  
  const [profileStatus, setProfileStatus] = useState<ProfileStatus | null>(null);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Vérifier le statut du profil pour les praticiens
  useEffect(() => {
    const checkProfileStatus = async () => {
      if (!user || user.role !== "practitioner") return;
      
      setIsCheckingProfile(true);
      setProfileError(null);
      
      try {
        const profile = await api.getCurrentPractitionerProfile();
        setProfileStatus(profile.status as ProfileStatus);
      } catch (err) {
        console.error("Erreur lors de la vérification du profil:", err);
        // Si erreur 404, le profil a été supprimé/rejeté
        setProfileError("Profil non trouvé");
        setProfileStatus("rejected");
      } finally {
        setIsCheckingProfile(false);
      }
    };
    
    if (isAuthenticated && user?.role === "practitioner" && requireActiveProfile) {
      checkProfileStatus();
    }
  }, [isAuthenticated, user, requireActiveProfile]);

  // Afficher le loader pendant le chargement de l'auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  // Rediriger vers la connexion si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Vérifier le rôle requis
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Accès non autorisé</h1>
          <p className="text-muted-foreground mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Pour les praticiens, vérifier le statut du profil
  if (user?.role === "practitioner" && requireActiveProfile) {
    // Afficher le loader pendant la vérification du profil
    if (isCheckingProfile) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Vérification de votre profil...</p>
          </motion.div>
        </div>
      );
    }

    // Profil en attente de validation
    if (profileStatus === "pending") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Clock className="w-10 h-10 text-orange-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Compte en cours de validation
              </h1>
              
              <p className="text-muted-foreground mb-6">
                Votre profil est actuellement en cours de validation par notre équipe. 
                Ce processus prend généralement 24 à 48 heures ouvrées.
              </p>
              
              <div className="bg-muted/50 rounded-xl p-4 mb-8">
                <h3 className="font-medium text-foreground mb-2 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Que se passe-t-il ensuite ?
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">1.</span>
                    Notre équipe vérifie vos documents et informations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">2.</span>
                    Vous recevrez un email dès que votre profil sera validé
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">3.</span>
                    Votre profil sera alors visible sur la plateforme
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="default" className="w-full sm:w-auto gradient-primary border-0">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    // Profil suspendu
    if (profileStatus === "suspended") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/5 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Compte suspendu
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Votre compte a été temporairement suspendu. 
                Veuillez contacter notre équipe support pour plus d'informations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="default" className="w-full sm:w-auto">
                    Contacter le support
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    // Profil rejeté ou non trouvé
    if (profileStatus === "rejected" || profileError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/5 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Profil non disponible
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Votre demande d'inscription n'a pas pu être validée ou votre profil n'existe plus.
                Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre équipe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link to="/inscription-pro">
                  <Button variant="default" className="w-full sm:w-auto gradient-primary border-0">
                    Nouvelle inscription
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }
  }

  // Tout est OK, afficher le contenu
  return <>{children}</>;
}

/**
 * Route protégée spécifiquement pour les praticiens
 */
export function PractitionerRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="practitioner" requireActiveProfile={true}>
      {children}
    </ProtectedRoute>
  );
}

/**
 * Route protégée spécifiquement pour les super admins
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="super_admin" requireActiveProfile={false}>
      {children}
    </ProtectedRoute>
  );
}

export default ProtectedRoute;
