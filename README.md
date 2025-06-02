# Nested Tabs App

A React application built with Vite and TypeScript that implements a nested tabs interface.

## Tech Stack

- React 18
- TypeScript
- Vite
- ESLint for code quality

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## ESLint Configuration

This project uses an enhanced ESLint configuration for type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## Additional React Lint Rules

The project includes React-specific lint rules using:
- eslint-plugin-react-x
- eslint-plugin-react-dom

## License

MIT
