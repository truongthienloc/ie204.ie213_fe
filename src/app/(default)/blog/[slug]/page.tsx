import { Metadata } from 'next'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import Link from 'next/link'
import dayjs from 'dayjs'

import { getBlogDetail } from '../action'
import { Blog } from '~/interfaces/blog.type'
import styles from '~/styles/blog.module.scss'

type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug
    const blog: Blog = await getBlogDetail(slug)

    return {
        title: blog?.title,
        description: blog?.description,
        keywords: blog?.keywords,
        openGraph: {
            description: blog?.description,
            countryName: 'Việt Nam',
            modifiedTime: blog?.updatedAt,
            images: [blog?.blogImages[0]],
            authors: 'Bếp UIT',
        },
    }
}

function htmlParser(htmlString: string) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
}

async function BlogDetailPage({ params: { slug } }: Props) {
    const blog: Blog = await getBlogDetail(slug)

    return (
        <div className={styles.wrapper}>
            <div className={styles.breadcrum}>
                <Link href="/">Trang chủ</Link>
                {' / '}
                <Link href="/blog">bài viết</Link>
                {' / '}
                <span>{blog?.title.toLowerCase()}</span>
            </div>
            <div className={styles.top}>
                <div className={styles.date}>
                    <CalendarMonthOutlinedIcon />
                    <span>{dayjs(blog?.createdAt).format('DD/MM/YYYY')}</span>
                </div>
                <button>
                    <FavoriteBorderOutlinedIcon />
                    <ShareOutlinedIcon />
                </button>
            </div>
            <h1 className={styles.title}>{blog?.title}</h1>
            {htmlParser(blog?.content)}
        </div>
    )
}

export default BlogDetailPage
