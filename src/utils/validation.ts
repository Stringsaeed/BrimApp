import { PhoneNumberUtil } from "google-libphonenumber";
import { z } from "zod";

const phoneUtil = PhoneNumberUtil.getInstance();

export function isValidPhoneNumber<T extends string>(
  number: T,
  country: string
): boolean {
  try {
    if (!number) {
      return false;
    }
    if (number.length < 4) {
      return false;
    }
    const parsedNumber = phoneUtil.parse(number, country);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch {
    return false;
  }
}

export const phoneNumberSchema = z.string().min(8, {
  message: "Invalid phone number",
});

export const withCountrySchema = z
  .object({
    phoneNumber: phoneNumberSchema,
    country: z.string().min(2),
  })
  .refine((value) => {
    return isValidPhoneNumber(value.phoneNumber, value.country);
  });
