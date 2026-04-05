import { Platform, View, type ViewProps } from "react-native";
import { onboardingLayout } from "../theme/onboarding";

type Props = ViewProps & {
  backgroundColor: string;
  children: React.ReactNode;
};

export function OnboardingFrame({ backgroundColor, style, children, ...rest }: Props) {
  const webFrame =
    Platform.OS === "web"
      ? {
          maxWidth: onboardingLayout.frameMaxWidth,
          width: "100%" as const,
          alignSelf: "center" as const,
          // Use dvh (dynamic viewport height) for modern browsers, fallback to 100vh
          height: "100dvh" as any,
          minHeight: "100dvh" as any,
          overflow: "hidden" as const, // The frame itself shouldn't scroll, content should
        }
      : undefined;

  return (
    <View style={[{ flex: 1, backgroundColor }, webFrame, style]} {...rest}>
      {children}
    </View>
  );
}
