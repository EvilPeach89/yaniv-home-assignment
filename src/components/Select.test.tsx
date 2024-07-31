import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from './Select';

describe('Select Component', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  const mockOnChange = jest.fn();

  test('renders with placeholder text', () => {
    render(<Select options={options} onChange={mockOnChange} />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  test('toggles dropdown on click', () => {
    render(<Select options={options} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Select...'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('selects an option in single-select mode', () => {
    render(<Select options={options} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['1']);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('selects and deselects options in multi-select mode', () => {
    render(<Select options={options} onChange={mockOnChange} multiple />);
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['1']);
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith(['1', '2']);
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['2']);
  });

  test('filters options based on input text', () => {
    render(<Select options={options} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1' },
    });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  test('selects all options in multi-select mode', () => {
    render(<Select options={options} onChange={mockOnChange} multiple />);
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Select all'));
    expect(mockOnChange).toHaveBeenCalledWith(['1', '2', '3']);
  });

  test('deselects all options in multi-select mode', () => {
    const allSelectedText = options.map((option) => option.label).join(', ');
    render(<Select options={options} onChange={mockOnChange} multiple />);
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Select all'));
    fireEvent.click(screen.getByText(allSelectedText));
    fireEvent.click(screen.getByText('Deselect all'));
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });
});
