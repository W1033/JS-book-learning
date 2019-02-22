import regModeStr from '../../code/regexp/lesson2'

test('regModeStr', () => {
  expect(regModeStr('aaa', 'caa*')).toBe(false)
})
test('regModeStr:2', () => {
  expect(regModeStr('aaabc', 'a*bc')).toBe(true)
})
test('regModeStr:3', () => {
  expect(regModeStr('aaabc', 'a*.*')).toBe(true)
})
