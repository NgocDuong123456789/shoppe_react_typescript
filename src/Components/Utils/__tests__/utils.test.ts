import { it, describe, expect } from 'vitest'

import { NumberFormat, CurryToNumber, removeSpecialCharacters, getIdFromNameId } from '../utils'

describe('test error utils', () => {
  it('test error utils', () => {
    expect(NumberFormat(123456789)).toBe('123.456.789')
    expect(NumberFormat(12345)).toBe('12.345')
    expect(NumberFormat(123.123)).toBe('123,123')
  })
})

describe('test error utils', () => {
  it('test error utils', () => {
    expect(CurryToNumber(1250)).toBe('1.3k')
    expect(CurryToNumber(1255567)).toBe('1.3m')
    expect(CurryToNumber(100)).toBe('100')
  })
})

describe('test error utils', () => {
  it('test error getIdFromNameId ', () => {
    expect(getIdFromNameId('helloae-i,123456')).toBe('123456')
  })
})

describe('test error utils', () => {
  it('test error removeSpecialCharacters', () => {
    expect(removeSpecialCharacters('Hello!@#world$%^')).toBe('Helloworld')
  })
})
