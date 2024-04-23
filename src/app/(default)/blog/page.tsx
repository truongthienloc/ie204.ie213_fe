import React from 'react'
import { getBlogs } from './action'
import { notFound } from 'next/navigation'
import ReadonlyBlogItem from '~/components/BlogItem/ReadonlyBlogItem'
import { Metadata } from 'next'

import styles from '~/styles/blog.module.scss'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Bếp UIT - Bài viết của chúng tôi',
        description:
            'Bạn sẽ được chìm đắm trong không gian ẩm thực độc đáo, cảm nhận sự tâm huyết và nỗ lực của đầu bếp tại Bếp UIT trong việc tạo ra những trải nghiệm ẩm thực đáng nhớ. Hãy cùng chúng tôi bước vào hành trình khám phá văn hóa ẩm thực Việt Nam và chia sẻ những hương vị tuyệt vời qua những bài viết chân thành và đầy cảm xúc của chúng tôi. Hãy để Bếp UIT là điểm đến lý tưởng của bạn, nơi bạn tìm thấy những bí quyết ẩm thực độc đáo và những trải nghiệm không thể quên!',
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
