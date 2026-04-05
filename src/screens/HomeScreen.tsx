import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Pressable, Platform, Dimensions, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { peekoFonts } from "../theme/fonts";
import { offerClaimShadow } from "../theme/offerClaim";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useLocation } from "../context/LocationContext";
// --- Icons ---
const IconLocation = ({ color = "#006573", size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={color} />
  </Svg>
);

const IconChevronDown = ({ color = "#006573", size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 10l5 5 5-5z" fill={color} />
  </Svg>
);

const IconChevronRight = ({ color = "#FFFFFF", size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

const IconHome = ({ color = "#006573", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Path d="M9 22V12h6v10" />
  </Svg>
);

const IconGrid = ({ color = "#8CCFCF", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="3" width="7" height="7" />
    <Rect x="14" y="3" width="7" height="7" />
    <Rect x="14" y="14" width="7" height="7" />
    <Rect x="3" y="14" width="7" height="7" />
  </Svg>
);

const IconList = ({ color = "#8CCFCF", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 6h13" />
    <Path d="M8 12h13" />
    <Path d="M8 18h13" />
    <Path d="M3 6h.01" />
    <Path d="M3 12h.01" />
    <Path d="M3 18h.01" />
  </Svg>
);

const IconUser = ({ color = "#8CCFCF", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

const IconGiftSurprise = ({ size = 120 }) => (
  <View style={{
    width: size, height: size, backgroundColor: "#006573", borderRadius: 32, alignItems: "center", justifyContent: "center", overflow: "hidden"
  }}>
    <View style={{ position: "absolute", top: 0, bottom: 0, width: 24, backgroundColor: "rgba(255,255,255,0.15)" }} />
    <View style={{ position: "absolute", left: 0, right: 0, height: 24, backgroundColor: "rgba(255,255,255,0.15)" }} />

    <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="8" width="18" height="4" rx="1" />
      <Path d="M12 8v13" />
      <Path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <Path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </Svg>
  </View>
);



let hasShownInterstitialThisSession = false;

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"For You" | "All Categories">("For You");
  const [showInterstitial, setShowInterstitial] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addressLine1 } = useLocation();

  useEffect(() => {
    if (!hasShownInterstitialThisSession) {
      const timer = setTimeout(() => {
        setShowInterstitial(true);
        hasShownInterstitialThisSession = true;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const renderCategoryCard = (title: string, imageSource: any) => (
    <View style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 11,
      alignItems: "center",
      justifyContent: "center",
      width: "48%",
      marginBottom: 16,
      aspectRatio: 0.93,
      ...offerClaimShadow.thumbLight
    }}>
      <View style={{
        backgroundColor: "#FFFFFF", // Use FFFFFF per user requirement
        borderRadius: 999,
        width: 96,
        height: 96,
        marginBottom: 16,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Image source={imageSource} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      </View>
      <Text style={{
        fontFamily: peekoFonts.plusJakarta700,
        fontSize: 14,
        color: "#003441",
        textAlign: "center",
        lineHeight: 18,
      }}>
        {title}
      </Text>
    </View>
  );

  const renderSquareCategoryCard = (title: string, imageSource: any) => (
    <View style={{
      borderRadius: 24,
      overflow: "hidden",
      width: "48%",
      aspectRatio: 1,
      marginBottom: 16,
    }}>
      <Image source={imageSource} style={{ width: "100%", height: "100%", position: "absolute" }} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(0,52,65,0.7)"]}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%" }}
      />
      <View style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
        <Text style={{
          fontFamily: peekoFonts.plusJakarta800,
          fontSize: 14,
          color: "#FFFFFF",
        }}>
          {title}
        </Text>
      </View>
    </View>
  );

  const renderAllCategoriesContent = () => (
    <View style={{ paddingBottom: 32 }}>
      {/* Big Hero Card */}
      <View style={{
        borderRadius: 24,
        overflow: "hidden",
        width: "100%",
        aspectRatio: 1,
        marginBottom: 16,
      }}>
        <Image source={require("../../assets/home/all_cat_main.png")} style={{ width: "100%", height: "100%", position: "absolute" }} resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(0,52,65,0.8)"]}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%" }}
        />
        <View style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
          <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 24, color: "#FFFFFF", marginBottom: 4 }}>
            Diapering
          </Text>
          <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
            Essentials for dry & happy days
          </Text>
        </View>
      </View>

      {/* Grid 1 */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 }}>
        {renderSquareCategoryCard("Feeding", require("../../assets/home/all_cat_feeding.png"))}
        {renderSquareCategoryCard("Bath & Care", require("../../assets/home/all_cat_bath.png"))}
        {renderSquareCategoryCard("Clothing", require("../../assets/home/all_cat_toys.png"))}
        {renderSquareCategoryCard("Toys", require("../../assets/home/all_cat_clothing.png"))}
      </View>

      {/* Maternity Banner */}
      <View style={{
        borderRadius: 24,
        overflow: "hidden",
        width: "100%",
        height: 120,
        marginBottom: 16,
      }}>
        <Image source={require("../../assets/home/all_cat_maternity.png")} style={{ width: "100%", height: "100%", position: "absolute" }} resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(0,52,65,0.7)"]}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%" }}
        />
        <View style={{ position: "absolute", bottom: 0, top: 0, left: 24, right: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 20, color: "#FFFFFF" }}>
            Maternity Care
          </Text>
          <IconChevronRight color="#FFFFFF" size={20} />
        </View>
      </View>

      {/* Grid 2 */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 }}>
        {renderSquareCategoryCard("School", require("../../assets/home/all_cat_school.png"))}
        {renderSquareCategoryCard("Nursery", require("../../assets/home/all_cat_nursery.png"))}
        {renderSquareCategoryCard("Health", require("../../assets/home/all_cat_health.png"))}
        {renderSquareCategoryCard("Gear", require("../../assets/home/all_cat_gear.png"))}
      </View>

      {/* Bottom Kit Card */}
      <View style={{
        backgroundColor: "#006573",
        borderRadius: 24,
        padding: 32,
        marginBottom: 16,
        overflow: "hidden"
      }}>
        <View style={{ position: "absolute", right: -40, bottom: -40, opacity: 0.1 }}>
          {/* Soft decorative shapes */}
          <Svg width="200" height="200" viewBox="0 0 100 100">
            <Path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#FFFFFF" />
          </Svg>
        </View>
        <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 10, color: "rgba(255,255,255,0.8)", letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>
          Newborn Essentials
        </Text>
        <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 28, color: "#FFFFFF", marginBottom: 24, lineHeight: 34 }}>
          Curated{"\n"}starter kits{"\n"}for new{"\n"}parents.
        </Text>
        <Pressable style={{
          backgroundColor: "#FFFFFF",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 999,
          alignSelf: "flex-start"
        }}>
          <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 14, color: "#006573" }}>
            Explore Kits
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#EEF9FC" }}>
      {/* Sticky Header */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
        paddingBottom: 16,
        backgroundColor: "#EEF9FC",
        zIndex: 10
      }}>
        <View>
          <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 10, color: "rgba(0,101,115,0.7)", letterSpacing: 0.5, marginBottom: 2 }}>
            DELIVER TO
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconLocation size={16} />
            <Text style={{ fontFamily: peekoFonts.plusJakarta700, fontSize: 14, color: "#003441", marginLeft: 4, marginRight: 2 }}>
              {addressLine1}
            </Text>
            <IconChevronDown size={14} />
          </View>
        </View>
        <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 24, color: "#006573" }}>
          Peeko
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: insets.bottom + 120, // space for bottom nav
          paddingHorizontal: 24,
        }}
      >
        {/* Tab Control */}
        <View style={{
          flexDirection: "row",
          backgroundColor: "#DCF5FF",
          borderRadius: 999,
          padding: 6,
          marginBottom: 32,
        }}>
          <Pressable
            onPress={() => setActiveTab("For You")}
            style={{
              flex: 1,
              backgroundColor: activeTab === "For You" ? "#006573" : "transparent",
              borderRadius: 999,
              paddingVertical: 14,
              alignItems: "center"
            }}
          >
            <Text style={{
              fontFamily: peekoFonts.plusJakarta700,
              fontSize: 14,
              color: activeTab === "For You" ? "#FFFFFF" : "#006573"
            }}>
              For You
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("All Categories")}
            style={{
              flex: 1,
              backgroundColor: activeTab === "All Categories" ? "#006573" : "transparent",
              borderRadius: 999,
              paddingVertical: 14,
              alignItems: "center"
            }}
          >
            <Text style={{
              fontFamily: peekoFonts.plusJakarta700,
              fontSize: 14,
              color: activeTab === "All Categories" ? "#FFFFFF" : "#006573"
            }}>
              All Categories
            </Text>
          </Pressable>
        </View>

        {activeTab === "For You" ? (
          <>
            {/* Hero Banner */}
            <View style={{
              backgroundColor: "#A8D8D8",
              borderRadius: 24,
              height: 280,
              overflow: "hidden",
              marginBottom: 32,
            }}>
              <Image
                source={require("../../assets/home/hero_growing.png")}
                style={{ width: "100%", height: "100%", position: "absolute" }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,52,65,0.8)"]}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%" }}
              />
              <View style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <View style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  alignSelf: "flex-start",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 999,
                  marginBottom: 10
                }}>
                  <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 10, color: "#FFFFFF", letterSpacing: 0.5 }}>
                    1-3 YEARS
                  </Text>
                </View>
                <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 28, color: "#FFFFFF", marginBottom: 8 }}>
                  Growing & Learning
                </Text>
                <Text style={{ fontFamily: peekoFonts.beVietnam500, fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 20 }}>
                  Tailored essentials for your toddler's journey.
                </Text>
              </View>
            </View>

            {/* Essentials Section */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
              <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 20, color: "#003441" }}>
                Essentials
              </Text>
              <Pressable onPress={() => setActiveTab("All Categories")}>
                <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 12, color: "#006573", letterSpacing: 0.5, paddingBottom: 2 }}>
                  VIEW ALL
                </Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 32 }}>
              {renderCategoryCard("Diapering &\nPotty", require("../../assets/home/all_cat_main.png"))}
              {renderCategoryCard("Feeding", require("../../assets/home/all_cat_feeding.png"))}
              {renderCategoryCard("Toys &\nLearning", require("../../assets/home/all_cat_clothing.png"))}
              {renderCategoryCard("Clothing", require("../../assets/home/all_cat_toys.png"))}
            </View>

            {/* More for Explorers */}
            <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 20, color: "#003441", marginBottom: 16 }}>
              More for Explorers
            </Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              {/* Bath & Skincare */}
              <View style={{
                flex: 1,
                backgroundColor: "#DCF5FF",
                borderRadius: 24,
                padding: 20,
                ...offerClaimShadow.thumbLight
              }}>
                <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, width: 64, height: 64, alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Image source={require("../../assets/home/bath_icon.png")} style={{ width: 32, height: 32 }} resizeMode="contain" />
                </View>
                <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 16, color: "#003441", marginBottom: 4 }}>
                  Bath & Skincare
                </Text>
                <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 10, color: "#006573", letterSpacing: 0.5 }}>
                  32 ITEMS
                </Text>
              </View>

              {/* Safety */}
              <View style={{
                flex: 1,
                backgroundColor: "#DCF5FF",
                borderRadius: 24,
                padding: 20,
                ...offerClaimShadow.thumbLight
              }}>
                <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, width: 64, height: 64, alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Image source={require("../../assets/home/shield_icon.png")} style={{ width: 32, height: 32 }} resizeMode="contain" />
                </View>
                <Text style={{ fontFamily: peekoFonts.plusJakarta800, fontSize: 16, color: "#003441", marginBottom: 4 }}>
                  Safety
                </Text>
                <Text style={{ fontFamily: peekoFonts.beVietnam600, fontSize: 10, color: "#006573", letterSpacing: 0.5 }}>
                  14 ITEMS
                </Text>
              </View>
            </View>
          </>
        ) : (
          renderAllCategoriesContent()
        )}

      </ScrollView>

      {/* Floating Bottom Nav */}
      <View style={{
        position: "absolute",
        bottom: Platform.OS === "ios" ? insets.bottom || 24 : 24,
        left: 24,
        right: 24,
      }}>
        <View style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 999,
          paddingVertical: 12,
          paddingHorizontal: 32,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          ...offerClaimShadow.heroCardOuter
        }}>
          <Pressable onPress={() => setActiveTab("For You")} style={{ backgroundColor: activeTab === "For You" ? "#006573" : "transparent", padding: 12, borderRadius: 999 }}>
            <IconHome color={activeTab === "For You" ? "#FFFFFF" : "#8CCFCF"} />
          </Pressable>
          <Pressable onPress={() => setActiveTab("All Categories")} style={{ backgroundColor: activeTab === "All Categories" ? "#006573" : "transparent", padding: 12, borderRadius: 999 }}>
            <IconGrid color={activeTab === "All Categories" ? "#FFFFFF" : "#8CCFCF"} />
          </Pressable>
          <View style={{ padding: 12 }}>
            <IconList />
          </View>
          <View style={{ padding: 12 }}>
            <IconUser />
          </View>
        </View>
      </View>

      {/* Interstitial Modal */}
      <Modal visible={showInterstitial} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,52,65,0.4)", justifyContent: "center", alignItems: "center", padding: 24 }}>
          <View style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 40,
            width: "100%",
            padding: 32,
            alignItems: "center",
            ...offerClaimShadow.heroCardOuter
          }}>
            <IconGiftSurprise size={100} />

            <Text style={{
              fontFamily: peekoFonts.plusJakarta800,
              fontSize: 24,
              color: "#003441",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 12
            }}>
              A surprise for your{"\n"}little one!
            </Text>

            <Text style={{
              fontFamily: peekoFonts.beVietnam500,
              fontSize: 14,
              color: "#006573",
              textAlign: "center",
              lineHeight: 20,
              marginBottom: 32
            }}>
              We've selected something{"\n"}special for little explorer.
            </Text>

            <Pressable
              onPress={() => {
                setShowInterstitial(false);
                navigation.navigate("Surprise");
              }}
              style={{
                backgroundColor: "#006573",
                borderRadius: 999,
                width: "100%",
                paddingVertical: 18,
                alignItems: "center",
                marginBottom: 24
              }}
            >
              <Text style={{ fontFamily: peekoFonts.plusJakarta700, fontSize: 16, color: "#FFFFFF" }}>
                Open The Surprise
              </Text>
            </Pressable>

            <Pressable onPress={() => setShowInterstitial(false)}>
              <Text style={{
                fontFamily: peekoFonts.plusJakarta700,
                fontSize: 14,
                color: "#8CCFCF",
                letterSpacing: 1.5,
                textTransform: "uppercase"
              }}>
                MAYBE LATER
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
}
