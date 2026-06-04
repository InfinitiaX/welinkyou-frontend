import { useEffect } from 'react';

// Déclaration pour TypeScript
declare global {
  interface Window {
    embeddedChatbotConfig?: {
      chatbotId: string;
      domain: string;
    };
  }
}

const CHATBASE_BOT_ID = 'GEn5wsmn2hD3JWOOREvcf';
const CHATBASE_SCRIPT_URL = 'https://www.chatbase.co/embed.min.js';
const CHATBASE_SCRIPT_ID = 'chatbase-widget-script';

/**
 * Composant ChatbaseWidget
 * Charge dynamiquement le script Chatbase et initialise le chatbot
 * Le script n'est chargé qu'une seule fois même si le composant est remonté
 */
const ChatbaseWidget = () => {
  useEffect(() => {
    // Vérifier si le script est déjà chargé
    if (document.getElementById(CHATBASE_SCRIPT_ID)) {
      return;
    }

    // Configurer le chatbot
    window.embeddedChatbotConfig = {
      chatbotId: CHATBASE_BOT_ID,
      domain: 'www.chatbase.co',
    };

    // Créer et charger le script
    const script = document.createElement('script');
    script.id = CHATBASE_SCRIPT_ID;
    script.src = CHATBASE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.setAttribute('chatbotId', CHATBASE_BOT_ID);
    script.setAttribute('domain', 'www.chatbase.co');

    document.body.appendChild(script);

    // Cleanup optionnel (généralement on ne supprime pas le widget)
    return () => {
      // Ne pas supprimer le script pour éviter les rechargements inutiles
      // Le script reste en mémoire pour les navigations SPA
    };
  }, []);

  // Ce composant ne rend rien visuellement, le widget est injecté par le script
  return null;
};

export default ChatbaseWidget;
