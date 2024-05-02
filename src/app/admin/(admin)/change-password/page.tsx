'use client'

import React, { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'
import userAction from '~/services/axios/actions/user.action'

export default function AdminChangePasswordPage() {
    const [isShowCurPassword, setIsShowCurPassword] = useState(false)
    const [isShowNewPassword, setIsShowNewPassword] = useState(false)
    const [isShowRePassword, setIsShowRePassword] = useState(false)
    const [curPassword, setCurPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const handleChangeCurPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCurPassword(e.target.value)
    const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewPassword(e.target.value)
    const handleChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
        setRePassword(e.target.value)

    const togglePassword = (prev: boolean) => !prev

    const handleSubmit = async () => {
        if (!curPassword) {
            toast.error('Mật khẩu không được để trống')
            return
        }
        if (!newPassword) {
            toast.error('Mật khẩu mới không được để trống')
            return
        }
        if (newPassword !== rePassword) {
            toast.error('Mật khẩu mới không trùng khớp')
            return
        }

        try {
            const res = await toast.promise(userAction.changePassword(curPassword, newPassword), {
                pending: 'Đang thay đổi mật khẩu',
                success: 'Đổi mật khẩu thành công',
                error: 'Đổi mật khẩu thất bại',
            })

            setCurPassword('')
            setNewPassword('')
            setRePassword('')
        } catch (error: any) {
            // if (error.response) {
            //     const status = error.response.status
            //     if (status === 400) {
            //         toast.error('Sai mật khẩu')
            //     }
            //     else if (status === 403) {
            //         toast.error('Mật khẩu phải có ít nhất 8 ký tự và 1 chữ')
            //     }
            // }
            // console.log('error: ', error);

            const message = error.response?.data?.message
            toast.error(message)
        }
    }

    const handleRePasswordKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter') {
            return
        }

        e.preventDefault()
        handleSubmit()
    }

    return (
        <div className="h-full w-full pl-10 pt-10">
            <div className="flex w-full justify-center">
                <div className="flex h-[540px] w-[420px] flex-col items-center justify-center gap-5 rounded-xl border-2 border-solid border-primary bg-[#FFEFD5]">
                    <p className="mb-5 text-2xl font-medium uppercase text-second">Đổi mật khẩu</p>
                    <div>
                        <label className="mb-2 flex" htmlFor="current-password">
                            Nhập mật khẩu hiện tại của bạn:{' '}
                        </label>
                        <div className="flex h-[42px] w-[300px] flex-row items-center justify-center rounded-md border-2 border-solid border-primary bg-third px-4 text-second">
                            <input
                                className=" h-full w-full bg-third py-2 outline-none"
                                type={isShowCurPassword ? 'text' : 'password'}
                                id="current-password"
                                value={curPassword}
                                onChange={handleChangeCurPassword}
                            />
                            {isShowCurPassword ? (
                                <div
                                    className="cursor-pointer"
                                    id="eyeOpen"
                                    onClick={() => setIsShowCurPassword(togglePassword)}
                                >
                                    <VisibilityOffIcon />
                                </div>
                            ) : (
                                <div
                                    className="cursor-pointer"
                                    id="eyeOpen"
                                    onClick={() => setIsShowCurPassword(togglePassword)}
                                >
                                    <RemoveRedEyeIcon />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 flex" htmlFor="new-password">
                            Nhập mật khẩu mới:{' '}
                        </label>
                        <div className="flex h-[42px] w-[300px] cursor-text flex-row items-center justify-center rounded-md border-2 border-solid border-primary bg-third px-4 text-second">
                            <input
                                id="new-password"
                                className="h-full w-full bg-third py-2 outline-none"
                                type={isShowNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={handleChangeNewPassword}
                            />
                            {isShowNewPassword ? (
                                <div
                                    className="cursor-pointer"
                                    id="eyeOpen"
                                    onClick={() => setIsShowNewPassword(togglePassword)}
                                >
                                    <VisibilityOffIcon />
                                </div>
                            ) : (
                                <div
                                    className="cursor-pointer"
                                    id="eyeOpen"
                                    onClick={() => setIsShowNewPassword(togglePassword)}
                                >
                                    <RemoveRedEyeIcon />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 flex" htmlFor="re-password">
                            Xác nhận mật khẩu mới:{' '}
                        </label>
                        <div className="flex h-[42px] w-[300px] cursor-text flex-row items-center justify-center rounded-md border-2 border-solid border-primary bg-third px-4 text-second">
                            <input
                                id="re-password"
                                className="h-full w-full bg-third py-2 outline-none"
                                type={isShowRePassword ? 'text' : 'password'}
                                value={rePassword}
                                onChange={handleChangeRePassword}
                                onKeyDown={handleRePasswordKeyDown}
                            />
                            <button
                                className="cursor-pointer"
                                id="eyeOpen"
                                onClick={() => setIsShowRePassword(togglePassword)}
                            >
                                {isShowRePassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                            </button>
                        </div>
                    </div>

                    <button
                        className="mt-5 h-[50px] w-[150px] rounded-[10px] bg-primary text-third outline-none"
                        onClick={handleSubmit}
                    >
                        Đổi mật khẩu
                    </button>
                    <a href="/forgot-password">Quên mật khẩu ?</a>
                </div>
            </div>
        </div>
    )
}
