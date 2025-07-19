import Link from 'next/link';

import styles from '~/styles/notfound.module.scss';
import cn from '~/lib/cn';
import ROUTES from '~/constants/routes';

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
