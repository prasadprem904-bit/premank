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
import type { Diamond } from "@/components/DiamondCard";

type AppState = 'splash' | 'auth' | 'home' | 'diamond-details' | 'book-appointment' | 'appointment-confirmation' | 'profile' | 'custom-design' | 'certificate' | 'my-appointments' | 'settings';

const Index = () => {
  useAppointmentNotifications(); // Enable appointment notifications
  
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [userData, setUserData] = useState<any>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('dno_user_data');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        // Always show splash screen on app open
        setCurrentState('splash');
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('dno_user_data');
      }
    }
    setIsCheckingAuth(false);
  }, []);

  const handleSplashComplete = () => {
    // Only show auth if no user is logged in
    if (!userData) {
      setCurrentState('auth');
    } else {
      setCurrentState('home');
    }
  };

  const handleAuthSuccess = (data: any) => {
    setUserData(data);
    localStorage.setItem('dno_user_data', JSON.stringify(data));
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

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('dno_user_data');
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

  // Show splash screen whenever state is 'splash'
  const shouldShowSplash = currentState === 'splash';

  return (
    <main className="min-h-screen">
      {!isCheckingAuth && shouldShowSplash && (
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

      {currentState === 'profile' && userData && (
        <ProfilePage
          userData={userData}
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
