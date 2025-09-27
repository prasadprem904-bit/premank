import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Gem } from "lucide-react";
import { DiamondCard, type Diamond } from "./DiamondCard";
import { LuxuryButton } from "./ui/luxury-button";
import { SoundButton } from "./ui/SoundButton";
import { Input } from "./ui/input";
import { useSound } from "@/hooks/useSound";
import heroDiamond from "@/assets/hero-diamond.jpg";

interface HomePageProps {
  onViewDiamond: (diamond: Diamond) => void;
  onProfile: () => void;
}

// Sample diamond data
const sampleDiamonds: Diamond[] = [
  {
    id: "1",
    name: "Royal Brilliance",
    price: 250000,
    carat: 2.5,
    cut: "Round Brilliant",
    color: "D",
    clarity: "VVS1",
    image: heroDiamond,
    rating: 4.9,
  },
  {
    id: "2", 
    name: "Elegant Emerald",
    price: 180000,
    carat: 1.8,
    cut: "Emerald",
    color: "E", 
    clarity: "VS1",
    image: heroDiamond,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Princess Paradise",
    price: 320000,
    carat: 3.2,
    cut: "Princess",
    color: "F",
    clarity: "VVS2", 
    image: heroDiamond,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Cushion Crown",
    price: 195000,
    carat: 2.1,
    cut: "Cushion",
    color: "G",
    clarity: "VS2",
    image: heroDiamond,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Oval Opulence", 
    price: 275000,
    carat: 2.8,
    cut: "Oval",
    color: "D",
    clarity: "IF",
    image: heroDiamond,
    rating: 5.0,
  },
  {
    id: "6",
    name: "Radiant Royalty",
    price: 210000,
    carat: 2.3,
    cut: "Radiant",
    color: "E",
    clarity: "VVS1",
    image: heroDiamond,
    rating: 4.8,
  },
];

export const HomePage = ({ onViewDiamond, onProfile }: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredDiamonds, setFilteredDiamonds] = useState(sampleDiamonds);
  const { playIconClick } = useSound();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = sampleDiamonds.filter(diamond =>
      diamond.name.toLowerCase().includes(term.toLowerCase()) ||
      diamond.cut.toLowerCase().includes(term.toLowerCase()) ||
      diamond.color.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredDiamonds(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <SoundButton 
                className="flex items-center gap-3 bg-transparent border-none p-0"
                soundType="sparkle"
                onClick={() => {}}
              >
                <Gem className="w-8 h-8 text-accent" />
                <h1 className="text-2xl font-playfair font-bold text-accent">
                  PR.COLLECTION
                </h1>
              </SoundButton>
            </motion.div>

            <LuxuryButton variant="luxury-outline" onClick={onProfile}>
              Profile
            </LuxuryButton>
          </div>
        </div>
      </motion.header>

      {/* Search & Filter Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by diamond type, price, carat..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 h-14 text-lg bg-card/50 backdrop-blur-sm border-accent/20 focus:border-accent shadow-luxury"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-playfair font-semibold text-foreground">
            Discover Premium Diamonds ({filteredDiamonds.length})
          </h2>
          
          <div className="flex items-center gap-2">
            <SoundButton 
              className="p-2 bg-transparent border-none text-muted-foreground hover:text-foreground"
              soundType="icon"
            >
              <Filter className="w-4 h-4" />
            </SoundButton>
            <div className="flex bg-card rounded-lg p-1">
              <SoundButton
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded border-none ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                soundType="icon"
              >
                <Grid className="w-4 h-4" />
              </SoundButton>
              <SoundButton
                onClick={() => setViewMode("list")}
                className={`p-2 rounded border-none ${viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                soundType="icon"
              >
                <List className="w-4 h-4" />
              </SoundButton>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Diamonds Grid */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div 
          className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredDiamonds.map((diamond, index) => (
            <motion.div
              key={diamond.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.5 
              }}
            >
              <DiamondCard 
                diamond={diamond} 
                onView={onViewDiamond}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredDiamonds.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Gem className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-playfair text-muted-foreground mb-2">
              No diamonds found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
};