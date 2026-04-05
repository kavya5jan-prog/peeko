import React from "react";
import { View, Text, ScrollView, Pressable, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingFrame } from "../components/OnboardingFrame";
import { peekoFonts } from "../theme/fonts";
import { offerClaimShadow } from "../theme/offerClaim";

const AnimatedCheckIcon = ({ color = "#006573", size = 64 }) => {
  const circleScale = React.useRef(new Animated.Value(0)).current;
  const tickScale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.stagger(80, [
      Animated.spring(circleScale, {
        toValue: 1,
        tension: 140,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(tickScale, {
        toValue: 1,
        tension: 180,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [circleScale, tickScale]);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{ position: "absolute", transform: [{ scale: circleScale }] }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" fill="#DCF5FF" />
        </Svg>
      </Animated.View>
      <Animated.View style={{ position: "absolute", transform: [{ scale: tickScale }] }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill={color} />
        </Svg>
      </Animated.View>
    </View>
  );
};

export function PaymentSuccessScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <OnboardingFrame backgroundColor={"#EEF9FC"}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: insets.top + 60,
            paddingBottom: insets.bottom + 140,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <AnimatedCheckIcon size={80} />
          
          <Text
            style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: 28,
              color: "#006573",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 12,
            }}
          >
            Order Placed!
          </Text>

          <Text
            style={{
              fontFamily: peekoFonts.beVietnam500,
              fontSize: 16,
              color: "rgba(0,101,115,0.7)",
              textAlign: "center",
              lineHeight: 24,
              paddingHorizontal: 16,
            }}
          >
            Your payment was successful and your personalized training pants are now being prepared.
          </Text>

          <View style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: 24,
            marginTop: 32,
            width: "100%",
            ...offerClaimShadow.thumbLight
          }}>
            <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 14, color: "rgba(0,101,115,0.7)", marginBottom: 16 }}>
              ORDER DETAILS
            </Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
              <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "#003441" }}>Order Number</Text>
              <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 14, color: "#006573" }}>#PK-84920</Text>
            </View>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
              <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "#003441" }}>Amount Paid</Text>
              <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 14, color: "#006573" }}>₹1.00</Text>
            </View>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "#003441" }}>Estimated Delivery</Text>
              <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 14, color: "#006573" }}>60 mins</Text>
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
              onPress={() => navigation.navigate("Home")}
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
              <Text
                style={{
                  fontFamily: peekoFonts.beVietnam600,
                  fontSize: 18,
                  color: "#FFFFFF",
                }}
              >
                Continue Browsing
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </OnboardingFrame>
  );
}
