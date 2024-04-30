import React, { useState } from 'react'
import type { ProductImage } from '~/interfaces/product.type'

export default function useDish() {
    const [id, setId] = useState<string | null>(null)
    const [name, setName] = useState('')
    const [kind, setKind] = useState('Thức uống')
    const [imgs, setImgs] = useState<ProductImage[]>([])
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [deletedImages, setDeletedImages] = useState<ProductImage[]>([])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const handleChangeKind = (e: React.ChangeEvent<HTMLSelectElement>) => setKind(e.target.value)
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setDescription(e.target.value)

    const handleAddImageFiles = (image: File) => {
        setImageFiles([...imageFiles, image])
    }

    const handleRemoveImageFiles = (image: File) => {
        const newImageFiles = imageFiles.filter((value) => value !== image)
        setImageFiles([...newImageFiles])
    }

    const handleDeleteImage = (id: string) => {
        const image = imgs.find((value) => value.id === id) as ProductImage

        const newImgs = imgs.filter((value) => value.id !== id)
        setImgs(newImgs)
        setDeletedImages([...deletedImages, image])
    }

    const setAll = (
        id: string,
        name: string,
        kind: string,
        imgs: ProductImage[],
        price: string,
        description: string,
    ) => {
        setId(id)
        setName(name)
        setKind(kind)
        setImgs(imgs)
        setPrice(price)
        setDescription(description)
        setImageFiles([])
        setDeletedImages([])
    }

    return {
        id,
        setId,
        name,
        handleChangeName,
        kind,
        handleChangeKind,
        imgs,
        imageFiles,
        handleAddImageFiles,
        handleRemoveImageFiles,
        deletedImages,
        handleDeleteImage,
        price,
        handleChangePrice,
        description,
        handleChangeDescription,
        setAll,
    }
}
