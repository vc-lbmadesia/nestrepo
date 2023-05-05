export interface ResponseType<T = any> {
  status?: boolean;
  statusCode?: number;
  message?: string | string[];
  data: T | [];
  error?: T | [];
  token?: string;
  pagination?: object;
}

// export interface ResponseType<T = any> {
//   status: boolean;
//   statusCode: number;
//   message: string | string[];
//   data: T | [];
//   error: T | [];
//   token: string;
//   pagination: object;
// }
