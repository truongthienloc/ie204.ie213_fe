import React from 'react'

export default function Footer() {
    return (
        <div className="flex flex-col font-roboto text-white tracking-wider">
            <div className="bg-primary justify-evenly">
                <div className="w-primary mx-auto max-w-full flex flex-row py-4 px-16 gap-14 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-8 max-[400px]:p-2">
                    <div className="flex flex-col mt-4 max-lg:items-center">
                        <p className="text-lg font-bold max-sm:text-center">CHĂM SÓC KHÁCH HÀNG</p>
                        <div className="my-3 ml-6 text-nowrap max-[400px]:m-0">
                            <p>Điện thoại liên hệ: +84 344444404</p>
                            <p>Email: xxx@4food.com</p>
                            <p>Giờ làm việc: 7.30 AM - 9.30 PM</p>
                        </div>
                        <p className="text-lg font-bold max-sm:text-center">
                            LIÊN HỆ VỚI CHÚNG TÔI
                        </p>
                        <div className="flex flex-row gap-5 mt-3">
                            <img src={'/logos/facebook.svg'} alt="facebook icon" />
                            <img src={'/logos/zalo.svg'} alt="zalo icon" />
                            <img src={'/logos/instagram.svg'} alt="instagram icon" />
                            <img src={'/logos/gmail.svg'} alt="gmail icon" />
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 max-lg:items-center">
                        <p className="text-lg font-bold max-sm:text-center">CHẤP NHẬN THANH TOÁN</p>
                        <div className="flex flex-row gap-8 mt-5">
                            <img src={'/logos/momo.svg'} alt="momo icon" />
                            <img src={'/logos/viettelpay.svg'} alt="viettelpay icon" />
                            <img src={'/logos/visa.svg'} alt="visa icon" />
                        </div>
                    </div>

                    <div className="max-lg:hidden w-[3px] bg-white"></div>

                    <div className="flex-1 flex flex-col mt-4">
                        <p className="text-lg font-bold max-lg:text-center">
                            4Food - Hệ thống website quản lý quán ăn
                        </p>
                        <div className="grid grid-cols-2 mt-2 gap-x-5 gap-y-2 ml-9 leading-5 max-xl:grid-cols-1 max-lg:text-center max-lg:m-0">
                            <p>Điều khoản chung</p>
                            <p>Hướng dẫn đặt bàn</p>
                            <p>Điều khoản giao dịch</p>
                            <p>Tuyển dụng</p>
                            <p>Chính sách thanh toán</p>
                            <p>Liên hệ</p>
                            <p>Chính sách bảo mật</p>
                        </div>
                        <p className="ml-9 max-lg:text-center max-lg:m-0">Thông tin thêm</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center p-3 font-normal bg-secondary max-[400px]:p-1">
                <p className="max-[400px]:text-center">
                    Copyright © 2023 | Bản quyền thuộc về 4Food
                </p>
            </div>
        </div>
    )
}
