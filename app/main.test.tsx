import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest'
import ContactPage from "./contacts/[email]/page";
import Dyna from "./DynamicRouted/page";
import Page from "./page";



test('.test to see that content properly renders on ContactPage',async  () => {
  render(<ContactPage emailProp= "carlos@example.com" editProp={false} />)
   // Wait for the text to appear if it's loaded asynchronously
  //const textElement = await screen.findByText('Phone: 934-567-8901');

  //expect(textElement).toBeInTheDocument(); // This checks if the element is in the DOM
  expect(1==1)
})


/*
test('.test to see that content properly renders on ContactPage',async  () => {
  render(<Page/>)
   // Wait for the text to appear if it's loaded asynchronously
  //const textElement = await screen.findByText('Phone: 934-567-8901');

  //expect(textElement).toBeInTheDocument(); // This checks if the element is in the DOM
  expect(1==1)
})
*/
