import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import { blogArticles } from "@/data/blogArticles";

export const BlogSection = () => {
  // Show only first 3 articles on homepage
  const featuredArticles = blogArticles.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">Blog & Actualités</h2>
          <p className="text-muted-foreground text-lg">Conseils, guides et témoignages</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
