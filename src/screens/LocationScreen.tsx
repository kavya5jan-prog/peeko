/**
 * Select location — Figma node 46:4006, file H1c88ILL19tErXVaBHqOAF.
 */
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { OnboardingTopBar } from "../components/OnboardingTopBar";
import { PrimaryPillButton } from "../components/PrimaryPillButton";
import { PeekoSurfaceCard } from "../components/PeekoSurfaceCard";
import type { RootStackParamList } from "../navigation/types";
import { peekoFonts } from "../theme/fonts";
import {
  onboardingColors,
  onboardingLayout,
  onboardingTypography,
} from "../theme/onboarding";
import { splashColors } from "../theme/splash";

type Nav = NativeStackNavigationProp<RootStackParamList, "Location">;

function SearchIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke="#6E96AB" strokeWidth={2} />
      <Path d="M20 20L16.65 16.65" stroke="#6E96AB" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function PinIcon({ color = splashColors.logo }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21s-6-5.2-6-10a6 6 0 1112 0c0 4.8-6 10-6 10z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={11} r={2} fill={color} />
    </Svg>
  );
}

function LocateIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={7.5} stroke={splashColors.logo} strokeWidth={1.8} />
      <Path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={splashColors.logo} strokeWidth={1.8} />
      <Circle cx={12} cy={12} r={2.6} fill={splashColors.logo} />
    </Svg>
  );
}

export function LocationScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  
  const isCompact = windowHeight < onboardingLayout.compactHeightThreshold;
  const isSuperCompact = windowHeight < onboardingLayout.superCompactHeightThreshold;

  const goStage = () => navigation.navigate("Stage");

  const renderButton = () => (
    <View
      style={{
        paddingHorizontal: isSuperCompact ? 0 : onboardingLayout.bottomHorizontalPadding,
        paddingBottom: isSuperCompact ? 20 : Math.max(insets.bottom, onboardingLayout.webSafeBottom),
        paddingTop: 12,
        backgroundColor: isSuperCompact ? "transparent" : onboardingColors.screenBackground,
      }}
    >
      <PrimaryPillButton
        label="Continue"
        onPress={goStage}
        fontFamilySemiBold={peekoFonts.plusJakarta700}
      />
    </View>
  );

  return (
    <OnboardingFrame backgroundColor={onboardingColors.screenBackground}>
      <View style={{ flex: 1 }}>
        <OnboardingTopBar
          left={
            <Pressable hitSlop={12} onPress={() => navigation.goBack()} accessibilityRole="button">
              <Text style={{ fontSize: 22, color: onboardingColors.link }}>←</Text>
            </Pressable>
          }
        />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: onboardingLayout.horizontalPadding,
            paddingTop: isCompact ? onboardingLayout.compactGapHeaderToTitle : onboardingLayout.gapHeaderToTitle,
            paddingBottom: isSuperCompact ? 0 : 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: isSuperCompact ? 22 : onboardingTypography.screenTitle.size,
              lineHeight: isSuperCompact ? 28 : onboardingTypography.screenTitle.lineHeight,
              letterSpacing: onboardingTypography.screenTitle.letterSpacing,
              color: onboardingColors.headline,
              textAlign: "center",
              marginBottom: isCompact ? onboardingLayout.compactGapTitleToSubtitle : 24,
            }}
          >
            Select location
          </Text>

          <View
            style={{
              height: 48,
              borderRadius: 24,
              borderWidth: 1.5,
              borderColor: searchFocused ? onboardingColors.link : onboardingColors.inputBorder,
              backgroundColor: "#FFF",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              marginBottom: isCompact ? onboardingLayout.compactGapSearchToMap : 24,
            }}
          >
            <SearchIcon />
            <TextInput
              value={query}
              onChangeText={setQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search for your location"
              placeholderTextColor="#99B0BF"
              style={{
                flex: 1,
                marginLeft: 12,
                fontFamily: peekoFonts.beVietnam500,
                fontSize: 15,
                color: onboardingColors.headline,
              }}
            />
          </View>

          {/* Map Preview */}
          <View
            style={{
              height: isSuperCompact ? 150 : (isCompact ? onboardingLayout.compactMapHeight : 340),
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 16,
              backgroundColor: "#0C4961",
            }}
          >
            <Svg width="100%" height="100%" viewBox="0 0 320 344" preserveAspectRatio="none">
              <Path d="M0 0h320v344H0z" fill="#0C4961" />
              <Path d="M0 180c60-4 150-8 320 2v162H0z" fill="#2E6B7E" />
              <Path
                d="M170 344c-18-75 44-108 62-143 13-25-7-39-41-35-40 6-88 45-146 40v-18c66 6 115-34 163-42 58-9 85 19 62 63-20 39-86 74-80 135z"
                fill="#FFF8D5"
              />
              <Path d="M0 177h320" stroke="#D5D2B4" strokeWidth={2} />
            </Svg>

            <View style={{ position: "absolute", top: isSuperCompact ? 20 : (isCompact ? 40 : 70), left: "47%" }}>
              {!isSuperCompact && (
                <View
                  style={{
                    position: "absolute",
                    top: 44,
                    left: -20,
                    width: 40,
                    height: 12,
                    borderRadius: 24,
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                  }}
                />
              )}
              <Svg width={isSuperCompact ? 30 : 44} height={isSuperCompact ? 40 : 58} viewBox="0 0 44 58">
                <Path
                  d="M22 58c0-1-13-12-13-25a13 13 0 1126 0c0 13-13 24-13 25z"
                  fill="#FFF5D6"
                />
                <Circle cx={22} cy={31} r={6.5} fill={splashColors.logo} />
              </Svg>
            </View>

            <Pressable
              style={{
                position: "absolute",
                right: 14,
                bottom: 14,
                width: isSuperCompact ? 32 : 44,
                height: isSuperCompact ? 32 : 44,
                borderRadius: 22,
                backgroundColor: "#F4F8FB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocateIcon />
            </Pressable>
          </View>

          {/* Address Card */}
          <PeekoSurfaceCard
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingVertical: 16,
              paddingHorizontal: 20,
              gap: 12,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#E8F4F8",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PinIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: peekoFonts.plusJakarta700,
                  fontSize: 16,
                  color: onboardingColors.headline,
                }}
              >
                26, 10th Cross Rd
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontFamily: peekoFonts.beVietnam500,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#3D7082",
                }}
              >
                HAL 3rd Stage, Bengaluru, Karnataka 560008, India
              </Text>
            </View>
          </PeekoSurfaceCard>

          {/* Adaptive Button: In Super Compact mode, place it inside ScrollView */}
          {isSuperCompact && (
            <View style={{ marginTop: 12 }}>
              {renderButton()}
            </View>
          )}
        </ScrollView>

        {/* Normal Mode: Keep button fixed at bottom */}
        {!isSuperCompact && renderButton()}
      </View>
    </OnboardingFrame>
  );
}
