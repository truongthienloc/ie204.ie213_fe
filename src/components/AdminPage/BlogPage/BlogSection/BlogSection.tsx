'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import blogAction from '~/services/axios/actions/blog.action'
import Skeleton from '@mui/material/Skeleton'
import BlogItem from '../../../BlogItem/BlogItem'

type Props = {}

export default function BlogSection({}: Props) {
    const { data, isLoading } = useQuery({
        queryKey: ['get-blogs'],
        queryFn: blogAction.getBlogs,
    })

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {data?.map((blog) => (
                <BlogItem
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
    )
}
