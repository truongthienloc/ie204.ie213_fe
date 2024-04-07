'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="inner">
            <Image
                src="/images/404.svg"
                width={1200}
                height={800}
                className={clsx('position: relative')}
                alt="BepUIT"
            />

            <Link href={'/'}>
                <button
                    className={clsx(
                        'position: absolute bottom-[40%] right-[29%] rounded-xl bg-[#e4a37d] px-[10px] py-3 text-[#3a3939]',
                    )}
                >
                    Trở về trang chủ
                </button>
            </Link>
        </div>
    )
}
