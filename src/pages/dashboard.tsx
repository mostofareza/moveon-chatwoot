import { CustomerInfo } from '@/components/dashboard/customer-info';
import { OrderHandlerInfo } from '@/components/dashboard/order-hadler-info';

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        <CustomerInfo />
        <OrderHandlerInfo />
      </div>
    </div>
  );
};

export default Dashboard;
