import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Certificate {
  id: string;
  diamond_id: string | null;
  customer_name: string;
  email: string;
  pdf_url: string | null;
  certificate_number: string;
  created_at: string;
}

interface Diamond {
  id: string;
  name: string;
}

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    diamond_id: "",
    customer_name: "",
    email: "",
    pdf_url: "",
  });

  useEffect(() => {
    fetchCertificates();
    fetchDiamonds();

    const channel = supabase
      .channel('certificates-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, fetchCertificates)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setCertificates(data);
  };

  const fetchDiamonds = async () => {
    const { data, error } = await supabase.from('diamonds').select('id, name');
    if (!error && data) setDiamonds(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const certificateData = {
      diamond_id: formData.diamond_id || null,
      customer_name: formData.customer_name,
      email: formData.email,
      pdf_url: formData.pdf_url || null,
    };

    const { error } = await supabase.from('certificates').insert([certificateData]);
    
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    
    toast({ title: "Success", description: "Certificate created successfully" });
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    toast({ title: "Success", description: "Certificate deleted successfully" });
  };

  const resetForm = () => {
    setFormData({
      diamond_id: "",
      customer_name: "",
      email: "",
      pdf_url: "",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-premank-primary">Certificates Management</h1>
            <p className="text-muted-foreground">Issue and manage diamond certificates</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-premank-primary hover:bg-premank-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Issue Certificate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-playfair text-premank-primary">Issue New Certificate</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="diamond_id">Select Diamond</Label>
                  <Select value={formData.diamond_id} onValueChange={(value) => setFormData({...formData, diamond_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a diamond" />
                    </SelectTrigger>
                    <SelectContent>
                      {diamonds.map((diamond) => (
                        <SelectItem key={diamond.id} value={diamond.id}>
                          {diamond.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="customer_name">Customer Name</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pdf_url">PDF URL (Optional)</Label>
                  <Input
                    id="pdf_url"
                    type="url"
                    value={formData.pdf_url}
                    onChange={(e) => setFormData({...formData, pdf_url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <Button type="submit" className="w-full bg-premank-primary hover:bg-premank-primary/90">
                  Issue Certificate
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate #</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>PDF</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No certificates found
                  </TableCell>
                </TableRow>
              ) : (
                certificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">{certificate.certificate_number}</TableCell>
                    <TableCell>{certificate.customer_name}</TableCell>
                    <TableCell>{certificate.email}</TableCell>
                    <TableCell>{format(new Date(certificate.created_at), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      {certificate.pdf_url ? (
                        <a href={certificate.pdf_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(certificate.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Certificates;
