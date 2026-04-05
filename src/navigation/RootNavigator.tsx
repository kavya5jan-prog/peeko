import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocationScreen } from "../screens/LocationScreen";
import { OfferClaimScreen } from "../screens/OfferClaimScreen";
import { PhoneScreen } from "../screens/PhoneScreen";
import { OtpScreen } from "../screens/OtpScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { StageScreen } from "../screens/StageScreen";
import { SurpriseScreen } from "../screens/SurpriseScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { PaymentSuccessScreen } from "../screens/PaymentSuccessScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { peekoFonts } from "../theme/fonts";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Splash">
        {() => (
          <SplashScreen
            fontLogoHeadline={peekoFonts.plusJakarta800}
            fontSubhead={peekoFonts.beVietnam500}
            fontTrust={peekoFonts.plusJakarta500}
            fontButton={peekoFonts.beVietnam600}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Phone">
        {() => <PhoneScreen />}
      </Stack.Screen>
      <Stack.Screen name="Otp">
        {() => <OtpScreen />}
      </Stack.Screen>
      <Stack.Screen name="Location">
        {() => <LocationScreen />}
      </Stack.Screen>
      <Stack.Screen name="Stage">
        {() => <StageScreen />}
      </Stack.Screen>
      <Stack.Screen name="Surprise">
        {() => <SurpriseScreen />}
      </Stack.Screen>
      <Stack.Screen name="OfferClaim" options={{ animation: 'fade', animationDuration: 800 }}>
        {() => <OfferClaimScreen />}
      </Stack.Screen>
      <Stack.Screen name="Checkout">
        {() => <CheckoutScreen />}
      </Stack.Screen>
      <Stack.Screen name="PaymentSuccess">
        {() => <PaymentSuccessScreen />}
      </Stack.Screen>
      <Stack.Screen name="Home">
        {() => <HomeScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
