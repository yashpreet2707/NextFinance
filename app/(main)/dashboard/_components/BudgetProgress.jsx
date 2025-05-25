"use client";
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, Pencil, X } from 'lucide-react'
import useFetch from '@/hooks/UseFetch';
import { toast } from 'sonner';
import { updateBudget } from '@/actions/budget';
import { Progress } from '@/components/ui/progress';

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || '')

    const { loading: isLoading, fn: updateBudgetFn, data: updatedBudget, error } = useFetch(updateBudget)

    const percentageUsed = initialBudget ? (currentExpenses / initialBudget.amount) * 100 : 0

    useEffect(() => {
        if (updatedBudget?.success) {
            setIsEditing(false)
            toast.success('Budget updated successfully.')
        }
    }, [updatedBudget])

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Failed to update budget')
        }
    }, [error])

    const handleUpdateBudget = async () => {
        const amount = parseFloat(newBudget)
        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount.')
            return;
        }

        try {
            await updateBudgetFn(amount)
        } catch (error) {
            console.error('Failed to update budget:', error)
        }
    }

    const handleCancel = () => {
        setNewBudget(initialBudget?.amount?.toString() || '')
        setIsEditing(false)
    }

    return (
        <Card>
            <CardHeader className='flex items-center space-y-0 pb-2'>
                <div className='flex-1 flex items-center justify-between'>
                    <CardTitle>Monthly Budget (Default Account)</CardTitle>
                    <div className='flex items-center gap-2 mt-1'>
                        {isEditing ? (
                            <div className='flex items-center gap-2'>
                                <Input
                                    type='number'
                                    value={newBudget}
                                    onChange={e => setNewBudget(e.target.value)}
                                    className='w-32'
                                    placeholder="Enter amount"
                                    autoFocus
                                    disabled={isLoading}
                                />
                                <Button variant={'ghost'} size='icon' onClick={handleUpdateBudget} disabled={isLoading}><Check className='h-4 w-4 text-green-500' /></Button>
                                <Button variant={'ghost'} size='icon' onClick={handleCancel} disabled={isLoading} ><X className='h-4 w-4 text-red-500' /></Button>
                            </div>
                        ) : <></>}
                    </div>
                </div>
                <CardDescription>
                    {initialBudget ? `$${currentExpenses.toFixed(2)} of $${initialBudget?.amount.toFixed(2)} spent` : 'No budget set'}
                </CardDescription>
                <Button variant={'ghost'} size='icon' onClick={() => setIsEditing(true)} className='h-6 w-6'><Pencil className='h-3 w-3' /></Button>
            </CardHeader>
            <CardContent>
                {initialBudget && (
                    <div className='space-y-2'>
                        <Progress value={percentageUsed} extraStyles={`${percentageUsed > 90 ? 'bg-red-500' : percentageUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                        <div className='text-xs text-muted-foreground text-right'>
                            <p>{percentageUsed.toFixed(1)}% used</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>

    )
}

export default BudgetProgress