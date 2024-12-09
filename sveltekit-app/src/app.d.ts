import type { LoaderLocals } from '@sanity/svelte-loader';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals extends LoaderLocals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
