import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useOfferTimer } from "../hooks/useOfferTimer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { peekoFonts } from "../theme/fonts";
import { offerClaimColors, offerClaimShadow } from "../theme/offerClaim";
import { useLocation } from "../context/LocationContext";

const pantsImg = require("../../assets/training-pants.png");

// Icons
const IconArrowLeft = ({ color = "#006573", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill={color} />
  </Svg>
);

const IconPin = ({ color = "#006573", size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={color} />
  </Svg>
);

const IconStopwatch = ({ color = "#FFEFEE", size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0012 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill={color} />
  </Svg>
);

function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const secondsLeft = useOfferTimer();
  const { addressLine1, addressLine2 } = useLocation();

  return (
    <OnboardingFrame backgroundColor={"#EEF9FC"}>
      <View style={{ flex: 1 }}>
        {/* Top Header Urgency Banner */}
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
              paddingVertical: 10,
              paddingHorizontal: 16,
              minHeight: 42,
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
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: insets.bottom + 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Row */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
            <Pressable onPress={() => navigation.goBack()} style={{ padding: 4, marginLeft: -4, marginRight: 12 }}>
              <IconArrowLeft color="#006573" />
            </Pressable>
            <Text
              style={{
                fontFamily: peekoFonts.plusJakarta700,
                fontSize: 20,
                color: "#006573",
              }}
            >
              Review Order
            </Text>
          </View>

          {/* Your Selection header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: peekoFonts.beVietnam600,
                fontSize: 12,
                color: "rgba(0,101,115,0.7)",
                letterSpacing: 1.5,
              }}
            >
              YOUR SELECTION
            </Text>
            <Text
              style={{
                fontFamily: peekoFonts.beVietnam600,
                fontSize: 14,
                color: "#006573",
              }}
            >
              1 Item
            </Text>
          </View>

          {/* Product Card */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              ...offerClaimShadow.thumbLight,
            }}
          >
            <View
              style={{
                backgroundColor: "#DCF5FF",
                width: 88,
                height: 88,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Image source={pantsImg} style={{ width: 66, height: 66 }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: peekoFonts.plusJakarta700,
                  fontSize: 16,
                  color: "#003441",
                  marginBottom: 4,
                  lineHeight: 22,
                }}
              >
                Ultra-Soft Training Pants
              </Text>
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam500,
                  fontSize: 12,
                  color: "rgba(0,101,115,0.6)",
                  marginBottom: 10,
                }}
              >
                Personalized for 1-3 years
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: peekoFonts.plusJakarta800,
                    fontSize: 20,
                    color: "#006573",
                    marginRight: 8,
                  }}
                >
                  ₹1
                </Text>
                <Text
                  style={{
                    fontFamily: peekoFonts.beVietnam600,
                    fontSize: 12,
                    color: "rgba(0,101,115,0.4)",
                    textDecorationLine: "line-through",
                  }}
                >
                  ₹29.99
                </Text>
              </View>
            </View>
          </View>

          {/* Location Card */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: 24,
              marginBottom: 20,
              flexDirection: "row",
              ...offerClaimShadow.thumbLight,
              overflow: "hidden",
            }}
          >
            {/* Left Accent Line */}
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 24,
                bottom: 24,
                width: 4,
                backgroundColor: "#006573",
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
            
            <View style={{ marginRight: 16, marginTop: 2 }}>
              <IconPin color="#006573" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <Text
                  style={{
                    fontFamily: peekoFonts.plusJakarta700,
                    fontSize: 16,
                    color: "#003441",
                  }}
                >
                  Delivery Address
                </Text>
                <Pressable>
                  <Text
                    style={{
                      fontFamily: peekoFonts.beVietnam600,
                      fontSize: 12,
                      color: "#006573",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    CHANGE
                  </Text>
                </Pressable>
              </View>
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam500,
                  fontSize: 14,
                  lineHeight: 22,
                  color: "rgba(0,101,115,0.7)",
                }}
              >
                Home • {addressLine1}, {addressLine2.replace(/\n/g, " ")}
              </Text>
            </View>
          </View>

          {/* Order Summary Card */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              padding: 24,
              ...offerClaimShadow.thumbLight,
            }}
          >
            <Text
              style={{
                fontFamily: peekoFonts.plusJakarta700,
                fontSize: 18,
                color: "#003441",
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Order Summary
            </Text>
            
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "rgba(0,101,115,0.7)" }}>
                  Subtotal
                </Text>
                <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "#003441" }}>
                  ₹29.00
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 14, color: "#EEF9FC" }}>
                  Cute Baby offer
                </Text>
                <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 14, color: "#EEF9FC" }}>
                  -₹28.00
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "rgba(0,101,115,0.7)" }}>
                  Delivery
                </Text>
                <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 12, color: "#006573", letterSpacing: 0.5, textTransform: "uppercase" }}>
                  FREE
                </Text>
              </View>
            </View>

            <View style={{ height: 1, backgroundColor: "rgba(0,101,115,0.1)", marginVertical: 24 }} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontFamily: peekoFonts.plusJakarta700, fontSize: 16, color: "#003441" }}>
                Total Amount
              </Text>
              <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 42, color: "#003441", letterSpacing: -1.5 }}>
                ₹1.00
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Floating Area */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: Math.max(insets.bottom, 24),
            paddingHorizontal: 32,
            paddingTop: 32,
          }}
        >
          <LinearGradient
            colors={["rgba(238,249,252,0)", "rgba(238,249,252,0.9)", "#EEF9FC"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            }}
            pointerEvents="none"
          />
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: 9999,
              padding: 8,
              ...offerClaimShadow.heroCardOuter,
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("PaymentSuccess" as any)}
              style={{
                backgroundColor: "#006573",
                borderRadius: 9999,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 18,
                gap: 12,
              }}
            >
              <View style={{ backgroundColor: "#FFFFFF", borderRadius: 12, width: 20, height: 20, alignItems: "center", justifyContent: "center" }}>
                 <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#006573" />
                  </Svg>
              </View>
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam600,
                  fontSize: 18,
                  color: "#FFFFFF",
                }}
              >
                Place Order • ₹1.00
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </OnboardingFrame>
  );
}
