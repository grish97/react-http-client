import { http, HttpResponse } from "msw";
import { getUser, getUserFlags, updateUserToken } from "@mock/data/user";
import { apiEndpoints } from "@http";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "@mock/data/user/processors.ts";

export const handlers = [
  // Login user
  http.post(
    `${import.meta.env.VITE_API_DOMAIN}/${apiEndpoints.API_LOGIN.url}`,
    () => {
      return HttpResponse.json(getUser(), {
        status: 200,
      });
    },
  ),

  // Get user flags (private route)
  http.post(
    `${import.meta.env.VITE_API_DOMAIN}/${apiEndpoints.API_INIT_FLAGS.url}`,
    ({ request }) => {
      const headers = request.headers;

      const init = {
        status: 401,
      };
      let response = null;

      if (verifyAccessToken(headers.get("Authorization"))) {
        response = getUserFlags();
        init.status = 200;
      }

      return HttpResponse.json(response, init);
    },
  ),

  // Get user
  http.post(
    `${import.meta.env.VITE_API_DOMAIN}/${apiEndpoints.CURRENT_USER.url}`,
    ({ request }) => {
      const headers = request.headers;

      const init = {
        status: 401,
      };
      let response = null;

      if (verifyAccessToken(headers.get("Authorization"))) {
        response = getUser();
        init.status = 200;
      }

      return HttpResponse.json(response, init);
    },
  ),

  // Refresh token
  http.post<any, any>(
    `${import.meta.env.VITE_API_DOMAIN}/${apiEndpoints.API_REFRESH_TOKEN.url}`,
    async ({ request }) => {
      const credentials = await request.json();

      const init = {
        status: 401,
      };
      let response = null;

      if (verifyRefreshToken(credentials?.refreshToken)) {
        response = updateUserToken();
        init.status = 200;
      }

      return HttpResponse.json(response, init);
    },
  ),
];
