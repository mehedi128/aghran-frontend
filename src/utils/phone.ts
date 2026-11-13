// Bangladeshi mobile number helpers shared by the landing-page order forms.

/** Converts Bangla digits (০-৯) to English digits. */
export const toEnglishDigits = (value: string): string =>
  value.replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));

/**
 * Normalizes a typed mobile number to the local 11-digit form "01XXXXXXXXX".
 * Accepts Bangla or English digits, spaces, dashes, and the +880 / 880 / 88 prefixes:
 *   "০১৭১২-৩৪৫৬৭৮", "+8801712345678", "8801712345678" -> "01712345678"
 * Input it cannot recognise is returned with only the separators removed,
 * so isValidBdMobile() still rejects it.
 */
export const normalizeBdPhone = (value: string): string => {
  const cleaned = toEnglishDigits(value).replace(/[\s\-().+]/g, '');
  const match = cleaned.match(/^(?:88)?(01[3-9]\d{8})$/);
  return match ? match[1] : cleaned;
};

/** True for a valid Bangladeshi mobile number after normalizeBdPhone(). */
export const isValidBdMobile = (value: string): boolean =>
  /^01[3-9]\d{8}$/.test(normalizeBdPhone(value));
