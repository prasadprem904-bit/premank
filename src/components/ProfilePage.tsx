import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, LogOut, Settings } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { LuxuryButton } from "./ui/luxury-button";
import { Badge } from "./ui/badge";
import premankLogo from "@/assets/premank-logo.png";
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
  onViewAppointments: () => void;
  onSettings: () => void;
}
export const ProfilePage = ({
  userData,
  onBack,
  onLogout,
  onViewAppointments,
  onSettings
}: ProfilePageProps) => {
  const paymentMethods = ["PhonePe", "Paytm", "UPI", "COD", "Cards", "Net Banking"];

  // Get real appointments from localStorage
  const getRecentAppointments = () => {
    const appointmentsData = localStorage.getItem('dno_appointments');
    if (appointmentsData) {
      try {
        const appointments = JSON.parse(appointmentsData);
        return appointments.slice(0, 3); // Show only last 3 appointments
      } catch (error) {
        console.error('Failed to parse appointments data');
        return [];
      }
    }
    return [];
  };
  const recentAppointments = getRecentAppointments();
  return <div className="min-h-screen bg-gradient-luxury pb-24 md:pb-8">
      {/* Header */}
      <motion.header initial={{
      y: -50,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-[1200px]">
          <div className="flex items-center justify-between">
            <LuxuryButton variant="ghost" onClick={onBack} className="gap-2 text-foreground hover:text-accent min-h-[48px] px-3 sm:px-4">
              <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </LuxuryButton>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onSettings} className="text-muted-foreground hover:text-accent min-w-[48px] min-h-[48px]">
                <Settings className="w-6 h-6 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1200px]">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* User Information */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <Card className="p-5 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                <div className="w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-foreground" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-playfair font-bold text-foreground">
                    {userData.fullName || "Valued Customer"}
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Premium Diamond Collection Member</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground text-sm sm:text-base truncate">{userData.email}</p>
                    </div>
                  </div>
                  
                  {userData.phone && <div className="flex items-center gap-3 p-3 bg-background/30 rounded-lg">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground text-sm sm:text-base">{userData.phone}</p>
                      </div>
                    </div>}
                </div>

                {userData.address && <div className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground text-sm sm:text-base">{userData.address}</p>
                    </div>
                  </div>}
              </div>
            </Card>
          </motion.div>

          {/* About Us Section */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            <Card className="p-5 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground">About Premank</h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Premank is India's premier luxury diamond jeweller, bringing brilliance, 
                trust, and elegance together. We believe in brightening your own jewellery 
                with certified diamonds and expert craftsmanship. Every piece is handpicked 
                to add sparkle to your life with unparalleled quality and service.
              </p>
            </Card>
          </motion.div>

          {/* Payment Methods */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            
          </motion.div>

          {/* Appointment Details Section */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }}>
            <Card className="p-5 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground">Recent Appointments</h3>
                </div>
                <LuxuryButton variant="luxury-outline" size="sm" onClick={onViewAppointments} className="gap-2 w-full sm:w-auto min-h-[48px]">
                  View All Appointments
                </LuxuryButton>
              </div>
              
              {recentAppointments.length === 0 ? <div className="text-center py-8 sm:py-10">
                  <Calendar className="w-12 h-12 sm:w-14 sm:h-14 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm sm:text-base text-muted-foreground">No appointments yet</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Book your first viewing appointment</p>
                </div> : <div className="space-y-3 sm:space-y-4">
                  {recentAppointments.map((appointment: any) => <div key={appointment.appointmentId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3 bg-background/50 rounded-lg border border-border hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <img src={appointment.diamond.image} alt={appointment.diamond.name} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">{appointment.diamond.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">ID: {appointment.appointmentId}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            📅 {new Date(appointment.appointmentDate).toLocaleDateString('en-IN')} • 
                            🕐 {appointment.appointmentTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <Badge variant="secondary" className="text-xs">
                          {appointment.status || 'Upcoming'}
                        </Badge>
                      </div>
                    </div>)}
                  
                  {recentAppointments.length > 0 && <div className="text-center pt-2">
                      <button onClick={onViewAppointments} className="text-sm text-accent hover:underline min-h-[44px]">
                        View all {localStorage.getItem('dno_appointments') ? JSON.parse(localStorage.getItem('dno_appointments') || '[]').length : 0} appointments →
                      </button>
                    </div>}
                </div>}
            </Card>
          </motion.div>

          {/* Contact Us */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <Card className="p-5 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-playfair font-semibold text-foreground">Contact Us</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 bg-background/30 rounded-lg">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Email Support</p>
                  <p className="font-medium text-foreground text-sm sm:text-base break-all">support@dno-collections.com</p>
                </div>
                <div className="text-center p-4 bg-background/30 rounded-lg">
                  <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Phone Support</p>
                  <p className="font-medium text-foreground text-sm sm:text-base">+91 98765 43210</p>
                </div>
                <div className="text-center p-4 bg-background/30 rounded-lg">
                  <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">WhatsApp</p>
                  <p className="font-medium text-foreground text-sm sm:text-base">+91 98765 43210</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="flex justify-center pb-4">
            <LuxuryButton variant="destructive" size="lg" onClick={onLogout} className="gap-2 w-full sm:w-auto min-h-[52px]">
              <LogOut className="w-5 h-5" />
              Logout
            </LuxuryButton>
          </motion.div>
        </div>
      </div>
    </div>;
};