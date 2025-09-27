import React from "react";
import { useSound } from "@/hooks/useSound";

interface SoundButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  soundType?: 'button' | 'icon' | 'sparkle';
  disabled?: boolean;
  [key: string]: any;
}

export const SoundButton = ({ 
  children, 
  onClick, 
  className = "", 
  soundType = 'button',
  disabled = false,
  ...props 
}: SoundButtonProps) => {
  const { playButtonClick, playIconClick, playDiamondSparkle } = useSound();

  const handleClick = () => {
    if (disabled) return;
    
    switch (soundType) {
      case 'icon':
        playIconClick();
        break;
      case 'sparkle':
        playDiamondSparkle();
        break;
      default:
        playButtonClick();
        break;
    }
    
    onClick?.();
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};