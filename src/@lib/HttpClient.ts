import Axios, {
  AxiosInstance,
  AxiosInterceptorOptions, AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from "axios";
import URLParser from "./URLParser";

import type { TApiEndpoint, TRequestArguments, TURLReplacement } from "./types";

class HttpClient {
  private readonly client: AxiosInstance;

  constructor(configs: CreateAxiosDefaults) {
    this.client = this.createInstance(configs);
  }

  private createInstance(configs: CreateAxiosDefaults) {
    return Axios.create(configs);
  }

  /**
   * Method will return original axios instance
   * @return {AxiosInstance}
   */
  public getClientInstance(): AxiosInstance {
    return this.client;
  }

  /**
   * Add common headers on original axios instance
   * @param {string} key header key
   * @param {string} value header value
   */
  public addCommonHeaders(key: string, value: string) {
    this.client.defaults.headers.common[key] = value;
  }

  /**
   * Make request with config object
   * @param {AxiosRequestConfig} configs
   * @return Promise<AxiosResponse>
   */
  public request(configs: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client(configs);
  }

  public get<TR = any>({ route, replacements, config }: Omit<TRequestArguments, "data">): Promise<AxiosResponse<TR>> {
    let url = this.genRequestUrl(route.url, replacements);

    config = this.bindAuthFlag(route, config);

    return this.client.get(url, config);
  }

  public post<TR = any>({ route, replacements, data, config }: TRequestArguments): Promise<AxiosResponse<TR>> {
    config = this.bindAuthFlag(route, config);

    return this.client.post(
      this.genRequestUrl(route.url, replacements),
      data,
      config
    );
  }

  public put<TR = any>({ route, data, replacements, config }: TRequestArguments): Promise<AxiosResponse<TR>> {
    config = this.bindAuthFlag(route, config);

    return this.client.put(
      this.genRequestUrl(route.url, replacements),
      data,
      config
    );
  }

  public delete<TR = any>({ route, replacements, config }: Omit<TRequestArguments, "data">): Promise<AxiosResponse<TR>> {
    config = this.bindAuthFlag(route, config);

    return this.client.delete(
      this.genRequestUrl(route.url, replacements),
      config
    );
  }

  public head<TR = any>({ route, replacements, config }: Omit<TRequestArguments, "data">): Promise<AxiosResponse<TR>> {
    config = this.bindAuthFlag(route, config);

    return this.client.head(
      this.genRequestUrl(route.url, replacements),
      config
    );
  }

  public patch<TR = any>({ route, data, replacements, config }: TRequestArguments): Promise<AxiosResponse<TR>> {
    config = this.bindAuthFlag(route, config);

    return this.client.patch(
      this.genRequestUrl(route.url, replacements),
      data,
      config
    );
  }

  /**
   * Add special flag on config to identify request need authorization token
   * This flag uses axios interceptor to get request needs access token
   * @param {TApiEndpoint} route
   * @param {AxiosRequestConfig | undefined} config
   * @return AxiosRequestConfig
   */
  private bindAuthFlag(route: TApiEndpoint, config?: AxiosRequestConfig): AxiosRequestConfig {
    config = config || {} as AxiosRequestConfig;
    config.requiresAuth = route.isRequiredAuth;

    return config;
  }

  /**
   * Generate endpoint complete url by replacing placeholders to real value provided
   * by replacement object
   * @param {url} url
   * @param {TURLReplacement | undefined} replacement
   * @return {string}
   */
  private genRequestUrl(url: string, replacement?: TURLReplacement) {
    return URLParser.parseURL(url, replacement);
  }

  /**
   * Request interceptor method wrapper
   * @return number
   */
  public useRequestInterceptor(
    onFulfilled?: ((value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>) | null,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions) {
    return this.client.interceptors.request.use(onFulfilled, onRejected, options);
  }

  /**
   * Response interceptor method wrapper
   * @return number
   */
  public useResponseInterceptor(
    onFulfilled?: ((value:AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions
  ) {
    return this.client.interceptors.response.use(onFulfilled, onRejected, options);
  }

  /**
   * Eject request and response interceptors
   * @param {number} requestInterceptor
   * @param {number} responseInterceptor
   * @return void
   */
  public ejectInterceptors(requestInterceptor: number, responseInterceptor: number) {
    this.client.interceptors.request.eject(requestInterceptor);
    this.client.interceptors.response.eject(responseInterceptor);
  }
}

export default HttpClient;
