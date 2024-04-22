export type BlogImageData = {
    url: string
    publicId: string
}

export type BlogData = {
    title: string
    header: string
    description: string
    keywords: string[]
    content: string
    blogImages: BlogImageData[]
    thumbnailImage: string
}

export type Blog = BlogData & {
    _id: string
    slugName: string
    createdAt: string
    updatedAt: string
}

export type Blogs = Blog[]
