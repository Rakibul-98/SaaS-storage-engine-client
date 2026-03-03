/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface Column<T = any> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  mobile?: {
    label: string;
    format?: (item: T) => ReactNode;
  };
  className?: string;
  cellClassName?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  mobileCard?: (item: T) => ReactNode;
  emptyMessage?: string;
  isLoading?: boolean;
  skeleton?: ReactNode;
}

export default function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  mobileCard,
  emptyMessage = "No data found",
  isLoading,
  skeleton,
}: ResponsiveTableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return item[column.accessor] as ReactNode;
  };

  if (isLoading && skeleton) {
    return skeleton;
  }

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="block md:hidden space-y-3">
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          data.map((item) => (
            <Card key={keyExtractor(item)} className="p-4">
              {mobileCard ? (
                mobileCard(item)
              ) : (
                <div className="space-y-3">
                  {columns.map((column, idx) => {
                    if (!column.mobile) return null;

                    const value = column.mobile.format
                      ? column.mobile.format(item)
                      : renderCell(item, column);

                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-muted-foreground">
                          {column.mobile.label}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, idx) => (
                  <TableHead key={idx} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-6 text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
              {data.map((item) => (
                <TableRow key={keyExtractor(item)}>
                  {columns.map((column, idx) => (
                    <TableCell key={idx} className={column.cellClassName}>
                      {renderCell(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
