import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, MousePointerClick, Star, Award, TrendingUp, MessageSquare, Calendar, AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

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
import { StatCard } from "@/components/practitioner/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { api, type WeeklyTrafficResponse } from "@/services/api";
import type { CurrentPractitionerProfile } from "@/types/api";

// Mock data for sections not yet implemented
const recentReviews = [
  {
    id: 1,
    name: "Sophie M.",
    avatar: "",
    rating: 5,
    comment: "Excellent professionnel, très à l'écoute et compétent.",
    date: "Il y a 2 jours",
  },
  {
    id: 2,
    name: "Ahmed K.",
    avatar: "",
    rating: 4,
    comment: "Très satisfait de la consultation, je recommande.",
    date: "Il y a 5 jours",
  },
  {
    id: 3,
    name: "Marie L.",
    avatar: "",
    rating: 5,
    comment: "Service impeccable et conseils précieux.",
    date: "Il y a 1 semaine",
  },
];

const notifications = [
  {
    id: 1,
    type: "review",
    message: "Nouvelle évaluation reçue de Sophie M.",
    time: "Il y a 2h",
    read: false,
  },
  {
    id: 2,
    type: "view",
    message: "Votre profil a atteint 100 vues ce mois",
    time: "Il y a 5h",
    read: false,
  },
  {
    id: 3,
    type: "subscription",
    message: "Votre abonnement sera renouvelé dans 7 jours",
    time: "Hier",
    read: true,
  },
];

export const PractitionerDashboard = () => {
  useDocumentMeta({
    title: "Tableau de bord - Espace Professionnel",
    description: "Gérez votre activité sur WeLinkYou. Consultez vos statistiques, vos avis et vos notifications.",
  });

  const [profile, setProfile] = useState<CurrentPractitionerProfile | null>(null);
  const [weeklyTraffic, setWeeklyTraffic] = useState<WeeklyTrafficResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingTraffic, setLoadingTraffic] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getCurrentPractitionerProfile();
        setProfile(data);
      } catch (err) {
        console.error("Erreur lors du chargement du profil:", err);
        setError("Impossible de charger votre profil.");
      } finally {
        setLoading(false);
      }
    };
    
    const loadWeeklyTraffic = async () => {
      try {
        const data = await api.getPractitionerWeeklyTraffic();
        setWeeklyTraffic(data);
      } catch (err) {
        console.error("Erreur lors du chargement du trafic hebdomadaire:", err);
      } finally {
        setLoadingTraffic(false);
      }
    };
    
    loadProfile();
    loadWeeklyTraffic();
  }, []);

  // Helper pour obtenir l'icône et la couleur du statut
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-500",
          textColor: "text-green-600",
          iconColor: "text-green-500",
        };
      case "pending":
        return {
          icon: Clock,
          bgColor: "bg-orange-50",
          borderColor: "border-orange-500",
          textColor: "text-orange-600",
          iconColor: "text-orange-500",
        };
      case "suspended":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-500",
          textColor: "text-red-600",
          iconColor: "text-red-500",
        };
      default:
        return {
          icon: Clock,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-500",
          textColor: "text-gray-600",
          iconColor: "text-gray-500",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statusConfig = profile ? getStatusConfig(profile.status) : getStatusConfig("pending");
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-8">
      {/* Alerte de statut de validation */}
      {profile && profile.status !== "active" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert className={`${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
            <AlertTitle className={statusConfig.textColor}>
              {profile.status_info.label}
            </AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {profile.status_info.message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Bonjour, {profile?.user?.first_name || "Professionnel"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Voici un aperçu de votre activité sur WeLinkYou
          </p>
        </div>
        <div className="flex items-center gap-2">
          {profile?.certified && (
            <Badge variant="outline" className="border-gold text-gold bg-gold/5">
              <Award className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
          <Badge 
            variant="outline" 
            className={`${statusConfig.borderColor} ${statusConfig.textColor} ${statusConfig.bgColor}`}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {profile?.status_info?.label || "En attente"}
          </Badge>
        </div>
      </motion.div>

      {/* Barre de complétion du profil - Masquée temporairement
      {profile?.is_profile_complete && profile.is_profile_complete.percentage < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Complétion du profil</span>
                <span className="text-sm text-muted-foreground">
                  {profile.is_profile_complete.percentage}%
                </span>
              </div>
              <Progress value={profile.is_profile_complete.percentage} className="h-2" />
              {profile.is_profile_complete.missing_fields.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Champs manquants : {profile.is_profile_complete.missing_fields.join(", ")}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
      */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Vues du profil"
          value={profile?.profile_views?.toLocaleString() || "0"}
          icon={Eye}
          description="Ce mois"
          delay={0.1}
        />
        <StatCard
          title="Clics sur profil"
          value={profile?.profile_clicks?.toLocaleString() || "0"}
          icon={MousePointerClick}
          description="Ce mois"
          delay={0.2}
        />
        <StatCard
          title="Coût du lead"
          value="0 €"
          icon={Star}
          description="par prospect (abonnement gratuit)"
          delay={0.3}
        />
        <ComingSoonOverlay>
        <StatCard
          title="Grade plateforme"
          value="Or"
          icon={Award}
          description="Top 15% des professionnels"
          delay={0.4}
        />
        </ComingSoonOverlay>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views & Clicks Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-lg font-semibold text-primary">
                  Évolution des vues et clics
                </CardTitle>
                <div className="flex items-center gap-4">
                  {weeklyTraffic && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">
                          Vues: <span className="font-semibold text-foreground">{weeklyTraffic.total_views_week}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm text-muted-foreground">
                          Clics: <span className="font-semibold text-foreground">{weeklyTraffic.total_clicks_week}</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/5 text-primary w-fit mt-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                7 derniers jours
              </Badge>
            </CardHeader>
            <CardContent>
              {loadingTraffic ? (
                <div className="h-[280px] bg-gray-50 rounded-lg flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : weeklyTraffic && weeklyTraffic.weekly_traffic.length > 0 ? (
                <div className="h-[280px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyTraffic.weekly_traffic}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                        labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                        formatter={(value: number, name: string) => [
                          value,
                          name === 'views' ? 'Vues' : 'Clics'
                        ]}
                      />
                      <Legend 
                        formatter={(value) => value === 'views' ? 'Vues' : 'Clics'}
                      />
                      <Bar 
                        dataKey="views" 
                        fill="#0b666b" 
                        radius={[4, 4, 0, 0]}
                        name="views"
                      />
                      <Bar 
                        dataKey="clicks" 
                        fill="#f97316" 
                        radius={[4, 4, 0, 0]}
                        name="clicks"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[280px] bg-gray-50 rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                  <Eye className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm">Aucune donnée de trafic cette semaine</p>
                  <p className="text-xs mt-1">Les vues et clics apparaîtront ici</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ComingSoonOverlay>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                Notifications
                <Badge className="bg-gold text-white text-xs">3 nouvelles</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl transition-colors ${
                    notif.read ? "bg-gray-50" : "bg-gold/5 border border-gold/20"
                  }`}
                >
                  <p className="text-sm text-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          </ComingSoonOverlay>
        </motion.div>
      </div>

      {/* Recent Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold" />
                Dernières évaluations
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
                47 avis au total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {review.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-gold text-gold"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>

      {/* Platform Grade Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary to-primary/90 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Grade Or</h3>
                    <p className="text-white/70 text-sm">Prochain niveau: Platine</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Continuez à recevoir des avis positifs et à compléter votre profil pour atteindre le grade Platine.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression vers Platine</span>
                    <span className="text-gold">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/20" />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/80">Profil complet à 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/80">Plus de 40 avis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-white/80">Note moyenne &gt; 4.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-white/50">Membre depuis +1 an</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>
    </div>
  );
};
