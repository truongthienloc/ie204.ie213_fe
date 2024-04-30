import * as React from 'react'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { cn } from '~/lib/utils'

type Props = {
    title?: string
    children?: React.ReactNode
    className?: string
    open?: boolean
    onClose?: () => void
    buttons?: React.ReactNode
}

export default function BasicModal({
    title,
    open = false,
    onClose,
    children,
    buttons,
    className,
}: Props) {
    return (
        <Modal open={open} onClose={onClose}>
            <div
                className={cn(
                    'absolute left-1/2 top-1/2 max-w-screen-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white',
                    className,
                )}
            >
                <div className="title-container flex flex-row justify-between border-b border-black p-4">
                    <span className="title flex-1 text-2xl font-bold">{title}</span>
                </div>

                <button
                    className="absolute right-0 top-0 flex aspect-square h-fit w-14 items-center justify-center rounded-tr-[inherit] bg-gray-100 text-black transition-colors hover:bg-gray-300 hover:text-white"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>

                {children}

                <div className="flex flex-row items-center justify-end gap-2 border-t border-black p-4">
                    {buttons}
                </div>
            </div>
        </Modal>
    )
}

type ButtonProps = {
    label: string
    onClick?: () => void
    className?: string
}

export function ModalButton({ label, className, onClick }: ButtonProps) {
    return (
        <button
            className={cn(
                'text-nowrap rounded-lg border-2 border-transparent bg-primary px-3 py-1 text-white transition-colors hover:border-primary hover:bg-white hover:text-primary',
                className,
            )}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
