import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem, Calendar, Award } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    diamonds: 0,
    appointments: 0,
    certificates: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [diamondsRes, appointmentsRes, certificatesRes] = await Promise.all([
        supabase.from('diamonds').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('certificates').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        diamonds: diamondsRes.count || 0,
        appointments: appointmentsRes.count || 0,
        certificates: certificatesRes.count || 0,
      });
    };

    fetchStats();

    // Set up realtime subscriptions
    const diamondsChannel = supabase.channel('diamonds-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'diamonds' }, fetchStats)
      .subscribe();

    const appointmentsChannel = supabase.channel('appointments-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, fetchStats)
      .subscribe();

    const certificatesChannel = supabase.channel('certificates-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(diamondsChannel);
      supabase.removeChannel(appointmentsChannel);
      supabase.removeChannel(certificatesChannel);
    };
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-premank-primary mb-2">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome to Premank Admin Panel. Here's your business summary.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-premank-accent/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Diamonds
              </CardTitle>
              <Gem className="h-5 w-5 text-premank-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-playfair text-premank-primary">
                {stats.diamonds}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Diamonds in inventory
              </p>
            </CardContent>
          </Card>

          <Card className="border-premank-accent/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Appointments
              </CardTitle>
              <Calendar className="h-5 w-5 text-premank-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-playfair text-premank-primary">
                {stats.appointments}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Scheduled appointments
              </p>
            </CardContent>
          </Card>

          <Card className="border-premank-accent/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Certificates Issued
              </CardTitle>
              <Award className="h-5 w-5 text-premank-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-playfair text-premank-primary">
                {stats.certificates}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total certificates
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-premank-accent/30 shadow-lg">
          <CardHeader>
            <CardTitle className="font-playfair text-premank-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • Navigate to <strong>Diamonds</strong> to manage your inventory
            </p>
            <p className="text-sm text-muted-foreground">
              • Check <strong>Appointments</strong> to view and manage bookings
            </p>
            <p className="text-sm text-muted-foreground">
              • Go to <strong>Certificates</strong> to issue new certifications
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
