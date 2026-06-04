import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const logo = "/welinkyou-logo.png";

const footerLinks = {
  plateforme: [
    { label: "Comment ça marche ?", href: "/#how-it-works" },
    { label: "Nos experts", href: "/recherche" },
    { label: "Devenir partenaire", href: "/espace-professionnel" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGU", href: "/cgu" },
    { label: "Politique de confidentialité", href: "/politique-confidentialite" },
    { label: "Charte WeLinkYou", href: "/charte-welinkyou" },
    { label: "Politique de cookies", href: "/politique-cookies" },
  ],
  contact: [
    { label: "FAQ", href: "/faq" },
    { label: "Nous contacter", href: "/contact" },
    // <{ label: "BLog", href: "/blog" },>
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <img src={logo} alt="WeLinkYou" className="h-28 w-auto" />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6 -mt-4">
              La plateforme unique qui connecte des utilisateurs avec des professionnels experts d’un pays donné.
            </p>
            <div className="flex items-center gap-3">
              <img src="/terre-flag.png" alt="Monde" className="w-7 h-7 object-contain" />
              <span className="text-background/50">×</span>
              <img src="/morocco-flag.png" alt="Maroc" className="w-8 h-8 object-contain" />
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/90">Plateforme</h4>
            <ul className="space-y-3">
              {footerLinks.plateforme.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/60 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/90">
              Informations légales
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/60 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-background/90">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/60 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">© {new Date().getFullYear()} WeLinkYou. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/50 hover:text-primary-light transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/50 hover:text-primary-light transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/50 hover:text-primary-light transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
