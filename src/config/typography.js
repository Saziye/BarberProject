import { StyleSheet } from "react-native";

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontWeight = {
  thin: "100",
  ultraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
  black: "900"
};

/**
 * Typography setting
 * - This font weight will be used for all template
 * - Check more how to use typography in url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const Typography = StyleSheet.create({
  header: {
    fontSize: 34,
    fontWeight: FontWeight.regular
  },
  header2: {
    fontSize: 30,
    fontWeight: FontWeight.regular
  },
  title1: {
    fontSize: 28,
    fontWeight: FontWeight.regular
  },
  title2: {
    fontSize: 22,
    fontWeight: FontWeight.regular
  },
  title3: {
    fontSize: 20,
    fontWeight: FontWeight.regular
  },
  title4: {
    fontSize: 24,
    fontWeight: FontWeight.regular
  },
  headline: {
    fontSize: 17,
    fontWeight: FontWeight.regular
  },
  body1: {
    fontSize: 17,
    fontWeight: FontWeight.regular
  },
  body2: {
    fontSize: 14,
    fontWeight: FontWeight.regular
  },
  body3: {
    fontSize: 16,
    fontWeight: FontWeight.regular
  },
  callout: {
    fontSize: 17,
    fontWeight: FontWeight.regular
  },
  subhead: {
    fontSize: 15,
    fontWeight: FontWeight.regular
  },
  footnote: {
    fontSize: 13,
    fontWeight: FontWeight.regular
  },
  caption1: {
    fontSize: 12,
    fontWeight: FontWeight.regular
  },
  caption2: {
    fontSize: 11,
    fontWeight: FontWeight.regular
  },
  overline: {
    fontSize: 10,
    fontWeight: FontWeight.regular
  }
});
