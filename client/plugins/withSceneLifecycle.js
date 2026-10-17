const { withAppDelegate, withInfoPlist } = require('expo/config-plugins');

// Workaround: the SDK 57 template lacks the UIScene life cycle required by the iOS/tvOS 27 SDK.
// Adapted from expo-template-bare-minimum@58 (ios/HelloWorld/AppDelegate.swift, SceneDelegate.swift, Info.plist).
module.exports = (config) => {
  config = withAppDelegate(config, (config) => {
    let src = config.modResults.contents;
    if (src.includes('ExpoAppSceneDelegate')) return config;
    src = src
      .replace('class AppDelegate: ExpoAppDelegate {', 'class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {')
      .replace(/#if os\(iOS\) \|\| os\(tvOS\)\s*window = UIWindow[\s\S]*?#endif\n/, '');
    config.modResults.contents = `${src}\n@objc(SceneDelegate)\nclass SceneDelegate: ExpoAppSceneDelegate {}\n`;
    return config;
  });

  return withInfoPlist(config, (config) => {
    config.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: 'Default Configuration',
            UISceneDelegateClassName: '$(PRODUCT_MODULE_NAME).SceneDelegate',
          },
        ],
      },
    };
    return config;
  });
};
