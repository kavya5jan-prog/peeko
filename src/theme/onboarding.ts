/**
 * Shared onboarding UI tokens (phone screen + future steps).
 */
import { splashColors } from "./splash";

export const onboardingColors = {
  screenBackground: splashColors.background,
  headline: splashColors.headline,
  body: splashColors.bodyMuted,
  mutedLabel: "#809FB8",
  link: splashColors.logo,
  inputFill: "#EAF4FA",
  /** Default keyline on phone inputs (Figma) */
  inputBorder: "#C5DDE8",
  /** List row separators (select location, etc.) */
  rowDivider: "#D4E6EF",
  stageRowBg: "#F8F8F8",
  card: "#FFFFFF",
  shadow: "#003441",
  surpriseCardBg: "#EEF5F8",
  surpriseTagBg: "#CAE7EE",
  surpriseGiftBase: "#006575",
  surpriseGiftStripe: "#1A94AD",
  surprisePriceBg: "#FFFFE0",
} as const;

export const onboardingLayout = {
  frameMaxWidth: 390,
  horizontalPadding: 24,
  topBarTopPadding: 12,
  cardRadius: 32,
  cardPadding: 22,
  inputRadius: 10,
  countryCodeMinWidth: 70,
  gapHeaderToTitle: 28,
  gapTitleToSubtitle: 16,
  gapSubtitleToCard: 32,
  gapCardToTerms: 24,
  /** Space between search field and location list inside card */
  gapSearchToList: 20,
  gapTitleToSearch: 20,
  mapHeight: 344,
  mapRadius: 16,
  gapSearchToMap: 20,
  gapMapToAddress: 24,
  addressCardRadius: 16,
  addressCardPaddingV: 18,
  addressCardPaddingH: 16,
  stageRowMinHeight: 84,
  stageRowRadius: 28,
  stageRowPaddingH: 12,
  stageRowSelectedBorderWidth: 2,
  stageAvatarSize: 52,
  stageSelectorSize: 28,
  bottomBarPaddingBottom: 48,
  bottomHorizontalPadding: 24,
  surpriseHeroTop: 26,
  surpriseGiftHeight: 300,
  surpriseInfoCardRadius: 28,
  surpriseInfoCardPadding: 19,
  surpriseInfoCardTop: 11,
} as const;

export const onboardingTypography = {
  screenTitle: {
    size: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    size: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  fieldLabel: {
    size: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  input: {
    size: 17,
    lineHeight: 22,
  },
  terms: {
    size: 13,
    lineHeight: 20,
  },
  skip: {
    size: 15,
    lineHeight: 20,
  },
  /** Center wordmark on phone / inner onboarding steps */
  headerWordmark: {
    size: 22,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
} as const;

export const cardShadow = {
  shadowColor: onboardingColors.shadow,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.06,
  shadowRadius: 24,
  elevation: 6,
};
