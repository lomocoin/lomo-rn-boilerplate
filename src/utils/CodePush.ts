import { Platform } from 'react-native';
import CodePush, {
  CodePushOptions,
  DowloadProgressCallback,
} from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import Config from '../config';

export type CodePushDownloadProgressCallback = (
  progress: number,
  totalBytes: number,
  receivedBytes: number,
) => void;

export async function getAppVersion(separator = '-') {
  const appVersion = `${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`;
  const update = await CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING);

  if (!update) {
    return appVersion;
  }

  const label = update.label.substring(1);
  return `${appVersion}${separator}${label}`;
}

export function getDeploymentKey() {
  const configKey = `${Platform.OS.toUpperCase()}_CODEPUSH_DEPLOYMENT_KEY_${
    Config.IS_BETA ? 'STAGING' : 'PRODUCTION'
  }`;
  // @ts-ignore
  return Config[configKey];
}

export function getCurrentVersion() {
  return CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING);
}

export function getOnlineVersion() {
  return CodePush.checkForUpdate(getDeploymentKey());
}

export async function checkCodePushUpdate(
  mustInstall: boolean = false,
  downloadProgress: CodePushDownloadProgressCallback = () => undefined,
) {
  const currentVersion = await getCurrentVersion();
  const onlineVersion = await getOnlineVersion();
  const result = {
    hasNewVersion:
      (!currentVersion && onlineVersion) ||
      (currentVersion &&
        onlineVersion &&
        onlineVersion.packageHash !== currentVersion.packageHash),
    isUpdated: false,
    currentVersion,
    onlineVersion,
  };
  CodePush.disallowRestart();

  if (result.hasNewVersion) {
    if (mustInstall) {
      const onDownloadProgress: DowloadProgressCallback = progress => {
        const percentage = (progress.receivedBytes / progress.totalBytes) * 100;
        downloadProgress(
          percentage,
          progress.totalBytes,
          progress.receivedBytes,
        );
      };

      downloadProgress(0.1, 1, 1); // give an initial progress step

      const syncStatus = await CodePush.sync(
        {
          deploymentKey: getDeploymentKey(),
          installMode: CodePush.InstallMode.IMMEDIATE,
          mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
        },
        undefined,
        onDownloadProgress,
      );

      result.isUpdated = syncStatus === CodePush.SyncStatus.UPDATE_INSTALLED;
    }
  }

  CodePush.allowRestart();

  return result;
}

export function codePushConfig(): CodePushOptions {
  const result: CodePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    deploymentKey: getDeploymentKey(),
    installMode: CodePush.InstallMode.ON_NEXT_RESTART,
    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
    minimumBackgroundDuration: 5 * 1000,
  };
  return result;
}
