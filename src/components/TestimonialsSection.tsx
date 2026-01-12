import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { LuxuryBadge } from "./ui/LuxuryBadge";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  purchase: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The 2-carat diamond ring I purchased exceeded all expectations. The brilliance and fire are absolutely mesmerizing. Premank's service was impeccable from selection to delivery.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    purchase: "2 Carat Solitaire Ring"
  },
  {
    id: 2,
    name: "Rajesh Patel",
    location: "Delhi",
    rating: 5,
    text: "I was amazed by the virtual try-on feature. It helped me choose the perfect engagement ring for my fiancée. The GIA certification gave me complete confidence in my purchase.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    purchase: "1.5 Carat Engagement Ring"
  },
  {
    id: 3,
    name: "Ananya Gupta",
    location: "Bangalore",
    rating: 5,
    text: "From the 3D viewer to the expert consultation, every step was luxurious. The diamond arrived in beautiful packaging, and the quality is simply unmatched in India.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    purchase: "3 Carat Natural Diamond"
  },
  {
    id: 4,
    name: "Vikram Mehta",
    location: "Hyderabad",
    rating: 5,
    text: "As a first-time buyer, I was nervous about investing in diamonds online. Premank's team guided me through every detail. The 5-carat diamond I received is breathtaking!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    purchase: "5 Carat Investment Diamond"
  },
  {
    id: 5,
    name: "Kavitha Reddy",
    location: "Chennai",
    rating: 5,
    text: "The customization options are incredible. I designed my dream necklace and the final piece was exactly as I envisioned. True luxury experience!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    purchase: "Custom Diamond Necklace"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
    >
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <LuxuryBadge variant="gold" className="mb-3 sm:mb-4">
          Testimonials
        </LuxuryBadge>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground mb-3 sm:mb-4">
          What Our <span className="text-gold-gradient">Clients Say</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied customers who found their perfect diamond at Premank
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Main Testimonial Card */}
        <div className="relative bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-elegant border border-border overflow-hidden">
          {/* Quote Icon Background */}
          <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 h-16 sm:w-24 sm:h-24 text-primary/10" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed mb-6 sm:mb-8 font-light italic">
                "{currentTestimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <motion.img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary shadow-gold"
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <h4 className="text-lg sm:text-xl font-playfair font-bold text-foreground">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.location}</p>
                  <p className="text-xs text-primary font-medium mt-1">{currentTestimonial.purchase}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrev}
              className="p-2 sm:p-3 rounded-full bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="p-2 sm:p-3 rounded-full bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 text-center"
        >
          {[
            { value: "10,000+", label: "Happy Clients" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-xl sm:text-3xl font-playfair font-bold text-gold-gradient">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
