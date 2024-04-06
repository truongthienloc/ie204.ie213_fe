import { validateBlogData } from './blog.validator'

// Describe block for the validator function
describe('validateBlogData', () => {
    // Test case for valid data
    it('should return true for valid data', () => {
        const validData = {
            title: 'Post title',
            header: 'Post header',
            description: 'Post description',
            keywords: ['keyword1', 'keyword2'],
            content: 'Post content',
            blogImages: [
                { url: 'image1.jpg', publicId: '1234' },
                { url: 'image2.jpg', publicId: '5678' },
            ],
        }
        expect(validateBlogData(validData)).toBe(true)
    })

    // Test case for missing fields
    it('should return false for missing fields', () => {
        const invalidData = {
            title: 'Post title',
            header: '', // Missing header
            description: 'Post description',
            keywords: ['keyword1', 'keyword2'],
            content: 'Post content',
            blogImages: [],
        }
        expect(validateBlogData(invalidData)).toBe(false)
    })

    // Test case for invalid keyword data type
    it('should return false for invalid keyword data type', () => {
        const invalidData = {
            title: 'Post title',
            header: 'Post header',
            description: 'Post description',
            keywords: 'keyword1', // Invalid keyword data type
            content: 'Post content',
            blogImages: [],
        }
        // @ts-expect-error
        expect(validateBlogData(invalidData)).toBe(false)
    })

    // Test case for invalid blogImages data type
    it('should return false for invalid blogImages data type', () => {
        const invalidData = {
            title: 'Post title',
            header: 'Post header',
            description: 'Post description',
            keywords: ['keyword1', 'keyword2'],
            content: 'Post content',
            blogImages: 'image', // Invalid blogImages data type
        }
        // @ts-expect-error
        expect(validateBlogData(invalidData)).toBe(false)
    })

    // Test case for invalid blogImage object
    it('should return false for invalid blogImage object', () => {
        const invalidData = {
            title: 'Post title',
            header: 'Post header',
            description: 'Post description',
            keywords: ['keyword1', 'keyword2'],
            content: 'Post content',
            blogImages: [
                { url: 'image1.jpg', publicId: '1234' },
                { url: 'image2.jpg' }, // Missing publicId
            ],
        }
        // @ts-expect-error
        expect(validateBlogData(invalidData)).toBe(false)
    })
})
