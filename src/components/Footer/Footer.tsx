import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="text-#ccc border-top bg-#f5f5f5 flex flex-col border-t-4 border-primary tracking-wider">
            <div className="inner justify-evenly">
                <div className="mx-auto flex w-primary max-w-full flex-row gap-8 py-4 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-8 max-[400px]:p-2">
                    <div className="mt-4 flex flex-col">
                        <h2 className="select-none text-lg font-bold text-secondary max-sm:text-center">
                            CHĂM SÓC KHÁCH HÀNG
                        </h2>
                        <ul className="my-3 text-nowrap max-sm:text-center max-[400px]:m-0">
                            <li>
                                <a href="tel:+84344444404">Điện thoại liên hệ: +84 344444404</a>
                            </li>
                            <li>
                                <a href="mailto:bepuit@gmail.com">Email: bepuit@gmail.com</a>
                            </li>
                            <li>Giờ làm việc: 7.30 AM - 9.30 PM</li>
                        </ul>
                        <h2 className="select-none text-lg font-bold text-secondary max-sm:text-center">
                            LIÊN HỆ VỚI CHÚNG TÔI
                        </h2>
                        <div className="mt-4 flex flex-row gap-5 max-sm:justify-center">
                            <a
                                href="https://www.facebook.com/people/B%E1%BA%BFp-UIT/61557416318657"
                                className="overflow-hidden rounded-md"
                            >
                                <Image
                                    src={'/logos/facebook.svg'}
                                    alt="facebook icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a
                                href="https://www.tiktok.com/@bepuit_letuscook"
                                className="overflow-hidden rounded-md"
                            >
                                <Image
                                    src={'/logos/logo-tiktok.svg'}
                                    alt="tiktok logo"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/@bep_uit"
                                className="overflow-hidden rounded-md"
                            >
                                <Image
                                    src={'/logos/youtube.svg'}
                                    alt="youtube icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                            <a
                                href="mailto:21520984@gm.uit.edu.vn"
                                className="overflow-hidden rounded-md"
                            >
                                <Image
                                    src={'/logos/gmail.svg'}
                                    alt="gmail icon"
                                    width={40}
                                    height={40}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col">
                        <h2 className="select-none text-lg font-bold text-secondary max-sm:text-center">
                            CHẤP NHẬN THANH TOÁN
                        </h2>
                        <div className="mt-5 flex flex-row gap-8 max-sm:justify-center">
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

                    <div className="w-[2px] bg-white max-lg:hidden"></div>

                    <div className="mt-4 flex flex-1 flex-col">
                        <h2 className="select-none text-lg font-bold text-secondary max-sm:text-center">
                            Bếp UIT - HỆ THỐNG WEBSITE ĐẶT THỨC ĂN
                        </h2>
                        <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 leading-5 max-xl:grid-cols-1 max-lg:m-0 max-sm:text-center">
                            <li className="cursor-pointer hover:text-primary">Điều khoản chung</li>
                            <li className="cursor-pointer hover:text-primary">Hướng dẫn đặt bàn</li>
                            <li className="cursor-pointer hover:text-primary">
                                Điều khoản giao dịch
                            </li>
                            <li className="cursor-pointer hover:text-primary">Tuyển dụng</li>
                            <li className="cursor-pointer hover:text-primary">
                                Chính sách thanh toán
                            </li>
                            <li className="cursor-pointer hover:text-primary">Liên hệ</li>
                            <li className="cursor-pointer hover:text-primary">
                                Chính sách bảo mật
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center bg-primary py-1 font-normal max-[400px]:p-1">
                <p className="select-none text-white max-[400px]:text-center">
                    Copyright © 2024 | Bản quyền thuộc về Bếp UIT
                </p>
            </div>
        </footer>
    )
}
