# Copilot Instructions for AI Coding Agents

## Project Overview

This is an Angular 20+ application structured for clarity and modularity. The main entry point is `src/main.ts`, which bootstraps the `App` component from `src/app/app.ts`. The UI is composed of nested components, with data flowing from parent to child via inputs.

## Architecture & Patterns

-   **Component Structure:**
    -   Root: `App` (`src/app/app.ts`) renders the `Home` component.
    -   `Home` (`src/app/home/home.ts`) displays a filter/search form and a list of housing locations.
    -   `HousingLocation` (`src/app/housing-location/housing-location.ts`) renders details for each housing location.
    -   Data model: `HousingLocationInfo` (`src/app/housinglocation.ts`).
-   **Angular Standalone Components:**
    -   Components use the `imports` property for dependencies, not NgModules.
    -   Templates are inline (see `angular.json` schematics config).
-   **Data Flow:**
    -   `Home` holds a static array of housing locations and passes each to `HousingLocation` via the required input property.
    -   No backend/API integration; all data is local and static.
-   **Styling:**
    -   Styles are in `.css` files per component and global styles in `src/styles.css`.
    -   SCSS is configured but not used in current files.

## Developer Workflows

-   **Build:** `npm run build` (outputs to `dist/first-app`)
-   **Serve:** `npm start` or `ng serve` (development server)
-   **Watch:** `npm run watch` (auto-rebuild on changes)
-   **No tests:** Schematics are configured to skip test file generation.
-   **Debugging:** Use browser dev tools; no custom debug scripts.

## Conventions & Project-Specific Rules

-   **No NgModules:** Use Angular standalone components only.
-   **No test files:** All schematics skip test generation (`angular.json`).
-   **Inline templates/styles:** All new components/classes use inline templates/styles by default.
-   **Strict TypeScript:** Strict compiler options enforced (`tsconfig.json`).
-   **Block syntax:** Angular templates use `@for` for loops (enabled in `angularCompilerOptions`).
-   **No external API calls:** All data is static and local.

## Integration Points

-   **Assets:** Static images in `src/assets/`.
-   **Protractor:** Deprecated, but `provideProtractorTestingSupport` is included for compatibility (see `main.ts`).

## Examples

-   To add a new housing location, update the array in `home.ts` and ensure it matches the `HousingLocationInfo` interface.
-   To create a new component, use inline template/style and add it to the `imports` array of its parent.

## Key Files

-   `src/main.ts` (bootstrap)
-   `src/app/app.ts` (root component)
-   `src/app/home/home.ts` (list/filter logic)
-   `src/app/housing-location/housing-location.ts` (item display)
-   `src/app/housinglocation.ts` (data model)
-   `angular.json` (schematics, build config)
-   `tsconfig.json` (TypeScript strictness)

---

_Review and update these instructions as the project evolves. If any conventions or workflows are unclear, please provide feedback for improvement._
