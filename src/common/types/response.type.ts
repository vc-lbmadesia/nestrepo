export interface ResponseType<T = any> {
  status: boolean;
  statusCode: number;
  message: string | string[];
  data: T | [];
  error: T | [];
}
