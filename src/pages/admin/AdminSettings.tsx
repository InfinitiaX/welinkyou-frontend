import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Shield,
  User,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api, ApiError } from "@/services/api";
import type { SuperAdmin } from "@/services/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

// Composant pour les sections "Coming Soon"
const ComingSoonOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
      <div className="bg-primary/10 text-primary px-4 py-2 rounded-full flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="font-medium text-sm">Bientôt disponible</span>
      </div>
    </div>
    <div className="opacity-50 pointer-events-none">{children}</div>
  </div>
);

export const AdminSettings = () => {
  useDocumentMeta({
    title: "Paramètres - Admin",
    description: "Configurez les paramètres de votre compte administrateur WeLinkYou.",
  });

  // États pour le profil
  const [profile, setProfile] = useState<SuperAdmin | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // États pour le changement de mot de passe
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // États pour la liste des superadmins
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);
  const [isLoadingSuperAdmins, setIsLoadingSuperAdmins] = useState(true);

  // États pour la création d'un nouveau superadmin
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [showNewAdminPassword, setShowNewAdminPassword] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  // Charger le profil et la liste des superadmins
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger le profil
        const profileData = await api.getSuperAdminProfile();
        setProfile(profileData);
        setEditedProfile({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone_number: profileData.phone_number || "",
        });
      } catch (err) {
        console.error("Erreur lors du chargement du profil:", err);
        toast.error("Erreur lors du chargement du profil");
      } finally {
        setIsLoadingProfile(false);
      }

      try {
        // Charger la liste des superadmins
        const admins = await api.getSuperAdmins();
        setSuperAdmins(admins);
      } catch (err) {
        console.error("Erreur lors du chargement des superadmins:", err);
        toast.error("Erreur lors du chargement des superadmins");
      } finally {
        setIsLoadingSuperAdmins(false);
      }
    };

    loadData();
  }, []);

  // Sauvegarder le profil
  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const updatedProfile = await api.updateSuperAdminProfile(editedProfile);
      setProfile(updatedProfile);
      setIsEditingProfile(false);
      toast.success("Profil mis à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil:", err);
      if (err instanceof ApiError) {
        toast.error(err.data?.error as string || "Erreur lors de la mise à jour");
      } else {
        toast.error("Erreur lors de la mise à jour du profil");
      }
    } finally {
      setSavingProfile(false);
    }
  };

  // Changer le mot de passe
  const handleChangePassword = async () => {
    setPasswordErrors([]);
    const errors: string[] = [];

    if (!passwordData.currentPassword) {
      errors.push("Le mot de passe actuel est requis");
    }
    if (!passwordData.newPassword) {
      errors.push("Le nouveau mot de passe est requis");
    }
    if (passwordData.newPassword.length < 8) {
      errors.push("Le nouveau mot de passe doit contenir au moins 8 caractères");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.push("Les mots de passe ne correspondent pas");
    }

    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    try {
      setChangingPassword(true);
      await api.changeSuperAdminPassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      toast.success("Mot de passe modifié avec succès");
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Erreur lors du changement de mot de passe:", err);
      if (err instanceof ApiError) {
        const apiErrors: string[] = [];
        if (err.data?.current_password) {
          apiErrors.push(
            ...(Array.isArray(err.data.current_password)
              ? err.data.current_password
              : [err.data.current_password as string])
          );
        }
        if (err.data?.new_password) {
          apiErrors.push(
            ...(Array.isArray(err.data.new_password)
              ? err.data.new_password
              : [err.data.new_password as string])
          );
        }
        if (apiErrors.length > 0) {
          setPasswordErrors(apiErrors);
        } else {
          toast.error("Erreur lors du changement de mot de passe");
        }
      } else {
        toast.error("Erreur lors du changement de mot de passe");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // Créer un nouveau superadmin
  const handleCreateAdmin = async () => {
    if (
      !newAdmin.firstName ||
      !newAdmin.lastName ||
      !newAdmin.email ||
      !newAdmin.password
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (newAdmin.password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      setCreatingAdmin(true);
      const createdAdmin = await api.createSuperAdmin({
        first_name: newAdmin.firstName,
        last_name: newAdmin.lastName,
        email: newAdmin.email,
        password: newAdmin.password,
        phone_number: newAdmin.phoneNumber || undefined,
      });

      setSuperAdmins([...superAdmins, createdAdmin]);
      setOpenCreateAdmin(false);
      setNewAdmin({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
      toast.success(
        `Super Admin ${createdAdmin.first_name} ${createdAdmin.last_name} créé avec succès`
      );
    } catch (err) {
      console.error("Erreur lors de la création du superadmin:", err);
      if (err instanceof ApiError) {
        if (err.data?.email) {
          toast.error(
            Array.isArray(err.data.email)
              ? err.data.email[0]
              : (err.data.email as string)
          );
        } else if (err.data?.password) {
          toast.error(
            Array.isArray(err.data.password)
              ? err.data.password[0]
              : (err.data.password as string)
          );
        } else {
          toast.error("Erreur lors de la création");
        }
      } else {
        toast.error("Erreur lors de la création du super admin");
      }
    } finally {
      setCreatingAdmin(false);
    }
  };

  // Supprimer un superadmin
  const handleDeleteAdmin = async (admin: SuperAdmin) => {
    try {
      await api.deleteSuperAdmin(admin.id);
      setSuperAdmins(superAdmins.filter((a) => a.id !== admin.id));
      toast.success(
        `Super Admin ${admin.first_name} ${admin.last_name} supprimé`
      );
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      if (err instanceof ApiError) {
        toast.error(err.data?.error as string || "Erreur lors de la suppression");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre profil et les super admins
        </p>
      </motion.div>

      <div className="grid gap-6">
        {/* Mon Profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-gradient-end" />
                Mon Profil
              </CardTitle>
              <CardDescription>
                Modifiez vos informations personnelles (l'email ne peut pas être
                modifié)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingProfile ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : !isEditingProfile ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Prénom</p>
                      <p className="font-semibold">{profile?.first_name}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Nom</p>
                      <p className="font-semibold">{profile?.last_name}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Email (non modifiable)
                      </p>
                      <p className="font-semibold">{profile?.email}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-semibold">
                        {profile?.phone_number || "Non renseigné"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      className="gradient-vibrant-horizontal border-0 hover:brightness-110"
                    >
                      Modifier mon profil
                    </Button>
                    <Dialog
                      open={showPasswordDialog}
                      onOpenChange={setShowPasswordDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          Changer mon mot de passe
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Changer le mot de passe</DialogTitle>
                          <DialogDescription>
                            Entrez votre mot de passe actuel et le nouveau mot
                            de passe
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {passwordErrors.length > 0 && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                              <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                                {passwordErrors.map((error, index) => (
                                  <li key={index}>{error}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label>Mot de passe actuel</Label>
                            <div className="relative">
                              <Input
                                type={showCurrentPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    currentPassword: e.target.value,
                                  })
                                }
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Nouveau mot de passe</Label>
                            <div className="relative">
                              <Input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    newPassword: e.target.value,
                                  })
                                }
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                {showNewPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Confirmer le nouveau mot de passe</Label>
                            <Input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowPasswordDialog(false)}
                          >
                            Annuler
                          </Button>
                          <Button
                            onClick={handleChangePassword}
                            disabled={changingPassword}
                            className="gradient-vibrant-horizontal border-0"
                          >
                            {changingPassword && (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            {changingPassword
                              ? "Modification..."
                              : "Modifier le mot de passe"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={editedProfile.first_name}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={editedProfile.last_name}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (non modifiable)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile?.email || ""}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={editedProfile.phone_number}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      className="gradient-vibrant-horizontal border-0 hover:brightness-110"
                    >
                      {savingProfile && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      <Save className="w-4 h-4 mr-2" />
                      {savingProfile ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingProfile(false);
                        if (profile) {
                          setEditedProfile({
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            phone_number: profile.phone_number || "",
                          });
                        }
                      }}
                      variant="outline"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Gestion des Super Admins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gradient-end" />
                  Gestion des Super Admins
                </CardTitle>
                <CardDescription>
                  Gérez les comptes super administrateur
                </CardDescription>
              </div>
              <Dialog open={openCreateAdmin} onOpenChange={setOpenCreateAdmin}>
                <DialogTrigger asChild>
                  <Button className="gradient-vibrant-horizontal border-0 hover:brightness-110">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Créer un Super Admin</DialogTitle>
                    <DialogDescription>
                      Ajoutez un nouveau super administrateur
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Prénom *</Label>
                        <Input
                          value={newAdmin.firstName}
                          onChange={(e) =>
                            setNewAdmin({
                              ...newAdmin,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Nom *</Label>
                        <Input
                          value={newAdmin.lastName}
                          onChange={(e) =>
                            setNewAdmin({
                              ...newAdmin,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input
                        value={newAdmin.phoneNumber}
                        onChange={(e) =>
                          setNewAdmin({
                            ...newAdmin,
                            phoneNumber: e.target.value,
                          })
                        }
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Mot de passe *</Label>
                      <div className="relative">
                        <Input
                          type={showNewAdminPassword ? "text" : "password"}
                          value={newAdmin.password}
                          onChange={(e) =>
                            setNewAdmin({
                              ...newAdmin,
                              password: e.target.value,
                            })
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setShowNewAdminPassword(!showNewAdminPassword)
                          }
                        >
                          {showNewAdminPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Confirmer le mot de passe *</Label>
                      <Input
                        type="password"
                        value={newAdmin.confirmPassword}
                        onChange={(e) =>
                          setNewAdmin({
                            ...newAdmin,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenCreateAdmin(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleCreateAdmin}
                      disabled={creatingAdmin}
                      className="gradient-vibrant-horizontal border-0"
                    >
                      {creatingAdmin && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {creatingAdmin ? "Création..." : "Créer"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {isLoadingSuperAdmins ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-3">
                  {superAdmins.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ce4af7]/30 to-[#ce4af7]/10 flex items-center justify-center border border-[#ce4af7]/30">
                          <span className="text-[#ce4af7] text-sm font-bold">
                            {admin.first_name.charAt(0)}
                            {admin.last_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {admin.first_name} {admin.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {admin.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={admin.is_active ? "default" : "secondary"}
                          className={
                            admin.is_active
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                        >
                          {admin.is_active ? "Actif" : "Inactif"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Créé le {formatDate(admin.date_joined)}
                        </span>
                        {admin.id !== profile?.id && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Supprimer ce Super Admin ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer{" "}
                                  <strong>
                                    {admin.first_name} {admin.last_name}
                                  </strong>
                                  ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteAdmin(admin)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications - Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ComingSoonOverlay>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gradient-end" />
                  Préférences de notifications
                </CardTitle>
                <CardDescription>
                  Gérez vos alertes et notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-32 bg-gray-100 rounded-lg"></div>
              </CardContent>
            </Card>
          </ComingSoonOverlay>
        </motion.div>
      </div>
    </div>
  );
};
