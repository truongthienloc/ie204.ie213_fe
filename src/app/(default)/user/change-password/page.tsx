'use client'

import { InputLabel } from '@mui/material'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import InputField from '~/components/AuthForm/InputField'
import styles from '~/styles/user.module.scss'
import formStyles from '~/styles/form.module.scss'
import { changePassword } from '~/services/axios/actions/user.action'

type Input = {
    oldPassword?: string
    newPassword?: string
    confirmPassword?: string
}

function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Input>({})

    const handleValidateForm = async () => {
        const errors: Input = {}

        if (!oldPassword.trim()) {
            errors.oldPassword = 'Vui lòng nhập mật khẩu hiện tại'
        }

        if (!newPassword.trim()) {
            errors.newPassword = 'Vui lòng nhập mật khẩu mới'
        }

        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Vui lòng xác thực mật khẩu'
        } else if (confirmPassword.trim() !== newPassword.trim()) {
            errors.confirmPassword = 'Xác thực mật khẩu không chính xác'
        }

        setErrors(errors)

        if (!Object.keys(errors).length) {
            try {
                const res = await toast.promise(
                    new Promise(async (resolve, reject) => {
                        try {
                            const res = changePassword(oldPassword, newPassword)
                            resolve(res)
                        } catch (error) {
                            reject(error)
                        }
                    }),
                    {
                        pending: 'Thay đổi mật khẩu',
                        success: 'Thay đổi thành công',
                        error: 'Đổi mật khẩu thất bại',
                    },
                )
            } catch (error: any) {
                toast.error('Email hoặc password không chính xác')
            }
        }
    }

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()
        handleValidateForm()
    }

    const handleFocusInput = (key: string) => {
        const newError: Input = { ...errors }
        if (key === 'oldPassword') delete newError.oldPassword
        else if (key === 'newPassword') delete newError.newPassword
        else if (key === 'confirmPassword') delete newError.confirmPassword
        setErrors(newError)
    }

    return (
        <>
            <h1 className={styles.heading}>Thay đổi mật khẩu</h1>
            <div className="mt-4">
                <form action="#" method="POST" className={styles.form} onSubmit={handleSubmitForm}>
                    <div className={formStyles.formGroup}>
                        <InputLabel htmlFor="email" className={formStyles.label}>
                            Mật khẩu cũ*
                        </InputLabel>
                        <InputField
                            id="oldPassword"
                            value={oldPassword}
                            type="text"
                            name="oldPassword"
                            className={`${formStyles.input}${errors?.oldPassword ? ' ' + formStyles.error : ''}`}
                            placeholder="Mật khẩu hiện tại"
                            handleOnFocus={() => handleFocusInput('oldPassword')}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setOldPassword(event.target.value)
                            }
                        />
                        {errors?.oldPassword && (
                            <span className={formStyles.error}>{errors?.oldPassword}</span>
                        )}
                    </div>
                    <div className={formStyles.formGroup}>
                        <InputLabel htmlFor="newPassword" className={formStyles.label}>
                            Mật khẩu mới*
                        </InputLabel>
                        <InputField
                            placeholder="Mật khẩu mới"
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            className={`${formStyles.input}${errors?.newPassword ? ' ' + formStyles.error : ''}`}
                            handleOnFocus={() => handleFocusInput('newPassword')}
                            value={newPassword}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setNewPassword(event.target.value)
                            }
                        />
                        {errors?.newPassword && (
                            <span className={formStyles.error}>{errors?.newPassword}</span>
                        )}
                    </div>
                    <div className={formStyles.formGroup}>
                        <InputLabel htmlFor="confirmPassword" className={formStyles.label}>
                            Xác nhận mật khẩu mới*
                        </InputLabel>
                        <InputField
                            placeholder="Xác nhận mật khẩu mới"
                            id="confirmPassword"
                            type="password"
                            name="password"
                            className={`${formStyles.input}${errors?.confirmPassword ? ' ' + formStyles.error : ''}`}
                            handleOnFocus={() => handleFocusInput('confirmPassword')}
                            value={confirmPassword}
                            handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setConfirmPassword(event.target.value)
                            }
                        />
                        {errors?.confirmPassword && (
                            <span className={formStyles.error}>{errors?.confirmPassword}</span>
                        )}
                    </div>
                    <div className={formStyles.formGroup}>
                        <button type="submit" className={formStyles.btn}>
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordPage
