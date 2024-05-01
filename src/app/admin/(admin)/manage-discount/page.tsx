'use client'

import React, { useEffect, useState } from 'react'
import useDiscount from '~/hooks/useDiscount.hook'
import { DiscountDetail } from '~/components/AdminPage/ManageDiscount/DiscountDetail'
import { toast } from 'react-toastify'
import { AddDiscountModal } from '~/components/Modal/AddDiscountModal'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import discountAction from '~/services/axios/actions/discount.action'
import { Discount } from '~/interfaces/discount.type'
import { RemoveDiscountModal } from '~/components/Modal/RemoveDiscountModal'

type DiscountWithCheckbox = Discount & {
    isCheck: boolean
}

export default function ManageDiscountPage() {
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalRemove, setShowModalRemove] = useState(false)
    const [discountData, setDiscountData] = useState<DiscountWithCheckbox[]>([])
    const editDiscountModal = useDiscount()
    const addDiscountModal = useDiscount()

    const fetchPromotion = async () => {
        try {
            const res = await discountAction.getAllDiscount()
            const data = res.map((value) => ({ ...value, isCheck: false }))
            // console.log('discount: ', data);

            setDiscountData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPromotion()
    }, [])

    const handleEditButtonClick = (id: string) => {
        const promotion = discountData.find((value) => value._id === id)
        setShowModalEdit(true)
        if (!promotion) return

        editDiscountModal.setAll(
            promotion.discountCode,
            promotion.discountName,
            promotion.discountDescription,
            promotion.discountPercent.toString(),
            dayjs(promotion.startDay),
            dayjs(promotion.endDay),
        )
        setShowModalEdit(true)
    }

    const handleCheck = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const newDiscountData = discountData.map((value) =>
            value._id === id ? { ...value, isCheck: e.target.checked } : value,
        )

        setDiscountData(newDiscountData)
    }

    const handleAddButtonClick = () => {
        addDiscountModal.setAll('', '', '', '', null, null)
        setShowModalAdd(true)
    }

    const handleAddDiscountSubmit = async () => {
        if (!addDiscountModal.validate()) {
            toast.error('Tất cả các trường đều không được để trống')
            return
        }

        try {
            const res = await toast.promise(
                discountAction.postNewDiscount({
                    discountCode: addDiscountModal.id,
                    discountName: addDiscountModal.discountName,
                    discountDescription: addDiscountModal.description,
                    discountPercent: parseInt(addDiscountModal.percent),
                    startDay: addDiscountModal.startDay?.toISOString() as string,
                    endDay: addDiscountModal.endDay?.toISOString() as string,
                }),
                {
                    pending: 'Đang tạo khuyến mãi',
                    success: 'Tạo thành công',
                    error: 'Tạo thất bại',
                },
            )

            await fetchPromotion()
            setShowModalAdd(false)
        } catch (error) {}
    }

    const handleRemoveClick = () => {
        if (!discountData.some((value) => value.isCheck)) {
            toast.error('Chưa có bất kỳ khuyến mãi nào được chọn')
            return
        }
        setShowModalRemove(true)
    }

    const handleRemove = async () => {
        const removedDiscounts = discountData
            .filter((value) => value.isCheck)
            .map((value) => value._id)
        try {
            const promises = removedDiscounts.map((id) => discountAction.deleteDiscount(id))
            await toast.promise(Promise.all(promises), {
                pending: 'Đang xóa',
                success: 'Xóa thành công',
                error: 'Xóa thất bại',
            })
            fetchPromotion()
            setShowModalRemove(false)
        } catch (error) {}
    }

    return (
        <div>
            <div className="h-full w-[1200px]	bg-[#f8f8f8] pl-10 pt-9">
                <div className="mb-12 flex justify-between">
                    <p className="text-2xl font-normal text-primary">Thông tin khuyến mãi</p>
                </div>

                <div className="mb-16 rounded-3xl border-8 border-third bg-third px-3">
                    <div className="grid ">
                        <table className="bg-third text-lg ">
                            <thead className="text-primary ">
                                <tr>
                                    <th className="border-b border-gray-200 px-2 py-4 text-left"></th>
                                    <th className="w-[180px] border-b border-gray-200 px-2 py-4 text-left">
                                        <center>Mã</center>
                                    </th>
                                    <th className="w-[380px] border-b border-gray-200 px-2 py-4 text-left">
                                        <center>Tên</center>
                                    </th>
                                    <th className="w-[380px] border-b border-gray-200 px-2 py-4 text-left">
                                        <center>Mô tả</center>
                                    </th>
                                    <th className="w-[120px] border-b border-gray-200 px-2 py-4 text-left">
                                        <center>Mức giảm</center>
                                    </th>
                                    <th className="w-[220px] border-b border-gray-200 px-2 py-4 text-left ">
                                        <center>Ngày bắt đầu</center>
                                    </th>
                                    <th className="w-[160px] border-b border-gray-200 px-4 py-4 text-left ">
                                        <center>Ngày kết thúc</center>
                                    </th>
                                    <th className="border-b border-gray-200 px-4 py-4 text-left" />
                                </tr>
                            </thead>
                            <tbody>
                                {discountData.map((pro) => (
                                    <DiscountDetail
                                        key={pro._id}
                                        id={pro.discountCode}
                                        isCheck={pro.isCheck}
                                        name={pro.discountName}
                                        description={pro.discountDescription}
                                        percent={pro.discountPercent}
                                        startDay={pro.startDay}
                                        endDay={pro.endDay}
                                        onEditClick={() => handleEditButtonClick(pro._id)}
                                        onCheck={(e) => handleCheck(pro._id, e)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pl-18 mb-10 mt-40 flex justify-between text-xl font-normal">
                        <div className="flex gap-9">
                            <button
                                className=" h-[50px] rounded-2xl border-[3px] border-primary  bg-white px-8 py-2 text-primary hover:border-primary hover:bg-primary 
						hover:text-white focus:outline-none"
                                onClick={handleAddButtonClick}
                            >
                                Thêm khuyến mãi
                            </button>
                            <button
                                className="mr-12 h-[50px] rounded-2xl border-[3px] border-primary bg-white px-9 py-2 text-primary hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                onClick={handleRemoveClick}
                            >
                                Xóa khuyến mãi
                            </button>

                            <AddDiscountModal
                                isOpen={showModalAdd}
                                onClose={() => setShowModalAdd(false)}
                                discountInfo={addDiscountModal}
                                onSubmit={handleAddDiscountSubmit}
                            />

                            {showModalEdit ? (
                                <div>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                                        <div className="relative my-6">
                                            {/*content*/}
                                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex  justify-center border-b border-solid p-5">
                                                    <h3 className="text-2xl font-medium text-primary ">
                                                        Sửa khuyến mãi
                                                    </h3>
                                                </div>
                                                {/*body*/}
                                                <div className="mt-4 flex flex-col justify-center gap-7 px-7   ">
                                                    <div className="flex items-center gap-8 text-lg ">
                                                        <p className="w-[160px] font-medium">
                                                            Mã khuyến mãi:
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                                            value={editDiscountModal.id}
                                                            onChange={
                                                                editDiscountModal.handleChangeId
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-8 text-lg ">
                                                        <p className="w-[160px] font-medium">
                                                            Mô tả:
                                                        </p>
                                                        <textarea
                                                            name=""
                                                            id=""
                                                            rows={5}
                                                            className="h-[150px] w-[300px]  resize-none rounded-lg border-2 border-primary p-4 px-3 focus:outline-none"
                                                            value={editDiscountModal.description}
                                                            onChange={
                                                                editDiscountModal.handleChangeDescription
                                                            }
                                                        ></textarea>
                                                    </div>
                                                    <div className="flex items-center gap-8 text-lg ">
                                                        <p className="w-[160px] font-medium">
                                                            Mức giảm:
                                                        </p>
                                                        <input
                                                            type="text"
                                                            className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                                            value={editDiscountModal.percent}
                                                            onChange={
                                                                editDiscountModal.handleChangePercent
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-8 text-lg ">
                                                        <p className="w-[160px] font-medium">
                                                            Ngày bắt đầu:
                                                        </p>
                                                        <DatePicker
                                                            className="flex-1"
                                                            format="DD/MM/YYYY"
                                                            value={editDiscountModal.startDay}
                                                            onChange={
                                                                editDiscountModal.handleChangeStartDay
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-8 text-lg ">
                                                        <p className="w-[160px] font-medium">
                                                            Ngày kết thúc:
                                                        </p>
                                                        <DatePicker
                                                            className="flex-1"
                                                            format="DD/MM/YYYY"
                                                            value={editDiscountModal.endDay}
                                                            onChange={
                                                                editDiscountModal.handleChangeEndDay
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/*footer*/}
                                                <div className="mt-4 flex items-center justify-end rounded-b border-t border-solid p-6">
                                                    <button
                                                        className=" background-transparent mb-1 mr-4 border-2 border-primary bg-white  px-6 py-2 text-sm font-bold uppercase text-primary 
													outline-none transition-all duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                                        type="button"
                                                        onClick={() => setShowModalEdit(false)}
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        className="mb-1 mr-1  rounded-lg border-2 border-primary bg-white px-4 py-2 text-sm font-bold uppercase text-primary outline-none transition-all  duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                                        type="button"
                                                        onClick={() =>
                                                            toast.info('Chức năng chưa được hỗ trợ')
                                                        }
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                </div>
                            ) : null}

                            <RemoveDiscountModal
                                isOpen={showModalRemove}
                                onClose={() => setShowModalRemove(false)}
                                onSubmit={handleRemove}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
