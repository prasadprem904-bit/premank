import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const CertificationBadges = () => {
  const certifications = [
    {
      name: "IGI Certified",
      icon: Award,
      color: "from-blue-500 to-blue-600",
      features: ["Internationally Recognized", "Detailed Grading Report", "Laser Inscription"]
    },
    {
      name: "GIA Certified",
      icon: ShieldCheck,
      color: "from-purple-500 to-purple-600",
      features: ["World's Foremost Authority", "Comprehensive Analysis", "Global Standards"]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="container mx-auto px-4 py-20"
    >
      <div className="text-center mb-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Sparkles className="w-12 h-12 text-accent" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          100% Certified Diamonds
        </h2>
        <p className="text-muted-foreground text-lg">
          Every diamond comes with international certification for your peace of mind
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-8 shadow-luxury hover:shadow-elegant hover:border-accent/40 transition-all"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${cert.color} rounded-full mb-6 shadow-glow`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-playfair font-bold text-foreground mb-6">
                {cert.name}
              </h3>
              
              <div className="space-y-3">
                {cert.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium text-foreground">Verified by Independent Gemological Labs</span>
        </div>
      </motion.div>
    </motion.section>
  );
};
