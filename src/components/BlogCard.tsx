import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogArticle } from "@/data/blogArticles";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Clock as ClockIcon } from "lucide-react";

interface BlogCardProps {
  article: BlogArticle;
  index?: number;
}

export const BlogCard = ({ article, index = 0 }: BlogCardProps) => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-primary" />
              Bientôt disponible
            </DialogTitle>
            <DialogDescription className="text-base">
              Cette fonctionnalité sera disponible très prochainement. Restez connecté !
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group h-full"
      >
        <div onClick={() => setShowComingSoon(true)} className="block h-full cursor-pointer">
        <motion.div
          className="card-premium overflow-hidden h-full flex flex-col bg-card rounded-2xl shadow-md"
          whileHover={{ 
            y: -8,
            boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.15)"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <motion.img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
            <motion.span 
              className="absolute bottom-3 left-3 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground"
              whileHover={{ scale: 1.05 }}
            >
              {article.category}
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">
              {article.excerpt}
            </p>

            {/* Read more link */}
            <motion.div 
              className="mt-4 flex items-center gap-2 text-primary font-medium text-sm"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <span>Lire l'article</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.article>
    </>
  );
};
