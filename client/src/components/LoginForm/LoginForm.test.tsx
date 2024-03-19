import LoginForm from './LoginForm';
import { render, screen } from '../../test/testConfig';
import { describe, it, expect, beforeEach } from 'vitest';
import { user } from '../../test/mocks';
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  render(
    <Router>
      <LoginForm />
    </Router>
    );
  })


describe('Elements are rendered correctly', async () => {

  it('should render a submit button', async () => {
    const loginButton = await screen.findByTestId('login-button');
    expect(loginButton).toHaveClass('login-button');
  })
})


describe('User inputs are calling change handlers', async () => {
  it('should handle changes when filling in form', async () => {
    const emailInput:HTMLInputElement = await screen.findByTestId('input-email');
    await userEvent.type(emailInput, user.email);
    expect(emailInput.value).toBe(user.email);
  })

});

