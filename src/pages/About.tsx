import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eye, Target, Users, ArrowRight, Sparkles, Globe, Heart, Lightbulb } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import visionImage from "@/assets/vision-collaboration.jpg";

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

const About = () => {
  useDocumentMeta({
    title: "À propos de WeLinkYou",
    description: "Découvrez WeLinkYou, la plateforme de confiance qui connecte la diaspora franco-marocaine à des professionnels vérifiés. Notre mission : faciliter vos démarches entre la France et le Maroc.",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80')`,
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

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Qui sommes-nous ?
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
              >
                Connecter les professionnels,{" "}
                <span className="relative">
                  <span className="relative z-10 text-gradient-vibrant">simplifier la confiance</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 h-3 bg-gradient-start/30 -z-0"
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-10"
              >
                WeLinkYou est la plateforme simple et intuitive qui réunit des professionnels de confiance et des
                utilisateurs en quête d'expertise transfrontalière liée au <strong className="text-white">Maroc</strong>
                .
              </motion.p>

              {/* Values badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: Globe, text: "Double expertise" },
                  { icon: Heart, text: "Confiance" },
                  { icon: Users, text: "Communauté" },
                ].map((value, index) => (
                  <motion.div
                    key={value.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  >
                    <value.icon className="w-4 h-4 text-gradient-end" />
                    <span className="text-white text-sm font-medium">{value.text}</span>
                  </motion.div>
                ))}
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

        {/* Vision Section */}
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-2 lg:order-1"
              >
                <span className="inline-block px-4 py-1.5 rounded-full gradient-vibrant-soft text-white text-sm font-medium mb-6">
                  Notre vision
                </span>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Un accès simplifié aux <span className="text-gradient-vibrant">professionnels de confiance</span>
                </h2>

                <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                  <p>
                    Chez WeLinkYou, nous croyons qu'il ne devrait jamais être difficile de trouver un professionnel de
                    confiance, qu'il s'agisse d'un avocat, notaire, expert-comptable ou tout autre professionnel de
                    confiance qui, au-delà de ses compétences métier, maîtrise également les spécificités juridiques,
                    administratives ou contextuelles liées au Maroc.
                  </p>
                  <p>
                    De nombreux professionnels, au Maroc, en France ou ailleurs, possèdent cette double compétence
                    précieuse, mais restent disséminés et peu visibles, alors même que les besoins sont nombreux et
                    croissants.
                  </p>
                  <p>
                    Nous imaginons un monde où l'accès à ces professionnels de confiance devient simple, fluide et
                    centralisé, où chacun peut trouver, en un seul endroit, des experts capables de comprendre vos
                    projets, vos besoins et vos réalités.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-emerald/5 border border-primary/10"
                >
                  <p className="text-foreground font-medium italic">
                    "Notre vision est de faire de WeLinkYou la plateforme de référence qui connecte, dans un cadre structuré et transparent, des utilisateurs à travers le monde avec de professionnels disposant d'une expertise liée à un pays donné, incluant des enjeux professionnels, culturels, sociaux."
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative"
              >
                <div className="relative">
                  <img
                    src={visionImage}
                    alt="Collaboration professionnelle"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                  />
                  <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl -z-10" />
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald/30 to-emerald/10 rounded-full -z-10" />

                  {/* Floating card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -right-6 md:right-8 bg-card p-4 rounded-2xl shadow-xl border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Monde × Maroc</p>
                        <p className="text-xs text-muted-foreground">Double expertise</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-background-soft relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-emerald-foreground text-sm font-medium mb-6 border border-emerald/20">
                  <Target className="w-4 h-4 text-emerald" />
                  <span className="text-foreground">Notre mission</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
                  Une solution digitale <span className="text-gradient-vibrant">simple et fiable</span>
                </h2>

                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Notre mission est d'offrir une solution digitale simple et fiable, qui permet à chacun de trouver
                  facilement un professionnel de confiance maîtrisant les spécificités marocaines.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Lightbulb,
                    title: "Centraliser",
                    description:
                      "Nous rassemblons et centralisons des compétences déjà nombreuses mais souvent dispersées, pour les rendre accessibles à tous.",
                    gradient: "from-gradient-start to-gradient-mid",
                  },
                  {
                    icon: Heart,
                    title: "Structurer",
                    description:
                      "Un cadre structuré, transparent et fondé sur la confiance pour faciliter les mises en relation de qualité.",
                    gradient: "from-gradient-mid to-gradient-end",
                  },
                  {
                    icon: Sparkles,
                    title: "Rayonner",
                    description:
                      "Les utilisateurs gagnent en clarté et sérénité, tandis que les professionnels renforcent leur visibilité et leur rayonnement.",
                    gradient: "from-gradient-end to-gradient-start",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="group"
                  >
                    <div className="h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-4">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-justify">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-background relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  Notre équipe
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8 leading-tight">
                  Une rencontre, <span className="text-gradient-vibrant">une vision commune</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                  <p>
                    WeLinkYou est née de la rencontre, lors d’un Executive MBA, entre Hind et Yassine, qui partagent une
                    double culture européenne et marocaine et des parcours complémentaires, l’un en droit, l’autre en
                    ingénierie.
                  </p>
                  <p className="italic text-lg">
                    « Animés par la même conviction, nous avons voulu créer un pont entre des besoins existants et
                    croissants de mise en relation avec des professionnels spécialisés et les nombreuses compétences
                    déjà présentes au Maroc, en France et ailleurs »
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-emerald/5 border border-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">Notre ambition</p>
                      <p className="text-muted-foreground text-justify">
                        Structurer et simplifier la connexion entre des besoins croissants et des compétences
                        professionnelles spécialisées.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary-foreground mb-6">
                Prêt à trouver votre professionnel de confiance ?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                Rejoignez la communauté WeLinkYou et accédez à un réseau d'experts qui comprennent vraiment vos besoins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/recherche"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Trouver un professionnel
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/espace-professionnel"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground/10 text-primary-foreground font-semibold border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300"
                >
                  Espace professionnel
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
