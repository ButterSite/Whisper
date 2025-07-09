import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Messages } from './Messages';
import io from 'socket.io-client';
import { encryptMessage } from '../assets/encryption';
import { useNavigate } from 'react-router';

jest.mock('socket.io-client');
jest.mock('../assets/encryption');
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({ pathname: '/chat' })),
  useParams: jest.fn(() => ({})),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

describe('Messages', () => {
  const setMessages = jest.fn();
  const mockEmit = jest.fn();
  const mockSocket = {
    on: jest.fn(),
    emit: mockEmit,
    disconnect: jest.fn(),
    connect: jest.fn(),
  };

  const initialProps = {
    recipient: { username: 'friend1', publicKey: 'key1' },
    messages: [{ user: 'friend1', msg: 'Hello' }],
    setMessages,
  };

  beforeEach(() => {
    io.mockReturnValue(mockSocket);
    useNavigate.mockClear();
    useNavigate.mockReturnValue(jest.fn());
    encryptMessage.mockClear();
    setMessages.mockClear();
    localStorage.clear();
  });

  test('renders recipient username and messages', () => {
    render(<Messages {...initialProps} />);
    const usernameElements = screen.getAllByText('friend1');
    expect(usernameElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('sends message with encryption', async () => {
    encryptMessage.mockResolvedValueOnce('encryptedMessage');
    localStorage.setItem('jwtToken', 'fakeToken');

    render(<Messages {...initialProps} />);

    fireEvent.change(screen.getByPlaceholderText('Type your message...'), {
      target: { value: 'Test message' },
    });
    fireEvent.click(screen.getByText('send'));

    await waitFor(() => {
      expect(encryptMessage).toHaveBeenCalledWith('key1', 'Test message');
      expect(mockEmit).toHaveBeenCalledWith('privateMessage', {
        recipient: 'friend1',
        message: 'encryptedMessage',
      });
      expect(setMessages).toHaveBeenCalledWith(expect.any(Function));
      expect(screen.getByPlaceholderText('Type your message...')).toHaveValue('');
    });
  });

  test('toggles encryption icon', () => {
    render(<Messages {...initialProps} />);
    expect(screen.getByText('lock')).toBeInTheDocument();
    fireEvent.click(screen.getByText('lock'));
    expect(screen.getByText('lock_open')).toBeInTheDocument();
  });

  test('sets up socket listener for privateMessage', () => {
    localStorage.setItem('jwtToken', 'fakeToken');
    render(<Messages {...initialProps} />);
    expect(mockSocket.on).toHaveBeenCalledWith('privateMessage', expect.any(Function));
  });

  test('disables input and button when no recipient', () => {
    render(<Messages {...initialProps} recipient={null} />);
    expect(screen.getByPlaceholderText('Type your message...')).toBeDisabled();
    expect(screen.getByText('send').closest('button')).toBeDisabled();
  });
});
