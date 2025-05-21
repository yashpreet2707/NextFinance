import { getUserAccounts } from '@/actions/dashboard';
import CreateAccountDrawer from '@/components/CreateAccountDrawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React from 'react'
import AccountCard from './_components/AccountCard';

async function DashboardPage() {

    const accounts = await getUserAccounts();

    return (
        <div className='px-5'>
            {/* Budget Progress  */}

            {/* Overview  */}

            {/* Accounts Grid  */}
            <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
                <CreateAccountDrawer>
                    <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed py-9'>
                        <CardContent className='flex flex-col justify-center items-center text-muted-foreground h-full pt-5'>
                            <Plus className='h-10 w-10 mb-2' />
                            <p className='text-sm font-medium'>Add new Account</p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>

                {accounts.length > 0 && accounts?.map((account) => <AccountCard key={account.id} account={account} />)}
            </div>
        </div>
    )
}

export default DashboardPage;