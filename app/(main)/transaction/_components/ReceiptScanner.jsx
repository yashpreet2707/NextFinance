'use client';
import { scanReceipt } from '@/actions/transaction';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/UseFetch';
import { Camera, Loader2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner';

const ReceiptScanner = ({ onScanComplete }) => {

    const fileInputRef = useRef();

    const handleReceiptScan = async (file) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File should be less than 5MB')
            return;
        }
        await scanReceiptFn(file)
    }
    const { loading: scanReceiptLoading, fn: scanReceiptFn, data: scannedData, } = useFetch(scanReceipt)

    useEffect(() => {
        if (scannedData && !scanReceiptLoading) {
            onScanComplete(scannedData)
            toast.success("Receipt scanned successfully.")
        }
    }, [scanReceiptLoading, scannedData])

    return (
        <div>
            <input type='file' ref={fileInputRef} className='hidden' accept='image/*' capture='environment' onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleReceiptScan(file);
            }} />

            <Button type='button' variant='outline' onClick={() => fileInputRef.current?.click()} disabled={scanReceiptLoading} className='w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 text-white hover:text-white'>
                {scanReceiptLoading ? (
                    <>
                        <Loader2 className='mr-2 animate-spin' />
                        <span>Scanning receipt...</span>
                    </>
                ) : (
                    <>
                        <Camera className='mr-2' />
                        <span className='truncate max-w-[200px]'>Scan Receipt with AI</span>
                    </>
                )}
            </Button>
        </div>
    )
}

export default ReceiptScanner