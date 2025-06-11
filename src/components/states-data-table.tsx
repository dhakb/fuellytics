"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown, ChevronDown, ExternalLink, Search } from "lucide-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable, flexRender
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getStateCodeByName } from "@/lib/state-codes";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { StateData } from "@/lib/types";


interface StatesDataTableProps {
  allUsaPrice: StateData[];
}

export default function StatesDataTable({allUsaPrice}: StatesDataTableProps) {
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<StateData>[] = [
    {
      accessorKey: "name",
      header: "State",
      cell: ({row}) => {
        const stateName = row.getValue("name") as string;
        const stateCode = getStateCodeByName(stateName);

        return (
          <Button
            variant="link"
            className="p-0 h-auto font-medium"
            onClick={() => {
              if (stateCode) {
                router.push(`/states/${stateCode.toLowerCase()}`);
              }
            }}
          >
            {stateName}
            <ExternalLink className="ml-1 h-3 w-3"/>
          </Button>
        );
      }
    },
    {
      accessorKey: "gasoline",
      header: ({column}) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Regular
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const price = Number.parseFloat(row.getValue("gasoline"));
        return <div className="font-medium text-center">${price.toFixed(2)}</div>;
      }
    },
    {
      accessorKey: "midGrade",
      header: ({column}) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Mid-Grade
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const price = Number.parseFloat(row.getValue("midGrade"));
        return <div className="font-medium text-center">${price.toFixed(2)}</div>;
      }
    },
    {
      accessorKey: "premium",
      header: ({column}) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Premium
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const price = Number.parseFloat(row.getValue("premium"));
        return <div className="font-medium text-center">${price.toFixed(2)}</div>;
      }
    },
    {
      accessorKey: "diesel",
      header: ({column}) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Diesel
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const price = Number.parseFloat(row.getValue("diesel"));
        return <div className="font-medium text-center">${price.toFixed(2)}</div>;
      }
    }
  ];

  const table = useReactTable({
    data: allUsaPrice,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground"/>
          <Input
            placeholder="Filter states..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id === "gasoline" ? "regular" : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={`${header.id !== "name" && "text-center"}`}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} states
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}