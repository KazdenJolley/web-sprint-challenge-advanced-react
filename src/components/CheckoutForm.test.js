import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);

  const header = screen.queryByText(/checkout form/i);

  expect(header).toBeInTheDocument();
});


test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText('First Name:');
  const lastNameInput = screen.getByLabelText('Last Name:');
  const addressInput = screen.getByLabelText('Address:');
  const cityInput = screen.getByLabelText('City:');
  const stateInput = screen.getByLabelText('State:');
  const zipInput = screen.getByLabelText('Zip:');
  const button = screen.getByRole('button');

  userEvent.type(firstNameInput, 'Johnathan');
  userEvent.type(lastNameInput, 'Wick');
  userEvent.type(addressInput, 'REDACTED');
  userEvent.type(cityInput, 'Los Angeles');
  userEvent.type(stateInput, 'CA');
  userEvent.type(zipInput, '98765');
  userEvent.click(button);
  
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(addressInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(stateInput).toBeInTheDocument();
  expect(zipInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  const name = await screen.findByText('Johnathan Wick');
  const streetAddress = await screen.findByText('REDACTED');
  const cityStateZip = await screen.findByText('Los Angeles, CA 98765');

  expect(name).toBeInTheDocument();
  expect(streetAddress).toBeInTheDocument();
  expect(cityStateZip).toBeInTheDocument();
});
