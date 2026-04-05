import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { peekoFonts } from "../theme/fonts";
import {
  onboardingColors,
  onboardingLayout,
  onboardingTypography,
} from "../theme/onboarding";

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  wordmarkColor?: string;
  hideWordmark?: boolean;
};

export function OnboardingTopBar({
  left,
  right,
  wordmarkColor = onboardingColors.link,
  hideWordmark = false,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: Math.max(insets.top, onboardingLayout.topBarTopPadding),
        paddingHorizontal: onboardingLayout.horizontalPadding,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>{left ?? <View />}</View>
      {!hideWordmark && (
        <Text
          style={{
            fontFamily: peekoFonts.plusJakarta800,
            fontSize: onboardingTypography.headerWordmark.size,
            lineHeight: onboardingTypography.headerWordmark.lineHeight,
            letterSpacing: onboardingTypography.headerWordmark.letterSpacing,
            color: wordmarkColor,
          }}
        >
          Peeko
        </Text>
      )}
      <View style={{ flex: 1, alignItems: "flex-end" }}>{right ?? <View />}</View>
    </View>
  );
}
