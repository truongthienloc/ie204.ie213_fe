'use client'

import React, { useState, useEffect } from 'react'
// // import ClientDetail from '~/components/ClientDetail_ManageClient/ClientDetail'
// // import iconNotification from '~/assets/images/icon_notification.svg'
import Link from 'next/link'
import { api } from '~/services/axios'
import { toast } from 'react-toastify'

export default function ManageClientPage() {
    // const [showModalAdd, setShowModalAdd] = React.useState(false)
    // const [showModalEdit, setShowModalEdit] = React.useState(false)
    // const [showModalRemove, setShowModalRemove] = React.useState(false)
    // const [clientData, setClientData] = useState([])

    // const fetchClient = async () => {
    // 	try {
    // 		const res = await api.get('/user/')
    // 		const data = res.data.data.filter((client) => !client.isAdmin)
    // 		setClientData(data)
    // 	} catch (error) {
    // 		console.log(error)
    // 	}
    // }

    // useEffect(() => {
    // 	fetchClient()
    // }, [])

    return (
        <div className="pt-9 w-[1200px] pl-10 h-full bg-[#f8f8f8]">
            <div className="mb-8">
                <div className="flex justify-between">
                    <p className="text-primary text-2xl font-normal">Thông tin khách hàng</p>
                    {/* <Link href='/admin/notification'>
						<img
							// src={iconNotification}
							alt=''
							className='hover:cursor-pointer'
						/>
					</Link> */}
                </div>
                <div className="mt-9 flex gap-6 text-lg font-normal text-second [&_input]:bg-white">
                    <div className="flex flex-col gap-5">
                        <p>Mã khách hàng</p>
                        <input
                            type="text"
                            className="  placeholder:opacity-90
					 placeholder:text-second w-[264px] h-[48px] border-2 py-[18px] pl-6 pr-[30px] rounded-lg outline-0"
                            placeholder="Nhập tên khách hàng"
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <p>Tên khách hàng</p>
                        <input
                            type="text"
                            placeholder="Nhập mã khách hàng"
                            className="placeholder:opacity-90 placeholder:text-second w-[264px] h-[48px] border-2 py-[18px] pl-6 pr-[30px] rounded-lg outline-0"
                        />
                    </div>
                    <div className="flex flex-col gap-5 ">
                        <p>Thông tin liên lạc</p>
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className=" placeholder:opacity-90
					 placeholder:text-second w-[264px] h-[48px] border-2 py-[18px] pl-6 pr-[30px] rounded-lg outline-0"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            className="px-4 py-3 h-min bg-primary text-white rounded-xl transition-opacity hover:opacity-80"
                            onClick={() => toast.info('Chức năng chưa được hỗ trợ')}
                        >
                            LỌC
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border-third border-8 px-3 bg-third mb-16">
                <div className="grid ">
                    <table className="text-lg bg-third ">
                        <thead className="text-primary ">
                            <tr>
                                <th className="py-4 pl-4 text-left border-b border-gray-200">
                                    Mã khách hàng
                                </th>
                                <th className="py-4 px-4 text-left border-b border-gray-200">
                                    <center>Họ Tên</center>
                                </th>
                                <th className="py-4 px-4 text-left border-b border-gray-200">
                                    <center>Điểm thành viên</center>
                                </th>
                                <th className="py-4 px-4 text-left border-b border-gray-200">
                                    <center>Số lần ăn tại quán </center>
                                </th>
                                <th className="py-4 px-4 text-left border-b border-gray-200">
                                    <center>Số điện thoại</center>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {clientData.length > 0
								? clientData.map((client) => (
										<ClientDetail
											key={client.id}
											id={client.id}
											name={client.username}
											phoneNumber={client.phoneNumber}
										/>
								  ))
								: null} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
