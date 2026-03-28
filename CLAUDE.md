# DevBoard — Claude Instructions

This is a **learning and portfolio project**. Code quality is the priority.
When reviewing or writing code, enforce everything below — do not skip anything to be polite.

## Code Review Checklist

Every review must cover all sections, not just lint/format.

### TypeScript

- Zero `any` — always type explicitly
- No non-null assertions (`!`) unless there is no alternative and a comment explains why
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use utility types where appropriate (`Pick`, `Omit`, `ReturnType`, `Partial`)
- All function parameters and return types must be typed (no implicit `any` from inference gaps)

### React & Next.js

- Server Components by default — only add `"use client"` when strictly necessary (event handlers, hooks, browser APIs)
- Server Actions must live in dedicated `actions.ts` files with `"use server"` at the top of the file, not inside components
- No `useEffect` for data fetching — use TanStack Query (`useQuery`) or Server Components
- Custom hooks must start with `use` and live in `src/hooks/`
- Components must do one thing — split if a component has more than one responsibility
- No inline styles — always use Tailwind tokens
- No hardcoded colors (e.g. `bg-[#1e1e1e]`) — use design tokens defined in `globals.css`
- Avoid `React.FC` — use plain function declarations with typed props
- Memoize with `useMemo`/`useCallback` only when there is a measurable reason

### File & Folder Conventions

- Pages: `src/app/**/page.tsx`
- Server Actions: `src/app/**/actions.ts`
- Reusable components: `src/components/`
- UI primitives (shadcn + custom): `src/components/ui/`
- Business logic / API clients: `src/lib/`
- Custom hooks: `src/hooks/`
- Zustand stores: `src/store/`
- Types shared across the app: `src/types/`
- Tests live next to the file they test: `ComponentName.test.tsx`

### Imports

- Always use the `@/` alias — never relative paths (`../../`)
- Import order (enforced by eslint-plugin-import):
  1. External libraries
  2. _(blank line)_
  3. Internal `@/` imports
- No barrel `index.ts` re-exports unless there are 4+ exports from the same folder

### Naming

- Components: `PascalCase`
- Hooks: `camelCase` with `use` prefix
- Files: `PascalCase` for components, `camelCase` for hooks/utils/libs
- Zustand stores: `useXxxStore`
- Server Actions: descriptive verbs — `createTimerSession`, `toggleLearningItem`
- Boolean props/variables: `is`, `has`, `can` prefix (`isLoading`, `hasError`)

### Styling

- Use design tokens from `globals.css` (`bg-surface-card`, `text-text-muted-1`, `text-accent`)
- Use shadcn/ui components before writing custom ones
- Use `cn()` for conditional class merging — never string concatenation
- No magic numbers in dimensions — prefer Tailwind scale or a named token

### Data & State

- Server state (API, DB): TanStack Query
- Client-only UI state: Zustand or `useState` (for local/ephemeral state)
- No prop drilling beyond 2 levels — lift to Zustand or context
- Server Actions for all DB mutations — no API routes unless strictly necessary

### Error Handling

- Every async Server Action must have try/catch and return a typed result `{ success, error }`
- Every `useQuery` must handle `isError` state in the UI
- Add `<ErrorBoundary>` around sections that fetch data

### Testing

- Every custom hook must have a test file
- Every non-trivial component must have at least a render test
- Use MSW handlers in `src/test/msw/handlers.ts` for API mocking — never mock `fetch` manually
- Test file lives next to the source file: `useFoo.ts` → `useFoo.test.ts`

### General

- No commented-out code
- No `console.log` in committed code — use proper error handling
- No `TODO` comments without a GitHub issue reference
- Keep components under ~150 lines — split if longer
- Every PR/commit should leave the codebase cleaner than it found it
