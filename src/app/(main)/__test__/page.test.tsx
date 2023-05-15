import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

jest.mock('@supabase/auth-helpers-nextjs');

describe('Home', () => {
  it('renders a heading', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
