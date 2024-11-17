import { PropsWithChildren } from "react";
import Spinner from "../../atoms/spinner";
import { TablePagination } from "./pagination";
import { PagingProps } from "./types";

let ROW_HEIGHT = 40;

type Props<T extends boolean> = PropsWithChildren<{
  isLoading?: boolean;
  hasPagination?: T;
  pagingState?: T extends true ? PagingProps : undefined;
  numberOfRows?: number;
  rowHeight?: number;
  className?: string;
}>;

const TableContainer = <T extends boolean>({
  children,
  // TODO: remove (redundant)
  hasPagination,
  pagingState,
  isLoading,
  numberOfRows = 12,
  rowHeight,
  className,
}: Props<T>) => {
  // We use the number of rows (query limit) plus the header row to calculate the minimum height of the table, to avoid the table jumping around while loading.
  ROW_HEIGHT = rowHeight ? rowHeight : ROW_HEIGHT;
  const minHeight = rowHeight
    ? (numberOfRows + 1) * ROW_HEIGHT - 54
    : (numberOfRows + 1) * ROW_HEIGHT;

  return (
    <div>
      <div
        className={`relative overflow-y-auto lg:w-full ${className}`}
        style={{
          minHeight,
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <Spinner variant="secondary" />
          </div>
        )}
        {children}
      </div>
      {hasPagination && pagingState && (
        <div className="px-5">
          <TablePagination pagingState={pagingState} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default TableContainer;
