import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParamList } from "../navigation/types";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { OnboardingTopBar } from "../components/OnboardingTopBar";
import { PeekoSurfaceCard } from "../components/PeekoSurfaceCard";
import { PhoneNumberFields } from "../components/PhoneNumberFields";
import { PrimaryPillButton } from "../components/PrimaryPillButton";
import { peekoFonts } from "../theme/fonts";
import {
  onboardingColors,
  onboardingLayout,
  onboardingTypography,
} from "../theme/onboarding";
import { SuggestedPhoneBar } from "../components/SuggestedPhoneBar";
import { PhoneKeypad } from "../components/PhoneKeypad";

type Nav = NativeStackNavigationProp<RootStackParamList, "Phone">;

export function PhoneScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  
  const goOtp = (targetPhone?: string) => {
    const finalPhone = targetPhone || phone;
    if (finalPhone.length === 10) {
      navigation.navigate("Otp", { phone: finalPhone });
    }
  };
  
  const goStage = () => navigation.navigate("Stage");
  
  const handleKeypadPress = (val: string) => {
    if (phone.length < 10) {
      setPhone(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    setPhone(prev => prev.slice(0, -1));
  };

  const handleSuggestionPress = () => {
    const suggestedNum = "9685398465";
    setPhone(suggestedNum);
    // Wait for 400ms before moving to OTP screen
    setTimeout(() => {
      navigation.navigate("Otp", { phone: suggestedNum });
    }, 400);
  };

  const bottomPad = insets.bottom > 0 ? insets.bottom : 20;

  return (
    <OnboardingFrame backgroundColor={onboardingColors.screenBackground}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1 }}>
          <OnboardingTopBar
            hideWordmark={true}
            right={
              <Pressable hitSlop={12} onPress={goStage} accessibilityRole="button">
                <Text
                  style={{
                    fontFamily: peekoFonts.beVietnam500,
                    fontSize: onboardingTypography.skip.size,
                    lineHeight: onboardingTypography.skip.lineHeight,
                    color: onboardingColors.link,
                  }}
                >
                  Skip for now
                </Text>
              </Pressable>
            }
          />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: onboardingLayout.horizontalPadding,
              flexGrow: 1,
              paddingTop: 60, // Bring it lower
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                fontFamily: peekoFonts.plusJakarta800,
                fontSize: onboardingTypography.screenTitle.size,
                lineHeight: onboardingTypography.screenTitle.lineHeight,
                letterSpacing: onboardingTypography.screenTitle.letterSpacing,
                color: onboardingColors.headline,
                textAlign: "center",
                maxWidth: 250,
                alignSelf: "center",
              }}
            >
              Enter your phone number
            </Text>
            <Text
              style={{
                fontFamily: peekoFonts.beVietnam500,
                fontSize: onboardingTypography.screenSubtitle.size,
                lineHeight: onboardingTypography.screenSubtitle.lineHeight,
                color: onboardingColors.body,
                textAlign: "center",
                marginTop: onboardingLayout.gapTitleToSubtitle,
                maxWidth: 260,
                alignSelf: "center",
              }}
            >
              We'll send you an OTP to verify your account.
            </Text>

            <PeekoSurfaceCard style={{ marginTop: onboardingLayout.gapSubtitleToCard }}>
              <PhoneNumberFields
                countryCode="+91"
                labelFontFamily={peekoFonts.plusJakarta500}
                inputFontFamily={peekoFonts.beVietnam500}
                value={phone}
                readOnly={true}
              />
            </PeekoSurfaceCard>

          </ScrollView>

          <View style={{ backgroundColor: "#F8FDFF" }}>
            <SuggestedPhoneBar 
              label="MOBILE"
              value="+91 96853 98465"
              onPress={handleSuggestionPress}
            />
            <View style={{ paddingBottom: bottomPad, backgroundColor: "#FFF" }}>
              <PhoneKeypad 
                onPress={handleKeypadPress}
                onBackspace={handleBackspace}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </OnboardingFrame>
  );
}
