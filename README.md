# Hippo UI

An open-source UI component library tailored for social impact organizations with a focus on accessibility, flexibility, reliability, and lowering the barrier of entry to building beautiful UIs.

## Table of Contents

1. [Developing](#1-developing)
1. [Versioning & Publishing Packages](#2-versioning-publishing-packages)

## 1. Developing

To get started:

1. Install dependencies: `yarn install`
1. Run storybook and the test todo-app: `yarn dev`

That's it!

This design system monorepo was set up using the [Turborepo Design System Starter](https://github.com/vercel/turborepo/tree/main/examples/design-system).

### Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `apps/todo-app`: A test app to play around with the theme editor
- `packages/@hippo-xxx`: Core React components. Each component is published as its own package.
- `packages/@hippo-utils`: Shared React utilities
- `packages/@hippo-tsconfig`: Shared `tsconfig.json` used throughout the Turborepo
- `packages/eslint-config-hippo`: ESLint preset for hippo-ui

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Yarn Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-W` workspaces flag with `yarn add`.

### Components

Each component exists as its own package inside `hippo-xxx`. Please make sure each component follows the same structure:

```bash
hippo-xxx
├── src
│    └── index.tsx
├── .eslintrc.js
├── package.json
└── tsconfig.json
```

Whenever you create a new component, remember to then add it to `apps/docs/package.json` otherwise it won't be loaded into Storybook.

### Useful Commands

- `yarn build` - Build all packages including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset and publish to npm
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

### Compilation

Running `yarn build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file.

Run `yarn build` to confirm compilation is working correctly. You should see a `dist/` directory in each package which contains the compiled output.

```bash
hippo-xxx
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

### Storybook

Storybook provides an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally.

All stories are inside the `apps/stories/` folder. All documentation is written in MDX.

We include a few helpful Storybook scripts:

- `yarn dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `yarn build`: Builds the Storybook UI and generates the static HTML files
- `yarn preview-storybook`: Starts a local server to view the generated Storybook UI

## 2. Versioning & Publishing Packages

We use [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm.

TODO: create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to the GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) to the repo.

### Generating the Changelog

To generate a changelog, run `yarn changeset` locally:

1. **Which packages would you like to include?** – This shows which packages that changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm.

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```
