import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, Mail, Calendar, Clock, FileText, Banknote, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import type { Diamond } from "./DiamondCard";

interface BookAppointmentProps {
  diamond: Diamond;
  onBack: () => void;
  onAppointmentComplete: (appointmentData: any) => void;
}

export const BookAppointment = ({ diamond, onBack, onAppointmentComplete }: BookAppointmentProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "+91",
    email: "",
    date: "",
    time: "",
    remarks: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    // Name validation
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Phone validation (+91 + 10 digits starting with 6-9)
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Must be +91 followed by valid 10-digit number (starting with 6-9)";
    }

    // Email validation (optional but must be valid if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Date validation (no past dates)
    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Cannot book appointments in the past";
      }
    }

    // Time validation (9 AM - 7 PM only)
    if (!formData.time) {
      newErrors.time = "Please select a time";
    } else {
      const [hours] = formData.time.split(':').map(Number);
      if (hours < 9 || hours >= 19) {
        newErrors.time = "Appointments available only between 9:00 AM - 7:00 PM";
      }
    }

    // Remarks validation (max 500 chars)
    if (formData.remarks && formData.remarks.length > 500) {
      newErrors.remarks = "Remarks must be under 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate appointment ID
      const appointmentId = `APT${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      const appointmentData = {
        appointmentId,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        diamond: diamond,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        remarks: formData.remarks || null,
        status: 'Upcoming',
        bookedAt: new Date().toISOString(),
        paymentMethod: 'Cash on Arrival'
      };

      // Save to localStorage
      const existing = localStorage.getItem('dno_appointments');
      const appointments = existing ? JSON.parse(existing) : [];
      appointments.unshift(appointmentData);
      localStorage.setItem('dno_appointments', JSON.stringify(appointments));

      toast.success("Appointment booked successfully!");
      onAppointmentComplete(appointmentData);
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-luxury pb-24 md:pb-8">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-[1200px]">
          <LuxuryButton 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 text-foreground hover:text-accent min-h-[48px] px-3 sm:px-4"
          >
            <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Details</span>
            <span className="sm:hidden">Back</span>
          </LuxuryButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1200px]">
        <div className="max-w-4xl mx-auto">
          {/* Selected Diamond Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-4 sm:mb-6 p-4 sm:p-5 lg:p-6 bg-card/50 backdrop-blur-sm border-accent/20">
              <div className="flex gap-3 sm:gap-4">
                <img src={diamond.image} alt={diamond.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover diamond-shine flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold text-accent mb-1 sm:mb-2 truncate">{diamond.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">{diamond.carat} Carat • {diamond.cut}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-accent">
                    ₹{diamond.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Appointment Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-5 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-accent/20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-accent mb-2">
                Schedule Your Visit
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                Book an appointment to view this diamond at our exclusive showroom
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-foreground text-sm sm:text-base">Full Name *</Label>
                  <div className="relative mt-1.5 sm:mt-2">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="pl-11 min-h-[48px]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <Label htmlFor="phone" className="text-foreground text-sm sm:text-base">Phone Number *</Label>
                  <div className="relative mt-1.5 sm:mt-2">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="pl-11 min-h-[48px]"
                      placeholder="+919876543210"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Email Field (Optional) */}
                <div>
                  <Label htmlFor="email" className="text-foreground text-sm sm:text-base">Email (Optional)</Label>
                  <div className="relative mt-1.5 sm:mt-2">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-11 min-h-[48px]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Date & Time Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-foreground text-sm sm:text-base">Preferred Date *</Label>
                    <div className="relative mt-1.5 sm:mt-2">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="pl-11 min-h-[48px]"
                        min={today}
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-foreground text-sm sm:text-base">Preferred Time *</Label>
                    <div className="relative mt-1.5 sm:mt-2">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        className="pl-11 min-h-[48px]"
                        min="09:00"
                        max="19:00"
                      />
                    </div>
                    {errors.time && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.time}</p>}
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      Showroom hours: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>

                {/* Remarks Field */}
                <div>
                  <Label htmlFor="remarks" className="text-foreground text-sm sm:text-base">Additional Remarks (Optional)</Label>
                  <div className="relative mt-1.5 sm:mt-2">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      id="remarks"
                      value={formData.remarks}
                      onChange={(e) => handleChange('remarks', e.target.value)}
                      className="pl-11 min-h-[80px] sm:min-h-[100px]"
                      placeholder="Any specific requirements or questions..."
                      maxLength={500}
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    {formData.remarks.length}/500 characters
                  </p>
                  {errors.remarks && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.remarks}</p>}
                </div>

                {/* Payment Method - Fixed */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Payment Method</h4>
                  </div>
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-background rounded-lg">
                    <input 
                      type="radio" 
                      id="cash" 
                      name="payment" 
                      checked 
                      readOnly
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <label htmlFor="cash" className="flex-1">
                      <span className="font-semibold text-foreground text-sm sm:text-base">Cash on Arrival</span>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                        Pay at showroom after viewing the diamond
                      </p>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <LuxuryButton
                  type="submit"
                  variant="luxury"
                  size="xl"
                  className="w-full gap-2 sm:gap-3 min-h-[52px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Confirm Appointment
                    </>
                  )}
                </LuxuryButton>
              </form>

              {/* Benefits Section */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 lg:p-6 bg-accent/5 rounded-lg border border-accent/10">
                <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Why Book an Appointment?</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {[
                    "Exclusive one-on-one consultation with diamond experts",
                    "Examine diamond in person with professional equipment",
                    `View ${diamond.certification || "GIA"} certification and documentation`,
                    "No booking charges - only pay if you proceed with purchase"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
