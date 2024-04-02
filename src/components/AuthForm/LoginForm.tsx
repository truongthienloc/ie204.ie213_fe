'use client'
import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { FormEvent } from 'react'
import Image from 'next/image'

import InputField from './InputField'
import NavigationStatement from './NavigationStatement'
import InputValue from '~/types/InputValue'

import styles from '../../styles/form.module.scss'
import clsx from 'clsx'

function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<InputValue>({})

    const handleValidateForm = () => {
        const errors: InputValue = {}
        const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/

        if (!email.trim()) {
            errors.email = 'Vui lòng nhập email'
        } else if (
            !email.toLowerCase().match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)
        ) {
            errors.email = 'Email không hợp lệ!'
        }

        if (!password.trim()) {
            errors.password = 'Vui lòng nhập mật khẩu'
        }

        setErrors(errors)

        if (!Object.keys(errors).length) {
            // call API here
            console.log('Form submit successfully')
        }
    }

    const handleFocusInput = (key: string) => {
        const newError: InputValue = { ...errors }
        if (key === 'email') delete newError.email
        else if (key === 'password') delete newError.password
        setErrors(newError)
    }

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()
        handleValidateForm()
    }

    return (
        <div className={styles.form}>
            <Typography component="h2" variant="h5" className={styles.heading}>
                ĐĂNG NHẬP
            </Typography>
            <form action="#" method="POST" className={styles.wrapper} onSubmit={handleSubmitForm}>
                <div className={styles.formGroup}>
                    <InputLabel htmlFor="email" className={styles.label}>
                        Email *
                    </InputLabel>
                    <InputField
                        id="email"
                        value={email}
                        type="text"
                        name="email"
                        className={`${styles.input}${errors?.email ? ' ' + styles.error : ''}`}
                        placeholder="Nhập email của bạn"
                        handleOnFocus={() => handleFocusInput('email')}
                        handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(event.target.value)
                        }
                    />
                    {errors?.email && <span className={styles.error}>{errors?.email}</span>}
                </div>
                <div className={styles.formGroup}>
                    <InputLabel htmlFor="password" className={styles.label}>
                        Mật khẩu *
                    </InputLabel>
                    <InputField
                        placeholder="Nhập mật khẩu"
                        id="password"
                        type="password"
                        name="password"
                        className={`${styles.input}${errors?.password ? ' ' + styles.error : ''}`}
                        handleOnFocus={() => handleFocusInput('password')}
                        value={password}
                        handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event.target.value)
                        }
                    />
                    {errors?.password && <span className={styles.error}>{errors?.password}</span>}
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
                        <div className={clsx(styles.option, 'cursor-pointer')}>
                            <Image
                                alt="facebook logo"
                                src="/logos/facebook.svg"
                                width={32}
                                height={32}
                            />
                            <span>Facebook</span>
                        </div>
                        <div className={clsx(styles.option, 'cursor-pointer')}>
                            <Image
                                alt="facebook logo"
                                src="/logos/google.svg"
                                width={32}
                                height={32}
                            />
                            <span>Google</span>
                        </div>
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
