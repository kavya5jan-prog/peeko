import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { OnboardingTopBar } from "../components/OnboardingTopBar";
import { PrimaryPillButton } from "../components/PrimaryPillButton";
import type { RootStackParamList } from "../navigation/types";
import { peekoFonts } from "../theme/fonts";
import {
  onboardingColors,
  onboardingLayout,
  onboardingTypography,
} from "../theme/onboarding";

type Nav = NativeStackNavigationProp<RootStackParamList, "Surprise">;

function TinyDot({ style }: { style?: object }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#A5E7F5",
        },
        style,
      ]}
    />
  );
}

export function SurpriseScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const boxShake = useRef(new Animated.Value(0)).current;
  const lidLift = useRef(new Animated.Value(0)).current;
  const confettiBurst = useRef(new Animated.Value(0)).current;
  const pantsReveal = useRef(new Animated.Value(0)).current;
  const priceReveal = useRef(new Animated.Value(0)).current;
  const bottomPad = Math.max(insets.bottom, 16) + 24;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(180),
      Animated.parallel([
        Animated.sequence([
          Animated.timing(boxShake, {
            toValue: -1,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.timing(boxShake, {
            toValue: 1,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.timing(boxShake, {
            toValue: -1,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.timing(boxShake, {
            toValue: 1,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.timing(boxShake, {
            toValue: 0,
            duration: 70,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(lidLift, {
          toValue: 1,
          duration: 520,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(confettiBurst, {
          toValue: 1,
          duration: 460,
          useNativeDriver: true,
        }),
        Animated.timing(pantsReveal, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(priceReveal, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [boxShake, lidLift, confettiBurst, pantsReveal, priceReveal]);

  const lidTranslateY = lidLift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -78],
  });

  const lidRotate = lidLift.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-9deg"],
  });

  const boxTranslateX = boxShake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-7, 7],
  });

  const revealScale = pantsReveal.interpolate({
    inputRange: [0, 1],
    outputRange: [0.78, 1],
  });

  const priceScale = priceReveal.interpolate({
    inputRange: [0, 1],
    outputRange: [0.84, 1],
  });

  const baseConfettiPieces = [
    { x: -118, y: -74, size: 8, color: "#50E1F9" },
    { x: -92, y: -106, size: 10, color: "#7DDEFF" },
    { x: -64, y: -84, size: 7, color: "#83B1FF" },
    { x: -42, y: -118, size: 9, color: "#50E1F9" },
    { x: -12, y: -90, size: 8, color: "#90E8FF" },
    { x: 20, y: -116, size: 10, color: "#7DDEFF" },
    { x: 48, y: -84, size: 7, color: "#83B1FF" },
    { x: 74, y: -112, size: 9, color: "#50E1F9" },
    { x: 96, y: -72, size: 8, color: "#9AEFFF" },
    { x: 114, y: -96, size: 10, color: "#7DDEFF" },
    { x: -24, y: -132, size: 7, color: "#83B1FF" },
    { x: 36, y: -138, size: 9, color: "#50E1F9" },
  ] as const;

  // 10x confetti density: current UI uses 12 base pieces, so we expand to 120.
  const confettiPieces = Array.from({ length: baseConfettiPieces.length * 10 }).map((_, i) => {
    const p = baseConfettiPieces[i % baseConfettiPieces.length];
    const variant = Math.floor(i / baseConfettiPieces.length); // 0..9

    // Jitter spreads slightly while keeping the same overall burst direction.
    const jitterX = (variant - 4.5) * 3 + ((i % 7) - 3) * 1.25;
    const jitterY = (variant - 4.5) * 5 + (((i + 2) % 9) - 4) * 1.5;
    const sizeJitter = ((i % 5) - 2) * 0.7;

    return {
      x: p.x + jitterX,
      y: p.y + jitterY,
      size: Math.max(4, p.size + sizeJitter),
      color: p.color,
    };
  });

  return (
    <OnboardingFrame backgroundColor={onboardingColors.screenBackground}>
      <View style={{ flex: 1 }}>
        <OnboardingTopBar
          right={
            <Pressable
              hitSlop={12}
              onPress={() => navigation.navigate("Home")}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text
                style={{
                  color: onboardingColors.link,
                  fontSize: 24,
                  lineHeight: 26,
                  fontFamily: peekoFonts.plusJakarta500,
                }}
              >
                ✕
              </Text>
            </Pressable>
          }
        />

        <View
          style={{
            flex: 1,
            paddingHorizontal: onboardingLayout.horizontalPadding,
            paddingTop: onboardingLayout.gapHeaderToTitle,
          }}
        >
          <Text
            style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: onboardingTypography.screenTitle.size,
              lineHeight: onboardingTypography.screenTitle.lineHeight,
              letterSpacing: onboardingTypography.screenTitle.letterSpacing,
              color: onboardingColors.headline,
              textAlign: "center",
              maxWidth: 320,
              alignSelf: "center",
            }}
          >
            Surprise for your little one!
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontFamily: peekoFonts.beVietnam500,
              fontSize: onboardingTypography.screenSubtitle.size + 1,
              lineHeight: onboardingTypography.screenSubtitle.lineHeight + 2,
              color: onboardingColors.body,
              textAlign: "center",
              maxWidth: 320,
              alignSelf: "center",
            }}
          >
            Something special is waiting inside for you.
          </Text>

          <View
            style={{
              marginTop: onboardingLayout.surpriseHeroTop,
              height: onboardingLayout.surpriseGiftHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TinyDot style={{ top: 18, left: 8 }} />
            <TinyDot style={{ top: 92, right: 12 }} />
            <TinyDot style={{ bottom: 6, left: 24 }} />

            {confettiPieces.map((piece, index) => (
              <Animated.View
                key={`${piece.x}-${piece.y}-${index}`}
                style={{
                  position: "absolute",
                  zIndex: 6,
                  top: 132,
                  left: 145,
                  width: piece.size,
                  height: piece.size,
                  borderRadius: piece.size / 2,
                  backgroundColor: piece.color,
                  opacity: confettiBurst.interpolate({
                    inputRange: [0, 0.2, 1],
                    outputRange: [0, 1, 0.85],
                  }),
                  transform: [
                    {
                      translateX: confettiBurst.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, piece.x],
                      }),
                    },
                    {
                      translateY: confettiBurst.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, piece.y],
                      }),
                    },
                    {
                      scale: confettiBurst.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                  ],
                }}
              />
            ))}

            <Animated.View
              style={{
                opacity: priceReveal,
                transform: [{ translateY: -20 }, { scale: priceScale }],
                position: "absolute",
                top: 26,
                right: 36,
                zIndex: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.72)",
                  borderRadius: 30,
                  padding: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: onboardingColors.surprisePriceBg,
                    borderRadius: 24,
                    paddingHorizontal: 22,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: peekoFonts.beVietnam600,
                      fontSize: 20,
                      lineHeight: 24,
                      color: onboardingColors.headline,
                    }}
                  >
                    ₹1.00
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View
              style={{
                opacity: pantsReveal,
                transform: [{ translateY: -10 }, { scale: revealScale }],
                position: "absolute",
                zIndex: 7,
                top: 84,
              }}
            >
              <View
                style={{
                  width: 212,
                  height: 220,
                  borderRadius: 34,
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#003441",
                  shadowOpacity: 0.12,
                  shadowOffset: { width: 0, height: 12 },
                  shadowRadius: 18,
                  elevation: 6,
                }}
              >
                <View
                  style={{
                    width: Math.round(123 * 1.33),
                    height: Math.round(112 * 1.33),
                    borderRadius: Math.round(44 * 1.33),
                    overflow: "hidden",
                    marginTop: Math.round(-27 * 1.33),
                  }}
                >
                  <Image
                    source={require("../../assets/training-pants.png")}
                    resizeMode="contain"
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 16,
                    backgroundColor: onboardingColors.surpriseGiftBase,
                    borderRadius: 18,
                    paddingHorizontal: 22,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#CBF7FF",
                      fontFamily: peekoFonts.beVietnam600,
                      letterSpacing: 0.8,
                    }}
                  >
                    TRAINING PANTS
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View
              style={{
                position: "absolute",
                top: 58,
                zIndex: 9,
                width: 240,
                height: 64,
                borderRadius: 12,
                backgroundColor: "#8DBECC",
                transform: [{ translateX: boxTranslateX }, { translateY: lidTranslateY }, { rotate: lidRotate }],
              }}
            />

            <Animated.View
              style={{
                position: "absolute",
                top: 108,
                width: 250,
                height: 170,
                borderRadius: 26,
                backgroundColor: onboardingColors.surpriseGiftBase,
                overflow: "hidden",
                transform: [{ translateX: boxTranslateX }],
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 107,
                  top: 0,
                  width: 36,
                  height: 170,
                  backgroundColor: onboardingColors.surpriseGiftStripe,
                }}
              />
            </Animated.View>
          </View>

          <View
            style={{
              marginTop: onboardingLayout.surpriseInfoCardTop,
              backgroundColor: onboardingColors.surpriseCardBg,
              borderRadius: onboardingLayout.surpriseInfoCardRadius,
              paddingHorizontal: onboardingLayout.surpriseInfoCardPadding,
              paddingVertical: onboardingLayout.surpriseInfoCardPadding - 2,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: onboardingColors.surpriseTagBg,
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  fontFamily: peekoFonts.plusJakarta500,
                  fontSize: 14,
                  lineHeight: 16,
                  letterSpacing: 0.8,
                  color: onboardingColors.link,
                }}
              >
                EXCLUSIVE OFFER
              </Text>
            </View>
            <Text
              style={{
                marginTop: 14,
                fontFamily: peekoFonts.beVietnam500,
                fontSize: Math.round(onboardingTypography.screenSubtitle.size * 0.9),
                lineHeight: Math.round(onboardingTypography.screenSubtitle.lineHeight * 0.9),
                color: onboardingColors.body,
                textAlign: "center",
              }}
            >
              A special gift to start your journey with Peeko. Premium comfort for
              your baby, at a price that makes you smile.
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: onboardingLayout.bottomHorizontalPadding,
            paddingBottom: bottomPad,
          }}
        >
          <PrimaryPillButton
            label="Claim My ₹1 Offer"
            trailing=""
            fontFamilySemiBold={peekoFonts.beVietnam600}
            onPress={() => navigation.navigate("OfferClaim")}
          />
        </View>
      </View>
    </OnboardingFrame>
  );
}
