import React from 'react'
import { getBlogs } from './action'
import { notFound } from 'next/navigation'
import ReadonlyBlogItem from '~/components/BlogItem/ReadonlyBlogItem'
import { Metadata } from 'next'

import styles from '~/styles/blog.module.scss'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Bếp UIT - Bài viết của chúng tôi',
    }
}

export default async function BlogsPage() {
    try {
        const blogs = await getBlogs()

        return (
            <>
                <div style={{ padding: '20px 0' }}>
                    <h1 className={styles.heading}>Bài viết của chúng tôi</h1>
                    <div className="row">
                        {blogs.map((blog) => (
                            <div
                                key={blog?._id}
                                className="col lg-6 md-12 sm-12"
                                style={{ marginTop: '16px' }}
                            >
                                <ReadonlyBlogItem
                                    id={blog._id}
                                    header={blog.header}
                                    description={blog.description}
                                    imgSrc={blog.blogImages?.[0]?.url}
                                    createdAt={blog.createdAt}
                                    slug={blog.slugName}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    } catch (error) {
        notFound()
    }
}
