import { clientInstance } from '~/services/axios'
import blogImageEvent from '~/services/EventEmitter/blogImage.event'

function generateFroalaConfig() {
    return {
        placeholderText: 'Edit Your Content Here!',
        // saveInterval: 2500,

        // Set the image upload parameter.
        imageUploadParam: 'blogImages',

        // Set the image upload URL.
        imageUploadURL: `${process.env.NEXT_PUBLIC_API_URL}/cloudinary/upload-blog-image`,

        requestHeaders: {
            Authorization: `Bearer ${clientInstance.getAccessToken()}`,
        },

        // Additional upload params.
        // imageUploadParams: { id: 'my_editor' },

        // Set request type.
        imageUploadMethod: 'POST',

        // Set max image size to 5MB.
        imageMaxSize: 5 * 1024 * 1024,

        // Allow to upload PNG and JPG.
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],

        events: {
            'image.beforeUpload': function (images: any) {
                // Return false if you want to stop the image upload.
                // editor.opts.requestHeaders.authorization = 'Bearer '
                // console.log('Before Upload: ', images)
            },
            'image.uploaded': function (response: string) {
                // Image was uploaded to the server.
                const json = JSON.parse(response)
                const imgUrl = json.data[0].url
                // @ts-ignore
                this.image.insert(imgUrl, false, null, this.image.get(), response)
                blogImageEvent.emit('uploaded', json.data[0])

                return false
            },
            'image.inserted': function ($img: any, response: any) {
                // Image was inserted in the editor.
                // console.log('Inserted: ', $img, response)
            },
            'image.replaced': function ($img: any, response: any) {
                // Image was replaced in the editor.
                // console.log('Replaced: ', $img, response)
            },
            'image.error': function (error: any, response: any) {
                // console.log('Error: ', error, response)
            },
        },
    }
}

export default generateFroalaConfig
