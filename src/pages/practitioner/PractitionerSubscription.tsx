import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Crown,
  Zap,
  Calendar,
  Receipt,
  Download,
  ArrowRight,
  Clock,
  Gift,
  XCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
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

const features = [
  { name: "Profil professionnel complet", available: true },
  { name: "Badge vérifié après validation", available: true },
  { name: "Visibilité dans les résultats de recherche", available: true },
  { name: "Statistiques de votre profil", available: true },
  { name: "Support dédié", available: true },
  { name: "Paiement sur la plateforme", available: false, comingSoon: true },
  { name: "Consultation sur la plateforme en visio", available: false, comingSoon: true },
  { name: "Agenda de rendez-vous", available: false, comingSoon: true },
];

const invoices = [
  { id: "INV-001", date: "01/12/2024", amount: "450 DH", status: "Payée" },
  { id: "INV-002", date: "01/11/2024", amount: "450 DH", status: "Payée" },
  { id: "INV-003", date: "01/10/2024", amount: "450 DH", status: "Payée" },
  { id: "INV-004", date: "01/09/2024", amount: "450 DH", status: "Payée" },
];

export const PractitionerSubscription = () => {
  useDocumentMeta({
    title: "Mon Abonnement - Espace Professionnel",
    description: "Gérez votre abonnement WeLinkYou. Découvrez les formules disponibles et l'historique de vos paiements.",
  });

  const [billingPeriod, setBillingPeriod] = useState<"freemium" | "monthly" | "annual">("monthly");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon Abonnement</h1>
        <p className="text-muted-foreground mt-1">
          Choisissez la formule qui vous convient.
        </p>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {/* Freemium - Visible */}
        <Card
          className="cursor-default transition-all border-2 p-6 relative border-primary shadow-lg"
        >
          <Badge className="absolute -top-3 right-4 bg-green-100 text-green-700 border border-green-200">
            <Check className="w-3 h-3 mr-1" />
            Actif
          </Badge>
          <p className="text-muted-foreground text-sm mb-2">Abonnement gratuit</p>
          <p className="text-3xl font-bold text-primary">
            0 <span className="text-lg font-normal text-muted-foreground">DH</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">Accès de base à la plateforme</p>
        </Card>

        {/* Monthly - Coming Soon */}
          <Card className="cursor-pointer transition-all border-2 p-6 border-border">
            <p className="text-muted-foreground text-sm mb-2">Mensuel</p>
            <p className="text-3xl font-bold text-primary">
              450 <span className="text-lg font-normal text-muted-foreground">DH</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">par mois, sans engagement</p>
          </Card>

        {/* Annual - Coming Soon */}
          <Card className="cursor-pointer transition-all border-2 p-6 relative border-border">
            <Badge className="absolute -top-3 right-4 gradient-vibrant text-white">
              -63%
            </Badge>
            <p className="text-muted-foreground text-sm mb-2">Annuel</p>
            <p className="text-3xl font-bold text-primary">
              2000 <span className="text-lg font-normal text-muted-foreground">DH</span>
            </p>
            <p className="text-sm text-green-600 font-medium mt-1">Économisez 3400 DH</p>
          </Card>
      </motion.div>

      {/* Features - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Ce qui est inclus :</h3>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    feature.comingSoon ? "bg-amber-100" : "bg-primary/10"
                  )}>
                    {feature.comingSoon ? (
                      <Clock className="w-3 h-3 text-amber-600" />
                    ) : (
                      <Check className="w-3 h-3 text-primary" />
                    )}
                  </div>
                  <span className={cn(
                    feature.comingSoon ? "text-muted-foreground" : "text-muted-foreground"
                  )}>
                    {feature.name}
                    {feature.comingSoon && (
                      <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
                        Bientôt disponible
                      </Badge>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoices - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="w-5 h-5 text-gradient-end" />
                Historique des factures
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Tout télécharger
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Facture</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>

      {/* Payment Method - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gradient-end" />
              Moyen de paiement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expire le 12/26</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>

      {/* Cancellation Section - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ComingSoonOverlay>
        <Card className="border-0 shadow-sm border-destructive/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  Résiliation de l'abonnement
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Vous pouvez demander la résiliation de votre abonnement à tout moment.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => {
                  toast({
                    title: "Demande de résiliation envoyée",
                    description: "Notre équipe vous contactera sous 48h pour finaliser votre demande.",
                  });
                }}
              >
                Demander la résiliation
              </Button>
            </div>
          </CardContent>
        </Card>
        </ComingSoonOverlay>
      </motion.div>
    </div>
  );
};
