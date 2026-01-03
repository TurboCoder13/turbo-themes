# Tailwind example

Vite + Tailwind playground wired to the Turbo Themes Tailwind preset.

## Run

```bash
cd examples/tailwind
bun install
bun run dev
```

## Build

```bash
bun run build
bun run preview
```

The prebuilt CSS in `dist/output.css` lets you open `index.html` directly without
running a build. When you run Tailwind, the preset at
`../../dist/adapters/tailwind/preset.js` maps utility classes to Turbo token variables.
