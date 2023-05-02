import { render, screen } from '@testing-library/react';
import { NavBar } from '../NavBar';
import { NavBarLinks } from '@/consts/NavBarLinks';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('NavBar', () => {
  test('deve renderizar os links corretamente', () => {
    useRouter.mockImplementation(() => ({
      pathname: '/',
    }));

    const tree = render(<NavBar />);
    expect(tree).toMatchSnapshot();
  });

  test('deve destacar o link ativo corretamente', () => {
    useRouter.mockImplementation(() => ({
      pathname: '/transaction',
    }));

    render(<NavBar />);

    expect(screen.getByText('Lançamentos').parentElement).toHaveClass('text-gray-800');
  });
});
