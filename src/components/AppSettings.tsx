import { motion } from "framer-motion";
import { ArrowLeft, Settings, Bell, Moon, Sun, Globe, Shield, Download, Eye, RefreshCw, Palette, Package } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useState } from "react";
import premankLogo from "@/assets/premank-logo.png";

interface AppSettingsProps {
  onBack: () => void;
}

export const AppSettings = ({ onBack }: AppSettingsProps) => {
  // Notification Settings
  const [pushAppointmentUpdates, setPushAppointmentUpdates] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Appearance
  const [darkMode, setDarkMode] = useState(true);
  
  // App Preferences
  const [autoSync, setAutoSync] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [animationEffects, setAnimationEffects] = useState(true);

  const handleClearCache = () => {
    // Clear cache logic
    console.log("Cache cleared");
  };

  const handleClearData = () => {
    const confirmation = confirm(
      "⚠️ This will delete all your appointments, preferences, and user data. This action cannot be undone. Are you sure?"
    );
    
    if (confirmation) {
      localStorage.removeItem('dno_appointments');
      localStorage.removeItem('dno_user_data');
      localStorage.removeItem('app_settings');
      console.log("All data cleared");
      setTimeout(() => window.location.reload(), 1000);
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
              <img src={premankLogo} alt="Premank" className="h-8" />
              <h1 className="text-lg font-playfair font-bold text-accent">Premank</h1>
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
              Customize your Premank experience
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
                  <img src={premankLogo} alt="Premank" className="w-full h-full object-contain diamond-shine" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-foreground">Premank</h3>
                  <p className="text-sm text-muted-foreground italic">Bright your own jewellery ✨</p>
                  <p className="text-sm text-muted-foreground">Version 3.0</p>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premank is India's premier luxury diamond jeweller, bringing brilliance, 
                trust, and elegance together. We believe in brightening your own jewellery 
                with certified diamonds and expert craftsmanship.
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
                    <Label htmlFor="push-updates" className="text-foreground">Push Notification: Appointment Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about your appointment status</p>
                  </div>
                  <Switch 
                    id="push-updates"
                    checked={pushAppointmentUpdates}
                    onCheckedChange={setPushAppointmentUpdates}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notif" className="text-foreground">Email Notification</Label>
                    <p className="text-sm text-muted-foreground">Receive appointment confirmations via email</p>
                  </div>
                  <Switch 
                    id="email-notif"
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
                    <Label htmlFor="auto-sync" className="text-foreground">Auto Sync</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync appointment data</p>
                  </div>
                  <Switch 
                    id="auto-sync"
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="vibration" className="text-foreground">Vibration</Label>
                    <p className="text-sm text-muted-foreground">Vibrate on notifications and interactions</p>
                  </div>
                  <Switch 
                    id="vibration"
                    checked={vibration}
                    onCheckedChange={setVibration}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations" className="text-foreground">Animation Effects</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                  </div>
                  <Switch 
                    id="animations"
                    checked={animationEffects}
                    onCheckedChange={setAnimationEffects}
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
                © 2025 Premank. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Bright your own jewellery ✨
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};