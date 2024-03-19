import LoginForm from './LoginForm';
import { render, screen } from '../../test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { user } from '../../test/mocks';
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from '@testing-library/user-event';


vi.mock('../Component/Component', () => ({
  useMainContext: () => ({
    handleLogin: vi.fn()
  })
}));


describe('User inputs are calling change handlers', async () => {
  beforeEach(() => {
  render(
    <Router>
      <LoginForm />
    </Router>
    );
  })

  it('should render a submit button', async () => {
    const loginButton = await screen.findByTestId('login-button');
    expect(loginButton).toHaveClass('login-button');
  })

  it('should handle changes when filling in form', async () => {
    const emailInput:HTMLInputElement = await screen.findByTestId('input-email');
    await userEvent.type(emailInput, user.email);
    expect(emailInput.value).toBe(user.email);
  })

});

// describe('Login button calls login function', async () => {
//   const handleLogin = vi.fn();

//   beforeEach(() => {
//    render(
//      <Router>
//        <LoginForm handleLogin={handleLogin} />
//      </Router>
//      );
//   })

//   it('should should call the submithandler on submit', async () => {
//   const loginButton = await screen.getByTestId('login-button');
//   await userEvent.click(loginButton);
//   expect(handleLogin).toHaveBeenCalled();
//   })
// });