import { motion } from "framer-motion";
import { Search, Phone, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Trouver un professionnel",
    description: "En utilisant nos filtres simples et intuitifs ",
    gradient: "from-gradient-start to-gradient-mid",
  },
  {
    icon: Phone,
    title: "Contacter votre professionnel",
    description: "Par téléphone, WhatsApp ou email. Sans intermédiaire et sans frais",
    gradient: "from-gradient-mid to-gradient-end",
  },
  {
    icon: Star,
    title: "Évaluer et partager votre expérience",
    description: "Faites bénéficier la communauté de votre expérience et recommandations",
    gradient: "from-gradient-end to-gradient-start",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trois étapes simples pour trouver votre expert de confiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gradient-start/30 via-gradient-mid/30 to-transparent" />
              )}

              <div className="card-premium p-8 text-center h-full">
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                  className="w-8 h-8 rounded-full gradient-vibrant text-white text-sm font-bold flex items-center justify-center mx-auto mb-6"
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
