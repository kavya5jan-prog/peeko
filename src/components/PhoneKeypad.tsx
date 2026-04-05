import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { peekoFonts } from "../theme/fonts";
import { onboardingColors } from "../theme/onboarding";

type KeypadButtonProps = {
  label: string;
  subLabel?: string;
  onPress: (val: string) => void;
  isBackspace?: boolean;
};

const BackspaceIcon = () => (
  <Svg width={24} height={20} viewBox="0 0 24 20" fill="none">
    <Path
      d="M22 2H9L2 10L9 18H22V2Z"
      stroke="#4A6572"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 7L13 13"
      stroke="#4A6572"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 7L18 13"
      stroke="#4A6572"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const KeypadButton = ({ label, subLabel, onPress, isBackspace }: KeypadButtonProps) => {
  return (
    <Pressable
      onPress={() => onPress(label)}
      style={({ pressed }) => [
        styles.keyButton,
        pressed && styles.keyButtonPressed,
      ]}
    >
      {isBackspace ? (
        <BackspaceIcon />
      ) : (
        <View style={styles.keyContent}>
          <Text style={styles.keyLabel}>{label}</Text>
          {subLabel && <Text style={styles.keySubLabel}>{subLabel}</Text>}
        </View>
      )}
    </Pressable>
  );
};

export function PhoneKeypad({
  onPress,
  onBackspace,
}: {
  onPress: (val: string) => void;
  onBackspace: () => void;
}) {
  const keys = [
    { label: "1", subLabel: "" },
    { label: "2", subLabel: "ABC" },
    { label: "3", subLabel: "DEF" },
    { label: "4", subLabel: "GHI" },
    { label: "5", subLabel: "JKL" },
    { label: "6", subLabel: "MNO" },
    { label: "7", subLabel: "PQRS" },
    { label: "8", subLabel: "TUV" },
    { label: "9", subLabel: "WXYZ" },
    { label: "", subLabel: "" },
    { label: "0", subLabel: "" },
    { label: "backspace", subLabel: "", isBackspace: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {keys.map((key, index) => (
          <View key={index} style={styles.keyWrapper}>
            {key.label === "" && !key.isBackspace ? (
              <View style={styles.keyButton} />
            ) : (
              <KeypadButton
                label={key.label}
                subLabel={key.subLabel}
                onPress={(val) => (key.isBackspace ? onBackspace() : onPress(val))}
                isBackspace={key.isBackspace}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingBottom: 20,
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  keyWrapper: {
    width: "33.33%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  keyButton: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  keyButtonPressed: {
    opacity: 0.5,
  },
  keyContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  keyLabel: {
    fontFamily: peekoFonts.plusJakarta700,
    fontSize: 28,
    color: onboardingColors.headline,
    lineHeight: 32,
  },
  keySubLabel: {
    fontFamily: peekoFonts.plusJakarta700,
    fontSize: 10,
    color: onboardingColors.mutedLabel,
    marginTop: 2,
    letterSpacing: 1,
  },
});
