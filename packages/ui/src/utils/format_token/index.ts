import Big from 'big.js';
import numeral from 'numeral';
import chainConfig from '@/chainConfig';

const { tokenUnits } = chainConfig();

/**
 * Util to help me correctly transform a base denom amount
 * in to a display denom amount
 * @param value the current amount
 * @param denom the denom to convert the amount in to
 * @returns TokenUnit
 */
export const formatToken = (value: number | string | null | undefined, denom = ''): TokenUnit => {
  const selectedDenom = tokenUnits?.[denom];
  console.log('selectedDenom: ', selectedDenom);

  if (typeof value !== 'string' && typeof value !== 'number') {
    value = '0';
  }

  if (typeof value === 'number') {
    value = `${value}`;
  }

  const results: TokenUnit = {
    value,
    displayDenom: denom,
    baseDenom: denom,
    exponent: selectedDenom?.exponent ?? 0,
  };

  if (!selectedDenom) {
    return results;
  }

  const ratio = Big(10 ** selectedDenom.exponent);
  results.value = !ratio.eq(0) ? Big(value).div(ratio).toFixed(selectedDenom.exponent) : '';
  results.displayDenom = selectedDenom.display;
  return results;
};

/**
 * Util to help me correctly transform a base denom amount
 * in to a display denom amount
 * @param value the current amount
 * @param exponent the exponent to div by
 * @returns string value of formatted
 */
export const formatTokenByExponent = (value: number | string | undefined, exponent = 0): string => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    value = '0';
  }

  if (typeof value === 'number') {
    value = `${value}`;
  }

  const ratio = Big(10 ** exponent);
  const results = !ratio.eq(0) ? Big(value).div(ratio).toFixed(exponent) : '';
  return results;
};

/**
 * Mostly used for formatting tokens as javascript being javascript,
 * cannot handle tokens with 18 decimal places
 * @param tokenUnit string
 * @param toFixed defaults null
 * @returns formatted number with all the decimal places one can wish for
 */
export const formatNumber = (tokenUnit: string, toFixed: number | null = null): string => {
  // split whole number and decimal if any
  const split = `${tokenUnit}`.split('.');
  // whole number
  const wholeNumber = split?.[0] ?? '';
  // decimal
  const decimal: string = split?.[1] ?? '';
  // add commas for fullnumber ex: 1000 -> 1,000
  const formatWholeNumber = numeral(wholeNumber).format('0,0');

  // in the event that there is actually decimals and tofixed has not been set to 0
  // we will handle the decimal
  if (decimal && toFixed !== 0) {
    // if toFixed is null then we want to return the whole decimal
    // otherwise we respect the toFixed input
    if (toFixed === null) {
      toFixed = decimal.length;
    }
    // we remove any ending 0s ex - 100 -> 1
    const formatDecimal = removeEndingZeros(decimal.substring(0, toFixed));
    // merge the full number together and return it.
    // If for some insane reason after removing all the 0s we ended up with
    // '' in the decimal place we just return the full number
    return `${formatWholeNumber}${formatDecimal.length ? '.' : ''}${formatDecimal}`;
  }

  // else we return whole number
  return formatWholeNumber;
};

/**
 * takes in a number string and removes any lingering 0s
 * ex - 100 -> 1
 * @param value number string
 * @returns a string without lingering 0
 */
export const removeEndingZeros = (value: string) => {
  let end = value.length;
  for (let i = value.length; i > 0; i -= 1) {
    const currentDigit = value[i - 1];
    if (currentDigit !== '0') {
      break;
    }
    end -= 1;
  }
  return value.substring(0, end);
};
