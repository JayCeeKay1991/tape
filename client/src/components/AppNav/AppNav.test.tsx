import AppNav from './AppNav';
import { render, screen } from '../../test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { user } from '../../test/mocks';
import { MemoryRouter as Router } from "react-router-dom";


vi.mock('../Context/Context', () => ({
  useMainContext: () => ({
    user: user
  })
}));

beforeEach(() => {
    render(
        <Router>
            <AppNav/>
        </Router>
      );
    })

describe('Element renders correctly', async () => {

  it('should render a logout button', async () => {
    const logoutButton = screen.getByTestId('logout-button') as HTMLButtonElement;
    expect(logoutButton).toBeVisible();
  })
})
