import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FlagBtnSelector from './FlagBtnSelector';
import App from '@/App';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/utils/moveToLastInArray', () => ({
  moveToLastInArray: (arr: string[], item: string) => {
    const newArr = arr.filter((i) => i !== item);
    newArr.push(item);
    return newArr;
  },
}));

describe('FlagBtnSelector', () => {
  const closeSelector = vi.fn();

  const renderComponent = () => render(<FlagBtnSelector closeSelector={closeSelector} />);

  it('should render all language buttons', () => {
    renderComponent();

    expect(screen.getByTitle(/select French/i)).toBeInTheDocument();
    expect(screen.getByTitle(/select Arabic/i)).toBeInTheDocument();
    expect(screen.getByTitle(/select English/i)).toBeInTheDocument();
  });

  it('should change language and close selector on button click', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const toggleBtn = screen.getByTitle(/select language/i);

    await user.click(toggleBtn);

    const frButton = screen.getByTitle(/select French/i);

    await user.click(frButton);

    expect(screen.getByText(/Todo avec SWR/i)).toBeInTheDocument();
  });
});
