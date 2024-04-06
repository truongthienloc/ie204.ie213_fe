'use client'
import { FormEvent, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import styles from '~/styles/form.module.scss'
import InputField from './InputField'
import NavigationStatement from './NavigationStatement'
import InputValue from '~/types/InputValue'

function ForgotPasswordForm() {
    const [email, setEmail] = useState<string>('')
    const [errors, setErrors] = useState<InputValue>({})

    const handleValidateForm = (values: InputValue) => {
        const errors: InputValue = {}
        const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/

        if (!email.trim()) {
            errors.email = 'Vui lòng nhập email'
        } else if (
            !email.toLowerCase().match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)
        ) {
            errors.email = 'Email không hợp lệ!'
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
        handleValidateForm({ email })
    }

    return (
        <div className={styles.form}>
            <Typography component="h2" variant="h5" className={styles.heading}>
                QUÊN MẬT KHẨU
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
                    <p className="mt-4 select-none text-center text-lg">
                        Mật khẩu mới sẽ được gửi đến email của bạn!
                    </p>
                </div>

                <div className={styles.formGroup}>
                    <button type="submit" className={styles.btn}>
                        Gửi mật khẩu
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <NavigationStatement
                        question="Đã nhớ mật khẩu? "
                        content="Đăng nhập ngay"
                        href="/login"
                    />
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
