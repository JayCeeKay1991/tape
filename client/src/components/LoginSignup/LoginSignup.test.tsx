import LoginSignup from './LoginSignup';
import { render, screen } from '@/test/testConfig';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Login is rendered correctly', async () => {
  beforeEach(() => {
    const formValue = 'login';
    const toggleShowLogin = vi.fn();

    render(
      <Router>
        <LoginSignup formValue={formValue} toggleShowLogin={toggleShowLogin} />
      </Router>
    );
  });

  it('should render the login component if login', async () => {
    const loginHeader = await screen.findByTestId('login-header');
    expect(loginHeader).toBeVisible();
  });
});

describe('Signup is rendered correctly', async () => {
  beforeEach(() => {
    const formValue = 'sigUp';
    const toggleShowLogin = vi.fn();

    render(
      <Router>
        <LoginSignup formValue={formValue} toggleShowLogin={toggleShowLogin} />
      </Router>
    );
  });

  it('should render the signup component if signup', async () => {
    const signupHeader = await screen.findByTestId('signup-header');
    expect(signupHeader).toBeVisible();
  });
});
