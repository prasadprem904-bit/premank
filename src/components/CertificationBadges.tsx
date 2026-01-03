import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/ScrollReveal";

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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <ScrollReveal direction="up" className="text-center mb-10 sm:mb-12 lg:mb-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4 sm:mb-6"
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-accent" />
        </motion.div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-3 sm:mb-4" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          100% Certified Diamonds
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
          Every diamond comes with international certification for your peace of mind
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <StaggerItem key={cert.name} direction={index === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-luxury hover:shadow-elegant hover:border-accent/40 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${cert.color} rounded-full mb-4 sm:mb-6 shadow-glow`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-foreground mb-4 sm:mb-6">
                  {cert.name}
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  {cert.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm sm:text-base text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Trust Indicators */}
      <ScrollReveal direction="fade" delay={0.4} className="mt-8 sm:mt-10 lg:mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 rounded-full border border-accent/20">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          <span className="text-xs sm:text-sm font-medium text-foreground">Verified by Independent Gemological Labs</span>
        </div>
      </ScrollReveal>
    </section>
  );
};
