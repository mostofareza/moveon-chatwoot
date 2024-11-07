import { format } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import GlobalBadge from '../common/global-badge';
import { Card } from '../common/card';

// Sample Static Data
const sessions = [
  {
    id: 1,
    devices: [
      {
        user_agent: "Chrome on Windows",
        location: "New York, USA",
        ip_address: "192.168.1.1",
      },
    ],
    authenticated_at: "2024-10-01T10:15:00",
    expires_at: "2024-10-08T10:15:00",
    active: true,
  },
  {
    id: 2,
    devices: [
      {
        user_agent: "Safari on Mac",
        location: "San Francisco, USA",
        ip_address: "192.168.1.2",
      },
    ],
    authenticated_at: "2024-09-25T14:30:00",
    expires_at: "2024-10-02T14:30:00",
    active: false,
  },
];

// Utility functions
const shortenDeviceName = (deviceName:string) =>
  deviceName.length > 20 ? `${deviceName.substring(0, 20)}...` : deviceName;


const handleRemove = (id:number) => {
  console.log(`Session with ID ${id} removed`);
};

const SessionTable = () => {
  return (
    <Card className='px-4'>
      <div className='flex justify-between items-center'>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-6">Login Session Information</h2>
        <h2 className='text-red-600'>Logout form all</h2>
      </div>
      <table className="min-w-full overflow-hidden bg-white">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Device
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Logged In At
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Expires At
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Status
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <tr key={session.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {session.devices && session.devices[0] ? (
                  <div>
                    <p>{shortenDeviceName(session.devices[0].user_agent)}</p>
                    {session.devices[0].location && (
                      <p className="text-xs text-gray-400">Location: {session.devices[0].location}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      {session.devices[0].ip_address}
                    </p>
                  </div>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {session.authenticated_at &&
                  format(new Date(session.authenticated_at), "PPpp")}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {session.expires_at &&
                  format(new Date(session.expires_at), "PPpp")}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                <GlobalBadge
                  label={session.active ? "Active" : "Inactive"}
                  status={session.active ? "active" : "inactive"}
                />
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                <button
                  onClick={() => handleRemove(session.id)}
                  className="flex items-center text-red-600 hover:text-red-900"
                >
                  Logout
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="py-4 text-center text-gray-500">
              No sessions found
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </Card>
  );
};

export default SessionTable;
