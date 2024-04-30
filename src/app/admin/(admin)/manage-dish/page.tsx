'use client'

import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DishDetail } from '~/components/AdminPage/ManageDish/DishDetail'
import { AddDishModal } from '~/components/Modal/AddDishModal'
import { EditDishModal } from '~/components/Modal/EditDishModal'
import { DeleteDishModal } from '~/components/Modal/DeleteDishModal'
import useDish from '~/hooks/useDish.hook'
import * as productAction from '~/services/axios/actions/product.action'
import type { Product } from '~/interfaces/product.type'

type ProductWithCheckbox = Product & {
    isCheck: boolean
}

type Props = {}

export default function ManageDishPage({}: Props) {
    const { data: menu } = useQuery({
        queryKey: ['get-menu'],
        queryFn: productAction.getMenu,
    })
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalRemove, setShowModalRemove] = useState(false)
    const [dishesData, setDishesData] = useState<ProductWithCheckbox[]>([])
    const editDishModal = useDish()
    const addDishModal = useDish()

    const fetchDish = async () => {
        try {
            const res = await productAction.getProducts()
            const dishes = res.map((value) => ({ ...value, isCheck: false }))
            setDishesData(dishes)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDish()
    }, [])

    const handleEditButtonClick = (id: string) => {
        const dish = dishesData.find((value) => value._id === id)
        if (!dish) return

        editDishModal.setAll(
            dish._id,
            dish.dishName,
            dish.menuId,
            dish.dishImages,
            dish.dishPrice.toString(),
            dish.dishDescription,
        )

        setShowModalEdit(true)
    }

    const handleCheck = (e: any, id: string) => {
        const newDishes = dishesData.map((dish) => {
            if (dish._id !== id) return dish
            return { ...dish, isCheck: !dish.isCheck }
        })
        setDishesData(newDishes)
    }

    const handleEditDishSubmit = async () => {
        try {
            const res = await toast.promise(productAction.putProduct(editDishModal), {
                pending: 'Đang sửa thông tin món ăn',
                success: 'Sửa thông tin món ăn thành công',
                error: 'Sửa thông tin món ăn thất bại',
            })

            await fetchDish()
            setShowModalEdit(false)
        } catch (error) {}
    }

    const handleAddDishClick = () => {
        addDishModal.setAll('', '', '', [], '0', '')
        setShowModalAdd(true)
    }

    const handleAddDishSubmit = async () => {
        if (addDishModal.name === '') {
            toast.error('"Tên món ăn" không được để trống')
            return
        }

        if (addDishModal.kind === '') {
            toast.error('"Phân loại món ăn" không được để trống')
            return
        }

        try {
            const res = await toast.promise(productAction.postProduct(addDishModal), {
                pending: 'Đang thêm món ăn',
                success: 'Thêm món ăn thành công',
                error: 'Thêm món ăn thất bại',
            })

            await fetchDish()
            setShowModalAdd(false)
        } catch (error) {
            // console.log(error)
        }
    }

    const handleDeleteButtonClick = () => {
        const deletedDishes = dishesData.filter((dish) => dish.isCheck === true)
        if (deletedDishes.length === 0) {
            toast.error('Chưa chọn bất cứ món ăn nào để xóa')
            return
        }
        setShowModalRemove(true)
    }

    const handleDeleteDishSubmit = async () => {
        const deletedDishes = dishesData.filter((dish) => dish.isCheck === true)
        if (deletedDishes.length === 0) {
            toast.error('Chưa chọn bất cứ món ăn nào để xóa')
            return
        }

        try {
            await toast.promise(productAction.deleteProduct(deletedDishes), {
                pending: 'Đang xóa món ăn',
                success: 'Xóa thành công',
                error: 'Xóa thất bại',
            })

            await fetchDish()
            setShowModalRemove(false)
        } catch (error) {
            console.log(error)
            setShowModalRemove(false)
        }
    }

    return (
        <div className="h-full w-[1200px]	bg-[#f8f8f8] pl-10 pt-9">
            <div className="mb-12 flex justify-between">
                <p className="text-2xl font-normal text-primary">Quản lý món ăn</p>
                {/* <Link to='/admin/notification'>
					<img src={iconNotification} alt='' className='hover:cursor-pointer' />
				</Link> */}
            </div>

            <div className="mb-16 rounded-3xl border-8 border-third bg-third px-3">
                <div className="grid h-[550px] overflow-y-auto">
                    <table className="bg-third text-lg">
                        <thead className="text-left text-primary">
                            <th className="w-[80px] border-b border-gray-200 px-2 py-4 text-left">
                                <center>STT</center>
                            </th>
                            <th className="border-b border-gray-200 px-2 py-4  text-left">
                                <center>Phân loại</center>
                            </th>
                            <th className="w-[120px] border-b border-gray-200 px-2 py-4 text-left">
                                <center>Tên</center>
                            </th>
                            <th className="w-[300px] border-b border-gray-200 px-2 py-4 text-left ">
                                <center>Hình ảnh</center>
                            </th>
                            <th className="w-[380px] border-b border-gray-200 px-4 py-4 text-left ">
                                <center>Mô tả</center>
                            </th>
                            <th className="border-b border-gray-200 px-2 py-4 text-left">
                                <center>Giá</center>
                            </th>
                        </thead>
                        <tbody>
                            {dishesData.map((dish) => (
                                <DishDetail
                                    key={dish._id}
                                    id={dish._id}
                                    isCheck={dish.isCheck}
                                    kind={
                                        menu?.find((value) => value._id === dish.menuId)
                                            ?.menuName ?? 'Unknown'
                                    }
                                    name={dish.dishName}
                                    description={dish.dishDescription}
                                    price={dish.dishPrice}
                                    imgs={dish.dishImages}
                                    onEditButtonClick={() => handleEditButtonClick(dish._id)}
                                    onCheck={(e) => handleCheck(e, dish._id)}
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
                            onClick={handleAddDishClick}
                        >
                            Thêm món ăn
                        </button>
                        <button
                            className="mr-12 h-[50px] rounded-2xl border-[3px] border-primary bg-white px-9 py-2 text-primary hover:border-primary hover:bg-primary 
						hover:text-white focus:outline-none"
                            onClick={handleDeleteButtonClick}
                        >
                            Xóa món ăn
                        </button>

                        <AddDishModal
                            menu={menu}
                            isOpen={showModalAdd}
                            dishInfo={addDishModal}
                            onClose={() => setShowModalAdd(false)}
                            onSubmit={handleAddDishSubmit}
                        />

                        <EditDishModal
                            menu={menu}
                            dishInfo={editDishModal}
                            isOpen={showModalEdit}
                            onClose={() => setShowModalEdit(false)}
                            onSubmit={handleEditDishSubmit}
                        />

                        <DeleteDishModal
                            isOpen={showModalRemove}
                            onClose={() => setShowModalRemove(false)}
                            onSubmit={handleDeleteDishSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
