# Whisper

Whisper is a private, secure chat application that leverages modern cryptography (PGP) to ensure confidentiality and authenticity of all messages. The project is designed for users who value privacy, offering end-to-end encrypted conversations and strong user authentication.

## Features

- **Private 1:1 Chat** – Secure, end-to-end encrypted messaging between users
- **PGP Authentication** – Users log in and verify their identity using their PGP private key
- **Message Encryption** – All chat messages are encrypted with PGP; only the intended recipient can decrypt and read the messages
- **User Management** – Add and manage contacts via PGP public keys
- **Modern UI** – Intuitive and clean user interface for seamless communication
- **No Data Leakage** – No message or key data is ever stored unencrypted

## Technologies Used

- **Frontend:** React.js (with modern JavaScript)
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB (for storing encrypted user and chat metadata)
- **Encryption:** OpenPGP.js (for PGP key generation, encryption, and decryption)
- **Authentication:** PGP signature-based login
- **Other Tools/Libraries:**  
  - Socket.IO (real-time communication)
  - dotenv (environment variable management)
  - JWT (for optional session tokens, signed with PGP)


## Requirements

- **Node.js** (v18+ recommended)
- **npm** (v9+)
- **MongoDB** (local or remote instance)
- Modern browser (for frontend)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ButterSite/Whisper.git
cd Whisper
```

### 2. Environment setup

Copy the `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI and any other configuration:

```
MONGODB_URI=mongodb://localhost:27017/whisper
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 3. Install dependencies

Install both backend and frontend dependencies:

```bash

npm install


cd front-end
npm install
```

### 4. Start the application

#### Backend

```bash
npm start
```

#### Frontend

If using a separate React frontend:

```bash
cd front-end
npm start
```

The backend will run on the port specified in `.env` (default 3000), and the frontend typically on port 3001 or 5173.