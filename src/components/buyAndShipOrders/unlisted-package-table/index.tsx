import _ from "lodash";
import React from "react";
import { usePagination, useRowSelect, useTable } from "react-table";
import useTableColums from "./use-column";
import Table from "@/components/common/table";
import TableContainer from "@/components/common/table/table-container";

interface IProps {
  reference: React.Ref<any>;
}

const UnlistedPackageTable = ({ reference }: IProps) => {



  const [columns] = useTableColums();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // Get the state from the instance
  } = useTable(
    {
      columns,
      data: [],
      initialState: {
       hiddenColumns: ["id"],
      },
      getRowId: (row) => row.id,
      stateReducer: (newState, action) => {
        switch (action.type) {
          case "toggleAllRowsSelected":
            return {
              ...newState,
              selectedRowIds: {},
            };

          default:
            return newState;
        }
      },
    },
    usePagination,
    useRowSelect,
  );

  return (
    <div>
        <>
          <TableContainer
            hasPagination
            numberOfRows={rows.length}
            rowHeight={212}
          >
            <Table
              {...getTableProps()}
              // className={clsx({ ["relative"]: isLoading })}
            >
              <Table.Head className="border-grey-5 text-large hidden !h-14 rounded-md border-b-8 border-t-0 bg-white font-bold text-black lg:table-row-group">
                {headerGroups?.map((headerGroup) => (
                  <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((col) => (
                      <Table.HeadCell {...col.getHeaderProps()}>
                        {col.render("Header")}
                      </Table.HeadCell>
                    ))}
                  </Table.HeadRow>
                ))}
              </Table.Head>
              <Table.Body {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <Table.RowWithFooter
                      className="bg-white"
                      {...row.getRowProps()}
                      additionalRow={
                        <tr {...row.getRowProps()} className="mb-4">
                          <td colSpan={row.cells.length}>
                            <div className="mb-4 flex w-full items-center justify-between bg-white px-6 py-2">
                              <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
                                <span className="hidden lg:block">Status:</span>{" "}

                                <div className="flex items-center justify-end gap-2">
                                  <span className="text-large"> Contains:</span>
                                 
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      }
                    >
                      {row.cells.map((cell, index) => {
                        return (
                          <Table.Cell {...cell.getCellProps()} key={index}>
                            {cell.render("Cell", { index })}
                          </Table.Cell>
                        );
                      })}
                    </Table.RowWithFooter>
                  );
                })}
              </Table.Body>
            </Table>
          </TableContainer>
        </>
    </div>
  );
};

export default React.memo(UnlistedPackageTable);
