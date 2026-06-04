import { motion } from "framer-motion";
import type { Easing, Variants } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterBlock } from "@/components/FilterBlock";
import { HowItWorks } from "@/components/HowItWorks";
import { BlogSection } from "@/components/BlogSection";
import { FeaturedPractitioners } from "@/components/FeaturedPractitioners";
import SpecialtiesMarquee from "@/components/SpecialtiesMarquee";
import { Shield, Briefcase, BadgePercent, Check } from "lucide-react";
import trustHandshake from "@/assets/trust-handshake.jpg";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

// Easing constant
const easeOut: Easing = [0.4, 0, 0.2, 1];

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: easeOut },
  }),
};

const bulletVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: 0.4 + i * 0.15,
      duration: 0.5,
      ease: easeOut,
    },
  }),
};

const checkIconVariants: Variants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.15,
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  }),
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

// Apple-style split text animation
const heroTitleLine1 = ["Vous", "cherchez", "un"];
const heroAccentWords = ["avocat,", "un", "notaire", "ou", "un", "expert"];
const heroTitleLine2 = "en lien avec le Maroc ?";

const stats = [
  { icon: Shield, value: "100%", label: "Profils vérifiés" },
  { icon: Briefcase, value: "18", label: "Spécialités couvertes" },
  { icon: BadgePercent, value: "0%", label: "Commission" },
];

const Index = () => {
  useDocumentMeta({
    title: "Vous cherchez un avocat, un notaire ou un expert en lien avec le Maroc ?",
    description: "Marocains du monde, expatriés, porteurs de projets ou investisseurs transfrontaliers : WeLinkYou vous connecte à des professionnels de confiance, basés au Maroc ou dans votre pays de résidence.",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - More Immersive */}
      <section className="relative min-h-[65vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-x-clip">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source
            src="https://videos.pexels.com/video-files/7646285/7646285-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/80" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            {/* Apple-style Split Text Animation for Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2 leading-tight">
              {/* First line: "Vous cherchez un" */}
              <span className="block overflow-hidden">
                {heroTitleLine1.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
                {/* Accent words: "avocat, un notaire ou un expert" */}
                {heroAccentWords.map((word, i) => (
                  <motion.span
                    key={`accent-${i}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.34 + i * 0.08,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block mr-3 text-gradient-vibrant"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>

              {/* Second line: "en lien avec le Maroc ?" */}
              <motion.span
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="block mt-1"
              >
                {heroTitleLine2}
              </motion.span>
            </h1>

            {/* Subtitle with delayed fade-in */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mt-6 mb-10"
            >
              Marocains du monde, expatriés, porteurs de projets ou investisseurs transfrontaliers : WeLinkYou vous
              <span className="font-bold"> connecte </span>à des professionnels de confiance, basés au Maroc ou dans votre pays de résidence.
            </motion.p>
          </div>

          {/* Floating Filter Block */}
          <FilterBlock />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-white"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Practitioners Section */}
      <FeaturedPractitioners />

      {/* Specialties Marquee */}
      <SpecialtiesMarquee />

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Trust Section */}
      <motion.section
        className="py-24 bg-background overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block"
                >
                  WeLinkYou
                </motion.span>

                {/* Split text title */}
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6">
                  {["Des", "professionnels", "soigneusement"].map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={titleWordVariants}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <br />
                  <motion.span
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={titleWordVariants}
                    className="text-gradient-vibrant inline-block"
                  >
                    sélectionnés
                  </motion.span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-muted-foreground text-lg mb-8 leading-relaxed"
                >
                  Chaque professionnel sur WeLinkYou passe par un processus de vérification sérieux afin de vous aider à
                  choisir votre professionnel en toute confiance
                </motion.p>

                {/* Bullet points with staggered animation */}
                <ul className="space-y-4">
                  {[
                    "Vérification des diplômes et certifications déclarés",
                    "Contrôle des informations d’inscription professionnelle (le cas échéant)",
                    "Confirmation d’éléments liés à l’activité professionnelle",
                    "Adhésion à la charte WeLinkYou",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={bulletVariants}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={checkIconVariants}
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Image with parallax hover effect */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={imageVariants}
                className="relative group"
              >
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative"
                  >
                    <motion.img
                      src={trustHandshake}
                      alt="Professionnels de confiance - Poignée de main"
                      className="w-full h-auto object-cover"
                      style={{ transformOrigin: "center center" }}
                    />
                    {/* Subtle overlay on hover */}
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-gradient-start/20 to-gradient-end/20 rounded-2xl -z-10"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-gradient-end/20 to-gradient-start/20 rounded-2xl -z-10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <BlogSection />

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
            <span className="text-gradient-vibrant font-semibold text-lg mb-4 block">Vous êtes un professionnel ?</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Rejoignez WeLinkYou !
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Rejoignez notre réseau d’experts et connectez-vous à une clientèle qui recherche précisément votre
              expertise !
            </p>
            <a
              href="/espace-professionnel"
              className="inline-flex items-center gap-2 px-10 py-4 gradient-vibrant-horizontal text-white rounded-full font-semibold hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl shadow-gradient-start/25"
            >
              Inscrivez-vous
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
