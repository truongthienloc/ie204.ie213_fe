import Link from 'next/link'
import React from 'react'
import { BlogSection } from '~/components/AdminPage/BlogPage/BlogSection'

type Props = {}

export default function BlogPage({}: Props) {
    return (
        <div className="container flex flex-col gap-4 pt-4">
            <div className="flex flex-row gap-4">
                <Link href={'/admin/blog/write'} className="rounded-lg bg-primary p-2 text-white">
                    New
                </Link>
            </div>

            <hr className="border-primary" />

            <BlogSection />
        </div>
    )
}
