import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { MoreVertical, Copy, ChevronDown } from 'lucide-react';
import { Card } from '../common/card';


const OrderTable = () => {
  const columnHelper = createColumnHelper();
  
  const data = [
    {
      id: 'BSP2402844761',
      date: '15 Oct, 2023 at 4:41pm',
      total: '₹500',
      due: '₹0',
      product: {
        name: 'Women brown shoulder bag leather',
        id: 'PB2546846583246',
        image: '/api/placeholder/80/80',
        quantity: '01',
        price: '₹200',
        status: 'Buy- Pending'
      },
      purchaseAgent: {
        name: 'XYZ Fashion Universe',
        company: 'Purchase Agent Company'
      },
      shipping: {
        company: 'ABC International Cargo',
        details: 'Women Clothing- ₹17.60/kg'
      }
    }
  ];

  const columns = [
    columnHelper.accessor('select', {
      header: () => <input type="checkbox" className="rounded border-gray-300" />,
      cell: () => <input type="checkbox" className="rounded border-gray-300" />
    }),
    columnHelper.group({
      header: 'Order ID',
      columns: [
        columnHelper.accessor('id', {
          cell: info => (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{info.getValue()}</span>
                <Copy className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">{info.row.original.date}</div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={info.row.original.product.image} 
                    alt="Product" 
                    className="w-16 h-16 rounded"
                  />
                  <div className="space-y-1">
                    <div className="text-green-600">{info.row.original.product.name}</div>
                    <div className="text-sm text-gray-500">
                      Product ID: {info.row.original.product.id} <Copy className="inline w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-500">Quantity: {info.row.original.product.quantity}</div>
                    <div className="text-sm text-gray-500">Price: {info.row.original.product.price}</div>
                    <div>
                      <span className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full">
                        {info.row.original.product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ]
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      cell: info => <div className="font-medium">{info.getValue()}</div>
    }),
    columnHelper.accessor('due', {
      header: 'Due',
      cell: info => <div className="text-red-500">{info.getValue()}</div>
    }),
    columnHelper.group({
      header: 'Action',
      columns: [
        columnHelper.accessor('purchaseAgent', {
          cell: info => (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{info.getValue().company}</div>
                  <div className="text-gray-500">{info.getValue().name}</div>
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="font-medium">Shipping Company</div>
                <div className="text-gray-500">{info.row.original.shipping.company}</div>
                <div className="text-gray-500">{info.row.original.shipping.details}</div>
              </div>
            </div>
          )
        })
      ]
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="w-full p-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t border-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button className="flex items-center space-x-1 text-sm text-gray-600">
          <span>All Meta</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center space-x-1 text-sm text-gray-600">
          <span>View Timeline</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};

export default OrderTable;