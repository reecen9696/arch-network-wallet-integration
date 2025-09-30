# HoneyB - Bitcoin Wallet Integration

A minimal Next.js app with Bitcoin wallet adapter integration using TypeScript and Tailwind CSS.

## 🚀 Features

- ✅ **Next.js 15** with TypeScript
- ✅ **Tailwind CSS v4** for styling
- ✅ **Bitcoin Wallet Integration** (UniSat, Xverse, Magic Eden)
- ✅ **React Context** for wallet state management
- ✅ **Network Selection** (Mainnet/Testnet)
- ✅ **Clean UI Components** with dark mode support
- ✅ **Error Handling** and loading states

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser.

## 🔧 Bitcoin Wallet Adapter Setup

Currently, the app uses mock implementations for wallet connections. To integrate with real Bitcoin wallets, you'll need to:

### 1. Install the Bitcoin Wallet Adapter

```bash
npm install @bitcoin-wallet-adapter/core
```

### 2. Update the useWallet hook

Replace the temporary types and mock implementations in `src/hooks/useWallet.ts` with the actual Bitcoin wallet adapter imports:

```typescript
import {
  BitcoinWallet,
  WalletName,
  WalletException,
  UnsignedPsbt,
  UnisatWallet,
  XverseWallet,
  MagicEdenWallet,
} from '@bitcoin-wallet-adapter/core';
import { Network } from '@saturnbtcio/psbt';
```

### 3. Update the wallet connection logic

Replace the mock wallet initialization with actual wallet adapters:

```typescript
switch (walletName) {
  case 'unisat':
    walletInstance = await UnisatWallet.initialize(network);
    break;
  case 'xverse':
    walletInstance = await XverseWallet.initialize(network);
    break;
  case 'magic-eden':
    walletInstance = await MagicEdenWallet.initialize(network);
    break;
  default:
    throw new Error('Unsupported wallet');
}
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with WalletProvider
│   └── page.tsx             # Main page with wallet integration
├── components/
│   └── WalletConnect.tsx    # Wallet connection UI component
├── contexts/
│   └── WalletContext.tsx    # React context for wallet state
└── hooks/
    └── useWallet.ts         # Custom hook for wallet operations
```

## 🎨 UI Components

### WalletConnect Component

- Network selection (Mainnet/Testnet)
- Support for multiple wallet types
- Loading states and error handling
- Clean, responsive design with dark mode

### Features Include:

- **Connect/Disconnect** functionality
- **Address Display** - Shows payment and rune addresses
- **PSBT Signing** capability (when integrated)
- **Network Switching** between mainnet and testnet
- **Error Handling** with user-friendly messages

## 🔮 Next Steps

1. **Install Real Wallet Adapter**: Replace mock implementations with actual Bitcoin wallet adapter
2. **Add Transaction Features**: Implement transaction creation and broadcasting
3. **Add Balance Display**: Show wallet balances and UTXOs
4. **Add Rune Support**: Implement rune token operations
5. **Add Transaction History**: Display wallet transaction history

## 🛠️ Development

The app is built with:

- **Next.js 15** for the React framework
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **React Context** for state management

## 📝 Notes

- The current implementation uses mock wallet connections for development
- Replace mock implementations with actual Bitcoin wallet adapter when ready
- Ensure proper error handling for production use
- Test thoroughly on both mainnet and testnet before production deployment

## 🔗 Links

- [Bitcoin Wallet Adapter GitHub](https://github.com/SaturnBTC/btc-wallet-adapter)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
