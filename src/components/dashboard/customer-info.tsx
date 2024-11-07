import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { CopyIcon } from 'lucide-react';


export function CustomerInfo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Profile</CardTitle>
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

        {/* Gender */}
        <span className="font-medium text-subtext col-span-1">Gender:</span>
        <span className="col-span-2">Male</span>

        {/* Status */}
        <span className="font-medium text-subtext col-span-1">Status:</span>
        <span className="col-span-2 text-green-600 font-medium">Active</span>

        {/* Joined at */}
        <span className="font-medium text-subtext col-span-1">Joined at:</span>
        <span className="col-span-2">20 Jun 2022</span>

        {/* Session Time */}
        <span className="font-medium text-subtext col-span-1">Session Time:</span>
        <span className="col-span-2">2 hrs</span>

        {/* Last Visited */}
        <span className="font-medium text-subtext col-span-1">Last Visited:</span>
        <span className="col-span-2">15 Sep 2024 at 10:28 am</span>
      </div>
      </CardContent>
    </Card>
  );
}
