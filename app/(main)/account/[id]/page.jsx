import { getAccountWithTransactions } from '@/actions/accounts'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import TransactionTable from './_components/TransactionTable'
import { BarLoader } from 'react-spinners'

export default async function AccountsPage({ params }) {
  const resolvedParams = await params
  const accountData = await getAccountWithTransactions(resolvedParams.id)

  if (!accountData) {
    notFound();
  }
  const { transactions, ...account } = accountData;

  return (
    <div className='space-y-8 px-5 sm:ps-10 md:ps-24'>
      <div className='flex justify-between items-end gap-4 '>
        <div>
          <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize'>{account.name.charAt(0) + account.name.slice(1).toLowerCase()}</h1>
          <p className='text-muted-foreground'>{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
        </div>
        <div className='text-right pb-2'>
          <div className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</div>
          <p className='text-sm text-muted-foreground'>{account._count.transactions} Transactions</p>
        </div>
      </div>

      {/* Chart section  */}


      {/* Transaction Table  */}
      <Suspense fallback={<BarLoader className='mt-4' width={'100%'} color="#9333ea" />}>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  )
}