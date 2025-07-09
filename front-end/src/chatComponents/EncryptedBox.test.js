import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EncryptedBox } from './EncryptedBox';
import { decryptObject } from '../assets/encryption';
import '@testing-library/jest-dom';

jest.mock('../assets/encryption');

describe('EncryptedBox', () => {
  const setList = jest.fn();
  const setUnlock = jest.fn();
  const initialProps = {
    encryptionType: 'Your friends list is encrypted',
    encryptedList: 'encryptedData',
    setList,
    setUnlock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders EncryptedBox with correct text', () => {
    render(<EncryptedBox {...initialProps} />);
    expect(screen.getByText(/Your friends list is encrypted/)).toBeInTheDocument();
    expect(screen.getByText(/please provide the password/)).toBeInTheDocument();
    expect(screen.getByText('encrypted')).toBeInTheDocument();
  });

  test('displays error when password is empty', async () => {
    render(<EncryptedBox {...initialProps} />);
    fireEvent.click(screen.getByText('Confirm'));
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('calls decryptObject and updates state on valid password', async () => {
    decryptObject.mockResolvedValueOnce([{ username: 'friend1', publicKey: 'key1' }]);
    render(<EncryptedBox {...initialProps} />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testPass' } });
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(decryptObject).toHaveBeenCalledWith('encryptedData', 'testPass');
      expect(setList).toHaveBeenCalledWith([{ username: 'friend1', publicKey: 'key1' }]);
      expect(setUnlock).toHaveBeenCalledWith(true);
    });
  });

  test('displays error on wrong password', async () => {
    decryptObject.mockResolvedValueOnce(false);
    render(<EncryptedBox {...initialProps} />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongPass' } });
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.getByText('Wrong password')).toBeInTheDocument();
      expect(setList).not.toHaveBeenCalled();
      expect(setUnlock).not.toHaveBeenCalled();
    });
  });
});