# Arch Network Wallet Integration

This is a comprehensive project demonstrating how to integrate Arch Network wallets into a React application using modern web technologies and Bitcoin wallet adapters.

## About Arch Network Wallet Compatibility

Arch supports **Taproot address compatibility**, which means users can continue using their existing Bitcoin wallets to interact with Arch functionality without needing bridging or new wallet setup.

### Supported Wallets

This project supports integration with popular Bitcoin wallets that are compatible with Arch's Taproot-based account model:

- **Xverse** - Multi-chain Bitcoin wallet with Taproot support
- **UniSat** - Bitcoin wallet focused on Ordinals and Taproot functionality
- **Magic Eden** - Comprehensive wallet supporting Bitcoin and other chains
- **Ledger** - Hardware wallet with Taproot compatibility (via supported software interfaces)

_No bridging required_ - Your existing Bitcoin wallet addresses work directly with Arch Network!

## Documentation

- [Arch Network Overview](https://docs.arch.network/learn/architecture/overview) - Learn about Arch Network's architecture and capabilities
- [Saturn BTC Documentation](https://docs.saturnbtc.io/) - Comprehensive guide for Bitcoin development tools and PSBT utilities
- [Arch Network Book](https://book.arch.network/) - Official documentation and guides for Arch Network development

## Technical Resources

- [Bitcoin Wallet Adapter](https://github.com/SaturnBTC/btc-wallet-adapter) - Bitcoin wallet adapter library
- [Next.js Documentation](https://nextjs.org/docs) - Next.js framework documentation
- [React Documentation](https://reactjs.org/docs) - React library documentation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind CSS framework documentation

## Tech Stack

- **React** - Frontend framework for building user interfaces
- **Next.js** - React-based framework for production applications
- **TypeScript** - Typed superset of JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Bitcoin Wallet Adapter** - Library for Bitcoin wallet integration
- **PSBT (Partially Signed Bitcoin Transactions)** - For secure transaction handling

## Getting Started

To get started, you'll need to have Node.js and npm installed. You can download them from the [official Node.js website](https://nodejs.org/).

### Clone the repository:

```bash
git clone https://github.com/reecen9696/arch-network-wallet-integration.git
```

### Change into the project directory:

```bash
cd arch-network-wallet-integration
```

### Install dependencies:

```bash
npm install
```

### Start the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`. You can access the app by visiting this URL in your web browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

## Packages Used

- `@bitcoin-wallet-adapter/core` - Core Bitcoin wallet adapter functionality
- `@saturnbtcio/psbt` - PSBT utilities for Bitcoin transactions
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM utilities
- `tailwindcss` - CSS framework
- `typescript` - Type checking and development
