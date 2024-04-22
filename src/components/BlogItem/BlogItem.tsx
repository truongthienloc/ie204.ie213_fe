'use client'

import React, { useState } from 'react'
import dayjs from 'dayjs'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import { Modal, ModalButton } from '~/components/Modal'

type Props = {
    id: string
    title: string
    header: string
    keywords: string[]
    imgSrc?: string
    description: string
    createdAt: string
    slug: string
    onEditClick?: () => void
    onDelete?: () => void
}

export default function BlogItem({
    id,
    title,
    header,
    keywords,
    imgSrc,
    description,
    createdAt,
    slug,
    onEditClick,
    onDelete,
}: Props) {
    const [deleteOpen, setDeleteOpen] = useState(false)

    const handleDeleteClick = () => {
        setDeleteOpen(true)
    }

    const handleDeleteClose = () => {
        // console.log('close');

        setDeleteOpen(false)
    }

    const handleDelete = () => {
        onDelete?.()
        handleDeleteClose()
    }

    return (
        <div className="flex flex-row gap-4 border-b border-black pb-2">
            <img
                className="w-40 object-contain"
                src={imgSrc || 'https://placehold.co/400x300'}
                alt={header}
            />
            <div className="flex flex-col">
                <Link href={`/blog/${slug}`} target="_blank">
                    <h2 className="text-xl font-bold hover:underline">{header}</h2>
                </Link>
                <p className="text-xs font-light text-gray-400">{id}</p>
                <p className="text-sm text-gray-600">
                    {dayjs(createdAt).format('hh:mm DD/MM/YYYY')}
                </p>
                <div className="mt-3 grid grid-cols-[auto_1fr] gap-1">
                    <span>Title:</span>
                    <p>{title}</p>
                    <span>Slug:</span>
                    <p>{slug}</p>
                    <span>Description:</span>
                    <p>{description}</p>
                    <span>Keywords:</span>
                    <p>{keywords.join(', ')}</p>
                </div>
            </div>
            <div className="ml-auto flex flex-col items-center justify-center gap-2 px-4">
                <button
                    className="mb-auto rounded-lg border-2 bg-red-500 p-1 text-white hover:border-red-500 hover:bg-white hover:text-red-500"
                    onClick={handleDeleteClick}
                >
                    <DeleteIcon />
                </button>
                <button className="hover:text-yellow-500" onClick={onEditClick}>
                    <EditIcon />
                </button>
            </div>

            <Modal
                open={deleteOpen}
                onClose={handleDeleteClose}
                title="Bạn có chắc muốn xóa bài viết này hay không?"
                buttons={
                    <>
                        <ModalButton
                            className="bg-red-500 hover:border-red-500 hover:text-red-500"
                            label="Hủy"
                            onClick={handleDeleteClose}
                        />
                        <ModalButton
                            className="bg-blue-500 hover:border-blue-500 hover:text-blue-500"
                            label="Xác nhận"
                            onClick={handleDelete}
                        />
                    </>
                }
            />
        </div>
    )
}
