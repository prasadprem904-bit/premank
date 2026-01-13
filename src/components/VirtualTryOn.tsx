import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RotateCcw, Download, X, ZoomIn, ZoomOut, Move, Sparkles, Hand, FlipHorizontal } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { toast } from "sonner";
import diamondRingImage from "@/assets/diamond-ring.jpg";

interface VirtualTryOnProps {
  diamondName: string;
  diamondImage: string;
  onClose: () => void;
}

export const VirtualTryOn = ({ diamondName, diamondImage, onClose }: VirtualTryOnProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ringPosition, setRingPosition] = useState({ x: 50, y: 70 });
  const [ringScale, setRingScale] = useState(1);
  const [ringRotation, setRingRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showRing, setShowRing] = useState(true);
  const [isMirrored, setIsMirrored] = useState(true);
  const [activeImage, setActiveImage] = useState<'diamond' | 'ring'>('ring');
  const [showGuide, setShowGuide] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
        };
      }
      toast.success("📸 AR Camera activated! Position your hand and drag the diamond.");
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Unable to access camera. Please check permissions.");
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        if (isMirrored) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(video, 0, 0);
        
        if (isMirrored) {
          context.setTransform(1, 0, 0, 1, 0, 0);
        }
        
        // Draw the ring overlay
        if (showRing) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = activeImage === 'ring' ? diamondRingImage : diamondImage;
          
          img.onload = () => {
            const ringWidth = 200 * ringScale;
            const ringHeight = 200 * ringScale;
            const xPos = (ringPosition.x / 100) * canvas.width - ringWidth / 2;
            const yPos = (ringPosition.y / 100) * canvas.height - ringHeight / 2;
            
            context.save();
            context.translate(xPos + ringWidth / 2, yPos + ringHeight / 2);
            context.rotate((ringRotation * Math.PI) / 180);
            context.drawImage(img, -ringWidth / 2, -ringHeight / 2, ringWidth, ringHeight);
            context.restore();
            
            const imageData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `${diamondName}-AR-tryon-${Date.now()}.png`;
            link.href = imageData;
            link.click();
            
            toast.success("✨ AR photo captured successfully!");
          };
        } else {
          const imageData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = `${diamondName}-AR-tryon-${Date.now()}.png`;
          link.href = imageData;
          link.click();
          toast.success("Photo captured!");
        }
      }
    }
  };

  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    setRingPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleZoomIn = () => setRingScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setRingScale(prev => Math.max(prev - 0.2, 0.3));
  const handleRotateLeft = () => setRingRotation(prev => prev - 15);
  const handleRotateRight = () => setRingRotation(prev => prev + 15);

  const handleReset = () => {
    setRingPosition({ x: 50, y: 70 });
    setRingScale(1);
    setRingRotation(0);
    setShowRing(true);
    toast.info("AR view reset");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-white font-playfair font-semibold">AR Try-On</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/70 text-sm mt-1">{diamondName}</p>
      </div>

      {/* Camera View */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white">Initializing AR Camera...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
        />
        
        {/* AR Diamond/Ring Overlay */}
        <AnimatePresence>
          {showRing && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: `calc(${ringPosition.x}vw - 50%)`,
                y: `calc(${ringPosition.y}vh - 50%)`
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                transform: `translate(${ringPosition.x}%, ${ringPosition.y}%) rotate(${ringRotation}deg) scale(${ringScale})`,
                left: `${ringPosition.x}%`,
                top: `${ringPosition.y}%`,
                marginLeft: '-4rem',
                marginTop: '-4rem'
              }}
            >
              <div className="relative">
                <img
                  src={activeImage === 'ring' ? diamondRingImage : diamondImage}
                  alt={diamondName}
                  className="w-32 h-32 object-contain"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(255,215,0,0.6)) drop-shadow(0 0 60px rgba(255,215,0,0.3))",
                    transform: `rotate(${ringRotation}deg) scale(${ringScale})`,
                  }}
                />
                {/* Sparkle Effects */}
                <div className="absolute -top-2 -right-2 w-4 h-4 animate-pulse">
                  <Sparkles className="w-full h-full text-accent" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 animate-pulse delay-300">
                  <Sparkles className="w-full h-full text-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag Indicator */}
        <AnimatePresence>
          {showGuide && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="bg-black/70 backdrop-blur-sm px-6 py-4 rounded-2xl text-center">
                <Hand className="w-8 h-8 text-accent mx-auto mb-2 animate-bounce" />
                <p className="text-white text-sm">Drag to position the diamond</p>
                <p className="text-white/60 text-xs mt-1">Use controls to resize & rotate</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Canvas for Capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Control Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-8 px-4">
        {/* Quick Controls */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={handleZoomOut}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-95"
          >
            <ZoomOut className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-95"
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleRotateLeft}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-3 rounded-full transition-all active:scale-95 ${isMirrored ? 'bg-accent/50' : 'bg-white/20 hover:bg-white/30'}`}
          >
            <FlipHorizontal className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setShowRing(!showRing)}
            className={`p-3 rounded-full transition-all active:scale-95 ${showRing ? 'bg-accent/50' : 'bg-white/20 hover:bg-white/30'}`}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Image Toggle */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setActiveImage('ring')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeImage === 'ring' 
                ? 'bg-accent text-black' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            💍 Ring View
          </button>
          <button
            onClick={() => setActiveImage('diamond')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeImage === 'diamond' 
                ? 'bg-accent text-black' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            💎 Diamond View
          </button>
        </div>

        {/* Main Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-95"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={handleCapture}
            className="p-5 bg-accent hover:bg-accent/90 rounded-full transition-all active:scale-95 shadow-lg shadow-accent/30"
          >
            <Camera className="w-8 h-8 text-black" />
          </button>
          
          <button
            onClick={onClose}
            className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-95"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Tips */}
        <p className="text-white/50 text-xs text-center mt-4">
          💡 Drag the diamond • Pinch to zoom • Good lighting = best results
        </p>
      </div>
    </motion.div>
  );
};
