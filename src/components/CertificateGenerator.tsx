import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Download } from "lucide-react";
import { LuxuryButton } from "./ui/luxury-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { toast } from "sonner";
import dnoLogo from "@/assets/dno-logo.png";

interface CertificateGeneratorProps {
  onBack: () => void;
}

export const CertificateGenerator = ({ onBack }: CertificateGeneratorProps) => {
  const [formData, setFormData] = useState({
    diamondName: "",
    price: "",
    customerName: "",
    email: "",
  });
  const [certificate, setCertificate] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateCertificate = () => {
    if (!formData.diamondName || !formData.price || !formData.customerName || !formData.email) {
      toast.error("Please fill in all fields to generate certificate");
      return;
    }

    const certData = {
      ...formData,
      certificateNumber: `DNO-CERT-${Date.now().toString(36).toUpperCase()}`,
      issueDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setCertificate(certData);
    toast.success("Certificate generated successfully!");
  };

  const downloadCertificate = () => {
    toast.success("Certificate download will be available soon!", {
      description: "We'll send the certificate to your email address",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LuxuryButton variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </LuxuryButton>
            <div className="flex items-center gap-3">
              <img src={dnoLogo} alt="D&O Collections" className="w-10 h-10 object-contain" />
              <h1 className="text-2xl font-playfair font-bold text-accent">D&O Collections</h1>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Award className="w-16 h-16 text-accent mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-accent mb-4">
              Diamond Certificate Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Get your certified diamond purchase certificate instantly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="p-6 space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Purchase Details</Label>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Diamond Name</Label>
                    <Input
                      placeholder="e.g., Royal Brilliance"
                      value={formData.diamondName}
                      onChange={(e) => handleInputChange("diamondName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Purchase Price (₹)</Label>
                    <Input
                      placeholder="e.g., 250000"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <Label className="text-lg font-semibold block">Customer Information</Label>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Full Name</Label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <LuxuryButton
                variant="luxury"
                size="lg"
                className="w-full"
                onClick={generateCertificate}
              >
                <Award className="w-5 h-5 mr-2" />
                Generate Certificate
              </LuxuryButton>
            </Card>

            {/* Certificate Preview */}
            <div>
              {!certificate ? (
                <Card className="p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Fill in the details to generate your certificate
                    </p>
                  </div>
                </Card>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Card className="p-8 bg-gradient-to-br from-card to-secondary/20 border-2 border-accent/50 shadow-gold">
                    <div className="text-center mb-6">
                      <img src={dnoLogo} alt="D&O Collections" className="w-16 h-16 mx-auto mb-3" />
                      <h2 className="text-2xl font-playfair font-bold text-accent mb-1">
                        D&O Collections
                      </h2>
                      <p className="text-sm text-muted-foreground">Certificate of Authenticity</p>
                    </div>

                    <div className="border-t border-b border-accent/30 py-6 my-6 space-y-4">
                      <div className="text-center mb-4">
                        <div className="inline-block bg-accent/10 px-4 py-2 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Certificate No.</p>
                          <p className="font-mono font-semibold text-accent">
                            {certificate.certificateNumber}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Diamond:</span>
                          <span className="font-semibold">{certificate.diamondName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Purchase Price:</span>
                          <span className="font-semibold">
                            ₹{parseInt(certificate.price).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Customer:</span>
                          <span className="font-semibold">{certificate.customerName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Issue Date:</span>
                          <span className="font-semibold">{certificate.issueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-xs text-muted-foreground mb-6">
                      <p>This certificate verifies the authenticity and purchase of the above diamond.</p>
                      <p className="mt-1">Valid for lifetime • Internationally Recognized</p>
                    </div>

                    <LuxuryButton
                      variant="luxury-outline"
                      size="sm"
                      className="w-full"
                      onClick={downloadCertificate}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </LuxuryButton>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                      A copy has been sent to: {certificate.email}
                    </p>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
