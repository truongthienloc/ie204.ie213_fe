import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'
import useDiscount from '~/hooks/useDiscount.hook'

type Props = {
    isOpen: boolean
    discountInfo: ReturnType<typeof useDiscount>
    onClose?: () => void
    onSubmit?: () => void
}

export default function AddDiscountModal({ isOpen, discountInfo, onClose, onSubmit }: Props) {
    if (!isOpen) return null
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative my-6">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex  justify-center border-b border-solid p-5">
                            <h3 className="text-2xl font-medium text-primary ">Thêm khuyến mãi</h3>
                        </div>
                        {/*body*/}
                        <div className="mt-4 flex flex-col justify-center gap-7 px-7   ">
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Mã khuyến mãi:</p>
                                <input
                                    type="text"
                                    className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={discountInfo.id}
                                    onChange={discountInfo.handleChangeId}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Tên khuyến mãi:</p>
                                <input
                                    type="text"
                                    className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={discountInfo.discountName}
                                    onChange={discountInfo.handleChangeDiscountName}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Mô tả:</p>
                                <textarea
                                    name=""
                                    id=""
                                    rows={5}
                                    className="h-[100px] w-[300px]  resize-none rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={discountInfo.description}
                                    onChange={discountInfo.handleChangeDescription}
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Mức giảm:</p>
                                <input
                                    type="number"
                                    className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={discountInfo.percent}
                                    onChange={discountInfo.handleChangePercent}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Ngày bắt đầu:</p>
                                <DatePicker
                                    className="flex-1"
                                    format="DD/MM/YYYY"
                                    value={discountInfo.startDay}
                                    onChange={discountInfo.handleChangeStartDay}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Ngày kết thúc</p>
                                <DatePicker
                                    className="flex-1"
                                    format="DD/MM/YYYY"
                                    value={discountInfo.endDay}
                                    onChange={discountInfo.handleChangeEndDay}
                                />
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="mt-4 flex items-center justify-end rounded-b border-t border-solid p-6">
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
                                onClick={onSubmit}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
    )
}
