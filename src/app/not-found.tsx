import Link from 'next/link';

import ROUTES from '~/constants/routes';
import cn from '~/lib/cn';
import styles from '~/styles/notfound.module.scss';

export default function NotFound() {
  return (
    <div className={cn('inner', styles.container)}>
      <img alt="Web not found image" className={styles.image} src={'/images/404.svg'} />
      <Link href={ROUTES.HOME} className={styles.btn}>
        <button>Trở về trang chủ</button>
      </Link>
    </div>
  );
}
