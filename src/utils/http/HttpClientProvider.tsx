import { Component, ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { IClientRequestConfig } from "@lib/http-client";
import { privateClient } from "@http";
import { refreshToken } from "@store/auth/authSlice";
import { localStorageConst } from '@utils/constants/localStorage';

interface IOwnProps {
  children: ReactNode,
}

const connector = connect(null, {
  refreshToken,
});

type TPropFromRedux = ConnectedProps<typeof connector>;

type TPropType = IOwnProps & TPropFromRedux;

class HttpClientProvider extends Component<TPropType> {
  private failedRequestsQueue: Array<IClientRequestConfig> = [];
  private isRefreshing = false;

  private requestInterceptor = 0;
  private responseInterceptor = 0;

  constructor(props: TPropType) {
    super(props);

    this.requestInterceptor = privateClient.useRequestInterceptor(
      async (config) => {
        const userToken = localStorage.getItem(localStorageConst.ACCESS_TOKEN);

        /** requiresAuth special flag for check is request need access token */
        if (config?.headers && config.requiresAuth && userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    this.requestInterceptor = privateClient.useResponseInterceptor(
      async (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest.retry) {
          originalRequest.retry = true;

          if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
              const accessToken = await this.refreshUserToken();

              privateClient.addCommonHeaders("Authorization", `Bearer ${accessToken}`);

              originalRequest.headers.Authorization = `Bearer ${accessToken}`;

              const firstRequest = await privateClient.request(originalRequest);

              await this.processFailedRequests(accessToken);

              return firstRequest;
            } catch (refreshTokenError) {
              // Refresh token request failed
              this.isRefreshing = false;

              this.failedRequestsQueue.length = 0;

              alert("The refresh token request failed!");

              return Promise.reject(refreshTokenError);
            }
          } else {
            // collect failed requests
            this.failedRequestsQueue.push(originalRequest);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  componentWillUnmount() {
    privateClient.ejectInterceptors(this.requestInterceptor, this.responseInterceptor);
  }

  public async processFailedRequests(accessToken: string) {
    while (this.failedRequestsQueue.length > 0) {
      const failedRequest = this.failedRequestsQueue.shift() as IClientRequestConfig;
      failedRequest.headers = failedRequest.headers || {};

      failedRequest.headers.Authorization = `Bearer ${accessToken}`;

      await privateClient.request(failedRequest);
    }

    this.failedRequestsQueue.length = 0;
    this.isRefreshing = false;
  }

  public async refreshUserToken() {
    const { payload: refreshResponse } = await this.props.refreshToken();

    const accessToken = refreshResponse.token;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshResponse.refreshToken);

    return accessToken;
  }

  render() {
    return <>{this.props.children}</>
  }
}

export default connector(HttpClientProvider);
