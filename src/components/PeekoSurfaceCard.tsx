import { View, type ViewProps } from "react-native";
import {
  cardShadow,
  onboardingColors,
  onboardingLayout,
} from "../theme/onboarding";

type Props = ViewProps & {
  children: React.ReactNode;
};

export function PeekoSurfaceCard({ style, children, ...rest }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: onboardingColors.card,
          borderRadius: onboardingLayout.cardRadius,
          padding: onboardingLayout.cardPadding,
          ...cardShadow,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
