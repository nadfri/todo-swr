import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import FlagBtn from './FlagBtn';
import userEvent from '@testing-library/user-event';

describe('FlagBtn', () => {
  const mockOnClick = vi.fn();

  it('renders the correct flag icon for French', () => {
    render(<FlagBtn lang="fr" title="French" onClick={mockOnClick} />);

    expect(screen.getByTitle('French')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'French' })).toBeInTheDocument();
  });

  it('displays the French flag icon', () => {
    render(<FlagBtn lang="fr" title="French" onClick={mockOnClick} />);

    const flag = document.querySelector(
      '#flag-icons-fr > g > path:nth-child(1)',
    );
    expect(flag).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', async () => {
    const user = userEvent.setup();
    render(<FlagBtn lang="fr" title="French" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: 'French' });

    await user.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
