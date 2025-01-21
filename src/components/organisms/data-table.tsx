"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { MyTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../molecules/my-table'
import MyButton from '../atoms/my-button'
import MyIcon from '../atoms/my-icon'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { cn } from '@/utils/cn'


type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    paginatedData: {
        data: TData[]
        per_page: number;
        skipped: number;
        total: number;
    },
    setLimit: Dispatch<SetStateAction<number>>
} & React.ComponentProps<typeof MyTable>

export function DataTable<TData, TValue>({
    columns,
    paginatedData,
    setLimit,
    ...rest
}: DataTableProps<TData, TValue>) {
    const { data, per_page, skipped, total } = paginatedData
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div>

            <MyTable
                className="rounded-md border"
                {...rest}
            >
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
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
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Sem Resultados
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </MyTable>

            <div className='flex items-center justify-between p-5'>
                <MyButton
                    variant='text'
                    className='text-neutral-600'
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    leftIcon={<MyIcon name='arrow-left' />}
                >
                    Anterior
                </MyButton>
                <div>
                    {Array.from({ length: Math.ceil(total / 10) }).map((_, index) => (
                        <MyButton
                            key={index}
                            variant='text'
                            onClick={() => {
                                table.setPageIndex(index);
                                if (!table.getCanNextPage()) {
                                    setLimit((prev) => (prev + 50))
                                }
                            }}
                            className={
                                cn(
                                    'rounded-lg py-0 text-neutral-600',
                                    index === table.getState().pagination.pageIndex && 'bg-primary-200 text-neutral-900'
                                )
                            }
                        >
                            {index + 1}
                        </MyButton>
                    ))}
                </div>
                <MyButton
                    variant='text'
                    className='text-neutral-600'
                    onClick={() => {
                        table.nextPage();
                        if (!table.getCanNextPage()) {
                            setLimit((prev) => (prev + 50))
                        }
                    }}
                    disabled={!table.getCanNextPage()}
                    rightIcon={<MyIcon name='arrow-right' />}
                >
                    Próximo
                </MyButton>
            </div>
        </div >
    )

}
