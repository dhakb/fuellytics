"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { CityData as City } from "@/lib/types";


interface CitiesDataTableProps {
  cities: City[];
}

export default function CitiesDataTable({cities}: CitiesDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<City>[] = [
    {
      accessorKey: "name",
      header: "City",
      cell: ({row}) => <div>{row.getValue("name")} </div>
    },
    {
      accessorKey: "regular",
      header: ({column}) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Regular
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const priceTag: string = row.getValue("regular");
        const price = Number.parseFloat(priceTag.split("$")[1]);
        return <div className="text-center">${price.toFixed(2)}</div>;
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
        const priceTag: string = row.getValue("midGrade");
        const price = Number.parseFloat(priceTag.split("$")[1]);
        return <div className="text-center">${price.toFixed(2)}</div>;
      }
    },
    {
      accessorKey: "premium",
      header: ({column}) => {
        return (
          <Button variant="ghost" className="text-right"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Premium
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
        );
      },
      cell: ({row}) => {
        const priceTag: string = row.getValue("premium");
        const price = Number.parseFloat(priceTag.split("$")[1]);
        return <div className="text-center">${price.toFixed(2)}</div>;
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
        const priceTag: string = row.getValue("diesel");
        const price = Number.parseFloat(priceTag.split("$")[1]);
        return <div className="text-center">${price.toFixed(2)}</div>;
      }
    }
  ];

  const table = useReactTable({
    data: cities,
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
            placeholder="Filter cities..."
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
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
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
                    <TableHead key={header.id} className={`${header.id !== "name" && "text-center"} border-1`}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}
                               className="border-1">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
          of {table.getFilteredRowModel().rows.length} cities
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
