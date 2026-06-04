import { useEffect } from "react";

interface DocumentMetaOptions {
  title: string;
  description?: string;
}

const DEFAULT_TITLE = "WeLinkYou - Experts de confiance pour la diaspora France-Maroc";
const DEFAULT_DESCRIPTION = "Trouvez les meilleurs professionnels vérifiés pour la diaspora franco-marocaine : avocats, médecins, experts-comptables, coachs. Mise en relation gratuite et sécurisée.";

/**
 * Hook pour gérer dynamiquement le titre et la meta description de la page
 * @param options - Options contenant le titre et la description
 */
export const useDocumentMeta = ({ title, description }: DocumentMetaOptions) => {
  useEffect(() => {
    // Mettre à jour le titre
    const fullTitle = title ? `${title} | WeLinkYou` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Mettre à jour la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    // Mettre à jour les balises Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", fullTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    // Mettre à jour les balises Twitter
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", fullTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    // Cleanup: restaurer les valeurs par défaut au démontage
    return () => {
      document.title = DEFAULT_TITLE;
      
      if (metaDescription) {
        metaDescription.setAttribute("content", DEFAULT_DESCRIPTION);
      }
      if (ogTitle) {
        ogTitle.setAttribute("content", "WeLinkYou - Experts de confiance France-Maroc");
      }
      if (ogDescription) {
        ogDescription.setAttribute("content", "La plateforme premium de mise en relation entre la diaspora France-Maroc et des professionnels vérifiés.");
      }
      if (twitterTitle) {
        twitterTitle.setAttribute("content", "WeLinkYou - Experts de confiance France-Maroc");
      }
      if (twitterDescription) {
        twitterDescription.setAttribute("content", "Trouvez les meilleurs professionnels vérifiés pour la diaspora franco-marocaine.");
      }
    };
  }, [title, description]);
};

export default useDocumentMeta;
