import SignupForm from './SignupForm';
import { render, screen } from '@/test/testConfig';
import { describe, it, expect, beforeEach } from 'vitest';
import { user } from '@/test/mocks';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(
    <Router>
      <SignupForm />
    </Router>
  );
});

describe('Elements are rendered correctly', async () => {
  it('should render a submit button', async () => {
    const signupButton = await screen.findByTestId('signup-button');
    expect(signupButton).toHaveClass('signup-button');
  });
});

describe('User inputs are calling change handlers', async () => {
  it('should handle changes when filling in form', async () => {
    const nameInput: HTMLInputElement = await screen.findByTestId('input-name');
    await userEvent.type(nameInput, user.userName);
    expect(nameInput.value).toBe(user.userName);
  });
});
