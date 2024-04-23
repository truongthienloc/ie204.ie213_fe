'use client'
import React, { useRef, useEffect, useState } from 'react'
import styles from '~/styles/about.module.scss'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'

function AboutPage() {
    const [ref1, inView1] = useInView({ threshold: 0.3 })
    const [ref2, inView2] = useInView({ threshold: 0.3 })
    const [ref3, inView3] = useInView({ threshold: 0.3 })
    const [ref4, inView4] = useInView({ threshold: 0.3 })
    const [ref5, inView5] = useInView({ threshold: 0.3 })
    const [ref6, inView6] = useInView({ threshold: 0.3 })

    const springProps1 = useSpring({ opacity: inView1 ? 1 : 0, marginTop: inView1 ? 0 : -10 })
    const springProps2 = useSpring({ opacity: inView2 ? 1 : 0, marginTop: inView2 ? 0 : -10 })
    const springProps3 = useSpring({ opacity: inView3 ? 1 : 0, marginTop: inView3 ? 0 : -10 })
    const springProps4 = useSpring({ opacity: inView4 ? 1 : 0, marginTop: inView4 ? 0 : -10 })
    const springProps5 = useSpring({ opacity: inView5 ? 1 : 0, marginTop: inView5 ? 0 : -10 })
    const springProps6 = useSpring({ opacity: inView6 ? 1 : 0, marginTop: inView5 ? 0 : -10 })

    return (
        <div className="pt-12">
            <animated.section ref={ref1} style={springProps1} className={clsx(styles.wrap, 'row')}>
                <div className="col lg-6 md-12 text-justify text-xl leading-9 ">
                    <p>Được xây dựng từ những sinh viên năm 3 lớp CNTT2021</p>
                    <p>
                        Bếp UIT là cộng đồng tin cậy cho mọi người có thể tìm kiếm, đánh giá, bình
                        luận các món ăn, thức uống tại UIT - từ website. Tất cả thành viên từ Web
                        đến Data, Foody kết nối những thực khách đến với nới ăn uống lớn nhất UIT.
                    </p>
                    <p>
                        Đến thời điểm hiện tại, Bếp UIT với hàng ngàn địa điểm và hàng chục ngàn
                        bình luận, hình ảnh tại UIT, ở hầu hết các tỉnh thành. Bếp UIT là nơi ngon
                        nhất để bạn có thể thưởng thức và lựa chọn địa điểm tốt nhất cho mình và bạn
                        bè.
                    </p>
                </div>
                <div className="col lg-6 md-12 flex justify-center ">
                    <img
                        src="http://res.cloudinary.com/ddexbqgmg/image/upload/v1713799897/bepUIT-blogImages/o18l9ijefeclo6ouozsm.jpg"
                        alt="img_about"
                        className={clsx(styles.img, 'mx_10')}
                    />
                </div>
            </animated.section>

            <animated.section ref={ref2} style={springProps2} className={clsx(styles.wrap, 'row')}>
                <div className="col lg-6 md-12 flex justify-center ">
                    <img
                        src="http://res.cloudinary.com/ddexbqgmg/image/upload/v1713799807/bepUIT-blogImages/s0fidr7ch6csdsln6unx.jpg"
                        alt="img_about"
                        className={clsx(styles.img, styles.img__height, 'mx_10')}
                    />
                </div>
                <div className="col lg-6 md-12 text-justify text-xl leading-9">
                    <center>
                        <p className={clsx(styles.title, 'mt-5 uppercase ')}>đặt bàn nhanh chóng</p>
                    </center>
                    <p className="mt-4">
                        Với tính năng đặt bàn online, quý khách chỉ cần một vài thao tác đơn giản
                        trên trang web của Bếp UIT để đặt bàn một cách dễ dàng và tiện lợi. Quý
                        khách có thể chọn ngày và giờ muốn đến, số lượng người tham dự và yêu cầu
                        đặc biệt khác. Hệ thống sẽ tự động xác nhận thông tin đặt bàn của quý khách
                        qua email hoặc tin nhắn, và đảm bảo chỗ ngồi sẽ sẵn sàng trong lúc quý khách
                        đến.
                    </p>
                    <p className="mt-8">
                        Tính năng đặt bàn online không chỉ giúp quý khách tiết kiệm thời gian mà còn
                        tăng cường sự linh hoạt trong việc lựa chọn chỗ ngồi. Quý khách có thể xem
                        trực tiếp thông tin của bàn và chọn vị trí phù hợp theo ý muốn. Đồng thời,
                        quý khách cũng có thể xem trước thực đơn và các món ăn đặc biệt để chuẩn bị
                        trước.
                    </p>
                </div>
            </animated.section>
            <animated.section ref={ref3} style={springProps3} className={clsx(styles.wrap, 'row')}>
                <div>
                    <center>
                        <p className={clsx(styles.title, 'mt-5 uppercase')}>Tìm kiếm dễ dàng</p>
                        <div className="w-[80%] text-justify">
                            <p className="mt-4 text-xl leading-9">
                                Khách hàng dễ dàng tìm thấy Bếp UIT nhờ vào việc chúng mình đã đăng
                                ký địa điểm nhà hàng trên Google Maps. Bằng cách này, chỉ cần một
                                vài thao tác đơn giản trên điện thoại di động hoặc máy tính, khách
                                hàng có thể tìm thấy vị trí chính xác của Bếp UIT trên bản đồ và
                                nhận hướng dẫn chi tiết để đến đến từ bất kỳ nơi nào. Điều này tạo
                                ra trải nghiệm thuận lợi và tiện ích, giúp khách hàng dễ dàng tiếp
                                cận và khám phá các dịch vụ của Bếp UIT một cách nhanh chóng và dễ
                                dàng.
                            </p>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.8893953109887!2d106.80243476745908!3d10.870078600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175275be3beba59%3A0xdd0a3df386d69024!2zTmjDoCBow6BuZyBC4bq_cCBVSVQ!5e0!3m2!1sen!2s!4v1713797236824!5m2!1sen!2s"
                            width="80%"
                            height="450"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-xl"
                        ></iframe>
                    </center>
                </div>
            </animated.section>
            <animated.section ref={ref4} style={springProps4} className={clsx(styles.wrap, 'row')}>
                <div className="col lg-6 md-12 text-xl leading-9 ">
                    <center>
                        <p className={clsx(styles.title, 'mt-5 uppercase')}>phân loại rõ ràng</p>
                    </center>
                    <p className="mt-4 text-justify text-xl leading-9">
                        Bếp UIT phân loại các địa điểm ra rất chi tiết: loại hình, món ăn, giá cả,
                        loại ẩm thực, gần nơi bạn nhất... Điều này giúp cộng đồng lọc địa điểm theo
                        mục đích của mình rất nhanh chóng.
                    </p>
                </div>
                <div className="col lg-6 md-12 flex justify-center ">
                    <img
                        src="http://res.cloudinary.com/ddexbqgmg/image/upload/v1713799643/bepUIT-blogImages/wpkf4jew1cxywivfnjol.jpg"
                        alt="img_about"
                        className={clsx(styles.img, 'mx_10')}
                    />
                </div>
            </animated.section>
            <animated.section ref={ref5} style={springProps5} className={clsx(styles.wrap, 'row')}>
                <div className="col lg-6 md-12 flex justify-center ">
                    <img
                        src="http://res.cloudinary.com/ddexbqgmg/image/upload/v1713799745/bepUIT-blogImages/tfnxskgf5iswjkuer5ha.jpg"
                        alt="img_about"
                        className={clsx(styles.img, 'mx_10')}
                    />
                </div>
                <div className="col lg-6 md-12 text-justify text-xl leading-9 ">
                    <center>
                        <p className={clsx(styles.title, 'mt-5 uppercase')}>
                            bình luận và đánh giá
                        </p>
                    </center>
                    <p className="mt-4 text-xl leading-9">
                        Bếp UIT cho phép thành viên đánh giá quán ăn với 5 tiêu chí: Món ăn, Vị trí,
                        Không gian, Giá cả và Dịch vụ, điều này giúp cộng đồng có cái nhìn tổng quan
                        về các tiêu chí của mỗi địa điểm. Với tiêu chí luôn đặt khách hàng lên hàng
                        đầu, chúng mình luôn đánh giá cao các bình luận và nhận xét để xây dựng Bếp
                        UIT ngày càng phát triển và làm hài lòng tất cả mọi người.
                    </p>
                </div>
            </animated.section>
            <animated.section
                ref={ref6}
                style={springProps6}
                className={clsx(styles.wrap, 'row justify-center')}
            >
                <div className="w-[100%]">
                    <center>
                        <div className={clsx(styles.title, 'mt-5 uppercase')}>
                            Không gian đỉnh của chóp tại Bếp UIT
                        </div>
                        <div className="mt-4 w-[100%]  overflow-hidden">
                            <iframe
                                width="100%"
                                height="620"
                                src="https://www.youtube.com/embed/QQWcHxfdMB0?"
                                title="khong-gian-dinh-cua-chop-tai-bep-uit"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </center>
                </div>
            </animated.section>
        </div>
    )
}

export default AboutPage
