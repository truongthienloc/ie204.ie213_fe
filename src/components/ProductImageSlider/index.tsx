'use client'
import { useState } from 'react'
import { ProductImage } from '~/interfaces/product.type'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import styles from '~/styles/product_detail.module.scss'

type Props = {
    alt: string
    images: ProductImage[]
}

function ProductImageSlider({ images, alt }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNextImage = () => {
        if (currentIndex === images.length - 1) setCurrentIndex(0)
        else setCurrentIndex((prev) => prev + 1)
    }

    const handleBackImage = () => {
        if (currentIndex === 0) setCurrentIndex(images.length - 1)
        else setCurrentIndex((prev) => prev - 1)
    }

    return (
        <>
            <div className={styles.carousel}>
                <div className={styles.top}>
                    <button className={styles['prev__btn']} onClick={handleBackImage}>
                        <ArrowBackIosIcon />
                    </button>
                    <img loading="lazy" src={images[currentIndex]?.link} alt={alt} />
                    <button className={styles['next__btn']} onClick={handleNextImage}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>
                <div className={styles.bottom}>
                    {images.map((image, index) => (
                        <button
                            key={image?._id}
                            className={`${styles['image_option']} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            onMouseOver={() => setCurrentIndex(index)}
                        >
                            <img src={image?.link} alt={alt} loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductImageSlider
