import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { CopyIcon } from 'lucide-react';

export function OrderHandlerInfo() {
  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle>Order Handler Info</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="grid grid-cols-3 gap-y-2 gap-x-2">
      {/* Name */}
      <span className="font-medium text-subtext col-span-1">Name:</span>
      <span className="col-span-2">Md. Rakibul Islam</span>

      {/* Email */}
      <span className="font-medium text-subtext col-span-1">Email:</span>
      <div className="col-span-2 flex items-center">
        <span className="mr-2">roki07pe@gmail.com</span>
        <button className="">
          <CopyIcon size={16} />
        </button>
      </div>

      {/* Mobile */}
      <span className="font-medium text-subtext col-span-1">Mobile:</span>
      <div className="col-span-2 flex items-center">
        <span className="mr-2">+8801768874188</span>
        <button className="">
          <CopyIcon size={16} />
        </button>
      </div>

    </div>
    </CardContent>
  </Card>
  );
}
