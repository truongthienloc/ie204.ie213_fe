import { HttpStatusCode } from 'axios';

export enum HttpRequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type HttpResponseData<T> = {
  success?: boolean;
  statusCode: HttpStatusCode;
  message: string;
  data?: T;
  meta?: any; // for pagination or filtering features
};

type HttpResponseError = {
  success?: boolean;
  statusCode: HttpStatusCode;
  message: string;
  errors?: string[];
  code?: string; // internal error code for business logic
};

export type HttpResponse<T> = HttpResponseData<T> | HttpResponseError;
