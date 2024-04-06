import React from 'react'
import dayjs from 'dayjs'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'

type Props = {
    id: string
    header: string
    imgSrc?: string
    description: string
    createdAt: string
    slug: string
}

export default function BlogItem({ id, header, imgSrc, description, createdAt, slug }: Props) {
    return (
        <div className="flex flex-row gap-4 border-b border-black pb-2">
            <img className="w-24" src={imgSrc || 'https://placehold.co/400x300'} alt={header} />
            <div className="flex flex-col">
                <Link href={`/blog/${slug}`} target="_blank">
                    <h2 className="text-xl font-bold hover:underline">{header}</h2>
                </Link>
                <p className="text-xs font-light text-gray-400">{id}</p>
                <p className="text-sm text-gray-600">
                    {dayjs(createdAt).format('hh:mm DD/MM/YYYY')}
                </p>
                <p className="mt-3">{description}</p>
            </div>
            <div className="ml-auto flex flex-col items-center justify-center gap-2 px-4">
                <button className="mb-auto rounded-lg border-2 bg-red-500 p-1 text-white hover:border-red-500 hover:bg-white hover:text-red-500">
                    <DeleteIcon />
                </button>
                <button className="hover:text-yellow-500">
                    <EditIcon />
                </button>
            </div>
        </div>
    )
}
