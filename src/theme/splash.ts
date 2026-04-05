/**
 * Splash — Figma node 83:627 (file H1c88ILL19tErXVaBHqOAF).
 * Values from REST `nodes?ids=83:627` export.
 */

export const splashColors = {
  /** Main frame fill #EBF9FF */
  background: "#EBF9FF",
  /** Logo "Peeko" text */
  logo: "#006573",
  /** Headline "Baby essentials…" */
  headline: "#003441",
  /** Subhead + trust copy */
  bodyMuted: "#2E6273",
  /** Trust row icon */
  trustIcon: "#006573",
  /** CTA gradient */
  ctaGradientStart: "#006573",
  ctaGradientEnd: "#005864",
  /** Baby badge fill */
  baby: "#7DE0FF",
  /** Cloud vector base (40% opacity layer in Figma) */
  cloud: "#3CD2EB",
  onPrimary: "#FFFFFF",
  /** Outer shell white @ 80% */
  capsuleSurface: "rgba(255,255,255,0.8)",
  shellShadow: "#003441",
} as const;

export const splashTypography = {
  logo: {
    size: 60,
    lineHeight: 60,
    letterSpacing: -3,
  },
  headline: {
    size: 36,
    lineHeight: 45,
    letterSpacing: -0.9,
  },
  subhead: {
    size: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  trust: {
    size: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  button: {
    size: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
} as const;

export const splashLayout = {
  frameMaxWidth: 390,
  horizontalPadding: 32,
  gapLogoToHeadline: 48,
  subheadTop: 16,
  trustTop: 32,
  bottomHorizontalPadding: 24,
  bottomBarPaddingBottom: 48,
  outerCapsuleRadius: 40,
  outerCapsulePadding: 12,
  ctaVerticalPadding: 20,
  ctaItemSpacing: 12,
  trustIconSize: 18.33333396911621,
  trustTextGap: 8,
} as const;

export const splashShadow = {
  shadowColor: "#003441",
  shadowOffset: { width: 0, height: 24 },
  shadowOpacity: 0.1,
  shadowRadius: 48,
  elevation: 14,
} as const;

export const splashCtaGradient = {
  colors: ["#006573", "#005864"] as const,
  start: { x: 0.45, y: 0 },
  end: { x: 0.55, y: 1 },
};
