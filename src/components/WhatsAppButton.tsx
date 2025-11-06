import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "+919876543210"; // Premank jewellery contact number
  const message = "Hi, I'm interested in your diamond collection";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full shadow-elegant flex items-center justify-center group hover:shadow-glow transition-all"
      style={{
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
      }}
    >
      <MessageCircle className="w-8 h-8 text-white" />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-4 py-2 bg-card rounded-lg shadow-luxury opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        <p className="text-sm font-medium text-foreground">Chat with us on WhatsApp</p>
      </div>
    </motion.button>
  );
};
