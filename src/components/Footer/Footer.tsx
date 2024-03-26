import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="flex flex-col font-roboto text-white tracking-wider bg-primary">
            <div className="justify-evenly inner">
                <div className="w-primary mx-auto max-w-full flex flex-row py-4 gap-8 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-8 max-[400px]:p-2">
                    <div className="flex flex-col mt-4">
                        <h2 className="text-lg font-bold max-sm:text-center text-secondary select-none">
                            CHĂM SÓC KHÁCH HÀNG
                        </h2>
                        <ul className="my-3 text-nowrap max-[400px]:m-0 max-sm:text-center">
                            <li>
                                <a href="tel:+84344444404">Điện thoại liên hệ: +84 344444404</a>
                            </li>
                            <li>
                                <a href="mailto:bepuit@gmail.com">Email: bepuit@gmail.com</a>
                            </li>
                            <li>Giờ làm việc: 7.30 AM - 9.30 PM</li>
                        </ul>
                        <h2 className="text-lg font-bold max-sm:text-center text-secondary select-none">
                            LIÊN HỆ VỚI CHÚNG TÔI
                        </h2>
                        <div className="flex flex-row gap-5 mt-4 max-sm:justify-center">
                            <a href="#" className="rounded-md overflow-hidden">
                                <Image
                                    src={'/logos/facebook.svg'}
                                    alt="facebook icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a href="#" className="rounded-md overflow-hidden">
                                <Image
                                    src={'/logos/zalo.svg'}
                                    alt="zalo icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a href="#" className="rounded-md overflow-hidden">
                                <Image
                                    src={'/logos/instagram.svg'}
                                    alt="instagram icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a href="#" className="rounded-md overflow-hidden">
                                <Image
                                    src={'/logos/gmail.svg'}
                                    alt="gmail icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <h2 className="text-lg font-bold max-sm:text-center text-secondary select-none">
                            CHẤP NHẬN THANH TOÁN
                        </h2>
                        <div className="flex flex-row gap-8 mt-5 max-sm:justify-center">
                            <Image src={'/logos/momo.svg'} alt="momo icon" width={40} height={40} />
                            <Image
                                src={'/logos/viettelpay.svg'}
                                alt="viettelpay icon"
                                width={40}
                                height={40}
                            />
                            <Image src={'/logos/visa.svg'} alt="visa icon" width={40} height={40} />
                        </div>
                    </div>

                    <div className="max-lg:hidden w-[2px] bg-white"></div>

                    <div className="flex-1 flex flex-col mt-4">
                        <h2 className="text-lg max-sm:text-center font-bold text-secondary select-none">
                            Bếp UIT - HỆ THỐNG WEBSITE ĐẶT THỨC ĂN
                        </h2>
                        <ul className="grid grid-cols-2 max-sm:text-center mt-4 gap-x-5 gap-y-2 leading-5 max-xl:grid-cols-1 max-lg:m-0">
                            <li>Điều khoản chung</li>
                            <li>Hướng dẫn đặt bàn</li>
                            <li>Điều khoản giao dịch</li>
                            <li>Tuyển dụng</li>
                            <li>Chính sách thanh toán</li>
                            <li>Liên hệ</li>
                            <li>Chính sách bảo mật</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-center py-2 items-center font-normal bg-secondary max-[400px]:p-1">
                <p className="max-[400px]:text-center select-none">
                    Copyright © 2023 | Bản quyền thuộc về Bếp UIT
                </p>
            </div>
        </footer>
    )
}
