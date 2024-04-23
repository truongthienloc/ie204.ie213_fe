import { Metadata } from 'next'

import SignupForm from '~/components/AuthForm/SignupForm'
import Image from 'next/image'

import styles from '~/styles/auth.module.scss'

export function generateMetadata(): Metadata {
    return {
        title: 'Bếp UIT - Đăng ký',
    }
}

function SignUpPage() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.logo__section}>
                    <Image
                        src={'/logos/bepuit_logo.svg'}
                        alt="Logo"
                        width={100}
                        height={100}
                        className={styles.image}
                    />
                </div>
                <SignupForm />
            </div>
        </>
    )
}

export default SignUpPage
