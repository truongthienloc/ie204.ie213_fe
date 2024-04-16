import clsx from 'clsx'
import Link from 'next/link'

import styles from '~/styles/notfound.module.scss'

export default function NotFound() {
    return (
        <div className={clsx('inner', styles.container)}>
            <img alt="Web not found image" className={styles.image} src={'/images/404.svg'} />
            <Link href={'/'} className={styles.btn}>
                <button>Trở về trang chủ</button>
            </Link>
        </div>
    )
}
