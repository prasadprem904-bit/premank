import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthPage } from "@/components/AuthPage";
import { HomePage } from "@/components/HomePage";
import { DiamondDetails } from "@/components/DiamondDetails";
import { BookAppointment } from "@/components/BookAppointment";
import { AppointmentConfirmation } from "@/components/AppointmentConfirmation";
import { ProfilePage } from "@/components/ProfilePage";
import { CustomDesign } from "@/components/CustomDesign";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { MyAppointments } from "@/components/MyAppointments";
import { AppSettings } from "@/components/AppSettings";
import { useAppointmentNotifications } from "@/hooks/useAppointmentNotifications";
import { useAuth } from "@/hooks/useAuth";
import type { Diamond } from "@/components/DiamondCard";

type AppState = 'splash' | 'auth' | 'home' | 'diamond-details' | 'book-appointment' | 'appointment-confirmation' | 'profile' | 'custom-design' | 'certificate' | 'my-appointments' | 'settings';

// Smooth section transition variants
const sectionVariants = {
  initial: { opacity: 0, y: 20, scale: 0.99 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    scale: 0.99,
  },
};

const sectionTransition = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  duration: 0.35,
};

const exitTransition = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  duration: 0.25,
};

const Index = () => {
  useAppointmentNotifications();
  
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [hasShownSplash, setHasShownSplash] = useState(false);
  
  const { user, loading: authLoading, signOut } = useAuth();

  // Handle initial state based on auth
  useEffect(() => {
    if (!authLoading && !hasShownSplash) {
      setCurrentState('splash');
    }
  }, [authLoading, hasShownSplash]);

  const handleSplashComplete = () => {
    setHasShownSplash(true);
    if (!user) {
      setCurrentState('auth');
    } else {
      setCurrentState('home');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentState('home');
  };

  const handleViewDiamond = (diamond: Diamond) => {
    setSelectedDiamond(diamond);
    setCurrentState('diamond-details');
  };

  const handleBookAppointment = (diamond: Diamond) => {
    setCurrentState('book-appointment');
  };

  const handleAppointmentComplete = (appointmentData: any) => {
    setAppointmentDetails(appointmentData);
    setCurrentState('appointment-confirmation');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setSelectedDiamond(null);
  };

  const handleProfile = () => {
    setCurrentState('profile');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentState('auth');
  };

  const handleContinueShopping = () => {
    setCurrentState('home');
    setAppointmentDetails(null);
    setSelectedDiamond(null);
  };

  const handleCustomDesign = () => {
    setCurrentState('custom-design');
  };

  const handleCertificate = () => {
    setCurrentState('certificate');
  };

  const handleViewAppointments = () => {
    setCurrentState('my-appointments');
  };

  const handleSettings = () => {
    setCurrentState('settings');
  };

  const shouldShowSplash = currentState === 'splash';

  if (authLoading) {
    return null;
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {shouldShowSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}

        {currentState === 'auth' && (
          <motion.div
            key="auth"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <AuthPage onAuthSuccess={handleAuthSuccess} />
          </motion.div>
        )}

        {currentState === 'home' && (
          <motion.div
            key="home"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <HomePage 
              onViewDiamond={handleViewDiamond}
              onProfile={handleProfile}
              onCustomDesign={handleCustomDesign}
              onCertificate={handleCertificate}
              onViewAppointments={handleViewAppointments}
            />
          </motion.div>
        )}

        {currentState === 'custom-design' && (
          <motion.div
            key="custom-design"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <CustomDesign onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentState === 'certificate' && (
          <motion.div
            key="certificate"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <CertificateGenerator onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentState === 'diamond-details' && selectedDiamond && (
          <motion.div
            key="diamond-details"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <DiamondDetails
              diamond={selectedDiamond}
              onBack={handleBackToHome}
              onBookAppointment={handleBookAppointment}
            />
          </motion.div>
        )}

        {currentState === 'book-appointment' && selectedDiamond && (
          <motion.div
            key="book-appointment"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <BookAppointment
              diamond={selectedDiamond}
              onBack={() => setCurrentState('diamond-details')}
              onAppointmentComplete={handleAppointmentComplete}
            />
          </motion.div>
        )}

        {currentState === 'appointment-confirmation' && selectedDiamond && appointmentDetails && (
          <motion.div
            key="appointment-confirmation"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <AppointmentConfirmation
              diamond={selectedDiamond}
              appointmentDetails={appointmentDetails}
              onContinueShopping={handleContinueShopping}
              onViewAppointments={handleViewAppointments}
            />
          </motion.div>
        )}

        {currentState === 'my-appointments' && (
          <motion.div
            key="my-appointments"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <MyAppointments onBack={handleBackToHome} />
          </motion.div>
        )}

        {currentState === 'profile' && user && (
          <motion.div
            key="profile"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <ProfilePage
              userData={{ email: user.email }}
              onBack={handleBackToHome}
              onLogout={handleLogout}
              onViewAppointments={handleViewAppointments}
              onSettings={handleSettings}
            />
          </motion.div>
        )}

        {currentState === 'settings' && (
          <motion.div
            key="settings"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={sectionTransition}
          >
            <AppSettings onBack={() => setCurrentState('profile')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
