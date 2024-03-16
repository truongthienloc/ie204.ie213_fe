'use client'

import React from 'react'
import { cn } from '~/lib/utils'
import Drawer from '@mui/material/Drawer'

type NavDrawerProps = {
    className: string
}

export default function NavDrawer({ className }: NavDrawerProps) {
    return <Drawer className={cn('', className)}></Drawer>
}
