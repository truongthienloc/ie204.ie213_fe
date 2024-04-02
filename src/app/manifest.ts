import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Bếp UIT - Let us cook',
        short_name: 'Bếp UIT',
        description: 'Bếp UIT - Nhà hàng đạt chuẩn 4food đầu tiên tại Việt Nam',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
