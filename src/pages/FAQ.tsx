import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const faqs = [
  {
    category: "La plateforme",
    questions: [
      {
        question: "À qui s'adresse WeLinkYou ?",
        answer:
          "WeLinkYou s'adresse à toute personne ou organisation souhaitant accéder, dans un cadre structuré et transparent, à des professionnels de confiance disposant d'une expertise transnationale. Les professionnels référencés peuvent être basés soit dans le pays de résidence de l'utilisateur, soit dans le pays concerné par l'expertise recherchée.\n\nWeLinkYou est fait pour vous si :\n• Vous vivez dans un pays différent de celui concerné par vos démarches\n• Vous êtes expatrié ou résident étranger\n• Vous êtes entrepreneur ou investisseur international\n• Vous êtes membre de la diaspora\n• Vous représentez une organisation avec des enjeux transnationaux",
      },
      {
        question: "Comment fonctionne WeLinkYou ?",
        answer:
          "WeLinkYou est une plateforme de mise en relation qui facilite l'accès à des professionnels de confiance tels que des avocats, notaires et autres experts, disposant de compétences spécialisées adaptées à des besoins locaux du pays concerné ou transfrontaliers. Vous pouvez consulter librement les profils, rechercher un professionnel par domaine d'expertise ou zone d'intervention, et le contacter directement, sans création de compte ni intermédiaire.",
      },
      {
        question: "Qu'a WeLinkYou de plus qu'un annuaire classique ?",
        answer:
          "WeLinkYou propose un accès structuré à des professionnels référencés selon leurs compétences déclarées, avec des filtres par expertise et localisation, et un processus de vérification documentaire (Profil vérifié). Notre approche privilégie la pertinence des mises en relation plutôt que la quantité de profils.",
      },
      {
        question: "Faut-il créer un compte pour utiliser la plateforme ?",
        answer:
          "Non. Pour la version actuelle, vous pouvez consulter les profils librement, sans créer de compte ni transmettre de données personnelles.",
      },
    ],
  },
  {
    category: "Contact & Vérification",
    questions: [
      {
        question: "Comment puis-je contacter un professionnel ?",
        answer:
          "Chaque fiche professionnelle contient les informations de contact direct (téléphone, e-mail, site web, réseaux…). Vous pouvez contacter le professionnel de votre choix librement et directement, sans intermédiaire : WeLinkYou n’intervient pas dans la prise de contact ni dans les échanges.",
      },
      {
        question: 'Que signifie le badge "Profil vérifié" ?',
        answer:
          "Le badge « Profil vérifié » indique que le professionnel a suivi un processus de vérification administrative documentaire (identité, statut d'activité, diplômes ou équivalents déclarés), reposant sur les informations transmises, et a adhéré à la charte WeLinkYou. Ce dispositif contribue à instaurer un cadre de transparence, sans constituer une garantie ni une évaluation de la qualité des prestations.",
      },
      {
        question: "Qu'est-ce que la charte WeLinkYou ?",
        answer:
          "La charte WeLinkYou définit les principes et engagements applicables aux professionnels référencés sur la plateforme. Elle encadre notamment les obligations de transparence, de communication loyale, de respect du cadre légal et réglementaire applicable, ainsi que l'utilisation responsable de la plateforme.\n\nL'adhésion à la charte est une condition du référencement sur WeLinkYou.\n\nElle ne constitue ni une certification, ni une garantie, ni une évaluation de la qualité des prestations fournies par les professionnels.",
      },
    ],
  },
  {
    category: "Fonctionnement & Tarification",
    questions: [
      {
        question: "WeLinkYou intervient-il dans la relation entre le professionnel et le client ?",
        answer:
          "Non. WeLinkYou facilite et structure la mise en relation entre utilisateurs et professionnels, en proposant un cadre clair et transparent. Les échanges, prestations et conditions sont ensuite définis directement entre le professionnel et le client, sans intervention de WeLinkYou.",
      },
      {
        question: "Est-ce que WeLinkYou prend une commission ?",
        answer:
          "WeLinkYou fonctionne sans commission sur les échanges, contacts ou prestations réalisés entre utilisateurs et professionnels. Notre modèle repose sur un abonnement professionnel transparent, qui permet aux professionnels d'intégrer le réseau WeLinkYou, d'accéder à des mises en relation ciblées et de bénéficier du processus de vérification.",
      },
    ],
  },
];

const FAQ = () => {
  useDocumentMeta({
    title: "FAQ WeLinkYou : Questions et réponses utilisateurs",
    description: "Toutes les réponses sur WeLinkYou : vérification des profils, fonctionnement, contact direct avec les professionnels et tarification.",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1920&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d18]/95 via-[#0d0d18]/90 to-[#0d0d18]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gradient-start/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gradient-end/15 via-transparent to-transparent" />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full bg-gradient-start/20 blur-xl"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-[15%] w-32 h-32 rounded-full bg-gradient-end/20 blur-xl"
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-28 pb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
              >
                {/*FAQ WelinkYou : Questions fréquentes */}
                FAQ WelinkYou : {" "}
                <span className="relative">
                  <span className="relative z-10 text-gradient-vibrant">Questions fréquentes</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 h-3 bg-gradient-start/30 -z-0"
                  />
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                Toutes les réponses sur WelinkYou : vérification des profils, fonctionnement, contact direct avec les professionnels et tarification.
              </motion.p>

              {/* Search */}
              <motion.div variants={fadeInUp} className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-white/95 backdrop-blur-sm border-0 shadow-lg"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full">
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-background"
              />
            </svg>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="mb-10"
                  >
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      {category.category}
                    </h2>
                    <div className="space-y-3">
                      {category.questions.map((item, index) => {
                        const itemId = `${category.category}-${index}`;
                        const isOpen = openItems.includes(itemId);

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="card-premium overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(itemId)}
                              className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                            >
                              <span className="font-medium text-foreground pr-4">{item.question}</span>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                                  isOpen && "rotate-180",
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-5 pb-5">
                                    <p className="text-muted-foreground leading-relaxed text-justify">{item.answer}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <p className="text-muted-foreground">Aucun résultat trouvé pour "{searchQuery}"</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section - Premium Dark with Vibrant Gradient */}
        <section className="py-24 bg-[#0d0d18] relative overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/10 via-transparent to-gradient-end/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-start/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-end/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 gradient-vibrant-horizontal text-white rounded-full font-semibold hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl shadow-gradient-start/25"
              >
                Nous contacter
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
