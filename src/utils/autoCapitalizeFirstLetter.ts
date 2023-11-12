export const autoCapitalizeFirstLetter = (str: string | null) => {
  if (str) {
    if (typeof str === 'string' && str !== undefined && str !== null)
      return str.charAt(0).toUpperCase() + str.substring(1);
    else {
      console.warn('invalid string');
    }
  }
};
