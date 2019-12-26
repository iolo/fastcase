import CaseConverter from './case-converter';

export default class CamelCase {
  static CAMEL_CASE_REGEXP = /(.+?)([A-Z]+[a-z0-9])/g;

  static create(): CamelCase {
    return new CamelCase();
  }

  /**
   * convert the given **camelCase** string to a snake_case string.
   */
  toSnakeCase: CaseConverter = (s: any) => {
    if (typeof s !== 'string') {
      return s;
    }
    return s.replace(CamelCase.CAMEL_CASE_REGEXP, (m, p1, p2) => `${p1}_${p2}`.toLowerCase());
  };
}
