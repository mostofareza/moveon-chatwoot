import { Checkbox } from "@/components/common/checbox";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Column } from "react-table";




const useTableColums = () => {
  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: ({ getToggleAllPageRowsSelectedProps }) => (
          <div className="hidden lg:flex">
            <span className="flex justify-center px-6">
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            </span>
            <span>Product Details</span>
          </div>
        ),
        accessor: "images",
        Cell: ({ row }) => {
          const [copied, setCopied] = useState(false);

          // Clear the 'copied' state after 300 milliseconds
          setTimeout(() => {
            setCopied(false);
          }, 1000);

          return (
            <>
              <div className="mb-6 justify-between gap-3 shadow-sm lg:mb-0 lg:ml-6 lg:flex lg:flex-col lg:py-6 lg:shadow-none">
                {/* Large Screen */}
                <div className="hidden gap-4 lg:flex">
                  <div className="flex items-start gap-4">
                    <div onClick={(e) => e.stopPropagation()}>
                      <IndeterminateCheckbox
                        {...row.getToggleRowSelectedProps()}
                      />
                    </div>
                    <ImageWithPlaceholder
                      
                      alt="Product Image"
                      className="h-[6.25rem] w-[6.25rem] rounded-md object-contain"
                    />
                  </div>
                  <div className="">
                    <div className="grid grid-cols-4 items-center gap-2 text-base leading-6">
                      <span className="text-grey-35 col-span-2">
                        Package no:
                      </span>

                      <div className="col-span-2 flex items-center gap-2 font-bold">
      
                        <span>
                          {copied ? (
                            <CheckCheckIcon
                              size={16}
                              color="#00B5B1"
                              className="cursor-pointer"
                            />
                          ) : (
                            <CopyIcon
                              className="cursor-pointer"
                              size={16}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-base leading-6">
                      <span className="text-grey-35 col-span-2">
                        Product category:
                      </span>
                      <span className="col-span-2 font-bold">
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-base leading-6">
                      <span className="text-grey-35 col-span-2">Quantity:</span>
                      <span className="col-span-2 font-bold">
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-base leading-6">
                      <span className="text-grey-35 col-span-2">Weight:</span>
                      <span className="col-span-2 font-bold">
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-base leading-6">
                      <span className="text-grey-35 col-span-2">CBM:</span>{" "}
                      
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-base leading-6">
                      <span className="text-grey-35 col-span-2">
                        Carton no:
                      </span>{" "}
                      <span className="col-span-2 font-bold">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Shipping",
        accessor: "shipping_category",
        Cell: ({ row: { original } }) => (
          <div className="flex h-full flex-col py-6">
            <div className="">
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-2 gap-6 text-base leading-6">
                  <span className="text-grey-35 col-span-1 whitespace-nowrap">
                    Shipment no:
                  </span>{" "}
                  <span className="col-span-1 font-bold"></span>
                </div>
                <div className="grid grid-cols-2 gap-6 text-base leading-6">
                  <span className="text-grey-35 col-span-1">Rate:</span>{" "}
                  <span className="col-span-1 font-bold">
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-6 whitespace-nowrap text-base leading-6">
                  <span className="text-grey-35 col-span-1">
                    Estimated bill:
                  </span>{" "}
                  <span className="col-span-1 font-bold">
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-6 text-base leading-6">
                  <span className="text-grey-35 col-span-1">
                    Estimated profit:
                  </span>
                  <span className="col-span-1 font-bold">
                  </span>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        Header: "Tracking",
        accessor: "status",
        Cell: ({ row: { original } }) => {
          return (
            <div className="mr-4 flex h-full flex-col justify-between gap-7 py-6">
              <div className="flex flex-col gap-2 text-base">
              </div>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "fulfilment_status",
        Cell: ({ row: { original } }) => {
          return (
            <div className="mr-4 flex h-full flex-col justify-between gap-7 py-6">
              <div className="flex flex-col gap-2 text-base">
              </div>
            </div>
          );
        },
      },
    ],
    [],
  );

  return [columns];
};

export default useTableColums;
