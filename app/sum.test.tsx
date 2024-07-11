import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
test('test ability to dupe', () => {
  expect(sum(2, 2)).toBe(4);
});

test('test a page?', () => {
  expect(sum(2, 2)).toBe(4);
});
