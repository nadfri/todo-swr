import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import BackBtn from './BackBtn';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// Partially mock react-router-dom to retain original exports
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('BackBtn', () => {
  it('renders the button with correct text', () => {
    render(<BackBtn />);

    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toBeInTheDocument();
  });

  it('calls navigate with -1 when clicked', async () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(<BackBtn />);

    const button = screen.getByRole('button', { name: /back/i });
    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
