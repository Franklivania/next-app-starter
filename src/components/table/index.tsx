import React from "react";
import type { TableProps } from "@/types";
import { DottedLoader } from "../loaders";

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  isUppercase = true,
  isGray,
  isLoading,
}) => {
  const colHeaders = columns?.map(({ title, key }) => (
    <th
      key={key}
      className={`text-[#808080] dark:text-gray-200 ${isUppercase ? "uppercase" : "capitalize"} border-b border-gray-300`}
    >
      <p className="py-4 px-4 text-[16px] text-left font-normal whitespace-nowrap">
        {title}
      </p>
    </th>
  ));

  const tableData =
    data &&
    data.map((rowData, i) => (
      <tr
        onClick={() => onRowClick && onRowClick(rowData)}
        key={`row-${i}`}
        className={`border-b last:border-b-0${isGray ? " bg-white mt-3" : ""}`}
      >
        {columns.map(({ render, key }, id) => (
          <td key={`data-${i}-${id}`} className="py-4 px-4 text-[16px]">
            {render
              ? render(rowData, i)
              : ((rowData[key] as React.ReactNode) ?? "-")}
          </td>
        ))}
      </tr>
    ));

  const emptyStateRow = (
    <tr>
      <td
        colSpan={columns?.length}
        className="py-4 px-6 text-center text-lg text-gray-500"
      >
        No data available
      </td>
    </tr>
  );

  const loadingStateRow = (
    <tr>
      <td colSpan={columns?.length} className="py-8 px-6 text-center">
        <DottedLoader />
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full text-sm border-collapse">
        <thead>
          <tr className="bg-transparent">{colHeaders}</tr>
        </thead>
        <tbody>
          {isLoading
            ? loadingStateRow
            : data && data.length
              ? tableData
              : emptyStateRow}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
