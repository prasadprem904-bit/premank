import { useEffect, useState } from 'react';

interface Appointment {
  appointmentId: string;
  customerName: string;
  appointmentDate: string;
  appointmentTime: string;
  diamond: { name: string };
}

export const useAppointmentNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notifiedAppointments, setNotifiedAppointments] = useState<Set<string>>(new Set());

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      // Request permission on first launch
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(setPermission);
      }
    }
  }, []);

  // Check for upcoming appointments every minute
  useEffect(() => {
    const checkAppointments = () => {
      const appointmentsData = localStorage.getItem('dno_appointments');
      if (!appointmentsData || permission !== 'granted') return;

      const appointments: Appointment[] = JSON.parse(appointmentsData);
      const now = new Date();

      appointments.forEach(appointment => {
        const appointmentDateTime = new Date(
          `${appointment.appointmentDate}T${appointment.appointmentTime}`
        );
        const diffMinutes = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60);

        // Check if already notified
        const notificationKey = `${appointment.appointmentId}-${Math.floor(diffMinutes)}`;
        if (notifiedAppointments.has(notificationKey)) return;

        // Notify 30 minutes before
        if (diffMinutes <= 30 && diffMinutes > 29) {
          new Notification('Premank - Appointment Reminder', {
            body: `Your diamond appointment at Premank starts in 30 minutes! ✨`,
            icon: '/premank-logo.png',
            badge: '/premank-logo.png',
            tag: `reminder-${appointment.appointmentId}`,
            requireInteraction: true
          });
          
          setNotifiedAppointments(prev => new Set(prev).add(notificationKey));
        }

        // Notify 1 hour before
        if (diffMinutes <= 60 && diffMinutes > 59) {
          new Notification('Premank - Upcoming Appointment', {
            body: `Your exclusive diamond viewing at Premank begins in 1 hour! 💎`,
            icon: '/premank-logo.png',
            badge: '/premank-logo.png',
            tag: `reminder-60-${appointment.appointmentId}`
          });
          
          setNotifiedAppointments(prev => new Set(prev).add(`${appointment.appointmentId}-60`));
        }

        // Notify when appointment time arrives
        if (diffMinutes <= 0 && diffMinutes > -1) {
          new Notification('Premank - Your Appointment Starts Now!', {
            body: `Hey ${appointment.customerName}, your diamond appointment at Premank begins now! See you at our luxury showroom. ✨`,
            icon: '/premank-logo.png',
            badge: '/premank-logo.png',
            tag: `start-${appointment.appointmentId}`,
            requireInteraction: true
          });
          
          setNotifiedAppointments(prev => new Set(prev).add(`${appointment.appointmentId}-0`));
        }
      });
    };

    // Check immediately and then every minute
    checkAppointments();
    const interval = setInterval(checkAppointments, 60000);

    return () => clearInterval(interval);
  }, [permission, notifiedAppointments]);

  return { permission };
};
