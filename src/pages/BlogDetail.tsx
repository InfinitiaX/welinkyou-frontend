import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { marked } from "marked";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { getArticleBySlug, getRelatedArticles } from "@/data/blogArticles";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  // Scroll to top when navigating to a new article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useDocumentMeta({
    title: article ? article.metaTitle : "Article non trouvé",
    description: article 
      ? article.excerpt 
      : "L'article que vous recherchez n'existe pas ou a été déplacé.",
  });

  if (!article) {
    return <NotFound />;
  }

  // Utiliser `marked` pour convertir le contenu Markdown en HTML de manière sécurisée
  // `useMemo` évite de refaire le calcul à chaque rendu si le contenu de l'article ne change pas.
  const formattedContent = useMemo(() => {
    return marked(article.content, { breaks: true, gfm: true });
  }, [article.content]);

  const relatedArticles = getRelatedArticles(article, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-24 left-4 lg:left-8"
        >
          <Link to="/blog">
            <Button variant="secondary" size="sm" className="gap-2 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Button>
          </Link>
        </motion.div>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
            {article.category}
          </span>
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Title and meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} de lecture</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
              </div>
            </motion.div>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed border-l-4 border-primary pl-6 italic"
            >
              {article.excerpt}
            </motion.p>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-td:text-muted-foreground  prose-td:leading-relaxed prose-td:mb-4
                prose-li:text-muted-foreground prose-li:my-1
                prose-strong:text-foreground
                prose-ul:my-4 prose-ol:my-4
              "
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl text-center"
            >
              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                Besoin d'un professionnel de confiance ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Trouvez des experts vérifiés qui comprennent vos besoins
              </p>
              <Link to="/recherche">
                <Button size="lg" className="gap-2">
                  Rechercher un professionnel
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
                Articles connexes
              </h2>
              <p className="text-muted-foreground">
                Continuez votre lecture avec ces articles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <BlogCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
