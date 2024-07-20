import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest'
import ContactPage from "../contacts/[email]/page";

test('.test to see that contact properly renders on ContactPage',async  () => {
    render(<ContactPage emailProp= "carlos@example.com" editProp={false} />)
   // Wait for the text to appear if it's loaded asynchronously
    const textElements = await screen.findAllByText('carlos@example.com');
    expect(textElements.length).toBeGreaterThan(1); // the text should render once in the heading and once in the email section
})

test('.test to see that content properly renders on ContactPage',async  () => {
    render(<ContactPage emailProp= "carlos@example.com" editProp={false} />)
   // Wait for the text to appear if it's loaded asynchronously
  const textElement = await screen.findByText('934-567-8901');
  expect(textElement).toBeInTheDocument(); // This checks if the element is in the DOM
})
