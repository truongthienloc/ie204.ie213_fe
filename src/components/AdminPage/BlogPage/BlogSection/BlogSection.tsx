'use client'

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import blogAction from '~/services/axios/actions/blog.action'
import Skeleton from '@mui/material/Skeleton'
import BlogItem from '../../../BlogItem/BlogItem'

type Props = {}

export default function BlogSection({}: Props) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ['get-blogs'],
        queryFn: blogAction.getBlogs,
    })

    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => blogAction.deleteBlog(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-blogs'] }),
    })

    const handleEditClick = (id: string) => {
        router.push(`/admin/blog/write/${id}`)
    }

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
        <div className="flex flex-col gap-4 pb-8">
            {data?.map((blog) => (
                <BlogItem
                    key={blog._id}
                    id={blog._id}
                    title={blog.title}
                    header={blog.header}
                    keywords={blog.keywords}
                    description={blog.description}
                    imgSrc={blog.blogImages?.[0]?.url}
                    createdAt={blog.createdAt}
                    slug={blog.slugName}
                    onDelete={() => deleteMutation.mutate({ id: blog._id })}
                    onEditClick={() => handleEditClick(blog._id)}
                />
            ))}
        </div>
    )
}
