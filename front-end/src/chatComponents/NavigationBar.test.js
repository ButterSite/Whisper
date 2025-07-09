import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';
import { Provider } from 'react-redux';
import store from '../store/store';

jest.mock('./FriendsList', () => ({
  FriendList: () => <div>Mocked FriendList</div>
}));

jest.mock('./SearchingUsers', () => ({
  SearchingUsers: () => <div>Mocked SearchingUsers</div>
}));

describe('NavigationBar', () => {
  const setRecipient = jest.fn();
  const initialProps = { setRecipient, recipient: '' };

  test('renders FriendList by default', () => {
    render(
      <Provider store={store}>
        <NavigationBar {...initialProps} />
      </Provider>
    );
    expect(screen.getByText('Mocked FriendList')).toBeInTheDocument();
  });

  test('switches to SearchingUsers on click', () => {
    render(
      <Provider store={store}>
        <NavigationBar {...initialProps} />
      </Provider>
    );
    fireEvent.click(screen.getByTestId('search-icon'));
    expect(screen.getByText('Mocked SearchingUsers')).toBeInTheDocument();
  });
});