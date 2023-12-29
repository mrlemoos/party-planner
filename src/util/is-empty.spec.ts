import { describe, expect, test } from 'vitest'

import isEmpty from './is-empty'

describe('isEmpty()', function () {
  describe('given that the value is NOT a string, i.e., number, undefined, object (including null), symbol, NaN, and boolean', function () {
    test('then returns true', function () {
      // Arrange
      const values = [undefined, null, {}, Symbol(), true, false, 0, 1, NaN]

      // Act
      const results = values.map(isEmpty)

      // Assert
      expect(results).toEqual([true, true, true, true, true, true, true, true, true])
    })
  })
  describe('given that the value is one of the following strings: "undefined", "null", "", "0", "false", or "NaN"', function () {
    test('then returns true', function () {
      // Arrange
      const values = ['undefined', 'null', '', '0', 'false', 'NaN']

      // Act
      const results = values.map(isEmpty)

      // Assert
      expect(results).toEqual([true, true, true, true, true, true])
    })
  })
  describe('given that the value is one of the following strings: "undefined", "null", "", "0", "false", or "NaN" with blank space(s) at either the beginning or the end of the string', function () {
    test('then returns true', function () {
      // Arrange
      const values = [' undefined', ' null', ' ', ' 0', ' false', ' NaN', 'undefined ', 'null ', ' ', ' 0 ', ' false ']

      // Act
      const results = values.map(isEmpty)

      // Assert
      expect(results).toEqual([true, true, true, true, true, true, true, true, true, true, true])
    })
  })
  describe('given that the value is a string that does NOT correspond to the following: "undefined", "null", "", "0", "false", or "NaN"', function () {
    test('then returns false', function () {
      // Arrange
      const values = ['a', 'true', '1', 'I am a string.']

      // Act
      const results = values.map(isEmpty)

      // Assert
      expect(results).toEqual([false, false, false, false])
    })
  })
})
