import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import {
  onboardingColors,
  onboardingTypography,
} from "../theme/onboarding";
import { splashColors } from "../theme/splash";

type Props = {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
  titleFontFamily: string;
  subtitleFontFamily: string;
  showDivider?: boolean;
};

function PinIcon({ color }: { color: string }) {
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

export function LocationListRow({
  title,
  subtitle,
  selected,
  onPress,
  titleFontFamily,
  subtitleFontFamily,
  showDivider = true,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        opacity: pressed ? 0.85 : 1,
        borderBottomWidth: showDivider ? 1 : 0,
        borderBottomColor: onboardingColors.rowDivider,
      })}
    >
      <View
        style={{
          width: 40,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <PinIcon color={selected ? splashColors.logo : onboardingColors.mutedLabel} />
      </View>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text
          style={{
            fontFamily: titleFontFamily,
            fontSize: onboardingTypography.input.size,
            lineHeight: onboardingTypography.input.lineHeight,
            color: onboardingColors.headline,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: subtitleFontFamily,
            fontSize: onboardingTypography.terms.size,
            lineHeight: onboardingTypography.terms.lineHeight,
            color: onboardingColors.body,
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      </View>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: selected ? splashColors.logo : onboardingColors.mutedLabel,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: splashColors.logo,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
