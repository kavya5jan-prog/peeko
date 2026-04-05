/**
 * Offer claim screen — Figma node 46:4239 (file H1c88ILL19tErXVaBHqOAF).
 */
import { splashColors } from "./splash";

export const offerClaimColors = {
  screenBg: splashColors.background,
  headline: splashColors.headline,
  body: splashColors.bodyMuted,
  link: splashColors.logo,
  urgencyRed: "#FFFFE0",
  urgencyText: "#003441",
  productImageBg: "#DCF5FF",
  widgetBg: "#DCF5FF",
  sizeChipBg: "#C6EFFF",
  cartBadgeBg: "#B5EBFF",
  strikethrough: "rgba(46,98,115,0.4)",
  mutedCaption: "rgba(46,98,115,0.6)",
  widgetBody: "rgba(46,98,115,0.7)",
  onPrimarySoft: "#DAF8FF",
  checkoutSolid: "#006573",
  checkoutBorder: "rgba(255,255,255,0.2)",
  cardBorder: "rgba(0,101,115,0.1)",
  bottomBarBg: "rgba(255,255,255,0.92)",
} as const;

export const offerClaimLayout = {
  horizontalPadding: 24,
  /** Space below urgency banner (Figma Main used pt 50 with overlay header; below fixed banner ~15–24). */
  welcomeTopPadding: 8,
  sectionGap: 10,
  welcomeTitleToSubtitle: 8,
  heroCardRadius: 32,
  heroImageHeight: 180,
  widgetRadius: 32,
  widgetGap: 24,
  widgetPaddingH: 24,
  widgetPaddingV: 24,
  thumbSize: 96,
  thumbRadius: 16,
  bottomBarPaddingTop: 16,
  bottomBarPaddingBottomBase: 16,
} as const;

export const offerClaimShadow = {
  heroCardOuter: {
    shadowColor: "#003441",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.08,
    shadowRadius: 48,
    elevation: 10,
  },
  ctaButton: {
    shadowColor: "#006573",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  bottomBar: {
    shadowColor: "#003441",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 16,
  },
  thumb: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  thumbLight: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  checkoutButton: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
} as const;

export const offerClaimTypography = {
  welcomeTitle: {
    size: 24,
    lineHeight: 28,
    letterSpacing: -0.6,
  },
  welcomeSubtitle: {
    size: 16,
    lineHeight: 24,
  },
  exclusiveLabel: {
    size: 12,
    lineHeight: 16,
    letterSpacing: 2.4,
  },
  productTitle: {
    size: 18,
    lineHeight: 24,
    letterSpacing: -0.6,
  },
} as const;
