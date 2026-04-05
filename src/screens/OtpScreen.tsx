import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Path, Polyline, Rect } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParamList } from "../navigation/types";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { OnboardingTopBar } from "../components/OnboardingTopBar";
import { peekoFonts } from "../theme/fonts";
import {
  onboardingColors,
  onboardingLayout,
  onboardingTypography,
} from "../theme/onboarding";
import { PhoneKeypad } from "../components/PhoneKeypad";
import { SuggestedPhoneBar } from "../components/SuggestedPhoneBar";

type Nav = NativeStackNavigationProp<RootStackParamList, "Otp">;
type Route = RouteProp<RootStackParamList, "Otp">;

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

/** Single OTP digit box */
function OtpBox({
  value,
  focused,
}: {
  value: string;
  focused: boolean;
}) {
  const filled = value.length > 0;
  return (
    <View
      style={{
        width: 72,
        height: 72,
        borderRadius: 16,
        borderWidth: focused ? 2 : 1.5,
        borderColor: focused
          ? onboardingColors.link
          : onboardingColors.inputBorder,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        // shadow
        shadowColor: onboardingColors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: focused ? 0.08 : 0.04,
        shadowRadius: 12,
        elevation: focused ? 4 : 2,
      }}
    >
      {/* Dot placeholder when empty */}
      {filled ? (
        <Text
          style={{
            fontFamily: peekoFonts.plusJakarta700,
            fontSize: 28,
            lineHeight: 34,
            color: onboardingColors.headline,
          }}
        >
          {value}
        </Text>
      ) : (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#8C9199", // Gray dot from image
          }}
        />
      )}
    </View>
  );
}

export function OtpScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  
  const isCompact = height < onboardingLayout.compactHeightThreshold;
  const isSuperCompact = height < onboardingLayout.superCompactHeightThreshold;
  
  const phone: string = route.params?.phone ?? "";
  const formattedPhone = phone.length === 10
    ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
    : phone;

  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [showOtpBar, setShowOtpBar] = useState(false);

  const focusedIndex = digits.findIndex(d => d === "");

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Delayed OTP bar appearance
  useEffect(() => {
    const t = setTimeout(() => setShowOtpBar(true), 650);
    return () => clearTimeout(t);
  }, []);

  const handleResend = useCallback(() => {
    if (!canResend) return;
    setCountdown(RESEND_SECONDS);
    setCanResend(false);
    setDigits(["", "", "", ""]);
  }, [canResend]);

  const handleKeypadPress = (val: string) => {
    const nextIdx = digits.findIndex(d => d === "");
    if (nextIdx !== -1) {
      const newDigits = [...digits];
      newDigits[nextIdx] = val;
      setDigits(newDigits);
      
      // If last digit filled
      if (nextIdx === OTP_LENGTH - 1) {
        setTimeout(() => {
          navigation.navigate("Location");
        }, 400);
      }
    }
  };

  const handleBackspace = () => {
    const lastFilledIdx = [...digits].reverse().findIndex(d => d !== "");
    if (lastFilledIdx !== -1) {
      const idx = OTP_LENGTH - 1 - lastFilledIdx;
      const newDigits = [...digits];
      newDigits[idx] = "";
      setDigits(newDigits);
    }
  };

  const handleSuggestionPress = () => {
    const suggested = "2639";
    setDigits(suggested.split(""));
    setTimeout(() => {
      navigation.navigate("Location");
    }, 400);
  };

  const goBack = () => navigation.goBack();

  const renderFooter = () => (
    <View style={{ 
      backgroundColor: "transparent", 
      height: 380, 
      justifyContent: "flex-end",
    }}>
      <View
        style={{
          transform: [{ scale: 0.8 }],
          transformOrigin: "bottom center",
          width: "125%",
          marginLeft: "-12.5%",
          backgroundColor: "#FFF",
        }}
      >
        {showOtpBar ? (
          <SuggestedPhoneBar
            label="FROM MESSAGES"
            value="2639"
            onPress={handleSuggestionPress}
          />
        ) : (
          <View style={{ height: 72 }} />
        )}
        <View
          style={{
            paddingBottom: Math.max(insets.bottom, 4),
            backgroundColor: "#FFF",
          }}
        >
          <PhoneKeypad
            onPress={handleKeypadPress}
            onBackspace={handleBackspace}
          />
        </View>
      </View>
    </View>
  );

  return (
    <OnboardingFrame backgroundColor={onboardingColors.screenBackground}>
      <View style={{ flex: 1 }}>
        {/* Top bar with back arrow + Peeko wordmark */}
        <OnboardingTopBar
          left={
            <Pressable hitSlop={12} onPress={goBack} accessibilityRole="button">
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: onboardingColors.link,
                  lineHeight: 26,
                }}
              >
                ←
              </Text>
            </Pressable>
          }
        />

        {/* Body */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: onboardingLayout.horizontalPadding,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: isCompact ? onboardingLayout.compactGapHeaderToTitle : onboardingLayout.gapHeaderToTitle,
          }}
        >
          {/* Icon - Hidden on small screens to save valuable space */}
          {!isCompact && (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 22,
                backgroundColor: "#D6EEF5",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 28,
              }}
            >
              {/* Message icon with checkmark badge */}
              <View style={{ alignItems: "center", justifyContent: "center", width: 46, height: 40 }}>
                <Svg width={38} height={30} viewBox="0 0 38 30" fill="none">
                  <Rect x="1" y="1" width="36" height="28" rx="4" stroke={onboardingColors.link} strokeWidth="2.2" fill="none" />
                  <Polyline points="1,1 19,17 37,1" stroke={onboardingColors.link} strokeWidth="2.2" fill="none" strokeLinejoin="round" />
                </Svg>
                <View
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: onboardingColors.link,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "#D6EEF5",
                  }}
                >
                  <Svg width={10} height={8} viewBox="0 0 10 8" fill="none">
                    <Polyline points="1,4 4,7 9,1" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </Svg>
                </View>
              </View>
            </View>
          )}

          {/* Title */}
          <Text
            style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: isSuperCompact ? 22 : onboardingTypography.screenTitle.size,
              lineHeight: isSuperCompact ? 28 : onboardingTypography.screenTitle.lineHeight,
              letterSpacing: onboardingTypography.screenTitle.letterSpacing,
              color: onboardingColors.headline,
              textAlign: "center",
            }}
          >
            Verify your number
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontFamily: peekoFonts.beVietnam500,
              fontSize: onboardingTypography.screenSubtitle.size,
              lineHeight: onboardingTypography.screenSubtitle.lineHeight,
              color: onboardingColors.body,
              textAlign: "center",
              marginTop: isCompact ? onboardingLayout.compactGapTitleToSubtitle : 12,
            }}
          >
            We've sent a 4-digit code to
          </Text>

          {/* Phone + pencil edit row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: 6,
            }}
          >
            <Text
              style={{
                fontFamily: peekoFonts.plusJakarta700,
                fontSize: onboardingTypography.screenSubtitle.size,
                lineHeight: onboardingTypography.screenSubtitle.lineHeight,
                color: onboardingColors.headline,
              }}
            >
              {formattedPhone}
            </Text>
            <Pressable
              hitSlop={8}
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Edit phone number"
            >
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke={onboardingColors.link}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke={onboardingColors.link}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          </View>

          {/* OTP boxes */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: isCompact ? onboardingLayout.compactGapSubtitleToCard : 36,
            }}
          >
            {digits.map((digit, idx) => (
              <OtpBox
                key={idx}
                value={digit}
                focused={focusedIndex === idx}
              />
            ))}
          </View>

          {/* Resend row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: isCompact ? 16 : 32,
              gap: 6,
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={onboardingColors.mutedLabel} strokeWidth="2" />
              <Path d="M12 6V12L16 14" stroke={onboardingColors.mutedLabel} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text
              style={{
                fontSize: 14,
                fontFamily: peekoFonts.beVietnam500,
                color: onboardingColors.mutedLabel,
              }}
            >
              Resend OTP in{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: peekoFonts.beVietnam600,
                color: onboardingColors.link,
              }}
            >
              {canResend ? (
                <Pressable onPress={handleResend}>
                  <Text style={{ textDecorationLine: "underline" }}>Resend</Text>
                </Pressable>
              ) : (
                `${countdown}s`
              )}
            </Text>
          </View>

        </View>

        {/* Footer is now always fixed at bottom since screen is non-scrollable */}
        {renderFooter()}
      </View>
    </OnboardingFrame>
  );
}
