'use client'
import { FormEvent, useState } from 'react'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

import styles from '../../styles/form.module.scss'
import InputField from './InputField'
import NavigationStatement from './NavigationStatement'
import InputValue from '~/types/InputValue'

function SignupForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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

        if (!username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập'

        if (!password.trim()) {
            errors.password = 'Vui lòng nhập mật khẩu'
        }

        if (!confirmPassword.trim()) errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
        else if (confirmPassword.trim() !== password.trim())
            errors.confirmPassword = 'Xác nhận mật khẩu không chính xác!'

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
        else if (key === 'username') delete newError.username
        else if (key === 'confirmPassword') delete newError.confirmPassword
        setErrors(newError)
    }

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()
        handleValidateForm()
    }

    return (
        <>
            <div className={styles.form}>
                <Typography component="h2" variant="h5" className={styles.heading}>
                    ĐĂNG KÝ
                </Typography>
                <form
                    action="#"
                    method="POST"
                    className={styles.wrapper}
                    onSubmit={handleSubmitForm}
                >
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
                        <InputLabel htmlFor="username" className={styles.label}>
                            Tên đăng nhập *
                        </InputLabel>
                        <InputField
                            placeholder="Nhập mật khẩu"
                            id="username"
                            type="text"
                            name="username"
                            className={`${styles.input}${errors?.username ? ' ' + styles.error : ''}`}
                            value={username}
                            handleOnFocus={() => handleFocusInput('username')}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(event.target.value)
                            }
                        />
                        {errors?.username && (
                            <span className={styles.error}>{errors?.username}</span>
                        )}
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
                            value={password}
                            handleOnFocus={() => handleFocusInput('password')}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(event.target.value)
                            }
                        />
                        {errors?.password && (
                            <span className={styles.error}>{errors?.password}</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <InputLabel htmlFor="confirmPassword" className={styles.label}>
                            Xác nhận mật khẩu *
                        </InputLabel>
                        <InputField
                            placeholder="Xác nhận mật khẩu"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            className={`${styles.input}${errors?.confirmPassword ? ' ' + styles.error : ''}`}
                            value={confirmPassword}
                            handleOnFocus={() => handleFocusInput('confirmPassword')}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setConfirmPassword(event.target.value)
                            }
                        />
                        {errors?.confirmPassword && (
                            <span className={styles.error}>{errors?.confirmPassword}</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.btn}>
                            Đăng ký
                        </button>
                    </div>
                    <div className={styles.formGroup}>
                        <NavigationStatement
                            question="Bạn đã có tài khoản? "
                            content="Đăng nhập ngay"
                            href="/login"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignupForm
