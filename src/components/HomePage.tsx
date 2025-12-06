import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid, List, Gem, Calendar, Eye, Award, ScanEye, Heart, Crown, Diamond as DiamondIcon, Sparkles } from "lucide-react";
import { DiamondCard, type Diamond } from "./DiamondCard";
import { LuxuryButton } from "./ui/luxury-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PremiumFeatures } from "./PremiumFeatures";
import { ContactSupport } from "./ContactSupport";
import { WhatsAppButton } from "./WhatsAppButton";
import { CertificationBadges } from "./CertificationBadges";
import { DiamondSizeComparison } from "./DiamondSizeComparison";
import { DiamondWishlist } from "./DiamondWishlist";
import { FloatingParticles } from "./ui/FloatingParticles";
import { LuxuryBadge } from "./ui/LuxuryBadge";
import { supabase } from "@/integrations/supabase/client";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroLadyRing from "@/assets/hero-lady-ring.jpg";
import modelSmallDiamond from "@/assets/model-small-diamond.jpg";
import modelLargeDiamond from "@/assets/model-large-diamond.jpg";
import modelOpeningBox from "@/assets/model-opening-box.jpg";
import modelMediumDiamond from "@/assets/model-medium-diamond.jpg";
import premankLogo from "@/assets/premank-logo.png";

interface HomePageProps {
  onViewDiamond: (diamond: Diamond) => void;
  onProfile: () => void;
  onCustomDesign: () => void;
  onCertificate: () => void;
  onViewAppointments: () => void;
}

// Fallback sample data (used only if database is empty)
const fallbackDiamonds: Diamond[] = [
  { id: crypto.randomUUID(), name: "Royal Brilliance", price: 250000, carat: 2.5, cut: "Round Brilliant", color: "D", clarity: "VVS1", image: heroDiamond, rating: 4.9 },
  { id: crypto.randomUUID(), name: "Elegant Emerald", price: 180000, carat: 1.8, cut: "Emerald", color: "E", clarity: "VS1", image: heroDiamond, rating: 4.8 },
  { id: crypto.randomUUID(), name: "Princess Paradise", price: 320000, carat: 3.2, cut: "Princess", color: "F", clarity: "VVS2", image: heroDiamond, rating: 4.9 },
  { id: crypto.randomUUID(), name: "Cushion Crown", price: 195000, carat: 2.1, cut: "Cushion", color: "G", clarity: "VS2", image: heroDiamond, rating: 4.7 },
  { id: crypto.randomUUID(), name: "Oval Opulence", price: 275000, carat: 2.8, cut: "Oval", color: "D", clarity: "IF", image: heroDiamond, rating: 5.0 },
  { id: crypto.randomUUID(), name: "Radiant Royalty", price: 210000, carat: 2.3, cut: "Radiant", color: "E", clarity: "VVS1", image: heroDiamond, rating: 4.8 },
];

export const HomePage = ({
  onViewDiamond,
  onProfile,
  onCustomDesign,
  onCertificate,
  onViewAppointments
}: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [filteredDiamonds, setFilteredDiamonds] = useState<Diamond[]>([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

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
            cut: d.description || "Round Brilliant",
            color: d.color,
            clarity: d.clarity,
            image: d.image_url || heroDiamond,
            rating: 4.8,
            certification: (d.certification_status === "GIA" || d.certification_status === "IGI") ? d.certification_status : undefined,
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
  
  // Parallax scroll effects
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
    <div className="min-h-screen bg-background">
      {/* Luxury Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
              <div className="relative">
                <img src={premankLogo} alt="Premank" className="w-14 h-14 object-contain" />
                <motion.div 
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-playfair font-bold text-gold-gradient">
                  Premank
                </h1>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">Luxury Diamonds</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-3">
              <LuxuryButton 
                variant="luxury-ghost" 
                size="sm"
                onClick={() => setShowWishlist(true)} 
                className="gap-2"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden md:inline">Wishlist</span>
              </LuxuryButton>
              <LuxuryButton variant="luxury-ghost" size="sm" onClick={onViewAppointments} className="gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden md:inline">Appointments</span>
              </LuxuryButton>
              <LuxuryButton variant="luxury-outline" size="sm" onClick={onProfile}>
                Profile
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
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
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
          className="container mx-auto px-4 relative z-10"
          style={{ y: contentY, opacity }}
        >
          <div className="max-w-4xl">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <LuxuryBadge variant="gold" className="text-sm px-4 py-2">
                <Crown className="w-4 h-4 mr-1" />
                India's Premier Diamond Jeweller
              </LuxuryBadge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 text-gold-gradient hero-text-shadow"
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }}
            >
              Bright Your Own
              <br />
              <span className="text-white">Jewellery</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl"
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5 }}
            >
              Discover exquisite natural diamonds, certified by IGI & GIA. 
              Experience luxury like never before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ y: 40, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.6 }}
            >
              <LuxuryButton variant="luxury" size="xl" className="gap-3">
                <DiamondIcon className="w-5 h-5" />
                Explore Collection
              </LuxuryButton>
              
              <LuxuryButton variant="luxury-dark" size="xl" onClick={onCertificate} className="gap-3">
                <Award className="w-5 h-5" />
                View Certifications
              </LuxuryButton>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-16 max-w-lg"
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
                  <p className="text-3xl md:text-4xl font-playfair font-bold text-gold-gradient">{stat.value}</p>
                  <p className="text-sm text-white/70 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
        className="container mx-auto px-4 py-16 -mt-20 relative z-20"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-elegant border border-border p-8">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by diamond type, price, carat..." 
                value={searchTerm} 
                onChange={e => handleSearch(e.target.value)} 
                className="pl-14 pr-4 h-16 text-lg bg-secondary/50 border-border focus:border-primary rounded-2xl shadow-soft input-luxury" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground">
                Discover Premium Diamonds
              </h2>
              <p className="text-muted-foreground">{filteredDiamonds.length} exquisite pieces available</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <Filter className="w-5 h-5" />
              </Button>
              <div className="flex bg-secondary rounded-xl p-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode("grid")} 
                  className={`rounded-lg ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-gold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode("list")} 
                  className={`rounded-lg ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-gold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Diamonds Grid */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div 
          className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`} 
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
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <DiamondCard diamond={diamond} onView={onViewDiamond} />
            </motion.div>
          ))}
        </motion.div>

        {filteredDiamonds.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Gem className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-playfair text-foreground mb-2">
              No diamonds found
            </h3>
            <p className="text-muted-foreground">
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
        className="bg-secondary/30 py-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <LuxuryBadge variant="gold" className="mb-4">Our Collection</LuxuryBadge>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gold-gradient">
              Natural Diamonds • 0.5 to 5 Carats
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the brilliance of certified natural diamonds, each handpicked for exceptional quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { img: modelSmallDiamond, carat: "0.5 Carat", desc: "Perfect for delicate designs" },
              { img: modelMediumDiamond, carat: "1.5 Carat", desc: "Balanced elegance" },
              { img: modelOpeningBox, carat: "2 Carat", desc: "Statement piece" },
              { img: modelLargeDiamond, carat: "5 Carat", desc: "Ultimate luxury" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -10 }} 
                className="relative group overflow-hidden rounded-3xl shadow-elegant hover:shadow-premium transition-all duration-500"
              >
                <img src={item.img} alt={item.carat} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-playfair font-bold mb-2 text-gold-gradient">{item.carat}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <LuxuryBadge variant="gold">View</LuxuryBadge>
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
        className="container mx-auto px-4 py-24"
      >
        <div className="text-center mb-16">
          <LuxuryBadge variant="platinum" className="mb-4">Why Us</LuxuryBadge>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Why Choose <span className="text-gold-gradient">Premank</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced features to help you find the perfect diamond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Eye, title: "3D Diamond Viewer", desc: "Explore every angle of your diamond in stunning 3D. Rotate, zoom, and examine the brilliance in detail." },
            { icon: Award, title: "IGI / GIA Certified", desc: "Every diamond is certified by internationally recognized gemological institutes for authenticity and quality." },
            { icon: ScanEye, title: "Virtual Try-On", desc: "See how the diamond looks on you with our advanced AR technology before making your purchase." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, y: -10 }} 
              transition={{ duration: 0.3 }} 
              className="card-luxury p-10 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold-shine rounded-2xl mb-6 shadow-gold">
                <item.icon className="w-10 h-10 text-onyx" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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

      {/* Contact & Support Section */}
      <ContactSupport />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

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
                  setShowWishlist(false);
                }
              }}
              className="fixed inset-y-0 right-0 z-50 w-full md:w-[80%] lg:w-[70%] bg-background shadow-2xl overflow-auto touch-pan-y"
            >
              <button
                onClick={() => setShowWishlist(false)}
                className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-50 p-2 rounded-full bg-muted hover:bg-muted/80"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <DiamondWishlist 
                onViewDetails={(diamond) => {
                  setShowWishlist(false);
                  onViewDiamond(diamond);
                }}
                onBack={() => setShowWishlist(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
