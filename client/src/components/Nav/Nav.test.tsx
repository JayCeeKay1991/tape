import Nav from './Nav';
import { render, screen, userEvent } from '@/test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Element renders correctly', async () => {
  const toggleShowLogin = vi.fn();

  const setFormValue = vi.fn();


  beforeEach(() => {
    render(
      <Router>
        <Nav toggleShowLogin={toggleShowLogin} setFormValue={setFormValue} />
      </Router>
    );
  });

  it('should render a login button', async () => {
    const loginButton = screen.getByTestId('login-toggle') as HTMLButtonElement;
    expect(loginButton).toBeVisible();
  });
});

describe('Login form is toggled', async () => {
  const toggleShowLogin = vi.fn();

  const setFormValue = vi.fn();


  beforeEach(() => {
    render(
      <Router>

        <Nav toggleShowLogin={toggleShowLogin} setFormValue={setFormValue}/>

      </Router>
    );
  });

  it('should call toggleShowLogin on click', async () => {
    const loginButton = screen.getByTestId('login-toggle') as HTMLButtonElement;
    await userEvent.click(loginButton);
    expect(toggleShowLogin).toHaveBeenCalled();
  });
});
