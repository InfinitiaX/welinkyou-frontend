import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  MousePointerClick, 
  Award, 
  Loader2,
  Clock
} from "lucide-react";
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
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type AdminStats, type WeeklyTrafficResponse } from "@/services/api";
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
    <div className="opacity-50 pointer-events-none">
      {children}
    </div>
  </div>
);

export const AdminDashboard = () => {
  useDocumentMeta({
    title: "Tableau de bord - Admin",
    description: "Tableau de bord administrateur WeLinkYou. Statistiques, aperçu des inscriptions et activité de la plateforme.",
  });

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [weeklyTraffic, setWeeklyTraffic] = useState<WeeklyTrafficResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTraffic, setIsLoadingTraffic] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await api.getAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Erreur lors du chargement des stats:", err);
        setError("Impossible de charger les statistiques");
      } finally {
        setIsLoading(false);
      }
    };
    
    const loadWeeklyTraffic = async () => {
      try {
        setIsLoadingTraffic(true);
        const data = await api.getAdminWeeklyTraffic();
        setWeeklyTraffic(data);
      } catch (err) {
        console.error("Erreur lors du chargement du trafic hebdomadaire:", err);
      } finally {
        setIsLoadingTraffic(false);
      }
    };
    
    loadStats();
    loadWeeklyTraffic();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de la plateforme WeLinkYou</p>
      </motion.div>

      {/* Stats Grid - DYNAMIQUE */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard
            title="Professionnels actifs"
            value={stats.active_practitioners}
            icon={Users}
            delay={0}
          />
          <AdminStatCard
            title="Vues totales"
            value={stats.total_views.toLocaleString()}
            icon={Eye}
            delay={0.1}
          />
          <AdminStatCard
            title="Clics totaux"
            value={stats.total_clicks.toLocaleString()}
            icon={MousePointerClick}
            delay={0.2}
          />
          <AdminStatCard
            title="Professionnels certifiés"
            value={stats.certified_practitioners}
            icon={Award}
            delay={0.3}
          />
        </div>
      ) : null}

      {/* Section grisée - Fonctionnalités à venir */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Trafic de la semaine</CardTitle>
                {weeklyTraffic && (
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">
                        Vues: <span className="font-semibold text-foreground">{weeklyTraffic.total_views_week}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-muted-foreground">
                        Clics: <span className="font-semibold text-foreground">{weeklyTraffic.total_clicks_week}</span>
                      </span>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {isLoadingTraffic ? (
                  <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : weeklyTraffic && weeklyTraffic.weekly_traffic.length > 0 ? (
                  <div className="h-[300px]">
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
                          labelFormatter={(label) => `${label}`}
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
                  <div className="h-[300px] bg-gray-50 rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                    <Eye className="w-12 h-12 mb-3 opacity-30" />
                    <p className="text-sm">Aucune donnée de trafic cette semaine</p>
                  </div>
                )}
              </CardContent>
            </Card>
        </motion.div>

        {/* Pending Requests placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ComingSoonOverlay>
            <Card className="border-0 shadow-sm h-full">
              <CardHeader>
                <CardTitle>Nouvelles demandes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                ))}
              </CardContent>
            </Card>
          </ComingSoonOverlay>
        </motion.div>
      </div>

      {/* Top Practitioners placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ComingSoonOverlay>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Top professionnels (vues)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ComingSoonOverlay>
      </motion.div>
    </div>
  );
};

