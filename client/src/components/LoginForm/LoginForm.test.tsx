import LoginForm from './LoginForm';
import { render, screen, userEvent } from '../../test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { user } from '../../test/mocks';
import { MemoryRouter as Router } from "react-router-dom";

vi.mock('../Component/Component', () => ({
  useMainContext: () => ({})
}));

describe('User inputs are calling change handlers', async () => {
  let emailInput:HTMLInputElement;

  beforeEach(() => {
    render(
      <Router>
        <LoginForm/>
      </Router>
      );
      emailInput = screen.getByTestId('input-email') as HTMLInputElement;
    })

  it('should render a submit button', async () => {
    const loginButton = screen.getByTestId('login-button') as HTMLButtonElement;
    expect(loginButton).toHaveClass('login-button');
  })


  it('should handle changes when filling in form', async () => {
    await userEvent.type(emailInput, user.email);
    expect(emailInput.value).toBe(user.email);
  })

  })