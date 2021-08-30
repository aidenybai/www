import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
    jsxInject: `import { jsx, jsxs, Fragment } from 'million/jsx-runtime'`,
  },
});
