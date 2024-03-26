'use client'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

import styles from '../../styles/form.module.scss'
import InputField from './InputField'
import NavigationStatement from './NavigationStatement'

function SignupForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <>
            <div className={styles.form}>
                <Typography component="h2" variant="h5" className={styles.heading}>
                    ĐĂNG KÝ
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
                        <InputLabel htmlFor="username" className={styles.label}>
                            Tên đăng nhập *
                        </InputLabel>
                        <InputField
                            placeholder="Enter username"
                            id="username"
                            type="text"
                            name="username"
                            className={styles.input}
                            value={username}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(event.target.value)
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
                        <InputLabel htmlFor="confirmPassword" className={styles.label}>
                            Xác nhận mật khẩu *
                        </InputLabel>
                        <InputField
                            placeholder="Confirm your password"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            className={styles.input}
                            value={confirmPassword}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setConfirmPassword(event.target.value)
                            }
                        />
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
