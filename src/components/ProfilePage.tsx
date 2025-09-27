import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, MapPin, Package, CreditCard, Info, MessageSquare, LogOut, Gem } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { SoundButton } from "./ui/SoundButton";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProfilePageProps {
  userData: {
    fullName?: string;
    email: string;
    phone?: string;
    address?: string;
  };
  onBack: () => void;
  onLogout: () => void;
}

export const ProfilePage = ({ userData, onBack, onLogout }: ProfilePageProps) => {
  const paymentMethods = ["PhonePe", "Paytm", "UPI", "COD", "Cards", "Net Banking"];
  
  const mockOrders = [
    { id: "ORD001", item: "Royal Brilliance", status: "Delivered", date: "Dec 20, 2024" },
    { id: "ORD002", item: "Elegant Emerald", status: "In Transit", date: "Dec 25, 2024" },
  ];

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LuxuryButton 
              variant="ghost" 
              onClick={onBack}
              className="gap-2 text-foreground hover:text-accent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </LuxuryButton>
            
            <SoundButton 
              className="flex items-center gap-2 bg-transparent border-none text-foreground hover:text-accent"
              soundType="sparkle"
              onClick={() => {}}
            >
              <Gem className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-playfair font-bold text-accent">Profile</h1>
            </SoundButton>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-foreground">
                    {userData.fullName || "Valued Customer"}
                  </h2>
                  <p className="text-muted-foreground">Premium Diamond Collection Member</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{userData.email}</p>
                    </div>
                  </div>
                  
                  {userData.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground">{userData.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                {userData.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">{userData.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* About Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">About PR.COLLECTION</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                PR.COLLECTION is a premium diamond store bringing brilliance, trust, and elegance together. 
                Every piece is handpicked to add sparkle to your life. We pride ourselves on offering the finest 
                quality diamonds with exceptional craftsmanship and unparalleled customer service.
              </p>
            </Card>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">Payment Methods</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="flex items-center gap-2 p-4 bg-background/50 rounded-lg border border-border"
                  >
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="font-medium text-foreground">{method}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* My Orders */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">My Orders</h3>
              </div>
              
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
                  >
                    <div>
                      <p className="font-medium text-foreground">{order.item}</p>
                      <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={order.status === "Delivered" ? "default" : "secondary"}
                        className="mb-1"
                      >
                        {order.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-playfair font-semibold text-foreground">Contact Us</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Email Support</p>
                  <p className="font-medium text-foreground">support@pr-collection.com</p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Phone Support</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <LuxuryButton
              variant="destructive"
              size="lg"
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </LuxuryButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};