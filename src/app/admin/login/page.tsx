'use client'
import React, { useState, useEffect } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'
import { clientInstance } from '~/services/axios'
import authAction, { LoginResponse } from '~/services/axios/actions/auth.action'
import { useRouter } from 'next/navigation'
import { useAuth } from '~/stores/auth'
import { setAccessToken } from './action'

type Props = {}

export default function LoginAdminPage({}: Props) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const auth = useAuth()

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value)
    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (auth.isAdmin) {
            router.replace('/admin/manage-client')
        } else {
            clientInstance.removeAccessToken()
        }
    }, [auth, router])

    const handleSubmit = async () => {
        if (email === '') {
            toast.error('Vui lòng không để trống email')
            return
        }

        if (password === '') {
            toast.error('Vui lòng không để trống password')
            return
        }

        try {
            const res = await toast.promise(
                new Promise<LoginResponse>(async (resolve, reject) => {
                    try {
                        const res = await authAction.loginAdminAccount(email, password)

                        resolve(res)
                    } catch (error) {
                        reject(error)
                    }
                }),
                {
                    pending: 'Đang đăng nhập',
                    success: 'Đăng nhập thành công',
                    error: 'Đăng nhập thất bại',
                },
            )

            setAccessToken(res.accessToken)
            auth.login({ isAdmin: true })
            router.replace('/admin/manage-client')
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status
                if (status === 400) {
                    toast.error('Email hoặc password sai')
                } else if (status === 403) {
                    toast.error('Tài khoản của bạn không có quyền admin')
                }
            }
        }
    }

    const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') {
            return
        }

        e.preventDefault()
        handleSubmit()
    }

    return (
        <div className="flex min-h-screen w-full flex-col gap-48 bg-third">
            <div className="mx-auto flex w-full max-w-full flex-row justify-center bg-primary text-white">
                <p>4Food&#39;s Administrator</p>
            </div>
            <div className="flex w-full justify-center ">
                <form className="flex h-[390px] w-[420px] flex-col items-center rounded-xl border-2 border-solid border-primary bg-[#FFEFD5]">
                    <p className="mb-11 pt-14 text-2xl font-medium text-second">ĐĂNG NHẬP</p>
                    <input
                        className="mb-11 h-[42px] w-[300px] rounded-md border-2 border-solid border-primary bg-third px-5 text-second outline-none"
                        type="text"
                        placeholder="Nhập tài khoản"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <div className="flex h-[42px] w-[300px] cursor-text flex-row items-center justify-center rounded-md border-2 border-solid border-primary bg-third px-5 text-second">
                        <input
                            id="pass"
                            className="h-full w-full bg-third outline-none"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={handleChangePassword}
                            onKeyDown={handlePasswordKeyDown}
                        />
                        <div
                            className="cursor-pointer"
                            id="eyeOpen"
                            onClick={handleShowPasswordClick}
                        >
                            {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                        </div>
                    </div>
                    <button
                        className="mt-10 h-[50px] w-[150px] rounded-[10px] bg-primary text-third"
                        onClick={handleSubmit}
                        type="button"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}
