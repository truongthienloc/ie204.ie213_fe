import Link from 'next/link'
import React from 'react'

type Props = {}

export default function BlogPage({}: Props) {
    return (
        <div className="container flex flex-col gap-4 pt-4">
            <div className="flex flex-row gap-4">
                <Link href={'/admin/blog/write'} className="p-2 bg-primary text-white rounded-lg">
                    New
                </Link>
            </div>

            <hr className="border-primary" />
        </div>
    )
}
