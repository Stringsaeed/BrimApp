export const fonts = {
  semiBoldItalic: "PrimarySemiBoldItalic",
  mediumItalic: "PrimaryMediumItalic",
  lightItalic: "PrimaryLightItalic",
  boldItalic: "PrimaryBoldItalic",
  regularItalic: "PrimaryItalic",
  semiBold: "PrimarySemiBold",
  medium: "PrimaryMedium",
  light: "PrimaryLight",
  bold: "PrimaryBold",
  regular: "Primary",
};

export const textVariants = {
  "Caption1/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    lineHeight: 16,
    fontSize: 12,
  },
  "Footnote/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    lineHeight: 18,
    fontSize: 13,
  },
  "Callout/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    lineHeight: 21,
    fontSize: 16,
  },
  "Body/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    lineHeight: 22,
    fontSize: 17,
  },
  "Headline/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    lineHeight: 22,
    fontSize: 17,
  },
  "Subheadline/Italic": {
    fontFamily: fonts.regularItalic,
    lineHeight: 20,
    fontSize: 15,
  },
  "Subheadline/Emphasized": {
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    fontSize: 15,
  },
  "Caption1/Italic": {
    fontFamily: fonts.regularItalic,
    lineHeight: 16,
    fontSize: 12,
  },

  "Footnote/Italic": {
    fontFamily: fonts.regularItalic,
    lineHeight: 18,
    fontSize: 13,
  },
  "Caption1/Emphasized": {
    fontFamily: fonts.semiBold,
    lineHeight: 16,
    fontSize: 12,
  },
  "Footnote/Emphasized": {
    fontFamily: fonts.semiBold,
    lineHeight: 18,
    fontSize: 13,
  },
  "Callout/Italic": {
    fontFamily: fonts.regularItalic,
    lineHeight: 21,
    fontSize: 16,
  },
  "Callout/Emphasized": {
    fontFamily: fonts.semiBold,
    lineHeight: 21,
    fontSize: 16,
  },
  "LargeTitle/Emphasized": {
    fontFamily: fonts.bold,
    lineHeight: 41,
    fontSize: 34,
  },

  "Body/Italic": {
    fontFamily: fonts.regularItalic,
    lineHeight: 22,
    fontSize: 17,
  },
  "Body/Emphasized": {
    fontFamily: fonts.semiBold,
    lineHeight: 22,
    fontSize: 17,
  },
  "Title3/Emphasized": {
    fontFamily: fonts.bold,
    lineHeight: 25,
    fontSize: 20,
  },
  "Title2/Emphasized": {
    fontFamily: fonts.bold,
    lineHeight: 28,
    fontSize: 22,
  },

  "Title1/Emphasized": {
    fontFamily: fonts.bold,
    lineHeight: 34,
    fontSize: 28,
  },
  Subheadline: {
    fontFamily: fonts.regular,
    lineHeight: 20,
    fontSize: 15,
  },
  LargeTitle: {
    fontFamily: fonts.regular,
    lineHeight: 41,
    fontSize: 34,
  },

  Headline: {
    fontFamily: fonts.semiBold,
    lineHeight: 22,
    fontSize: 17,
  },
  Caption1: {
    fontFamily: fonts.regular,
    lineHeight: 16,
    fontSize: 12,
  },
  Footnote: {
    fontFamily: fonts.regular,
    lineHeight: 18,
    fontSize: 13,
  },
  Callout: {
    fontFamily: fonts.regular,
    lineHeight: 21,
    fontSize: 16,
  },
  Title3: {
    fontFamily: fonts.regular,
    lineHeight: 25,
    fontSize: 20,
  },
  Title2: {
    fontFamily: fonts.regular,
    lineHeight: 28,
    fontSize: 22,
  },
  Title1: {
    fontFamily: fonts.regular,
    lineHeight: 34,
    fontSize: 28,
  },
  Body: {
    fontFamily: fonts.regular,
    lineHeight: 22,
    fontSize: 17,
  },
} as const;
