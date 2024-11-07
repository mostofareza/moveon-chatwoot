import { TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import { Tabs } from '@radix-ui/react-tabs';
import Dashboard from './dashboard';
import BuyAndShipOrders from './buy-and-ship-orders';
import ShipForMeOrders from './ship-for-me-orders';
import RFQ from './rfq';
import Cart from './cart';
import Wishlist from './wishlist';
import { Wallet } from 'lucide-react';


const IndexPage = () => (
  <div className="container py-4">
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="bg-green-primary gap-8 min-w-full">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="buyAndShipOrders">Buy & Ship Orders</TabsTrigger>
        <TabsTrigger value="shipForMeOrders">Ship For Me Orders</TabsTrigger>
        <TabsTrigger value="rfq">RFQ</TabsTrigger>
        <TabsTrigger value="cart">Cart</TabsTrigger>
        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        <TabsTrigger value="wallet">Wallet</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      <TabsContent value="buyAndShipOrders">
        <BuyAndShipOrders />
      </TabsContent>
      <TabsContent value="shipForMeOrders">
        <ShipForMeOrders />
      </TabsContent>
      <TabsContent value="rfq">
        <RFQ />
      </TabsContent>
      <TabsContent value="cart">
        <Cart />
      </TabsContent>
      <TabsContent value="wishlist">
        <Wishlist />
      </TabsContent>
      <TabsContent value="wallet">
        <Wallet />
      </TabsContent>
    </Tabs>
  </div>
);

export default IndexPage;
