import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import useDish from '~/hooks/useDish.hook'
import type { Menu, ProductImage } from '~/interfaces/product.type'

type LocalImage = {
    id: string
    link: string
}

type Props = {
    isOpen: boolean
    onClose?: () => void
    onSubmit?: () => void
    dishInfo: ReturnType<typeof useDish>
    menu?: Menu[]
}

export default function AddDishModal({ isOpen, onClose, onSubmit, dishInfo, menu }: Props) {
    const [images, setImages] = useState<LocalImage[]>([])

    const handleAddImageClick = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        const handleFileChange = (e: Event) => {
            const target = e.target as HTMLInputElement
            const file = target.files?.[0]
            // console.log(file);
            if (file) {
                dishInfo.handleAddImageFiles(file)
            }

            input.removeEventListener('change', handleFileChange)
        }
        input.addEventListener('change', handleFileChange)
        input.click()
    }

    useEffect(() => {
        // console.log(dishInfo);
        const newImages = dishInfo.imageFiles.map((image) => {
            const link = URL.createObjectURL(image)

            return {
                id: `${image.name}-${link}`,
                link: link,
            }
        })

        setImages(newImages)

        return () => {
            for (const image of images) {
                URL.revokeObjectURL(image.link)
            }
        }
    }, [dishInfo.imageFiles])

    const handleDeleteImage = (id: string) => {
        const index = images.findIndex((value) => value.id === id)
        if (index === -1) {
            return
        }

        dishInfo.handleRemoveImageFiles(dishInfo.imageFiles[index])
    }

    if (!isOpen) return null
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative my-6">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex  justify-center border-b border-solid p-5">
                            <h3 className="text-2xl font-medium text-primary ">Thêm món ăn</h3>
                        </div>
                        {/*body*/}
                        <div className="mt-4 flex flex-col justify-center gap-7 px-7   ">
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Tên món ăn:</p>
                                <input
                                    type="text"
                                    className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={dishInfo.name}
                                    onChange={dishInfo.handleChangeName}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Phân loại món ăn:</p>
                                <select
                                    name="kind"
                                    id="kind"
                                    value={dishInfo.kind}
                                    onChange={dishInfo.handleChangeKind}
                                    className="h-[40px] w-[200px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                >
                                    <option value="Unknown">Unknown</option>
                                    {menu &&
                                        menu.map((value) => (
                                            <option
                                                key={value._id}
                                                id={value._id}
                                                value={value._id}
                                            >
                                                {value.menuName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Giá:</p>
                                <input
                                    type="number"
                                    className="h-[40px] w-[300px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={dishInfo.price}
                                    onChange={dishInfo.handleChangePrice}
                                />
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Hình ảnh:</p>
                                <div className="grid grid-flow-row grid-cols-2 flex-wrap items-center gap-4">
                                    {images.length > 0 &&
                                        images.map((image) => (
                                            <ImageItem
                                                key={image.id}
                                                image={image}
                                                onDelete={() => handleDeleteImage(image.id)}
                                            />
                                        ))}
                                    <button
                                        className="flex h-10 w-10 items-center justify-center border-2 border-primary text-primary"
                                        onClick={handleAddImageClick}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 text-lg ">
                                <p className="w-[160px] font-medium">Mô tả:</p>
                                <textarea
                                    name=""
                                    id=""
                                    // cols={}
                                    rows={5}
                                    className="h-[80px] w-[300px] resize-none rounded-lg border-2 border-primary px-3 focus:outline-none"
                                    value={dishInfo.description}
                                    onChange={dishInfo.handleChangeDescription}
                                ></textarea>
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

type ImageItemProps = {
    image: LocalImage
    onDelete: () => void
}

function ImageItem({ image, onDelete }: ImageItemProps) {
    return (
        <div className="relative h-32 w-32">
            <img key={image.id} src={image.link} alt={`dish`} className="h-32 w-32" />
            <button
                className="absolute right-0 top-0 flex items-center justify-center rounded-full bg-sub1 p-1 shadow transition-opacity hover:opacity-80"
                onClick={onDelete}
            >
                <CloseIcon />
            </button>
        </div>
    )
}
