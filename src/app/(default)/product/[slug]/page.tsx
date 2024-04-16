type Props = {
    params: {
        slug: string
    }
}

function ProductDetailPage({ params: { slug } }: Props) {
    return (
        <>
            <h1>{slug}</h1>
        </>
    )
}

export default ProductDetailPage
