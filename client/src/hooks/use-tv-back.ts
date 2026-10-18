import { useEffect, useEffectEvent } from "react";
import { BackHandler, TVEventControl } from "react-native";

export function useTVBack(onBack: () => void, enabled = true) {
  const handleBack = useEffectEvent(onBack);

  useEffect(() => {
    if (!enabled) return;
    TVEventControl.enableTVMenuKey();
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => {
      subscription.remove();
      TVEventControl.disableTVMenuKey();
    };
  }, [enabled]);
}
