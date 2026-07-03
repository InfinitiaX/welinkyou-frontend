import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PractitionerRoute, AdminRoute } from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ProfessionalDetail from "./pages/ProfessionalDetail";
import ProfessionalSpace from "./pages/ProfessionalSpace";
import About from "./pages/About";
import WhyWeLinkYou from "./pages/WhyWeLinkYou";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ProRegistration from "./pages/ProRegistration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// Blog pages disabled - Bientôt disponible
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import { MentionsLegales } from "./pages/MentionsLegales";
import { CGU } from "./pages/CGU";
import { PolitiqueConfidentialite } from "./pages/PolitiqueConfidentialite";
import CharteWeLinkYou from "./pages/CharteWeLinkYou";
import PolitiqueCookies from "./pages/PolitiqueCookies";
import { CookieConsent } from "./components/CookieConsent";
import ChatbaseWidget from "./components/ChatbaseWidget";
import { PractitionerLayout } from "./components/practitioner/PractitionerLayout";
import { PractitionerDashboard } from "./pages/practitioner/PractitionerDashboard";
import { PractitionerProfile } from "./pages/practitioner/PractitionerProfile";
import { PractitionerSubscription } from "./pages/practitioner/PractitionerSubscription";
import { PractitionerSettings } from "./pages/practitioner/PractitionerSettings";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPractitioners } from "./pages/admin/AdminPractitioners";
import { AdminRegistrations } from "./pages/admin/AdminRegistrations";
import { AdminDocuments } from "./pages/admin/AdminDocuments";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminContacts } from "./pages/admin/AdminContacts";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recherche" element={<SearchResults />} />
            <Route path="/professionnel/:id" element={<ProfessionalDetail />} />
            <Route path="/espace-professionnel" element={<ProfessionalSpace />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/pourquoi-welinkyou" element={<WhyWeLinkYou />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription-pro" element={<ProRegistration />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
            <Route path="/reinitialiser-mot-de-passe" element={<ResetPassword />} />
            {/* Blog routes disabled - Bientôt disponible */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/charte-welinkyou" element={<CharteWeLinkYou />} />
            <Route path="/politique-cookies" element={<PolitiqueCookies />} />

            {/* Practitioner Dashboard Routes - Protected */}
            <Route
              path="/professionnel-espace"
              element={
                <PractitionerRoute>
                  <PractitionerLayout />
                </PractitionerRoute>
              }
            >
              <Route path="dashboard" element={<PractitionerDashboard />} />
              <Route path="profil" element={<PractitionerProfile />} />
              <Route path="abonnement" element={<PractitionerSubscription />} />
              <Route path="parametres" element={<PractitionerSettings />} />
            </Route>

            {/* Super Admin Dashboard Routes - Protected */}
            <Route
              path="/dashboard/superadmin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="professionnels" element={<AdminPractitioners />} />
              <Route path="demandes" element={<AdminRegistrations />} />
              <Route path="documents" element={<AdminDocuments />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="parametres" element={<AdminSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <ChatbaseWidget />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
