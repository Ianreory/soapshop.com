export interface IResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
