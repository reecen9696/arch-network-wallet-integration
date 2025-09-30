# Arch Network Wallet Integration

This is a comprehensive project demonstrating how to integrate Arch Network wallets into a React application using modern web technologies and Bitcoin wallet adapters.

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

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # Reusable React components
│   ├── Navbar.tsx         # Navigation bar with logo and wallet button
│   ├── WalletButton.tsx   # Wallet connection button
│   └── WalletModal.tsx    # Wallet selection modal
├── contexts/      # React context providers
└── hooks/         # Custom React hooks
```

## Working of the Project

This project demonstrates how to integrate Bitcoin and Arch Network wallets into a React application. The app is built with Next.js and provides a seamless wallet connection experience for users.

### Key Components:

- **Navbar.tsx**: The main navigation component that displays the Arch Network logo and wallet connection button
- **WalletButton.tsx**: Interactive button for wallet connection and disconnection
- **WalletModal.tsx**: Modal interface for selecting from available wallet options
- **Wallet Context**: Manages wallet state and provides connection functionality throughout the app

### Features:

- **Multi-wallet Support**: Connect with various Bitcoin-compatible wallets
- **Secure Transactions**: Uses PSBT for secure transaction handling
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience
- **Modern Architecture**: Built with Next.js App Router for optimal performance

## Wallet Integration

The project uses the Bitcoin Wallet Adapter to provide a standardized interface for wallet connections. This allows users to connect with various Bitcoin wallets while maintaining a consistent user experience.

### Supported Features:

- Wallet connection and disconnection
- Address retrieval
- Transaction signing
- PSBT handling
- Network switching

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git for version control

### Development Workflow

1. Make your changes in the appropriate component files
2. Test your changes using `npm run dev`
3. Run linting with `npm run lint`
4. Build for production with `npm run build`

## Contribution

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

We welcome all contributions, including:

- Bug fixes
- Feature enhancements
- Documentation improvements
- Performance optimizations
- UI/UX improvements

## Issues

If you encounter any issues while using this project, please:

1. Check the existing issues on the GitHub repository
2. Create a new issue with detailed information including:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (OS, Node.js version, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).

## Links

- [Arch Network Documentation](https://docs.arch.network/)
- [Bitcoin Wallet Adapter](https://github.com/SaturnBTC/btc-wallet-adapter)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
