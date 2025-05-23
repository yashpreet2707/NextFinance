'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { categoryColors } from '@/data/categories'
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Clock, MoreHorizontal, RefreshCcw } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



const RECURING_INTERVALS = {
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly',
}


const TransactionTable = ({ transactions }) => {


    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState([])
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    })

    const filteredAndSortedTransactions = transactions;

    const handleSort = () => {

    }

    return (
        <div className='space-y-4'>
            {/* Filters  */}

            {/* Transactions  */}
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox />
                            </TableHead>
                            <TableHead className='w-[100px] cursor-pointer' onClick={handleSort("date")}><div className='flex items-center'>Date</div></TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className='w-[100px] cursor-pointer' onClick={handleSort("category")}><div className='flex items-center'>Category</div></TableHead>
                            <TableHead className='w-[100px] cursor-pointer' onClick={handleSort("amount")}><div className='flex items-center justify-end'>Amount</div></TableHead>
                            <TableHead>Recurring</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className='text-center text-muted-foreground'>
                                    No Transactions Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell><Checkbox /></TableCell>
                                    <TableCell>{format(new Date(transaction.date), 'PP')}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell className='capitalize'>
                                        <span className='px-2 py-1 rounded text-white text-sm' style={{ background: categoryColors[transaction.category], }}>{transaction.category}</span>
                                    </TableCell>
                                    <TableCell className='text-right font-md' style={{ color: transaction.type === 'EXPENSE' ? 'red' : 'green' }}>
                                        {transaction.type === 'EXPENSE' ? "-" : "+"}
                                        ${transaction.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.recurring ? (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Badge variant='outline' className='gap-1 bg-purple-100 hover:bg-purple-200'>
                                                            <RefreshCcw className='h-3 w-3' />
                                                            {RECURING_INTERVALS[transaction.recurringInterval]}
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className='text-sm'>
                                                            <div className='font-medium'>Next Date:</div>
                                                            <div>{format(new Date(transaction.nextRecurringDate.date), 'PP')}</div>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                        ) : <Badge variant='outline' className='gap-1'><Clock className='h-3 w-3' />One-time</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant='ghost' className='h-8 w-8 p-0'><MoreHorizontal className='h-4 w-4' /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel className='cursor-pointer' onClick={() => router.push(`/transaction/create?edit=${transaction.id}`)}>Edit</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className='text-destructive cursor-pointer'>Delete</DropdownMenuItem>
                                                {/* <DropdownMenuItem className='text-destructive cursor-pointer' onClick={() => deleteFn([transaction.id])}>Delete</DropdownMenuItem> */}
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </TableCell>
                                </TableRow>
                            ))
                        )
                        }
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default TransactionTable