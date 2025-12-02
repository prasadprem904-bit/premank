import { useState, useEffect } from "react";
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
    <main className="min-h-screen">
      {shouldShowSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentState === 'auth' && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}

      {currentState === 'home' && (
        <HomePage 
          onViewDiamond={handleViewDiamond}
          onProfile={handleProfile}
          onCustomDesign={handleCustomDesign}
          onCertificate={handleCertificate}
          onViewAppointments={handleViewAppointments}
        />
      )}

      {currentState === 'custom-design' && (
        <CustomDesign onBack={handleBackToHome} />
      )}

      {currentState === 'certificate' && (
        <CertificateGenerator onBack={handleBackToHome} />
      )}

      {currentState === 'diamond-details' && selectedDiamond && (
        <DiamondDetails
          diamond={selectedDiamond}
          onBack={handleBackToHome}
          onBookAppointment={handleBookAppointment}
        />
      )}

      {currentState === 'book-appointment' && selectedDiamond && (
        <BookAppointment
          diamond={selectedDiamond}
          onBack={() => setCurrentState('diamond-details')}
          onAppointmentComplete={handleAppointmentComplete}
        />
      )}

      {currentState === 'appointment-confirmation' && selectedDiamond && appointmentDetails && (
        <AppointmentConfirmation
          diamond={selectedDiamond}
          appointmentDetails={appointmentDetails}
          onContinueShopping={handleContinueShopping}
          onViewAppointments={handleViewAppointments}
        />
      )}

      {currentState === 'my-appointments' && (
        <MyAppointments onBack={handleBackToHome} />
      )}

      {currentState === 'profile' && user && (
        <ProfilePage
          userData={{ email: user.email }}
          onBack={handleBackToHome}
          onLogout={handleLogout}
          onViewAppointments={handleViewAppointments}
          onSettings={handleSettings}
        />
      )}

      {currentState === 'settings' && (
        <AppSettings onBack={() => setCurrentState('profile')} />
      )}
    </main>
  );
};

export default Index;
