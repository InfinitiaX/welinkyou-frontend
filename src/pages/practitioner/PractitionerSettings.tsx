import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  Shield,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { api, ApiError } from "@/services/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const PractitionerSettings = () => {
  useDocumentMeta({
    title: "Paramètres - Espace Professionnel",
    description: "Gérez les paramètres de votre compte professionnel WeLinkYou. Sécurité, notifications et préférences.",
  });

  // États pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // États pour la demande de suppression
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletionReason, setDeletionReason] = useState("");
  const [submittingDeletion, setSubmittingDeletion] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [pendingRequestDate, setPendingRequestDate] = useState<string | null>(null);
  const [cancellingRequest, setCancellingRequest] = useState(false);

  // Vérifier s'il y a une demande en attente au chargement
  useEffect(() => {
    const checkDeletionStatus = async () => {
      // Ne pas faire l'appel si pas de token
      if (!api.isAuthenticated()) {
        return;
      }
      
      try {
        const result = await api.getDeletionRequestStatus();
        setHasPendingRequest(result.has_pending_request);
        if (result.request) {
          setPendingRequestDate(result.request.created_at);
        }
      } catch (error) {
        // Ignorer les erreurs 401 silencieusement (utilisateur non connecté)
        if (error instanceof ApiError && error.status === 401) {
          return;
        }
        console.error("Erreur lors de la vérification du statut:", error);
      }
    };
    checkDeletionStatus();
  }, []);

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors([]);
  };

  const handleChangePassword = async () => {
    // Validation côté client
    const errors: string[] = [];
    
    if (!passwordData.current_password) {
      errors.push("Le mot de passe actuel est requis");
    }
    if (!passwordData.new_password) {
      errors.push("Le nouveau mot de passe est requis");
    }
    if (passwordData.new_password.length < 8) {
      errors.push("Le nouveau mot de passe doit contenir au moins 8 caractères");
    }
    if (passwordData.new_password !== passwordData.confirm_password) {
      errors.push("Les mots de passe ne correspondent pas");
    }
    
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    try {
      setChangingPassword(true);
      setPasswordErrors([]);

      await api.changePassword(passwordData);
      
      toast.success("Mot de passe modifié avec succès");
      
      // Réinitialiser le formulaire
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      console.error("Erreur lors du changement de mot de passe:", err);
      
      if (err instanceof ApiError && err.data) {
        // Extraire les messages d'erreur de l'API
        const apiErrors: string[] = [];
        
        // Gestion du champ 'error' (format du backend)
        if (err.data.error) {
          apiErrors.push(String(err.data.error));
        }
        if (err.data.current_password) {
          apiErrors.push(...(Array.isArray(err.data.current_password) ? err.data.current_password : [err.data.current_password]));
        }
        if (err.data.new_password) {
          apiErrors.push(...(Array.isArray(err.data.new_password) ? err.data.new_password : [err.data.new_password]));
        }
        if (err.data.confirm_password) {
          apiErrors.push(...(Array.isArray(err.data.confirm_password) ? err.data.confirm_password : [err.data.confirm_password]));
        }
        if (err.data.detail) {
          apiErrors.push(String(err.data.detail));
        }
        if (err.data.non_field_errors) {
          apiErrors.push(...(Array.isArray(err.data.non_field_errors) ? err.data.non_field_errors : [err.data.non_field_errors]));
        }
        
        if (apiErrors.length > 0) {
          setPasswordErrors(apiErrors);
        } else {
          setPasswordErrors(["Une erreur est survenue lors du changement de mot de passe"]);
        }
      } else {
        setPasswordErrors(["Une erreur de connexion est survenue. Veuillez réessayer."]);
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSubmitDeletionRequest = async () => {
    try {
      setSubmittingDeletion(true);
      await api.createDeletionRequest(deletionReason);
      setHasPendingRequest(true);
      setPendingRequestDate(new Date().toISOString());
      setShowDeleteDialog(false);
      setDeletionReason("");
      toast.success("Demande de suppression envoyée avec succès");
    } catch (err) {
      console.error("Erreur lors de la demande de suppression:", err);
      if (err instanceof ApiError && err.data?.error) {
        toast.error(String(err.data.error));
      } else {
        toast.error("Erreur lors de l'envoi de la demande");
      }
    } finally {
      setSubmittingDeletion(false);
    }
  };

  const handleCancelDeletionRequest = async () => {
    try {
      setCancellingRequest(true);
      await api.cancelDeletionRequest();
      setHasPendingRequest(false);
      setPendingRequestDate(null);
      toast.success("Demande de suppression annulée");
    } catch (err) {
      console.error("Erreur lors de l'annulation:", err);
      toast.error("Erreur lors de l'annulation de la demande");
    } finally {
      setCancellingRequest(false);
    }
  };

  // Composant pour les sections "Coming Soon"
  const ComingSoonOverlay = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="font-medium text-sm">Bientôt disponible</span>
        </div>
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos préférences et paramètres de compte
        </p>
      </motion.div>

      {/* Security - Changement de mot de passe */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Changer le mot de passe</Label>
              
              {/* Afficher les erreurs */}
              {passwordErrors.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                    {passwordErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-sm text-muted-foreground">
                    Mot de passe actuel
                  </Label>
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.current_password}
                      onChange={(e) => handlePasswordChange("current_password", e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm text-muted-foreground">
                      Nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Input 
                        id="new-password" 
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.new_password}
                        onChange={(e) => handlePasswordChange("new_password", e.target.value)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm text-muted-foreground">
                      Confirmer le nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Input 
                        id="confirm-password" 
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirm_password}
                        onChange={(e) => handlePasswordChange("confirm_password", e.target.value)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="default" 
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="gap-2 bg-primary hover:bg-primary/90 text-white"
              >
                {changingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                {changingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}
              </Button>
            </div>

            <Separator />

            {/* 2FA - Coming Soon */}
            <ComingSoonOverlay>
              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <Label className="text-base">Authentification à deux facteurs</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire
                  </p>
                </div>
                <Switch />
              </div>
            </ComingSoonOverlay>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-gold" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Nouvelles évaluations</Label>
                <p className="text-sm text-muted-foreground">
                  Soyez notifié des nouveaux avis
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Rappels d'abonnement</Label>
                <p className="text-sm text-muted-foreground">
                  Rappels avant renouvellement
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Actualités et conseils WeLinkYou
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>

      {/* Preferences - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              Préférences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select defaultValue="paris">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Europe/Paris (UTC+1)</SelectItem>
                    <SelectItem value="casablanca">Africa/Casablanca (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5 flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="text-base">Mode sombre</Label>
                  <p className="text-sm text-muted-foreground">
                    Interface en thème sombre
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>

      {/* Danger Zone - Demande de suppression - CACHÉ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="hidden"
      >
        <Card className="border-0 shadow-sm border-red-200">
          <CardHeader>
            <CardTitle className="text-lg text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Zone dangereuse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasPendingRequest ? (
              // Afficher l'état de la demande en attente
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-amber-800">Demande de suppression en attente</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Votre demande de suppression de compte a été envoyée le{" "}
                      {pendingRequestDate && new Date(pendingRequestDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}. 
                      Elle est en cours d'examen par notre équipe.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={handleCancelDeletionRequest}
                      disabled={cancellingRequest}
                    >
                      {cancellingRequest ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Annulation...
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Annuler la demande
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Bouton pour faire une nouvelle demande
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <p className="font-medium text-red-800">Demander la suppression du compte</p>
                  <p className="text-sm text-red-600">
                    Envoyez une demande pour supprimer votre compte et vos données
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Demander la suppression
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Demande de suppression de compte
            </DialogTitle>
            <DialogDescription>
              Cette action enverra une demande de suppression de votre compte à notre équipe. 
              Une fois approuvée, votre profil ne sera plus visible et vous ne pourrez plus vous connecter.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deletion-reason">
                Raison de la suppression (optionnel)
              </Label>
              <Textarea
                id="deletion-reason"
                placeholder="Dites-nous pourquoi vous souhaitez supprimer votre compte..."
                value={deletionReason}
                onChange={(e) => setDeletionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Note :</strong> Vous pourrez annuler cette demande tant qu'elle n'a pas été traitée par notre équipe.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={submittingDeletion}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmitDeletionRequest}
              disabled={submittingDeletion}
            >
              {submittingDeletion ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Confirmer la demande"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
