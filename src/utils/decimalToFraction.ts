export default function decimalToFraction(decimal: number): string {
  // Check if the number is an integer
  if (Number.isInteger(decimal)) {
    return decimal.toString(); // Return the integer as a string
  }

  // Calculate the whole part and the fractional part
  const wholePart = Math.floor(decimal);
  const fractionalPart = decimal - wholePart;

  // Calculate the greatest common divisor (GCD) of the fractional part
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const precision = 1000000; // Adjust the precision as needed

  // Calculate the numerator and denominator
  const numerator = Math.round(fractionalPart * precision);
  const denominator = precision;

  // Simplify the fraction by dividing both numerator and denominator by their GCD
  const commonDivisor = gcd(numerator, denominator);
  const simplifiedNumerator = numerator / commonDivisor;
  const simplifiedDenominator = denominator / commonDivisor;

  // Create the mixed fraction string
  const fractionString =
    simplifiedDenominator === 1
      ? '' // If the fraction is 1, don't include it
      : `<small class="text-xs font-semibold"><sup>${simplifiedNumerator}</sup>&#8260;<sub>${simplifiedDenominator}</sub></small>`;

  return wholePart === 0
    ? fractionString
    : `<div class='flex items-center'><p class='text-lg'>${wholePart}</p>${fractionString}</div>`;
}
