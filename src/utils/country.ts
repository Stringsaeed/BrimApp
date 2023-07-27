import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

export function getFlagEmoji(region: string): string {
  return String.fromCodePoint(
    ...[...region.toUpperCase()].map((char) => 0x1f1a5 + char.charCodeAt(0))
  );
}

export function getCallingCode(region: string): string {
  const callingCode =
    PhoneNumberUtil.getInstance().getCountryCodeForRegion(region);
  return callingCode.toString();
}

export function getPhoneNumber(number: string, region: string): string {
  const phoneNumber = PhoneNumberUtil.getInstance().parse(number, region);
  const formattedPhoneNumber = PhoneNumberUtil.getInstance().format(
    phoneNumber,
    PhoneNumberFormat.E164
  );

  return formattedPhoneNumber;
}
