import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

type Props = {
    id?: string
    header: string
    imgSrc?: string
    description: string
    createdAt: string
    slug: string
}

export default function ReadonlyBlogItem({
    id,
    header,
    imgSrc,
    description,
    createdAt,
    slug,
}: Props) {
    return (
        <div className="flex w-[724px] flex-row gap-24 hover:shadow">
            <Link href={`/blog/${slug}`} className="flex h-[206px] w-[266px] rounded-xl bg-gray-50">
                <img
                    className="m-auto rounded-[inherit]"
                    src={imgSrc || 'https://placehold.co/400x300'}
                    alt={header}
                />
            </Link>
            <div className="flex flex-1 flex-col gap-3 py-3 pr-3">
                <Link href={`/blog/${slug}`} className="text-primary hover:underline">
                    <h2 className="text-lg font-medium">{header}</h2>
                </Link>
                <p className="text-sm">{description}</p>
                <div className="mt-auto flex flex-row justify-between">
                    <time className="text-sm text-gray-400" dateTime={createdAt}>
                        {dayjs(createdAt).format('DD/MM/YYYY')}
                    </time>
                    <Link
                        href={`/blog/${slug}`}
                        className="text-xs font-medium hover:font-bold hover:underline"
                    >
                        READ MORE
                    </Link>
                </div>
            </div>
        </div>
    )
}
