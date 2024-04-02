import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: [
                '/users/*',
                '/admin/*',
                '/login',
                '/signup',
                '/forgot-password',
                '/checkout/*',
                '/cloudinary/*',
                '/order/*',
                '/cart/*',
            ],
        },
        sitemap: 'https://bepuit.com/sitemap.xml',
    }
}
