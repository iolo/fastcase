const {
  toCamelCase,
  toSnakeCase,
  toCamelCaseFast,
  toSnakeCaseFast,
  toCaseKeysFn,
  toCamelCaseKeys,
  toSnakeCaseKeys,
} = require('../src');

describe('fastcase', () => {
  describe('toCamelCaseFast', () => {
    test('should faster than toCamelCase()', () => {
      const COUNT = 1000000;

      const start = Date.now();
      for (let i = 0; i < COUNT; i += 1) {
        toCamelCase(`foo_bar_baz_qux_${i % 100}`);
      }
      const elapsed = Date.now() - start;
      console.log(elapsed);

      const start2 = Date.now();
      for (let i = 0; i < COUNT; i += 1) {
        toCamelCaseFast(`foo_bar_baz_qux_${i % 100}`);
      }
      const elapsed2 = Date.now() - start2;
      console.log(elapsed2);

      expect(elapsed2).toBeLessThan(elapsed);
    });
  });

  describe('toSnakeCaseFast', () => {
    test('should faster than toSnakeCase()', () => {
      const COUNT = 1000000;

      const start = Date.now();
      for (let i = 0; i < COUNT; i += 1) {
        toSnakeCase(`fooBarBazQux${i % 100}`);
      }
      const elapsed = Date.now() - start;
      console.log(elapsed);

      const start2 = Date.now();
      for (let i = 0; i < COUNT; i += 1) {
        toSnakeCaseFast(`fooBarBazQux${i % 100}`);
      }
      const elapsed2 = Date.now() - start2;
      console.log(elapsed2);

      expect(elapsed2).toBeLessThan(elapsed);
    });
  });

  describe('toCaseKeysFn', () => {
    const toUpperCaseKeys = toCaseKeysFn((s: string) => s.toUpperCase());
    test('edge', () => {
      expect(toUpperCaseKeys()).toBeUndefined();
      expect(toUpperCaseKeys(null)).toBeNull();
      expect(toUpperCaseKeys([])).toEqual([]);
      expect(toUpperCaseKeys({})).toEqual({});
      expect(toUpperCaseKeys(new Date())).toEqual({});
    });
    test('non object', () => {
      expect(toUpperCaseKeys('')).toEqual('');
      expect(toUpperCaseKeys('fooBarBaz')).toEqual('fooBarBaz');
      expect(toUpperCaseKeys('foo_bar_baz')).toEqual('foo_bar_baz');
      expect(toUpperCaseKeys(123)).toEqual(123);
      expect(toUpperCaseKeys(123.456)).toEqual(123.456);
      expect(toUpperCaseKeys(true)).toEqual(true);
      expect(toUpperCaseKeys(false)).toEqual(false);
    });
    test('object', () => {
      expect(
        toUpperCaseKeys({
          foo_bar_baz: 'foo_bar_baz',
        })
      ).toEqual({
        FOO_BAR_BAZ: 'foo_bar_baz',
      });
    });
    test('object with dup keys', () => {
      expect(
        toUpperCaseKeys({
          foo_bar_baz: 'foo_bar_baz',
          FOO_BAR_BAZ: 'fooBarBaz',
        })
      ).toEqual({
        FOO_BAR_BAZ: 'fooBarBaz',
      });
    });
    test('array', () => {
      expect(
        toUpperCaseKeys([
          {
            foo_bar_baz: 'foo_bar_baz',
          },
        ])
      ).toEqual([{ FOO_BAR_BAZ: 'foo_bar_baz' }]);
    });
  });

  describe('toCamelCaseKeys', () => {
    test('edge', () => {
      expect(toCamelCaseKeys()).toBeUndefined();
      expect(toCamelCaseKeys(null)).toBeNull();
      expect(toCamelCaseKeys([])).toEqual([]);
      expect(toCamelCaseKeys({})).toEqual({});
      expect(toCamelCaseKeys(new Date())).toEqual({});
    });
    test('non object', () => {
      expect(toCamelCaseKeys('')).toEqual('');
      expect(toCamelCaseKeys('fooBarBaz')).toEqual('fooBarBaz');
      expect(toCamelCaseKeys('foo_bar_baz')).toEqual('foo_bar_baz');
      expect(toCamelCaseKeys(123)).toEqual(123);
      expect(toCamelCaseKeys(123.456)).toEqual(123.456);
      expect(toCamelCaseKeys(true)).toEqual(true);
      expect(toCamelCaseKeys(false)).toEqual(false);
    });
    test('object', () => {
      expect(
        toCamelCaseKeys({
          foo_bar_baz: 'foo_bar_baz',
        })
      ).toEqual({
        fooBarBaz: 'foo_bar_baz',
      });
    });
    test('object with dup keys', () => {
      expect(
        toCamelCaseKeys({
          foo_bar_baz: 'foo_bar_baz',
          fooBarBaz: 'fooBarBaz',
        })
      ).toEqual({
        fooBarBaz: 'fooBarBaz',
      });
    });
    test('array', () => {
      expect(toCamelCaseKeys([{ foo_bar_baz: 'foo_bar_baz' }])).toEqual([{ fooBarBaz: 'foo_bar_baz' }]);
    });
  });

  describe('toSnakeCaseKeys', () => {
    test('edge', () => {
      expect(toSnakeCaseKeys()).toBeUndefined();
      expect(toSnakeCaseKeys(null)).toBeNull();
      expect(toSnakeCaseKeys([])).toEqual([]);
      expect(toSnakeCaseKeys({})).toEqual({});
      expect(toSnakeCaseKeys(new Date())).toEqual({});
    });
    test('non object', () => {
      expect(toSnakeCaseKeys('')).toEqual('');
      expect(toSnakeCaseKeys('fooBarBaz')).toEqual('fooBarBaz');
      expect(toSnakeCaseKeys('foo_bar_baz')).toEqual('foo_bar_baz');
      expect(toSnakeCaseKeys(123)).toEqual(123);
      expect(toSnakeCaseKeys(123.456)).toEqual(123.456);
      expect(toSnakeCaseKeys(true)).toEqual(true);
      expect(toSnakeCaseKeys(false)).toEqual(false);
    });
    test('object', () => {
      expect(
        toSnakeCaseKeys({
          fooBarBaz: 'fooBarBaz',
        })
      ).toEqual({
        foo_bar_baz: 'fooBarBaz',
      });
    });
    test('object with dup keys', () => {
      expect(
        toSnakeCaseKeys({
          fooBarBaz: 'fooBarBaz',
          foo_bar_baz: 'foo_bar_baz',
        })
      ).toEqual({
        foo_bar_baz: 'foo_bar_baz',
      });
    });
    test('array', () => {
      expect(toSnakeCaseKeys([{ fooBarBaz: 'fooBarBaz' }])).toEqual([{ foo_bar_baz: 'fooBarBaz' }]);
    });
  });
});
