import { motion } from "framer-motion";
import { ArrowLeft, Settings, Bell, Moon, Sun, Globe, Shield, Download, Eye, RefreshCw, Palette, Package } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useState } from "react";
import dnoLogo from "@/assets/dno-logo.png";

interface AppSettingsProps {
  onBack: () => void;
}

export const AppSettings = ({ onBack }: AppSettingsProps) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleClearCache = () => {
    // Clear cache logic
    console.log("Cache cleared");
  };

  const handleClearData = () => {
    // Clear app data logic
    const confirmation = confirm("Are you sure you want to clear all app data? This action cannot be undone.");
    if (confirmation) {
      localStorage.clear();
      console.log("App data cleared");
    }
  };

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
              Back to Profile
            </LuxuryButton>
            
            <div className="flex items-center gap-3">
              <img src={dnoLogo} alt="D&O Collections" className="h-8" />
              <h1 className="text-lg font-playfair font-bold text-accent">D&O Collections</h1>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Settings className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
              App Settings
            </h1>
            <p className="text-muted-foreground">
              Customize your D&O Collections experience
            </p>
          </motion.div>

          {/* App Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-gold rounded-lg flex items-center justify-center p-2">
                  <img src={dnoLogo} alt="D&O Collections" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-foreground">D&O Collections</h3>
                  <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                  <p className="text-xs text-muted-foreground">Premium Diamond Shopping App</p>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                The ultimate destination for exquisite diamonds and luxury jewelry. Experience the finest collection 
                of handpicked diamonds with secure payment options and premium delivery service.
              </p>
            </Card>
          </motion.div>

          {/* Notifications Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-foreground">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts about orders and offers</p>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-notifications" className="text-foreground">Order Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                  </div>
                  <Switch 
                    id="order-notifications" 
                    checked={orderNotifications} 
                    onCheckedChange={setOrderNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-foreground">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-foreground flex items-center gap-2">
                      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* App Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">App Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-update" className="text-foreground">Auto Update</Label>
                    <p className="text-sm text-muted-foreground">Automatically update app when available</p>
                  </div>
                  <Switch 
                    id="auto-update" 
                    checked={autoUpdate} 
                    onCheckedChange={setAutoUpdate}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics" className="text-foreground">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve app by sharing usage data</p>
                  </div>
                  <Switch 
                    id="analytics" 
                    checked={analytics} 
                    onCheckedChange={setAnalytics}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Security & Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Security & Privacy</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-accent" />
                    <h4 className="font-medium text-foreground text-sm">Privacy Policy</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your data is encrypted and securely stored. We never share your personal information.
                  </p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-accent" />
                    <h4 className="font-medium text-foreground text-sm">Data Storage</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All orders and user preferences are stored locally on your device.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Storage & Cache */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Download className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Storage & Cache</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground text-sm">Clear Cache</p>
                    <p className="text-xs text-muted-foreground">Free up space by clearing temporary files</p>
                  </div>
                  <LuxuryButton 
                    variant="luxury-outline" 
                    size="sm"
                    onClick={handleClearCache}
                    className="gap-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Clear
                  </LuxuryButton>
                </div>

                <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium text-foreground text-sm">Clear All Data</p>
                    <p className="text-xs text-muted-foreground">Remove all app data including orders (Cannot be undone)</p>
                  </div>
                  <LuxuryButton 
                    variant="destructive" 
                    size="sm"
                    onClick={handleClearData}
                    className="gap-2"
                  >
                    Clear Data
                  </LuxuryButton>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <p className="text-sm text-muted-foreground mb-2">
                © 2025 D&O Collections. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Crafted with excellence for diamond enthusiasts
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};