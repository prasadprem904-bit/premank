import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RotateCcw, Download, X, ZoomIn, ZoomOut, Move, Sparkles, Hand, FlipHorizontal, Scan, Loader2 } from "lucide-react";
import { Card } from "./ui/card";
import { LuxuryButton } from "./ui/luxury-button";
import { toast } from "sonner";
import diamondRingImage from "@/assets/diamond-ring.jpg";
import { useHandDetection } from "@/hooks/useHandDetection";

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
  const [aiTrackingEnabled, setAiTrackingEnabled] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // AI Hand Detection Hook
  const {
    ringFingerPosition,
    isModelLoading,
    isModelReady,
    handDetected
  } = useHandDetection({
    videoRef,
    containerRef,
    enabled: aiTrackingEnabled && !isLoading && !manualOverride,
    isMirrored
  });

  // Update ring position when AI detects hand
  useEffect(() => {
    if (aiTrackingEnabled && handDetected && ringFingerPosition && !manualOverride) {
      setRingPosition({
        x: ringFingerPosition.x,
        y: ringFingerPosition.y
      });
    }
  }, [aiTrackingEnabled, handDetected, ringFingerPosition, manualOverride]);

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
      toast.success("📸 AR Camera activated!");
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

  const toggleAITracking = () => {
    if (!aiTrackingEnabled) {
      setAiTrackingEnabled(true);
      setManualOverride(false);
      toast.success("🤖 AI Hand Detection enabled! Show your hand to the camera.");
    } else {
      setAiTrackingEnabled(false);
      toast.info("AI tracking disabled. Drag to position manually.");
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
    // If AI tracking is enabled and user starts dragging, enable manual override
    if (aiTrackingEnabled) {
      setManualOverride(true);
    }
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
  }, [aiTrackingEnabled]);

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
    setManualOverride(false);
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
            {aiTrackingEnabled && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                <Scan className="w-3 h-3" />
                AI Active
              </span>
            )}
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

      {/* AI Status Bar */}
      <AnimatePresence>
        {aiTrackingEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 z-20"
          >
            <div className={`p-3 rounded-xl backdrop-blur-md ${
              handDetected 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-amber-500/20 border border-amber-500/30'
            }`}>
              <div className="flex items-center gap-2">
                {isModelLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                    <span className="text-white text-sm">Loading AI model...</span>
                  </>
                ) : handDetected ? (
                  <>
                    <Hand className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">
                      ✓ Hand detected - Ring finger tracked
                    </span>
                    {manualOverride && (
                      <span className="text-white/60 text-xs ml-auto">(Manual override)</span>
                    )}
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="text-amber-400 text-sm">
                      Show your hand to the camera...
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              transition={{ 
                type: "spring", 
                stiffness: aiTrackingEnabled && handDetected ? 400 : 300, 
                damping: aiTrackingEnabled && handDetected ? 30 : 25 
              }}
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
                    filter: `drop-shadow(0 0 30px rgba(255,215,0,0.6)) drop-shadow(0 0 60px rgba(255,215,0,0.3)) ${handDetected && aiTrackingEnabled ? 'drop-shadow(0 0 15px rgba(34,197,94,0.4))' : ''}`,
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
                {/* AI Tracking Indicator */}
                {aiTrackingEnabled && handDetected && !manualOverride && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500/80 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                    AI Tracking
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag Indicator */}
        <AnimatePresence>
          {showGuide && !isLoading && !aiTrackingEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="bg-black/70 backdrop-blur-sm px-6 py-4 rounded-2xl text-center">
                <Hand className="w-8 h-8 text-accent mx-auto mb-2 animate-bounce" />
                <p className="text-white text-sm">Drag to position or enable AI tracking</p>
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
        {/* AI Tracking Toggle */}
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleAITracking}
            disabled={isModelLoading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              aiTrackingEnabled 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                : 'bg-white/20 text-white hover:bg-white/30'
            } ${isModelLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isModelLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading AI...
              </>
            ) : (
              <>
                <Scan className="w-4 h-4" />
                {aiTrackingEnabled ? '🤖 AI Hand Detection ON' : 'Enable AI Hand Detection'}
              </>
            )}
          </button>
        </div>

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
          {aiTrackingEnabled 
            ? '🤖 AI tracks your ring finger • Drag to override • Good lighting = best detection'
            : '💡 Enable AI for auto-tracking • Drag manually • Good lighting = best results'
          }
        </p>
      </div>
    </motion.div>
  );
};
