import { motion } from "framer-motion";
import { Home, Heart, Calendar, User } from "lucide-react";

type NavItem = "home" | "wishlist" | "appointments" | "profile";

interface MobileBottomNavProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
}

export const MobileBottomNav = ({ activeItem, onNavigate }: MobileBottomNavProps) => {
  const navItems = [
    { id: "home" as NavItem, icon: Home, label: "Home" },
    { id: "wishlist" as NavItem, icon: Heart, label: "Wishlist" },
    { id: "appointments" as NavItem, icon: Calendar, label: "Appointments" },
    { id: "profile" as NavItem, icon: User, label: "Profile" },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Glassmorphism background */}
      <div className="bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around px-3 py-3 pb-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center min-w-[60px] min-h-[56px] rounded-xl transition-colors"
                whileTap={{ scale: 0.92 }}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Icon with glow effect when active */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0 
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative"
                >
                  {isActive && (
                    <div className="absolute inset-0 blur-md bg-primary/40 rounded-full" />
                  )}
                  <item.icon
                    className={`relative w-6 h-6 ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`}
                    fill={isActive ? "currentColor" : "none"}
                    strokeWidth={isActive ? 1.5 : 2}
                  />
                </motion.div>
                
                {/* Label */}
                <span
                  className={`mt-1 text-[10px] font-medium transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
