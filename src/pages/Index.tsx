import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthPage } from "@/components/AuthPage";
import { HomePage } from "@/components/HomePage";
import { DiamondDetails } from "@/components/DiamondDetails";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { ProfilePage } from "@/components/ProfilePage";
import type { Diamond } from "@/components/DiamondCard";

type AppState = 'splash' | 'auth' | 'home' | 'diamond-details' | 'order-confirmation' | 'profile';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [userData, setUserData] = useState<any>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleSplashComplete = () => {
    setCurrentState('auth');
  };

  const handleAuthSuccess = (data: any) => {
    setUserData(data);
    setCurrentState('home');
  };

  const handleViewDiamond = (diamond: Diamond) => {
    setSelectedDiamond(diamond);
    setCurrentState('diamond-details');
  };

  const handleBuyNow = (diamond: Diamond) => {
    // Generate order details
    const orderId = `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3);
    
    setOrderDetails({
      orderId,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });
    setCurrentState('order-confirmation');
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
    setCurrentState('auth');
  };

  const handleContinueShopping = () => {
    setCurrentState('home');
    setOrderDetails(null);
    setSelectedDiamond(null);
  };

  return (
    <main className="min-h-screen">
      {currentState === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentState === 'auth' && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}

      {currentState === 'home' && (
        <HomePage 
          onViewDiamond={handleViewDiamond}
          onProfile={handleProfile}
        />
      )}

      {currentState === 'diamond-details' && selectedDiamond && (
        <DiamondDetails
          diamond={selectedDiamond}
          onBack={handleBackToHome}
          onBuyNow={handleBuyNow}
        />
      )}

      {currentState === 'order-confirmation' && selectedDiamond && orderDetails && (
        <OrderConfirmation
          diamond={selectedDiamond}
          orderDetails={orderDetails}
          onContinueShopping={handleContinueShopping}
        />
      )}

      {currentState === 'profile' && userData && (
        <ProfilePage
          userData={userData}
          onBack={handleBackToHome}
          onLogout={handleLogout}
        />
      )}
    </main>
  );
};

export default Index;
