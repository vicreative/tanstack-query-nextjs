/**
 * Truncates a text if its length exceeds a given max length
 * @param { string } value - A string to be truncated
 * @param { number } [maxLength] - The max allowed length of the string before initiating truncation
 */
export default function truncate(value: string, maxLength: number = 20) {
  if (value) {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength)}...`;
  }
  return value;
}
