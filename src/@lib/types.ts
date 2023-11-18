import { AxiosRequestConfig } from "axios";

export type TRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type TApiEndpoint = {
  url: string;
  method: TRequestMethod;
  isRequiredAuth: boolean;
};

export type TApiEndpoints = {
  [ENDPOINT_NAME in string]: TApiEndpoint;
};

export type TURLReplacement = Record<string, string | number | undefined> & {
  queryString?: Record<string, string | number | undefined>;
};

export type TRequestArguments = {
  route: TApiEndpoint;
  replacements?: TURLReplacement;
  config?: AxiosRequestConfig;
  data?: any;
};

export interface IClientRequestConfig extends AxiosRequestConfig {}

declare module "axios" {
  interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}
