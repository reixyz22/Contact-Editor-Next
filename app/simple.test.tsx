
import { sum } from './simple_tests'
import TestTsx from "./simple_tests";

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest'

test('.tsxtester', () => {
  render(<TestTsx/>)
  const textElement = screen.getByText('test text');
  expect(textElement).toHaveTextContent('test text');
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

