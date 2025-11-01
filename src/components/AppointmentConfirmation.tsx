import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, Phone, Mail, MapPin, User } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { Separator } from "./ui/separator";
import type { Diamond } from "./DiamondCard";

interface AppointmentConfirmationProps {
  diamond: Diamond;
  appointmentDetails: {
    appointmentId: string;
    customerName: string;
    phone: string;
    email?: string;
    appointmentDate: string;
    appointmentTime: string;
    remarks?: string;
  };
  onContinueShopping: () => void;
  onViewAppointments: () => void;
}

export const AppointmentConfirmation = ({
  diamond,
  appointmentDetails,
  onContinueShopping,
  onViewAppointments
}: AppointmentConfirmationProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [appointmentStarted, setAppointmentStarted] = useState(false);

  useEffect(() => {
    const targetDateTime = new Date(`${appointmentDetails.appointmentDate}T${appointmentDetails.appointmentTime}`);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDateTime.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setAppointmentStarted(true);
        
        // Trigger browser notification
        if (Notification.permission === "granted") {
          new Notification("D&O COLLECTION - Appointment Time!", {
            body: `Hey ${appointmentDetails.customerName}, your appointment starts now!`,
            icon: "/dno-logo.png"
          });
        }
        return;
      }

      setTimeRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [appointmentDetails]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gradient-luxury p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8 text-center"
        >
          <div className="relative inline-block">
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-24 h-24 border-4 border-green-500 rounded-full"
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-playfair font-bold text-foreground mt-6 mb-2"
          >
            Appointment Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground"
          >
            Thank you for booking with D&O Collections
          </motion.p>
        </motion.div>

        {/* Countdown Timer */}
        {!appointmentStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
              ⏰ Time Remaining for Your Appointment:
            </h3>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {/* Days */}
              <div className="countdown-box">
                <div className="countdown-number">{timeRemaining.days}</div>
                <div className="countdown-label">Days</div>
              </div>
              
              {/* Hours */}
              <div className="countdown-box">
                <div className="countdown-number">{timeRemaining.hours}</div>
                <div className="countdown-label">Hours</div>
              </div>
              
              {/* Minutes */}
              <div className="countdown-box">
                <div className="countdown-number">{timeRemaining.minutes}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              
              {/* Seconds */}
              <div className="countdown-box">
                <div className="countdown-number">{timeRemaining.seconds}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 bg-accent/10 border border-accent rounded-lg"
          >
            <p className="text-xl font-semibold text-accent text-center">
              🎉 Your appointment time has started!<br />
              See you at D&O Collections showroom!
            </p>
          </motion.div>
        )}

        {/* Appointment Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent" />
                  <h3 className="font-playfair font-semibold text-foreground">Appointment Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Appointment ID</p>
                    <p className="font-mono text-accent font-semibold">{appointmentDetails.appointmentId}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                    <p className="font-semibold text-foreground">{appointmentDetails.customerName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground">{appointmentDetails.phone}</p>
                  </div>
                  
                  {appointmentDetails.email && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-foreground">{appointmentDetails.email}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-playfair font-semibold text-foreground">Visit Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(appointmentDetails.appointmentDate)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                    <p className="font-semibold text-foreground">
                      {formatTime(appointmentDetails.appointmentTime)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment</p>
                    <p className="text-foreground">Cash on Arrival</p>
                  </div>
                  
                  {appointmentDetails.remarks && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Remarks</p>
                      <p className="text-sm text-foreground">{appointmentDetails.remarks}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Diamond Details */}
            <div className="mt-6 pt-6 border-t border-accent/20">
              <p className="text-sm text-muted-foreground mb-3">Diamond to View</p>
              <div className="flex gap-4">
                <img src={diamond.image} alt={diamond.name} className="w-20 h-20 rounded-lg object-cover diamond-shine" />
                <div>
                  <h4 className="font-semibold text-foreground">{diamond.name}</h4>
                  <p className="text-sm text-muted-foreground">{diamond.carat} Carat • {diamond.cut}</p>
                  <p className="text-lg font-bold text-accent">
                    ₹{diamond.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <LuxuryButton
            variant="luxury"
            size="lg"
            className="flex-1"
            onClick={onViewAppointments}
          >
            View My Appointments
          </LuxuryButton>
          <LuxuryButton
            variant="luxury-outline"
            size="lg"
            className="flex-1"
            onClick={onContinueShopping}
          >
            Back to Home
          </LuxuryButton>
        </motion.div>
      </div>
    </div>
  );
};
