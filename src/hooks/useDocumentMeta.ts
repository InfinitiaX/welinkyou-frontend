import { useEffect } from "react";

interface DocumentMetaOptions {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
}

const DEFAULT_TITLE = "Trouvez votre Avocat, Notaire ou Expert lié au Maroc | WeLinkYou";
const DEFAULT_DESCRIPTION = "WeLinkYou connecte MRE, investisseurs, expatriés à des professionnels vérifiés au Maroc ou dans leur pays de résidence.";

/**
 * Hook pour gérer dynamiquement le titre et la meta description de la page
 * @param options - Options contenant le titre et la description
 */
export const useDocumentMeta = ({ title, description }: DocumentMetaOptions) => {
  useEffect(() => {
    const defaultTitle = document.querySelector('title')?.innerText || DEFAULT_TITLE;
    const defaultDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || DEFAULT_DESCRIPTION;

    // Mettre à jour le titre
    document.title = title || defaultTitle;

    // Mettre à jour la meta description
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute("content", description || defaultDescription);
    }

    // Mettre à jour les balises Open Graph
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute("content", title || defaultTitle);
    }

    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute("content", description || defaultDescription);
    }

    // Mettre à jour les balises Twitter
    const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute("content", title || defaultTitle);
    }

    const twitterDescriptionTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionTag) {
      twitterDescriptionTag.setAttribute("content", description || defaultDescription);
    }

    // Mettre à jour la balise Canonical
    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', window.location.href);

    // Mettre à jour la balise Robots
    let robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', 'index, follow');

    // Mettre à jour l'URL Open Graph
    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) {
      ogUrlTag.setAttribute('content', window.location.href);
    }

    // Cleanup: restaurer les valeurs par défaut au démontage
    return () => {
      document.title = defaultTitle;
      
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute("content", defaultDescription);
      }
      if (ogTitleTag) {
        ogTitleTag.setAttribute("content", defaultTitle);
      }
      if (ogDescriptionTag) {
        ogDescriptionTag.setAttribute("content", defaultDescription);
      }
    };
  }, [title, description]);
};

export default useDocumentMeta;
