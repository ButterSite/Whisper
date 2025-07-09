import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { FriendList } from './FriendsList';
import fetchApi from '../assets/apiFetcher';
import { EncryptedBox } from './EncryptedBox';

jest.mock('../assets/apiFetcher');
jest.mock('./EncryptedBox', () => ({
  EncryptedBox: () => <div>Mocked EncryptedBox</div>
}))

const mockStore = configureStore([]);

describe('FriendList', () => {
  const setRecipient = jest.fn();
  const initialProps = { setRecipient, recipient: null };
  const store = mockStore({
    friends: { list: [{ username: 'friend1', publicKey: 'key1' }], isUnlocked: true },
  });

  beforeEach(() => {
    fetchApi.mockImplementation(() => ({
      getFriends: jest.fn().mockResolvedValue({
        isEncrypted: false,
        friendsList: [{ username: 'friend1', publicKey: 'key1' }],
      }),
    }));
  });

  test('renders friends list when unlocked', async () => {
    render(
      <Provider store={store}>
        <FriendList {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('friend1')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  test('renders EncryptedBox when locked', async () => {
    const lockedStore = mockStore({
      friends: { list: [], isUnlocked: false },
    });
    fetchApi.mockImplementation(() => ({
      getFriends: jest.fn().mockResolvedValue({
        isEncrypted: true,
        friendsList: 'encryptedData',
      }),
    }));

    render(
      <Provider store={lockedStore}>
        <FriendList {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Mocked EncryptedBox')).toBeInTheDocument();
    });
  });

  test('renders NoFriendsContainer when friends list is empty', async () => {
    const emptyStore = mockStore({
      friends: { list: [], isUnlocked: true },
    });
    render(
      <Provider store={emptyStore}>
        <FriendList {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Start talking safely with your friends!')).toBeInTheDocument();
    });
  });

  test('sets recipient on friend click', async () => {
    render(
      <Provider store={store}>
        <FriendList {...initialProps} />
      </Provider>
    );

    await waitFor(() => {
      const friendElement = screen.getByText('friend1');
      fireEvent.click(friendElement);
      expect(setRecipient).toHaveBeenCalledWith({ username: 'friend1', publicKey: 'key1' });
    });
  });
});