import { setupServer } from 'msw/node';
import { handlers } from '@/shared/mocks/handlers';
import { getAccounts } from '@/features/accounts/api';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('returns parsed accounts', async () => {
  const accounts = await getAccounts();
  expect(accounts.length).toBeGreaterThan(0);
  expect(accounts[0]).toHaveProperty('balance');
});

