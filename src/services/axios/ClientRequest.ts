import axios, { AxiosInstance, InternalAxiosRequestConfig, HttpStatusCode, AxiosError } from 'axios';
import authEndpoint from './endpoints/auth.endpoint';
import { useAuth } from '~/stores/auth';

class ClientRequest {
  static clientInstance: ClientRequest | null = null;
  private client!: AxiosInstance;
  private isRefreshing = false;
  private refreshPromise: Promise<string | undefined> | null = null;

  static getInstance(): ClientRequest {
    if (this.clientInstance === null) {
      this.clientInstance = new ClientRequest();
    }
    return this.clientInstance;
  }

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
    });

    const requestConfigHandler = (config: InternalAxiosRequestConfig) => {
      const { accessToken } = useAuth.getState();
      if (accessToken && !config.url?.includes(authEndpoint.refreshToken)) {
        config.headers.setAuthorization(`Bearer ${accessToken}`);
      }
      return config;
    };

    const responseErrorHandler = async (error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        const originalRequest = error.config!;

        if (originalRequest.url?.includes(authEndpoint.refreshToken)) {
          useAuth.getState().logout();
          return Promise.reject(error);
        }

        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshPromise = this.refreshAccessToken();
        }

        try {
          const newToken = await this.refreshPromise;
          const { user, setAuth } = useAuth.getState();

          if (!newToken || !user) {
            return useAuth.getState().logout();
          }

          setAuth(user, newToken);
          originalRequest.headers.setAuthorization(`Bearer ${newToken}`);
          return this.client(originalRequest);
        } catch (error) {
          useAuth.getState().logout();
          return Promise.reject(error);
        } finally {
          this.isRefreshing = false;
          this.refreshPromise = null;
        }
      }

      return Promise.reject(error);
    };

    this.client.interceptors.request.use(requestConfigHandler.bind(this));
    this.client.interceptors.response.use((res) => res, responseErrorHandler.bind(this));
  }

  private async refreshAccessToken(): Promise<string | undefined> {
    const res = await this.client.get(authEndpoint.refreshToken, { withCredentials: true });
    return res.data?.accessToken;
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

export default ClientRequest;
