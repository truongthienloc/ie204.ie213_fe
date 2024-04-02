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
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative ">
                    {/*content*/}
                    <div className="border-[3px] border-primary bg-[#fff8ee] rounded-xl relative flex flex-col w-full outline-none focus:outline-none">
                        <div className="justify-center flex flex-col px-10 pt-8">
                            <center>
                                <p className="w-[260px] font-medium">Bạn có muốn đăng xuất?</p>
                            </center>
                        </div>
                        <div className="flex justify-center gap-8 p-6 rounded-b">
                            <button
                                className=" background-transparent font-bold uppercase px-6 py-2 text-sm  bg-white border-primary border-2 text-primary hover:border-primary hover:text-white 
													hover:bg-primary outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-white text-primary  border-primary border-2 font-bold uppercase rounded-lg text-sm px-4 py-2 outline-none hover:bg-primary hover:border-primary hover:text-white  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
