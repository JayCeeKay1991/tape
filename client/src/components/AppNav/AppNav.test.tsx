import { sum } from '../../test/sum'
import { expect, test } from 'vitest'

test('adds 1+2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})



// import AppNav from './AppNav';
// import { render, screen, userEvent } from '../../test/testConfig';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { channels, user } from '../../test/mocks';
// import App from '../App/App';

// vi.mock('../Context/Context', () => ({
//   useMainContext: () => ({
//     user: user
//   })
// }));

// describe('Element renders correctly', async () => {

//   beforeEach(() => {
//     render(
//       <App/>
//       );
//     })

//   it('should render a logout button', async () => {
//     const logoutButton = screen.getByTestId('logout-button') as HTMLButtonElement;
//     expect(logoutButton).toBeVisible();
//   })

// })