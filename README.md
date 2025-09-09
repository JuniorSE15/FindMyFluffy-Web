# Find My Fluffy Web 🐾

A modern web application for helping pet owners locate their missing pets and connect with their community. Built with Next.js 15 and designed with a focus on user experience and performance.

## 📋 Overview

Find My Fluffy is a comprehensive pet-finding platform that aims to reunite lost pets with their families. The application provides tools for reporting missing pets, browsing found animals, and facilitating community-driven pet recovery efforts.

## ✨ Features

- **Pet Reporting System**: Easy-to-use forms for reporting lost and found pets
- **Community Dashboard**: Browse and search through reported pets in your area
- **Real-time Updates**: Get notified when potential matches are found
- **Secure Authentication**: Safe and secure user accounts
- **Mobile Responsive**: Optimized for all devices
- **Modern UI/UX**: Clean, intuitive interface built with Tailwind CSS

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Forms**: React Hook Form with Zod validation
- **Development**: Turbopack for fast builds and hot reloading
- **Code Quality**: ESLint, Prettier, Husky, and lint-staged
- **Deployment**: Optimized for Vercel

## 🏗️ Project Structure

```
src/
├── app/                # Next.js App Router pages
├── components/         # Reusable UI components
├── services/           # API services and data fetching
├── dto/                # Data Transfer Objects
├── types/              # TypeScript type definitions
├── schemas/            # Zod validation schemas
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── stores/             # State management
├── enums/              # TypeScript enums
└── utils/              # Utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd FindMyFluffy-Web
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration values.

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting
- `pnpm prepare` - Set up Husky git hooks

## 🔧 Development

This project uses several tools to maintain code quality:

- **Husky**: Git hooks for pre-commit validation
- **lint-staged**: Run linters on staged files
- **Prettier**: Code formatting
- **ESLint**: Code linting and error detection
- **TypeScript**: Type checking

All code is automatically formatted and validated before commits.

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
# Add other environment variables as needed
```

## 🚀 Deployment

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Configure your environment variables
4. Deploy!

For other deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

---

Built with ❤️ for reuniting pets with their families.
