import sort from '../../code/sort/lesson2'

test('sort:input 2', () => {
  expect(sort([3, 2, 1, 5, 6, 4], 2)).toBe(5)
})
test('sort:input 4', () => {
  expect(sort([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4)
})
