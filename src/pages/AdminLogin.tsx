import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Gem, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, isAdmin, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
      setIsLoading(false);
      return;
    }

    // Wait a moment for admin check to complete
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-premank-bg to-premank-accent/20">
        <Loader2 className="h-8 w-8 animate-spin text-premank-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-premank-bg to-premank-accent/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-premank-accent/30">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-premank-primary to-premank-accent rounded-full flex items-center justify-center mb-2">
            <Gem className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-playfair text-premank-primary">
            💎 Premank Admin
          </CardTitle>
          <CardDescription className="text-base">
            Secure login for authorized administrators only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-premank-primary font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@premankjewellery.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-premank-accent/50 focus:border-premank-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-premank-primary font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-premank-accent/50 focus:border-premank-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-premank-primary hover:bg-premank-primary/90 text-white font-medium py-6 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In to Admin Panel"
              )}
            </Button>
          </form>
          <p className="text-xs text-center mt-6 text-muted-foreground">
            Access restricted to authorized Premank administrators
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
