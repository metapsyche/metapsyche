# Development Guide

This guide covers local development setup for the Metapsyche application.

## Prerequisites

- Node.js 18+ and npm
- AWS Account (for running Amplify sandbox)
- Git

## Initial Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd metapsyche
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Amplify Sandbox** (required for backend):
   ```bash
   npx ampx sandbox
   ```
   
   This command:
   - Creates temporary AWS resources in your account
   - Generates `amplify_outputs.json` with connection details
   - Watches for backend changes and auto-deploys
   - Provides a local backend environment

   **Important**: Keep this terminal running. The sandbox creates real AWS resources that are automatically cleaned up when you stop it (Ctrl+C).

4. **Start the development server** (in a new terminal):
   ```bash
   npm run dev
   ```

5. **Open the app**:
   - Navigate to `http://localhost:5173`
   - The app will hot-reload as you make changes

## Project Structure

```
metapsyche/
├── amplify/                    # Backend configuration
│   ├── auth/                  # Cognito authentication setup
│   │   └── resource.ts       
│   ├── data/                  # GraphQL schema and data models
│   │   └── resource.ts       
│   ├── backend.ts             # Backend definition
│   ├── package.json           # Backend package config
│   └── tsconfig.json          # Backend TypeScript config
│
├── src/                        # React application
│   ├── assets/                # Static assets
│   ├── App.tsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   ├── vite-env.d.ts          # Vite type definitions
│   └── amplify-outputs.d.ts   # Amplify config types
│
├── public/                     # Public static files
├── amplify.yml                 # Amplify CI/CD configuration
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # Project overview
```

## Available Scripts

- **`npm run dev`**: Start development server (port 5173)
- **`npm run build`**: Build for production
- **`npm run preview`**: Preview production build locally
- **`npm run lint`**: Lint code with ESLint

## Backend Development

### Modifying the Data Schema

Edit `amplify/data/resource.ts` to change your GraphQL schema:

```typescript
const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    isDone: a.boolean(),  // Add new fields
  })
  .authorization((allow) => [allow.publicApiKey()]),
});
```

The sandbox automatically detects changes and redeploys.

### Modifying Authentication

Edit `amplify/auth/resource.ts`:

```typescript
export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: true,  // Add phone authentication
  },
});
```

### Adding New Backend Resources

Create new resource files in the `amplify/` directory and import them in `backend.ts`:

```typescript
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';  // New resource

defineBackend({
  auth,
  data,
  storage,
});
```

## Frontend Development

### Using the Data Client

```typescript
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

// Create
await client.models.Todo.create({ content: 'New todo' });

// List
const { data: todos } = await client.models.Todo.list();

// Update
await client.models.Todo.update({ id: 'todo-id', content: 'Updated' });

// Delete
await client.models.Todo.delete({ id: 'todo-id' });

// Real-time subscription
client.models.Todo.observeQuery().subscribe({
  next: (data) => console.log(data.items),
});
```

### Authentication UI

The project uses Amplify UI React components:

```typescript
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
```

## Environment Variables

Vite exposes environment variables prefixed with `VITE_`:

1. Create `.env.local`:
   ```
   VITE_API_ENDPOINT=https://example.com
   ```

2. Access in code:
   ```typescript
   const endpoint = import.meta.env.VITE_API_ENDPOINT;
   ```

**Note**: `.env.local` is gitignored. Never commit secrets.

## Troubleshooting

### "Cannot find module '../amplify_outputs.json'"

This error means the Amplify sandbox isn't running:
- Run `npx ampx sandbox` in a separate terminal
- Wait for it to generate `amplify_outputs.json`
- Restart your dev server

### Authentication not working

- Ensure the sandbox is running
- Check the browser console for errors
- Verify `amplify_outputs.json` exists and contains valid configuration

### GraphQL errors

- Check the AppSync logs in the AWS Console
- Verify your schema in `amplify/data/resource.ts`
- Ensure authorization rules match your use case

### Build errors

- Clear the cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Verify TypeScript compilation: `npx tsc --noEmit`

## Sandbox vs. Production

| Feature | Sandbox | Production |
|---------|---------|-----------|
| Resources | Temporary, deleted on exit | Permanent, managed by Amplify |
| Cost | Minimal (dev usage) | Based on actual traffic |
| Data | Wiped on restart | Persistent |
| Use Case | Local development | Live application |

## Testing

### Unit Tests

Add a test framework like Vitest:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Configure in `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```

### E2E Tests

Consider Playwright or Cypress for end-to-end testing.

## Code Quality

### Linting

```bash
npm run lint
```

Fix automatically:
```bash
npm run lint -- --fix
```

### Type Checking

```bash
npx tsc --noEmit
```

## Git Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push and create a pull request:
   ```bash
   git push origin feature/my-feature
   ```

## Additional Resources

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support

For issues or questions, open an issue in the repository or check existing discussions.
