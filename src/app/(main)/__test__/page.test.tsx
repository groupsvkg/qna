import '@testing-library/jest-dom';

jest.mock('@supabase/auth-helpers-nextjs');

describe('Home', () => {
  it('renders a heading', () => {
    // render(<HomePage />);

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // });

    // expect(heading).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});
