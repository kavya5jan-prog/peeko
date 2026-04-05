import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { PrimaryPillButton } from "../components/PrimaryPillButton";
import type { RootStackParamList } from "../navigation/types";
import {
  splashColors,
  splashLayout,
  splashTypography,
} from "../theme/splash";

type SplashScreenProps = {
  fontLogoHeadline: string;
  fontSubhead: string;
  fontTrust: string;
  fontButton: string;
};

type Nav = NativeStackNavigationProp<RootStackParamList, "Splash">;

function CloudMark({ style }: { style?: object }) {
  return (
    <View style={[{ position: "absolute", opacity: 0.4 }, style]}>
      <Svg width={76} height={50} viewBox="0 0 72 48">
        <Path
          d="M56 32c4.4 0 8-3.6 8-8 0-3.7-2.5-6.7-5.9-7.6C56.8 9.9 48.6 4 39 4c-9.9 0-18.2 6.2-21.5 14.8C9.2 21.3 4 27.4 4 34.5 4 42.4 10.1 48 17.7 48H56V32z"
          fill={splashColors.cloud}
        />
      </Svg>
    </View>
  );
}

function BabyMark({ style }: { style?: object }) {
  return (
    <View style={[{ position: "absolute" }, style]}>
      <Svg width={38} height={38} viewBox="0 0 36 36">
        <Circle cx={18} cy={18} r={17} fill={splashColors.baby} />
        <Circle cx={12} cy={14} r={2.2} fill={splashColors.logo} />
        <Circle cx={24} cy={14} r={2.2} fill={splashColors.logo} />
        <Path
          d="M11 22c2.5 4 11.5 4 14 0"
          fill="none"
          stroke={splashColors.logo}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

function TrustStar() {
  const s = splashLayout.trustIconSize;
  return (
    <Svg width={s} height={s} viewBox="0 0 20 20">
      <Path d="M10 2l1.2 4.2L15 7l-3 2.5 1 4.5-3-2.8-3 2.8 1-4.5-3-2.5 3.8-.8z" fill={splashColors.trustIcon} />
    </Svg>
  );
}

function TrustRow({ fontTrust }: { fontTrust: string }) {
  return (
    <View
      className="w-full flex-row items-center justify-center"
      style={{ marginTop: splashLayout.trustTop }}
    >
      <View style={{ marginRight: splashLayout.trustTextGap }}>
        <TrustStar />
      </View>
      <Text
        style={{
          fontFamily: fontTrust,
          fontSize: splashTypography.trust.size,
          lineHeight: splashTypography.trust.lineHeight,
          letterSpacing: splashTypography.trust.letterSpacing,
          color: splashColors.bodyMuted,
        }}
      >
        Trusted by 50,000+ parents
      </Text>
    </View>
  );
}

export function SplashScreen({
  fontLogoHeadline,
  fontSubhead,
  fontTrust,
  fontButton,
}: SplashScreenProps) {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const webFrame =
    Platform.OS === "web"
      ? {
          maxWidth: splashLayout.frameMaxWidth,
          width: "100%" as const,
          alignSelf: "center" as const,
        }
      : undefined;

  const bottomPad = splashLayout.bottomBarPaddingBottom + insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: splashColors.background }}>
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]} style={[{ flex: 1 }, webFrame]}>
        <View
          className="w-full flex-1 items-center justify-center"
          style={{ paddingHorizontal: splashLayout.horizontalPadding }}
        >
          <View
            className="relative items-center justify-center"
            style={{ marginBottom: splashLayout.gapLogoToHeadline }}
          >
            <CloudMark style={{ left: -44, top: -8 }} />
            <Text
              style={{
                fontFamily: fontLogoHeadline,
                fontSize: splashTypography.logo.size,
                lineHeight: splashTypography.logo.lineHeight,
                letterSpacing: splashTypography.logo.letterSpacing,
                color: splashColors.logo,
              }}
            >
              Peeko
            </Text>
            <BabyMark style={{ right: -6, top: -22 }} />
          </View>

          <Text
            className="w-full"
            style={{
              fontFamily: fontLogoHeadline,
              fontSize: splashTypography.headline.size,
              lineHeight: splashTypography.headline.lineHeight,
              letterSpacing: splashTypography.headline.letterSpacing,
              color: splashColors.headline,
              textAlign: "center",
            }}
          >
            Baby essentials in{"\n"}30 mins
          </Text>

          <Text
            className="w-full"
            style={{
              fontFamily: fontSubhead,
              fontSize: splashTypography.subhead.size,
              lineHeight: splashTypography.subhead.lineHeight,
              letterSpacing: splashTypography.subhead.letterSpacing,
              color: splashColors.bodyMuted,
              textAlign: "center",
              marginTop: splashLayout.subheadTop,
            }}
          >
            Try, buy, instant returns
          </Text>

          <TrustRow fontTrust={fontTrust} />
        </View>

        <View
          style={{
            paddingHorizontal: splashLayout.bottomHorizontalPadding,
            paddingBottom: bottomPad,
          }}
        >
          <PrimaryPillButton
            label="Continue"
            fontFamilySemiBold={fontButton}
            onPress={() => navigation.navigate("Phone")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
