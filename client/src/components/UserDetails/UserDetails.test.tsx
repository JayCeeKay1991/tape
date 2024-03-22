/// <reference types="vitest"/>
/// <reference types="vite/client" />

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/testConfig';
import UserDetails from './UserDetails';
import { updateUser } from '@/services/UserClientService';
import { User } from '../../types/User'; // Assuming you have a type definition for User

// Mock necessary functions and modules
vi.mock('../Context/Context', () => ({
  useMainContext: () => ({
    user: {
      _id: '123',
      userName: 'JohnDoe',
      email: 'john@example.com',
      profilePic: '',
      channels: [],
      mixTapes: [],
    },
    setUser: vi.fn(),
  }),
}));

vi.mock('../../services/UserClientService', () => ({
  updateUser: vi.fn().mockResolvedValue({
    // Mocked updated user object, adjust types as necessary
    _id: '123',
    userName: 'JaneDoe',
    email: 'jane@example.com',
    profilePic: '',
    channels: [],
    mixTapes: [],
  }),
}));

describe('UserDetails component', () => {
  beforeEach(async () => {
    render(<UserDetails />);
  });

  it('allows editing the username and submitting the form', async () => {
    // Trigger edit mode for the username
    const editUsernameButton = screen.getByTestId('edit-username-button'); // Make sure your button has `data-testid="edit-username-button"`
    await userEvent.click(editUsernameButton);

    // Find the username input and update its value
    const usernameInput = screen.getByRole('textbox', { name: /username/i }) as HTMLInputElement;
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, 'JaneDoe');

    // Find and click the save button
    const saveButton = screen.getByTestId('save-username-button'); // Make sure your save button has `data-testid="save-username-button"`
    await userEvent.click(saveButton);

    // Assertions to verify the behavior
    expect(usernameInput.value).toBe('JaneDoe');
    expect(vi.mocked(updateUser)).toHaveBeenCalledWith(expect.anything()); // Verify that updateUser was called with the expected parameters
  });
});
