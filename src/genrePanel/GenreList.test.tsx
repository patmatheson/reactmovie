import React from 'react';
import { render, screen } from '@testing-library/react';
import GenreList from './GenreList';

test('renders learn react link', () => {
  render(<GenreList genres={['pat']}/>);
  const linkElement = screen.getByText(/pat/i);
  expect(linkElement).toBeInTheDocument();
});
