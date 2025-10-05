import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, LogOut, Settings } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { LuxuryButton } from "./ui/luxury-button";
import { Badge } from "./ui/badge";
import dnoLogo from "@/assets/dno-logo.png";

import { Package, CreditCard, Info, MessageSquare } from "lucide-react";

interface ProfilePageProps {
  userData: {
    fullName?: string;
    email: string;
    phone?: string;
    address?: string;
  };
  onBack: () => void;
  onLogout: () => void;
  onViewOrders: () => void;
  onSettings: () => void;
}

export const ProfilePage = ({ userData, onBack, onLogout, onViewOrders, onSettings }: ProfilePageProps) => {
  const paymentMethods = ["PhonePe", "Paytm", "UPI", "COD", "Cards", "Net Banking"];
  
  // Get real orders from localStorage
  const getRecentOrders = () => {
    const ordersData = localStorage.getItem('dno_orders');
    if (ordersData) {
      try {
        const orders = JSON.parse(ordersData);
        return orders.slice(0, 3); // Show only last 3 orders
      } catch (error) {
        console.error('Failed to parse orders data');
        return [];
      }
    }
    return [];
  };

  const recentOrders = getRecentOrders();

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
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                size="icon"
                onClick={onSettings}
                className="text-muted-foreground hover:text-accent"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
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
                <h3 className="text-xl font-playfair font-semibold text-foreground">About D&O Collections</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                D&O Collections is a premium diamond store bringing brilliance, trust, and elegance together.
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

          {/* Order Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-playfair font-semibold text-foreground">Order Details</h3>
                </div>
                <LuxuryButton 
                  variant="luxury-outline" 
                  size="sm"
                  onClick={onViewOrders}
                  className="gap-2"
                >
                  View All Orders
                </LuxuryButton>
              </div>
              
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Start shopping to see your orders here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order: any) => (
                    <div
                      key={order.orderId}
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:border-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={order.diamond.image} 
                          alt={order.diamond.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-foreground">{order.diamond.name}</p>
                          <p className="text-sm text-muted-foreground">Order ID: {order.orderId}</p>
                          <p className="text-xs text-muted-foreground mt-1">{order.orderDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={order.status === "Delivered" ? "default" : "secondary"}
                          className="mb-2"
                        >
                          {order.status}
                        </Badge>
                        <p className="text-sm font-semibold text-accent">
                          ₹{order.amount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {recentOrders.length > 0 && (
                    <div className="text-center pt-2">
                      <button 
                        onClick={onViewOrders}
                        className="text-sm text-accent hover:underline"
                      >
                        View all {localStorage.getItem('dno_orders') ? JSON.parse(localStorage.getItem('dno_orders') || '[]').length : 0} orders →
                      </button>
                    </div>
                  )}
                </div>
              )}
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
                  <p className="font-medium text-foreground">support@dno-collections.com</p>
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