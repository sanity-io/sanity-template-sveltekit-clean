import {defineConfig} from 'eslint/config'
import {fileURLToPath} from 'node:url'
import {includeIgnoreFile} from '@eslint/compat'
import globals from 'globals'
import js from '@eslint/js'
import path from 'node:path'
import prettier from 'eslint-config-prettier'
import {createRequire} from 'node:module'

import svelte from 'eslint-plugin-svelte'
import tseslint from 'typescript-eslint'

import type {Linter} from 'eslint'

const studio = createRequire(import.meta.url)('@sanity/eslint-config-studio') as Linter.Config[]

import appSvelteConfig from './sveltekit-app/svelte.config.js'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))
const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(
  // Respect .gitignore
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      'eslint.config.ts',
      'vite.config.ts',
      'svelte.config.js',
      '**/sanity.cli.ts',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },
  // Base JS + TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Svelte flat presets
  ...svelte.configs['flat/recommended'],
  ...svelte.configs['flat/prettier'],

  // Global language options
  {
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
      parserOptions: {
        // Let typescript-eslint resolve per-package projects automatically
        projectService: true,
        // optional (safe if you keep it)
        tsconfigRootDir,
        extraFileExtensions: ['.svelte'],
      },
    },
  },

  // App config
  {
    files: ['sveltekit-app/**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        svelteConfig: appSvelteConfig,
      },
    },
  },
  // Studio config
  ...studio,

  // Repo rules
  {
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // Keep last
  prettier,
)
