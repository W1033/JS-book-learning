import sort from '../../code/sort/lesson4'

test('input:1', () => {
  expect(sort([1, 2, 0])).toBe(3)
})

test('input:2', () => {
  expect(sort([3, 4, -1, 1])).toBe(2)
})

test('input:3', () => {
  expect(sort([7, 8, 9, 11, 12])).toBe(1)
})

test('input:4', () => {
  expect(sort([1, 2, 3, 4, 5, 6])).toBe(7)
})
