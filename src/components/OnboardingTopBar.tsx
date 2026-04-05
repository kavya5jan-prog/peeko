import { Text, View, useWindowDimensions } from "react-native";
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
  const { height } = useWindowDimensions();
  
  const isSuperCompact = height < onboardingLayout.superCompactHeightThreshold;
  const topPad = isSuperCompact ? 8 : Math.max(insets.top, onboardingLayout.topBarTopPadding);
  const minBarHeight = isSuperCompact ? 44 : 56;

  return (
    <View
      style={{
        paddingTop: topPad,
        minHeight: minBarHeight + topPad,
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
            fontSize: isSuperCompact ? 20 : onboardingTypography.headerWordmark.size,
            lineHeight: isSuperCompact ? 24 : onboardingTypography.headerWordmark.lineHeight,
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
