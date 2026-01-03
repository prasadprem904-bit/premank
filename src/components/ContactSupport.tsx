import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock, Shield } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/ScrollReveal";

export const ContactSupport = () => {
  const contactMethods = [{
    icon: Mail,
    title: "Email Contact",
    subtitle: "Get in Touch",
    value: "dnocollections@gmail.com",
    action: "Send Email",
    link: "mailto:dnocollections@gmail.com",
    primary: true
  }, {
    icon: MessageCircle,
    title: "WhatsApp Channel",
    subtitle: "Instant Reply",
    value: "Premank Updates",
    action: "Join Channel",
    link: "https://whatsapp.com/channel/0029VaoLotu42DchJMXK3i1L",
    primary: false
  }];

  const businessInfo = [{
    icon: MapPin,
    title: "Visit Our Showroom",
    value: "123 Diamond District, Mumbai, Maharashtra 400001"
  }, {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 6:00 PM"
  }, {
    icon: Shield,
    title: "Secure Shopping",
    value: "SSL Encrypted | PCI DSS Compliant | Trusted by 10,000+ Customers"
  }];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
      <ScrollReveal direction="up" className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-2 sm:mb-4">
          Premium Customer Support
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
          Our diamond experts are here to assist you 24/7
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
        {/* Contact Methods */}
        <div className="space-y-4 sm:space-y-6">
          <ScrollReveal direction="left">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-foreground mb-4 sm:mb-6">
              Get In Touch
            </h3>
          </ScrollReveal>
          
          <StaggerContainer className="space-y-4 sm:space-y-6" staggerDelay={0.15}>
            {contactMethods.map((method, index) => (
              <StaggerItem key={method.title} direction="left">
                <a href={method.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className={`p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-[1.02] ${method.primary ? 'bg-gradient-gold border-accent shadow-gold' : 'bg-card border-border hover:border-accent/50'}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${method.primary ? 'bg-accent-foreground text-accent' : 'bg-accent text-accent-foreground'}`}>
                        <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm sm:text-base ${method.primary ? 'text-accent-foreground' : 'text-foreground'}`}>
                          {method.title}
                        </h4>
                        <p className={`text-xs sm:text-sm ${method.primary ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
                          {method.subtitle}
                        </p>
                        <p className={`text-xs sm:text-sm font-medium truncate ${method.primary ? 'text-accent-foreground' : 'text-foreground'}`}>
                          {method.value}
                        </p>
                      </div>
                      <LuxuryButton variant={method.primary ? "secondary" : "luxury-outline"} size="sm" className="w-full sm:w-auto mt-2 sm:mt-0 min-h-[44px]">
                        {method.action}
                      </LuxuryButton>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Business Information */}
        <div className="space-y-4 sm:space-y-6">
          <ScrollReveal direction="right">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-foreground mb-4 sm:mb-6">
              Visit Us
            </h3>
          </ScrollReveal>
          
          <StaggerContainer className="space-y-4 sm:space-y-6" staggerDelay={0.15}>
            {businessInfo.map((info, index) => (
              <StaggerItem key={info.title} direction="right">
                <div className="p-4 sm:p-5 lg:p-6 bg-card border border-border rounded-lg sm:rounded-xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">
                        {info.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Payment Methods */}
    </section>
  );
};