/**
 * Function to remove substring and trailing text
 *
 * @param originalString
 * @param substring
 * @returns originalString minus substring
 */
export default function removeSubstringAndTrailingText(
  originalString: string,
  substring: string = 'minutes</b>.'
): string | TrustedHTML {
  // Find the index of substring ('Similar recipes include')
  const startIndex = originalString.indexOf(substring);

  // If substring ('Similar recipes include') is found, cut it out along with everything that follows
  if (startIndex !== -1) {
    return `${originalString.substring(0, startIndex)}${substring}`;
  } else {
    return originalString;
  }
}
