import AddChannelForm from './AddChannelForm';
import { render, screen, userEvent } from '@/test/testConfig';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { channels } from '@/test/mocks';

vi.mock('../contextComponent', () => ({
  useMainContext: () => ({}),
}));

describe('User inputs are calling change handlers', async () => {
  let nameInput: HTMLInputElement;
  const setShowForm = vi.fn();
  const setChannelList = vi.fn();

  beforeEach(() => {
    render(
      <AddChannelForm
        setShowForm={setShowForm}
        setChannelList={setChannelList}
      />
    );
    nameInput = screen.getByTestId('input-channel-name') as HTMLInputElement;
  });

  it('should render a submit button', async () => {
    const submitButton = screen.getByTestId(
      'create-button'
    ) as HTMLButtonElement;
    expect(submitButton).toHaveClass('white-button');
  });

  it('should handle changes when filling in form', async () => {
    await userEvent.type(nameInput, channels[0].name);
    expect(nameInput.value).toBe(channels[0].name);
  });
});
