import axiosUtil, { AxiosInstance, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Config from '../config';
import i18n from '../i18n';

const authInfo = {
  token: '',
  onLogout: () => undefined,
};
const API_VERSIONS = [['v1', ''], ['v2', 'v2'], ['v3', 'v3'], ['custom', '']];
const axiosInstances: { [key: string]: AxiosInstance } = {};

export function setAuthInfo(token: string, onLogout: () => any) {
  authInfo.token = token;
  authInfo.onLogout = onLogout;
}

export function getAuthInfo() {
  return authInfo;
}

export interface IApiError {
  code: number;
  message: string;
  status: number;
  url?: string;
}

function getErrorObject(response: AxiosResponse): IApiError {
  // No response data, probably no network or 500
  const status = response ? response.status : -1;
  let code = -1;
  let message = response
    ? i18n.t('error_network')
    : i18n.t('error_unknown');
  if (response && response.data) {
    code = response.data.result ? response.data.result.code || -1 : -1;
    message =
      response.data.message ||
      response.data.error ||
      i18n.t(status === 0 ? 'error_network' : 'error_unknown');
  }

  return {
    code,
    message,
    status,
    url: (response && response.config && response.config.url) || '',
  };
}

function reactOnStatusCode(error: IApiError) {
  if (authInfo.token && error) {
    switch (error.status) {
      case 401:
        authInfo.onLogout();
        break;
      default:
        showErrorMessage(error);
    }
  }
}

/**
 * Show a toast with the API error message only if user already logged in
 * (to avoid show error message due to invalid token)
 * @param error Error object information
 */
function showErrorMessage(_: IApiError) {
  // Add your conditions in here
}

function getResult(response: AxiosResponse) {
  if (response && response.data) {
    return response.data;
  }
  throw new Error('API response without result field');
}

API_VERSIONS.forEach(([version, suffix]) => {
  axiosInstances[version] = axiosUtil.create({
    baseURL: `${Config.API_URL}/${suffix}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'app-os': Platform.OS,
      'app-version': DeviceInfo.getVersion(),
      'app-build': DeviceInfo.getBuildNumber(),
    },
    timeout: 20000,
  });
  axiosInstances[version].interceptors.request.use(
    requestConfig => {
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: getAuthInfo().token,
        'app-language': i18n.t('language'),
      };
      return requestConfig;
    },
    error => Promise.reject(error),
  );
  axiosInstances[version].interceptors.response.use(
    response => {
      return getResult(response);
    },
    error => {
      const errorObj = getErrorObject(error.response);
      reactOnStatusCode(errorObj);
      // NOTE: is better to handle every single catch in the app and show the toast accordingly
      // instead of having an automatic show toast for each request
      // showErrorMessage(errorObj);
      return Promise.reject(errorObj);
    },
  );
});

export const {
  custom: axiosCustom,
  v1: axios,
  v2: axiosv2,
  v3: axiosv3,
} = axiosInstances;
