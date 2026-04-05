import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_500Medium,
  BeVietnamPro_600SemiBold,
  useFonts as useBeFonts,
} from "@expo-google-fonts/be-vietnam-pro";
import {
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts as usePlusFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { splashColors } from "./src/theme/splash";
import { LocationProvider } from "./src/context/LocationContext";

export default function App() {
  const [plusLoaded] = usePlusFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });
  const [beLoaded] = useBeFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
  });
  const loaded = plusLoaded && beLoaded;

  if (!loaded) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ flex: 1, backgroundColor: splashColors.background }}
      >
        <ActivityIndicator color={splashColors.headline} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <LocationProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </LocationProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
