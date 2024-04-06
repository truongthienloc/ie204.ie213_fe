'use client'
import React, { useState } from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function TanstackProvider({ children }: any) {
    const [client] = useState(new QueryClient())

    return (
        <>
            <QueryClientProvider client={client}>
                <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </>
    )
}
