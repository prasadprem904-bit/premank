import { useState, useRef, useCallback, useEffect } from 'react';

interface GestureState {
  scale: number;
  rotation: number;
  position: { x: number; y: number };
}

interface UseGestureControlsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  initialScale?: number;
  initialRotation?: number;
  initialPosition?: { x: number; y: number };
  onScaleChange?: (scale: number) => void;
  onRotationChange?: (rotation: number) => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
}

interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export const useGestureControls = ({
  containerRef,
  initialScale = 1,
  initialRotation = 0,
  initialPosition = { x: 50, y: 70 },
  onScaleChange,
  onRotationChange,
  onPositionChange,
  onSwipeLeft,
  onSwipeRight,
  enabled = true
}: UseGestureControlsProps) => {
  const [gestureState, setGestureState] = useState<GestureState>({
    scale: initialScale,
    rotation: initialRotation,
    position: initialPosition
  });

  const [isPinching, setIsPinching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const touchPointsRef = useRef<TouchPoint[]>([]);
  const initialPinchDistanceRef = useRef<number>(0);
  const initialPinchAngleRef = useRef<number>(0);
  const initialScaleRef = useRef<number>(initialScale);
  const initialRotationRef = useRef<number>(initialRotation);
  const swipeStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastPositionRef = useRef<{ x: number; y: number }>(initialPosition);

  // Calculate distance between two touch points
  const getDistance = useCallback((p1: TouchPoint, p2: TouchPoint): number => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Calculate angle between two touch points
  const getAngle = useCallback((p1: TouchPoint, p2: TouchPoint): number => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;

    const touches = Array.from(e.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY
    }));

    touchPointsRef.current = touches;

    if (touches.length === 1) {
      // Single touch - prepare for drag or swipe
      swipeStartRef.current = {
        x: touches[0].x,
        y: touches[0].y,
        time: Date.now()
      };
      setIsDragging(true);
    } else if (touches.length === 2) {
      // Two-finger touch - prepare for pinch zoom or rotate
      setIsDragging(false);
      setIsPinching(true);
      setIsRotating(true);
      
      initialPinchDistanceRef.current = getDistance(touches[0], touches[1]);
      initialPinchAngleRef.current = getAngle(touches[0], touches[1]);
      initialScaleRef.current = gestureState.scale;
      initialRotationRef.current = gestureState.rotation;
    }
  }, [enabled, gestureState.scale, gestureState.rotation, getDistance, getAngle]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || !containerRef.current) return;

    const touches = Array.from(e.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY
    }));

    if (touches.length === 1 && isDragging) {
      // Single finger drag
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((touches[0].x - rect.left) / rect.width) * 100;
      const y = ((touches[0].y - rect.top) / rect.height) * 100;

      const newPosition = {
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y))
      };

      setGestureState(prev => ({ ...prev, position: newPosition }));
      lastPositionRef.current = newPosition;
      onPositionChange?.(newPosition);
    } else if (touches.length === 2 && (isPinching || isRotating)) {
      // Two-finger gestures
      const currentDistance = getDistance(touches[0], touches[1]);
      const currentAngle = getAngle(touches[0], touches[1]);

      // Pinch to zoom
      if (isPinching && initialPinchDistanceRef.current > 0) {
        const scaleChange = currentDistance / initialPinchDistanceRef.current;
        const newScale = Math.max(0.3, Math.min(3, initialScaleRef.current * scaleChange));
        
        setGestureState(prev => ({ ...prev, scale: newScale }));
        onScaleChange?.(newScale);
      }

      // Two-finger rotate
      if (isRotating) {
        const angleDelta = currentAngle - initialPinchAngleRef.current;
        const newRotation = initialRotationRef.current + angleDelta;
        
        setGestureState(prev => ({ ...prev, rotation: newRotation }));
        onRotationChange?.(newRotation);
      }
    }

    touchPointsRef.current = touches;
  }, [enabled, containerRef, isDragging, isPinching, isRotating, getDistance, getAngle, onPositionChange, onScaleChange, onRotationChange]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;

    const remainingTouches = Array.from(e.touches).length;

    if (remainingTouches === 0) {
      // Check for swipe gesture
      if (swipeStartRef.current && isDragging) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - swipeStartRef.current.x;
        const deltaY = touch.clientY - swipeStartRef.current.y;
        const deltaTime = Date.now() - swipeStartRef.current.time;

        // Detect horizontal swipe (fast, mostly horizontal movement)
        if (deltaTime < 300 && Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      }

      setIsDragging(false);
      setIsPinching(false);
      setIsRotating(false);
      swipeStartRef.current = null;
    } else if (remainingTouches === 1) {
      // One finger remains - switch to drag mode
      setIsPinching(false);
      setIsRotating(false);
      setIsDragging(true);
    }

    touchPointsRef.current = Array.from(e.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY
    }));
  }, [enabled, isDragging, onSwipeLeft, onSwipeRight]);

  // Reset gesture state
  const resetGesture = useCallback(() => {
    setGestureState({
      scale: initialScale,
      rotation: initialRotation,
      position: initialPosition
    });
    lastPositionRef.current = initialPosition;
    initialScaleRef.current = initialScale;
    initialRotationRef.current = initialRotation;
  }, [initialScale, initialRotation, initialPosition]);

  // Update gesture state from external sources
  const updatePosition = useCallback((position: { x: number; y: number }) => {
    setGestureState(prev => ({ ...prev, position }));
    lastPositionRef.current = position;
  }, []);

  const updateScale = useCallback((scale: number) => {
    setGestureState(prev => ({ ...prev, scale }));
    initialScaleRef.current = scale;
  }, []);

  const updateRotation = useCallback((rotation: number) => {
    setGestureState(prev => ({ ...prev, rotation }));
    initialRotationRef.current = rotation;
  }, []);

  return {
    gestureState,
    isPinching,
    isDragging,
    isRotating,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetGesture,
    updatePosition,
    updateScale,
    updateRotation
  };
};
