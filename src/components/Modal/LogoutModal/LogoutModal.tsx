import React from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
    onLogout: () => void
}

export default function LogoutModal({ isOpen, onClose, onLogout }: Props) {
    if (!isOpen) return null
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative ">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-xl border-[3px] border-primary bg-[#fff8ee] outline-none focus:outline-none">
                        <div className="flex flex-col justify-center px-10 pt-8">
                            <center>
                                <p className="w-[260px] font-medium">Bạn có muốn đăng xuất?</p>
                            </center>
                        </div>
                        <div className="flex justify-center gap-8 rounded-b p-6">
                            <button
                                className=" background-transparent mb-1 mr-4 border-2 border-primary bg-white  px-6 py-2 text-sm font-bold uppercase text-primary 
													outline-none transition-all duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                type="button"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                            <button
                                className="mb-1 mr-1  rounded-lg border-2 border-primary bg-white px-4 py-2 text-sm font-bold uppercase text-primary outline-none transition-all  duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                type="button"
                                onClick={onLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
    )
}
