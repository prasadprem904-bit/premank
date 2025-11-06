import { motion } from "framer-motion";
import { Ruler } from "lucide-react";

export const DiamondSizeComparison = () => {
  const sizes = [
    { carat: 0.5, size: 60, price: "₹50,000 - ₹1,00,000", diameter: "5.2mm" },
    { carat: 1.0, size: 85, price: "₹2,00,000 - ₹4,00,000", diameter: "6.5mm" },
    { carat: 1.5, size: 100, price: "₹4,00,000 - ₹8,00,000", diameter: "7.4mm" },
    { carat: 2.0, size: 120, price: "₹8,00,000 - ₹15,00,000", diameter: "8.2mm" },
    { carat: 3.0, size: 145, price: "₹15,00,000 - ₹30,00,000", diameter: "9.3mm" },
    { carat: 5.0, size: 180, price: "₹30,00,000+", diameter: "11.0mm" }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="container mx-auto px-4 py-20 bg-card/30 rounded-3xl"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-6">
          <Ruler className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Diamond Size Comparison
        </h2>
        <p className="text-muted-foreground text-lg">
          Visual guide to help you choose the perfect carat size
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
        {sizes.map((item, index) => (
          <motion.div
            key={item.carat}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ scale: 1.1, y: -10 }}
            className="flex flex-col items-center"
          >
            {/* Diamond Visual */}
            <div className="relative mb-4 flex items-center justify-center h-48">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                }}
                className="rounded-full diamond-shine shadow-glow"
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.5))',
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5)'
                  }}
                />
              </motion.div>
            </div>

            {/* Size Info */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-playfair font-bold text-foreground">
                {item.carat} ct
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {item.diameter}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reference Guide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
          <Ruler className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium text-foreground">All measurements shown at actual size on standard displays</span>
        </div>
      </motion.div>
    </motion.section>
  );
};
