import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthPage } from "@/components/AuthPage";
import { HomePage } from "@/components/HomePage";
import { DiamondDetails } from "@/components/DiamondDetails";
import { CheckoutPage } from "@/components/CheckoutPage";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { ProfilePage } from "@/components/ProfilePage";
import { CustomDesign } from "@/components/CustomDesign";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { MyOrders } from "@/components/MyOrders";
import { AppSettings } from "@/components/AppSettings";
import type { Diamond } from "@/components/DiamondCard";

type AppState = 'splash' | 'auth' | 'home' | 'diamond-details' | 'checkout' | 'order-confirmation' | 'profile' | 'custom-design' | 'certificate' | 'my-orders' | 'settings';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [userData, setUserData] = useState<any>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('dno_user_data');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        setCurrentState('home');
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

  const handleBuyNow = (diamond: Diamond) => {
    setCurrentState('checkout');
  };

  const handlePaymentComplete = (paymentMethod: string, amount: number) => {
    // Generate order details
    const orderId = `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3);
    
    const deliveryTimeWindows = [
      { from: "10:00 AM", to: "1:00 PM" },
      { from: "1:00 PM", to: "4:00 PM" },
      { from: "4:00 PM", to: "7:00 PM" },
    ];
    const randomWindow = deliveryTimeWindows[Math.floor(Math.random() * deliveryTimeWindows.length)];

    const paymentMethodNames: { [key: string]: string } = {
      phonepe: "PhonePe",
      paytm: "Paytm",
      upi: "UPI",
      gpay: "Google Pay",
      cod: "Cash on Delivery"
    };

    const orderData = {
      orderId,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      deliveryTimeFrom: randomWindow.from,
      deliveryTimeTo: randomWindow.to,
      paymentMethod: paymentMethodNames[paymentMethod] || paymentMethod,
      amount: amount
    };
    
    // Save order to localStorage
    if (selectedDiamond) {
      const existingOrders = localStorage.getItem('dno_orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      
      const now = new Date();
      orders.unshift({
        ...orderData,
        diamond: selectedDiamond,
        orderDate: now.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        orderTime: now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        status: 'Processing'
      });
      
      localStorage.setItem('dno_orders', JSON.stringify(orders));
    }

    setOrderDetails(orderData);
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
    localStorage.removeItem('dno_user_data');
    setCurrentState('auth');
  };

  const handleContinueShopping = () => {
    setCurrentState('home');
    setOrderDetails(null);
    setSelectedDiamond(null);
  };

  const handleCustomDesign = () => {
    setCurrentState('custom-design');
  };

  const handleCertificate = () => {
    setCurrentState('certificate');
  };

  const handleViewOrders = () => {
    setCurrentState('my-orders');
  };

  const handleSettings = () => {
    setCurrentState('settings');
  };

  // Show splash only if checking auth or no user logged in
  const shouldShowSplash = isCheckingAuth || (!userData && currentState === 'splash');

  return (
    <main className="min-h-screen">
      {shouldShowSplash && !isCheckingAuth && (
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
          onViewOrders={handleViewOrders}
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
          onBuyNow={handleBuyNow}
        />
      )}

      {currentState === 'checkout' && selectedDiamond && (
        <CheckoutPage
          diamond={selectedDiamond}
          onBack={() => setCurrentState('diamond-details')}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {currentState === 'order-confirmation' && selectedDiamond && orderDetails && (
        <OrderConfirmation
          diamond={selectedDiamond}
          orderDetails={orderDetails}
          onContinueShopping={handleContinueShopping}
          onViewOrders={handleViewOrders}
        />
      )}

      {currentState === 'my-orders' && (
        <MyOrders onBack={handleBackToHome} />
      )}

      {currentState === 'profile' && userData && (
        <ProfilePage
          userData={userData}
          onBack={handleBackToHome}
          onLogout={handleLogout}
          onViewOrders={handleViewOrders}
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
