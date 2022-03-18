/* eslint-disable @typescript-eslint/ban-types */
import { Request } from 'express';

interface IResponseError {
  statusCode: number;
  message: string;
  error?: string | {};
  timestamp: string;
  path: string;
  method: string;
}

export const GlobalResponseError: (
  statusCode: number,
  message: string,
  error: string | {},
  request: Request,
) => IResponseError = (
  statusCode: number,
  message: string,
  error: string | {},
  request: Request,
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    error,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};
