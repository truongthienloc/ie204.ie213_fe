'use client'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Image from 'next/image'

import InputField from './InputField'
import NavigationStatement from './NavigationStatement'

import styles from '../../styles/form.module.scss'

function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <div className={styles.form}>
            <Typography component="h2" variant="h5" className={styles.heading}>
                ĐĂNG NHẬP
            </Typography>
            <form action="#" method="POST" className={styles.wrapper}>
                <div className={styles.formGroup}>
                    <InputLabel htmlFor="email" className={styles.label}>
                        Email *
                    </InputLabel>
                    <InputField
                        id="email"
                        value={email}
                        type="email"
                        name="email"
                        className={styles.input}
                        placeholder="Enter your email"
                        handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>
                <div className={styles.formGroup}>
                    <InputLabel htmlFor="password" className={styles.label}>
                        Mật khẩu *
                    </InputLabel>
                    <InputField
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        name="password"
                        className={styles.input}
                        value={password}
                        handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.forgotPassword}>
                        <Link href="/forgot-password">Quên mật khẩu</Link>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.btn}>
                        Đăng nhập
                    </button>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.more}>
                        <div className={styles.horizontalLine}></div>
                        <span>HOẶC</span>
                        <div className={styles.horizontalLine}></div>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className="flex items-center gap-10">
                        <button className={styles.option}>
                            <Image
                                alt="facebook logo"
                                src="/logos/facebook.svg"
                                width={32}
                                height={32}
                            />
                            <span>Facebook</span>
                        </button>
                        <button className={styles.option}>
                            <Image
                                alt="facebook logo"
                                src="/logos/google.svg"
                                width={32}
                                height={32}
                            />
                            <span>Google</span>
                        </button>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <NavigationStatement
                        question="Bạn chưa có tài khoản? "
                        content="Đăng ký ngay"
                        href="/signup"
                    />
                </div>
            </form>
        </div>
    )
}

export default LoginForm
