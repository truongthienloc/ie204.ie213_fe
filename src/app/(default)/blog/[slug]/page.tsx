import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import Link from 'next/link';

import SocialsShare from '~/components/SocialsShare';
import defaultConfigs from '~/configs/defaultConfigs';
import addLazyLoadingToImages from '~/helpers/convert/blogHTML.convert';
import { Blog } from '~/interfaces/blog.type';
import styles from '~/styles/blog.module.scss';

import { getBlogDetail } from '../action';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const blog: Blog = await getBlogDetail(slug);
  const { appMetadata } = defaultConfigs;

  return {
    title: blog?.title,
    description: blog?.description,
    keywords: [...(appMetadata?.keywords ?? []), ...blog?.keywords],
    openGraph: {
      description: blog?.description,
      countryName: 'Việt Nam',
      modifiedTime: blog?.updatedAt,
      images: [blog?.blogImages[0]],
      authors: 'Bếp UIT',
    },
  };
}

function htmlParser(htmlString: string) {
  return <div dangerouslySetInnerHTML={{ __html: addLazyLoadingToImages(htmlString) }} />;
}

async function BlogDetailPage({ params: { slug } }: Props) {
  const blog: Blog = await getBlogDetail(slug);

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
        <time dateTime={blog?.createdAt} className={styles.date}>
          <CalendarMonthOutlinedIcon />
          {dayjs(blog?.createdAt).format('DD/MM/YYYY')}
        </time>
        <SocialsShare />
      </div>
      <h1 className={styles.title}>{blog?.header}</h1>
      {htmlParser(blog?.content)}
    </div>
  );
}

export default BlogDetailPage;
