import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useOfferTimer } from "../hooks/useOfferTimer";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { PrimaryPillButton } from "../components/PrimaryPillButton";
import { peekoFonts } from "../theme/fonts";
import {
  offerClaimColors,
  offerClaimLayout,
  offerClaimShadow,
  offerClaimTypography,
} from "../theme/offerClaim";

const heroPants = require("../../assets/offer/hero-training-pants.png");
const imgPotty = require("../../assets/offer/potty.png");
const imgStepStool = require("../../assets/offer/step-stool.png");
const imgPlates = require("../../assets/offer/plates.png");
const imgFeedingBowls = require("../../assets/offer/feeding-bowls.png");
const iconCart = require("../../assets/offer/icon-cart.png");
const iconStar = require("../../assets/offer/icon-star.png");
const iconStopwatch = require("../../assets/offer/icon-stopwatch.png");
const iconChevron = require("../../assets/offer/icon-chevron.png");
const iconArrowRight = require("../../assets/offer/icon-arrow-right.png");

function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OfferClaimScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const secondsLeft = useOfferTimer();

  const bottomBarReserve = 120 + insets.bottom;

  return (
    <OnboardingFrame backgroundColor={offerClaimColors.screenBg}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: offerClaimColors.urgencyRed,
            paddingTop: insets.top,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 6,
              paddingHorizontal: 16,
              minHeight: 32,
            }}
          >

            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam600,
                  fontSize: 10,
                  lineHeight: 15,
                  letterSpacing: 1.5,
                  color: offerClaimColors.urgencyText,
                  textTransform: "uppercase",
                }}
              >
                Offer expires in{" "}
              </Text>
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam600,
                  fontSize: 12,
                  lineHeight: 16,
                  color: offerClaimColors.urgencyText,
                }}
              >
                {formatCountdown(secondsLeft)}
              </Text>
            </View>

            <Pressable
              hitSlop={12}
              onPress={() => navigation.navigate("Home" as never)}
              style={{ position: "absolute", right: 16 }}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text
                style={{
                  color: offerClaimColors.urgencyText,
                  fontSize: 20,
                  fontFamily: peekoFonts.plusJakarta500,
                }}
              >
                ✕
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: offerClaimLayout.horizontalPadding,
            paddingTop: offerClaimLayout.welcomeTopPadding,
            paddingBottom: bottomBarReserve,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: offerClaimLayout.sectionGap }}>
            <View style={{ gap: offerClaimLayout.welcomeTitleToSubtitle }}>
              <Text
                style={{
                  fontFamily: peekoFonts.plusJakarta800,
                  fontSize: offerClaimTypography.welcomeTitle.size,
                  lineHeight: offerClaimTypography.welcomeTitle.lineHeight,
                  letterSpacing: offerClaimTypography.welcomeTitle.letterSpacing,
                  color: offerClaimColors.headline,
                  textAlign: "center",
                }}
              >
                Flat 96% off
              </Text>
            </View>

            <View
              style={{
                borderRadius: offerClaimLayout.heroCardRadius,
                backgroundColor: "#FFFFFF",
                ...offerClaimShadow.heroCardOuter,
              }}
            >
              <View
                style={{
                  borderRadius: offerClaimLayout.heroCardRadius,
                  borderWidth: 2,
                  borderColor: offerClaimColors.cardBorder,
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <View
                  style={{
                    backgroundColor: offerClaimColors.productImageBg,
                    overflow: "hidden",
                  }}
                >
                  <LinearGradient
                    colors={["rgba(0,101,115,0.1)", "rgba(0,101,115,0)"]}
                    start={{ x: 0.2, y: 0.8 }}
                    end={{ x: 0.9, y: 0.1 }}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  />
                  <View
                    style={{
                      height: offerClaimLayout.heroImageHeight,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 32,
                    }}
                  >
                    <Image
                      source={heroPants}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        position: "absolute",
                        left: 16,
                        top: 16,
                        backgroundColor: offerClaimColors.urgencyRed,
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        borderRadius: 9999,
                        ...offerClaimShadow.checkoutButton,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: peekoFonts.beVietnam600,
                          fontSize: 12,
                          lineHeight: 16,
                          color: offerClaimColors.urgencyText,
                        }}
                      >
                        96% OFF
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ padding: 20, position: "relative" }}>
                  <View style={{ position: "absolute", right: 16, top: 16, zIndex: 2 }}>
                    <Image source={iconStar} style={{ width: 20, height: 19 }} resizeMode="contain" />
                  </View>

                  <Text
                    style={{
                      fontFamily: peekoFonts.beVietnam600,
                      fontSize: offerClaimTypography.exclusiveLabel.size,
                      lineHeight: offerClaimTypography.exclusiveLabel.lineHeight,
                      letterSpacing: offerClaimTypography.exclusiveLabel.letterSpacing,
                      color: offerClaimColors.link,
                      textTransform: "uppercase",
                      paddingBottom: 4,
                    }}
                  >
                    First Purchase Exclusive
                  </Text>

                  <Text
                    style={{
                      fontFamily: peekoFonts.plusJakarta800,
                      fontSize: offerClaimTypography.productTitle.size,
                      lineHeight: offerClaimTypography.productTitle.lineHeight,
                      letterSpacing: offerClaimTypography.productTitle.letterSpacing,
                      color: offerClaimColors.headline,
                      textTransform: "uppercase",
                      paddingBottom: 8,
                    }}
                  >
                    Ultra-Soft Training{"\n"}Pants
                  </Text>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingBottom: 8 }}>
                    <View
                      style={{
                        backgroundColor: offerClaimColors.sizeChipBg,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: peekoFonts.beVietnam600,
                          fontSize: 10,
                          lineHeight: 15,
                          color: offerClaimColors.body,
                        }}
                      >
                        SIZE 4
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: peekoFonts.beVietnam500,
                        fontSize: 12,
                        lineHeight: 16,
                        color: "rgba(46,98,115,0.6)",
                      }}
                    >
                      1-3 Years old
                    </Text>
                  </View>

                  <View style={{ height: 64, marginBottom: 20, position: "relative" }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-end", position: "absolute", left: 0, top: 0 }}>
                      <Text
                        style={{
                          fontFamily: peekoFonts.beVietnam600,
                          fontSize: 24,
                          lineHeight: 32,
                          color: offerClaimColors.headline,
                          paddingTop: 8,
                        }}
                      >
                        ₹
                      </Text>
                      <Text
                        style={{
                          fontFamily: peekoFonts.beVietnam600,
                          fontSize: 64,
                          lineHeight: 64,
                          letterSpacing: -3.6,
                          color: offerClaimColors.headline,
                        }}
                      >
                        1
                      </Text>
                    </View>
                    <View style={{ position: "absolute", left: 54, top: 13 }}>
                      <Text
                        style={{
                          fontFamily: peekoFonts.beVietnam600,
                          fontSize: 14,
                          lineHeight: 22,
                          color: offerClaimColors.strikethrough,
                          textDecorationLine: "line-through",
                        }}
                      >
                        ₹29.99
                      </Text>
                      <Text
                        style={{
                          fontFamily: peekoFonts.beVietnam600,
                          fontSize: 10,
                          lineHeight: 15,
                          letterSpacing: 0.5,
                          color: offerClaimColors.urgencyRed,
                          textTransform: "uppercase",
                          marginTop: 2,
                        }}
                      >
                        LIMITED TIME ONLY
                      </Text>
                    </View>
                  </View>

                  <PrimaryPillButton
                    label="Claim My ₹1 Offer"
                    trailing=""
                    leading={
                      <Image
                        source={iconCart}
                        style={{ width: 18, height: 16 }}
                        resizeMode="contain"
                      />
                    }
                    fontFamilySemiBold={peekoFonts.beVietnam600}
                    onPress={() => navigation.navigate("Checkout" as never)}
                  />
                </View>
              </View>
            </View>

            <View style={{ gap: offerClaimLayout.widgetGap }}>
              <View
                style={{
                  backgroundColor: offerClaimColors.widgetBg,
                  borderRadius: offerClaimLayout.widgetRadius,
                  minHeight: 196,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: offerClaimLayout.widgetPaddingH,
                  paddingRight: 20,
                  paddingVertical: offerClaimLayout.widgetPaddingV,
                }}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={{
                      fontFamily: peekoFonts.plusJakarta700,
                      fontSize: 18,
                      lineHeight: 28,
                      color: offerClaimColors.headline,
                    }}
                  >
                    Potty Training
                  </Text>
                  <Text
                    style={{
                      fontFamily: peekoFonts.beVietnam400,
                      fontSize: 14,
                      lineHeight: 20,
                      color: offerClaimColors.widgetBody,
                    }}
                  >
                    Milestone readiness essentials
                  </Text>
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingTop: 12 }}
                    onPress={() => {}}
                    accessibilityRole="button"
                    accessibilityLabel="Explore potty training essentials"
                  >
                    <Text
                      style={{
                        fontFamily: peekoFonts.beVietnam600,
                        fontSize: 14,
                        lineHeight: 20,
                        letterSpacing: -0.35,
                        color: offerClaimColors.link,
                      }}
                    >
                      Explore essentials
                    </Text>
                    <Image source={iconChevron} style={{ width: 10, height: 10 }} resizeMode="contain" />
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: 140, height: 110 }}>
                  <View style={{ marginRight: -46 }}>
                    <View style={{ transform: [{ rotate: "-6deg" }] }}>
                      <View
                        style={{
                          width: offerClaimLayout.thumbSize,
                          height: offerClaimLayout.thumbSize,
                          borderRadius: offerClaimLayout.thumbRadius,
                          backgroundColor: "#FFFFFF",
                          padding: 12,
                          ...offerClaimShadow.thumbLight,
                        }}
                      >
                        <Image source={imgPotty} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginLeft: -20 }}>
                    <View style={{ transform: [{ rotate: "12deg" }] }}>
                      <View
                        style={{
                          width: offerClaimLayout.thumbSize,
                          height: offerClaimLayout.thumbSize,
                          borderRadius: offerClaimLayout.thumbRadius,
                          backgroundColor: "#FFFFFF",
                          padding: 12,
                          ...offerClaimShadow.thumb,
                        }}
                      >
                        <Image source={imgStepStool} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: offerClaimColors.widgetBg,
                  borderRadius: offerClaimLayout.widgetRadius,
                  minHeight: 184,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: offerClaimLayout.widgetPaddingH,
                  paddingRight: 22,
                  paddingVertical: offerClaimLayout.widgetPaddingV,
                }}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={{
                      fontFamily: peekoFonts.plusJakarta700,
                      fontSize: 18,
                      lineHeight: 28,
                      color: offerClaimColors.headline,
                    }}
                  >
                    Feeding &{"\n"}Mealtime
                  </Text>
                  <Text
                    style={{
                      fontFamily: peekoFonts.beVietnam400,
                      fontSize: 14,
                      lineHeight: 20,
                      color: offerClaimColors.widgetBody,
                    }}
                  >
                    Self-feeding made delightful
                  </Text>
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingTop: 12 }}
                    onPress={() => {}}
                    accessibilityRole="button"
                    accessibilityLabel="Shop feeding and mealtime"
                  >
                    <Text
                      style={{
                        fontFamily: peekoFonts.beVietnam600,
                        fontSize: 14,
                        lineHeight: 20,
                        letterSpacing: -0.35,
                        color: offerClaimColors.link,
                      }}
                    >
                      Shop now
                    </Text>
                    <Image source={iconChevron} style={{ width: 10, height: 10 }} resizeMode="contain" />
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: 140, height: 110 }}>
                  <View style={{ marginRight: -32 }}>
                    <View style={{ transform: [{ rotate: "-3deg" }] }}>
                      <View
                        style={{
                          width: offerClaimLayout.thumbSize,
                          height: offerClaimLayout.thumbSize,
                          borderRadius: offerClaimLayout.thumbRadius,
                          backgroundColor: "#FFFFFF",
                          padding: 12,
                          ...offerClaimShadow.thumbLight,
                        }}
                      >
                        <Image source={imgPlates} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginLeft: -20 }}>
                    <View style={{ transform: [{ rotate: "6deg" }] }}>
                      <View
                        style={{
                          width: offerClaimLayout.thumbSize,
                          height: offerClaimLayout.thumbSize,
                          borderRadius: offerClaimLayout.thumbRadius,
                          backgroundColor: "#FFFFFF",
                          padding: 12,
                          ...offerClaimShadow.thumb,
                        }}
                      >
                        <Image source={imgFeedingBowls} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: offerClaimColors.bottomBarBg,
            paddingTop: 12,
            paddingBottom: Math.max(insets.bottom, 16),
            paddingHorizontal: offerClaimLayout.horizontalPadding,
            ...offerClaimShadow.bottomBar,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <View>
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam600,
                  fontSize: 12,
                  lineHeight: 16,
                  letterSpacing: 0.6,
                  color: offerClaimColors.mutedCaption,
                  textTransform: "uppercase",
                }}
              >
                Cart Total
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                <Text
                  style={{
                    fontFamily: peekoFonts.beVietnam600,
                    fontSize: 24,
                    lineHeight: 32,
                    color: offerClaimColors.headline,
                  }}
                >
                  ₹1.00
                </Text>
                <View
                  style={{
                    backgroundColor: offerClaimColors.cartBadgeBg,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: peekoFonts.beVietnam600,
                      fontSize: 10,
                      lineHeight: 15,
                      color: offerClaimColors.link,
                    }}
                  >
                    1 ITEM
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => navigation.navigate("Checkout" as never)}
              accessibilityRole="button"
              accessibilityLabel="Proceed to checkout"
              style={{
                flex: 1,
                maxWidth: 240,
                backgroundColor: offerClaimColors.checkoutSolid,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: offerClaimColors.checkoutBorder,
                paddingVertical: 14,
                paddingLeft: 20,
                paddingRight: 6,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                ...offerClaimShadow.checkoutButton,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: peekoFonts.beVietnam600,
                    fontSize: 16,
                    lineHeight: 24,
                    color: offerClaimColors.onPrimarySoft,
                    textAlign: "center",
                  }}
                >
                  Proceed to
                </Text>
                <Text
                  style={{
                    fontFamily: peekoFonts.beVietnam600,
                    fontSize: 16,
                    lineHeight: 24,
                    color: offerClaimColors.onPrimarySoft,
                    textAlign: "center",
                  }}
                >
                  Checkout
                </Text>
              </View>
              <Image
                source={iconArrowRight}
                style={{ width: 16, height: 12 }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </OnboardingFrame>
  );
}
