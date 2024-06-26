import Image from 'next/image'
import { Metadata } from 'next'

import LoginForm from '~/components/AuthForm/LoginForm'
import styles from '~/styles/auth.module.scss'

export function generateMetadata(): Metadata {
    return {
        title: 'Bếp UIT - Đăng nhập',
    }
}

function UserLoginPage() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles['logo__section']}>
                    <Image
                        className={styles.image}
                        alt="Logo"
                        src={'/logos/bepuit_logo.svg'}
                        width={100}
                        height={100}
                    />
                </div>
                <LoginForm />
            </div>
        </>
    )
}

export default UserLoginPage
