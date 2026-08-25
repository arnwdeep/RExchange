import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component Unit Test Suite', () => {
  it('renders login view by default with student passport fields', () => {
    render(<App />);
    expect(screen.getAllByText(/REXCHANGE/i).length).toBeGreaterThan(0);
    expect(screen.getByDisplayValue(/Arjun Sharma/i)).toBeInTheDocument();
  });

  it('navigates to ExplorePage on login button click', () => {
    render(<App />);
    const exploreBtn = screen.getByRole('button', { name: /Issue Identity Pass/i });
    expect(exploreBtn).toBeInTheDocument();
    fireEvent.click(exploreBtn);
    expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
  });
});
