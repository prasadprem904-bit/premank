import { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

interface HandPosition {
  x: number;
  y: number;
  confidence: number;
}

interface UseHandDetectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  enabled: boolean;
  isMirrored: boolean;
}

export const useHandDetection = ({
  videoRef,
  containerRef,
  enabled,
  isMirrored
}: UseHandDetectionProps) => {
  const [ringFingerPosition, setRingFingerPosition] = useState<HandPosition | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  
  const detectorRef = useRef<handPoseDetection.HandDetector | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  // Initialize TensorFlow and hand detection model
  const initializeModel = useCallback(async () => {
    if (detectorRef.current || isModelLoading) return;
    
    setIsModelLoading(true);
    
    try {
      // Initialize TensorFlow.js
      await tf.ready();
      await tf.setBackend('webgl');
      
      console.log('TensorFlow.js initialized with backend:', tf.getBackend());
      
      // Create hand detector with MediaPipe Hands model using TFJS runtime
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: 'tfjs' as const,
        modelType: 'lite' as const,
        maxHands: 1,
      };
      
      detectorRef.current = await handPoseDetection.createDetector(model, detectorConfig);
      setIsModelReady(true);
      console.log('Hand detection model loaded successfully');
    } catch (error) {
      console.error('Error loading hand detection model:', error);
    } finally {
      setIsModelLoading(false);
    }
  }, [isModelLoading]);

  // Detect hands in video frame
  const detectHands = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current || !containerRef.current) {
      return;
    }

    const video = videoRef.current;
    
    if (video.readyState < 2) {
      return;
    }

    try {
      const hands = await detectorRef.current.estimateHands(video, {
        flipHorizontal: isMirrored
      });

      if (hands.length > 0) {
        const hand = hands[0];
        setHandDetected(true);
        
        // Get ring finger tip position (index 16 in MediaPipe hand landmark model)
        // Finger indices: 0-4 (thumb), 5-8 (index), 9-12 (middle), 13-16 (ring), 17-20 (pinky)
        const ringFingerTip = hand.keypoints[16]; // Ring finger tip
        const ringFingerDip = hand.keypoints[15]; // Ring finger DIP joint
        
        if (ringFingerTip && ringFingerDip) {
          // Calculate position between tip and DIP joint for better ring placement
          const avgX = (ringFingerTip.x + ringFingerDip.x) / 2;
          const avgY = (ringFingerTip.y + ringFingerDip.y) / 2;
          
          // Convert to percentage of container
          const containerRect = containerRef.current.getBoundingClientRect();
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          
          // Calculate display dimensions maintaining aspect ratio
          const containerAspect = containerRect.width / containerRect.height;
          const videoAspect = videoWidth / videoHeight;
          
          let displayWidth, displayHeight, offsetX, offsetY;
          
          if (containerAspect > videoAspect) {
            // Container is wider - video is full height
            displayHeight = containerRect.height;
            displayWidth = displayHeight * videoAspect;
            offsetX = (containerRect.width - displayWidth) / 2;
            offsetY = 0;
          } else {
            // Container is taller - video is full width
            displayWidth = containerRect.width;
            displayHeight = displayWidth / videoAspect;
            offsetX = 0;
            offsetY = (containerRect.height - displayHeight) / 2;
          }
          
          // Map coordinates to container percentage
          const mappedX = ((avgX / videoWidth) * displayWidth + offsetX) / containerRect.width * 100;
          const mappedY = ((avgY / videoHeight) * displayHeight + offsetY) / containerRect.height * 100;
          
          // Get confidence score
          const confidence = ringFingerTip.score ?? 0.8;
          
          setRingFingerPosition({
            x: Math.max(5, Math.min(95, mappedX)),
            y: Math.max(5, Math.min(95, mappedY)),
            confidence
          });
        }
      } else {
        setHandDetected(false);
      }
    } catch (error) {
      console.error('Hand detection error:', error);
    }
  }, [videoRef, containerRef, isMirrored]);

  // Run detection loop
  const runDetectionLoop = useCallback(async () => {
    if (!enabled || !isModelReady || !isRunningRef.current) {
      return;
    }

    await detectHands();
    
    // Continue loop with requestAnimationFrame for smooth performance
    animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
  }, [enabled, isModelReady, detectHands]);

  // Start detection
  useEffect(() => {
    if (enabled && isModelReady) {
      isRunningRef.current = true;
      runDetectionLoop();
    }

    return () => {
      isRunningRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, isModelReady, runDetectionLoop]);

  // Initialize model when enabled
  useEffect(() => {
    if (enabled && !isModelReady && !isModelLoading) {
      initializeModel();
    }
  }, [enabled, isModelReady, isModelLoading, initializeModel]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (detectorRef.current) {
        detectorRef.current.dispose();
        detectorRef.current = null;
      }
    };
  }, []);

  return {
    ringFingerPosition,
    isModelLoading,
    isModelReady,
    handDetected,
    initializeModel
  };
};
