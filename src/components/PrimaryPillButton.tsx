import type { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View, type ViewStyle } from "react-native";
import {
  splashColors,
  splashCtaGradient,
  splashLayout,
  splashShadow,
  splashTypography,
} from "../theme/splash";

type Props = {
  label: string;
  trailing?: string;
  /** Rendered before the label (e.g. icon). */
  leading?: ReactNode;
  onPress?: () => void;
  fontFamilySemiBold: string;
  disabled?: boolean;
};

export function PrimaryPillButton({
  label,
  trailing = "→",
  leading,
  onPress,
  fontFamilySemiBold,
  disabled = false,
}: Props) {
  const capsuleStyle: ViewStyle = {
    padding: splashLayout.outerCapsulePadding,
    borderRadius: splashLayout.outerCapsuleRadius,
    backgroundColor: splashColors.capsuleSurface,
    ...splashShadow,
    opacity: disabled ? 0.45 : 1,
  };

  return (
    <View style={capsuleStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        style={{ borderRadius: 9999, overflow: "hidden" }}
      >
        <LinearGradient
          colors={[...splashCtaGradient.colors]}
          start={splashCtaGradient.start}
          end={splashCtaGradient.end}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: splashLayout.ctaVerticalPadding,
          }}
        >
          {leading != null ? (
            <View style={{ marginRight: splashLayout.ctaItemSpacing }}>{leading}</View>
          ) : null}
          <Text
            style={{
              fontFamily: fontFamilySemiBold,
              fontSize: splashTypography.button.size,
              lineHeight: splashTypography.button.lineHeight,
              letterSpacing: splashTypography.button.letterSpacing,
              color: splashColors.onPrimary,
            }}
          >
            {label}
          </Text>
          {trailing !== "" ? (
            <Text
              style={{
                fontFamily: fontFamilySemiBold,
                fontSize: 16,
                lineHeight: 16,
                marginLeft: splashLayout.ctaItemSpacing,
                color: splashColors.onPrimary,
              }}
            >
              {trailing}
            </Text>
          ) : null}
        </LinearGradient>
      </Pressable>
    </View>
  );
}
