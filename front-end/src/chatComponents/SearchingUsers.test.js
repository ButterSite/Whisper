import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SearchingUsers } from './SearchingUsers';
import fetchApi from '../assets/apiFetcher';
import '@testing-library/jest-dom';

jest.mock('../assets/apiFetcher');
jest.mock('./EncryptedBox', () => () => <div>Mocked EncryptedBox</div>);

const mockStore = configureStore([]);

describe('SearchingUsers', () => {
  const store = mockStore({
    friends: { list: [], isUnlocked: true },
  });

  let getUserMock, addFriendMock;

  beforeEach(() => {
    getUserMock = jest.fn().mockResolvedValue({ recipient: 'testUser', publicKey: 'testKey' });
    addFriendMock = jest.fn().mockResolvedValue({ success: true, message: 'Friend added' });
    fetchApi.mockImplementation(() => ({
      getUser: getUserMock,
      addFriend: addFriendMock,
    }));
  });

  test('renders search input and button', () => {
    render(
      <Provider store={store}>
        <SearchingUsers />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Search user')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('displays error when search input is empty', async () => {
    render(
      <Provider store={store}>
        <SearchingUsers />
      </Provider>
    );
    fireEvent.click(screen.getByText('Search'));
    await waitFor(() => {
      expect(screen.getByText('Username not provided')).toBeInTheDocument();
    });
  });

  test('displays found user after search', async () => {
    render(
      <Provider store={store}>
        <SearchingUsers />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Search user'), { target: { value: 'testUser' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('testUser')).toBeInTheDocument();
    });
  });

  test('adds friend on click', async () => {
    render(
      <Provider store={store}>
        <SearchingUsers />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Search user'), { target: { value: 'testUser' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      const addIcon = screen.getByTestId('add-friend-icon');
      fireEvent.click(addIcon);
      expect(addFriendMock).toHaveBeenCalledWith({
        username: 'testUser',
        publicKey: 'testKey',
      });
    });
  });
});