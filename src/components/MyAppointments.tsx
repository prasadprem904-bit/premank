import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Phone, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LuxuryButton } from "./ui/luxury-button";

interface Appointment {
  appointmentId: string;
  customerName: string;
  phone: string;
  email?: string;
  diamond: {
    id: string;
    name: string;
    price: number;
    carat: number;
    cut: string;
    color: string;
    clarity: string;
    image: string;
    certification?: "IGI" | "GIA";
  };
  appointmentDate: string;
  appointmentTime: string;
  remarks?: string;
  status: "Upcoming" | "In Progress" | "Completed" | "Cancelled";
  bookedAt: string;
  paymentMethod: "Cash on Arrival";
}

interface MyAppointmentsProps {
  onBack: () => void;
}

// Countdown component for upcoming appointments
const AppointmentCountdown = ({ date, time }: { date: string; time: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(`${date}T${time}`);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  return (
    <div className="flex gap-2 text-sm">
      <span className="px-2 py-1 bg-accent/10 rounded font-mono">{timeLeft.days}d</span>
      <span className="px-2 py-1 bg-accent/10 rounded font-mono">{timeLeft.hours}h</span>
      <span className="px-2 py-1 bg-accent/10 rounded font-mono">{timeLeft.minutes}m</span>
      <span className="px-2 py-1 bg-accent/10 rounded font-mono">{timeLeft.seconds}s</span>
    </div>
  );
};

export const MyAppointments = ({ onBack }: MyAppointmentsProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const appointmentsData = localStorage.getItem('dno_appointments');
    if (appointmentsData) {
      try {
        const parsed = JSON.parse(appointmentsData);
        // Calculate status for each appointment
        const updated = parsed.map((apt: Appointment) => ({
          ...apt,
          status: calculateStatus(apt.appointmentDate, apt.appointmentTime)
        }));
        setAppointments(updated);
      } catch (error) {
        console.error('Failed to parse appointments data');
        setAppointments([]);
      }
    }
  };

  const calculateStatus = (date: string, time: string): string => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diffMinutes = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60);
    
    if (diffMinutes < -30) return "Completed";
    if (diffMinutes >= -30 && diffMinutes <= 30) return "In Progress";
    if (diffMinutes > 30) return "Upcoming";
    return "Completed";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'In Progress':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
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
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <LuxuryButton 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 text-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </LuxuryButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
              My Appointments
            </h1>
            <p className="text-muted-foreground">
              Track and manage your diamond viewing appointments
            </p>
          </div>

          {/* Appointments List */}
          {appointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-16 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury text-center">
                <Calendar className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                  No Appointments Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  You haven't booked any diamond viewing appointments.
                </p>
                <LuxuryButton variant="luxury" onClick={onBack}>
                  Browse Diamonds
                </LuxuryButton>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.appointmentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury hover:shadow-2xl transition-shadow">
                    {/* Header with Status */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-mono text-sm text-accent mb-1">{appointment.appointmentId}</p>
                        <h3 className="text-lg font-semibold text-foreground">{appointment.customerName}</h3>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    {/* Diamond Details */}
                    <div className="flex gap-4 mb-4">
                      <img src={appointment.diamond.image} className="w-24 h-24 rounded-lg object-cover diamond-shine" alt={appointment.diamond.name} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{appointment.diamond.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.diamond.carat} Carat • {appointment.diamond.cut}
                        </p>
                        <p className="text-xl font-bold text-accent mt-2">
                          ₹{appointment.diamond.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Appointment Info */}
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{formatDate(appointment.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{formatTime(appointment.appointmentTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Phone className="w-4 h-4 text-accent" />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>

                    {/* Live Countdown (only for Upcoming) */}
                    {appointment.status === "Upcoming" && (
                      <div className="pt-4 border-t border-accent/20">
                        <p className="text-sm text-muted-foreground mb-2">Time Remaining:</p>
                        <AppointmentCountdown 
                          date={appointment.appointmentDate} 
                          time={appointment.appointmentTime} 
                        />
                      </div>
                    )}

                    {/* Payment Info */}
                    <div className="pt-4 border-t border-accent/20 text-sm text-muted-foreground">
                      Payment: <span className="text-foreground font-medium">Cash on Arrival</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
