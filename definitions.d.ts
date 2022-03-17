export interface IObjectInterface {
  [key: string]: string | any;
}

export interface IAuthUser {
  _id: string;
  id?: string;
  name: string;
  slug: string;
}
export interface IErrorHandlerInterface {
  data?: IObjectInterface;
  exception?: Error;
}

export type IAdditionalUserProps = IObjectInterface & {
  token?: string;
};

export type CustomError = Error & {
  code?: number;
  keyValue?: number;
};

export interface IResponse {
  statusCode: number;
  status?: boolean;
  message?: string;
  data?: IObjectInterface[] | IObjectInterface | any;
}
