import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import config from '../config';
import i18n from '../i18n';
import { auth } from '../stores';
import showToast from '../utils/Toast';

const API_VERSIONS = ['v0', 'v1', 'v2'];
const axiosInstances: { [key: string]: AxiosInstance } = {};

export interface ApiError {
  message: string;
  status: number;
  code: number;
}

function getErrorObject(response: AxiosResponse): ApiError {
  // No response data, probably no network or 500
  let errorCode = -1;
  let errorMessage = i18n.t('error_network');
  if (response && response.data) {
    errorCode = response.data.result ? response.data.result.code || -1 : -1;
    errorMessage =
      response.data.message || response.data.error || i18n.t('error_unknown');
  }

  return {
    code: errorCode,
    message: errorMessage,
    status: response ? response.status : -1,
  };
}

function reactOnStatusCode(error: ApiError) {
  if (error) {
    switch (error.status) {
      case 401:
        auth.logout();
        break;
      case 403:
        auth.logout();
        break;
      default:
    }
  }
}

/**
 * Show a toast with the API error message only if user already logged in
 * (to avoid show error message due to invalid token)
 * @param error Error object informations
 */
function showErrorMessage(error: ApiError) {
  if (auth.isCheckLoginCompleted && error) {
    switch (error.status) {
      case 401:
        showToast(i18n.t('auth_token_invalid'));
        break;
      case 403:
        showToast(i18n.t('auth_token_blocked'));
        break;
      default:
        showToast(error.message);
    }
  }
}

function getResult(response: AxiosResponse) {
  if (response && response.data) {
    return response.data;
  }
  throw Error('Response without Data');
}

API_VERSIONS.forEach(version => {
  axiosInstances[version] = axios.create({
    baseURL: `${config.BASE_URL}${version !== 'v0' ? `/${version}` : ''}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'device-os': Platform.OS,
      'device-app-version': DeviceInfo.getVersion(),
      'device-build-version': DeviceInfo.getBuildNumber(),
    },
    timeout: 8000,
  });
  axiosInstances[version].interceptors.request.use(
    requestConfig => {
      requestConfig.headers = {
        ...requestConfig.headers,
        authorization: auth.token || '',
        'device-app-language': i18n.t('language'),
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
      showErrorMessage(errorObj);
      reactOnStatusCode(errorObj);
      return Promise.reject(errorObj);
    },
  );
});

const { v0, v1, v2 } = axiosInstances;

export { axiosInstances, v0 as axios, v1 as axiosv1, v2 as axiosv2 };
