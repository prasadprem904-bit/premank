import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Search, Filter, Grid, List, Gem, Calendar, Eye, Award, ScanEye, Heart, Crown, Diamond as DiamondIcon, Sparkles } from "lucide-react";
import { DiamondCard, type Diamond } from "./DiamondCard";
import { LuxuryButton } from "./ui/luxury-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PremiumFeatures } from "./PremiumFeatures";
import { ContactSupport } from "./ContactSupport";

import { CertificationBadges } from "./CertificationBadges";
import { DiamondSizeComparison } from "./DiamondSizeComparison";
import { DiamondWishlist } from "./DiamondWishlist";
import { FAQSection } from "./FAQSection";
import { FloatingParticles } from "./ui/FloatingParticles";
import { LuxuryBadge } from "./ui/LuxuryBadge";
import { supabase } from "@/integrations/supabase/client";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroLadyRing from "@/assets/hero-lady-ring.jpg";
import modelSmallDiamond from "@/assets/model-small-diamond.jpg";
import modelLargeDiamond from "@/assets/model-large-diamond.jpg";
import modelOpeningBox from "@/assets/model-opening-box.jpg";
import modelMediumDiamond from "@/assets/model-medium-diamond.jpg";
import premankPremiumLogo from "@/assets/premank-premium-logo.png";

// Natural diamond images by carat
import diamond05Carat from "@/assets/diamond-0.5-carat.jpg";
import diamond1Carat from "@/assets/diamond-1-carat.jpg";
import diamond2Carat from "@/assets/diamond-2-carat.jpg";
import diamond3Carat from "@/assets/diamond-3-carat.jpg";
import diamond4Carat from "@/assets/diamond-4-carat.jpg";
import diamond5Carat from "@/assets/diamond-5-carat.jpg";

// Diamond image mapping by path
const diamondImageMap: Record<string, string> = {
  '/src/assets/diamond-0.5-carat.jpg': diamond05Carat,
  '/src/assets/diamond-1-carat.jpg': diamond1Carat,
  '/src/assets/diamond-2-carat.jpg': diamond2Carat,
  '/src/assets/diamond-3-carat.jpg': diamond3Carat,
  '/src/assets/diamond-4-carat.jpg': diamond4Carat,
  '/src/assets/diamond-5-carat.jpg': diamond5Carat,
};

interface HomePageProps {
  onViewDiamond: (diamond: Diamond) => void;
  onProfile: () => void;
  onCustomDesign: () => void;
  onCertificate: () => void;
  onViewAppointments: () => void;
  showWishlistOnMount?: boolean;
  onWishlistClose?: () => void;
}

// Fallback sample data (used only if database is empty)
const fallbackDiamonds: Diamond[] = [
  { id: crypto.randomUUID(), name: "Natural Diamond 0.5 Cent", price: 5000, carat: 0.005, cut: "Round Brilliant", color: "D", clarity: "VVS1", image: diamond05Carat, rating: 4.9 },
  { id: crypto.randomUUID(), name: "Natural Diamond 1 Carat", price: 150000, carat: 1.0, cut: "Round Brilliant", color: "E", clarity: "VVS2", image: diamond1Carat, rating: 4.9 },
  { id: crypto.randomUUID(), name: "Natural Diamond 2 Carat", price: 450000, carat: 2.0, cut: "Round Brilliant", color: "D", clarity: "VS1", image: diamond2Carat, rating: 4.9 },
  { id: crypto.randomUUID(), name: "Natural Diamond 3 Carat", price: 850000, carat: 3.0, cut: "Round Brilliant", color: "E", clarity: "VVS1", image: diamond3Carat, rating: 5.0 },
  { id: crypto.randomUUID(), name: "Natural Diamond 4 Carat", price: 1500000, carat: 4.0, cut: "Round Brilliant", color: "D", clarity: "IF", image: diamond4Carat, rating: 5.0 },
  { id: crypto.randomUUID(), name: "Natural Diamond 5 Carat", price: 2500000, carat: 5.0, cut: "Round Brilliant", color: "D", clarity: "VVS1", image: diamond5Carat, rating: 5.0 },
];

export const HomePage = ({
  onViewDiamond,
  onProfile,
  onCustomDesign,
  onCertificate,
  onViewAppointments,
  showWishlistOnMount = false,
  onWishlistClose
}: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [filteredDiamonds, setFilteredDiamonds] = useState<Diamond[]>([]);
  const [showWishlist, setShowWishlist] = useState(showWishlistOnMount);
  const [loading, setLoading] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Handle wishlist from mobile nav
  useEffect(() => {
    if (showWishlistOnMount) {
      setShowWishlist(true);
    }
  }, [showWishlistOnMount]);

  // Handle wishlist close callback
  const handleWishlistClose = () => {
    setShowWishlist(false);
    onWishlistClose?.();
  };

  // Fetch diamonds from database
  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const { data, error } = await supabase
          .from('diamonds')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedDiamonds: Diamond[] = data.map(d => ({
            id: d.id,
            name: d.name,
            price: Number(d.price),
            carat: Number(d.carat),
            cut: "Round Brilliant",
            color: d.color,
            clarity: d.clarity,
            image: d.image_url ? (diamondImageMap[d.image_url] || heroDiamond) : heroDiamond,
            rating: 4.9,
            certification: d.certification_status === "certified" ? "GIA" : undefined,
          }));
          setDiamonds(mappedDiamonds);
          setFilteredDiamonds(mappedDiamonds);
        } else {
          // Use fallback if no diamonds in database
          setDiamonds(fallbackDiamonds);
          setFilteredDiamonds(fallbackDiamonds);
        }
      } catch (error) {
        console.error('Error fetching diamonds:', error);
        setDiamonds(fallbackDiamonds);
        setFilteredDiamonds(fallbackDiamonds);
      } finally {
        setLoading(false);
      }
    };

    fetchDiamonds();
  }, []);

  // Floating nav scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up or at top
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavVisible(false);
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Parallax scroll effects
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Page scroll progress for indicator
  const { scrollYProgress: pageScrollProgress } = useScroll();
  
  const backgroundY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = diamonds.filter(diamond => 
      diamond.name.toLowerCase().includes(term.toLowerCase()) || 
      diamond.cut.toLowerCase().includes(term.toLowerCase()) || 
      diamond.color.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredDiamonds(filtered);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-[60]"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 origin-left"
          style={{ scaleX: pageScrollProgress }}
        />
      </motion.div>
      {/* Floating Navigation Bar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ 
          y: isNavVisible ? 0 : -100, 
          opacity: isNavVisible ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <motion.div 
              className="flex items-center flex-shrink-0" 
              whileHover={{ scale: 1.02 }}
            >
              <motion.img 
                src={premankPremiumLogo} 
                alt="Premank" 
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? "h-10 sm:h-12 md:h-14" : "h-12 sm:h-16 md:h-20"
                }`}
              />
            </motion.div>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <LuxuryButton 
                variant="luxury-ghost" 
                size="sm"
                onClick={() => setShowWishlist(true)} 
                className="gap-1.5 sm:gap-2 min-h-[44px] px-2 sm:px-3 md:px-4"
              >
                <Heart className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Wishlist</span>
              </LuxuryButton>
              <LuxuryButton 
                variant="luxury-ghost" 
                size="sm" 
                onClick={onViewAppointments} 
                className="gap-1.5 sm:gap-2 min-h-[44px] px-2 sm:px-3 md:px-4"
              >
                <Calendar className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Appointments</span>
              </LuxuryButton>
              <LuxuryButton 
                variant="luxury-outline" 
                size="sm" 
                onClick={onProfile}
                className="min-h-[44px] px-3 sm:px-4"
              >
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">Me</span>
              </LuxuryButton>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }} 
        className="relative min-h-[100svh] flex items-center overflow-hidden pt-16 sm:pt-20"
      >
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY, scale }}
        >
          <img 
            src={heroLadyRing} 
            alt="Luxury Diamond Ring" 
            className="w-full h-[120%] object-cover object-top" 
            style={{ objectPosition: 'center 20%' }} 
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </motion.div>
        
        {/* Floating Particles */}
        <FloatingParticles count={30} />
        
        {/* Hero Content with Parallax */}
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ y: contentY, opacity }}
        >
          <div className="max-w-4xl">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <LuxuryBadge variant="gold" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                India's Premier Diamond Jeweller
              </LuxuryBadge>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-4 sm:mb-6 text-gold-gradient hero-text-shadow leading-tight"
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }}
            >
              Bright Your Own
              <br />
              <span className="text-white">Jewellery</span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-10 font-light max-w-2xl"
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5 }}
            >
              Discover exquisite natural diamonds, certified by IGI & GIA. 
              Experience luxury like never before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ y: 40, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.6 }}
            >
              <LuxuryButton variant="luxury" size="lg" className="gap-2 sm:gap-3 w-full sm:w-auto min-h-[52px] text-sm sm:text-base">
                <DiamondIcon className="w-5 h-5" />
                Explore Collection
              </LuxuryButton>
              
              <LuxuryButton variant="luxury-dark" size="lg" onClick={onCertificate} className="gap-2 sm:gap-3 w-full sm:w-auto min-h-[52px] text-sm sm:text-base">
                <Award className="w-5 h-5" />
                View Certifications
              </LuxuryButton>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 max-w-lg"
              initial={{ y: 40, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.7 }}
            >
              {[
                { value: "5000+", label: "Diamonds" },
                { value: "15+", label: "Years Experience" },
                { value: "100%", label: "Certified" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl sm:text-3xl md:text-4xl font-playfair font-bold text-gold-gradient">{stat.value}</p>
                  <p className="text-[10px] sm:text-sm text-white/70 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Search & Filter Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 -mt-12 sm:-mt-20 relative z-20"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-elegant border border-border p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search diamonds..." 
                value={searchTerm} 
                onChange={e => handleSearch(e.target.value)} 
                className="pl-12 sm:pl-14 pr-4 h-12 sm:h-14 lg:h-16 text-base sm:text-lg bg-secondary/50 border-border focus:border-primary rounded-xl sm:rounded-2xl shadow-soft input-luxury" 
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold text-foreground">
                Discover Premium Diamonds
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">{filteredDiamonds.length} exquisite pieces available</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary min-w-[44px] min-h-[44px]">
                <Filter className="w-5 h-5" />
              </Button>
              <div className="flex bg-secondary rounded-xl p-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode("grid")} 
                  className={`rounded-lg min-w-[44px] min-h-[44px] ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-gold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode("list")} 
                  className={`rounded-lg min-w-[44px] min-h-[44px] ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-gold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Diamonds Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <motion.div 
          className={`grid gap-4 sm:gap-6 lg:gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`} 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {filteredDiamonds.map((diamond, index) => (
            <motion.div 
              key={diamond.id} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * Math.min(index, 5), duration: 0.5 }}
            >
              <DiamondCard diamond={diamond} onView={onViewDiamond} />
            </motion.div>
          ))}
        </motion.div>

        {filteredDiamonds.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-12 sm:py-16 lg:py-20"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Gem className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl sm:text-2xl font-playfair text-foreground mb-2">
              No diamonds found
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </motion.div>
        )}
      </section>

      {/* Luxury Diamond Showcase */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-secondary/30 py-12 sm:py-16 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <LuxuryBadge variant="gold" className="mb-3 sm:mb-4">Our Collection</LuxuryBadge>
            </motion.div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-3 sm:mb-4 text-gold-gradient px-2">
              Natural Diamonds • 0.5 to 5 Carats
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Experience the brilliance of certified natural diamonds, each handpicked for exceptional quality
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
            {[
              { img: modelSmallDiamond, carat: "0.5 Carat", desc: "Perfect for delicate designs" },
              { img: modelMediumDiamond, carat: "1.5 Carat", desc: "Balanced elegance" },
              { img: modelOpeningBox, carat: "2 Carat", desc: "Statement piece" },
              { img: modelLargeDiamond, carat: "5 Carat", desc: "Ultimate luxury" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.03, y: -5 }} 
                className="relative group overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-elegant hover:shadow-premium transition-all duration-500"
              >
                <img src={item.img} alt={item.carat} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-8 text-white">
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-playfair font-bold mb-1 sm:mb-2 text-gold-gradient">{item.carat}</h3>
                  <p className="text-xs sm:text-sm opacity-90 line-clamp-1">{item.desc}</p>
                </div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <LuxuryBadge variant="gold" className="text-xs">View</LuxuryBadge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Premank */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
      >
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <LuxuryBadge variant="platinum" className="mb-3 sm:mb-4">Why Us</LuxuryBadge>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground mb-3 sm:mb-4 px-2">
            Why Choose <span className="text-gold-gradient">Premank</span>?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Advanced features to help you find the perfect diamond
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            { icon: Eye, title: "3D Diamond Viewer", desc: "Explore every angle of your diamond in stunning 3D. Rotate, zoom, and examine the brilliance in detail." },
            { icon: Award, title: "IGI / GIA Certified", desc: "Every diamond is certified by internationally recognized gemological institutes for authenticity and quality." },
            { icon: ScanEye, title: "Virtual Try-On", desc: "See how the diamond looks on you with our advanced AR technology before making your purchase." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.03, y: -5 }} 
              transition={{ duration: 0.3 }} 
              className="card-luxury p-5 sm:p-6 lg:p-10 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-gold-shine rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-gold">
                <item.icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-onyx" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold text-foreground mb-2 sm:mb-4">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certification Badges Section */}
      <CertificationBadges />

      {/* Diamond Size Comparison Tool */}
      <DiamondSizeComparison />

      {/* Premium Features Section */}
      <PremiumFeatures onViewDiamond={onViewDiamond} />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact & Support Section */}
      <ContactSupport />


      {/* Wishlist Modal */}
      <AnimatePresence>
        {showWishlist && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
              onClick={() => setShowWishlist(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100 || info.velocity.x > 500) {
                  handleWishlistClose();
                }
              }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[85%] md:w-[75%] lg:w-[60%] xl:w-[50%] bg-background shadow-2xl overflow-auto touch-pan-y"
            >
              <button
                onClick={handleWishlistClose}
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-50 p-2 rounded-full bg-muted hover:bg-muted/80"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <DiamondWishlist 
                onViewDetails={(diamond) => {
                  handleWishlistClose();
                  onViewDiamond(diamond);
                }}
                onBack={handleWishlistClose}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
