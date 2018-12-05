# Code Push Usage

## App Config

- In the dashboard of Code Push, iOS and Android app are separated app
- Each app has two distinct deployment keys to identify its state: `Staging` and `Production`
- Config for this key is set by Info.plist for iOS and MainApplication.java for Android
- We should use `Staging key` for test and use `Production key` for public release

## Explain the patch process

To explain the patch process, we need to understand that all of our Javascript codes are combined into a single file during packaging. Patches can be hot loaded because we replace this combined js file totally with the downloaded one when the app starts.

Currently, the patch will be downloaded when the app starts and be applied immediately:

```jsx
  componentDidMount() {
    // ...
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });
    //...
  }
```

This is not the default behavior but I think it might be the best choice. The default is `apply the patch when next time app start`. We can do other custom configs as well.

More docs can be found at [this page](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#how-does-it-work).

## Release the patch

First of all, we need to install the CLI tools by `npm install -g appcenter-cli`.

Secondly, we need to login with the proper account by `appcenter login`.

To release a `Staging` patch, we use `appcenter codepush release-react -a <owner>/<app> -d Staging`. `<owner>` and `<app>` are placeholders to be replaced by actual value.

Example for iOS: `appcenter codepush release-react -a LoMoCoinTeam/Lomo-RN-Boilerplate-iOS -d Staging`
Example for Android: `appcenter codepush release-react -a LoMoCoinTeam/Lomo-RN-Boilerplate-Android -d Staging`

Then, we can `Promote` a tested `Staging` update to `Production` in the dashboard. By the way, we can release the `Production` patch directly with CLI tool but that's not recommended.

While we can do some config in the dashboard and choose to utilize more complex features of the CLI tool, I think it's enough for the current stage.

## Information

### Android Deployment Key

- To fetch deployment key, exec `appcenter codepush deployment list -a LoMoCoinTeam/Lomo-RN-Boilerplate-Android`

- Staging │ HkEsIv6DKddaxQcRBem3qAVxtTwNSJ43ueVLQ │
- Production │ z2XkRWNZSlIPqvkiX2G1tZxLNYDABk42Ol4Um │

### iOS Deployment Key

- To fetch deployment key, exec `appcenter codepush deployment list -a LoMoCoinTeam/Lomo-RN-Boilerplate-iOS`

- Staging │ LiQyho3bQ-TDd7tKy4pKri_N5UkqSJXlnxE87 │
- Production │ 3HrlRpTw-pOU5POl3h8Ufqhz9wyur1Ql3xEUX │
