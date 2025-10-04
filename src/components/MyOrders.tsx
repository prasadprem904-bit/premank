import { motion } from "framer-motion";
import { ArrowLeft, Package, Calendar, Clock, ShoppingBag, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LuxuryButton } from "./ui/luxury-button";
import { Separator } from "./ui/separator";

interface Order {
  orderId: string;
  diamond: {
    id: string;
    name: string;
    price: number;
    carat: number;
    cut: string;
    color: string;
    clarity: string;
    image: string;
  };
  orderDate: string;
  estimatedDelivery: string;
  deliveryTimeFrom: string;
  deliveryTimeTo: string;
  status: string;
  paymentMethod: string;
  amount: number;
}

interface MyOrdersProps {
  onBack: () => void;
}

export const MyOrders = ({ onBack }: MyOrdersProps) => {
  // Get orders from localStorage
  const getOrders = (): Order[] => {
    const ordersData = localStorage.getItem('dno_orders');
    if (ordersData) {
      try {
        return JSON.parse(ordersData);
      } catch (error) {
        console.error('Failed to parse orders data');
        return [];
      }
    }
    return [];
  };

  const orders = getOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-500/10 text-blue-500';
      case 'In Transit':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'Delivered':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-accent/10 text-accent';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/95 backdrop-blur-sm border-b border-accent/20 shadow-luxury sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <LuxuryButton 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 text-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </LuxuryButton>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track and manage your diamond purchases
            </p>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-16 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury text-center">
                <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                  No Orders Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your order history is empty. Start shopping for beautiful diamonds!
                </p>
                <LuxuryButton variant="luxury" onClick={onBack}>
                  Browse Diamonds
                </LuxuryButton>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 shadow-luxury hover:shadow-2xl transition-shadow">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Diamond Image & Details */}
                      <div className="md:col-span-2">
                        <div className="flex gap-4">
                          <div className="diamond-shine rounded-lg overflow-hidden w-32 h-32 flex-shrink-0">
                            <img
                              src={order.diamond.image}
                              alt={order.diamond.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-playfair font-bold text-foreground">
                                  {order.diamond.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Order ID: <span className="font-mono text-accent">{order.orderId}</span>
                                </p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                              <div>
                                <span className="text-muted-foreground">Carat: </span>
                                <span className="text-foreground font-semibold">{order.diamond.carat} CT</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cut: </span>
                                <span className="text-foreground font-semibold">{order.diamond.cut}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Color: </span>
                                <span className="text-foreground font-semibold">{order.diamond.color}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Clarity: </span>
                                <span className="text-foreground font-semibold">{order.diamond.clarity}</span>
                              </div>
                            </div>

                            <Separator className="my-3" />

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="text-sm font-semibold text-foreground">{order.paymentMethod}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total Amount</p>
                                <p className="text-2xl font-playfair font-bold text-accent">
                                  ₹{order.amount.toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Information */}
                      <div className="space-y-4">
                        <div className="p-4 bg-background/50 rounded-lg border border-accent/20">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-accent" />
                            <h4 className="font-semibold text-foreground text-sm">Order Date</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                        </div>

                        <div className="p-4 bg-background/50 rounded-lg border border-accent/20">
                          <div className="flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-accent" />
                            <h4 className="font-semibold text-foreground text-sm">Expected Delivery</h4>
                          </div>
                          <p className="text-sm font-semibold text-foreground mb-2">
                            {order.estimatedDelivery}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{order.deliveryTimeFrom} - {order.deliveryTimeTo}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-background/50 rounded-lg border border-accent/20">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            <h4 className="font-semibold text-foreground text-sm">Delivery Info</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Free premium delivery with secure packaging
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
