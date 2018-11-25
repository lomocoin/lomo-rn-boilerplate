import Analytics from 'appcenter-analytics';
import DeviceInfo from 'react-native-device-info';

export enum ModulesNames {
  App = 'App',
  Auth = 'Auth',
  Todo = 'Todo',
  User = 'User',
}

export enum ActionTypes {
  Click = 'click',
  Open = 'open',
  Close = 'close',
  Send = 'send',
}

class AnalyticsTracker {
  serializeObject(data: any) {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }
    return data ? data.toString() : 'none';
  }

  appEvent(category: string, data: { [key: string]: any }) {
    Analytics.trackEvent('App', { Category: category, ...data });
  }

  logAction(
    moduleName: ModulesNames,
    pageName: string,
    functionName: string,
    action: ActionTypes,
    info: any,
  ) {
    const data = {
      [`${functionName}_${action}`]: `${this.serializeObject(info)}`,
    };
    Analytics.trackEvent(`${moduleName}_${pageName}`, data);
  }

  logDebug(
    moduleName: ModulesNames,
    pageName: string,
    functionName: string,
    info: any,
    extra: { [key: string]: string } = {},
  ) {
    const meta = {
      device: `${DeviceInfo.getModel()}-${DeviceInfo.getSystemVersion()}`,
      ...extra,
    };
    const data = {
      [`${functionName}_debug`]: `${JSON.stringify(
        meta,
      )}-${this.serializeObject(info)}`,
    };
    Analytics.trackEvent(`${moduleName}_${pageName}`, data);
  }

  logError(
    moduleName: ModulesNames,
    pageName: string,
    functionName: string,
    error: any,
    extra: { [key: string]: string } = {},
  ) {
    const meta = {
      device: `${DeviceInfo.getModel()}-${DeviceInfo.getSystemVersion()}`,
      ...extra,
    };
    const data = {
      [`${functionName}_error`]: `${JSON.stringify(
        meta,
      )}-${this.serializeObject(error)}`,
    };

    if (__DEV__) {
      // tslint:disable-next-line
      console.log(`${moduleName}_${pageName}_${functionName}_error:`, error);
    }
    Analytics.trackEvent(`${moduleName}_${pageName}`, data);
  }
}

export default new AnalyticsTracker();
