import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Shield } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { SoundButton } from "./ui/SoundButton";

export const ContactSupport = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Instant Support",
      value: "+91 98765 43210",
      action: "Chat Now",
      primary: true
    },
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Direct Support",
      value: "+91 98765 43210",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email",
      subtitle: "Detailed Queries",
      value: "support@dno-collections.com",
      action: "Send Email"
    }
  ];

  const businessInfo = [
    {
      icon: MapPin,
      title: "Visit Our Showroom",
      value: "123 Diamond District, Mumbai, Maharashtra 400001"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 6:00 PM"
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      value: "SSL Encrypted | PCI DSS Compliant | Trusted by 10,000+ Customers"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
          Premium Customer Support
        </h2>
        <p className="text-muted-foreground text-lg">
          Our diamond experts are here to assist you 24/7
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Methods */}
        <div className="space-y-6">
          <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
            Get In Touch
          </h3>
          
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <SoundButton
                className="w-full bg-transparent border-none p-0"
                soundType="icon"
              >
                <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  method.primary 
                    ? 'bg-gradient-gold border-accent shadow-gold' 
                    : 'bg-card border-border hover:border-accent/50'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      method.primary 
                        ? 'bg-accent-foreground text-accent' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        method.primary ? 'text-accent-foreground' : 'text-foreground'
                      }`}>
                        {method.title}
                      </h4>
                      <p className={`text-sm ${
                        method.primary ? 'text-accent-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {method.subtitle}
                      </p>
                      <p className={`text-sm font-medium ${
                        method.primary ? 'text-accent-foreground' : 'text-foreground'
                      }`}>
                        {method.value}
                      </p>
                    </div>
                    <LuxuryButton 
                      variant={method.primary ? "secondary" : "luxury-outline"}
                      size="sm"
                    >
                      {method.action}
                    </LuxuryButton>
                  </div>
                </div>
              </SoundButton>
            </motion.div>
          ))}
        </div>

        {/* Business Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
            Visit Us
          </h3>
          
          {businessInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="p-6 bg-card border border-border rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {info.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {info.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 p-8 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl text-center"
      >
        <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
          Secure Payment Options
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">💳</span>
            <span>Credit/Debit Cards</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">📱</span>
            <span>UPI Payments</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">🏦</span>
            <span>Net Banking</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">💰</span>
            <span>Digital Wallets</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl">🚚</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};