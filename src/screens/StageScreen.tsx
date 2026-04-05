import { useState } from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

type Nav = NativeStackNavigationProp<RootStackParamList, "Stage">;

type StageOption = {
  id: string;
  title: string;
  subtitle: string;
  avatar: string;
  avatarBg: string;
};

const STAGE_OPTIONS: StageOption[] = [
  {
    id: "pregnant",
    title: "Pregnant mom",
    subtitle: "Expecting a bundle of joy",
    avatar: "🤰",
    avatarBg: "#D6EEF4",
  },
  {
    id: "0-6",
    title: "0–6 months",
    subtitle: "Newborn care & early stages",
    avatar: "👶",
    avatarBg: "#DCECF7",
  },
  {
    id: "6-12",
    title: "6–12 months",
    subtitle: "Exploring solids & crawling",
    avatar: "🧒",
    avatarBg: "#E3EFF7",
  },
  {
    id: "1-3",
    title: "1–3 years",
    subtitle: "Active discovery & toddler fun",
    avatar: "🚶",
    avatarBg: "#E7EEF4",
  },
  {
    id: "3-plus",
    title: "3+ years",
    subtitle: "Early childhood development",
    avatar: "🧑",
    avatarBg: "#E3EEF6",
  },
];

type StageRowProps = {
  option: StageOption;
  selected: boolean;
  onPress: () => void;
  isCompact?: boolean;
};

function StageRow({ option, selected, onPress, isCompact }: StageRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        minHeight: isCompact ? onboardingLayout.compactStageRowMinHeight : onboardingLayout.stageRowMinHeight,
        borderRadius: onboardingLayout.stageRowRadius,
        backgroundColor: onboardingColors.stageRowBg,
        borderWidth: selected ? onboardingLayout.stageRowSelectedBorderWidth : 0,
        borderColor: onboardingColors.link,
        paddingHorizontal: onboardingLayout.stageRowPaddingH,
        paddingVertical: isCompact ? 8 : 12,
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <View
        style={{
          width: isCompact ? 40 : onboardingLayout.stageAvatarSize,
          height: isCompact ? 40 : onboardingLayout.stageAvatarSize,
          borderRadius: onboardingLayout.stageAvatarSize / 2,
          backgroundColor: option.avatarBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: isCompact ? 18 : 24 }}>{option.avatar}</Text>
      </View>

      <View style={{ flex: 1, marginLeft: 14, paddingRight: 10 }}>
        <Text
          style={{
            fontFamily: peekoFonts.plusJakarta500,
            fontSize: onboardingTypography.input.size,
            lineHeight: onboardingTypography.input.lineHeight,
            color: onboardingColors.headline,
          }}
        >
          {option.title}
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontFamily: peekoFonts.beVietnam500,
            fontSize: isCompact ? 12 : onboardingTypography.screenSubtitle.size,
            lineHeight: isCompact ? 16 : onboardingTypography.screenSubtitle.lineHeight,
            color: onboardingColors.body,
          }}
        >
          {option.subtitle}
        </Text>
      </View>

      <View
        style={{
          width: onboardingLayout.stageSelectorSize,
          height: onboardingLayout.stageSelectorSize,
          borderRadius: onboardingLayout.stageSelectorSize / 2,
          borderWidth: 2,
          borderColor: selected ? splashColors.logo : "#C2D6E2",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected ? splashColors.logo : "transparent",
        }}
      >
        {selected ? (
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              lineHeight: 14,
              fontFamily: peekoFonts.beVietnam600,
            }}
          >
            ✓
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export function StageScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [selectedStageId, setSelectedStageId] = useState("1-3");
  
  const isCompact = windowHeight < onboardingLayout.compactHeightThreshold;
  const isSuperCompact = windowHeight < onboardingLayout.superCompactHeightThreshold;

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
        fontFamilySemiBold={peekoFonts.beVietnam600}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );

  return (
    <OnboardingFrame backgroundColor={onboardingColors.screenBackground}>
      <View style={{ flex: 1 }}>
        <OnboardingTopBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: onboardingLayout.horizontalPadding,
            paddingTop: isCompact ? onboardingLayout.compactGapHeaderToTitle : onboardingLayout.gapHeaderToTitle,
            paddingBottom: isSuperCompact ? 0 : 24,
          }}
        >
          <Text
            style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: isSuperCompact ? 22 : (isCompact ? 24 : onboardingTypography.screenTitle.size),
              lineHeight: isSuperCompact ? 28 : (isCompact ? 30 : onboardingTypography.screenTitle.lineHeight),
              letterSpacing: onboardingTypography.screenTitle.letterSpacing,
              color: onboardingColors.headline,
              maxWidth: 320,
            }}
          >
            Tell us about your little one
          </Text>
          <Text
            style={{
              marginTop: isCompact ? onboardingLayout.compactGapTitleToSubtitle : onboardingLayout.gapTitleToSubtitle,
              fontFamily: peekoFonts.beVietnam500,
              fontSize: onboardingTypography.screenSubtitle.size * 0.85,
              lineHeight: onboardingTypography.screenSubtitle.lineHeight * 0.85,
              color: onboardingColors.body,
              maxWidth: 315,
            }}
          >
            We'll personalize your experience based on their stage of growth.
          </Text>

          <View
            accessibilityRole="radiogroup"
            style={{ 
              marginTop: isCompact ? onboardingLayout.compactGapSubtitleToCard : onboardingLayout.gapSubtitleToCard - 4, 
              gap: isCompact ? 8 : 12 
            }}
          >
            {STAGE_OPTIONS.map((option) => (
              <StageRow
                key={option.id}
                option={option}
                selected={selectedStageId === option.id}
                onPress={() => setSelectedStageId(option.id)}
                isCompact={isCompact}
              />
            ))}
          </View>

          {/* Adaptive Button: In Super Compact mode, place it inside ScrollView */}
          {isSuperCompact && (
            <View style={{ marginTop: 24 }}>
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
