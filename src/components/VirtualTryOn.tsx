import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, RotateCcw, Download, X } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { toast } from "sonner";

interface VirtualTryOnProps {
  diamondName: string;
  diamondImage: string;
  onClose: () => void;
}

export const VirtualTryOn = ({ diamondName, diamondImage, onClose }: VirtualTryOnProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showRing, setShowRing] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      toast.success("Camera activated! Position your hand to try on the diamond.");
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${diamondName}-virtual-tryon.png`;
        link.href = imageData;
        link.click();
        
        toast.success("Photo captured successfully!");
      }
    }
  };

  const handleReset = () => {
    setShowRing(false);
    setTimeout(() => setShowRing(true), 100);
    toast.info("Virtual try-on reset");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <Card className="relative w-full max-w-4xl bg-card/95 backdrop-blur-sm border-accent/20 shadow-luxury p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-accent/20 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
            Virtual Try-On
          </h2>
          <p className="text-muted-foreground">
            See how {diamondName} looks on you
          </p>
        </div>

        {/* Camera View */}
        <div className="relative rounded-xl overflow-hidden bg-black mb-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-[500px] object-cover"
          />
          
          {/* Virtual Ring Overlay */}
          {showRing && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="relative">
                <img
                  src={diamondImage}
                  alt={diamondName}
                  className="w-32 h-32 object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255,215,0,0.5))",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent blur-xl"></div>
              </div>
            </motion.div>
          )}

          {/* Guidance Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">
              📱 Position your hand in the camera frame
            </p>
          </div>

          {/* Hidden Canvas for Capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center">
          <LuxuryButton
            variant="luxury"
            size="lg"
            onClick={handleCapture}
            className="gap-2"
          >
            <Camera className="w-5 h-5" />
            Capture Photo
          </LuxuryButton>
          
          <LuxuryButton
            variant="luxury-outline"
            size="lg"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </LuxuryButton>

          <LuxuryButton
            variant="luxury-outline"
            size="lg"
            onClick={onClose}
          >
            Close
          </LuxuryButton>
        </div>

        {/* Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Tip: For best results, use good lighting and hold your hand steady
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
