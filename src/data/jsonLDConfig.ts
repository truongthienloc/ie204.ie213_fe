export const contact = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Bếp UIT',
    image: {
        '@type': 'ImageObject',
        url: '/logos/bepuit_logo.svg',
        width: 1080,
        height: 1080,
    },
    telephone: '0947263479',
    url: 'https://bepuit.com/',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Khu pho 6, Linh Trung, Thu Duc District, Ho Chi Minh City',
        addressLocality: 'Ho Chi Minh',
        postalCode: '700000',
        addressRegion: 'Ho Chi Minh',
        addressCountry: 'VN',
    },
    priceRange: '10000 - 1000000',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            opens: '07:30',
            closes: '21:30',
        },
    ],
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '10.870942577963625',
        longitude: '106.80270298836135',
    },
    location: 'Đường Hàn Thuyên, Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh',
}

export const actions = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    '@id': 'https://bepuit.com/#website',
    url: 'https://bepuit.com/',
    name: 'Bếp UIT',
    description:
        'Bếp UIT - Nhà hàng đạt chuẩn 4food đầu tiên tại Việt Nam. Chúng tôi mang đến cho bạn những món ăn truyền thống Việt Nam, đậm đà hương vị quê hương.',
    inLanguage: 'vi',
}
