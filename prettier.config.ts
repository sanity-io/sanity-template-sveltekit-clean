import {type Config} from 'prettier'

import sanityPreset from '@sanity/prettier-config'

const config: Config = {
  ...sanityPreset,
  singleQuote: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
}

export default config
