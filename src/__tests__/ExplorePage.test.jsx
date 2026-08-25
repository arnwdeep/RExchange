import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExplorePage from '../components/ExplorePage';

const mockStudentData = {
  name: 'Arjun Sharma',
  regNo: '23CS0567',
  department: 'Computer Science',
  year: '2nd Year',
  college: 'XYZ University',
  photoUrl: null
};

describe('ExplorePage Component Test Suite', () => {
  it('renders top navigation brand title REXCHANGE® and navigation options', () => {
    render(<ExplorePage studentData={mockStudentData} onOpenStudentPass={vi.fn()} />);
    expect(screen.getAllByText(/REXCHANGE®/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Catalog/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Exchanges/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+ SELL ITEM/i })).toBeInTheDocument();
  });

  it('opens and displays the dedicated My Campus Exchanges modal on button tap', () => {
    render(<ExplorePage studentData={mockStudentData} onOpenStudentPass={vi.fn()} />);
    const exchangesBtn = screen.getByRole('button', { name: /Exchanges/i });
    fireEvent.click(exchangesBtn);
    expect(screen.getByText(/MY EXCHANGES & ACTIVITY/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Listed Items/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Completed Exchanges/i)).toBeInTheDocument();
  });

  it('opens and closes the + SELL ITEM listing modal', () => {
    render(<ExplorePage studentData={mockStudentData} onOpenStudentPass={vi.fn()} />);
    const sellBtn = screen.getByRole('button', { name: /\+ SELL ITEM/i });
    fireEvent.click(sellBtn);
    expect(screen.getByText(/LIST AN ITEM FOR SALE /i)).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /Close listing form/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/LIST AN ITEM FOR SALE /i)).not.toBeInTheDocument();
  });

  it('performs real-time search input state change', () => {
    render(<ExplorePage studentData={mockStudentData} onOpenStudentPass={vi.fn()} />);
    const searchTriggerBtn = screen.getByTitle(/Search items/i);
    fireEvent.click(searchTriggerBtn);
    const searchInput = screen.getByPlaceholderText(/Search items, sellers, categories/i);
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Sony' } });
    expect(searchInput.value).toBe('Sony');
  });

  it('closes open modals when pressing the Escape key', () => {
    render(<ExplorePage studentData={mockStudentData} onOpenStudentPass={vi.fn()} />);
    const sellBtn = screen.getByRole('button', { name: /\+ SELL ITEM/i });
    fireEvent.click(sellBtn);
    expect(screen.getByText(/LIST AN ITEM FOR SALE /i)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByText(/LIST AN ITEM FOR SALE /i)).not.toBeInTheDocument();
  });
});
