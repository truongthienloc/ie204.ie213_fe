'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import FoodItems, { TItem } from '../../../components/FoodItems/ProductPage_FoodItem'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { FaSearch } from 'react-icons/fa'
import { api } from '~/services/axios'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { mockProducts } from '~/data'

const ProductPage = () => {
    const [inputValue, setInputValue] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [data, setdata] = useState([])
    const [firstList, setfirstList] = useState([])
    const [secondList, setsecondList] = useState([])
    const searchParams = useSearchParams()
    const HandleOnClick = (name: string) => {
        // setSearchParams({
        // 	menu: slugifyFn(name),
        // })
    }
    const handleChange = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleSearch = () => {
        // if (!inputValue?.trim()) return;
        // setSearchParams({keyword: inputValue})
    }
    const onKeyDown = (e: any) => {
        if (e.key !== 'Enter') return
        handleSearch()
    }
    const clearInput = () => {
        setInputValue('')
    }
    const handlePrice = (e: any) => {
        setPrice(e.target.value)
    }
    const handleCategory = (e: any) => {
        setCategory(e.target.value)
    }
    useEffect(() => {
        if (inputValue === searchParams.get('keyword')) return
        // setInputValue(searchParams.get('keyword'));
    }, [searchParams.get('keyword')])

    // ############## Fetch data từ API
    // useEffect(() => {
    // 	const fetchData = async () => {
    // 		try {
    // 			const res = await api.get('/dish')
    // 			setdata(res.data.data)
    // 			let foods = res.data.data.slice(0, 10)
    // 			let food2s = res.data.data.slice(10)
    // 			setfirstList(foods)
    // 			setsecondList(food2s)
    // 		} catch (error) {
    // 			console.log(error)
    // 		}
    // 	}
    // 	const fetchSearchInput = async (search) =>{
    // 		try {
    // 			const res = await api.get('/dish/all/search',{params: { 'keyword' : search}})
    // 			setfirstList(res.data.data)
    // 			setsecondList([])
    // 			console.log(res.data);
    // 		} catch (error) {
    // 			console.log(error);
    // 		}
    // 	}
    // 	const search = searchParams.get('keyword');
    // 	console.log('search',search);
    // 	search?.trim() ? fetchSearchInput(search) : fetchData();
    // }, [searchParams.get('keyword')])

    return (
        <div className="flex-1 flex-col justify-center">
            <div>
                <div className="bg-headerBanner mb-5 mt-1 flex h-[160px] w-full items-center justify-center bg-cover bg-no-repeat">
                    <p className="text-3xl font-bold uppercase text-third">Sản phẩm</p>
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
                            value={inputValue}
                            onChange={handleChange}
                            onKeyDown={onKeyDown}
                        />
                        <div className="flex flex-row justify-center">
                            {inputValue && (
                                <HighlightOffIcon onClick={clearInput} className="cursor-pointer" />
                            )}
                            <FaSearch
                                className="mx-8 cursor-pointer text-xl text-second"
                                onClick={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-center text-second">
                    <select
                        className="mr-4 h-[50px] w-[230px] rounded-xl border-2 border-primary bg-third pl-3 outline-none"
                        onChange={handlePrice}
                        value={price}
                    >
                        <option value="" disabled hidden>
                            Giá
                        </option>
                        <option value="price1">0 -&gt; 50.000 VND</option>
                        <option value="price2">50.000 -&gt; 100.000 VND</option>
                        <option value="price3">100.000 -&gt; 200.000 VND</option>
                        <option value="price4">200.000 -&gt; 500.000 VND</option>
                    </select>

                    <select
                        className="mr-4 h-[50px] w-[230px] rounded-xl border-2 border-primary bg-third pl-3 outline-none"
                        onChange={handleCategory}
                        value={category}
                    >
                        <option value="" disabled hidden>
                            Phân loại
                        </option>
                        <option value="category1">Thực đơn chính</option>
                        <option value="category2">Tráng miệng</option>
                        <option value="category3">Thức uống</option>
                    </select>
                </div>

                <div className="mx-auto my-10 flex max-w-[1400px] flex-wrap items-center justify-center gap-12">
                    {mockProducts.length > 0 &&
                        mockProducts.map((item: TItem) => {
                            return <FoodItems key={item.id} item={item} />
                        })}
                </div>

                <div className="mx-auto max-w-[1400px]">
                    <img
                        className="w-full object-fill"
                        src="~\assets\image_offer.svg"
                        alt="banner image"
                    />
                </div>
                <div className="mx-auto my-10 flex max-w-[1400px] flex-wrap items-center justify-center gap-12">
                    {mockProducts.length > 0 &&
                        mockProducts.map((item: TItem) => {
                            return <FoodItems key={item.id} item={item} />
                        })}
                </div>
            </div>
        </div>
    )
}

export default ProductPage
