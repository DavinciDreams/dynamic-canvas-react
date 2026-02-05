# Publishing @dynamic-canvas/react to npm

## Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **pnpm** or **yarn**
3. **npm account** (create one at https://www.npmjs.com/signup)

## Step 1: Install Dependencies

```bash
cd packages/dynamic-canvas-react
npm install
# or
pnpm install
# or
yarn install
```

## Step 2: Build the Package

```bash
npm run build
# or
pnpm run build
# or
yarn build
```

This will create the following files in the `dist/` directory:
- `dynamic-canvas.umd.js` - UMD build for browser
- `dynamic-canvas.es.js` - ES module build
- `index.d.ts` - TypeScript definitions
- `themes.es.js` / `themes.umd.js` - Theme exports
- `hooks.es.js` / `hooks.umd.js` - Hook exports

## Step 3: Login to npm

```bash
npm login
# or
pnpm login
# or
yarn login
```

Enter your npm username, password, and email when prompted.

## Step 4: Publish the Package

```bash
npm publish
# or
pnpm publish
# or
yarn publish
```

## Step 5: Verify Publication

Visit https://www.npmjs.com/package/@dynamic-canvas/react to see your published package.

## Updating the Package

When you make changes and want to publish a new version:

```bash
# Update version in package.json
npm version patch  # 0.1.0 -> 0.1.1 (bug fixes)
npm version minor  # 0.1.0 -> 0.2.0 (new features)
npm version major  # 0.1.0 -> 1.0.0 (breaking changes)

# Rebuild and publish
npm run build
npm publish
```

## Troubleshooting

### Error: "Package name invalid"

- Make sure your package name doesn't already exist on npm
- Try a different name like `@your-username/dynamic-canvas`

### Error: "You do not have permission to publish"

- Make sure you're logged in with the correct account
- Check that you own the package name or have permission

### Error: "Package size limit exceeded"

- Remove unnecessary files from the package
- Optimize your bundle size

## Private Publishing (Optional)

If you want to publish privately:

1. Create a private npm registry (e.g., Verdaccio, npm Enterprise)
2. Update `.npmrc` with:
   ```
   registry=https://your-private-registry.com/
   ```
3. Publish with:
   ```bash
   npm publish --access restricted
   ```
