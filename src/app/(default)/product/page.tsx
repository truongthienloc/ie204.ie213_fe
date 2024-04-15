import React from 'react'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import HorizontalProductCard from '~/components/HorizontalProductCard'
import { mockProducts } from '~/data'

const ProductPage = () => {
    return (
        <>
            <div className="flex-1 flex-col justify-center">
                <div>
                    <div className="mb-5 mt-1 flex h-[160px] w-full items-center justify-center bg-cover bg-no-repeat">
                        <p className="text-3xl font-bold uppercase text-primary">Sản phẩm</p>
                    </div>
                    <p className="mt-8 text-center text-4xl font-normal text-second">
                        Hãy lựa chọn và thưởng thức món ngon bạn yêu thích !!
                    </p>
                    <div className="flex w-full justify-center">
                        <div className="my-8 flex h-[80px] w-[560px] items-center justify-between rounded-2xl border-4 border-primary bg-third">
                            <input
                                className=" bg-third px-6 text-2xl font-normal outline-none"
                                type="text"
                                placeholder="Bạn muốn tìm món gì?"
                            />
                            <div className="flex flex-row justify-center">
                                <FaSearch className="mx-8 cursor-pointer text-xl text-second" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-10">
                {mockProducts.map((product) => (
                    <div key={product?.id} className="col lg-6 md-12 sm-12">
                        <HorizontalProductCard key={product?.id} product={product} href="#" />
                    </div>
                ))}
            </div>

            <div className="my-10 flex h-full w-full items-center justify-center">
                <button className="rounded-md bg-primary px-6 py-3 text-white">Xem thêm</button>
            </div>
        </>
    )
}

export default ProductPage
