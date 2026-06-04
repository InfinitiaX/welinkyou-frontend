import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Composant qui scroll automatiquement en haut de la page lors d'un changement de route
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
