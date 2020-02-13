import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");

test('renders character data, next button and previous button', async () => {
  mockGetData.mockResolvedValueOnce({
    results: [
      {
        name: 'Boba Fett',
        height: '183',
        mass: '78.2',
        hair_color:'black',
        skin_color: 'fair'
      }
    ],
    next: 'abcde',
    previous: 'abcd'
  });

  const { getByText } = render(<StarWarsCharacters />);

  const nextButton = getByText(/next/i);
  const prevButton = getByText(/previous/i);

  fireEvent.click(nextButton);
  fireEvent.click(prevButton);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => expect(getByText(/boba/i)));
});