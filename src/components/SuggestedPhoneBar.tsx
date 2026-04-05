import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { peekoFonts } from "../theme/fonts";
import { onboardingColors } from "../theme/onboarding";

type Props = {
  label: string;
  value: string;
  onPress: () => void;
};

export function SuggestedPhoneBar({ label, value, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6F7F9",
    width: "100%",
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontFamily: peekoFonts.plusJakarta500,
    fontSize: 10,
    color: "#809FB8",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  value: {
    fontFamily: peekoFonts.plusJakarta800,
    fontSize: 18,
    color: onboardingColors.headline,
    letterSpacing: 0.5,
  },
});
