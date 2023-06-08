export const fonts = {
  regular: "Primary",
  regularItalic: "PrimaryItalic",
  bold: "PrimaryBold",
  boldItalic: "PrimaryBoldItalic",
  semiBold: "PrimarySemiBold",
  semiBoldItalic: "PrimarySemiBoldItalic",
};

export const textVariants = {
  LargeTitle: {
    fontFamily: fonts.regular,
    fontSize: 34,
    lineHeight: 41,
  },
  "LargeTitle/Emphasized": {
    fontFamily: fonts.bold,
    fontSize: 34,
    lineHeight: 41,
  },
  Title1: {
    fontFamily: fonts.regular,
    fontSize: 28,
    lineHeight: 34,
  },
  "Title1/Emphasized": {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  Title2: {
    fontFamily: fonts.regular,
    fontSize: 22,
    lineHeight: 28,
  },
  "Title2/Emphasized": {
    fontFamily: fonts.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  Title3: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 25,
  },
  "Title3/Emphasized": {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 25,
  },

  Headline: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    lineHeight: 22,
  },
  "Headline/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    fontSize: 17,
    lineHeight: 22,
  },
  Body: {
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 22,
  },
  "Body/Emphasized": {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    lineHeight: 22,
  },
  "Body/Italic": {
    fontFamily: fonts.regularItalic,
    fontSize: 17,
    lineHeight: 22,
  },
  "Body/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    fontSize: 17,
    lineHeight: 22,
  },

  Callout: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 21,
  },
  "Callout/Emphasized": {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 21,
  },
  "Callout/Italic": {
    fontFamily: fonts.regularItalic,
    fontSize: 16,
    lineHeight: 21,
  },
  "Callout/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    fontSize: 16,
    lineHeight: 21,
  },

  Subheadline: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
  },
  "Subheadline/Emphasized": {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 20,
  },
  "Subheadline/Italic": {
    fontFamily: fonts.regularItalic,
    fontSize: 15,
    lineHeight: 20,
  },

  Footnote: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  "Footnote/Emphasized": {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },
  "Footnote/Italic": {
    fontFamily: fonts.regularItalic,
    fontSize: 13,
    lineHeight: 18,
  },
  "Footnote/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    fontSize: 13,
    lineHeight: 18,
  },
  Caption1: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  "Caption1/Emphasized": {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
  "Caption1/Italic": {
    fontFamily: fonts.regularItalic,
    fontSize: 12,
    lineHeight: 16,
  },
  "Caption1/Italic/Emphasized": {
    fontFamily: fonts.semiBoldItalic,
    fontSize: 12,
    lineHeight: 16,
  },
} as const;
