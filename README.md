# Frontend Trading Table

A real-time trading dashboard application built with modern web technologies.

## Features

- **Real-time Data**: Live updates via WebSocket integration.
- **Token Management**: Comprehensive view and management of trading tokens.
- **Responsive Dashboard**: A fully responsive UI designed for various screen sizes.
- **Atomic Design**: Component architecture following Atomic Design principles for scalability and maintainability.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-trading-table
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build:

```bash
npm run build
# or
pnpm build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
pnpm start
# or
yarn start
```

## Project Structure

```
├── app/                # Next.js App Router pages and layouts
├── components/         # React components (Atomic Design: atoms, molecules, organisms, templates)
├── features/           # Feature-based modules (tokens, websocket)
├── lib/                # Utility functions and shared logic
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://react.dev/learn) - learn React.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn Tailwind CSS.
