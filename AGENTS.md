# AGENTS.md

Canonical instruction file for this repository, shared by all coding agents
(Claude Code, Codex, Cursor, and others). Claude Code reaches it through the
`@AGENTS.md` import in `CLAUDE.md`. Repository guidance belongs here, while
tool-specific pointer files contain no duplicate guidance.

## Project knowledge

<!--
Fill this in as the project develops. Keep it under a page so stale context does
not burden every session. When an agent makes the same mistake twice, record the
correction here.
-->

### Project Overview

Vue 3 Carousel is a modern, lightweight carousel component library for Vue 3. It's distributed as a reusable component library with TypeScript support, offering responsive breakpoints, infinite scrolling, touch/mouse drag, keyboard navigation, and accessibility features.

### Development Commands

#### Build and Development
- `pnpm build` - Build the library for production (generates UMD, ESM, and CJS formats in `dist/`)
- `pnpm dev` - Start the Vite development server with the playground app
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm typecheck:watch` - Run TypeScript type checking in watch mode

#### Testing
- `pnpm test` - Run all tests with Vitest and generate coverage report
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:update` - Update test snapshots

Running a subset (the `test` script always adds `--coverage`, so call `vitest` directly):
- `pnpm vitest run src/utils/throttle.spec.ts` - a single file
- `pnpm vitest run tests/integration` - a single directory
- `pnpm vitest run -t 'should throttle'` - tests matching a name
- `pnpm vitest watch src/components/Carousel` - watch one path

#### Code Quality
- `pnpm lint` - Lint the codebase with ESLint
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm prettier` - Check code formatting
- `pnpm prettier:fix` - Auto-format code with Prettier

#### Documentation
- `pnpm docs:dev` - Start VitePress documentation site in development mode
- `pnpm docs:build` - Build documentation site for production
- `pnpm docs:serve` - Preview built documentation site

#### Release
- `pnpm release` - Runs `scripts/new-release.sh`

### Architecture

#### Component Structure

The library follows a provider/inject pattern for component communication:

1. **Carousel Component** (`src/components/Carousel/Carousel.ts`) - The main container component that:
   - Manages slide state and registry via `createSlideRegistry()`
   - Provides configuration and state to child components via Vue's `provide()` using the `injectCarousel` symbol
   - Handles all core logic: sliding, dragging, autoplay, breakpoints, and animations
   - Exposes navigation methods: `next()`, `prev()`, `slideTo()`
   - Uses composables for drag (`useDrag`), wheel (`useWheel`), and hover (`useHover`) interactions

2. **Slide Component** (`src/components/Slide/Slide.ts`) - Individual slide wrapper that:
   - Injects carousel context via `inject(injectCarousel)`
   - Registers itself with the carousel's slide registry on mount
   - Computes its visibility, active state, and dimensions based on carousel state
   - Prevents nested slides by providing `undefined` for `injectCarousel`

3. **Navigation Component** - Optional prev/next buttons
4. **Pagination Component** - Optional page indicators
5. **ARIA Component** - Accessibility live region announcements

#### Slide Registry Pattern

The slide registry (`src/shared/slideRegistry.ts`) is a reactive system that:
- Maintains a shallow reactive array of slide component instances
- Handles registration/unregistration of slides dynamically
- Updates slide indexes when slides are added/removed
- Emits `slide-registered` and `slide-unregistered` events
- Filters out cloned slides (used for wrap-around effect) from the registry

#### Path Aliases

The codebase uses `@/*` path aliases that map to `src/*`. This is configured in:
- `tsconfig.json` for TypeScript
- `vitest.config.ts` for tests (dynamically resolved from tsconfig paths)
- Rollup for the build process

#### Clone Slides for Wrap-Around

When `wrapAround` is enabled, the carousel creates clone slides before and after the real slides to create the infinite loop effect. The number of clones is calculated dynamically based on `itemsToShow` and the current slide position. Clones are marked with `isClone: true` and excluded from the registry.

#### Reactive Configuration with Breakpoints

The carousel uses a `shallowReactive` config object that merges:
1. `DEFAULT_CONFIG` (from `src/shared/constants.ts`)
2. Component props (excluding `breakpoints` and `modelValue` to avoid unnecessary reactivity)
3. Breakpoint-specific overrides based on viewport or carousel width

The `updateBreakpointsConfig()` function recalculates config when the window/carousel is resized.

#### Transform and Positioning

The carousel track is positioned using CSS transforms:
- Calculates `scrolledOffset` based on current slide index and snap alignment
- Adds `dragOffset` from user interaction
- Applies `clonedSlidesOffset` when wrap-around is active
- Supports both horizontal (translateX) and vertical (translateY) modes
- RTL and bottom-to-top directions are handled via the `normalizedDir` computed property

#### Slide Effects

The library supports two slide effects controlled by the `slideEffect` prop:
- **default** - Uses CSS transforms for sliding
- **fade** - No transform applied, relies on CSS transitions for fade effect

### File Organization

```
src/
├── components/          # Vue components
│   ├── Carousel/       # Main carousel logic and types
│   ├── Slide/          # Slide wrapper component
│   ├── Navigation/     # Navigation buttons
│   ├── Pagination/     # Page indicators
│   ├── ARIA/           # Accessibility announcements
│   └── Icon/           # Icon component
├── composables/        # Reusable Vue composition functions
│   ├── useDrag.ts     # Mouse/touch drag handling
│   ├── useWheel.ts    # Mouse wheel navigation
│   └── useHover.ts    # Hover state tracking
├── shared/            # Shared utilities and types
│   ├── slideRegistry.ts    # Slide registration system
│   ├── injectSymbols.ts   # Provide/inject keys
│   ├── types.ts           # Shared TypeScript types
│   └── constants.ts       # Default configuration
├── utils/             # Pure utility functions (each with .spec.ts test file)
└── index.ts          # Main entry point
```

### Testing

Tests live in two places, both matched by the `**/*.spec.{ts,tsx,js,jsx}` include:
- **Unit tests** are co-located with the source file (`utils/foo.ts` → `utils/foo.spec.ts`; `Carousel.ts` → `Carousel.spec.ts`)
- **Integration tests** live in `tests/integration/` and exercise components together (`carousel`, `navigation`, `pagination`, `aria`)

The test environment:
- Vitest with jsdom; `globals: true`, so `describe`/`it`/`expect` need no import
- Vue Test Utils for component testing
- `vitest.setup.ts` stubs `ResizeObserver`, which jsdom does not implement
- Coverage (v8) covers `src/**/*.ts` only and is written to `coverage/`

When writing tests:
- Put a unit test next to the file it covers; put cross-component behavior in `tests/integration/`
- Use descriptive test names that explain the behavior being tested

### Build Output

The build process (via Rollup) generates multiple formats in `dist/`:
- `carousel.js` / `carousel.min.js` - UMD builds for CDN usage
- `carousel.mjs` - ES module build
- `carousel.cjs` - CommonJS build
- `carousel.d.ts` - Rolled-up TypeScript declarations
- `carousel.css` - Compiled styles

All formats are specified in `package.json` exports field for proper module resolution.

### Playground

The `playground/` directory contains a Vite + Vue app (`App.vue`) for manual testing during development. Run `pnpm dev` to start it. The playground imports the library source directly (not the built version) for faster iteration.

### Important Patterns

1. **Props Validation**: Recent changes improved prop validation with descriptive console warnings for invalid values
2. **Reactive Dependencies**: The carousel carefully manages reactivity to avoid unnecessary re-renders (e.g., using `shallowReactive` for config and transform elements)
3. **Event Emissions**: The carousel emits lifecycle events (`before-init`, `init`, `slide-start`, `slide-end`, `loop`, `drag`, `wheel`) for external integrations
4. **Animation Tracking**: The carousel tracks CSS animations/transitions on parent elements to recalculate slide sizes during animations (can be disabled via `ignoreAnimations` prop)
5. **ResizeObserver**: Monitors carousel root element for size changes to trigger layout updates

### Conventions

- Formatting is Prettier-owned: no semicolons, single quotes, 90-column width, `es5` trailing commas. Run `pnpm prettier:fix` rather than hand-formatting.
- ESLint enforces `import/order` with alphabetized, newline-separated groups; new imports must be placed in the right group or `pnpm lint` fails.
- Every directory under `src/` exposes a barrel `index.ts`; import through `@/...` rather than deep relative paths.

### Things agents get wrong

- **`pnpm typecheck` only covers `src`.** `tsconfig.json` sets `include: ["src"]`, so type errors in `tests/`, `playground/`, and root config files are never reported. Type problems there surface only at runtime.
- **The pre-commit hook is the full pipeline.** `.husky/pre-commit` runs `pnpm lint`, `pnpm test`, and `pnpm build` in sequence, so every commit is slow and a broken build blocks it entirely.
- **`pnpm test` always collects coverage.** For a fast, focused run use `pnpm vitest run <path>` instead.
- **CI mirrors three scripts.** `.github/workflows/test.yml` runs `lint`, `typecheck`, and `test` as a matrix on Node 20 / pnpm 9, triggered only by changes to `src/**`, `tests/**`, `package.json`, `pnpm-lock.yaml`, or that workflow file.
