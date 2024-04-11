type Response = {
    data: any
    statusCode: number
    message: string
}

export default function server(path: string, options?: RequestInit) {
    return new Promise<Response>(async (resolve, reject) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options)
            resolve((await res.json()) as Response)
        } catch (error) {
            reject(error)
        }
    })
}
