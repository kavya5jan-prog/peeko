import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  onboardingColors,
  onboardingLayout,
  onboardingTypography,
} from "../theme/onboarding";

type Props = {
  labelFontFamily: string;
  inputFontFamily: string;
  value: string;
  onChangeText?: (text: string) => void;
  countryCode?: string;
  onPressCountry?: () => void;
  readOnly?: boolean;
};

function ChevronDown({ color }: { color: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" style={{ marginLeft: 4 }}>
      <Path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PhoneNumberFields({
  labelFontFamily,
  inputFontFamily,
  value,
  onChangeText,
  countryCode = "+1",
  onPressCountry,
  readOnly = false,
}: Props) {
  const [phoneFocused, setPhoneFocused] = useState(false);

  return (
    <View>
      <Text
        style={{
          fontFamily: labelFontFamily,
          fontSize: onboardingTypography.fieldLabel.size,
          lineHeight: onboardingTypography.fieldLabel.lineHeight,
          letterSpacing: onboardingTypography.fieldLabel.letterSpacing,
          color: onboardingColors.mutedLabel,
          marginBottom: 12,
        }}
      >
        Phone number
      </Text>
      <View style={{ flexDirection: "row", alignItems: "stretch", width: "100%" }}>
        <Pressable
          onPress={onPressCountry}
          style={{
            width: onboardingLayout.countryCodeMinWidth,
            flexShrink: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: onboardingColors.inputFill,
            borderRadius: onboardingLayout.inputRadius,
            paddingVertical: 14,
            paddingHorizontal: 12,
            marginRight: 12,
            borderWidth: 1,
            borderColor: onboardingColors.inputBorder,
          }}
        >
          <Text
            style={{
              fontFamily: inputFontFamily,
              fontSize: onboardingTypography.input.size,
              lineHeight: onboardingTypography.input.lineHeight,
              color: onboardingColors.headline,
            }}
          >
            {countryCode}
          </Text>
          <ChevronDown color={onboardingColors.mutedLabel} />
        </Pressable>
        <TextInput
          value={value}
          onChangeText={(text) => {
            if (readOnly) return;
            const digits = text.replace(/\D/g, "");
            onChangeText?.(digits);
          }}
          placeholder="000 000 0000"
          placeholderTextColor={onboardingColors.mutedLabel}
          keyboardType="number-pad"
          maxLength={10}
          onFocus={() => !readOnly && setPhoneFocused(true)}
          onBlur={() => !readOnly && setPhoneFocused(false)}
          editable={!readOnly}
          showSoftInputOnFocus={!readOnly}
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: inputFontFamily,
            fontSize: onboardingTypography.input.size,
            lineHeight: onboardingTypography.input.lineHeight,
            color: onboardingColors.headline,
            backgroundColor: onboardingColors.inputFill,
            borderRadius: onboardingLayout.inputRadius,
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderWidth: phoneFocused ? 1.5 : 1,
            borderColor: phoneFocused ? onboardingColors.link : onboardingColors.inputBorder,
          }}
        />
      </View>
    </View>
  );
}
