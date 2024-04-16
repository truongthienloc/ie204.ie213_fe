import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

import styles from '~/styles/blog.module.scss'

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
        <div className={styles.card}>
            <Link href={`/blog/${slug}`} className={styles['card__image']}>
                <img src={imgSrc || 'https://placehold.co/400x300'} alt={header} />
            </Link>
            <div className={styles['card__info']}>
                <Link href={`/blog/${slug}`} className="text-primary hover:underline">
                    <h2 className="text-lg font-medium">{header}</h2>
                </Link>
                <p className={styles['card__desc']}>{description}</p>
                <div className="mt-6 flex flex-row items-center justify-between">
                    <time
                        className="flex items-center gap-1 text-sm text-gray-400"
                        dateTime={createdAt}
                    >
                        <CalendarMonthOutlinedIcon />
                        {dayjs(createdAt).format('DD/MM/YYYY')}
                    </time>
                    <Link
                        href={`/blog/${slug}`}
                        className="text-xs font-medium hover:font-bold hover:underline"
                    >
                        Xem thêm
                    </Link>
                </div>
            </div>
        </div>
    )
}
