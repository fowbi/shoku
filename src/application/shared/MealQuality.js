export const GOOD = 10;
export const MEH = 5;
export const BAD = 1;
export const UNKNOWN = 0;

export const isValidQuality = (quality) => [GOOD, MEH, BAD].includes(quality);

export const determineMealQualityStatus = (quality) => {
  switch (quality) {
    case GOOD:
      return 'good';
    case MEH:
      return 'meh';
    case BAD:
      return 'bad';
    case UNKNOWN:
    default:
      return '';
  }
};
