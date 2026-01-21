import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RotateCcw, X, ZoomIn, ZoomOut, Sparkles, Hand, FlipHorizontal, Scan, Loader2, Maximize2, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import diamondRingImage from "@/assets/diamond-ring.jpg";
import { useHandDetection } from "@/hooks/useHandDetection";
import { useGestureControls } from "@/hooks/useGestureControls";

// Import diamond images for swipe gallery
import diamond05 from "@/assets/diamond-0.5-carat.jpg";
import diamond1 from "@/assets/diamond-1-carat.jpg";
import diamond15 from "@/assets/diamond-1.5-carat.jpg";
import diamond2 from "@/assets/diamond-2-carat.jpg";

interface VirtualTryOnProps {
  diamondName: string;
  diamondImage: string;
  onClose: () => void;
}

const ringDesigns = [
  { id: 'ring', name: 'Classic Ring', image: diamondRingImage },
  { id: 'diamond-05', name: '0.5 Carat', image: diamond05 },
  { id: 'diamond-1', name: '1 Carat', image: diamond1 },
  { id: 'diamond-15', name: '1.5 Carat', image: diamond15 },
  { id: 'diamond-2', name: '2 Carat', image: diamond2 },
];

export const VirtualTryOn = ({ diamondName, diamondImage, onClose }: VirtualTryOnProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRing, setShowRing] = useState(true);
  const [isMirrored, setIsMirrored] = useState(true);
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [aiTrackingEnabled, setAiTrackingEnabled] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);
  const [showGestureHint, setShowGestureHint] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get current design
  const currentDesign = ringDesigns[currentDesignIndex];

  // Handle design change via swipe
  const handleNextDesign = useCallback(() => {
    setCurrentDesignIndex(prev => (prev + 1) % ringDesigns.length);
    toast.success(`💍 ${ringDesigns[(currentDesignIndex + 1) % ringDesigns.length].name}`);
  }, [currentDesignIndex]);

  const handlePrevDesign = useCallback(() => {
    setCurrentDesignIndex(prev => (prev - 1 + ringDesigns.length) % ringDesigns.length);
    toast.success(`💍 ${ringDesigns[(currentDesignIndex - 1 + ringDesigns.length) % ringDesigns.length].name}`);
  }, [currentDesignIndex]);

  // Gesture controls
  const {
    gestureState,
    isPinching,
    isRotating,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetGesture,
    updatePosition,
    updateScale,
    updateRotation
  } = useGestureControls({
    containerRef,
    initialScale: 1,
    initialRotation: 0,
    initialPosition: { x: 50, y: 70 },
    onScaleChange: (scale) => {
      if (aiTrackingEnabled) setManualOverride(true);
    },
    onRotationChange: (rotation) => {
      if (aiTrackingEnabled) setManualOverride(true);
    },
    onPositionChange: (position) => {
      if (aiTrackingEnabled) setManualOverride(true);
    },
    onSwipeLeft: handleNextDesign,
    onSwipeRight: handlePrevDesign,
    enabled: !isLoading
  });

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

  // Update position when AI detects hand
  useEffect(() => {
    if (aiTrackingEnabled && handDetected && ringFingerPosition && !manualOverride) {
      updatePosition({
        x: ringFingerPosition.x,
        y: ringFingerPosition.y
      });
    }
  }, [aiTrackingEnabled, handDetected, ringFingerPosition, manualOverride, updatePosition]);

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

  useEffect(() => {
    const timer = setTimeout(() => setShowGestureHint(false), 8000);
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
      toast.success("🤖 AI Hand Detection enabled!");
    } else {
      setAiTrackingEnabled(false);
      toast.info("AI tracking disabled.");
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
        
        if (showRing) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = currentDesign.image;
          
          img.onload = () => {
            const ringWidth = 200 * gestureState.scale;
            const ringHeight = 200 * gestureState.scale;
            const xPos = (gestureState.position.x / 100) * canvas.width - ringWidth / 2;
            const yPos = (gestureState.position.y / 100) * canvas.height - ringHeight / 2;
            
            context.save();
            context.translate(xPos + ringWidth / 2, yPos + ringHeight / 2);
            context.rotate((gestureState.rotation * Math.PI) / 180);
            context.drawImage(img, -ringWidth / 2, -ringHeight / 2, ringWidth, ringHeight);
            context.restore();
            
            const imageData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `${diamondName}-AR-tryon-${Date.now()}.png`;
            link.href = imageData;
            link.click();
            
            toast.success("✨ AR photo captured!");
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

  const handleReset = () => {
    resetGesture();
    setShowRing(true);
    setManualOverride(false);
    toast.info("AR view reset");
  };

  const handleZoomIn = () => updateScale(Math.min(gestureState.scale + 0.2, 3));
  const handleZoomOut = () => updateScale(Math.max(gestureState.scale - 0.2, 0.3));
  const handleRotateLeft = () => updateRotation(gestureState.rotation - 15);
  const handleRotateRight = () => updateRotation(gestureState.rotation + 15);

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
                AI
              </span>
            )}
            {(isPinching || isRotating) && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                {isPinching && <Maximize2 className="w-3 h-3" />}
                {isRotating && <RotateCw className="w-3 h-3" />}
                Gesture
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
        <p className="text-white/70 text-sm mt-1">{currentDesign.name}</p>
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
                      ✓ Hand detected
                    </span>
                    {manualOverride && (
                      <span className="text-white/60 text-xs ml-auto">(Manual)</span>
                    )}
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span className="text-amber-400 text-sm">
                      Show your hand...
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gesture Hint Overlay */}
      <AnimatePresence>
        {showGestureHint && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-32 left-4 right-4 z-20"
          >
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="flex justify-center gap-6 text-white/80 text-xs">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <span className="text-lg">👆👆</span>
                  </div>
                  <span>Pinch to Zoom</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <span className="text-lg">🔄</span>
                  </div>
                  <span>Two-finger Rotate</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <span className="text-lg">👈👉</span>
                  </div>
                  <span>Swipe Designs</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera View with Gesture Handlers */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
        <AnimatePresence mode="wait">
          {showRing && !isLoading && (
            <motion.div
              key={currentDesign.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: aiTrackingEnabled && handDetected ? 400 : 300, 
                damping: aiTrackingEnabled && handDetected ? 30 : 25 
              }}
              className="absolute pointer-events-none"
              style={{
                left: `${gestureState.position.x}%`,
                top: `${gestureState.position.y}%`,
                transform: `translate(-50%, -50%) rotate(${gestureState.rotation}deg) scale(${gestureState.scale})`
              }}
            >
              <div className="relative">
                <img
                  src={currentDesign.image}
                  alt={currentDesign.name}
                  className="w-32 h-32 object-contain"
                  style={{
                    filter: `drop-shadow(0 0 30px rgba(255,215,0,0.6)) drop-shadow(0 0 60px rgba(255,215,0,0.3)) ${handDetected && aiTrackingEnabled ? 'drop-shadow(0 0 15px rgba(34,197,94,0.4))' : ''}`
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

        {/* Swipe Indicators */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handlePrevDesign}
            className="p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleNextDesign}
            className="p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Design Indicator Dots */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {ringDesigns.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDesignIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentDesignIndex 
                  ? 'bg-accent w-6' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Drag Guide */}
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
                <p className="text-white text-sm">Drag to position</p>
                <p className="text-white/60 text-xs mt-1">Pinch to zoom • Swipe for designs</p>
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
                {aiTrackingEnabled ? '🤖 AI ON' : 'Enable AI'}
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
            onClick={handleRotateRight}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all active:scale-95"
          >
            <RotateCw className="w-5 h-5 text-white" />
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
          👆 Pinch to zoom • 🔄 Two-finger rotate • 👈👉 Swipe to change designs
        </p>
      </div>
    </motion.div>
  );
};
