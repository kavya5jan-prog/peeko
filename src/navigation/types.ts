export type RootStackParamList = {
  Splash: undefined;
  Phone: undefined;
  Otp: { phone: string };
  Location: undefined;
  Stage: undefined;
  Surprise: undefined;
  OfferClaim: undefined;
  Checkout: undefined;
  PaymentSuccess: undefined;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
