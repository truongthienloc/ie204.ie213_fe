import React from 'react'
import { notFound } from 'next/navigation'
import { WriteBlogForm } from '~/components/WriteBlog/WriteBlogForm'
import { getBlog } from './action'

type Props = {
    params: {
        id: string
    }
}

export default async function EditBlogPage({ params }: Props) {
    const { id } = params

    try {
        const blog = await getBlog(id)

        return <WriteBlogForm instanceBlog={blog} isAutoSave={false} isEdit={true} />
    } catch (error) {
        notFound()
    }
}
