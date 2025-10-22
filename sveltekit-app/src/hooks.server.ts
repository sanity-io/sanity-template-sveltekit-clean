import {setServerClient, handlePreviewMode, handleQueryLoader} from '@sanity/sveltekit'
import {redirect} from '@sveltejs/kit'
import {sequence} from '@sveltejs/kit/hooks'
import {serverClient} from '$lib/sanity/client.server'

// Sets the client to be used by `loadQuery` when fetching data on the server.
// The loader will handle setting the correct fetch parameters, including
// perspective. This isn't a hook, but it's a good place to call this function
// as this file is executed once per app initialization.
setServerClient(serverClient)

export const handle = sequence(
  // This convenience function sets up preview mode endpoints and attaches useful
  // helpers to the `event.locals` Svelte object.
  handlePreviewMode({
    client: serverClient,
    preview: {redirect},
  }),
  // Sets up the loadQuery helper function which will be used for fetching data
  // on the server
  handleQueryLoader(),
)
