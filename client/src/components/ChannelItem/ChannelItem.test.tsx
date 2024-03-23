import ChannelItem from './ChannelItem';
import { render, screen } from '@/test/testConfig';
import { describe, it, expect, beforeEach } from 'vitest';
import { channels } from '@/test/mocks';
import { MemoryRouter as Router } from 'react-router-dom';

beforeEach(() => {
  render(
    <Router>
      <ChannelItem channel={channels[0]} />
    </Router>
  );
});

describe('Element is correctly rendered', async () => {
  it('should render the channel image', async () => {
    const channelPicture = screen.getByTestId(
      'channel-picture'
    ) as HTMLImageElement;
    expect(channelPicture).toHaveClass('object-cover');
  });
  it('should render the channel name', async () => {
    const channelName = screen.getByTestId('channel-name') as HTMLImageElement;
    expect(channelName).toBeVisible();
  });
});
