import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";

const COOKIE_CONSENT_KEY = "welinkyou_cookie_consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  consented: boolean;
  timestamp: number;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  consented: false,
  timestamp: 0,
};

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences) as CookiePreferences;
      // Check if consent was given less than 13 months ago
      const thirteenMonthsInMs = 13 * 30 * 24 * 60 * 60 * 1000;
      if (parsed.consented && Date.now() - parsed.timestamp < thirteenMonthsInMs) {
        setPreferences(parsed);
        return;
      }
    }
    // Show consent banner after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const updatedPrefs = {
      ...prefs,
      consented: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      ...preferences,
      analytics: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      ...preferences,
      analytics: false,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="bg-foreground text-background rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Banner */}
            {!showSettings && (
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      Nous utilisons des cookies 🍪
                    </h3>
                    <p className="text-background/70 text-sm mb-4">
                      WeLinkYou utilise des cookies pour assurer le bon fonctionnement du site et, avec votre consentement, 
                      pour analyser l'utilisation du site afin d'améliorer votre expérience. 
                      Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.{" "}
                      <Link to="/politique-cookies" className="text-primary hover:underline">
                        En savoir plus
                      </Link>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={acceptAll}
                        className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:opacity-90 text-white"
                      >
                        Tout accepter
                      </Button>
                      <Button
                        onClick={rejectAll}
                        variant="outline"
                        className="border-background/30 text-background hover:bg-background/10 bg-transparent"
                      >
                        Tout refuser
                      </Button>
                      <Button
                        onClick={() => setShowSettings(true)}
                        variant="ghost"
                        className="text-background/70 hover:text-background hover:bg-background/10" 
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Personnaliser
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Panel */}
            {showSettings && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Paramètres des cookies</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-background/50 hover:text-background transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-background/10 rounded-lg">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium mb-1">Cookies strictement nécessaires</h4>
                      <p className="text-sm text-background/60">
                        Ces cookies sont indispensables au bon fonctionnement du site et ne peuvent pas être désactivés.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-not-allowed opacity-70">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-background/10 rounded-lg">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium mb-1">Cookies de mesure d'audience</h4>
                      <p className="text-sm text-background/60">
                        Ces cookies permettent d'établir des statistiques anonymes de fréquentation afin d'améliorer le site.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                        className={`w-12 h-6 rounded-full relative transition-colors ${
                          preferences.analytics ? "bg-primary" : "bg-background/30"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            preferences.analytics ? "right-1" : "left-1"
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={saveCustomPreferences}
                    className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:opacity-90 text-white"
                  >
                    Enregistrer mes préférences
                  </Button>
                  <Button
                    onClick={acceptAll}
                    variant="outline"
                    className="border-background/30  hover:bg-background/10 bg-transparent"
                  >
                    Tout accepter
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-background/5 rounded-lg border border-background/10">
                  <p className="text-xs text-background/60 mb-2">
                    <strong>Durée de conservation :</strong> Les cookies sont conservés pour une durée maximale de 13 mois, conformément à la réglementation applicable.
                  </p>
                  <p className="text-xs text-background/60">
                    <strong>Paramétrage du navigateur :</strong> Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. Toutefois, le refus de certains cookies strictement nécessaires peut entraîner une dégradation de l'accès ou du fonctionnement du site.
                  </p>
                </div>

                <p className="text-xs text-background/50 mt-4">
                  Pour plus d'informations, consultez notre{" "}
                  <Link to="/politique-cookies" className="text-primary hover:underline">
                    Politique de cookies
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook to get cookie preferences
export const useCookiePreferences = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  return preferences;
};

export default CookieConsent;
