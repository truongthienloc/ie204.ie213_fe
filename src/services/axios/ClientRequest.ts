import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export default class ClientRequest {
    static clientInstance?: ClientRequest

    static getInstance(): ClientRequest {
        if (ClientRequest.clientInstance === undefined) {
            ClientRequest.clientInstance = new ClientRequest()
        }

        return ClientRequest.clientInstance
    }

    private client!: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: 10000,
        })

        const requestConfigHandler = (config: InternalAxiosRequestConfig) => {
            if (this.hasAccessToken()) {
                config.headers.setAuthorization(`Bearer ${this.getAccessToken()}`)
            }

            return config
        }

        const responseErrorHandler = (error: any) => {
            if (error && error.statusCode === 401) {
                // handle refresh token
            }
        }

        this.client.interceptors.request.use(requestConfigHandler.bind(this))
        this.client.interceptors.response.use((config) => config, responseErrorHandler.bind(this))
    }

    public getClient(): AxiosInstance {
        return this.client
    }

    public hasAccessToken(): boolean {
        return localStorage.getItem('access_token') !== null
    }

    public getAccessToken(): string | null {
        return localStorage.getItem('access_token')
    }

    public removeAccessToken(): void {
        localStorage.removeItem('access_token')
    }
}
