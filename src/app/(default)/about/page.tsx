import Image from 'next/image'
import clsx from 'clsx'

function AboutPage() {
    return (
        <div>
            <div
                className="mb-5 mt-6 flex h-[160px] items-center justify-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url('/images/about-heading.svg')` }}
            >
                <p className="text-3xl font-bold uppercase text-third">Giới thiệu</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-row gap-7 rounded-2xl border-4 border-primary py-8 pl-6">
                    <Image
                        src="/images/about-title1.svg"
                        alt="Thành viên"
                        width={520}
                        height={290}
                    ></Image>
                    <div className="my-7 flex flex-col gap-5 pr-8 text-lg font-normal leading-6 text-second">
                        <p>
                            Được xây dựng từ những sinh viên năm 3 lớp CNTT2021.
                            <br />
                            Bếp UIT là cộng đồng tin cậy cho mọi người có thể tìm kiếm, đánh giá,
                            bình luận các món ăn, thức uống tại UIT - từ website. Tất cả thành viên
                            từ Web đến Data, Foody kết nối những thực khách đến với nới ăn uống lớn
                            nhất UIT.
                        </p>
                        <p>
                            Đến thời điểm hiện tại, Bếp UIT với hàng ngàn địa điểm và hàng chục ngàn
                            bình luận, hình ảnh tại UIT, ở hầu hết các tỉnh thành. Bếp UIT là nơi
                            ngon nhất để bạn có thể thưởng thức và lựa chọn địa điểm tốt nhất cho
                            mình và bạn bè.
                        </p>
                    </div>
                </div>

                <div className="my-16 flex flex-row gap-7 rounded-2xl border-4 border-primary px-16 py-8 ">
                    <div className="flex-1 justify-center ">
                        <p className="mb-5 flex justify-center text-4xl font-bold text-primary">
                            TÌM KIẾM DỄ DÀNG
                        </p>
                        <p className="mt-14 text-lg font-normal leading-7 text-second">
                            Công cụ tìm kiếm thông minh bằng cách gõ: tên địa điểm nơi bạn ở, hoặc
                            địa chỉ, hoặc tên đường, hoặc tên món ăn, hoặc mục đích, hoặc tên khu
                            vực. Hệ thống tìm kiếm sử dụng gợi ý & xem nhanh thông tin, giúp bạn đặt
                            món ăn nhanh nhất và những cơ sở Bếp UIT gần bạn nhất.
                        </p>
                    </div>
                    <div className="flex-2 flex items-center">
                        <Image
                            src="/images/about-title2.svg"
                            alt="Tìm kiếm dễ dàng"
                            width={520}
                            height={294}
                        ></Image>
                    </div>
                </div>

                <div className="mb-16 flex flex-row gap-12 rounded-2xl border-4 border-primary px-7 py-11 ">
                    <div className="flex-2 flex items-center">
                        <Image
                            src="/images/about-title3.svg"
                            alt="Phân loại sản phẩm"
                            width={520}
                            height={294}
                        ></Image>
                    </div>
                    <div className="flex-1 justify-center ">
                        <p className="mb-5 flex justify-center text-4xl font-bold text-primary">
                            PHÂN LOẠI RÕ RÀNG
                        </p>
                        <p className="mt-16 text-lg font-normal leading-7 text-second">
                            Bếp UIT phân loại các địa điểm ra rất chi tiết: loại hình, món ăn, giá
                            cả, loại ẩm thực, gần nơi bạn nhất... Điều này giúp cộng đồng lọc địa
                            điểm theo mục đích của mình rất nhanh chóng.
                        </p>
                    </div>
                </div>

                <div className="mb-16 flex flex-row gap-7 rounded-2xl border-4 border-primary px-16 py-9">
                    <div className="flex-1 justify-center ">
                        <p className="mb-5 flex justify-center text-4xl font-bold text-primary">
                            BÌNH LUẬN VÀ ĐÁNH GIÁ
                        </p>
                        <p className="mt-12 text-lg font-normal leading-6 text-second">
                            Bếp UIT cho phép thành viên đánh giá quán ăn với 5 tiêu chí: Món ăn, Vị
                            trí, Không gian, Giá cả và Dịch vụ, điều này giúp cộng đồng có cái nhìn
                            tổng quan về các tiêu chí của mỗi địa điểm. Do đặc thù của mỗi địa điểm
                            khác nhau, ví dụ: cộng đồng quan tâm đến chất lượng món ăn, không gian
                            và cơ sở vật chất ở cơ sở Bếp UIT đó.
                        </p>
                    </div>
                    <div className="flex-2 flex items-center">
                        <Image
                            src="/images/about-title4.svg"
                            alt="Đánh giá và bình luận"
                            width={520}
                            height={294}
                        ></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
