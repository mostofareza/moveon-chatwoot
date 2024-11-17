import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight, MoreVertical } from 'lucide-react';

const OrderManagementTable = () => {
  // Sample data
  const data = [
    {
      id: 'BSP2402844761',
      date: '15 Oct, 2023 at 4:41pm',
      total: '₱500',
      due: '₱0',
      products: [
        {
          image: '/api/placeholder/80/80',
          name: 'Women brown shoulder bag leather',
          productId: 'PB2546846585352461',
          quantity: '01',
          price: '₱200',
          status: 'Buy - Pending',
          purchaseAgent: 'XYZ Fashion Universe',
          shippingCompany: 'ABC International Cargo',
          shippingDetails: 'Women Clothing - 1-1.750 kg'
        }
      ],
      meta: [
        {
          image: '/api/placeholder/50/50',
          name: 'Color-7-character-colored coffee cup dwarf-green',
          capacity: 'Universal model',
          quantity: 2,
          price: '₱760',
          amount: '₱1520'
        }
      ]
    }
  ];

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.display({
      id: 'expander',
      cell: ({ row }) => (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="px-2"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      ),
      size: 40
    }),
    columnHelper.accessor('id', {
      header: 'Order ID',
      cell: info => (
        <div className="flex flex-col">
          <span>{info.getValue()}</span>
          <span className="text-sm text-gray-500">{info.row.original.date}</span>
        </div>
      )
    }),
    columnHelper.accessor('total', {
      header: 'Total'
    }),
    columnHelper.accessor('due', {
      header: 'Due'
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: () => (
        <button className="p-2">
          <MoreVertical className="h-4 w-4" />
        </button>
      )
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const renderExpandedRow = (products, meta) => (
    <div className="p-4 bg-gray-50">
      {products.map((product, idx) => (
        <div key={idx} className="mb-4 border-b pb-4">
          <div className="flex items-start gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium text-green-600">{product.name}</h3>
              <div className="text-sm text-gray-500">
                <p>Product ID: {product.productId}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  {product.status}
                </span>
              </div>
              <div className="mt-2">
                <p><strong>Purchase Agent Company</strong></p>
                <p className="text-sm text-gray-600">{product.purchaseAgent}</p>
                <p><strong>Shipping Company</strong></p>
                <p className="text-sm text-gray-600">{product.shippingCompany}</p>
                <p className="text-sm text-gray-600">{product.shippingDetails}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {meta && meta.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Product Meta</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Meta</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {meta.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.capacity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="rounded-lg border">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-left p-4 border-b">
                  {flexRender(
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
            <React.Fragment key={row.id}>
              <tr className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    {renderExpandedRow(row.original.products, row.original.meta)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagementTable;
