import React from 'react'
import { getBlogs } from './action'
import { notFound } from 'next/navigation'
import ReadonlyBlogItem from '~/components/BlogItem/ReadonlyBlogItem'

type Props = {}

export default async function BlogsPage({}: Props) {
    try {
        const blogs = await getBlogs()

        return (
            <div className="container py-8">
                <div className="mb-14 flex flex-col">
                    <h1 className="text-center text-7xl font-bold">Blogs</h1>
                </div>

                <div className="flex flex-col items-center gap-6">
                    {blogs.map((blog) => (
                        <ReadonlyBlogItem
                            key={blog._id}
                            id={blog._id}
                            header={blog.header}
                            description={blog.description}
                            imgSrc={blog.blogImages?.[0]?.url}
                            createdAt={blog.createdAt}
                            slug={blog.slugName}
                        />
                    ))}
                </div>
            </div>
        )
    } catch (error) {
        notFound()
    }
}
