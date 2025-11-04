import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface Diamond {
  id: string;
  name: string;
  carat: number;
  color: string;
  clarity: string;
  price: number;
  description: string | null;
  image_url: string | null;
  certification_status: string;
}

const Diamonds = () => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDiamond, setEditingDiamond] = useState<Diamond | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    carat: "",
    color: "",
    clarity: "",
    price: "",
    description: "",
    image_url: "",
    certification_status: "pending",
  });

  useEffect(() => {
    fetchDiamonds();

    const channel = supabase
      .channel('diamonds-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'diamonds' }, fetchDiamonds)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchDiamonds = async () => {
    const { data, error } = await supabase.from('diamonds').select('*').order('created_at', { ascending: false });
    if (!error && data) setDiamonds(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const diamondData = {
      name: formData.name,
      carat: parseFloat(formData.carat),
      color: formData.color,
      clarity: formData.clarity,
      price: parseFloat(formData.price),
      description: formData.description || null,
      image_url: formData.image_url || null,
      certification_status: formData.certification_status,
    };

    if (editingDiamond) {
      const { error } = await supabase.from('diamonds').update(diamondData).eq('id', editingDiamond.id);
      if (error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
        return;
      }
      toast({ title: "Success", description: "Diamond updated successfully" });
    } else {
      const { error } = await supabase.from('diamonds').insert([diamondData]);
      if (error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
        return;
      }
      toast({ title: "Success", description: "Diamond added successfully" });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (diamond: Diamond) => {
    setEditingDiamond(diamond);
    setFormData({
      name: diamond.name,
      carat: diamond.carat.toString(),
      color: diamond.color,
      clarity: diamond.clarity,
      price: diamond.price.toString(),
      description: diamond.description || "",
      image_url: diamond.image_url || "",
      certification_status: diamond.certification_status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this diamond?")) return;
    
    const { error } = await supabase.from('diamonds').delete().eq('id', id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    toast({ title: "Success", description: "Diamond deleted successfully" });
  };

  const resetForm = () => {
    setFormData({
      name: "", carat: "", color: "", clarity: "", price: "",
      description: "", image_url: "", certification_status: "pending",
    });
    setEditingDiamond(null);
  };

  const filteredDiamonds = diamonds.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.clarity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-premank-primary">Diamonds Management</h1>
            <p className="text-muted-foreground">Manage your diamond inventory</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-premank-primary hover:bg-premank-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Add Diamond
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-playfair text-premank-primary">
                  {editingDiamond ? "Edit Diamond" : "Add New Diamond"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Diamond Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="carat">Carat</Label>
                    <Input id="carat" type="number" step="0.01" value={formData.carat} onChange={(e) => setFormData({...formData, carat: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="clarity">Clarity</Label>
                    <Input id="clarity" value={formData.clarity} onChange={(e) => setFormData({...formData, clarity: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="certification_status">Status</Label>
                    <Input id="certification_status" value={formData.certification_status} onChange={(e) => setFormData({...formData, certification_status: e.target.value})} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input id="image_url" type="url" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} />
                </div>
                <Button type="submit" className="w-full bg-premank-primary hover:bg-premank-primary/90">
                  {editingDiamond ? "Update Diamond" : "Add Diamond"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search diamonds by name, color, or clarity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Carat</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Clarity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiamonds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No diamonds found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDiamonds.map((diamond) => (
                  <TableRow key={diamond.id}>
                    <TableCell className="font-medium">{diamond.name}</TableCell>
                    <TableCell>{diamond.carat}</TableCell>
                    <TableCell>{diamond.color}</TableCell>
                    <TableCell>{diamond.clarity}</TableCell>
                    <TableCell>${diamond.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        diamond.certification_status === 'certified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {diamond.certification_status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(diamond)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(diamond.id)}>
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

export default Diamonds;
