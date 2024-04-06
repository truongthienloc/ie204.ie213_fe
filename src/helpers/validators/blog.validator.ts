import type { BlogData } from '~/interfaces/blog.type'

export function validateBlogData(data: BlogData): boolean {
    // Check if title, header, description, content are non-empty strings
    if (
        !data.title ||
        !data.header ||
        !data.description ||
        !data.content ||
        typeof data.title !== 'string' ||
        typeof data.header !== 'string' ||
        typeof data.description !== 'string' ||
        typeof data.content !== 'string'
    ) {
        return false
    }

    // Check if keywords is an array of strings
    if (
        !Array.isArray(data.keywords) ||
        data.keywords.some((keyword) => typeof keyword !== 'string')
    ) {
        return false
    }

    // Check if blogImages is an array of objects with url and publicId properties
    if (
        !Array.isArray(data.blogImages) ||
        data.blogImages.some(
            (image) =>
                typeof image !== 'object' ||
                !image.url ||
                !image.publicId ||
                typeof image.url !== 'string' ||
                typeof image.publicId !== 'string',
        )
    ) {
        return false
    }

    // All checks passed, data is valid
    return true
}
