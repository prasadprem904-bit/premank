import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Gem, Calendar, Eye, Award, ScanEye, Heart } from "lucide-react";
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

// Sample diamond data
const sampleDiamonds: Diamond[] = [{
  id: "1",
  name: "Royal Brilliance",
  price: 250000,
  carat: 2.5,
  cut: "Round Brilliant",
  color: "D",
  clarity: "VVS1",
  image: heroDiamond,
  rating: 4.9
}, {
  id: "2",
  name: "Elegant Emerald",
  price: 180000,
  carat: 1.8,
  cut: "Emerald",
  color: "E",
  clarity: "VS1",
  image: heroDiamond,
  rating: 4.8
}, {
  id: "3",
  name: "Princess Paradise",
  price: 320000,
  carat: 3.2,
  cut: "Princess",
  color: "F",
  clarity: "VVS2",
  image: heroDiamond,
  rating: 4.9
}, {
  id: "4",
  name: "Cushion Crown",
  price: 195000,
  carat: 2.1,
  cut: "Cushion",
  color: "G",
  clarity: "VS2",
  image: heroDiamond,
  rating: 4.7
}, {
  id: "5",
  name: "Oval Opulence",
  price: 275000,
  carat: 2.8,
  cut: "Oval",
  color: "D",
  clarity: "IF",
  image: heroDiamond,
  rating: 5.0
}, {
  id: "6",
  name: "Radiant Royalty",
  price: 210000,
  carat: 2.3,
  cut: "Radiant",
  color: "E",
  clarity: "VVS1",
  image: heroDiamond,
  rating: 4.8
}];
export const HomePage = ({
  onViewDiamond,
  onProfile,
  onCustomDesign,
  onCertificate,
  onViewAppointments
}: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredDiamonds, setFilteredDiamonds] = useState(sampleDiamonds);
  const [showWishlist, setShowWishlist] = useState(false);
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = sampleDiamonds.filter(diamond => diamond.name.toLowerCase().includes(term.toLowerCase()) || diamond.cut.toLowerCase().includes(term.toLowerCase()) || diamond.color.toLowerCase().includes(term.toLowerCase()));
    setFilteredDiamonds(filtered);
  };
  return <div className="min-h-screen bg-gradient-luxury">
      {/* Luxury Header - Compact */}
      <motion.header initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} className="absolute top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{
            scale: 1.05
          }}>
              <img src={premankLogo} alt="Premank" className="w-12 h-12 object-contain diamond-shine" />
              <h1 className="text-2xl font-playfair font-bold" style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
            }}>
                Premank
              </h1>
            </motion.div>

            <div className="flex items-center gap-3">
              <LuxuryButton 
                variant="luxury-outline" 
                onClick={() => setShowWishlist(true)} 
                className="gap-2 h-9 text-sm"
              >
                <Heart className="w-3 h-3" />
                Wishlist
              </LuxuryButton>
              <LuxuryButton variant="luxury-outline" onClick={onViewAppointments} className="gap-2 h-9 text-sm">
                <Calendar className="w-3 h-3" />
                Appointments
              </LuxuryButton>
              <LuxuryButton variant="luxury-outline" onClick={onProfile} className="h-9 text-sm">
                Profile
              </LuxuryButton>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Banner Section with Image - Full Face Visibility */}
      <motion.section initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.2
    }} className="relative min-h-screen px-4 text-center overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={heroLadyRing} alt="Luxury Diamond Ring" className="w-full h-full object-cover object-top" style={{
          objectPosition: 'center 20%'
        }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 40px rgba(255, 215, 0, 0.4)'
        }} initial={{
          y: 50,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            Bright Your Own Jewellery
          </motion.h1>
          
          <motion.p className="text-xl md:text-2xl text-diamond-white mb-8 font-light" initial={{
          y: 30,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.5
        }}>
            India's Premier Luxury Diamond Jeweller
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12" initial={{
          y: 40,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.7
        }}>
            <LuxuryButton variant="luxury" className="h-16 text-sm">
              💎 Shop Diamonds
            </LuxuryButton>
            
            <LuxuryButton variant="luxury-outline" className="h-16 text-sm" onClick={onCertificate}>
              🏆 Certified Stones
            </LuxuryButton>
            
            <LuxuryButton variant="luxury-outline" className="h-16 text-sm">
              👁️ Virtual Try-On
            </LuxuryButton>
            
            <LuxuryButton variant="luxury-outline" className="h-16 text-sm">
              📞 Contact Us
            </LuxuryButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Search & Filter Section */}
      <motion.section initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.2
    }} className="container py-8 rounded-sm shadow-md opacity-100 border-solid border mx-[120px] my-[24px] px-[24px] bg-[#faf9f6] text-secondary">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search by diamond type, price, carat..." value={searchTerm} onChange={e => handleSearch(e.target.value)} className="pl-12 pr-4 h-14 text-lg bg-card/50 backdrop-blur-sm border-accent/20 focus:border-accent shadow-luxury" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-playfair font-semibold text-foreground">
            Discover Premium Diamonds ({filteredDiamonds.length})
          </h2>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="flex bg-card rounded-lg p-1">
              <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Diamonds Grid */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"}`} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.4
      }}>
          {filteredDiamonds.map((diamond, index) => <motion.div key={diamond.id} initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1 * index,
          duration: 0.5
        }}>
              <DiamondCard diamond={diamond} onView={onViewDiamond} />
            </motion.div>)}
        </motion.div>

        {filteredDiamonds.length === 0 && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="text-center py-16">
            <Gem className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-playfair text-muted-foreground mb-2">
              No diamonds found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </motion.div>}
      </section>

      {/* Luxury Diamond Showcase Carousel */}
      <motion.section initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className="container mx-auto px-4 py-20 text-[#2a2a2a] bg-[#faf9f6]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
            Natural Diamonds • 0.5 to 5 Carats
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience the brilliance of certified natural diamonds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} className="relative group overflow-hidden rounded-2xl shadow-luxury hover:shadow-elegant transition-all">
            <img src={modelSmallDiamond} alt="0.5 Carat Diamond" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-playfair font-bold mb-2">0.5 Carat</h3>
              <p className="text-sm opacity-90">Perfect for delicate designs</p>
            </div>
          </motion.div>

          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} className="relative group overflow-hidden rounded-2xl shadow-luxury hover:shadow-elegant transition-all">
            <img src={modelMediumDiamond} alt="1.5 Carat Diamond" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-playfair font-bold mb-2">1.5 Carat</h3>
              <p className="text-sm opacity-90">Balanced elegance</p>
            </div>
          </motion.div>

          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} className="relative group overflow-hidden rounded-2xl shadow-luxury hover:shadow-elegant transition-all">
            <img src={modelOpeningBox} alt="2 Carat Diamond" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-playfair font-bold mb-2">2 Carat</h3>
              <p className="text-sm opacity-90">Statement piece</p>
            </div>
          </motion.div>

          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} className="relative group overflow-hidden rounded-2xl shadow-luxury hover:shadow-elegant transition-all">
            <img src={modelLargeDiamond} alt="5 Carat Diamond" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-playfair font-bold mb-2">5 Carat</h3>
              <p className="text-sm opacity-90">Ultimate luxury</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Premank - Three Key Features Section */}
      <motion.section initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }} className="container mx-auto px-4 py-16 bg-card/30 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Why Choose Premank?
          </h2>
          <p className="text-muted-foreground text-lg">
            Advanced features to help you find the perfect diamond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 3D Diamond Viewer */}
          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} transition={{
          duration: 0.3
        }} className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-8 text-center shadow-luxury hover:shadow-elegant hover:border-accent/40 transition-all">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full mb-6">
              <Eye className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              3D Diamond Viewer
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Explore every angle of your diamond in stunning 3D. Rotate, zoom, and examine the brilliance in detail.
            </p>
          </motion.div>

          {/* IGI/GIA Certified */}
          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} transition={{
          duration: 0.3
        }} className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-8 text-center shadow-luxury hover:shadow-elegant hover:border-accent/40 transition-all">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full mb-6">
              <Award className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              IGI / GIA Certified
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Every diamond is certified by internationally recognized gemological institutes for authenticity and quality.
            </p>
          </motion.div>

          {/* Virtual Try-On */}
          <motion.div whileHover={{
          scale: 1.05,
          y: -10
        }} transition={{
          duration: 0.3
        }} className="bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-8 text-center shadow-luxury hover:shadow-elegant hover:border-accent/40 transition-all">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full mb-6">
              <ScanEye className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              Virtual Try-On
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              See how the diamond looks on you with our advanced AR technology before making your purchase.
            </p>
          </motion.div>
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
      {showWishlist && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <button
            onClick={() => setShowWishlist(false)}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <DiamondWishlist onViewDetails={(diamond) => {
            setShowWishlist(false);
            onViewDiamond(diamond);
          }} />
        </div>
      )}
    </div>;
};