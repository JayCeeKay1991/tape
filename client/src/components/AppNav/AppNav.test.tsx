import AppNav from './AppNav';
import { render, screen } from '@/test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { user } from '@/test/mocks';
import { MemoryRouter as Router } from 'react-router-dom';

vi.mock('../Context/Context', () => ({
  useMainContext: () => ({
    user: user,
  }),
}));

describe('Element renders correctly', async () => {
  beforeEach(() => {
    render(
      <Router>
        <AppNav />
      </Router>
    );
  });

  it('should render a logout button', async () => {
    const logoutButton = screen.getByTestId(
      'logout-button'
    ) as HTMLButtonElement;
    expect(logoutButton).toBeVisible();
  });

  it("should render the user's profile image", async () => {
    const profileImage = screen.getByTestId(
      'profile-image'
    ) as HTMLImageElement;
    expect(profileImage).toBeVisible();
    expect(profileImage.src).toBe(user.profilePic);
  });
});
