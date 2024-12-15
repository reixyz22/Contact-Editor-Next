import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { expect, test } from 'vitest'
import ContactPage from "../contacts/[email]/page";

const mockStore = configureStore();
const initialState = {
    // Add the initial state properties relevant to your ContactPage component
    user: { email: "PX@example.com" } //this data point needs to be present in your database for the test to work
};
const store = mockStore(initialState);

test('test to see that content properly renders on ContactPage', async () => { //note this relies on PX@example being present
  render(
    <Provider store={store}>
      <ContactPage emailProp="PX@example.com" editProp={false} />
    </Provider>
  );

  // Wait for the text to appear if it's loaded asynchronously
  const textElement = await screen.findByText('987-654-3210');
  expect(textElement).toBeInTheDocument(); // This checks if the element is in the DOM
});