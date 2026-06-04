import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Eye, 
  MousePointerClick, 
  Calendar,
  User,
  Globe,
  Filter,
  Loader2,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, type AnalyticsEvent, type AdminAnalyticsResponse } from "@/services/api";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export const AdminAnalytics = () => {
  useDocumentMeta({
    title: "Analytiques - Admin",
    description: "Statistiques détaillées de la plateforme WeLinkYou. Vues, clics et activité des profils professionnels.",
  });

  const [analytics, setAnalytics] = useState<AdminAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtres
  const [eventType, setEventType] = useState<"all" | "views" | "clicks">("all");
  const [days, setDays] = useState(30);
  const [page, setPage] = useState(1);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getAdminAnalytics({
        type: eventType,
        days,
        page,
        page_size: 50,
      });
      setAnalytics(data);
    } catch (err) {
      console.error("Erreur lors du chargement des analytics:", err);
      setError("Impossible de charger les analytics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [eventType, days, page]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventIcon = (type: string) => {
    return type === "view" ? (
      <Eye className="w-4 h-4 text-blue-500" />
    ) : (
      <MousePointerClick className="w-4 h-4 text-green-500" />
    );
  };

  const getEventBadge = (type: string) => {
    return type === "view" ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        Vue
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Clic
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Suivi des vues et clics sur les profils
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={loadAnalytics}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtres:</span>
              </div>
              
              <Select value={eventType} onValueChange={(v) => setEventType(v as typeof eventType)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type d'événement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="views">Vues seulement</SelectItem>
                  <SelectItem value="clicks">Clics seulement</SelectItem>
                </SelectContent>
              </Select>

              <Select value={days.toString()} onValueChange={(v) => setDays(parseInt(v))}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                  <SelectItem value="90">90 derniers jours</SelectItem>
                  <SelectItem value="365">Cette année</SelectItem>
                </SelectContent>
              </Select>

              {analytics && (
                <Badge variant="secondary" className="ml-auto">
                  {analytics.total_count} événements
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table des événements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              Historique des événements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : analytics && analytics.events.length > 0 ? (
              <>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-24">Type</TableHead>
                        <TableHead>Professionnel</TableHead>
                        <TableHead>Visiteur</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analytics.events.map((event) => (
                        <TableRow key={event.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getEventIcon(event.type)}
                              {getEventBadge(event.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{event.practitioner.name}</p>
                              <p className="text-xs text-muted-foreground">{event.practitioner.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {event.visitor.user_name ? (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="font-medium text-sm">{event.visitor.user_name}</p>
                                  <p className="text-xs text-muted-foreground">{event.visitor.user_email}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Visiteur anonyme</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {event.visitor.ip_address}
                            </code>
                          </TableCell>
                          <TableCell className="text-right text-sm text-muted-foreground">
                            {formatDate(event.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {analytics.total_count > analytics.page_size && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Page {analytics.page} • {analytics.total_count} événements au total
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Précédent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => p + 1)}
                        disabled={analytics.events.length < analytics.page_size}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun événement</h3>
                <p className="text-muted-foreground">
                  Aucune vue ou clic enregistré pour cette période.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
