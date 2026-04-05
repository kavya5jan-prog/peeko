/**
 * Select location — Figma node 46:4006, file H1c88ILL19tErXVaBHqOAF.
 */
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, TextInput, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { OnboardingTopBar } from "../components/OnboardingTopBar";
import { PrimaryPillButton } from "../components/PrimaryPillButton";
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
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(true);
  const bottomPad = onboardingLayout.bottomBarPaddingBottom + insets.bottom;

  return (
    <OnboardingFrame backgroundColor={onboardingColors.screenBackground}>
      <View style={{ flex: 1 }}>
        <OnboardingTopBar />
        <View
          style={{
            flex: 1,
            paddingHorizontal: onboardingLayout.horizontalPadding,
            paddingTop: onboardingLayout.gapHeaderToTitle,
          }}
        >
          <Text
            style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: onboardingTypography.screenTitle.size,
              lineHeight: onboardingTypography.screenTitle.lineHeight,
              letterSpacing: onboardingTypography.screenTitle.letterSpacing,
              color: onboardingColors.headline,
              textAlign: "center",
            }}
          >
            Select location
          </Text>

          <View
            style={{
              marginTop: onboardingLayout.gapTitleToSearch,
              backgroundColor: "#F8F8F8",
              borderRadius: 22,
              paddingHorizontal: 16,
              height: 56,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: searchFocused ? 1.5 : 0,
              borderColor: onboardingColors.link,
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
                fontSize: 30 / 2,
                color: onboardingColors.headline,
              }}
            />
          </View>

          <View
            style={{
              marginTop: onboardingLayout.gapSearchToMap,
              borderRadius: onboardingLayout.mapRadius,
              overflow: "hidden",
              height: onboardingLayout.mapHeight,
              backgroundColor: "#0E4A60",
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
              <Path d="M35 235c35-12 75-8 121 8" stroke="#1B5769" strokeWidth={3} />
              <Path d="M155 286c32-4 74 7 130 29" stroke="#1B5769" strokeWidth={3} />
              <Path d="M92 262c12 14 27 20 49 16" stroke="#3A7B8A" strokeWidth={2} />
              <Path d="M216 255c17-8 43-7 68 0" stroke="#3A7B8A" strokeWidth={2} />
            </Svg>

            <View style={{ position: "absolute", top: 70, left: "47%" }}>
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
              <Svg width={44} height={58} viewBox="0 0 44 58">
                <Path
                  d="M22 58c0-1-13-12-13-25a13 13 0 1126 0c0 13-13 24-13 25z"
                  fill="#FFF5D6"
                />
                <Circle cx={22} cy={31} r={6.5} fill={splashColors.logo} />
              </Svg>
              <View
                style={{
                  position: "absolute",
                  top: 10,
                  left: 3,
                  backgroundColor: splashColors.logo,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: peekoFonts.beVietnam600,
                    fontSize: 12,
                    lineHeight: 14,
                    color: "#FFFFFF",
                  }}
                >
                  YOU
                </Text>
              </View>
            </View>

            <Pressable
              style={{
                position: "absolute",
                right: 14,
                bottom: 14,
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#F4F8FB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocateIcon />
            </Pressable>
          </View>

          <View
            style={{
              marginTop: onboardingLayout.gapMapToAddress,
              backgroundColor: "#F8F8F8",
              borderRadius: onboardingLayout.addressCardRadius,
              paddingVertical: onboardingLayout.addressCardPaddingV,
              paddingHorizontal: onboardingLayout.addressCardPaddingH,
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "#E6EEF2",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PinIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: peekoFonts.plusJakarta500,
                  fontSize: 30 / 2,
                  lineHeight: 22,
                  color: onboardingColors.headline,
                }}
              >
                26, 10th Cross Rd
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontFamily: peekoFonts.beVietnam500,
                  fontSize: 16,
                  lineHeight: 28,
                  color: "#3D7082",
                }}
              >
                HAL 3rd Stage, Bengaluru,{"\n"}Karnataka 560008, India
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: onboardingLayout.bottomHorizontalPadding,
            paddingBottom: bottomPad,
          }}
        >
          <PrimaryPillButton
            label="Continue"
            fontFamilySemiBold={peekoFonts.beVietnam600}
            onPress={() => navigation.navigate("Stage")}
          />
        </View>
      </View>
    </OnboardingFrame>
  );
}
